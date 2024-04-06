let date = Date.now(), diff = 0

const el = id => document.getElementById(id);

var outputs = []
var item_hover = ""

var temp = {}
var normal_data = {}
var lunarian_data = {}

function resetLunarTemp() {
    temp = {
        damage: player.start_damage,
        max_lunar: player.start_lunarians,
        defense: E(1),
        crit_chance: 0.05,
        block_chance: 0,
        hc_power: 1,
        key_chance: 0,
        double_chance: 0,
        life_stealer: 0,
        regen: 0,
        luck: 1,
        gps: false,
    }
}

function setupLuckWeight() {
    let mw = 0, w = 0, luck = temp.luck

    var current_tw = treasure_weight_before.map(x => [x[0],(x[1]-1)/luck+1])

    current_tw.forEach(([i,x]) => {mw += x})
    treasure_chances = current_tw.map(([i,x]) => {
        w += x
        return [i,w/mw,x/mw]
    })
}

function loadLunarian() {
    // Check Lunarian Save

    let load = localStorage.getItem("gci_lunarian"), cannot = true

    if (load !== null && load !== "null") {
        let data = JSON.parse(atob(load))
        world_init.id = data.id
        world_init.level = data.level
        world_init.type = data.type
        world_init.soul_mult = data.soul_mult
        cannot = false

        player.start_damage = E(data.start.damage)
        player.lunarians = player.start_lunarians = E(data.start.lunarian)

        localStorage.setItem("gci_lunarian",null)
    }

    if (cannot) {
        document.body.innerHTML = "<h1>My Honest Reaction:</h1><br><br><img src='https://media.tenor.com/DOYaefA21YUAAAAC/shark-shark-reaction.gif'>"
        return
    }

    // Setup Lunarians

    resetLunarTemp()

    normal_data = JSON.parse(atob(localStorage.getItem("gci_save")))
    lunarian_data = normal_data.lun ?? getLunarianSave()

    fastDecimalCheck(lunarian_data.res)
    fastDecimalCheck(lunarian_data.items)

    setupCanvas()
    setupLunarianHTML()

    for (let [i,x] of Object.entries(LUNAR_ITEMS)) {
        Object.defineProperty(x,'amount',{
            get() { return player.items[i]??E(0) },
            set(v) { return player.items[i] = v },
        })
        Object.defineProperty(x,'upg_level',{
            get() { return lunarian_data.upgrades[i] },
        })
    }

    generateTiles()

    camera_pos = getPositionMult(...player.position)

    setInterval(loop,1000/30)

    resizeCanvas()
}

function loop() {
    let date2 = Date.now()
    diff = date2 - date
    updateLunarTemp()
    updateLunarianHTML()
    calc(diff/1000)
    drawCanvas()
    date = Date.now()
}

function calc(dt) {
    outputs.forEach((o,i) => {
        o[1] = Math.max(0,o[1]-dt)
        if (o[1] <= 0) outputs.splice(i,1)
    })

    player.lunarians = player.lunarians.add(temp.max_lunar.mul(dt * temp.regen)).min(temp.max_lunar)

    calcCanvas(dt/1000)
}

function updateLunarTemp() {
    let [mx,my] = mouse_pos
    let [px,py] = player.position
    let d = distance(...getPositionMult(px,py),...getPositionMult(mx,my))

    object_hover = d < FOG_DIST - 0.25 && mx+';'+my in objects ? mx+';'+my : ""

    resetLunarTemp()

    temp.gps = lunarian_data.upgrades.gps>0 || player.items.gps?.gte(1)

    Object.values(LUNAR_ITEMS).forEach(item => {
        if (item.updateEffect) item.updateEffect()
        if (item.updateUpgrade) item.updateUpgrade()
    })

    temp.damage = temp.damage.round()
    temp.max_lunar = temp.max_lunar.round()

    setupLuckWeight()
}

function addOutput(text,delay=5) {
    let of = outputs.findIndex(x => x[0] == text)
    if (of >= 0) {
        outputs[of][1] = delay
        outputs[of][2] ++
    }
    else outputs.push([text,delay,1])
}

function addItem(id,value,found=false,text="") {
    const I = LUNAR_ITEMS[id]
    var doubled = Decimal.gt(value,0) && temp.double_chance > Math.random()
    if (doubled) value = Decimal.mul(value,2)
    I.amount = I.amount.add(value).max(0)
    if (found) player.found[id] = player.found[id]?.add(value).max(0)??E(value)
    if (!Decimal.eq(value,0)) addOutput("<b>"+(Decimal.lt(value,0)?"":"+")+format(value,0)+" "+LUNAR_ITEMS[id].name+"</b>"+text+(doubled?" <span class='green'>DOUBLED!!!</span>":""))
}

function setupLunarianHTML() {
    el('lunar_items').innerHTML = Object.entries(LUNAR_ITEMS).map(([i,v]) => `
    <div class="lunar_item" id="li_${i}_div" item-id="${i}">
        <img src="images/${v.icon}.png">
        <div id="li_${i}_amt">×???</div>
    </div>
    `).join("")

    Array.from(document.getElementsByClassName('lunar_item')).forEach(x => {
        let a = x.getAttribute("item-id")
        if (!a) return
        x.addEventListener('mouseenter',e => {
            item_hover = a
        })
        x.addEventListener('mouseleave',e => {
            item_hover = ""
        })
    })
}

function updateLunarianHTML() {
    var clear = (player.killed + player.opened) / goal.total

    el('lunar_info').innerHTML = `
    Player Position: (${player.position[0]},${player.position[1]})
    <br>Your Lunarians: ${format(player.lunarians,0)} / ${format(temp.max_lunar,0)}
    <br>Your Damage: ${format(temp.damage,0)}
    <br>
    <br>Cleared <b style="color: hsl(${120*Math.min(1.5,Math.max(0,clear))},100%,50%)">${formatPercent(clear)}</b>
    <br>Portal ${player.portal_opened ? "<b class='green'>OPENED</b>" : "<b class='red'>CLOSED</b>"} (${distance(...getPositionMult(...player.position),...getPositionMult(...portal_pos)).toFixed(1)}m)
    `

    el('lunar_output').innerHTML = outputs.map((o,i) => `<div style="opacity: ${Math.min(1,o[1])}">${o[0] + (o[2] > 1 ? ' <span class="small-text">(x'+o[2]+')</span>' : "")}</div>`).join("")

    el('object_info').innerHTML = getObjectInfo(object_hover)

    Object.entries(LUNAR_ITEMS).forEach(([i,x]) => {
        let v = x.amount
        let d = v.gt(0)
        el(`li_${i}_div`).style.display = d ? "" : "none"
        if (d) el(`li_${i}_amt`).innerHTML = v.gt(1) ? `×${format(v,0,6)}` : ""
    })
}

function getObjectInfo() {
    let h = ""

    if (object_hover != "") {
        var obj = objects[object_hover], main = OBJECT_TYPE[obj.type]

        h = `<h3>${main.title}</h3>`

        if (main.desc) h += `<br><span class='small-text'>`+main.desc+"</span>"

        switch (obj.type) {
            case 'enemy':
                h += `
                <br>Level: ${format(obj.level,0)}
                <br>Health: ${format(obj.health,0)} / ${format(obj.max_health,0)}
                <br>Damage: ${format(obj.damage.div(temp.defense).round(),0)}
                `
            break;
            case 'heal':
                h += `
                <br>Heals you by <b class='green'>+${formatPercent(obj.percent*temp.hc_power,0)}</b> of your max lunarians.
                `
            break;
            case 'treasure':
                h += treasure_chances.map(([i,x,c]) => {
                    const I = LUNAR_ITEMS[i]
                    let v = lunarian_data.items[i] || lunarian_data.res[i]
                    return `<br><b style="color: ${ITEM_RARITY[I.rarity??0][1]}">${v ? I.name : "???"} - ${formatPercent(c)}</b>`
                }).join("")
            break;
        }
    } else if (item_hover != "") {
        var item = LUNAR_ITEMS[item_hover]
        h = `<h3>${item.name}</h3>`+(item.amount.gt(1)?` <span class='small-text'>(×${format(item.amount,0)})</span>`:"")
        if (item.desc) h += `<br><span class='small-text'>`+item.desc+"</span>"
    }

    return h
}

function endLunarian() {
    el('lunar_ui').style.animation = "vanish 2s ease 1 forwards"

    setTimeout(openEndPopup,3000)
}

function openEndPopup() {
    el('lunar_items_found').innerHTML = Object.entries(player.found).map(([id,x]) => {
        let type = LUNAR_ITEMS[id].type

        if (x.lte(0) || type === undefined) return

        let d = lunarian_data[type]

        let unl = !d[id]
        d[id] = d[id]?.add(x)??x

        return `
        <div class="lunar_item"${unl ? ` style="background-color: #0804"` : ""}>
            <img src="images/${LUNAR_ITEMS[id].icon}.png">
            ${x.gt(1) ? `<div>×${format(x,0,6)}</div>` : ""}
        </div>
        `
    }).join("")

    if (player.status == 'win' && world_init.id[1] >= (lunarian_data.completed[world_init.id[0]]??0)) lunarian_data.completed[world_init.id[0]] = world_init.id[1] + 1

    localStorage.setItem("gci_save",btoa(JSON.stringify(normal_data)))

    el('end_stats').innerHTML = `
    <b>Lunarian Status:</b> ${player.status == "win" ? `<span class='darkgreen'>Alive</span>` : player.status == "dead" ? `<span class='red'>Dead</span>` : "Unknown..."}
    <br><br>
    <b>Enemies Killed:</b> ${player.killed} / ${goal.max_enemies+(player.killed>=goal.max_enemies?" <b class='darkgreen'>PERFECT!!!</b>":"")}
    <br><br>
    <b>Treasures Opened:</b> ${player.opened} / ${goal.max_treasures+(player.opened>=goal.max_treasures?" <b class='darkgreen'>PERFECT!!!</b>":"")}
    <br><br>
    Founded items are now transferred into the game!
    `

    el('lunar_popup').style.display = ''
}