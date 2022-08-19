var tmp = {}
var tmp_update = []

function resetTemp() {
    keep = []
    tmp = {
        spawn_time: 0,
        rangeCut: 50,
        autocut: 5,
        autocutTime: 0,
        autocutAmt: 1,
        spawnAmt: 1,

        platChance: 0.005,
        platGain: 1,

        grasses: [],
        level: {},
        tier: {},

        upgs: {},
        upg_res: {},
        upg_ch: {},

        chal: {
            bulk: 0,
            amt: 0,
            goal: [],
            eff: [],
        },

        chargeEff: [],

        perkUnspent: 0,
        perks: 0,

        ghRunning: false,
        ghEffect: [],
    }

    for (let x in UPG_RES) tmp.upg_res[x] = E(0)

    for (let x in UPGS) {
        tmp.upg_ch[x] = -1
        tmp.upgs[x] = {
            unlLength: 0,
            max: [],
            cost: [],
            bulk: [],
            eff: [],
        }
    }
}

function updateTemp() {
    for (let x = 0; x < tmp_update.length; x++) tmp_update[x]()
}