RESETS.grasshop = {
    pos: [0,10],
    unl: () => player.crystal.times>0,

    req: () => player.level.gte(201),
    get req_desc() { return `Reach Level 201` },
    lock: () => player.level.lt(GH.require),

    name: "Grasshop",
    get reset_desc() {
        return `Resets everything crystallize does as well as crystals and crystal upgrades.<br><br>Reach Level ${format(GH.require,0)} to grasshop.`
    },
    color: ['#ccc','#aaa'],

    icon: "Icons/Grasshop2",
    get gain_desc() { return "+"+format(GH.bulk,0) },

    success() {
        ACCOM.check('prestige')
        ACCOM.check('crystal')

        player.grasshop = player.grasshop.add(GH.bulk)
    },
    doReset() {
        player.crystal.points = E(0)

        if (player.grasshop.lt(8)) {
            player.perks = E(0)
            player.best_perks = E(0)
            resetUpgrades('perks')
        }

        resetUpgrades('crystal')

        RESETS.crystal.doReset()
    },
}

const GH = {
    get require() { return player.grasshop.mul(10).add(201) },
    get bulk() { return player.level.sub(191).div(10).floor().sub(player.grasshop).max(1).min(1) },
}

MILESTONES.grasshop = {
    unl: () => player.crystal.times>0,
    pos: [2,10],
    color: ['#ccc','#0c0'],

    name: "Grasshop",
    get amount() { return player.grasshop },
    get amount_desc() { return `You have grasshopped <b class="green">${format(this.amount,0)}</b> times.` },

    ctn: [
        { // 0
            r: 1,
            get desc() { return `Unlocks <b class="green">Accomplishments</b>.<br>
                Unlocks more automation upgrades.<br>
                Increases grass value by <b class="green">+300%</b> per grasshop.`
            },
            effect: a => a.mul(3).add(1),
        },{
            r: 2,
            get desc() { return `Increases experience gained by <b class="green">+100%</b> per grasshop.` },
            effect: a => a.mul(1).add(1),
        },{
            r: 3,
            get desc() { return `Increases tier progress gained by <b class="green">+100%</b> per grasshop.` },
            effect: a => a.mul(1).add(1),
        },{
            r: 4,
            get desc() { return `Increases platinum gained by <b class="green">+1</b> per grasshop, starting at 4.` },
            effect: a => a.sub(3).max(0),
        },{
            r: 5,
            get desc() { return `Increases prestige's level scaling by <b class="green">+2%</b> per grasshop, starting at 5 and ending at 9. (Base is 5%)` },
            effect: a => a.sub(4).max(0).min(5).mul(.02),
        },{ // 5
            r: 6,
            get desc() { return `Increases crystal's tier scaling by <b class="green">+2%</b> per grasshop, starting at 6 and ending at 15. (Base is 10%)` },
            effect: a => a.sub(5).max(0).min(10).mul(.02),
        },{
            r: 7,
            get desc() { return `Increases perks gained by <b class="green">+1</b>.` },
        },{
            r: 8,
            get desc() { return `Permanently unlocks <b class="green">Steelie</b>.
                <br>Grasshop does not reset perks.
                <br>Unlocks Steelie accomplishment.`
            },
        },{
            r: 9,
            get desc() { return `Unlocks factory related perk upgrades.` },
        },{
            r: 11,
            get desc() { return `Increases steel gained by <b class="green">+25%</b> per grasshop.<br>Unlocks two more generator upgrades related to charge.` },
            effect: a => a.mul(.25).add(1),
        },{ // 10
            r: 12,
            get desc() { return `Charge rate is <b class="green">doubled</b> per grasshop, starting at 12.` },
            effect: a => a.sub(11).max(0).pow_base(2),
        },{
            r: 13,
            get desc() { return `Charger charge bonuses increase <b class="green">1 OoM</b> (order of magnitude) sooner per grasshop, starting at 13.` },
            effect: a => a.sub(12).max(0),
        },{
            r: 16,
            get desc() { return `Increases anti-grass value by <b class="green">+50%</b> per grasshop.` },
            effect: a => a.mul(.5).add(1),
        },{
            r: 18,
            get desc() { return `Increases anti-experience by <b class="green">x1.25</b> per grasshop.` },
            effect: a => a.pow_base(1.25),
        },
    ],
}

CURRENCIES.steelie = {
    name: "Steel",
    icon: "Curr/Steel2",
    base: "Bases/GrasshopBase",

    get amount() { return player.steelie.points },
    set amount(v) { player.steelie.points = v.max(0) },

    get gain() {
        if (!RESETS.steelie.req()) return E(0);
        
        let x = E(1).mul(upgradeEffect('perks',9)).mul(tmp.foundry_effect).mul(upgradeEffect('platinum',10)).mul(tmp.charger_bonus[0]??1).mul(upgradeEffect('oil',6))

        x = x.mul(upgradeEffect('foundry',1)).mul(upgradeEffect('foundry',2)).mul(upgradeEffect('foundry',3)).mul(upgradeEffect('foundry',4)).mul(upgradeEffect('refinery','1f')).mul(upgradeEffect('momentum','1j'))

        if (player.grasshop.gte(11)) x = x.mul(getMilestoneEffect('grasshop',9))

        return x.floor()
    },

    get passive() { return 0 },
}

RESETS.steelie = {
    pos: [0,11],
    unl: () => player.grasshop.gte(8),

    req: () => player.level.gte(271),
    get req_desc() { return `Reach Level 271` },

    name: "Steelie",
    get reset_desc() {
        return `Resets everything grasshop does, but it also benefits from the milestones for grasshop.`
    },
    color: ['#ccc','#aaa'],

    icon: "Curr/Steel2",

    success() {
        ACCOM.check('prestige')
        ACCOM.check('crystal')
        ACCOM.check('steelie')

        player.steelie.times++
    },
    doReset() {
        player.steelie.time = 0
        player.steelie.charge = E(0)

        RESETS.grasshop.doReset()
    },
}

UPGRADES.factory = {
    unl: () => player.grasshop.gte(8),
    pos: [0,12],
    size: [4,1],
    color: ['#ccc','#aaa'],
    type: "normal",
    base: "Bases/GrasshopBase",
    curr_dis: {
        id: "steelie",
        // get text() { return "RAAAAAAAAAUGH" },
    },
    // autobuy: ()=>hasUpgrade('auto',10),
    ctn: {
        "1": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/Foundry"],

            name: `Foundry`,
            desc: `Unlocks a building where you can upgrade steel production.<br>Increases foundry's effect by <b class="green">+10%</b> per level.`,

            cost: a => a.simpleCost("EA", 1, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1, .2, 1.15).add(1).floor(),
            res: "steelie",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/Generator"],

            name: `Generator`,
            desc: `Unlocks a building where you can upgrade prestige/crystal generation.<br>Increases generator's effect by <b class="green">+10%</b> per level.`,

            cost: a => a.simpleCost("EA", 1e5, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e5, .2, 1.15).add(1).floor(),
            res: "steelie",

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

            name: `Charger`,
            desc: `Unlocks a building where you can boost production multipliers with charge.<br>Increases charge rate by <b class="green">+10%</b> per level.`,

            cost: a => a.simpleCost("EA", 1e6, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e6, .2, 1.15).add(1).floor(),
            res: "steelie",

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

            name: `Assembler`,
            desc: `Unlocks a building where you can upgrade your automation further.<br>Increases charge rate by <b class="green">+10%</b> per level.`,

            cost: a => a.simpleCost("EA", 1e8, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e8, .2, 1.15).add(1).floor(),
            res: "steelie",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "5": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/Decelerator"],

            name: `Decelerator`,
            desc: `Unlocks a building where you can enter the anti-realm.<br>Increases charge rate by <b class="green">+10%</b> per level.`,

            cost: a => a.simpleCost("EA", 1e12, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e12, .2, 1.15).add(1).floor(),
            res: "steelie",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "6": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/Refinery"],

            name: `Refinery`,
            desc: `Unlocks a building where you can convert charge and oil into rocket fuel.<br>Increases charge rate by <b class="green">+10%</b> per level.`,

            cost: a => a.simpleCost("EA", 1e19, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e19, .2, 1.15).add(1).floor(),
            res: "steelie",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "7": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/LaunchPad"],

            name: `Rocket Launch Pad`,
            desc: `Unlocks a building where you can build a rocket.<br>Increases charge rate by <b class="green">+10%</b> per level.`,

            cost: a => a.simpleCost("EA", 1e21, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e21, .2, 1.15).add(1).floor(),
            res: "steelie",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "8": {
            max: 100,
            unl: ()=>true,
            req: ()=>player.rocket.part.gte(1),
            req_desc: "First Rocket Part",
            icons: ["Icons/OilRigAlt"],

            name: `Oil Drilling Rig`,
            desc: `Passively generates <b class="green">+0.1%/s</b> of AP & oil you would earn per level.`,

            cost: a => a.simpleCost("EA", 1e23, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e23, .2, 1.15).add(1).floor(),
            res: "steelie",

            effect(a) {
                let x = a.mul(.001)
                return x
            },
            effDesc: x => "+"+formatPercent(x)+"/s",
        },
    },
}

UPGRADES.foundry = {
    unl: () => hasUpgrade('factory',1),
    pos: [0,13],
    size: [2,2],
    color: ['#ccc','#aaa'],
    type: "vertical",
    base: "Bases/GrasshopBase",
    curr_dis: {
        icon: "Icons/Foundry",
        get text() { return `<b class="green">${formatMult(tmp.foundry_effect)}</b> / ${formatMult(Decimal.mul(86400*.3,upgradeEffect('factory', 1)).add(1))}` },
    },
    // autobuy: ()=>hasUpgrade('auto',10),
    ctn: {
        "1": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Steel2"],
            base: "Bases/PrestigeBase",

            name: `Steel Prestige`,
            desc: `Increases steel gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+5%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1e24, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 1e24, .2, 1.2).add(1).floor(),
            res: "prestige",

            effect(a) {
                let x = Decimal.pow(1.05,a.div(25).floor()).mul(a).mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Grass"],
            base: "Bases/GrassBase",

            name: `Steel Grass`,
            desc: `Increases steel gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+5%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1e54, .2, 2).ceil(),
            bulk: a => a.simpleCost("EAI", 1e54, .2, 2).add(1).floor(),
            res: "grass",

            effect(a) {
                let x = Decimal.pow(1.05,a.div(25).floor()).mul(a).mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Crystal"],
            base: "Bases/CrystalBase",

            name: `Steel Crystal`,
            desc: `Increases steel gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+5%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1e12, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 1e12, .2, 1.2).add(1).floor(),
            res: "crystal",

            effect(a) {
                let x = Decimal.pow(1.05,a.div(25).floor()).mul(a).mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "4": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Steel2"],

            name: `Steel Steel`,
            desc: `Increases steel gained by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">+5%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1e6, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 1e6, .2, 1.2).add(1).floor(),
            res: "steelie",

            effect(a) {
                let x = Decimal.pow(1.05,a.div(25).floor()).mul(a).mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}

UPGRADES.generator = {
    unl: () => hasUpgrade('factory',2),
    pos: [2,13],
    size: [2,2],
    color: ['#36d597','#35956f'],
    type: "vertical",
    base: "Bases/GrasshopBase",
    curr_dis: {
        icon: "Icons/Generator",
        get text() { return `<b class="green">${formatMult(upgradeEffect('factory',2))}</b><b class="small-text"> to PP & Crystal generation</b>` },
    },
    // autobuy: ()=>hasUpgrade('auto',10),
    ctn: {
        "1": {
            max: 1000,
            unl: ()=>true,
            req: ()=>player.grasshop.gte(11),
            req_desc: "GH 11",
            icons: ["Curr/Charge"],
            base: "Bases/PrestigeBase",

            name: `Prestige Charge`,
            desc: `Increases charge rate by <b class="green">+1%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1e24, .2, 1.12).ceil(),
            bulk: a => a.simpleCost("EAI", 1e24, .2, 1.12).add(1).floor(),
            res: "prestige",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a).mul(.01).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2": {
            max: 1000,
            unl: ()=>true,
            req: ()=>player.grasshop.gte(11),
            req_desc: "GH 11",
            icons: ["Curr/Charge"],
            base: "Bases/CrystalBase",

            name: `Crystal Charge`,
            desc: `Increases steel gained by <b class="green">+1%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1e12, .2, 1.12).ceil(),
            bulk: a => a.simpleCost("EAI", 1e12, .2, 1.12).add(1).floor(),
            res: "crystal",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a).mul(.01).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Prestige"],

            name: `PP Generation`,
            desc: `Increases the rate of PP generation by <b class="green">+5%</b> per level.`,

            cost: a => a.simpleCost("EA", 1e3, .2, 1.11).ceil(),
            bulk: a => a.simpleCost("EAI", 1e3, .2, 1.11).add(1).floor(),
            res: "steelie",

            effect(a) {
                let x = a.mul(.05)
                return x
            },
            effDesc: x => "+"+formatPercent(x,0),
        },
        "4": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Crystal"],

            name: `Crystal Generation`,
            desc: `Increases the rate of crystal generation by <b class="green">+5%</b> per level.`,

            cost: a => a.simpleCost("EA", 1e4, .2, 1.11).ceil(),
            bulk: a => a.simpleCost("EAI", 1e4, .2, 1.11).add(1).floor(),
            res: "steelie",

            effect(a) {
                let x = a.mul(.05)
                return x
            },
            effDesc: x => "+"+formatPercent(x,0),
        },
    },
}

const CHARGER = {
    milestones: [
        { // 0
            oom: 0,
            desc: x=>`Increase steel gained by ${formatMult(x)}`,
        },{
            oom: 3,
            desc: x=>`Increase XP gained by ${formatMult(x)}`,
        },{
            oom: 6,
            desc: x=>`Increase TP gained by ${formatMult(x)}`,
        },{
            oom: 9,
            desc: x=>`Increase grass value by ${formatMult(x)}`,
        },{
            oom: 12,
            desc: x=>`Increase PP gained by ${formatMult(x)}`,
        },{ // 5
            oom: 15,
            desc: x=>`Increase crystals gained by ${formatMult(x)}`,
        },{
            unl: ()=>tmp.anti_unl,
            oom: 16,
            desc: x=>`Increase anti-grass value by ${formatMult(x)}`,
        },{
            unl: ()=>player.anonymity.times,
            oom: 18,
            desc: x=>`Increase Anti-XP/AP gained by ${formatMult(x)}`,
        },
    ],

    temp() {
        let oom_later = getMilestoneEffect('grasshop',11,0), charge_oom = player.steelie.charge.max(1).log10(), best_oom = player.steelie.bestCharge.max(1).log10()

        for (let i in this.milestones) {
            let m = this.milestones[i], n = E(1)

            if ((!m.unl || m.unl()) && best_oom.gte(m.oom)) {
                n = charge_oom.sub(Decimal.sub(m.oom,oom_later).max(0)).max(0).pow_base(1.5)
            }

            tmp.charger_bonus[i] = n
        }
    },

    setup() {
        createGridElement('charger',{
            unl: ()=>hasUpgrade('factory',3),
            pos: [4,13],
            size: [2,2],
            class: "fill-div",
            style: {
                backgroundColor: "gold",
            },
            get html() {
                let h = ``

                h += `<div class="upg-curr-display"><img src="images/Curr/Charge.png"><div id="charger-amount">???</div></div>`

                let html = "Best Charge Milestones"

                for (let i in CHARGER.milestones) {
                    html += `<div id="charger-milestone-${i}"></div>`
                }

                h += `<div class="charger-table">${html}</div>`

                h += `<div class="upg-bottom-text" id="charger-best">???</div>`;

                return h
            },
            updateHTML() {
                el('charger-amount').innerHTML = format(player.steelie.charge,0) + " " + formatGain(player.steelie.charge, tmp.currency_gain.charge)
                el('charger-best').innerHTML = "Best Charge: <b class='green'>" + format(player.steelie.bestCharge,0) + "</b>"

                let best_oom = player.steelie.bestCharge.max(1).log10()

                for (let i in CHARGER.milestones) {
                    let m = CHARGER.milestones[i]

                    el('charger-milestone-'+i).style.display = !m.unl || m.unl() ? "block" : "none"

                    el('charger-milestone-'+i).innerHTML = `${Decimal.pow(10,m.oom).format(0)} - ${m.desc(tmp.charger_bonus[i])}`
                    el('charger-milestone-'+i).className = best_oom.gte(m.oom) ? "green" : "gray"
                }
            },
        })
    },
}

CURRENCIES.charge = {
    name: "Charge",
    icon: "Curr/Charge",
    base: "Bases/GrasshopBase",

    get amount() { return player.steelie.charge },
    set amount(v) { player.steelie.charge = v.max(0) },

    get best() { return player.steelie.bestCharge },
    set best(v) { player.steelie.bestCharge = v.max(0) },

    get gain() {
        if (!hasUpgrade('factory',3)) return E(0);
        
        let x = E(1).mul(upgradeEffect('perks',10)).mul(upgradeEffect('platinum',11)).mul(upgradeEffect('generator',1)).mul(upgradeEffect('generator',2))

        x = x.mul(upgradeEffect('factory',3)).mul(upgradeEffect('factory',4)).mul(upgradeEffect('factory',5)).mul(upgradeEffect('factory',6)).mul(upgradeEffect('factory',7))

        x = x.mul(getAccomplishmentBonus(9)).mul(getMilestoneEffect('grasshop',10)).mul(getLevelBonus('anti-xp')).mul(upgradeEffect('anonymity',1)).mul(upgradeEffect('momentum','1d'))

        return x
    },
}

UPGRADES.assembler = {
    unl: () => hasUpgrade('factory',4),
    pos: [0,15],
    size: [4,1],
    color: ['darkred','darkred'],
    type: "normal",
    base: "Bases/GrasshopBase",
    curr_dis: {
        icon: "Icons/Assemblerv2",
        get text() { return `Assembler Upgrades` },
    },
    // autobuy: ()=>hasUpgrade('auto',10),
    ctn: {
        '1': {
            unl: ()=>true,
            icons: ["Curr/Grass","Icons/Infinite"],

            name: `Grass Upgrades EL`,
            desc: `Buying grass upgrades no longer take away grass.`,

            noCostIncrease: true,
            cost: ()=>1e7,
            res: "steelie",
        },
        '2': {
            unl: ()=>true,
            icons: ["Curr/Grass","Icons/Automation2"],

            name: `Grass Upgrades CL`,
            desc: `Grass upgrades are no longer capped.<br>However, post-maxed upgrades' cost scaling is massively increased.`,

            noCostIncrease: true,
            cost: ()=>1e8,
            res: "steelie",
        },
        '3': {
            unl: ()=>true,
            icons: ["Curr/Prestige","Icons/Infinite"],

            name: `Prestige Upgrades EL`,
            desc: `Buying prestige upgrades no longer take away prestige points.`,

            noCostIncrease: true,
            cost: ()=>1e9,
            res: "steelie",
        },
        '4': {
            unl: ()=>true,
            icons: ["Curr/Crystal","Icons/Infinite"],

            name: `Crystal Upgrades EL`,
            desc: `Buying crystal upgrades no longer take away crystals.`,

            noCostIncrease: true,
            cost: ()=>1e10,
            res: "steelie",
        },
    },
}