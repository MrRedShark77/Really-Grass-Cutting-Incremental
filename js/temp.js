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
        auto_accomplish_time: 14400,

        charger_bonus: [],
    }

    for (let id in UPGRADES) {
        tmp.upg_el[id] = {}
        tmp.upg_effects[id] = {}
    }
}

function getFoundryEffect() {
    if (!hasUpgrade('factory',1)) return E(1)
    
    let t = Math.min(player.steelie.time*upgradeEffect('star','S1'),86400*3)

    return Decimal.div(t,10).mul(upgradeEffect('factory',1)).add(1)
}

function getStarAccumulatorEffect() {
    if (!hasUpgrade('factory',9)) return E(1)
    
    let t = Math.min(player.galactic.time,86400*3)

    return Decimal.div(t,1e3).add(1)
}

function updateTemp() {
    tmp.anti_unl = hasUpgrade('factory',5)
    tmp.star_unl = player.galactic.times

    updateLevelsTemp()
    updateUpgradesTemp()

    tmp.auto_accomplish_time = 14400 / upgradeEffect('star','S2')
    tmp.foundry_effect = getFoundryEffect()
    tmp.star_acc_effect = getStarAccumulatorEffect()

    CHARGER.temp()

    for (let [i,v] of Object.entries(CURRENCIES)) tmp.currency_gain[i] = preventNaNDecimal(v.gain??E(0));

    options.notation = player.options.scMode ? "sc" : "mixed_sc";
    options.hideMaxed = player.options.hideMaxed;
}