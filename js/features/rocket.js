const ROCKET = {

}

CURRENCIES['rocket-fuel'] = {
    name: "Rocket Fuel",
    icon: "Curr/RocketFuel",
    base: "Bases/RocketBase",

    get amount() { return player.rocket.fuel },
    set amount(v) { player.rocket.fuel = v.max(0) },

    get total() { return player.rocket.total },
    set total(v) { player.rocket.total = v.max(0) },

    b: (x,y) => Decimal.sqr(x).add(Decimal.mul(x,y-1)).div(y),
    ib: (x,y) => F.solveQuadratic(1,y-1,Decimal.mul(x,-y)),

    get base_inc() {
        let p = player.rocket.part

        return p.add(1)
    },

    get_base(n) {
        let b = this.b;

        return b(n.min(100),20)
        .add(b(n.sub(100).max(0).min(900),20).mul(100))
        .add(b(n.sub(1000).max(0).min(9000),20).mul(1000))
        .add(b(n.sub(10000).max(0),2000).mul(1e15)).mul(this.base_inc)
    },

    get gain() {
        let y = this.total, x = E(0), base = this.get_base(y), inc = this.base_inc, b = this.b, ib = this.ib,
        oil = CURRENCIES.oil.amount.add(base.mul(100)), charge = CURRENCIES.charge.amount.add(base.mul(1e27));

        let r = charge.div(1e25).min(oil).div(100).div(inc)
        x = ib(r,20).floor()

        if (x.gt(100)) {
            r = r.sub(b(100,20)).div(100)
            x = ib(r,20).floor().add(100)
        }

        if (x.gt(1000)) {
            // console.log(r.format(), b(900).format())
            r = r.sub(b(900,20)).div(10)
            x = ib(r,20).floor().add(1000)
        }

        if (x.gt(10000)) {
            r = r.sub(b(9000,2000)).div(1e12)
            x = ib(r,2000).floor().add(10000)
        }

        return x.sub(y).max(0)
    },

    passive: 0,
}

RESETS['rocket-fuel'] = {
    pos: [-2,12],
    unl: () => hasUpgrade('factory',6),

    req: () => true,
    get req_desc() { return `???` },

    name: "Refinery",
    get reset_desc() {
        let t = player.rocket.total, oil = CURRENCIES.oil.amount, charge = CURRENCIES.charge.amount, inc = CURRENCIES['rocket-fuel'].base_inc
        let b = t.gte(1e4) ? t.sub(1e4).div(1e3).add(1).mul(1e15) : t.gte(1000) ? t.sub(1000).div(10).add(1).mul(1000) : t.gte(100) ? t.sub(100).div(10).add(1).mul(100) : t.div(10).add(1)
        b = b.mul(inc)
        return `Next Rocket Fuel
        <br><b class="yellow">Charge</b><br><b class="${charge.gte(b.mul(1e27)) ? 'green' : 'red'}">${charge.format(0)} / ${b.mul(1e27).format(0)}</b>
        <br><b class="black">Oil</b><br><b class="${oil.gte(b.mul(100)) ? 'green' : 'red'}">${oil.format(0)} / ${b.mul(100).format(0)}</b>`
    },
    color: ['#117e99','#1fa4c5'],

    icon: "Curr/RocketFuel",

    reset_options: [
        null,
        ["Auto"],
    ],

    success() {
        let c = CURRENCIES['rocket-fuel']
        let g = tmp.currency_gain['rocket-fuel'], b = c.get_base(c.total).sub(c.get_base(c.total.sub(g)))

        CURRENCIES.oil.amount = CURRENCIES.oil.amount.sub(b.mul(100))
        CURRENCIES.charge.amount = CURRENCIES.charge.amount.sub(b.mul(1e30))
    },
    doReset() {
        
    },
}

UPGRADES.refinery = {
    unl: () => player.galactic.times > 0 || hasUpgrade('factory',6),
    pos: [-2,13],
    size: [2,2],
    color: ['#117e99','#1fa4c5'],
    type: "vertical",
    base: "Bases/RocketBase",
    curr_dis: {
        id: "rocket-fuel",
    },
    bottom_text: ``,
    // autobuy: ()=>hasUpgrade('auto',10),
    ctn: {
        "1a": {
            max: 300,
            unl: ()=>true,
            icons: ["Curr/Grass"],

            name: `Rocket Fueled Grass`,
            desc: `Increases grass value by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "1b": {
            max: 300,
            unl: ()=>true,
            icons: ["Icons/XP"],

            name: `Rocket Fueled XP`,
            desc: `Increases experience gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "1c": {
            max: 300,
            unl: ()=>true,
            icons: ["Icons/TP"],

            name: `Rocket Fueled TP`,
            desc: `Increases tier progress by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "1d": {
            max: 300,
            unl: ()=>true,
            icons: ["Curr/Prestige"],

            name: `Rocket Fueled Prestige`,
            desc: `Increases prestige points earned by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "1e": {
            max: 300,
            unl: ()=>true,
            icons: ["Curr/Crystal"],

            name: `Rocket Fueled Crystal`,
            desc: `Increases crystals earned by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "1f": {
            max: 300,
            unl: ()=>true,
            icons: ["Curr/Steel2"],

            name: `Rocket Fueled Steel`,
            desc: `Increases steel earned by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "1g": {
            max: 300,
            unl: ()=>true,
            icons: ["Curr/Oil"],

            name: `Rocket Fueled Oil`,
            desc: `Increases oil earned by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "1h": {
            max: 1e6,
            unl: ()=>player.funify.reached,
            icons: ["Curr/Fun"],

            name: `The Funny Upgrade`,
            desc: `Increases fun earned by <b class="green">+1%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.01).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },

        "2a": {
            max: 1e5,
            unl: ()=>player.galactic.times>0,
            icons: ["Curr/Grass"],

            name: `Rocket Fueled Grass II`,
            desc: `Increases grass value by <b class="green">+10%</b> per level.`,
            tier: "II",

            noCostIncrease: true,
            cost: ()=>10,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2b": {
            max: 1e5,
            unl: ()=>player.galactic.times>0,
            icons: ["Icons/XP"],

            name: `Rocket Fueled XP II`,
            desc: `Increases experience gained by <b class="green">+10%</b> per level.`,
            tier: "II",

            noCostIncrease: true,
            cost: ()=>10,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2c": {
            max: 1e5,
            unl: ()=>player.galactic.times>0,
            icons: ["Icons/TP"],
            tier: "II",

            name: `Rocket Fueled TP II`,
            desc: `Increases tier progress by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>10,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2d": {
            max: 1e5,
            unl: ()=>player.galactic.times>0,
            icons: ["Curr/Prestige"],

            name: `Rocket Fueled Prestige II`,
            desc: `Increases prestige points earned by <b class="green">+10%</b> per level.`,
            tier: "II",

            noCostIncrease: true,
            cost: ()=>10,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2e": {
            max: 1e5,
            unl: ()=>player.galactic.times>0,
            icons: ["Curr/Crystal"],

            name: `Rocket Fueled Crystal II`,
            desc: `Increases crystals earned by <b class="green">+10%</b> per level.`,
            tier: "II",

            noCostIncrease: true,
            cost: ()=>10,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2f": {
            max: 1e5,
            unl: ()=>player.galactic.times>0,
            icons: ["Curr/Steel2"],

            name: `Rocket Fueled Steel II`,
            desc: `Increases steel earned by <b class="green">+10%</b> per level.`,
            tier: "II",

            noCostIncrease: true,
            cost: ()=>10,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2g": {
            max: 1e5,
            unl: ()=>player.galactic.times>0,
            icons: ["Curr/Oil"],

            name: `Rocket Fueled Oil II`,
            desc: `Increases oil earned by <b class="green">+10%</b> per level.`,
            tier: "II",

            noCostIncrease: true,
            cost: ()=>10,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2h": {
            max: 1e6,
            unl: ()=>hasUpgrade('refinery','1h',1e6),
            icons: ["Curr/Fun"],
            tier: "II",

            name: `The Funny Upgrade II`,
            desc: `Increases fun earned by <b class="green">+1%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.01).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },

        "3b": {
            max: 1e6,
            unl: ()=>hasUpgrade('refinery','2b',1e5),
            icons: ["Icons/XP"],

            name: `Rocket Fueled XP III`,
            desc: `Increases experience gained by <b class="green">+1%</b> per level.`,
            tier: "III",

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.01).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3c": {
            max: 1e6,
            unl: ()=>hasUpgrade('refinery','2c',1e5),
            icons: ["Icons/TP"],
            tier: "III",

            name: `Rocket Fueled TP III`,
            desc: `Increases tier progress by <b class="green">+1%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.01).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },

        "1i": {
            max: 1e6,
            unl: ()=>true,
            req: ()=>player.agh.lte(0),
            req_desc: "AGH 0",
            icons: ["Curr/Star"],

            name: `Mega Rocket Fueled Galactics`,
            desc: `Increases stars earned by <b class="green">+1%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e6,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.01).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2i": {
            max: 1e5,
            unl: ()=>hasUpgrade('refinery','1i',1e6),
            icons: ["Curr/Star"],

            name: `Giga Rocket Fueled Galactics`,
            desc: `Increases stars earned by <b class="green">+1%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e12,
            res: "rocket-fuel",

            effect(a) {
                let x = a.mul(.01).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}

RESETS['rocket-part'] = {
    pos: [-4,12],
    unl: () => hasUpgrade('factory',7),

    req: () => true,
    get req_desc() { return `???` },
    lock() {
        let n = this.next_part
        return CURRENCIES.steelie.amount.lt(n[0]) || player.rocket.total.lt(n[1])
    },

    get cap() { return player.agh.lte(-24) ? 100 : 10 },

    get next_part() {
        let p = player.rocket.part
        if (p.gte(this.cap)) return [EINF, EINF];
        return player.agh.lte(-24) ? [p.pow_base(1e3).mul(1e36), p.add(1).pow_base(100)] : [p.add(1).mul(1e21), p.mul(10)]
    },

    name: "Rocket Part",
    get reset_desc() {
        let t = player.rocket.total, steel = CURRENCIES.steelie.amount
        let a = this.next_part;
        return `Reset everything liquefy does as well as oil, oil upgrades, steel, and total rocket fuel for rocket part and momentum.
        <br><b class="gray">Steel</b><br><b class="${steel.gte(a[0]) ? 'green' : 'red'}">${steel.format(0)} / ${a[0].format(0)}</b>
        <br><b class="lightblue">Total Rocket Fuel</b><br><b class="${t.gte(a[1]) ? 'green' : 'red'}">${t.format(0)} / ${a[1].format(0)}</b>
        <br><br>You have created <b class="green">${player.rocket.part.format(0)} / ${format(this.cap,0)}</b> rocket parts.`
    },
    color: ['#7d5227','#ffd421'],

    icon: "Curr/Momentum",
    curr: "momentum",

    success() {
        player.rocket.part = player.rocket.part.add(1)
    },
    doReset() {
        CURRENCIES.oil.amount = E(0)
        resetUpgrades('oil')
        CURRENCIES.steelie.amount = E(0)
        CURRENCIES["rocket-fuel"].total = E(0)

        RESETS.oil.doReset()
    },
}

CURRENCIES.momentum = {
    name: "Momentum",
    icon: "Curr/Momentum",
    base: "Bases/RocketBase",

    get amount() { return player.rocket.momentum },
    set amount(v) { player.rocket.momentum = v.max(0) },

    get gain() {
        let x = E(1).mul(upgradeEffect('normality',5)).mul(upgradeEffect('dark-matter',7))

        if (player.agh.lte(-24)) x = x.mul(player.rocket.part.pow10());

        return x.floor()
    },

    passive: 0,
}

UPGRADES.momentum = {
    unl: () => hasUpgrade('factory',7),
    pos: [-4,13],
    size: [2,2],
    color: ['#dbb826','#ffd421'],
    type: "vertical",
    base: "Bases/RocketBase",
    curr_dis: {
        id: "momentum",
    },
    bottom_text: `Earn momentum by creating rocket part`,

    ctn: {
        "1a": {
            unl: ()=>true,
            icons: ["Curr/Grass"],

            name: `Grass is Life`,
            desc: `Increases grass value by <b class="green">x10</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.mul(9).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "1b": {
            unl: ()=>true,
            icons: ["Icons/XP"],

            name: `Gas Gas Gas`,
            desc: `Increases experience gained by <b class="green">x10</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.mul(9).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "1c": {
            unl: ()=>true,
            icons: ["Curr/Oil"],

            name: `Fracking`,
            desc: `Increases oil earned by <b class="green">x10</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.mul(9).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "1d": {
            unl: ()=>true,
            icons: ["Curr/Charge"],

            name: `Powerful`,
            desc: `Increases charge rate by <b class="green">x10</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.mul(9).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "1e": {
            unl: ()=>true,
            icons: ["Curr/Platinum"],

            name: `I Like to Idle`,
            desc: `Increases platinum earned by <b class="green">x10</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.mul(9).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "1f": {
            unl: ()=>true,
            icons: ["Curr/Crystal"],

            name: `Shine Bright`,
            desc: `Increases crystals earned by <b class="green">x10</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.mul(9).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "1g": {
            unl: ()=>true,
            icons: ["Curr/Prestige"],

            name: `Popular`,
            desc: `Increases prestige points earned by <b class="green">x10</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.mul(9).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "1h": {
            unl: ()=>true,
            icons: ["Curr/Anonymity"],

            name: `Quickly Forgettable`,
            desc: `Increases anonymity points earned by <b class="green">x10</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.mul(9).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "1i": {
            unl: ()=>true,
            icons: ["Icons/TP"],

            name: `In Tiers`,
            desc: `Increases tier progress by <b class="green">x10</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.mul(9).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "1j": {
            unl: ()=>true,
            icons: ["Curr/Steel2"],

            name: `Steel Going?`,
            desc: `Increases steel earned by <b class="green">x10</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.mul(9).add(1)
                return x
            },
            effDesc: x => formatMult(x,0),
        },

        "2a": {
            unl: ()=>player.agh.lte(-21),
            icons: ["Curr/Platinum"],

            name: `I Hate Waiting`,
            desc: `Increases platinum earned by <b class="green">x2</b> per level.`,

            max: 5,
            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.pow_base(2)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "2b": {
            unl: ()=>player.agh.lte(-21),
            icons: ["Curr/Charge"],

            name: `Gigacharged`,
            desc: `Increases charge rate by <b class="green">x10</b> per level.`,

            max: 5,
            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.pow_base(10)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "2c": {
            unl: ()=>player.agh.lte(-21),
            icons: ["Curr/Grass"],

            name: `Grass is Better Than Life`,
            desc: `Increases grass value by <b class="green">x10</b> per level.`,

            max: 5,
            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.pow_base(10)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "2d": {
            unl: ()=>player.agh.lte(-21),
            icons: ["Icons/XP"],

            name: `Real Grasshops`,
            desc: `Increases normal and anti experience gained by <b class="green">x10</b> per level.`,

            max: 5,
            noCostIncrease: true,
            cost: ()=>1,
            res: "momentum",

            effect(a) {
                let x = a.pow_base(10)
                return x
            },
            effDesc: x => formatMult(x,0),
        },

        "3a": {
            max: 1000,
            unl: ()=>player.agh.lte(-24),
            icons: ["Curr/Grass"],

            name: `Grass is Greater Than Life`,
            desc: `Increases grass value by <b class="green">x2</b> per level.`,

            cost: a => a.scale(1e3-1,2,"P").simpleCost("EA", 100, .2, 2).ceil(),
            bulk: a => a.simpleCost("EAI", 100, .2, 2).scale(1e3-1,2,"P",true).add(1).floor(),
            res: "momentum",

            effect(a) {
                let x = a.pow_base(2)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "3b": {
            max: 1000,
            unl: ()=>player.agh.lte(-24),
            icons: ["Icons/XP"],

            name: `Yet Another XP Upgrade`,
            desc: `Increases experience gained by <b class="green">x2</b> per level.`,

            cost: a => a.scale(1e3-1,2,"P").simpleCost("EA", 400, .2, 2.5).ceil(),
            bulk: a => a.simpleCost("EAI", 400, .2, 2.5).scale(1e3-1,2,"P",true).add(1).floor(),
            res: "momentum",

            effect(a) {
                let x = a.pow_base(2)
                return x
            },
            effDesc: x => formatMult(x,0),
        },
        "3c": {
            max: 1000,
            unl: ()=>player.agh.lte(-24),
            icons: ["Curr/DarkMatter"],

            name: `It Does Matter`,
            desc: `Increases dark matter gained by <b class="green">x1.5</b> per level.`,

            cost: a => a.scale(1e3-1,2,"P").simpleCost("EA", 1e3, .2, 3).ceil(),
            bulk: a => a.simpleCost("EAI", 1e3, .2, 3).scale(1e3-1,2,"P",true).add(1).floor(),
            res: "momentum",

            effect(a) {
                let x = a.pow_base(1.5)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3d": {
            max: 1000,
            unl: ()=>player.agh.lte(-24),
            icons: ["Curr/Normality"],

            name: `No Problem`,
            desc: `Increases normality points gained by <b class="green">x1.5</b> per level.`,

            cost: a => a.scale(1e3-1,2,"P").simpleCost("EA", 3e3, .2, 2.8).ceil(),
            bulk: a => a.simpleCost("EAI", 3e3, .2, 2.8).scale(1e3-1,2,"P",true).add(1).floor(),
            res: "momentum",

            effect(a) {
                let x = a.pow_base(1.5)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}