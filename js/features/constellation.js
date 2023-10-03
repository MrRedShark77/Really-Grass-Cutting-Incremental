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

    autoUnl: ()=>hasSolarUpgrade(0,12),
    noSpend: ()=>hasSolarUpgrade(0,12),

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
        },{
            max: 1000,

            title: "Planetarium Arc",
            desc: `Increase planetarium gain by <b class="green">+50%</b> per level.<br>This effect is increased by <b class="green">50%</b> every <b class="yellow">25</b> levels.`,

            res: "arc",
            icon: ['Curr/Planetoid'],
                
            cost: i => Decimal.pow(1.25,i).mul(5).ceil(),
            bulk: i => i.div(5).max(1).log(1.25).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.5,Math.floor(i/25)).mul(i/2+1)

                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 500,

            title: "Arc Constellation",
            desc: `Increase arc gain compounding by <b class="green">+20%</b> per level.`,

            res: "arc",
            icon: ['Curr/Arcs'],
                
            cost: i => Decimal.pow(2,i).mul(10).ceil(),
            bulk: i => i.div(10).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.2,i)

                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 1000,

            title: "XP Arc",
            desc: `Increase XP gain compounding by <b class="green">+100%</b> per level.`,

            res: "arc",
            icon: ['Icons/XP'],
                
            cost: i => Decimal.pow(1.25,i).mul(1e3).ceil(),
            bulk: i => i.div(1e3).max(1).log(1.25).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(2,i)

                return x
            },
            effDesc: x => formatMult(x),
        },{
            unl: ()=>hasSolarUpgrade(2,5),
            max: 100,

            title: "Final Prism Upgrade",
            desc: `Increase Final Prism's tier.`,

            res: "line",
            icon: ['Icons/PrismUpgrade',"Icons/StarSpeed"],
                
            cost: i => Decimal.pow(100,i**1.25).mul(1e6).ceil(),
            bulk: i => i.div(1e6).max(1).log(100).root(1.25).floor().toNumber()+1,

            effect(i) {
                let x = i

                return x
            },
            effDesc: x => "+"+format(x,0),
        },
    ],
}

function getConstellationSave() {
    let s = {
        unl: false,
        line: E(0),
        arc: E(0),
        arcUnl: false,

        grid: new Array(7).fill(new Array(7).fill('')),
        presets: new Array(MAX_PRESETS).fill({
            encode: '',
            boosts: '',
            cost: [E(0),E(0)],
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

function getCSTierMult(t) { return 1+Math.max(t-8,0)**1.5/10 }

const CS_BUILDINGS = [
    {
        title: 'Generator',
        img: 'Icons/ConstellationGenerator',
        imgTier: 'Icons/ConstGenerator2',
        max: 24,

        desc: x => `Passively generate <b class='green'>${format(x,0)}</b> Lines.`,

        cost: x => Decimal.pow(100,x**1.2*getCSTierMult(x)).round(),
        insta: x => Decimal.pow(9,x).round(),
        eff: x => Decimal.pow(10,x).mul(cs_effect.boostPow).round(),
    },{
        title: 'Stabilizer',
        img: 'Icons/ConstCooler',
        imgTier: 'Icons/ConstCooler2',
        max: 24,

        desc: x => `Reduce the instability of adjacent constellations by <b class='green'>${format(x,0)}</b>.`,

        cost: x => Decimal.pow(100,x**1.15*getCSTierMult(x)).mul(50).round(),
        eff: x => Decimal.pow(4,x).mul(5).mul(tmp.coolerPow).round(),
    },{
        title: 'Reinforcement',
        img: 'Icons/ConstellationSquare',
        imgTier: 'Icons/ConstSquare2',
        max: 24,

        desc: x => `Increase the instability limit by <b class='green'>${format(x,0)}</b>.`,

        cost: x => Decimal.pow(100,x**1.15*getCSTierMult(x)).mul(250).round(),
        eff: x => Decimal.pow(4,x).mul(10).mul(tmp.squarePow).mul(cs_effect.reinPow).round(),
    },{
        title: 'Ring',
        img: 'Icons/ConstRings',
        imgTier: 'Icons/ConstRing2',
        max: 24,

        desc: x => `Increase rings gain by <b class='green'>${formatMult(x.add(1))}</b>.`,

        cost: x => Decimal.pow(100,x**1.2*getCSTierMult(x)).mul(1e5).round(),
        insta: x => Decimal.pow(6,x).mul(1e2).round(),
        eff: x => Decimal.pow(1.5,x).mul(.5).mul(cs_effect.boostPow),
    },{
        title: 'Moon',
        img: 'Icons/ConstMoon',
        imgTier: 'Icons/ConstMoon2',
        max: 24,

        desc: x => `Increase lunar powers gain by <b class='green'>${formatMult(x.add(1))}</b>.`,

        cost: x => Decimal.pow(100,x**1.2*getCSTierMult(x)).mul(5e5).round(),
        insta: x => Decimal.pow(6,x).mul(5e2).round(),
        eff: x => Decimal.pow(1.5,x).mul(.5).mul(cs_effect.boostPow),
    },{
        title: 'Amplifier',
        img: 'Icons/ConstArrow',
        imgTier: 'Icons/ConstArrow2',
        max: 24,

        desc: x => `Boost the power of adjacent constellations and their instability by <b class='green'>${formatMult(x)}</b>.`,

        cost: x => Decimal.pow(1000,x*getCSTierMult(x)).mul(1e6).round(),
        eff: x => Decimal.pow(1.25,x).mul(1.25),
    },{
        title: 'Bolt',
        img: 'Icons/ConstCharge',
        imgTier: 'Icons/ConstCharge2',
        max: 24,

        desc: x => `Boost dark charge rate by <b class='green'>${formatMult(x.add(1))}</b>.`,

        cost: x => Decimal.pow(1000,x*getCSTierMult(x)).mul(1e13).round(),
        insta: x => Decimal.pow(7.5,x).mul(1.5e3).round(),
        eff: x => Decimal.pow(1.5,x).mul(.25).mul(cs_effect.boostPow),
    },{
        title: 'Arc',
        img: 'Icons/ConstArc',
        max: 12,

        desc: x => `Passively generate <b class='green'>${format(x,0)}</b> Arcs, if must be placed adjacent to 2+ Moons with tier of 4+. Higher moon tier means higher generation!`,

        cost: x => Decimal.pow(1000,x*getCSTierMult(x)).mul(1e16).round(),
        insta: x => Decimal.pow(9,x).mul(1e5).round(),
        eff: x => Decimal.pow(10,x).round(),
    },{
        type: 1,

        title: 'Stellarium',
        img: 'Icons/ConstStar',
        max: 12,

        desc: x => `Increase Stellaris limit by <b class='green'>${format(x,0)}</b>.`,

        cost: x => Decimal.pow(100,x*getCSTierMult(x)).mul(100).round(),
        eff: x => 3*x+3,
    },{
        type: 1,

        title: 'Diminisher',
        img: 'Icons/ConstReducer',
        max: 12,

        desc: x => `Divide the instability generation of adjacent constellations by <b class='green'>${format(x,0)}</b>.`,

        cost: x => Decimal.pow(100,x*getCSTierMult(x)).mul(500).round(),
        insta: x => E(2*x+2),
        eff: x => x+2,
    },{
        type: 1,

        title: 'Bulwark',
        img: 'Icons/ConstWall',
        max: 12,

        desc: x => `Additively boost the power of reinforcements by <b class='green'>+${format(x.mul(100))}%</b>.`,

        cost: x => Decimal.pow(100,x*getCSTierMult(x)).mul(1e3).round(),
        insta: x => E(x+1),
        eff: x => E(2**x*0.3),
    },{
        type: 1,

        title: 'Magnifier',
        img: 'Icons/ConstCircle',
        max: 12,

        desc: x => `Boost the power of Generators, Moons, Rings and Bolts by <b class='green'>+${format(x.mul(100))}%</b>.`,

        cost: x => Decimal.pow(100,x*getCSTierMult(x)).mul(1e3).round(),
        insta: x => E(x+1),
        eff: x => E(1.25**x*(x+1)*0.2),
    },{
        type: 1,

        title: 'Echo',
        img: 'Icons/ConstEcho',
        max: 12,

        desc: x => `Increase the power of the constellation to the left tile by <b class='green'>${formatMult(x)}</b>. It's not affected by Echo.`,

        cost: x => Decimal.pow(1e3,x*getCSTierMult(x)).mul(1e5).round(),
        insta: x => E(x*3+3),
        eff: x => E(1.5**x+1),
    },{
        title: 'Prism',
        img: 'Icons/ConstPrism',
        imgTier: 'Icons/ConstPrism2',
        max: 24,

        desc: x => `
        Generate <b class='green'>${format(x.line,0)}</b> Lines & <b class='green'>${format(x.arc,0)}</b> Arcs.<br>
        Increase rings & lunar powers gain, dark charge rate by <b class='green'>${formatMult(x.rmb.add(1))}</b>.
        `,

        cost: x => Decimal.pow(100,x**1.25*getCSTierMult(x)).mul(1e4).round(),
        insta: x => Decimal.pow(9,x).mul(10).round(),
        eff: x => {
            let p = cs_effect.boostPow
            const e = {}

            e.line = Decimal.pow(10,x).mul(100).mul(p)
            e.arc = Decimal.pow(10,x).mul(10).mul(p)

            e.rmb = Decimal.pow(1.75,x).mul(.5).mul(p)

            return e
        },
    },{
        title: 'Final Prism',
        img: 'Icons/ConstPrism3',
        max: 1,
        cap: 1,

        desc: x => `
        Generate <b class='green'>${format(x.line,0)}</b> Lines & <b class='green'>${format(x.arc,0)}</b> Arcs.<br>
        Increase rings & lunar powers gain, dark charge rate by <b class='green'>${formatMult(x.rmb.add(1))}</b>.
        `,

        cost: x => E(1e4),
        eff: x => {
            const e = {}, p = cs_effect.gridPow

            e.line = Decimal.pow(10,tmp.FP_tier).mul(1000).pow(p)
            e.arc = Decimal.pow(10,tmp.FP_tier).mul(100).pow(p)

            e.rmb = Decimal.pow(2,tmp.FP_tier).mul(.5).add(1).pow(50).pow(p).sub(1)

            return e
        },
    },{
        title: 'Grid',
        img: 'Icons/GridConstellation',
        max: 12,
        cap: 1,

        desc: x => `Boost the power of Final Prism by <b class='green'>${formatPow(x.add(1))}</b>. The effect after boost caps at <b class='red'>3</b>.`,

        cost: x => Decimal.pow(1e25,x**1.25*(Math.max(x-3,0)**2/10+1)).mul(1e150).round(),
        eff: x => E(x/10+.1).add(1).softcap(1.4,1/3,0).sub(1),
    },{
        title: 'Ray',
        img: 'Icons/RayConstellation',
        max: 12,
        get cap() { return 5 + solarUpgEffect(6,3,0) },

        desc: x => `Increase Solar Ray gain by <b class='green'>+${format(x.mul(100))}%</b>.`,

        cost: x => Decimal.pow(1e25,x**1.25*(Math.max(x-3,0)**2/10+1)).mul(1e150).round(),
        eff: x => Decimal.pow(2,x).mul(.1).mul(cs_effect.starPow),
    },{
        title: 'Star',
        img: 'Icons/StarConstellation',
        max: 12,
        cap: 5,

        desc: x => `Increase the power of all Persistent constellations on the grid by <b class='green'>+${format(x.mul(100))}%</b>.`,

        cost: x => Decimal.pow(1e25,x**1.25*(Math.max(x-3,0)**2/10+1)).mul(1e150).round(),
        eff: x => Decimal.mul(x/20+.05,tmp.constStarStrong?3:1),
    },{
        title: 'Improver',
        img: 'Icons/ImproverConstellation',
        max: 12,
        get cap() { return 3 + solarUpgEffect(6,4,0) },

        desc: x => `Increase the power of adjacent Persistent constellations by <b class='green'>+${format(x.mul(100))}%</b>.`,

        cost: x => Decimal.pow(1e25,x**1.25*(Math.max(x-3,0)**2/10+1)).mul(1e150).round(),
        eff: x => E(x/10+.1),
    },
]

/*

Constellation Type

0 - Generator
1 - Stabilizer
2 - Reinforcement
3 - Ring
4 - Moon
5 - Amplifier
6 - Bolt
7 - Arc

8 - Stellarium
9
10
11
12

13 - Prism

14 - Final Prism
15 - Grid
16 - Ray
17 - Star
18 - Improver

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
var cs_stellar = {
    total: E(0),
    max: E(0),
}
var cs_effect = {}
var cs_amount = []

for (let y = 0; y < 7; y++) cs_grid_temp[y] = new Array(7)

function resetConstellationTemp() {
    cs_effect = {
        line: E(0),
        ring: E(1),
        moon: E(1),
        bolt: E(1),
        arc: E(0),

        reinPow: E(1),
        boostPow: E(1),

        ray: E(1),
        starPow: E(1),
        gridPow: E(1),
    }
    for (let x in CS_BUILDINGS) cs_amount[x] = 0;
}

resetConstellationTemp()

const ADJ_VEL = [[0,1],[0,-1],[1,0],[-1,0]]
const NO_ADJ_TYPE = [1,2,5,8,18]
const ADJ_BOOST = [3,4,6]
const MAX_PRESETS = 5

function selectConstellation(i) { cs_selected = i + 't' + cs_tier }
function actionGrid(y,x) {
    if (cs_selected || cs_sellMode) {
        let grid = player.constellation.grid[y][x]

        if (cs_sellMode || grid && grid != cs_selected && checkCost(cs_selected,grid)) sellGrid(y,x,false)

        if (!cs_sellMode && !player.constellation.grid[y][x] && checkCost(cs_selected,grid,true)) player.constellation.grid[y][x] = cs_selected
    }

    updateConstellation()
}
function checkCost(id,grid,buy=false) {
    let s = id.split('t'), type = parseInt(s[0]), tier = parseInt(s[1]), cs = CS_BUILDINGS[type], cs_type = cs.type||0

    if (cs.cap && cs_amount[type] >= cs.cap && type != parseInt(grid.split('t')[0])) return false

    let cost = cs.cost(tier-1), res = [player.constellation.line, player.constellation.arc]

    if (res[cs_type].gte(cost)) {
        if (buy) player.constellation[['line','arc'][cs_type]] = player.constellation[['line','arc'][cs_type]].sub(cost).max(0)
        return true
    }

    return false
}

function sellGrid(y,x,update=true,refund=true,sn=false) {
    let g = player.constellation.grid[y][x]

    if (g) {
        let s = g.split('t'), type = parseInt(s[0]), tier = parseInt(s[1]), cs = CS_BUILDINGS[type], cs_type = cs.type||0

        if (sn && type > 13) return;

        if (refund) player.constellation[['line','arc'][cs_type]] = player.constellation[['line','arc'][cs_type]].add(cs.cost(tier-1))
        player.constellation.grid[y][x] = ''

        if (update) updateConstellation()
    }
}

function sellAllGrids(update=true,refund=true,sn=false) {
    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) sellGrid(y,x,false,refund,sn);

    if (update) updateConstellation()
}

function checkGrid(update) {
    let grids = player.constellation.grid

    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
        let g = grids[y][x], o = { mult: E(1), insta: E(0) }

        if (g) {
            let s = g.split('t'), type = parseInt(s[0]), tier = parseInt(s[1]), cs = CS_BUILDINGS[type], insta_sub = E(0), eff = cs.eff(tier-1), cs_type = cs.type||0
            let arc = 0

            let mul_add = E(0), mul_mul = E(1)

            if (cs.insta) o.insta = cs.insta(tier-1)

            let no_type = !NO_ADJ_TYPE.includes(type)

            for (let i in ADJ_VEL) {
                let ag = grids[y+ADJ_VEL[i][0]]

                if (!ag) continue

                ag = ag[x+ADJ_VEL[i][1]]

                if (ag) {
                    let atype = parseInt(ag.split('t')[0]), atier = parseInt(ag.split('t')[1]), acs = CS_BUILDINGS[atype], aeff = acs.eff(atier-1)

                    // console.log(type,atype,aeff)

                    if (type != 7 && type <= 13 && atype == type && cs_type == 0 && no_type) {
                        if (ADJ_BOOST.includes(type)) mul_add = mul_add.add(0.5)
                        else mul_mul = mul_mul.mul(2)
                        o.insta = o.insta.mul(1.5)
                    } else if (atype == 1 && cs_type == 0 && no_type) {
                        insta_sub = insta_sub.add(aeff)
                    } else if (atype == 4 && type == 7 && atier >= 4) {
                        mul_mul = mul_mul.mul(1.5**(atier-4))
                        arc++
                    } else if (atype == 5 && cs_type == 0 && no_type) {
                        o.insta = o.insta.mul(aeff)
                        mul_mul = mul_mul.mul(aeff)
                    } else if (atype == 9 && cs_type == 0) {
                        o.insta = o.insta.div(aeff)
                    } else if (atype == 12 && type != 12 && i == '0') {
                        mul_mul = mul_mul.mul(aeff)
                    } else if (atype == 18 && type > 13 && no_type) {
                        mul_mul = mul_mul.mul(aeff.add(1))
                    }
                }
            }

            o.mult = o.mult.add(mul_add).mul(mul_mul)
            o.insta = o.insta.sub(insta_sub.mul(o.mult)).max(0)

            let rmb

            if (update == 'line') {
                switch (type) {
                    case 0:
                        cs_effect.line = cs_effect.line.add(eff.mul(o.mult))
                        break
                    case 2:
                        cs_insta.max = cs_insta.max.add(eff.mul(o.mult))
                        break
                    case 3:
                        cs_effect.ring = cs_effect.ring.mul(eff.mul(o.mult).add(1))
                        break
                    case 4:
                        cs_effect.moon = cs_effect.moon.mul(eff.mul(o.mult).add(1))
                        break
                    case 6:
                        cs_effect.bolt = cs_effect.bolt.mul(eff.mul(o.mult).add(1))
                        break
                    case 7:
                        if (arc >= 2) cs_effect.arc = cs_effect.arc.add(eff.mul(o.mult))
                        break
                    case 8:
                        cs_stellar.max = cs_stellar.max.add(eff)
                        break
                    case 13:
                        cs_effect.line = cs_effect.line.add(eff.line.mul(o.mult))
                        cs_effect.arc = cs_effect.arc.add(eff.arc.mul(o.mult))

                        rmb = eff.rmb.mul(o.mult).add(1)

                        cs_effect.ring = cs_effect.ring.mul(rmb)
                        cs_effect.moon = cs_effect.moon.mul(rmb)
                        cs_effect.bolt = cs_effect.bolt.mul(rmb)
                        break
                    case 14:
                        cs_effect.line = cs_effect.line.add(eff.line)
                        cs_effect.arc = cs_effect.arc.add(eff.arc)

                        rmb = eff.rmb.add(1)

                        cs_effect.ring = cs_effect.ring.mul(rmb)
                        cs_effect.moon = cs_effect.moon.mul(rmb)
                        cs_effect.bolt = cs_effect.bolt.mul(rmb)
                        break
                    case 16:
                        cs_effect.ray = cs_effect.ray.mul(eff.mul(o.mult).add(1))
                        break
                }

                if (cs_type == 0) cs_insta.total = cs_insta.total.add(o.insta)
                else cs_stellar.total = cs_stellar.total.add(o.insta)

                cs_amount[type]++
            } else if (update == 'arc') {
                switch (type) {
                    case 10:
                        cs_effect.reinPow = cs_effect.reinPow.add(eff.mul(o.mult))
                        break
                    case 11:
                        cs_effect.boostPow = cs_effect.boostPow.add(eff.mul(o.mult))
                        break
                    case 15:
                        cs_effect.gridPow = cs_effect.gridPow.mul(eff.mul(o.mult).add(1)).min(3)
                        break
                    case 17:
                        cs_effect.starPow = cs_effect.starPow.mul(eff.mul(o.mult).add(1))
                        break
                }
            }
        }

        cs_grid_temp[y][x] = o
    }
}

function updateConstellation() {
    resetConstellationTemp()

    let grids = player.constellation.grid

    cs_insta = {
        total: E(0),
        max: E(5),
    }

    cs_stellar = {
        total: E(0),
        max: E(0),
    }

    checkGrid('arc')

    checkGrid('line')

    if (cs_insta.total.gt(cs_insta.max) || cs_stellar.total.gt(cs_stellar.max)) resetConstellationTemp()

    // Update Images/Texts

    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
        let g = grids[y][x], h = ''

        if (g) {
            let cs_type = CS_BUILDINGS[g.split('t')[0]].type||0

            let gt = cs_grid_temp[y][x]

            // console.log(gt,y,x)

            h += getConstellationImage(g) + '<div style="font-weight: bold">'

            if (cs_type == 0 && gt.insta.gt(0)) h += "<div class='red'>+"+format(gt.insta,1,6)+"</div>"

            if (gt.mult.gt(1)) h += "<div class='green'>x"+format(gt.mult,2,6)+"</div>"

            h += '</div>'
        }
        
        tmp.el['cs_grid'+y+''+x].setHTML(h)
    }
}

function getConstellationImage(id) {
    let s = id.split('t'), tier = parseInt(s[1]), cs = CS_BUILDINGS[s[0]]

    let img = cs.imgTier && tier > 12 ? cs.imgTier : cs.img

    return `<img src = 'images/${img}.png' draggable="false" style='filter: ${CS_PREFIX[(parseInt(tier) - 1) % 12 + 1][1]}'>`
}

function lineGain() {
    let x = cs_effect.line

    .mul(upgEffect('constellation',2))
    .mul(starTreeEff('ring',37))
    .mul(starTreeEff('ring',44))
    .mul(getASEff('line'))

    x = x.mul(tmp.darkChargeEffs.line||1)

    x = x.mul(solarUpgEffect(1,4)).mul(solarUpgEffect(4,5))

    return x
}

function arcGain() {
    let x = cs_effect.arc

    .mul(upgEffect('constellation',5))
    .mul(getASEff('arc'))

    x = x.mul(solarUpgEffect(1,9)).mul(solarUpgEffect(4,6))

    return x
}

function darkChargeRate() {
    let x = cs_effect.bolt

    .mul(starTreeEff('ring',40)).mul(starTreeEff('ring',45))
    
    if (player.grassjump>=20) x = x.mul(getGJEffect(5))

    x = x.mul(solarUpgEffect(4,7)).mul(solarUpgEffect(1,10))

    return x
}

function getDCEffects() {
    let a = player.darkCharge, eff = {}

    eff.charge = a.max(1)
    eff.cosmic = a.div(1e3).max(1).root(3)
    eff.sp = a.div(1e6).max(1).log10().div(100).add(1).softcap(1.2,0.25,0)
    eff.lunar = a.div(1e9).max(1).root(3).softcap(1e3,0.5,0)
    eff.line = a.div(1e12).max(1).root(3).overflow(1e3,0.5)

    return eff
}

function updateConstellationTemp() {
    tmp.constStarStrong = hasSolarUpgrade(2,13)

    tmp.maxLConstellation = player.sn.times > 0 ? 24 : 12
    tmp.FP_tier = upgEffect('constellation',7,0)
    tmp.constellationCap = []

    tmp.lineGain = lineGain()
    tmp.arcGain = arcGain()
    tmp.darkChargeRate = darkChargeRate()
    tmp.darkChargeEffs = getDCEffects()

    tmp.squarePow = E(1).mul(starTreeEff('ring',35)).mul(starTreeEff('ring',39)).mul(starTreeEff('ring',42))
    tmp.coolerPow = E(1).mul(starTreeEff('ring',34)).mul(starTreeEff('ring',38)).mul(starTreeEff('ring',41))
}

tmp_update.push(()=>{
    updateConstellationTemp()
})

el.update.constellation = function () {
    if (mapID == 'cs' || mapID3 == 'cs') {
        for (let i = 0; i < 4; i++) {
            tmp.el['cs_tab'+i].setDisplay(cs_tab == i)
        }
    
        tmp.el.dc_tab.setDisplay(player.grassjump>=16)
    
        if (cs_tab == 0) {
            let res = [player.constellation.line,player.constellation.arc]
    
            for (let i = 1; i <= 24; i++) {
                tmp.el['cs_tier_btn'+i].setDisplay(i <= cs_max_tier)
            }

            var su5 = hasSolarUpgrade(2,5)

            var b_unls = {
                b6: player.grassjump>=16,
                b13: hasSolarUpgrade(2,3) && !su5,
                b14: su5,
                b15: hasSolarUpgrade(2,6),
                b16: hasSolarUpgrade(2,7),
                b17: hasSolarUpgrade(2,8),
                b18: hasSolarUpgrade(2,9),
            }
    
            for (let i in CS_BUILDINGS) {
                i = parseInt(i)
    
                let cs = CS_BUILDINGS[i], prefix = CS_PREFIX[(cs_tier - 1) % 12 + 1], cap = cs.cap
                let cs_type = cs.type||0
                let bu = b_unls["b"+i]
    
                let dis = cs_tier <= cs.max && cs_tier <= (cs_type != 1 && i != 7 ? tmp.maxLConstellation : 12) && prefix && cs_tier <= cs_building_tiers_dis[i]
                && (bu === undefined || bu) && (i > 13 || !su5)
                let div = tmp.el['cs_build_div'+i]
    
                div.setDisplay(dis)
    
                if (dis) {
                    tmp.el['cs_build_img'+i].changeStyle('filter',prefix[1])
                    tmp.el['cs_build_img'+i].setAttr('src', `images/${cs.imgTier && cs_tier > 12 ? cs.imgTier : cs.img}.png`)
    
                    let h = (i==14?cs.title:`${prefix[0]+cs.title} ${cs_tier > 12 ? "MK2" : ""} [T${cs_tier}]`)+`<span style='font-size: 14px'>`

                    if (i > 13) h += '<br><b class="yellow">Persistent</b>'

                    if (cap) h += `<br>Placed ${cs_amount[i]} / ${cap}`
    
                    h += '<br>' + cs.desc(cs.eff(cs_tier-1))
    
                    if (cs.insta) h += cs_type == 1 ? '<br>Uses up <b class="magenta">'+format(cs.insta(cs_tier-1),0)+' Stellaris</b>' : '<br>Increase the instability by <b class="red">'+format(cs.insta(cs_tier-1),0)+'</b>'
                    
                    let cost = cs.cost(cs_tier-1), c = `<br> Cost: ${cost.format(0)}` + [' Lines',' Arcs'][cs.type||0]
                    if (res[cs.type||0].lt(cost)) c = '<span class="red">'+c+'</span>'
                    h += c
    
                    h += '</span>'
    
                    tmp.el['cs_desc'+i].setHTML(h)
    
                    div.changeStyle('height', document.getElementById('cs_desc'+i).clientHeight+'px')
                }
            }
        } else if (cs_tab == 1) {
            let h = ''
    
            if (cs_effect.line.gt(0)) h += `+${cs_effect.line.format(0)}/s to Lines gain.<br>`
            if (cs_effect.arc.gt(0)) h += `+${cs_effect.arc.format(0)}/s to Arcs gain.<br>`
            if (cs_effect.ring.gt(1)) h += `${formatMult(cs_effect.ring)} to Rings gain.<br>`
            if (cs_effect.moon.gt(1)) h += `${formatMult(cs_effect.moon)} to Lunar Powers gain.<br>`
            if (cs_effect.bolt.gt(1)) h += `${formatMult(cs_effect.bolt)} to Dark Charge rate.<br>`
            if (cs_effect.ray.gt(1)) h += `${formatMult(cs_effect.ray)} to Solar Rays gain.<br>`
    
            tmp.el.cs_effects.setHTML(h)
        } else if (cs_tab == 2) {
            for (let i = 0; i < MAX_PRESETS; i++) {
                let p = player.constellation.presets[i], c = ''
    
                if (p.cost[0].gt(0)) c += p.cost[0].format(0) + ' Lines'
                if (p.cost[1].gt(0)) c += (c ? ', ' : '') + p.cost[1].format(0) + ' Arcs'
    
                tmp.el['cs_preset_cost'+i].setHTML(c||'???')
    
                tmp.el['cs_preset_boost'+i].setHTML(p.boosts?'Boosts: '+p.boosts:'No Boosts')
            }
        } else if (cs_tab == 3) {
            let h = `You have ${player.darkCharge.format(0)} <span class='smallAmt'>${player.darkCharge.formatGain(tmp.darkChargeRate)}</span> Dark Charge.`
    
            let effs = tmp.darkChargeEffs
    
            if (effs.charge.gt(1)) h += `<br><b class='green'>${formatMult(effs.charge)}</b> to Charge Rate.`
            if (effs.cosmic.gt(1)) h += `<br><b class='green'>${formatMult(effs.cosmic)}</b> to Cosmic Gain.`
            if (effs.sp.gt(1)) h += `<br><b class='green'>^${format(effs.sp,4)}</b> to SP Gain.`+effs.sp.softcapHTML(1.2)
            if (effs.lunar.gt(1)) h += `<br><b class='green'>${formatMult(effs.lunar)}</b> to Lunar Powers Gain.`+effs.lunar.softcapHTML(1e3)
            if (effs.line.gt(1)) h += `<br><b class='green'>${formatMult(effs.line)}</b> to Lines Gain.`+effs.line.softcapHTML(1e3)
    
            tmp.el.cs_dark.setHTML(h)
        }
    
        let h = ''
        if (cs_selected) h = getConstellationImage(cs_selected) + ' Selected!'
        tmp.el.constellation_select.setHTML(h)
    
        h = 'Instability: '+cs_insta.total.format(1)+' / '+cs_insta.max.format(1)
        if (player.constellation.arcUnl) h += '<br>Stellaris: '+cs_stellar.total.format(0)+' / '+cs_stellar.max.format(0)
    
        if (cs_insta.total.gt(cs_insta.max) || cs_stellar.total.gt(cs_stellar.max)) h = '<b class="red">'+h+'<br>Effects no longer work!</b>'
        tmp.el.constellation_stab.setHTML(h)
    
        h = player.constellation.line.format(0) + ' Lines' + (tmp.lineGain.gt(0) ? ' <span class="smallAmt">'+player.constellation.line.formatGain(tmp.lineGain)+'</span>' : '')
        if (player.constellation.arcUnl) h += '<br>' + player.constellation.arc.format(0) + ' Arcs' + (tmp.arcGain.gt(0) ? ' <span class="smallAmt">'+player.constellation.arc.formatGain(tmp.arcGain)+'</span>' : '')
    
        tmp.el.constellation_amt.setHTML(h)
    
        tmp.el.cs_sell.setTxt('Delete Mode: '+(cs_sellMode ? "ON" : "OFF"))
    }
}

var cs_building_tiers_dis = new Array(CS_BUILDINGS.length).fill(1);
var cs_max_tier = 1

function checkConstellationCosts() {
    let res = [player.constellation.line,player.constellation.arc], su5 = hasSolarUpgrade(2,5)

    cs_building_tiers_dis = new Array(CS_BUILDINGS.length).fill(1)
    cs_max_tier = 1

    for (let i in CS_BUILDINGS) {
        i = parseInt(i)
        if (su5 && i <= 13) continue
        let cs = CS_BUILDINGS[i], t = 1
        let cs_type = cs.type||0
        for (let j = 2; j <= Math.min(cs_type != 1 && i != 7 ? tmp.maxLConstellation : 12,cs.max); j++) {
            if (res[cs.type||0].lt(cs.cost(j-1).mul(0.04))) break;

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
    6: 'Dark Charge',
    7: 'Arcs',
    13: 'Prism',
    14: 'Prism',
}

function savePreset(i) {
    let grids = player.constellation.grid
    let c = '', cost = [E(0),E(0)], b = ''

    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) if (grids[y][x]) {
        let s = grids[y][x].split('t'), type = parseInt(s[0]), tier = parseInt(s[1]), cs = CS_BUILDINGS[type], cs_type = cs.type||0

        c += c ? ','+grids[y][x] : grids[y][x]

        cost[cs_type] = cost[cs_type].add(cs.cost(tier-1))

        if (type in PRES_BOOSTS && !b.includes(PRES_BOOSTS[type])) b += b ? ', ' + PRES_BOOSTS[type] : PRES_BOOSTS[type]
    } else c += c ? ',-' : '-'

    player.constellation.presets[i] = {
        encode: c,
        cost: cost,
        boosts: b,
    }
}

function loadPreset(i) {
    let p = player.constellation.presets[i], su5 = hasSolarUpgrade(2,5)

    if (p.encode && player.constellation.line.gte(p.cost[0]) && player.constellation.arc.gte(p.cost[1])) {
        player.constellation.line = player.constellation.line.sub(p.cost[0])
        player.constellation.arc = player.constellation.arc.sub(p.cost[1])

        let e = p.encode.split(',')

        sellAllGrids(false)

        for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
            let g = e[y*7+x]
            if (g != '-') {
                let t = parseInt(g.split('t')[0])
                if (!su5 || t > 13) player.constellation.grid[y][x] = g
            }
        }

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

    for (let i = 1; i <= 24; i++) {
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