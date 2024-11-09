const CURRENCIES = {
    grass: {
        name: "Grass",
        icon: "Curr/Grass",
        base: "Bases/GrassBase",

        get amount() { return player.grass },
        set amount(v) { player.grass = v.max(0) },

        get gain() {
            return calculatePassiveAutocut('normal','grass')
        },
    },
    platinum: {
        name: "Platinum",
        icon: "Curr/Platinum",
        base: "Bases/PlatBase",

        get amount() { return player.platinum },
        set amount(v) { player.platinum = v.max(0) },

        get gain() {
            return calculatePassiveAutocut('normal','platinum')
        },
    },
    xp: {
        name: "XP",
        icon: "Icons/XP",
        base: "Bases/GrassBase",

        get amount() { return player.xp },
        set amount(v) {
            player.xp = v.max(0)
            checkLevel('xp')
        },

        get gain() {
            return calculatePassiveAutocut('normal','xp')
        },
    },
    tp: {
        name: "TP",
        icon: "Icons/TP",
        base: "Bases/PrestigeBase",

        get amount() { return player.tp },
        set amount(v) {
            player.tp = v.max(0)
            checkLevel('tp')
        },

        get gain() {
            return calculatePassiveAutocut('normal','tp')
        },
    },
    perks: {
        name: "Perks",
        icon: "Curr/Perks",
        base: "Bases/PerkBase",

        get amount() { return player.perks },
        set amount(v) { player.perks = v.max(0) },
    },
    'anti-grass': {
        name: "Anti-Grass",
        icon: "Curr/AntiGrass",
        base: "Bases/AntiGrassBase",

        get amount() { return player.anti.grass },
        set amount(v) { player.anti.grass = v.max(0) },

        get gain() {
            return calculatePassiveAutocut('anti','anti-grass')
        },
    },
    'anti-xp': {
        name: "Anti-XP",
        icon: "Icons/AntiXP",
        base: "Bases/AntiGrassBase",

        get amount() { return player.anti.xp },
        set amount(v) {
            player.anti.xp = v.max(0)
            checkLevel('anti-xp')
        },

        get gain() {
            return calculatePassiveAutocut('anti','anti-xp')
        },
    },
}

function gainCurrency(id,amt) {
    var curr = CURRENCIES[id]
    curr.amount = curr.amount.add(amt).max(0)
    if ('total' in curr) curr.total = curr.total.add(amt).max(0);
    if ('best' in curr) curr.best = curr.best.max(curr.amount);
}