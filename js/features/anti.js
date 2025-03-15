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
    el: ()=>hasUpgrade('assembler',5),
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
        if (player.grassskip.gte(22)) b = b.add(getMilestoneEffect('grass-skip',11,0));

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
    el: ()=>hasUpgrade('assembler',6),
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
        "5": {
            unl: ()=>player.galactic.times>0,
            req: ()=>player.agh.lte(28),
            req_desc: "AGH 28",

            icons: ["Curr/Oil","Icons/Automation"],
            base: "Bases/RocketBase",

            name: `Oil Upgrade Autobuy`,
            desc: `Autobuys oil upgrades every second.`,

            noCostIncrease: true,
            cost: ()=>100,
            res: "rocket-fuel",
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
        if (player.grassskip.gte(24)) b = b.add(getMilestoneEffect('grass-skip',12,0));

        let x = b.pow(player.tier.sub(1)).mul(player.tier).mul(4).mul(upgradeEffect('platinum', 13)).mul(upgradeEffect('refinery','1g')).mul(upgradeEffect('refinery','2g')).mul(upgradeEffect('momentum','1c'))
        .mul(upgradeEffect('star','SC1f')).mul(tmp.charger_bonus[8]??1).mul(upgradeEffect('star-ultimate',4))

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
    autobuy: ()=>hasUpgrade('anti-auto',5),
    el: ()=>hasUpgrade('assembler',7),
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
        '8': {
            max: 15,
            unl: ()=>hasUpgrade('star','S5'),
            icons: ["Curr/Steel2"],
            name: `Oily Steel II`,
            tier: "II",
            desc: `Increases steel gained by <b class="green">x2</b> per level.`,
            cost: a => a.simpleCost("EA", 1e15, .2, 25).ceil(),
            bulk: a => a.simpleCost("EAI", 1e15, .2, 25).add(1).floor(),
            res: "oil",
            effect(a) {
                let x = Decimal.pow(2,a)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}

const GS = {
    get require() { return player.grassskip.mul(10).add(201) },
    bulk(auto=false) {
        let x = player.anti.level.sub(191).div(10).floor().sub(player.grassskip).max(1)
        if (!auto && !(hasUpgrade('star','A13',1) && player.reset_options['grass-skip'][0])) x = x.min(1);
        return x
    },
}

RESETS['grass-skip'] = {
    pos: [21,3],
    unl: () => player.galactic.times>0,

    req: () => player.anti.level.gte(201),
    get req_desc() { return `Reach Anti-Level 201` },
    lock: () => player.anti.level.lt(GS.require),

    name: "Grass-Skip",
    get reset_desc() {
        return `Resets everything liquify does as well as oil.<br><br>Reach Anti-Level ${format(GS.require,0)} to grass-skip.`
    },
    color: ['#ef8','#ae6'],

    icon: "Icons/GrassSkip",
    get gain_desc() { return "+"+format(GS.bulk(),0) },

    reset_options: [
        ["Mult",()=>hasUpgrade('star','A13',1)],
        ["Auto",()=>hasUpgrade('star','A13',2)],
    ],

    success() {
        player.grassskip = player.grassskip.add(GS.bulk())
    },
    doReset() {
        CURRENCIES.oil.amount = E(0)

        RESETS.oil.doReset()
    },
}

MILESTONES['grass-skip'] = {
    unl: () => player.galactic.times>0,
    pos: [23,3],
    color: ['#ef8','#0c0'],

    name: x => x + " Grass-Skip",
    get amount() { return player.grassskip },
    get amount_desc() { return `You have grass-skipped <b class="green">${format(this.amount,0)}</b> times.` },

    ctn: [
        { // 0
            r: 1,
            get desc() { return `Increases stars gained by <b class="green">+5</b> per grass-skip.` },
            effect: a => a.mul(player.agh.lte(-3) ? 10 : 5),
        },{
            r: 2,
            get desc() { return `Increases space power (SP) gained by <b class="green">+1</b> per grass-skip.` },
            effect: a => a,
        },{
            r: 3,
            get desc() { return `Multiplies anti grow speed by <b class="green">5</b>.` },
        },{
            r: 4,
            get desc() { return `Increases platinum gained by <b class="green">+10</b>.` },
        },{
            r: 5,
            get desc() { return `Multiplies anti autocut speed by <b class="green">3</b>.` },
        },{ // 5
            r: 6,
            get desc() { return `Increases moonstone gained by <b class="green">+10</b>.` },
        },{
            r: 7,
            get desc() { return `Increases anti autocut amount by <b class="green">+2</b>.` },
        },{
            r: 8,
            get desc() { return `Unlocks <b class="green">Funify</b> reset and <b class="green">The Funny Upgrade</b> rocket fuel upgrade.` },
        },{
            r: 12,
            get desc() { return `Increases steel gained by <b class="green">+25%</b> per grass-skip.` },
            effect: a => a.mul(.25).add(1),
        },{
            r: 16,
            get desc() { return `Increases fun gained by <b class="green">+25%</b> per grass-skip.` },
            effect: a => a.mul(.25).add(1),
        },{ // 10
            r: 20,
            get desc() { return `Increases moonstone worth by <b class="green">+10</b> per grass-skip, starting at 15.` },
            effect: a => a.sub(14).max(0).mul(10),
        },{
            r: 22,
            get desc() { return `Increases anonymity's anti-level scaling by <b class="green">+2%</b> per grass-skip, starting at 22 and ending at 26. (Base is 5%)` },
            effect: a => a.sub(21).max(0).min(5).mul(.02),
        },{
            r: 24,
            get desc() { return `Increases oil's tier scaling by <b class="green">+2%</b> per grass-skip, starting at 24 and ending at 33. (Base is 10%)` },
            effect: a => a.sub(23).max(0).min(10).mul(.02),
        },
    ],
}

RESETS.funify = {
    pos: [21,4],
    unl: () => player.funify.reached,

    req: () => player.anti.level.gte(271),
    get req_desc() { return `Reach Anti-Level 271` },
    lock: () => player.anti.level.lt(271 + 10 * player.funify.gal_times),

    name: "Funify",
    get reset_desc() {
        return `Resets everything grass-skip does for fun. Anti-Level requirement resets on galactic.<br><br>Reach Anti-Level ${format(271 + 10 * player.funify.gal_times,0)} to funify again.`
    },
    color: ['#ef8','#ae6'],

    icon: "Curr/Fun",
    curr: "fun",

    success() {
        player.funify.gal_times++
        player.funify.times++
    },
    doReset() {
        RESETS["grass-skip"].doReset()
    },
}

CURRENCIES.fun = {
    name: "Fun",
    icon: "Curr/Fun",
    base: "Bases/FunBase",

    get amount() { return player.funify.fun },
    set amount(v) { player.funify.fun = v.max(0) },

    get gain() {
        if (!RESETS.funify.req()) return E(0);

        let x = E(1).mul(upgradeEffect('refinery','1h')).mul(upgradeEffect('refinery','2h')).mul(upgradeEffect('moonstone',13)).mul(upgradeEffect('moonstone',19)).mul(upgradeEffect('unnatural-grass',6))

        for (let i = 1; i <= 4; i++) x = x.mul(upgradeEffect('fundry',i));

        if (player.grassskip.gte(16)) x = x.mul(getMilestoneEffect('grass-skip',9));

        return x.floor()
    },

    get passive() { return 0 },
}

UPGRADES['funny-machine'] = {
    unl: () => player.funify.reached,
    pos: [21,5],
    size: [4,1],
    color: ['#ef8','#ae6'],
    type: "normal",
    base: "Bases/FunBase",
    curr_dis: {
        id: "fun",
        // get text() { return "RAAAAAAAAAUGH" },
    },
    ctn: {
        "1": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/Fundry"],

            name: `Fun-dry`,
            desc: `Unlocks a building where you can upgrade fun production.<br>Increases charge rate by <b class="green">+10%</b> per level.`,

            cost: a => a.simpleCost("EA", 1, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1, .2, 1.15).add(1).floor(),
            res: "fun",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/SuperFun"],

            name: `Super Fun Real Good Time Generator`,
            desc: `Unlocks a building where you can generate SFRGT (Super Fun Real Good Time) and spend them on powerful upgrades.<br>Increases SFRGT generation by <b class="green">+10%</b> per level.`,

            cost: a => a.simpleCost("EA", 1e5, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e5, .2, 1.15).add(1).floor(),
            res: "fun",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/Charger"],

            name: `Charger Mk.II`,
            desc: `Unlocks a new charge milestone.<br>Increases charge rate by <b class="green">+10%</b> per level.`,

            cost: a => a.simpleCost("EA", 1e6, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e6, .2, 1.15).add(1).floor(),
            res: "fun",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "4": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/Assemblerv2"],

            name: `Assembler Mk.II`,
            desc: `Unlocks new assembler upgrades.<br>Increases charge rate by <b class="green">+10%</b> per level.`,

            cost: a => a.simpleCost("EA", 1e8, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e8, .2, 1.15).add(1).floor(),
            res: "fun",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "5": {
            max: 100,
            unl: ()=>true,
            req: ()=>player.sacrifice.times>0,
            req_desc: "???",
            icons: ["Icons/Recelerator"],

            name: `Recelerator`,
            desc: `Unlocks a building where you can ???.`,

            cost: a => a.simpleCost("EA", 1e23, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e23, .2, 1.15).add(1).floor(),
            res: "fun",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}

UPGRADES.fundry = {
    unl: () => hasUpgrade('funny-machine',1),
    pos: [21,6],
    size: [2,2],
    color: ['#ef8','#ae6'],
    type: "vertical",
    base: "Bases/FunBase",
    curr_dis: {
        icon: "Icons/Fundry",
        get text() { return "Fun-dry" },
    },
    ctn: {
        "1": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Platinum"],

            name: `Fun Platinum`,
            desc: `Increases fun gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+5%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 100, .2, 1.05).ceil(),
            bulk: a => a.simpleCost("EAI", 100, .2, 1.05).add(1).floor(),
            res: "platinum",

            effect(a) {
                let x = Decimal.pow(1.05,a.div(25).floor()).mul(a).mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Star"],

            name: `Fun Stars`,
            desc: `Increases fun gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1, .2, 1.05).ceil(),
            bulk: a => a.simpleCost("EAI", 1, .2, 1.05).add(1).floor(),
            res: "star",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a).mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Fun"],

            name: `Fun<sup>2</sup>`,
            desc: `Increases fun gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+5%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 2, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 2, .2, 1.2).add(1).floor(),
            res: "fun",

            effect(a) {
                let x = Decimal.pow(1.05,a.div(25).floor()).mul(a).mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "4": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/SuperFun"],

            name: `Fun SFRGT`,
            desc: `Increases fun gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+5%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 100, .2, 1.05).ceil(),
            bulk: a => a.simpleCost("EAI", 100, .2, 1.05).add(1).floor(),
            res: "sfrgt",

            effect(a) {
                let x = Decimal.pow(1.05,a.div(25).floor()).mul(a).mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}

CURRENCIES.sfrgt = {
    name: "SFRGT",
    icon: "Curr/SuperFun",
    base: "Bases/FunBase",

    get amount() { return player.funify.sfrgt },
    set amount(v) { player.funify.sfrgt = v.max(0) },

    get gain() {
        if (!hasUpgrade('funny-machine',2)) return E(0);

        let x = E(1).mul(upgradeEffect('moonstone',9)).mul(upgradeEffect('funny-machine',2)).mul(upgradeEffect('sfrgt',1)).mul(ASTRAL.bonus('sfrgt'))

        return x.floor()
    },
}

UPGRADES.sfrgt = {
    unl: () => hasUpgrade('funny-machine',2),
    pos: [23,6],
    size: [2,2],
    color: ['#ef8','#ae6'],
    type: "vertical",
    base: "Bases/FunBase",
    curr_dis: {
        id: "sfrgt",
    },
    ctn: {
        "1": {
            max: 25,
            unl: ()=>true,
            icons: ["Curr/SuperFun"],

            name: `SFRGT Generation`,
            desc: `Increases SFRGT generation by <b class="green">x2</b> per level.`,

            cost: a => a.simpleCost("E", 1e5, 10).ceil(),
            bulk: a => a.simpleCost("EI", 1e5, 10).add(1).floor(),
            res: "fun",

            effect(a) {
                let x = a.pow_base(2)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2": {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/SP"],

            name: `SFRGT SP`,
            desc: `Increases space power gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 50, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 50, .2, 1.15).add(1).floor(),
            res: "sfrgt",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a).mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Star"],

            name: `SFRGT Stars`,
            desc: `Increases stars gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 500, .2, 1.17).ceil(),
            bulk: a => a.simpleCost("EAI", 500, .2, 1.17).add(1).floor(),
            res: "sfrgt",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a).mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}