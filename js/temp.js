var tmp = {}
var options = {
    
}

function reloadTemp() {
    tmp = {
        currency_gain: {},

        upg_el: {},
        upg_effects: {},

        lvl_bonus: {},
    }

    for (let id in UPGRADES) {
        tmp.upg_el[id] = {}
        tmp.upg_effects[id] = {}
    }
}

function updateTemp() {
    updateLevelsTemp()
    updateUpgradesTemp()

    for (let [i,v] of Object.entries(CURRENCIES)) tmp.currency_gain[i] = preventNaNDecimal(v.gain??E(0))
}