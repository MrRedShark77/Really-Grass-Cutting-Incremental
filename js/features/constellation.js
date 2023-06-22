RESET.constellation = {
    unl: ()=>player.planetoid.active&&player.lowGH<=-48,

    req: ()=>player.planetoid.level>=300,
    reqDesc: ()=>`Reach Level 300.`,

    resetDesc: `
    Reset everything the planetary does as well as planets and planetary upgrades.<br><br>First Constellation unlocks the building (on top-left of the reset).
    `,
    resetGain: ()=> `Gain <b>3</b> Lines`,

    title: `Constellation`,
    resetBtn: `Form a Constellation`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                player.constellation.unl = true
                player.constellation.line = player.constellation.line.add(3)
            }

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="cs") {
        player.planetoid.planet = E(0)
        player.planetoid.bestPlanet = E(0)
        resetUpgrades('planet')

        RESET.formRing.doReset('planet')

        updateTemp()
    },
}

UPGS.constellation = {
    unl: ()=>player.constellation.unl,

    title: "Constellation Upgrades",

    underDesc: ()=>``,

    // autoUnl: ()=>hasStarTree('reserv',31),
    // noSpend: ()=>hasStarTree('reserv',31),

    ctn: [
        {
            max: 1000,

            title: "Planetarium Constellation",
            desc: `Increase planetarium gain by <b class="green">+50%</b> per level.<br>This effect is increased by <b class="green">50%</b> every <b class="yellow">25</b> levels.`,

            res: "line",
            icon: ['Curr/Planetoid'],
                
            cost: i => Decimal.pow(1.25,i).mul(5).ceil(),
            bulk: i => i.div(5).max(1).log(1.25).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.5,Math.floor(i/25)).mul(i/2+1)

                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 1000,

            title: "XP Constellation",
            desc: `Increase XP gain compounding by <b class="green">+100%</b> per level.`,

            res: "line",
            icon: ['Icons/XP'],
                
            cost: i => Decimal.pow(1.25,i).mul(1e3).ceil(),
            bulk: i => i.div(1e3).max(1).log(1.25).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(2,i)

                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 500,

            title: "Line Constellation",
            desc: `Increase line gain compounding by <b class="green">+25%</b> per level.`,

            res: "line",
            icon: ['Curr/Lines'],
                
            cost: i => Decimal.pow(2,i).mul(1e4).ceil(),
            bulk: i => i.div(1e4).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.25,i)

                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 1,

            title: "True Grass Cap",
            desc: `Compaction no longer affects grass cap.`,

            res: "line",
            icon: ['Icons/MoreGrass'],
                
            cost: i => E(1e6),
            bulk: i => 1,
        },
    ],
}

function getConstellationSave() {
    let s = {
        unl: false,
        line: E(0),

        grid: new Array(7).fill(new Array(7).fill('')),
        presets: new Array(MAX_PRESETS).fill({
            encode: '',
            boosts: '',
            cost: [E(0)],
        }),
    }

    return s
}

const CS_PREFIX = [
    null,
    ['Basic ',``],
    ['Advanced ',`brightness(0) saturate(100%) invert(96%) sepia(65%) saturate(1066%) hue-rotate(51deg) brightness(101%) contrast(102%)`], // #70FF75
    ['Powerful ',`brightness(0) saturate(100%) invert(89%) sepia(12%) saturate(1523%) hue-rotate(143deg) brightness(99%) contrast(104%)`], // #87F9FF
    ['Mega ',`brightness(0) saturate(100%) invert(74%) sepia(96%) saturate(3602%) hue-rotate(207deg) brightness(100%) contrast(108%)`], // #9692FF
    ['Giga ',`brightness(0) saturate(100%) invert(55%) sepia(27%) saturate(1077%) hue-rotate(233deg) brightness(100%) contrast(105%)`], // #D278FF
    ['Tera ',`brightness(0) saturate(100%) invert(61%) sepia(86%) saturate(685%) hue-rotate(286deg) brightness(103%) contrast(101%)`], // #FF7BD1
    ['Peta ',`brightness(0) saturate(100%) invert(76%) sepia(83%) saturate(3397%) hue-rotate(312deg) brightness(99%) contrast(125%)`], // #FF7373
    ['Exa ',`brightness(0) saturate(100%) invert(79%) sepia(41%) saturate(762%) hue-rotate(321deg) brightness(104%) contrast(101%)`], // #FFB972
    ['Zetta ',`brightness(0) saturate(100%) invert(90%) sepia(23%) saturate(963%) hue-rotate(355deg) brightness(106%) contrast(101%)`], // #FFF66B
    ['Yotta ',`brightness(0) saturate(100%) invert(76%) sepia(0%) saturate(1060%) hue-rotate(201deg) brightness(90%) contrast(82%)`], // #A7A7A7
    ['Ronna ',`brightness(0) saturate(100%) invert(13%) sepia(94%) saturate(5713%) hue-rotate(358deg) brightness(95%) contrast(114%)`], // #FF0000
    ['Quetta ',`brightness(0) saturate(100%) invert(75%) sepia(38%) saturate(6450%) hue-rotate(359deg) brightness(100%) contrast(107%)`], // #FF9500
]

const CS_BUILDINGS = [
    {
        title: 'Generator',
        img: 'Icons/ConstellationGenerator',
        max: 12,

        desc: x => `Passively generate <b class='green'>${format(x,0)}</b> Lines.`,

        cost: x => Decimal.pow(100,x**1.2).round(),
        insta: x => Decimal.pow(9,x).round(),
        eff: x => Decimal.pow(10,x).round(),
    },{
        title: 'Stabilizer',
        img: 'Icons/ConstCooler',
        max: 12,

        desc: x => `Reduce the instability of adjacent constellations by <b class='green'>${format(x,0)}</b>.`,

        cost: x => Decimal.pow(100,x**1.15).mul(50).round(),
        eff: x => Decimal.pow(4,x).mul(5).mul(tmp.coolerPow).round(),
    },{
        title: 'Reinforcement',
        img: 'Icons/ConstellationSquare',
        max: 12,

        desc: x => `Increase the instability limit by <b class='green'>${format(x,0)}</b>.`,

        cost: x => Decimal.pow(100,x**1.15).mul(250).round(),
        eff: x => Decimal.pow(4,x).mul(10).mul(tmp.squarePow).round(),
    },{
        title: 'Ring',
        img: 'Icons/ConstRings',
        max: 12,

        desc: x => `Increase rings gain by <b class='green'>${formatMult(x.add(1))}</b>.`,

        cost: x => Decimal.pow(100,x**1.2).mul(1e5).round(),
        insta: x => Decimal.pow(6,x).mul(1e2).round(),
        eff: x => Decimal.pow(1.5,x).mul(1.25).sub(1),
    },{
        title: 'Moon',
        img: 'Icons/ConstMoon',
        max: 12,

        desc: x => `Increase lunar powers gain by <b class='green'>${formatMult(x.add(1))}</b>.`,

        cost: x => Decimal.pow(100,x**1.2).mul(5e5).round(),
        insta: x => Decimal.pow(6,x).mul(5e2).round(),
        eff: x => Decimal.pow(1.5,x).mul(1.25).sub(1),
    },{
        title: 'Amplifier',
        img: 'Icons/ConstArrow',
        max: 12,

        desc: x => `Boost the power of adjacent constellations and their instability by <b class='green'>${formatMult(x)}</b>.`,

        cost: x => Decimal.pow(1000,x).mul(1e6).round(),
        eff: x => Decimal.pow(1.25,x).mul(1.25),
    },
]

/*

Constellation Type

0 - Generator
1 - Stabilizer
2 - Reinforcement

*/

var cs_tab = 0
var cs_tier = 1
var cs_selected = ''
var cs_sellMode = false

var cs_grid_temp = []
var cs_insta = {
    total: E(0),
    max: E(10),
}
var cs_effect = {
    
}

for (let y = 0; y < 7; y++) cs_grid_temp[y] = new Array(7)

function resetConstellationTemp() {
    cs_effect = {
        line: E(0),
        ring: E(1),
        moon: E(1),
    }
}

resetConstellationTemp()

const ADJ_VEL = [[0,1],[0,-1],[1,0],[-1,0]]
const NO_ADJ_TYPE = [1,2,5]
const ADJ_BOOST = [3,4]
const MAX_PRESETS = 5

function selectConstellation(i) { cs_selected = i + 't' + cs_tier }
function actionGrid(y,x) {
    if (cs_selected || cs_sellMode) {
        let grid = player.constellation.grid[y][x]

        if (cs_sellMode || grid && grid != cs_selected) sellGrid(y,x,false)

        if (!cs_sellMode && !player.constellation.grid[y][x] && checkCost(cs_selected)) player.constellation.grid[y][x] = cs_selected
    }

    updateConstellation()
}
function checkCost(id) {
    let s = id.split('t'), type = parseInt(s[0]), tier = parseInt(s[1]), cs = CS_BUILDINGS[type]

    let cost = cs.cost(tier-1)

    if (player.constellation.line.gte(cost)) {
        player.constellation.line = player.constellation.line.sub(cost).max(0)
        return true
    }

    return false
}

function sellGrid(y,x,update=true) {
    let g = player.constellation.grid[y][x]

    if (g) {
        let s = g.split('t'), type = parseInt(s[0]), tier = parseInt(s[1]), cs = CS_BUILDINGS[type]

        player.constellation.line = player.constellation.line.add(cs.cost(tier-1))
        player.constellation.grid[y][x] = ''

        if (update) updateConstellation()
    }
}

function sellAllGrids(update=true) {
    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) sellGrid(y,x,false);

    if (update) updateConstellation()
}

function checkGrid(update=false) {
    let grids = player.constellation.grid

    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
        let g = grids[y][x], o = { mult: E(1), insta: E(0) }

        if (g) {
            let s = g.split('t'), type = parseInt(s[0]), tier = parseInt(s[1]), cs = CS_BUILDINGS[type], insta_sub = E(0), eff = cs.eff(tier-1)

            let mul_add = E(0), mul_mul = E(1)

            if (cs.insta) o.insta = cs.insta(tier-1)

            if (!NO_ADJ_TYPE.includes(type)) for (let i in ADJ_VEL) {
                let ag = grids[y+ADJ_VEL[i][0]]

                if (!ag) continue

                ag = ag[x+ADJ_VEL[i][1]]

                if (ag) {
                    let atype = parseInt(ag.split('t')[0]), atier = parseInt(ag.split('t')[1]), acs = CS_BUILDINGS[atype], aeff = acs.eff(atier-1)

                    if (atype == type) {
                        if (ADJ_BOOST.includes(type)) mul_add = mul_add.add(0.5)
                        else mul_mul = mul_mul.mul(2)
                        o.insta = o.insta.mul(1.5)
                    } else if (atype == 1) {
                        insta_sub = insta_sub.add(aeff)
                    } else if (atype == 5) {
                        o.insta = o.insta.mul(aeff)
                        mul_mul = mul_mul.mul(aeff)
                    } 
                }
            }

            // console.log(o,y,x)

            o.mult = o.mult.add(mul_add).mul(mul_mul)
            o.insta = o.insta.sub(insta_sub).max(0)

            if (update) {
                switch (type) {
                    case 0:
                        cs_effect.line = cs_effect.line.add(eff.mul(o.mult))
                        break
                    case 2:
                        cs_insta.max = cs_insta.max.add(eff)
                        break
                    case 3:
                        cs_effect.ring = cs_effect.ring.mul(eff.mul(o.mult).add(1))
                        break
                    case 4:
                        cs_effect.moon = cs_effect.moon.mul(eff.mul(o.mult).add(1))
                        break
                }

                cs_insta.total = cs_insta.total.add(o.insta)
            }
        }

        cs_grid_temp[y][x] = o
    }
}

function updateConstellation() {
    resetConstellationTemp()

    cs_insta = {
        total: E(0),
        max: E(5),
    }

    let grids = player.constellation.grid

    checkGrid(true)

    if (cs_insta.total.gt(cs_insta.max)) resetConstellationTemp()

    // Update Images/Texts

    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
        let g = grids[y][x], h = ''

        if (g) {
            let gt = cs_grid_temp[y][x]

            // console.log(gt,y,x)

            h += getConstellationImage(g) + '<div style="font-weight: bold">'

            if (gt.insta.gt(0)) h += "<div class='red'>+"+format(gt.insta,1,6)+"</div>"

            if (gt.mult.gt(1)) h += "<div class='green'>x"+format(gt.mult,2,6)+"</div>"

            h += '</div>'
        }
        
        tmp.el['cs_grid'+y+''+x].setHTML(h)
    }
}

function getConstellationImage(id) {
    let s = id.split('t')

    return `<img src = 'images/${CS_BUILDINGS[s[0]].img}.png' draggable="false" style='filter: ${CS_PREFIX[s[1]][1]}'>`
}

function lineGain() {
    let x = cs_effect.line

    .mul(upgEffect('constellation',2))
    .mul(getLEffect(7))

    return x
}

function updateConstellationTemp() {
    tmp.lineGain = lineGain()

    tmp.squarePow = E(1).mul(starTreeEff('ring',35))
    tmp.coolerPow = E(1).mul(starTreeEff('ring',34))
}

tmp_update.push(()=>{
    updateConstellationTemp()
})

el.update.constellation = function () {
    for (let i = 0; i < 3; i++) {
        tmp.el['cs_tab'+i].setDisplay(cs_tab == i)
    }

    if (cs_tab == 0) {
        let lines = player.constellation.line

        for (let i = 1; i <= 12; i++) {
            tmp.el['cs_tier_btn'+i].setDisplay(i <= cs_max_tier)
        }

        for (let i in CS_BUILDINGS) {
            let cs = CS_BUILDINGS[i], prefix = CS_PREFIX[cs_tier]

            let dis = cs_tier <= cs.max && prefix && cs_tier <= cs_building_tiers_dis[i], div = tmp.el['cs_build_div'+i]

            div.setDisplay(dis)

            if (dis) {
                tmp.el['cs_build_img'+i].changeStyle('filter',prefix[1])

                let h = `${prefix[0]+cs.title} [T${cs_tier}]<span style='font-size: 14px'>`

                h += '<br>' + cs.desc(cs.eff(cs_tier-1))

                if (cs.insta) h += '<br>Increase the instability by <b class="red">'+format(cs.insta(cs_tier-1),0)+'</b>'
                
                let cost = cs.cost(cs_tier-1), c = `<br> Cost: ${cost.format(0)}` + ' Lines'
                if (lines.lt(cost)) c = '<span class="red">'+c+'</span>'
                h += c

                h += '</span>'

                tmp.el['cs_desc'+i].setHTML(h)

                div.changeStyle('height', document.getElementById('cs_desc'+i).clientHeight+'px')
            }
        }
    } else if (cs_tab == 1) {
        let h = ''

        if (cs_effect.line.gt(0)) h += `+${cs_effect.line.format(0)}/s to Lines gain.<br>`
        if (cs_effect.ring.gt(1)) h += `${formatMult(cs_effect.ring)} to Rings gain.<br>`
        if (cs_effect.moon.gt(1)) h += `${formatMult(cs_effect.moon)} to Lunar Powers gain.<br>`

        tmp.el.cs_effects.setHTML(h)
    } else if (cs_tab == 2) {
        for (let i = 0; i < MAX_PRESETS; i++) {
            let p = player.constellation.presets[i];

            tmp.el['cs_preset_cost'+i].setHTML(p.cost[0].gt(0) ? p.cost[0].format(0) + ' Lines' : '???')

            tmp.el['cs_preset_boost'+i].setHTML(p.boosts?'Boosts: '+p.boosts:'No Boosts')
        }
    }

    let h = ''
    if (cs_selected) h = getConstellationImage(cs_selected) + ' Selected!'
    tmp.el.constellation_select.setHTML(h)

    h = 'Instability: '+cs_insta.total.format(1)+' / '+cs_insta.max.format(1)
    if (cs_insta.total.gt(cs_insta.max)) h = '<b class="red">'+h+'</b>'
    tmp.el.constellation_stab.setHTML(h)

    h = player.constellation.line.format(0) + ' Lines' + (tmp.lineGain.gt(0) ? ' <span class="smallAmt">'+player.constellation.line.formatGain(tmp.lineGain)+'</span>' : '')
    tmp.el.constellation_amt.setHTML(h)

    tmp.el.cs_sell.setTxt('Delete Mode: '+(cs_sellMode ? "ON" : "OFF"))
}

var cs_building_tiers_dis = new Array(CS_BUILDINGS.length).fill(1);
var cs_max_tier = 1

function checkConstellationCosts() {
    let lines = player.constellation.line

    cs_building_tiers_dis = new Array(CS_BUILDINGS.length).fill(1)
    cs_max_tier = 1

    for (let i in CS_BUILDINGS) {
        let cs = CS_BUILDINGS[i], t = 1
        for (let j = 2; j <= cs.max; j++) {
            if (lines.lt(cs.cost(j-1).mul(0.04))) break;

            t = j
        }

        cs_building_tiers_dis[i] = t
        cs_max_tier = Math.max(cs_max_tier,t)
    }
}

const PRES_BOOSTS = {
    0: 'Lines',
    3: 'Rings',
    4: 'Lunar Powers',
}

function savePreset(i) {
    let grids = player.constellation.grid
    let c = '', cost = [E(0)], b = ''

    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) if (grids[y][x]) {
        let s = grids[y][x].split('t'), type = parseInt(s[0]), tier = parseInt(s[1]), cs = CS_BUILDINGS[type]

        c += c ? ','+grids[y][x] : grids[y][x]

        cost[0] = cost[0].add(cs.cost(tier-1))

        if (type in PRES_BOOSTS && !b.includes(PRES_BOOSTS[type])) b += b ? ', ' + PRES_BOOSTS[type] : PRES_BOOSTS[type]
    } else c += c ? ',-' : '-'

    player.constellation.presets[i] = {
        encode: c,
        cost: cost,
        boosts: b,
    }
}

function loadPreset(i) {
    let p = player.constellation.presets[i]

    if (p.encode && player.constellation.line.gte(p.cost[0])) {
        player.constellation.line = player.constellation.line.sub(p.cost[0])

        let e = p.encode.split(',')

        sellAllGrids(false)

        for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) if (e[y*7+x] != '-') player.constellation.grid[y][x] = e[y*7+x]

        updateConstellation()
    }
}

el.setup.constellation = function () {
    // Grids
    
    let h = ''

    for (let y = 0; y < 7; y++) {
        h += `<div class='table_center'>`

        for (let x = 0; x < 7; x++) {
            h += `<div class='cs-grid' onclick='actionGrid(${y},${x})' id='cs_grid${y}${x}'></div>`
        }

        h += '</div>'
    }

    new Element('constellation_grid').setHTML(h)

    // Building Tier Buttons

    h = ''

    for (let i = 1; i <= 12; i++) {
        h += `<button onclick='cs_tier = ${i}' id='cs_tier_btn${i}'>T${i}</button>`
    }

    new Element('cs_btn_table').setHTML(h)

    // Buildings

    h = ''

    for (let i in CS_BUILDINGS) {
        let cs = CS_BUILDINGS[i]

        h += `
        <div class='cs-building' id='cs_build_div${i}'>
            <img src='images/Bases/ConstellationBase.png' draggable="false">
            <img src='images/${cs.img}.png' draggable="false" id='cs_build_img${i}' onclick='selectConstellation(${i})'>
            <div id='cs_desc${i}'></div>
        </div>
        `
    }

    new Element('cs_build_table').setHTML(h)

    // Presets

    h = ''

    for (let i = 0; i < MAX_PRESETS; i++) {
        h += `
        <div class='cs-preset'>
            <h3>Preset ${i+1}</h3><br>
            Cost: <span id='cs_preset_cost${i}'>???</span><br>
            <span id='cs_preset_boost${i}'>No Boosts</span><br>
            <button onclick='savePreset(${i})'>Save</button><button onclick='loadPreset(${i})'>Load</button>
        </div>
        `
    }

    new Element('cs_presets').setHTML(h)
}