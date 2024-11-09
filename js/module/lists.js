const LISTS = {
    currencies: {
        grass: {
            unl: ()=>true,
            color: "green",
        },
        perks: {
            unl: ()=>true,
            color: "#13BDE7",
        },
        platinum: {
            unl: ()=>player.prestige.times>0,
            color: "#ccc",
        },
        prestige: {
            unl: ()=>player.prestige.times>0,
            color: "#13BDE7",
        },
        crystal: {
            unl: ()=>player.crystal.times>0,
            color: "magenta",
        },
        steelie: {
            unl: ()=>player.steelie.times>0,
            color: "#ccc",
        },
        charge: {
            unl: ()=>hasUpgrade('factory',3),
            color: "gold",
        },
        'anti-grass': {
            unl: ()=>tmp.anti_unl,
            color: "#070064",
        },
        'anonymity': {
            unl: ()=>player.anonymity.times>0,
            color: "darkred",
        },
        'oil': {
            unl: ()=>player.oil.times>0,
            color: "#333",
        },
        'rocket-fuel': {
            unl: ()=>hasUpgrade('factory',6),
            color: "#117e99",
        },
        'momentum': {
            unl: ()=>hasUpgrade('factory',7),
            color: "#dbb826",
        },
    },
    levels: {
        level: {
            unl: ()=>true,
            color: ["darkcyan","cyan"],
            name: "Normal Level",
            curr: "xp",
        },
        'anti-level': {
            unl: ()=>tmp.anti_unl,
            color: ["#060053","#1200ff"],
            name: "Anti-Level",
            curr: "anti-xp",
        },
        tier: {
            unl: ()=>player.prestige.times>0,
            color: ["#aa0","yellow"],
            name: "Tier",
            curr: "tp",
        },
    },
}

function setupLists() {
    // Currencies
    let h = "", h2 = ""
    for (let id in LISTS.currencies) {
        let L = LISTS.currencies[id], curr = CURRENCIES[id]

        h += `
        <div id="currency-list-${id}-div">
            <div class="C-list-div" style="background-color: ${L.color};">
                <div class="CL-list-name">
                    <div>${curr.name}</div>
                </div><div class="CL-list-name">
                    <div id="currency-list-${id}-amt">1e234,567</div>
                </div>
                <img id="currency-list-${id}-auto" src="images/Icons/GreenAutomation.png" draggable="false" onclick="player.lists.currencies['${id}'][1] = !player.lists.currencies['${id}'][1]">
                <img id="currency-list-${id}-pin" src="images/Icons/Pin.png" draggable="false" onclick="player.lists.currencies['${id}'][0] = !player.lists.currencies['${id}'][0]">
            </div>
            <img class="CL-img-res" src="images/${curr.base}.png" draggable="false">
            <img class="CL-img-res" src="images/${curr.icon}.png" draggable="false">
        </div>
        `

        h2 += `
        <div id="pinned-currency-${id}-div" style="display: none;">
            <div class="P-list-div" style="background-color: ${L.color};">
                <div class="P-list-res" id="pinned-currency-${id}-amt">1e234,567</div>
            </div>
            <img class="P-img-res" src="images/${curr.base}.png" draggable="false">
            <img class="P-img-res" src="images/${curr.icon}.png" draggable="false">
        </div>
        `
    }
    el("currencies-list").innerHTML = h
    el("pinned-currencies").innerHTML = h2

    // Levels
    h = "", h2 = ""
    for (let id in LISTS.levels) {
        let L = LISTS.levels[id], curr = CURRENCIES[L.curr]

        h += `
        <div id="level-list-${id}-div">
            <div class="L-list-div" style="background-color: ${L.color[0]};">
                <div class="CL-list-name">
                    <div>${L.name}<br><b id="level-list-${id}-lvl">1e234,567</b></div>
                </div><div class="CL-list-name">
                    <div id="level-list-${id}-amt">1e234,567 / 1e234,567</div>
                </div>
                <img id="level-list-${id}-pin" src="images/Icons/Pin.png" draggable="false" onclick="player.lists.levels['${id}'] = !player.lists.levels['${id}']">
            </div>
            <img class="CL-img-res" src="images/${curr.base}.png" draggable="false">
            <img class="CL-img-res" src="images/${curr.icon}.png" draggable="false">
        </div>
        `

        h2 += `
        <div id="pinned-level-${id}-div" style="display: none;">
            <div class="P-list-div" style="background-color: ${L.color[0]};">
                <div class="P-list-bar" id="pinned-level-${id}-bar" style="width: 50%; background-color: ${L.color[1]};"></div>
                <div class="P-list-res" id="pinned-level-${id}-amt">1e234,567</div>
            </div>
            <img class="P-img-res" src="images/${curr.base}.png" draggable="false">
            <img class="P-img-res" src="images/${curr.icon}.png" draggable="false">
        </div>
        `
    }
    el("levels-list").innerHTML = h
    el("pinned-levels").innerHTML = h2
}

function updateLists() {
    if (!tabOpened) return;

    if (tabName === 'currencies') {
        for (let id in LISTS.currencies) {
            let L = LISTS.currencies[id], curr = CURRENCIES[id], unl = L.unl()

            el(`currency-list-${id}-div`).style.display = el_display(unl)

            if (unl) {
                let gain = tmp.currency_gain[id].mul(curr.passive ?? 1), pl = player.lists.currencies[id]
                el(`currency-list-${id}-amt`).innerHTML = format(curr.amount, 0) + (gain.gt(0) ? "<br>" + formatGain(curr.amount, gain) : "")

                el(`currency-list-${id}-pin`).className = pl[0] ? "" : "disabled"
                el(`currency-list-${id}-auto`).className = pl[1] ? "" : "disabled"
            }
        }
    } else if (tabName === 'levels') {
        for (let id in LISTS.levels) {
            let L = LISTS.levels[id], unl = L.unl()

            el(`level-list-${id}-div`).style.display = el_display(unl)

            if (unl) {
                let level = LEVELS[L.curr], curr = CURRENCIES[L.curr], pl = player.lists.levels[id]

                let lvl = level.level, exp = level.exp, req = level.req(lvl), previous = level.req(lvl.sub(1))
                let p = exp.sub(previous).max(0), q = req.sub(previous).max(0)

                let gain = tmp.currency_gain[L.curr].mul(curr.passive ?? 1)

                el(`level-list-${id}-lvl`).innerHTML = format(lvl, 0)
                el(`level-list-${id}-amt`).innerHTML = format(p, 0) + " / " + format(q, 0) + (gain.gt(0) ? "<br>" + formatGain(curr.amount, gain) : "")

                el(`level-list-${id}-pin`).className = pl ? "" : "disabled"
            }
        }
    }
}

function updateListsSecond() {
    for (let id in LISTS.currencies) {
        let unl = player.lists.currencies[id][0]

        el(`pinned-currency-${id}-div`).style.display = el_display(unl)

        if (unl) el(`pinned-currency-${id}-amt`).innerHTML = format(CURRENCIES[id].amount, 0)
    }

    for (let id in LISTS.levels) {
        let L = LISTS.levels[id], unl = player.lists.levels[id]

        el(`pinned-level-${id}-div`).style.display = el_display(unl)

        if (unl) {
            let level = LEVELS[L.curr]

            let lvl = level.level, exp = level.exp, req = level.req(lvl), previous = level.req(lvl.sub(1))
            let p = exp.sub(previous).max(0), q = req.sub(previous).max(0)

            el(`pinned-level-${id}-amt`).innerHTML = format(lvl, 0)
            el(`pinned-level-${id}-bar`).style.width = p.div(q).min(1).toNumber() * 100 + "%"
        }
    }
}