const WORLD_GENERATION = {
    lunar1: {
        run() {

        },
        config: {
            colors: ['#003'],

            enemies_range: [20,30],
            treasures_range: [15,20],

            treasure_weight: [
                ['l_curr1',1],
                ['rage_essence',1/3],
                ['calm_essence',1/3],
                ['wise_essence',1/3],
                ['l_soul',0.5,2],
                ['mouse',0.001],
            ],
        },
    },
}

const OBJECT_TYPE = {
    enemy: {
        title: "Enemy",
    },
    treasure: {
        title: "Locked Treasure",
        desc: "Contains random items. You must need a key to open the treasure.",
    },
    heal: {
        title: "Locked Healing Chest",
        desc: `Heals you by any percent of your max lunarians. You must need a key to open the chest.`,
    },
    portal: {
        title: "Portal",
        desc: `To enter the portal, you must need to kill enough enemies.`,
    },
}

const LUNAR_ITEMS = {
    l_soul: {
        type: "res",
        name: "Lunarian Soul",
        icon: "Curr/LunarianSoul",
    },
    l_curr1: {
        type: "res",
        name: "Lunarian Soil",
        icon: "Curr/LunarCurrency1",
    },
    mouse: {
        type: "items",
        name: "Mouse / Rat",
        icon: "Curr/Mouse",

        upgBase: 1,
        get upgradeDesc() { return `Increase luck by <b class='green'>+10%</b> per level (WIP). <b class='green'>(+${formatPercent(this.upgEffect(this.upg_level)-1,0)})</b>` },
        upgEffect: x => x / 10 + 1,
    },
    key: {
        type: "items",
        name: "Key",
        icon: "Curr/LunarianKey",
        desc: "You can open/reveal treasure chest using it.",

        upgBase: 100,
        maxLevel: 50,
        get upgradeDesc() { return `Increase chance to prevent key consuming of chest by <b class='green'>+1%</b> per level. <b class='green'>(+${formatPercent(this.upgEffect(this.upg_level),0)})</b>` },
        upgEffect: x => x / 100,
        updateUpgrade() {
            temp.key_chance += this.upgEffect(this.upg_level)
        }
    },
    rage_essence: {
        type: "items",
        name: "Rage Essence",
        icon: "Items/RageEssence",
        get desc() { return `Increase lunarian damage by <b class='green'>+${formatPercent(getUpgradeBoost(this.upg_level))}</b> per quantity. <b class='green'>(${formatMult(this.updateEffect())})</b>` },
        updateEffect() {
            let x = this.amount.mul(getUpgradeBoost(this.upg_level)).add(1)

            temp.damage = temp.damage.mul(x)

            return x
        },

        boosted: true,
        maxLevel: 25,
        get upgradeDesc() { return `Increase critical chance by <b class='green'>+1%</b> per level. <b class='green'>(+${formatPercent(this.upgEffect(this.upg_level),0)})</b>` },
        upgEffect: x => x / 100,
        updateUpgrade() {
            temp.crit_chance += this.upgEffect(this.upg_level)
        }
    },
    calm_essence: {
        type: "items",
        name: "Calm Essence",
        icon: "Items/CalmEssence",
        get desc() { return `Increase defense power by <b class='green'>+${formatPercent(getUpgradeBoost(this.upg_level)/10)}</b> per quantity. <b class='green'>(${formatMult(this.updateEffect())})</b>` },
        updateEffect() {
            let x = this.amount.mul(getUpgradeBoost(this.upg_level)).div(10).add(1)

            temp.defense = temp.defense.mul(x)

            return x
        },

        boosted: true,
        maxLevel: 25,
        get upgradeDesc() { return `Increase block chance by <b class='green'>+1%</b> per level. <b class='green'>(+${formatPercent(this.upgEffect(this.upg_level),0)})</b>` },
        upgEffect: x => x / 100,
        updateUpgrade() {
            temp.block_chance += this.upgEffect(this.upg_level)
        }
    },
    wise_essence: {
        type: "items",
        name: "Wise Essence",
        icon: "Items/WiseEssence",
        get desc() { return `Increase maximum lunarians by <b class='green'>+${formatPercent(getUpgradeBoost(this.upg_level)/10)}</b> per quantity. <b class='green'>(${formatMult(this.updateEffect())})</b>` },
        updateEffect() {
            let x = this.amount.mul(getUpgradeBoost(this.upg_level)).div(10).add(1)

            temp.max_lunar = temp.max_lunar.mul(x)

            return x
        },

        boosted: true,
        maxLevel: 100,
        get upgradeDesc() { return `Increase the efficiency of healing chest by <b class='green'>+1%</b> per level. <b class='green'>(+${formatPercent(this.upgEffect(this.upg_level)-1,0)})</b>` },
        upgEffect: x => x / 100 + 1,
        updateUpgrade() {
            temp.hc_power *= this.upgEffect(this.upg_level)
        }
    },
}

function getUpgradeBoost(l) { return 1 + l / 10 }

function getLunarianSave() {
    let s = {
        res: {},
        items: {},

        completed: [],
        upgrades: {},
    }
    for (let [i,x] of Object.entries(LUNAR_ITEMS)) if (x.type == "items") s.upgrades[i] = 0
    return s
}

function fastDecimalCheck(object) {
    for (let i in object) object[i] = E(object[i])
}