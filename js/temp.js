var tmp = {}
var options = {
    notation: "mixed_sc",
}

function reloadTemp() {
    tmp = {
        currency_gain: {},

        upg_el: {},
        upg_effects: {},
        upg_el: {},
        upg_cl: {},

        lvl_bonus: {},

        foundry_effect: E(1),

        charger_bonus: [],
    }

    for (let id in UPGRADES) {
        tmp.upg_el[id] = {}
        tmp.upg_effects[id] = {}
    }
}

function getFoundryEffect() {
    if (!hasUpgrade('factory',1)) return E(1)
    
    let t = Math.min(player.steelie.time,86400*3)

    return Decimal.div(t,10).mul(upgradeEffect('factory',1)).add(1)
}

function updateTemp() {
    tmp.anti_unl = hasUpgrade('factory',5)

    updateLevelsTemp()
    updateUpgradesTemp()

    tmp.foundry_effect = getFoundryEffect()

    CHARGER.temp()

    for (let [i,v] of Object.entries(CURRENCIES)) tmp.currency_gain[i] = preventNaNDecimal(v.gain??E(0));

    options.notation = player.options.scMode ? "sc" : "mixed_sc";
    options.hideMaxed = player.options.hideMaxed;
}