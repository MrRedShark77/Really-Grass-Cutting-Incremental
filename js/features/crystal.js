CURRENCIES.crystal = {
    name: "Crystals",
    icon: "Curr/Crystal",
    base: "Bases/CrystalBase",

    get amount() { return player.crystal.points },
    set amount(v) { player.crystal.points = v.max(0) },

    get gain() {
        if (!RESETS.crystal.req()) return E(0);
        let b = E(1.1)
        if (player.grasshop.gte(6)) b = b.add(getMilestoneEffect('grasshop',5,0));

        let x = player.tier.sub(1).pow_base(b).mul(player.tier).mul(5)
        .mul(upgradeEffect('prestige',4)).mul(upgradeEffect('perks',8)).mul(upgradeEffect('platinum',5)).mul(upgradeEffect('platinum',6)).mul(upgradeEffect('platinum',7))
        .mul(getAccomplishmentBonus(5)).mul(getAccomplishmentBonus(8)).mul(tmp.charger_bonus[5]??1).mul(upgradeEffect('refinery','1e')).mul(upgradeEffect('momentum','1f'))

        return x.floor()
    },

    get passive() { return Decimal.add(upgradeEffect("auto",8,0),upgradeEffect('generator',4,0)).mul(upgradeEffect('factory',2)) },
}

RESETS.crystal = {
    pos: [1,2],
    unl: () => player.prestige.times>0,

    req: () => player.level.gte(101),
    get req_desc() { return `Reach Level 101` },

    name: "Crystallize",
    get reset_desc() {
        return `Resets everything prestige does as well as tier, prestige points, and prestige upgrades for crystals. Gain more crystals based on your tier.`
    },
    color: ['magenta','pink'],

    icon: "Curr/Crystal",

    success() {
        player.crystal.times++

        ACCOM.check('prestige')
        ACCOM.check('crystal')
    },
    doReset() {
        player.tp = E(0)
        player.tier = E(1)
        player.prestige.points = E(0)

        if (!hasUpgrade("auto",7)) {
            player.perks = E(0)
            player.best_perks = E(0)
            resetUpgrades('perks')
        }

        resetUpgrades('prestige')

        checkLevel('tp')

        player.crystal.time = 0

        RESETS.prestige.doReset()
    },
}

UPGRADES.crystal = {
    unl: () => player.prestige.times>0,
    pos: [3,2],
    size: [3,1],
    color: ['magenta','pink'],
    type: "normal",
    base: "Bases/CrystalBase",
    curr_dis: {
        id: "crystal",
        // get text() { return "RAAAAAAAAAUGH" },
    },
    autobuy: ()=>hasUpgrade('auto',10),
    el: ()=>hasUpgrade('assembler',4),
    ctn: {
        "1": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Grass"],

            name: `Grass Value III`,
            tier: "III",
            desc: `Increases grass value by <b class="green">+50%</b> per level.<br>This effect is increased by <b class="green">+50%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 4, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 4, .2, 1.15).add(1).floor(),
            res: "crystal",

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

            name: `XP III`,
            tier: "III",
            desc: `Increases experience gained by <b class="green">+50%</b> per level.<br>This effect is increased by <b class="green">+50%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 6, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 6, .2, 1.15).add(1).floor(),
            res: "crystal",

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

            name: `TP II`,
            tier: "II",
            desc: `Increases tier progress (TP) gained by <b class="green">+100%</b> per level.<br>This effect is <b class="green">doubled</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 8, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 8, .2, 1.15).add(1).floor(),
            res: "crystal",

            effect(a) {
                let x = Decimal.pow(2,a.div(25).floor()).mul(a).mul(1).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "4": {
            max: 500,
            unl: ()=>true,
            icons: ["Curr/Prestige"],

            name: `PP II`,
            tier: "II",
            desc: `Increases prestige points gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 12, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 12, .2, 1.15).add(1).floor(),
            res: "crystal",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a).mul(.25).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "5": {
            unl: ()=>true,
            icons: ["Icons/Speed"],

            name: `Grow Amount`,
            desc: `Increases grass grow amount by <b class="green">+1</b>.`,

            noCostIncrease: true,
            cost: ()=>100,
            res: "crystal",
        },
    },
}