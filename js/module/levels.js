const LEVELS = {
    xp: {
        unl: () => true,
        pos: [1,-0.5],

        name: "Level",
        exp_name: "XP",
        color: "cyan",

        get exp() { return player.xp },

        get level() { return player.level },
        set level(v) { player.level = v },

        onCheck() {
            let b = E(1).add(getAccomplishmentBonus(4))
            if (player.grasshop.gte(7)) b = b.add(1)
            let perk = this.level.sub(1).mul(b)

            gainCurrency('perks',perk.sub(player.best_perks).max(0))
            player.best_perks = player.best_perks.max(perk)
        },

        req(a) {
            let x = a.scale(200,2,"L").sumBase(1.3).mul(50)

            return x.ceil()
        },
        bulk(a) {
            let x = a.div(50).sumBase(1.3,true).scale(200,2,"L",true)

            return x.add(1).floor()
        },

        bonus(a) {
            let x = a.max(1)
            if (hasUpgrade('prestige',5)) x = x.add(a.max(1).sub(1).pow_base(1.1))
            return x
        },
        bonusDesc: x => formatMult(x,0) + " Grass",
    },
    tp: {
        unl: () => player.prestige.times > 0,
        pos: [1,-1],

        name: "Tier",
        exp_name: "TP",
        color: "gold",

        get exp() { return player.tp },

        get level() { return player.tier },
        set level(v) { player.tier = v },

        req: a => a.sumBase(3).mul(300).ceil(),
        bulk: a => a.div(300).sumBase(3,true).add(1).floor(),

        bonus(a) {
            let x = a.max(1).sub(1).pow_base(2)
            return x
        },
        bonusDesc: x => formatMult(x,0) + " Grass, XP",
    },
    'anti-xp': {
        unl: () => tmp.anti_unl,
        pos: [21,-0.5],

        name: "Anti-Level",
        exp_name: "XP",
        color: "#1200ff",

        get exp() { return player.anti.xp },

        get level() { return player.anti.level },
        set level(v) { player.anti.level = v },

        req(a) {
            let x = a.scale(200,2,"L").sumBase(1.3).mul(50)

            return x.ceil()
        },
        bulk(a) {
            let x = a.div(50).sumBase(1.3,true).scale(200,2,"L",true)

            return x.add(1).floor()
        },

        bonus(a) {
            let x = Decimal.pow(1.1,a.sub(1).max(0))
            return x
        },
        bonusDesc: x => formatMult(x) + " Charge Rate",
    },
}

function checkLevel(id) {
    let lvl = LEVELS[id];

    if (lvl.exp.gte(lvl.req(lvl.level))) {
        let bulk = lvl.bulk(lvl.exp).sub(lvl.level).max(1);

        lvl.level = lvl.level.add(bulk);

        lvl.onCheck?.()
    }
}

function setupLevels() {
    for (let id in LEVELS) {
        let L = LEVELS[id];

        createGridElement('level-'+id,{
            unl: L.unl,
            pos: L.pos,
            size: [3,0.5],
            class: "level-div",

            get html() {
                return `
                <div class="level-name">${L.name} <span id="level-${id}">1</span></div>
                <div class="level-bar">
                    <div class="level-bar-fill" style="background-color: ${L.color}" id="level-${id}-bar"></div>
                    <div class="level-bar-text" id="level-${id}-exp">???</div>
                </div>
                <div class="level-bonus" id="level-${id}-bonus"></div>
                `
            },

            updateHTML() {
                let el_id = `level-${id}`

                el(el_id).innerHTML = format(L.level,0)

                let lvl = L.level, exp = L.exp, req = L.req(lvl), previous = L.req(lvl.sub(1))
                let p = exp.sub(previous).max(0), q = req.sub(previous).max(0)

                el(el_id+"-bar").style.width = p.div(q).min(1).toNumber() * 100 + "%"
                el(el_id+"-exp").innerHTML = format(p,0) + " / " + format(q,0) + " " + L.exp_name

                el(`level-${id}-bonus`).innerHTML = 'bonusDesc' in L ? L.bonusDesc(tmp.lvl_bonus[id]) : ""
            },
        })
    }
}

function getLevelBonus(id,def=1) { return tmp.lvl_bonus[id] ?? def }

function updateLevelsTemp() {
    for (let id in LEVELS) {
        let L = LEVELS[id];
        if ('bonus' in L) tmp.lvl_bonus[id] = L.bonus(L.level);
    }
}