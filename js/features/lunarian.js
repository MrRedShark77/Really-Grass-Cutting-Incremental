const LUNAR_MATERIALS = (()=>{
    let a = {}
    for (let [id,x] of Object.entries(LUNAR_ITEMS)) if (x.type === 'res') {
        a[id] = {
            unl() { return player.lun.res[id] !== undefined },
            name: x.name,
            icon: x.icon,
        }

        Object.defineProperty(a[id],'amount',{
            get() { return player.lun.res[id]??E(0) },
            set(v) { return player.lun.res[id] = v },
        })
    }
    return a
})()

var lunarian_map_tab = -1
var lunarian_map_choose = null

const LUNAR_MAP = [
    {
        id: "lunar1",
        dot: "1",
        name: "Lunarian Prairie",

        levels: [1,6,11,16,21],

        discover_items: ['l_soul','l_curr1','key','rage_essence','calm_essence','wise_essence'],
    },{
        id: "lunar2",
        dot: "2",
        name: "Lunarian Village",

        req: () => false,
        reqDesc: "???",

        levels: [1001],

        discover_items: [],
    },
]

function switchLTab(i) { if (i < 0 || !LUNAR_MAP[i].req || LUNAR_MAP[i].req()) lunarian_map_tab = i }
function chooseLunarLevel(i,j) { if (j <= (player.lun.completed[i] ?? 0)) lunarian_map_choose = [i,j] }
function startBattle() {
    if (lunarian_map_choose) {
        let m = LUNAR_MAP[lunarian_map_choose[0]]
        const SS = getStartingStats()
        localStorage.setItem("gci_lunarian",btoa(JSON.stringify({
            id: lunarian_map_choose,
            type: m.id,
            level: m.levels[lunarian_map_choose[1]],
            start: {
                lunarian: SS.lunarian,
                damage: SS.damage,
            },
        })))
        save()
        window.open('lunarian.html','_self')
    }
}
function upgradeLunarItem(id) {
    let I = LUNAR_ITEMS[id]

    if (I.upg_level < I.maxLevel && I.amount.gte(I.require)) {
        I.amount = I.amount.sub(I.require).round().max(0)
        I.upg_level++
    }
}
function getStartingStats() {
    let x = {}

    x.lunarian = Decimal.add(100,getFormingBonus("fund",1,0)).round()

    x.damage = Decimal.mul(1,getFormingBonus("fund",0))

    return x
}

tmp_update.push(()=>{
    
})

el.update.lunarian = () => {
    if (player.world !== 'star') return

    if (mapID3 == 'lun_map') {
        tmp.el.lunarian_map.setDisplay(lunarian_map_tab === -1)
        tmp.el.lunarian_map_desc.setDisplay(lunarian_map_tab > -1)

        if (lunarian_map_tab > -1) {
            tmp.el.battle_button.setDisplay(lunarian_map_choose !== null)
            if (lunarian_map_choose) {
                let l = LUNAR_MAP[lunarian_map_choose[0]]
                tmp.el.battle_button.setTxt(`Battle ${l.name}, Level ${l.levels[lunarian_map_choose[1]]}!`)
            }

            const SS = getStartingStats()

            tmp.el.start_lunarian.setHTML(format(SS.lunarian,0))
            tmp.el.start_l_damage.setHTML(format(SS.damage,2))
        }

        LUNAR_MAP.forEach((x,i) => {
            let b = tmp.el['lm_tab'+i], req = !x.req || x.req()
            b.setClasses({locked: !req})
            b.setTxt(req?`${x.name} [A${x.dot}]`:x.reqDesc)

            tmp.el['lpd'+i+"_div"].setDisplay(lunarian_map_tab == i)

            if (lunarian_map_tab == i) {
                let m = player.lun.completed[i]??0

                let id = "lpd"+i

                x.discover_items.forEach((y,j)=>{tmp.el[id+"_item"+j].setClasses({lunar_di: true, discovered: player.lun[LUNAR_ITEMS[y].type][y]})})
                x.levels.forEach((y,j) => {tmp.el[id+"_level"+j].setClasses({locked: j > m})})
            }
        })
    } else if (mapID3 == 'lun_inv') {
        for (let [i,x] of Object.entries(LUNAR_ITEMS)) if (x.type === 'items') {
            let id = "li_"+i, dis = player.lun.items[i] !== undefined
            tmp.el[id+"_div"].setDisplay(dis)
            if (dis) {
                var amt = x.amount, lvl = x.upg_level, maxed = lvl >= x.maxLevel, req = x.require

                tmp.el[id+"_lvl"].setTxt("Level: "+format(lvl,0))
                tmp.el[id+"_upg"].setTxt(maxed ? `Maxed` : `Upgrade (${format(amt,0)} / ${format(req,0)})`)
                tmp.el[id+"_upg"].setClasses({'item-upgrade': true, locked: !maxed && amt.lt(req), maxed})

                var d = ""

                d += `<b class="darkblue">[Global Boost]</b> `+x.upgradeDesc

                if (x.boosted) d += `<br><b class="darkblue">[Lunarian Boost]</b> Boost the item power by <b class="green">+10%</b> per level. <b class="green">(+${formatPercent(lvl/10,0)})</b>`

                tmp.el[id+"_desc"].setHTML(d)
            }
        }
    }
}

Object.entries(LUNAR_ITEMS).forEach(([k,v]) => {
    if (v.type === 'items') {
        v.upgBase ??= 10
        v.upgradeDesc ??= `Placeholder.`
        v.maxLevel ??= Infinity

        Object.defineProperty(v,'upg_level',{
            get() { return player.lun.upgrades[k] },
            set(v) { return player.lun.upgrades[k] = v },
        })
        Object.defineProperty(v,'amount',{
            get() { return player.lun.items[k]??E(0) },
            set(v) { return player.lun.items[k] = v },
        })
        Object.defineProperty(v,'require',{
            get() { return (v.upg_level + 1) * v.upgBase },
        })
    }
})

el.setup.lunarian = () => {
    let h1 = "", h2 = `
    <div id="lunarian_buttons">
        <button onclick="startBattle()" id="battle_button">Enter the Battle!</button>
        <button onclick="switchLTab(-1)">Back to the Map</button>
    </div><div class="table_center">
        <div class="stage-stat"><img src="images/Curr/Lunarian.png"><div id="start_lunarian">???</div></div>
        <div class="stage-stat"><img src="images/Icons/LunarSword.png"><div id="start_l_damage">???</div></div>
    </div>
    `

    LUNAR_MAP.forEach((x,i) => {
        h1 += `<button onclick="switchLTab(${i})" id="lm_tab${i}">${x.name} [A${x.dot}]</button>`

        h2 += `<div id="lpd${i}_div"><h2>${x.name} [A${x.dot}]</h2>`

        h2 += "<br><br><h3>Discovered Items</h3><br>" + x.discover_items.map((y,j) => `<div class="lunar_di" id="lpd${i}_item${j}"><img src="images/${LUNAR_ITEMS[y].icon}.png"></div>`).join("")

        h2 += "<br><br><h3>Levels</h3><br>" + x.levels.map((y,j) => `<button onclick="chooseLunarLevel(${i},${j})" id="lpd${i}_level${j}">Level ${y}</button>`).join("")

        h2 += '</div>'
    })

    h2 += `
    <i class='red' style="font-size: 14px">WARNING! Do not close the site during lunarian battle, or you'll lose the lunarian progress and cannot transfer found items to the game!</i>
    `

    new Element('l_map_tabs').setHTML(h1)
    new Element('lunarian_map_desc').setHTML(h2)

    h1 = ""

    for (let [i,x] of Object.entries(LUNAR_ITEMS)) if (x.type == "items") {
        h1 += `
        <div class="lunar-item" id="li_${i}_div">
            <img src="images/${x.icon}.png">
            <div class="item-level" id="li_${i}_lvl">Level: 0</div>
            <div class="item-upgrade locked" id="li_${i}_upg" onclick="upgradeLunarItem('${i}')">Upgrade (0 / ???)</div>
            <div class="item-name">${x.name}</div>
            <div class="item-desc" id="li_${i}_desc">???</div>
        </div>
        `
    }

    new Element('lunar_inventory').setHTML(h1)
}