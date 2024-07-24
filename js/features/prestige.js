CURRENCIES.prestige = {
    name: "Prestige Points",
    icon: "Curr/Prestige",
    base: "Bases/PrestigeBase",

    get amount() { return player.prestige.points },
    set amount(v) { player.prestige.points = v.max(0) },

    get gain() {
        if (!RESETS.prestige.req()) return E(0);
        let x = player.level.sub(31).pow_base(1.05).mul(player.grass.max(1).root(15)).mul(10)

        x = x.mul(upgradeEffect("grass",5)).mul(upgradeEffect('crystal',4)).mul(upgradeEffect('perks',7)).mul(upgradeEffect('platinum',4))

        return x.floor()
    },

    get passive() { return upgradeEffect("auto",5,0) },
}

RESETS.prestige = {
    pos: [1,1],
    unl: () => true,

    req: () => player.level.gte(31),
    get req_desc() { return `Reach Level 31` },

    name: "Prestige",
    get reset_desc() {
        return `Resets your grass, grass upgrades, perks, and level for prestige points (PP). Gain more prestige points based on your grass and level.`
        + (player.prestige.times > 0 ? "" : `<br><b class="yellow">First Prestige unlocks Tier & Platinum!</b>`)
    },
    color: ['#13BDE7','#1fa4c5'],

    icon: "Curr/Prestige",

    success() {
        player.prestige.times++
    },
    doReset() {
        player.grass = E(0)
        player.xp = E(0)
        player.level = E(1)

        if (!hasUpgrade("auto",4)) {
            player.perks = E(0)
            player.best_perks = E(0)
            resetUpgrades('perks')
        }

        resetUpgrades('grass')
        resetGrass('normal')
        checkLevel('xp')

        updateTemp()
    },
}

UPGRADES.prestige = {
    unl: () => true,
    pos: [3,1],
    size: [3,1],
    color: ['#13BDE7','#1fa4c5'],
    type: "normal",
    base: "Bases/PrestigeBase",
    curr_dis: {
        id: "prestige",
        // get text() { return "RAAAAAAAAAUGH" },
    },
    ctn: {
        "1": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Grass"],

            name: `Grass Value II`,
            tier: "II",
            desc: `Increases grass value by <b class="green">+50%</b> per level.<br>This effect is increased by <b class="green">+50%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1, .2, 1.15).add(1).floor(),
            res: "prestige",

            effect(a) {
                let x = Decimal.pow(1.5,a.div(25).floor()).mul(a).mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2": {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/XP"],

            name: `XP II`,
            tier: "II",
            desc: `Increases experience gained by <b class="green">+50%</b> per level.<br>This effect is increased by <b class="green">+50%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 3, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 3, .2, 1.15).add(1).floor(),
            res: "prestige",

            effect(a) {
                let x = Decimal.pow(1.5,a.div(25).floor()).mul(a).mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3": {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/TP"],

            name: `TP`,
            desc: `Increases tier progress (TP) gained by <b class="green">+100%</b> per level.<br>This effect is <b class="green">doubled</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 50, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 50, .2, 1.15).add(1).floor(),
            res: "prestige",

            effect(a) {
                let x = Decimal.pow(2,a.div(25).floor()).mul(a).mul(1).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "4": {
            max: 500,
            unl: ()=>true,
            icons: ["Curr/Crystal"],

            name: `Crystals`,
            desc: `Increases crystals gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 150, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 150, .2, 1.15).add(1).floor(),
            res: "prestige",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a).mul(.25).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "5": {
            unl: ()=>true,
            icons: ["Curr/Grass"],

            name: `Grass Scaling`,
            desc: `Level Grass Bonus scales exponentially in addition to linearly.`,

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "prestige",
        },
    },
}

UPGRADES.platinum = {
    unl: ()=>player.prestige.times>0,
    pos: [6,-1],
    size: [2,2],
    type: 'vertical',
    color: ['#ccc','#aaa'],
    base: "Bases/PlatBase",
    curr_dis: {
        id: "platinum",
        // get text() { return "RAAAAAAAAAUGH" },
    },
    get bottom_text() { return `Platinum grow chance: <b class='green'>${formatPercent(GRASS.resource.platinum.chance)}</b>` },
    ctn: {
        "1": {
            max: 5,
            unl: ()=>true,
            icons: ["Curr/Grass","Icons/Automation"],

            name: `Starter AC`,
            desc: `Increases grass autocut speed by <b class="green">+100%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>5,
            res: "platinum",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "2": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/XP"],

            name: `Plat XP`,
            desc: `Increases experience gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>10,
            res: "platinum",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Grass"],

            name: `Plat GV`,
            desc: `Increases grass value by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>10,
            res: "platinum",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "4": {
            max: 10,
            unl: ()=>player.crystal.times>0,
            icons: ["Curr/Prestige"],

            name: `Starter Prestige`,
            desc: `Increases prestige points gained by <b class="green">+20%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>100,
            res: "platinum",

            effect(a) {
                let x = a.mul(.2).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "5": {
            max: 10,
            unl: ()=>player.crystal.times>0,
            icons: ["Curr/Crystal"],

            name: `Starter Crystal`,
            desc: `Increases crystals gained by <b class="green">+20%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>100,
            res: "platinum",

            effect(a) {
                let x = a.mul(.2).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}