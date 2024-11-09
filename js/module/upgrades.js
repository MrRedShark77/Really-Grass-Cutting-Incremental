const UPGRADES = {
    grass: {
        unl: ()=>true,
        pos: [1,0],
        size: [3,1],
        type: 'normal',
        color: ['#29b146','#20aa34'],
        base: "Bases/GrassBase",
        curr_dis: {
            id: "grass",
            // get text() { return "RAAAAAAAAAUGH" },
        },
        autobuy: ()=>hasUpgrade('auto',3),
        el: ()=>hasUpgrade('assembler',1),
        cl: ()=>hasUpgrade('assembler',2),
        ctn: {
            "1": {
                max: 1000,
                unl: ()=>true,
                icons: ["Curr/Grass"],

                name: `Grass Value`,
                desc: `Increases grass value by <b class="green">+100%</b> per level.<br>This effect is <b class="green">doubled</b> every <b class="yellow">25</b> levels.`,

                cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 10, 1, 1.15).ceil(),
                bulk: a => a.simpleCost("EAI", 10, 1, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
                res: "grass",

                effect(a) {
                    let x = Decimal.pow(2,a.div(25).floor()).mul(a).add(1)
                    return x
                },
                effDesc: x => formatMult(x,0),
            },
            "2": {
                max: 500,
                unl: ()=>true,
                icons: ["Icons/MoreGrass"],

                name: `More Grass`,
                desc: `Increases grass cap by <b class="green">+1</b> per level.`,

                cost: a => a.scale(500-1,2,"P").simpleCost("EA", 25, 1, 1.15).ceil(),
                bulk: a => a.simpleCost("EAI", 25, 1, 1.15).scale(500-1,2,"P",true).add(1).floor(),
                res: "grass",

                effect(a) {
                    let x = a
                    return x
                },
                effDesc: x => "+"+format(x,0),
            },
            "3": {
                max: 250,
                unl: ()=>true,
                icons: ["Icons/Speed"],

                name: `Grow Speed`,
                desc: `Increases grass grow speed by <b class="green">+10%</b> per level.`,

                cost: a => a.scale(250-1,2,"P").simpleCost("EA", 100, 1, 1.35).ceil(),
                bulk: a => a.simpleCost("EAI", 100, 1, 1.35).scale(250-1,2,"P",true).add(1).floor(),
                res: "grass",

                effect(a) {
                    let x = a.div(10).add(1)
                    return x
                },
                effDesc: x => formatMult(x),
            },
            "4": {
                max: 1000,
                unl: ()=>true,
                icons: ["Icons/XP"],

                name: `XP`,
                desc: `Increases experience (XP) gained by <b class="green">+100%</b> per level.<br>This effect is <b class="green">doubled</b> every <b class="yellow">25</b> levels.`,

                cost: a => a.scale(1e3-1,2,"P").simpleCost("EA", 1e3, 1, 1.15).ceil(),
                bulk: a => a.simpleCost("EAI", 1e3, 1, 1.15).scale(1e3-1,2,"P",true).add(1).floor(),
                res: "grass",

                effect(a) {
                    let x = Decimal.pow(2,a.div(25).floor()).mul(a).add(1)
                    return x
                },
                effDesc: x => formatMult(x,0),
            },
            "5": {
                max: 500,
                unl: ()=>true,
                icons: ["Curr/Prestige"],

                name: `PP`,
                desc: `Increases prestige points gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

                cost: a => a.scale(500-1,2,"P").simpleCost("EA", 1e10, 1, 1.4).ceil(),
                bulk: a => a.simpleCost("EAI", 1e10, 1, 1.4).scale(500-1,2,"P",true).add(1).floor(),
                res: "grass",

                effect(a) {
                    let x = Decimal.pow(1.25,a.div(25).floor()).mul(a).mul(.1).add(1)
                    return x
                },
                effDesc: x => formatMult(x),
            },
        },
    },
    perks: {
        unl: ()=>true,
        pos: [4,-1],
        size: [2,2],
        type: 'vertical',
        color: ['#13BDE7','#1fa4c5'],
        base: "Bases/PerkBase",
        curr_dis: {
            id: "perks",
            // get text() { return "RAAAAAAAAAUGH" },
        },
        bottom_text: "Gain perks from leveling up.",
        //order: [1,'1a',2,3,4],
        ctn: {
            "1": {
                max: 99,
                unl: ()=>true,
                icons: ["Curr/Grass"],

                name: `Grass Value Perk`,
                desc: `Increases grass value by <b class="green">+100%</b> per level.`,

                noCostIncrease: true,
                cost: ()=>1,
                res: "perks",

                effect(a) {
                    let x = a.add(1)
                    return x
                },
                effDesc: x => formatMult(x,0),
            },
            "2": {
                max: 10,
                unl: ()=>true,
                icons: ["Icons/Speed"],

                name: `Grow Speed Perk`,
                desc: `Increases grass grow speed by <b class="green">+25%</b> per level.`,

                noCostIncrease: true,
                cost: ()=>1,
                res: "perks",

                effect(a) {
                    let x = a.div(4).add(1)
                    return x
                },
                effDesc: x => formatMult(x),
            },
            "3": {
                max: 10,
                unl: ()=>true,
                icons: ["Icons/MoreGrass"],

                name: `Cap Perk`,
                desc: `Increases grass cap by <b class="green">+10</b> per level.`,

                noCostIncrease: true,
                cost: ()=>1,
                res: "perks",

                effect(a) {
                    let x = a.mul(10)
                    return x
                },
                effDesc: x => "+"+format(x,0),
            },
            "4": {
                unl: ()=>true,
                icons: ["Icons/MoreGrass"],

                name: `Grow Amount Perk`,
                desc: `Increases grass grow amount by <b class="green">+1</b> per level.`,

                noCostIncrease: true,
                cost: ()=>10,
                res: "perks",

                effect(a) {
                    let x = a
                    return x
                },
                effDesc: x => "+"+format(x,0),
            },
            "5": {
                max: 100,
                unl: ()=>player.crystal.times>0,
                icons: ["Icons/XP"],

                name: `XP Perk`,
                desc: `Increases experience gained by <b class="green">+10%</b> per level.`,

                noCostIncrease: true,
                cost: ()=>1,
                res: "perks",

                effect(a) {
                    let x = a.mul(.1).add(1)
                    return x
                },
                effDesc: x => formatMult(x),
            },
            "6": {
                max: 100,
                unl: ()=>player.crystal.times>0,
                icons: ["Icons/TP"],

                name: `TP Perk`,
                desc: `Increases tier progress gained by <b class="green">+10%</b> per level.`,

                noCostIncrease: true,
                cost: ()=>1,
                res: "perks",

                effect(a) {
                    let x = a.mul(.1).add(1)
                    return x
                },
                effDesc: x => formatMult(x),
            },
            "7": {
                max: 100,
                unl: ()=>player.crystal.times>0,
                icons: ["Curr/Prestige"],

                name: `PP Perk`,
                desc: `Increases prestige points gained by <b class="green">+10%</b> per level.`,

                noCostIncrease: true,
                cost: ()=>2,
                res: "perks",

                effect(a) {
                    let x = a.mul(.1).add(1)
                    return x
                },
                effDesc: x => formatMult(x),
            },
            "8": {
                max: 100,
                unl: ()=>player.crystal.times>0,
                icons: ["Curr/Crystal"],

                name: `Crystal Perk`,
                desc: `Increases crystals gained by <b class="green">+10%</b> per level.`,

                noCostIncrease: true,
                cost: ()=>4,
                res: "perks",

                effect(a) {
                    let x = a.mul(.1).add(1)
                    return x
                },
                effDesc: x => formatMult(x),
            },
            "9": {
                max: 100,
                unl: ()=>player.grasshop.gte(9),
                icons: ["Curr/Steel2"],

                name: `Steel Perk`,
                desc: `Increases steel gained by <b class="green">+20%</b> per level.`,

                noCostIncrease: true,
                cost: ()=>50,
                res: "perks",

                effect(a) {
                    let x = a.mul(.2).add(1)
                    return x
                },
                effDesc: x => formatMult(x),
            },
            "10": {
                max: 100,
                unl: ()=>player.grasshop.gte(9),
                icons: ["Curr/Charge"],

                name: `Charge Perk`,
                desc: `Increases charge rate by <b class="green">+20%</b> per level.`,

                noCostIncrease: true,
                cost: ()=>50,
                res: "perks",

                effect(a) {
                    let x = a.mul(.2).add(1)
                    return x
                },
                effDesc: x => formatMult(x),
            },
        },
    },
    auto: {
        unl: ()=>true,
        pos: [-4,0],
        size: [4,1],
        type: 'normal',
        color: ['#E71313','#C60B0B'],
        curr_dis: {
            icon: "Icons/Assemblerv2",
            text: "Automation Upgrades",
        },
        ctn: {
            "1": {
                max: 5,
                unl: ()=>true,
                icons: ["Curr/Grass","Icons/Automation"],
                base: "Bases/AutoBase",

                name: `Autocut`,
                desc: `Autocuts <b class="green">+0.2</b> grass every second per level.`,

                cost: a => a.simpleCost("E", 1e3, 10).ceil(),
                bulk: a => a.simpleCost("EI", 1e3, 10).add(1).floor(),
                res: "grass",

                effect(a) {
                    let x = a.mul(.2)
                    return x
                },
                effDesc: x => "+"+format(x)+"/s",
            },
            "2": {
                max: 5,
                unl: ()=>player.prestige.times>0,
                icons: ["Curr/Grass","Icons/Automation"],
                base: "Bases/PrestigeBase",

                name: `Autocut Value`,
                desc: `Increase grass autocut value <b class="green">+100%</b> per level.`,

                cost: a => a.simpleCost("E", 10, 4).ceil(),
                bulk: a => a.simpleCost("EI", 10, 4).add(1).floor(),
                res: "prestige",

                effect(a) {
                    let x = a.add(1)
                    return x
                },
                effDesc: x => formatMult(x),
            },
            "3": {
                unl: ()=>player.prestige.times>0,
                icons: ["Curr/Grass","Icons/Automation"],
                base: "Bases/PrestigeBase",

                name: `Grass Upgrade Autobuy`,
                desc: `Autobuys grass upgrades every second.`,

                noCostIncrease: true,
                cost: ()=>100,
                res: "prestige",
            },
            "4": {
                unl: ()=>player.prestige.times>0,
                icons: ["Curr/Perks","Icons/Automation"],
                base: "Bases/PrestigeBase",

                name: `Perk Save P`,
                tier: "P",
                desc: `Lets you keep perks and perk levels when you prestige. You will only start earning perks if you reach a level you never reached before.`,

                noCostIncrease: true,
                cost: ()=>500,
                res: "prestige",
            },
            "5": {
                max: 10,
                unl: ()=>player.prestige.times>0,
                icons: ["Curr/Prestige"],
                base: "Bases/PrestigeBase",

                name: `Prestige Generation`,
                desc: `Passively generates <b class="green">+1%/s</b> of PP you would earn on prestige per level.`,

                cost: a => a.simpleCost("EA", 1e4, .2, 1.35).ceil(),
                bulk: a => a.simpleCost("EAI", 1e4, .2, 1.35).add(1).floor(),
                res: "prestige",

                effect(a) {
                    let x = a.mul(.01)
                    return x
                },
                effDesc: x => "+"+formatPercent(x)+"/s",
            },
            "6": {
                max: 3,
                unl: ()=>player.crystal.times>0,
                icons: ["Curr/Grass","Icons/Automation"],
                base: "Bases/CrystalBase",

                name: `Autocut Value II`,
                tier: `II`,
                desc: `Increase grass autocut value <b class="green">+100%</b> per level.`,

                cost: a => a.simpleCost("E", 10, 10).ceil(),
                bulk: a => a.simpleCost("EI", 10, 10).add(1).floor(),
                res: "crystal",

                effect(a) {
                    let x = a.add(1)
                    return x
                },
                effDesc: x => formatMult(x),
            },
            "7": {
                unl: ()=>player.crystal.times>0,
                icons: ["Curr/Perks","Icons/Automation"],
                base: "Bases/CrystalBase",

                name: `Perk Save C`,
                tier: "C",
                desc: `Lets you keep perks and perk levels when you crystallize.`,

                noCostIncrease: true,
                cost: ()=>750,
                res: "crystal",
            },
            "8": {
                max: 10,
                unl: ()=>player.crystal.times>0,
                icons: ["Curr/Crystal"],
                base: "Bases/CrystalBase",

                name: `Crystal Generation`,
                desc: `Passively generates <b class="green">+1%/s</b> of crystals you would earn on crystallize per level.`,

                cost: a => a.simpleCost("EA", 1e4, .2, 1.35).ceil(),
                bulk: a => a.simpleCost("EAI", 1e4, .2, 1.35).add(1).floor(),
                res: "crystal",

                effect(a) {
                    let x = a.mul(.01)
                    return x
                },
                effDesc: x => "+"+formatPercent(x)+"/s",
            },
            "9": {
                unl: ()=>player.crystal.times>0,
                req: ()=>player.grasshop.gte(1),
                req_desc: "GH 1",

                icons: ["Curr/Prestige","Icons/Automation"],
                base: "Bases/CrystalBase",

                name: `Prestige Upgrade Autobuy`,
                desc: `Autobuys prestige upgrades every second.`,

                noCostIncrease: true,
                cost: ()=>1e5,
                res: "crystal",
            },
            "10": {
                unl: ()=>player.crystal.times>0,
                req: ()=>player.grasshop.gte(5),
                req_desc: "GH 5",

                icons: ["Curr/Crystal","Icons/Automation"],
                base: "Bases/PrestigeBase",

                name: `Crystal Upgrade Autobuy`,
                desc: `Autobuys crystal upgrades every second.`,

                noCostIncrease: true,
                cost: ()=>1e14,
                res: "prestige",
            },
        },
    },
}

var upg_choose = [null,null]

function chooseUpgrade(i,j) {
    let req = UPGRADES[i]?.ctn[j]?.req
    if (!req || req()) {
        updateUpgradesHTML(upg_choose[0],true);
        upg_choose = [i,j]
        updateUpgradesHTML(i);
    }
}

function buyUpgrade(i,j,all=false,auto=false) {
    let u = UPGRADES[i].ctn[j], max = tmp.upg_cl[i] && !(u.cl_exc ?? []).includes(j) ? EINF : (u.max ?? 1)

    if (!u.unl() || u.req && !u.req() || player.upgs[i][j].gte(max)) return;

    let lvl = player.upgs[i][j], curr = CURRENCIES[u.res], cost = u.cost(lvl), el = tmp.upg_el[i];
    let amount = curr.amount;

    if (!el && auto) amount = amount.mul(player.auto_upgs_ratio[i][j]??.1);

    if (amount.lt(cost)) return;

    if (all) {
        if (el) {
            player.upgs[i][j] = u.noCostIncrease ? E(max) : u.bulk(amount).min(max).max(lvl.add(1))
        } else {
            let n = lvl.add(1)

            if (u.noCostIncrease) {
                let m = amount.div(cost).floor().add(lvl).min(max).sub(lvl)
                n = m.add(lvl)
                cost = Decimal.mul(cost,m)
            }
            else for (let i = 1; i < 100; i++) {
                if (n.gte(max)) break;
                let cost2 = cost.add(u.cost(lvl.add(i)))
                if (amount.lt(cost2)) break;
                cost = cost2
                n = n.add(1)
            }

            player.upgs[i][j] = n.min(max)
        }
    } else {
        player.upgs[i][j] = lvl.add(1)
    }

    if (!el) curr.amount = curr.amount.sub(cost);

    if (!auto) {
        updateUpgradeTemp(i)
        updateUpgradesHTML(i);
    }
}

function buyNextUpgrade(i,j) {
    let u = UPGRADES[i].ctn[j], max = tmp.upg_cl[i] && !(u.cl_exc ?? []).includes(j) ? EINF : (u.max ?? 1)

    if (!u.unl() || u.req && !u.req() || player.upgs[i][j].gte(max)) return;

    let lvl = player.upgs[i][j], n = E(1), curr = CURRENCIES[u.res], el = tmp.upg_el[i], cost = u.cost(lvl);

    if (curr.amount.lt(cost)) return;

    if (el) {
        n = u.noCostIncrease ? Decimal.sub(25, lvl.mod(25)).add(lvl).min(max).sub(lvl) : u.bulk(curr.amount).min(max).sub(lvl).min(Decimal.sub(25, lvl.mod(25))).max(1)
    } else {
        if (u.noCostIncrease) {
            n = curr.amount.div(cost).floor().min(Decimal.sub(25,lvl.mod(25))).add(lvl).min(max).sub(lvl)
            cost = Decimal.mul(cost,n)
        }
        else for (let i = 1; i < Decimal.sub(25,lvl.mod(25)).min(lvl.add(25).min(max).sub(lvl)).toNumber(); i++) {
            let cost2 = cost.add(u.cost(lvl.add(i)))
            if (curr.amount.lt(cost2)) break;
            cost = cost2
            n = n.add(1)
        }

        curr.amount = curr.amount.sub(cost)
    }

    player.upgs[i][j] = lvl.add(n)

    updateUpgradeTemp(i);
    updateUpgradesHTML(i);
}

function setupUpgrades() {
    for (let [id,u] of Object.entries(UPGRADES)) {
        createGridElement(id+'-upgrades', {
            unl: u.unl,
            pos: u.pos, size: u.size,
            class: "upgrades-div",
            style: {
                backgroundColor: u.color[0],
            },
            get html() {
                let h = ``

                h += `<div class="upg-curr-display"><img src="images/${CURRENCIES[u.curr_dis.id]?.icon ?? u.curr_dis.icon ?? "Icons/Placeholder"}.png"><div id="upg-${id}-curr">???</div></div>`

                let bt = "bottom_text" in u

                let html = ""

                if (bt) h += `<div class="upg-bottom-text" id="upg-${id}-bottom"></div>`;

                for (let ui of u.order ?? Object.keys(u.ctn)) {
                    uu = u.ctn[ui]
                    let uh = ""

                    uh += `<img onclick="chooseUpgrade('${id}','${ui}')" class="img_desc" draggable="false" src="images/${uu.base ?? u.base ?? "Bases/GrasshopBase"}.png">`

                    let icon = []
                    if (uu.icons) icon.push(...uu.icons);
                    else icon.push("Icons/Placeholder");

                    uh += icon.map(x => `<img class="img_desc" draggable="false" src="images/${x}.png">`).join("")

                    if ('req' in uu) uh += `<img class="img_desc img_lock" draggable="false" src="images/Icons/Lock.png" id="upg-${id}-${ui}-locked">`;

                    let curr = CURRENCIES[uu.res]

                    uh += `<div class="upg-cost" id="upg-${id}-${ui}-cost">???</div><img class="img_res" draggable="false" src="images/${curr.base}.png"><img class="img_res" draggable="false" src="images/${curr.icon}.png">`
                    uh += `<div class="upg-lvl" id="upg-${id}-${ui}-lvl">0</div>`
                    if ('tier' in uu) uh += `<div class="upg-tier">${uu.tier}</div>`
                    uh += `<button class="upg-auto" id="upg-${id}-${ui}-auto" onclick="switchAutoUpgrade('${id}','${ui}')">I</button>`

                    html += `<div class="upgrade-div" id="upg-${id}-${ui}-div">${uh}</div>`
                }

                h += `<div class="upgrades-grid ${u.type}-mode ${bt ? "" : "large-size"}">${html}</div>`

                h += `<div id="upg-desc-${id}-div" class="upg-desc" style="background-color: ${u.color[0]}">
                    <div id="upg-desc-${id}"></div>
                    <div style="position: absolute; bottom: 0; width: 100%;">
                        <button style="background-color: ${u.color[1]}" onclick="chooseUpgrade('${id}',null)">Cancel</button>
                        <button style="background-color: ${u.color[1]}" onclick="buyUpgrade('${id}',upg_choose[1])">Buy One</button>
                        <button style="background-color: ${u.color[1]}" onclick="buyUpgrade('${id}',upg_choose[1],true)">Buy Max</button>
                        <button style="background-color: ${u.color[1]}" onclick="buyNextUpgrade('${id}',upg_choose[1])">Buy Next</button>
                    </div>
                </div>`

                return h
            },
            updateHTML() {
                updateUpgradesHTML(id)
            },
        })
    }
}

function updateUpgradesHTML(id,choosed) {
    if (!(id in UPGRADES)) return;
    let u = UPGRADES[id]
    let curr = CURRENCIES[u.curr_dis.id]
    let w = ""
    if (curr) {
        w += format(curr.amount, 0) + " "
        let g = tmp.currency_gain[u.curr_dis.id].mul(curr.passive??1)
        if (g.gt(0)) w += formatGain(curr.amount, g) + " "
    }
    if ("text" in u.curr_dis) w += u.curr_dis.text
    el(`upg-${id}-curr`).innerHTML = w
    let desc_visible = !choosed && upg_choose[0] === id && upg_choose[1] !== null
    el(`upg-desc-${id}-div`).style.display = el_display(desc_visible)
    if (desc_visible) {
        let ui = upg_choose[1], uu = UPGRADES[id].ctn[ui], lvl = player.upgs[id][ui], max = tmp.upg_cl[id] && !(u.cl_exc ?? []).includes(ui) ? EINF : (uu.max ?? 1), curr = CURRENCIES[uu.res], cost = uu.cost(lvl);
        let h = `[#${ui}] <h2 class="lightblue">${uu.name}</h2>`
        h += `<br>Level <b class="yellow">${format(lvl,0) + (Decimal.lt(max,EINF) ? ` / ${format(max,0)}` : "")}</b>`
        h += `<br><br>`+uu.desc
        if (uu.effDesc) h += `<br>Effect: <b class='cyan'>${uu.effDesc(tmp.upg_effects[id][ui])}</b>`
        if (lvl.lt(max)) {
            h += `<br><br><b class="${curr.amount.lt(cost) ? "red" : "green"}">Cost: ${format(cost,0)} ${curr.name}</b>`
            if (Decimal.gte(max,25)) {
                let next = uu.noCostIncrease ? tmp.upg_el[id] ? uu.cost() : Decimal.sub(25,lvl.mod(25)).add(lvl).min(max).sub(lvl).mul(uu.cost()) : tmp.upg_el[id] ? uu.cost(Decimal.sub(25,lvl.mod(25)).add(lvl).min(max).sub(1)) : SH.advancedCostToNext25(lvl, max, uu.cost)
                h += `<br><b class="${curr.amount.lt(next) ? "red" : "green"}">Cost to next 25: ${format(next,0)} ${curr.name}</b>`
            }
            h += `<br>You have ${format(curr.amount,0)} ${curr.name}`
        }
        el(`upg-desc-${id}`).innerHTML = h
    } else {
        let auto = u.autobuy?.()
        for (let [ui,uu] of Object.entries(u.ctn)) {
            let lvl = player.upgs[id][ui], max = tmp.upg_cl[id] && !(u.cl_exc ?? []).includes(ui) ? EINF : (uu.max ?? 1)
            let unl = uu.unl() && (!options.hideMaxed || lvl.lt(max)), el_id = `upg-${id}-${ui}`
            el(el_id+"-div").style.display = el_display(unl)
            if (unl) {
                let req = !uu.req || uu.req()
                let curr = CURRENCIES[uu.res], cost = uu.cost(lvl);
                el(el_id+"-lvl").innerHTML = req ? format(lvl,0) : ""
                el(el_id+"-cost").innerHTML = lvl.gte(max) ? "Maxed" : req ? format(cost,0) : uu.req_desc ?? "???"
                el(el_id+"-cost").className = el_classes({"upg-cost": true, locked: !req || curr.amount.lt(cost), maxed: lvl.gte(max)})
                el(el_id+"-auto").style.display = el_display(auto)
                let s = player.auto_upgs[id][ui]

                el(el_id+"-auto").innerHTML = s ? "I" : "O"
                el(el_id+"-auto").style.backgroundColor = s ? "lime" : "red"

                el(el_id+"-div").className = el_classes({'upgrade-div': true, 'not-require': !req})
            }
        }
        if ("bottom_text" in u) el(`upg-${id}-bottom`).innerHTML = u.bottom_text
    }
}

function switchAutoUpgrade(id,ui) { player.auto_upgs[id][ui] = !player.auto_upgs[id][ui] }
function hasUpgrade(id,ui,lvl=1) { return player.upgs[id]?.[ui]?.gte?.(lvl) }
function upgradeEffect(id,ui,def=1) { return tmp.upg_effects[id]?.[ui] ?? def }
function simpleUpgradeEffect(id,ui,def=1) { return hasUpgrade(id,ui) ? upgradeEffect(id,ui,def) : def }

function updateUpgradesTemp() {
    for (let id in UPGRADES) {
        updateUpgradeTemp(id)
    }
}

function updateUpgradeTemp(id) {
    let upg = UPGRADES[id]
    let tue = tmp.upg_effects[id]
    for (let ui in upg.ctn) {
        let u = upg.ctn[ui]

        if (u.effect) tue[ui] = u.effect(player.upgs[id][ui]);
    }
    tmp.upg_el[id] = upg.el?.()
    tmp.upg_cl[id] = upg.cl?.()
}

function resetUpgrades(id, keep=[]) {
    for (let ui in UPGRADES[id].ctn) {
        if (!keep.includes(ui)) player.upgs[id][ui] = E(0)
    }
}

function calculateTotalUpgrades(id) {
    let s = E(0)
    for (let ui in UPGRADES[id].ctn) {
        s = s.add(player.upgs[id][ui])
    }
    return s
}