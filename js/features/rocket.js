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

    b: x => Decimal.sqr(x).add(Decimal.mul(x,19)).div(20),

    get base_inc() {
        let p = player.rocket.part

        return p.add(1)
    },

    get_base(n) {
        let b = this.b;

        return b(n.min(100))
        .add(b(n.sub(100).max(0).min(900)).mul(100))
        .add(b(n.sub(1000).max(0).min(9000)).mul(1000))
        .add(n.sub(10000).max(0).mul(1e15)).mul(this.base_inc)
    },

    get gain() {
        let y = this.total, x = E(0), base = this.get_base(y), inc = this.base_inc,
        oil = CURRENCIES.oil.amount.add(base.mul(100)), charge = CURRENCIES.charge.amount.add(base.mul(1e27));

        let r = charge.div(1e25).min(oil).div(100).div(inc)
        x = F.solveQuadratic(1,19,r.mul(-20)).floor()

        if (x.gt(100)) {
            r = r.sub(this.b(100)).div(100)
            x = F.solveQuadratic(1,19,r.mul(-20)).floor().add(100)
        }

        if (x.gt(1000)) {
            // console.log(r.format(), this.b(900).format())
            r = r.sub(this.b(900)).div(10)
            x = F.solveQuadratic(1,19,r.mul(-20)).floor().add(1000)
        }

        if (x.gt(10000)) {
            r = r.sub(this.b(9000)).div(1e12)
            x = r.floor().add(10000)
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
        let b = t.gte(1e4) ? E(1e15) : t.gte(1000) ? t.sub(1000).div(10).add(1).mul(1000) : t.gte(100) ? t.sub(100).div(10).add(1).mul(100) : t.div(10).add(1)
        b = b.mul(inc)
        return `Next Rocket Fuel
        <br><b class="yellow">Charge</b><br><b class="${charge.gte(b.mul(1e27)) ? 'green' : 'red'}">${charge.format(0)} / ${b.mul(1e27).format(0)}</b>
        <br><b class="black">Oil</b><br><b class="${oil.gte(b.mul(100)) ? 'green' : 'red'}">${oil.format(0)} / ${b.mul(100).format(0)}</b>`
    },
    color: ['#117e99','#1fa4c5'],

    icon: "Curr/RocketFuel",

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
    unl: () => hasUpgrade('factory',6),
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

    get next_part() {
        let p = player.rocket.part
        if (p.gte(10)) return [EINF, EINF];
        return [p.add(1).mul(1e21), p.mul(10)]
    },

    name: "Rocket Part",
    get reset_desc() {
        let t = player.rocket.total, steel = CURRENCIES.steelie.amount
        let a = this.next_part;
        return `Reset everything liquefy does as well as oil, oil upgrades, steel, and total rocket fuel for rocket part and momentum.
        <br><b class="gray">Steel</b><br><b class="${steel.gte(a[0]) ? 'green' : 'red'}">${steel.format(0)} / ${a[0].format(0)}</b>
        <br><b class="lightblue">Total Rocket Fuel</b><br><b class="${t.gte(a[1]) ? 'green' : 'red'}">${t.format(0)} / ${a[1].format(0)}</b>`
    },
    color: ['#7d5227','#ffd421'],

    icon: "Curr/Momentum",
    get gain_desc() { return "+1" },

    success() {
        player.rocket.part = player.rocket.part.add(1)
        player.rocket.momentum = player.rocket.momentum.add(1)
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
        let x = E(1)

        return x
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
    },
}