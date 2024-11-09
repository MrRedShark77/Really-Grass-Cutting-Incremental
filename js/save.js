const VERSION = 1
const SAVE_ID = "rgci2_save"
var prevSave = "", autosave

function getPlayerData() {
    let s = {
        time: 0,
        latest: Date.now(),

        saved_cam: {x : 0, y : 0},

        grass: E(0),
        upgs: {},
        auto_upgs: {},
        auto_upgs_ratio: {},

        xp: E(0),
        level: E(1),

        tp: E(0),
        tier: E(1),

        perks: E(0),
        best_perks: E(0),

        platinum: E(0),

        prestige: {
            times: 0,
            points: E(0),
            time: 0,
        },

        crystal: {
            times: 0,
            points: E(0),
            time: 0,
        },

        accomplishments: [],

        grasshop: E(0),

        steelie: {
            times: 0,
            points: E(0),
            time: 0,

            charge: E(0),
            bestCharge: E(0),
        },

        anti: {
            grass: E(0),
            xp: E(0),
            level: E(1),
        },

        anonymity: {
            times: 0,
            points: E(0),
            time: 0,
        },

        oil: {
            times: 0,
            points: E(0),
            time: 0,
        },

        rocket: {
            fuel: E(0),
            total: E(0),
            part: E(0),
            momentum: E(0),
        },

        lists: {
            currencies: {},
            levels: {},
        },

        options: {
            hideMaxed: false,
            scMode: false,
        },
        map_pins: [],
    }

    for (let k in UPGRADES) {
        s.upgs[k] = {}
        s.auto_upgs[k] = {}
        s.auto_upgs_ratio[k] = {}
        for (let k2 in UPGRADES[k].ctn) {
            s.upgs[k][k2] = E(0)
            s.auto_upgs[k][k2] = true
            s.auto_upgs_ratio[k][k2] = .1
        }
    }

    for (let id in LISTS.currencies) s.lists.currencies[id] = [false,true];
    for (let id in LISTS.levels) s.lists.levels[id] = false;

    for (let i in ACCOM.ctn) s.accomplishments[i] = E(0);

    return s
}

function wipe(reload) {
	player = getPlayerData()
    reloadTemp()
	if (reload) {
        save()
        location.reload()
    }
}

function loadPlayer(load) {
    const DATA = getPlayerData()
    player = deepNaN(load, DATA)
    player = deepUndefinedAndDecimal(player, DATA)
    camera_pos = player.saved_cam
}

function clonePlayer(obj,data) {
    let unique = {}

    for (let k in obj) {
        if (data[k] == null || data[k] == undefined) continue
        unique[k] = Object.getPrototypeOf(data[k]).constructor.name == "Decimal"
        ? E(obj[k])
        : typeof obj[k] == 'object'
        ? clonePlayer(obj[k],data[k])
        : obj[k]
    }

    return unique
}

function deepNaN(obj, data) {
    for (let k in obj) {
        if (typeof obj[k] == 'string') {
            if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) obj[k] = data[k]
        } else {
            if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k]
            if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k])
        }
    }
    return obj
}

function deepUndefinedAndDecimal(obj, data) {
    if (obj == null) return data
    for (let k in data) {
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}

function preventSaving() { return tmp.the_end }

function save() {
    let str = btoa(JSON.stringify(player))
    if (preventSaving() || findNaN(str, true)) return
    if (localStorage.getItem(SAVE_ID) == '') wipe()
    localStorage.setItem(SAVE_ID,str)
    prevSave = str
    console.log("Game Saved!")
    // addNotify("Game Saved!")
}

function load(x){
    if(typeof x == "string" & x != ''){
        loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}

function exporty() {
    let str = btoa(JSON.stringify(player))
    save();
    let file = new Blob([str], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "RGCI2 Save - "+new Date().toGMTString()+".txt"
    a.click()
}

function export_copy() {
    let str = btoa(JSON.stringify(player))

    let copyText = document.getElementById('copy')
    copyText.value = str
    copyText.style.visibility = "visible"
    copyText.select();
    document.execCommand("copy");
    copyText.style.visibility = "hidden"
}

function importy() {
    loadgame = prompt("Paste in your save. WARNING: WILL OVERWRITE YOUR CURRENT SAVE!")
    if (loadgame != null) {
        let keep = player
        try {
			if (findNaN(loadgame, true)) {
				error("Error Importing, because it got NaNed")
				return
			}
			localStorage.setItem(SAVE_ID, loadgame)
			location.reload()
        } catch (error) {
            error("Error Importing")
            player = keep
        }
    }
}

function importy_file() {
    let a = document.createElement("input")
    a.setAttribute("type","file")
    a.click()
    a.onchange = ()=>{
        let fr = new FileReader();
        fr.onload = () => {
            let loadgame = fr.result
            if (findNaN(loadgame, true)) {
				error("Error Importing, because it got NaNed")
				return
			}
            localStorage.setItem(SAVE_ID, loadgame)
			location.reload()
        }
        fr.readAsText(a.files[0]);
    }
}

function wipeConfirm() {
    if (confirm(`Are you sure you want to wipe your save?`)) wipe(true)
}

function checkNaN() {
    let naned = findNaN(player)
    if (naned) {
        warn("Game Data got NaNed because of "+naned.bold())
        resetTemp()
        loadGame(false, true)
        tmp.start = 1
        tmp.pass = 1
    }
}

function isNaNed(val) {
    return typeof val == "number" ? isNaN(val) : Object.getPrototypeOf(val).constructor.name == "Decimal" ? isNaN(val.mag) : false
}

function findNaN(obj, str=false, data=getPlayerData(), node='player') {
    if (str ? typeof obj == "string" : false) obj = JSON.parse(atob(obj))
    for (let k in obj) {
        if (typeof obj[k] == "number") if (isNaNed(obj[k])) return node+'.'+k
        if (str) {
            if (typeof obj[k] == "string") if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return node+'.'+k
        } else {
            if (obj[k] == null || obj[k] == undefined ? false : Object.getPrototypeOf(obj[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return node+'.'+k
        }
        if (typeof obj[k] == "object") {
            let node2 = findNaN(obj[k], str, data[k], (node?node+'.':'')+k)
            if (node2) return node2
        }
    }
    return false
}