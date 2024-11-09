UPGRADES['anti-grass'] = {
    unl: ()=>tmp.anti_unl,
    pos: [21,0],
    size: [4,1],
    type: 'normal',
    color: ['#060053','#070064'],
    base: "Bases/AntiGrassBase",
    curr_dis: {
        id: "anti-grass",
    },
    autobuy: ()=>hasUpgrade('anti-auto',3),
    // el: ()=>hasUpgrade('assembler',1),
    // cl: ()=>hasUpgrade('assembler',2),
    ctn: {
        '1': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/AntiGrass"],
            name: `Anti Anti-Grass Value`,
            desc: `Increases anti-grass value by <b class="green">+100%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 5, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 5, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "anti-grass",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.add(1))
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        '2': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Charge"],
            name: `Anti Charge`,
            desc: `Increases charge rate by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 100, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 100, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "anti-grass",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.1).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '3': {
            max: 500,
            unl: ()=>true,
            icons: ["Icons/MoreGrass"],
            name: `Anti More Anti-Grass`,
            desc: `Increases anti-grass cap by <b class="green">+1</b> per level.`,
            cost: a => a.scale(500-1,2,"P").simpleCost("EA", 500, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 500, .2, 1.15).scale(500-1,2,"P",true).add(1).floor(),
            res: "anti-grass",
            effect(a) {
                let x = a
                return x
            },
            effDesc: x => "+"+format(x,0),
        },
        '4': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/AntiXP"],
            name: `Anti Anti-XP`,
            desc: `Increases anti-experience (Anti-XP) gained by <b class="green">+100%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 1e3, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e3, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "anti-grass",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.add(1))
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        '5': {
            max: 500,
            unl: ()=>true,
            icons: ["Icons/Speed"],
            name: `Anti Grow Speed`,
            desc: `Increases anti-grass grow speed by <b class="green">+10%</b> per level.`,
            cost: a => a.scale(500-1,2,"P").simpleCost("EA", 1e3, .2, 1.35).ceil(),
            bulk: a => a.simpleCost("EAI", 1e3, .2, 1.15).scale(500-1,2,"P",true).add(1).floor(),
            res: "anti-grass",
            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        '6': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Grass"],
            name: `Anti Grass Value`,
            desc: `Increases grass value by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 1e5, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e5, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "anti-grass",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '7': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/XP"],
            name: `Anti XP`,
            desc: `Increases experience gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 1e6, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e6, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "anti-grass",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '8': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Anonymity"],
            name: `Anti AP`,
            desc: `Increases anonymity points gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 1e9, .2, 1.35).ceil(),
            bulk: a => a.simpleCost("EAI", 1e9, .2, 1.35).scale(1000-1,2,"P",true).add(1).floor(),
            res: "anti-grass",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}

CURRENCIES.anonymity = {
    name: "Anonymity Points",
    icon: "Curr/Anonymity",
    base: "Bases/AnonymityBase",

    get amount() { return player.anonymity.points },
    set amount(v) { player.anonymity.points = v.max(0) },

    get gain() {
        if (!RESETS.anonymity.req()) return E(0);
        let b = E(1.05)

        let x = player.anti.level.sub(31).pow_base(b).mul(player.anti.grass.max(1).root(15)).mul(10)

        x = x.mul(upgradeEffect('platinum', 12)).mul(upgradeEffect('anti-grass', 8)).mul(tmp.charger_bonus[7]??1).mul(upgradeEffect('oil',7)).mul(upgradeEffect('momentum','1h'))

        return x.floor()
    },

    get passive() { return upgradeEffect('factory',8,0) },
}

RESETS.anonymity = {
    pos: [21,1],
    unl: () => tmp.anti_unl,

    req: () => player.anti.level.gte(31),
    get req_desc() { return `Reach Anti-Level 31` },

    name: "Anonymity",
    get reset_desc() {
        return `Resets your anti-grass, anti-grass upgrades, anti-level, and charge for anoymity points (AP). Gain more anonymity points based on your anti-grass and anti-level.`
        + (player.anonymity.times > 0 ? "" : `<br><b class="yellow">First Anonymity unlocks new charge milestone!</b>`)
    },
    color: ['#060053','red'],

    icon: "Curr/Anonymity",

    success() {
        player.anonymity.times++
    },
    doReset() {
        player.anti.grass = E(0)
        player.anti.xp = E(0)
        player.anti.level = E(1)

        player.steelie.charge = E(0)

        resetUpgrades('anti-grass')
        resetGrass('anti')
        checkLevel('anti-xp')

        player.anonymity.time = 0

        updateTemp()
    },
}

UPGRADES.anonymity = {
    unl: () => tmp.anti_unl,
    pos: [23,1],
    size: [4,1],
    color: ['#060053','red'],
    type: "normal",
    base: "Bases/AnonymityBase",
    curr_dis: {
        id: "anonymity",
    },
    autobuy: ()=>hasUpgrade('anti-auto',4),
    // el: ()=>hasUpgrade('assembler',3),
    ctn: {
        '1': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Charge"],
            name: `Anonymity Charge`,
            desc: `Increases charge rate by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 1, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "anonymity",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.1).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '2': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/AntiGrass"],
            name: `Anonymity Anti-Grass Value`,
            desc: `Increases anti-grass value by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 1, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "anonymity",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '3': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Grass"],
            name: `Anonymity Grass Value`,
            desc: `Increases grass value by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 2, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 2, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "anonymity",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '4': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/XP"],
            name: `Anonymity XP`,
            desc: `Increases experience gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 5, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 5, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "anonymity",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '5': {
            max: 50,
            unl: ()=>true,
            icons: ["Icons/MoreGrass"],
            name: `Anonymity More Anti-Grass`,
            desc: `Increases anti-grass cap by <b class="green">+10</b> per level.`,
            cost: a => a.simpleCost("EA", 15, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 15, .2, 1.15).add(1).floor(),
            res: "anonymity",
            effect(a) {
                let x = a.mul(10)
                return x
            },
            effDesc: x => "+"+format(x,0),
        },
        '6': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/AntiXP"],
            name: `Anonymity Anti-XP`,
            desc: `Increases anti-experience gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 20, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 20, .2, 1.15).scale(1000-1,2,"P",true).add(1).floor(),
            res: "anonymity",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}

UPGRADES['anti-auto'] = {
    unl: () => tmp.anti_unl,
    pos: [16,0],
    size: [4,1],
    color: ['#060053','#070064'],
    type: "normal",
    base: "Bases/AnonymityBase",
    curr_dis: {
        icon: "Icons/Assemblerv2",
        text: "Anti-Anti-Automation",
    },
    ctn: {
        "1": {
            max: 5,
            unl: ()=>true,
            icons: ["Curr/AntiGrass","Icons/Automation"],
            base: "Bases/AntiGrassBase",

            name: `Anti-Grass Autocut`,
            desc: `Autocuts <b class="green">+1</b> anti-grass every second per level.`,

            cost: a => a.simpleCost("E", 10, 10).ceil(),
            bulk: a => a.simpleCost("EI", 10, 10).add(1).floor(),
            res: "anonymity",

            effect(a) {
                let x = a
                return x
            },
            effDesc: x => "+"+format(x,0)+"/s",
        },
        "2": {
            max: 5,
            unl: ()=>true,
            icons: ["Curr/AntiGrass","Icons/Automation"],
            base: "Bases/AnonymityBase",

            name: `Anti-Grass Autocut Value`,
            desc: `Increase anti-grass autocut value <b class="green">+100%</b> per level.`,

            cost: a => a.simpleCost("E", 100, 4).ceil(),
            bulk: a => a.simpleCost("EI", 100, 4).add(1).floor(),
            res: "anonymity",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3": {
            unl: ()=>true,
            icons: ["Curr/AntiGrass","Icons/Automation"],
            base: "Bases/AnonymityBase",

            name: `Anti-Grass Upgrade Autobuy`,
            desc: `Autobuys anti-grass upgrades every second.`,

            noCostIncrease: true,
            cost: ()=>1e5,
            res: "anonymity",
        },
        "4": {
            unl: ()=>player.oil.times>0,
            icons: ["Curr/Anonymity","Icons/Automation"],
            base: "Bases/LiquefyBase",

            name: `Anonymity Upgrade Autobuy`,
            desc: `Autobuys anonymity upgrades every second.`,

            noCostIncrease: true,
            cost: ()=>1e5,
            res: "oil",
        },
    },
}

CURRENCIES.oil = {
    name: "Oil",
    icon: "Curr/Oil",
    base: "Bases/LiquefyBase",

    get amount() { return player.oil.points },
    set amount(v) { player.oil.points = v.max(0) },

    get gain() {
        if (!RESETS.oil.req()) return E(0);
        let b = E(1.1)

        let x = b.pow(player.tier.sub(1)).mul(player.tier).mul(4).mul(upgradeEffect('platinum', 13)).mul(upgradeEffect('refinery','1g')).mul(upgradeEffect('momentum','1c'))

        return x.floor()
    },

    get passive() { return upgradeEffect('factory',8,0) },
}

RESETS.oil = {
    pos: [21,2],
    unl: () => player.anonymity.times > 0 && tmp.anti_unl,

    req: () => player.anti.level.gte(101),
    get req_desc() { return `Reach Anti-Level 101` },

    name: "Liquefy",
    get reset_desc() {
        return `Resets everything anonymity does as well as anoymity points, anonymity upgrades, and tier for oil. Gain more oil based on your tier.`
    },
    color: ['#333','#454545'],

    icon: "Curr/Oil",

    success() {
        player.oil.times++
    },
    doReset() {
        player.tp = E(0)
        player.tier = E(1)

        player.anonymity.points = E(0)
        resetUpgrades('anonymity')
        checkLevel('tp')

        player.oil.time = 0

        RESETS.anonymity.doReset()

        updateTemp()
    },
}

UPGRADES.oil = {
    unl: () => player.anonymity.times > 0 && tmp.anti_unl,
    pos: [23,2],
    size: [4,1],
    color: ['#333','#454545'],
    type: "normal",
    base: "Bases/LiquefyBase",
    curr_dis: {
        id: "oil",
    },
    // autobuy: ()=>hasUpgrade('auto',9),
    // el: ()=>hasUpgrade('assembler',3),
    ctn: {
        '1': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/AntiGrass"],
            name: `Oily Anti-Grass`,
            desc: `Increases anti-grass value by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 2, .2, 1.05).ceil(),
            bulk: a => a.simpleCost("EAI", 2, .2, 1.05).scale(1000-1,2,"P",true).add(1).floor(),
            res: "oil",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.1).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '2': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Grass"],
            name: `Oily Grass`,
            desc: `Increases grass value by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 3, .2, 1.05).ceil(),
            bulk: a => a.simpleCost("EAI", 3, .2, 1.05).scale(1000-1,2,"P",true).add(1).floor(),
            res: "oil",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.1).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '3': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/XP"],
            name: `Oily XP`,
            desc: `Increases experience gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 6, .2, 1.05).ceil(),
            bulk: a => a.simpleCost("EAI", 6, .2, 1.05).scale(1000-1,2,"P",true).add(1).floor(),
            res: "oil",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.1).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '4': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/AntiXP"],
            name: `Oily Anti-XP`,
            desc: `Increases anti-experience gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 6, .2, 1.05).ceil(),
            bulk: a => a.simpleCost("EAI", 6, .2, 1.05).scale(1000-1,2,"P",true).add(1).floor(),
            res: "oil",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.1).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '5': {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/TP"],
            name: `Oily TP`,
            desc: `Increases tier progress gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 12, .2, 1.05).ceil(),
            bulk: a => a.simpleCost("EAI", 12, .2, 1.05).scale(1000-1,2,"P",true).add(1).floor(),
            res: "oil",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.1).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        '6': {
            max: 15,
            unl: ()=>true,
            icons: ["Curr/Steel2"],
            name: `Oily Steel`,
            desc: `Increases steel gained by <b class="green">x2</b> per level.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 20, .2, 5).ceil(),
            bulk: a => a.simpleCost("EAI", 20, .2, 5).scale(1000-1,2,"P",true).add(1).floor(),
            res: "oil",
            effect(a) {
                let x = Decimal.pow(2,a)
                return x
            },
            effDesc: x => formatMult(x),
        },
        '7': {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Anonymity"],
            name: `Oily AP`,
            desc: `Increases AP gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,
            cost: a => a.scale(1000-1,2,"P").simpleCost("EA", 25, .2, 1.3).ceil(),
            bulk: a => a.simpleCost("EAI", 25, .2, 1.3).scale(1000-1,2,"P",true).add(1).floor(),
            res: "oil",
            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}