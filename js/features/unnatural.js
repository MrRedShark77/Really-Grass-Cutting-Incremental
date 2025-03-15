GRASS.field.unnatural = {
    unl: ()=>tmp.unnatural_unl,
    pos: [40,0],

    get grow_speed() { return upgradeEffect('unnatural-grass',2) },
    get grow_amount() { return 1 },

    get cap() { return Decimal.mul(5,upgradeEffect('unnatural-grass',4)) },

    get autocut_speed() { return 0 },
    get autocut_value() { return 0 },

    res_base: 'unnatural-grass',
    bonus: ['unnatural-xp'],
}

GRASS.resource["unnatural-grass"] = {
    get mult() {
        let x = E(1).mul(upgradeEffect('unnatural-grass',1)).mul(upgradeEffect('normality',3))
        return x
    },
}
GRASS.resource["unnatural-xp"] = {
    get mult() {
        let x = E(1).mul(upgradeEffect('unnatural-grass',3))
        return x
    },
}

LEVELS['unnatural-xp'] = {
    unl: () => tmp.unnatural_unl,
    pos: [41,-0.5],

    name: "Unnatural Level",
    exp_name: "XP",
    color: "#c7ff26",

    get exp() { return player.unnatural.xp },

    get level() { return player.unnatural.level },
    set level(v) { player.unnatural.level = v },

    req(a) {
        let x = a.scale(200,2,"L").sumBase(1.3).mul(50)

        return x.ceil()
    },
    bulk(a) {
        let x = a.div(50).sumBase(1.3,true).scale(200,2,"L",true)

        return x.add(1).floor()
    },

    bonus(a) {
        a = a.sub(1).max(0);
        let x = Decimal.pow(1.02,a).mul(a.mul(.25).add(1))
        return x
    },
    bonusDesc: x => formatMult(x) + " Compaction",
}

UPGRADES['unnatural-grass'] = {
    unl: ()=>tmp.unnatural_unl,
    pos: [41,0],
    size: [4,1],
    type: 'normal',
    color: ['#a6e000','#b4f300'],
    base: "Bases/UnnaturalBase",
    curr_dis: {
        id: "unnatural-grass",
    },
    ctn: {
        // 1: 3*(1+x*0.2)*1.12^x | +100%, x2 grass
        // 2: 20*(1+x*0.2)*1.2^x | +20% speed
        // 3: 100*(1+x*0.2)*1.12^x | +100%, x2 xp
        // 4: 1e4*(1+x*0.2)*1.2^x | +100% cap
        // 5: 1e5*(1+x*0.2)*1.12^x | +25%, x1.25 sp
        // 6: 1e6*(1+x*0.2)*1.12^x | +25%, x1.25 fun
        // 7: 1e7*(1+x*0.2)*2^x | +100% compaction

        '1': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/UGrass"],
            name: `Unnatural Grass Value`,
            desc: `Increases unnatural grass value by <b class="green">+100%</b> per level.<br>This effect is <b class="green">doubled</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 3, .2, 1.12).ceil(),
            bulk: a => a.simpleCost("EAI", 3, .2, 1.12).scale(1000-1,2,"P",true).add(1).floor(),
            res: "unnatural-grass",
            effect(a) {
                let x = Decimal.pow(2,a.div(25).floor()).mul(a.add(1))
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        '2': {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/Speed"],
            name: `Unnatural Grow Speed`,
            desc: `Increases unnatural grass grow speed by <b class="green">+20%</b> per level.`,
            cost: a => a.simpleCost("EA", 20, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 20, .2, 1.2).add(1).floor(),
            res: "unnatural-grass",
            effect(a) {
                let x = a.mul(.2).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        '3': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/UnnaturalXP"],
            name: `Unnatural XP`,
            desc: `Increases unnatural experience gained by <b class="green">+100%</b> per level.<br>This effect is <b class="green">doubled</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 100, .2, 1.12).ceil(),
            bulk: a => a.simpleCost("EAI", 100, .2, 1.12).scale(1000-1,2,"P",true).add(1).floor(),
            res: "unnatural-grass",
            effect(a) {
                let x = Decimal.pow(2,a.div(25).floor()).mul(a.add(1))
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        '4': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/MoreGrass"],
            name: `Unnatural Grass Cap`,
            desc: `Increases unnatural grass cap by <b class="green">+100%</b> per level.`,
            cost: a => a.simpleCost("EA", 1e4, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 1e4, .2, 1.2).add(1).floor(),
            res: "unnatural-grass",
            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        '5': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/SP"],
            name: `Unnatural SP`,
            desc: `Increases space power gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 1e5, .2, 1.12).ceil(),
            bulk: a => a.simpleCost("EAI", 1e5, .2, 1.12).scale(1000-1,2,"P",true).add(1).floor(),
            res: "unnatural-grass",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '6': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Fun"],
            name: `Unnatural Fun`,
            desc: `Increases fun gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 1e6, .2, 1.12).ceil(),
            bulk: a => a.simpleCost("EAI", 1e6, .2, 1.12).scale(1000-1,2,"P",true).add(1).floor(),
            res: "unnatural-grass",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '7': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/Compaction"],
            name: `Compaction`,
            desc: `Increases compaction by <b class="green">+100%</b> per level.<br>This increases currencies and xp gained from cutting grass.`,
            cost: a => a.simpleCost("EA", 1e7, .2, 2).ceil(),
            bulk: a => a.simpleCost("EAI", 1e7, .2, 2).add(1).floor(),
            res: "unnatural-grass",
            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
    },
}

CURRENCIES.normality = {
    name: "Normality Points",
    icon: "Curr/Normality",
    base: "Bases/NormalityBase",

    get amount() { return player.normality.points },
    set amount(v) { player.normality.points = v.max(0) },

    get gain() {
        if (!RESETS.normality.req()) return E(0);

        let x = player.unnatural.level.sub(31).max(0).pow_base(1.2).mul(player.astral.pow_base(1.05)).mul(player.unnatural.level.sub(30).max(1))
        
        x = x.mul(upgradeEffect('momentum','3d')).mul(upgradeEffect('dark-matter',6))

        return x.floor()
    },

    get passive() { return 0 },
}

RESETS.normality = {
    pos: [41,1],
    unl: () => tmp.unnatural_unl,

    req: () => player.unnatural.level.gte(31),
    get req_desc() { return `Reach Unnatural Level 31` },

    name: "Normality",
    reset_desc: `Resets your unnatural grass, unnatural grass upgrades, and unnatural level for normality points (NP). Gain more normality points based on your unnatural level and astral.`,
    color: ['#a6e000','#b4f300'],

    icon: "Curr/Normality",

    success() {
        player.normality.times++
    },
    doReset() {
        player.unnatural.grass = E(0)
        player.unnatural.xp = E(0)
        player.unnatural.level = E(1)

        resetUpgrades('unnatural-grass')
        resetGrass('unnatural')
        checkLevel('unnatural-xp')

        updateTemp()
    },
}

UPGRADES.normality = {
    unl: ()=>tmp.unnatural_unl,
    pos: [43,1],
    size: [4,1],
    type: 'normal',
    color: ['#a6e000','#b4f300'],
    base: "Bases/NormalityBase",
    curr_dis: {
        id: "normality",
    },
    ctn: {
        '1': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Grass"],
            name: `Normality Grass Value`,
            desc: `Increases grass value by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 1, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "normality",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '2': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/SP"],
            name: `Normality SP`,
            desc: `Increases space power gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 2, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 2, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "normality",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '3': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/UGrass"],
            name: `Normality Unnatural Grass Value`,
            desc: `Increases unnatural grass value by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 2, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 2, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "normality",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '4': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/DarkMatter"],
            name: `Normality Dark Matter`,
            desc: `Increases dark matter gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 5, .2, 1.3).ceil(),
            bulk: a => a.simpleCost("EAI", 5, .2, 1.3).scale(1000-1,2,"P",true).add(1).floor(),
            res: "normality",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '5': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Momentum"],
            name: `Normality Momentum`,
            desc: `Increases momentum gained by <b class="green">15%</b> compounding per level.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 10, .2, 1.8).ceil(),
            bulk: a => a.simpleCost("EAI", 10, .2, 1.8).scale(1000-1,2,"P",true).add(1).floor(),
            res: "normality",
            effect(a) {
                let x = a.pow_base(1.15)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}