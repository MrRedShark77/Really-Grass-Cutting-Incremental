function E(x){return new Decimal(x)};

const EINF = Decimal.dInf

Math.lerp = function (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};

Decimal.prototype.clone = function() {
    return this
}

Decimal.prototype.modular=Decimal.prototype.mod=function (other){
    other=E(other);
    if (other.eq(0)) return E(0);
    if (this.sign*other.sign==-1) return this.abs().mod(other.abs()).neg();
    if (this.sign==-1) return this.abs().mod(other.abs());
    return this.sub(this.div(other).floor().mul(other));
};

Decimal.prototype.softcap = function (start, power, mode) {
    var x = this.clone()
    if (x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
        if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start)
    }
    return x
}

function scale(x, s, p, mode, rev=false) {
    s = E(s)
    p = E(p)
    if (x.gte(s)) {
        if ([0, "pow"].includes(mode)) x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)))
        if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p,x.sub(s)).mul(s)
    }
    return x
}

Decimal.prototype.scale = function (s, p, mode, rev=false) {
    s = E(s)
    p = E(p)
    var x = this.clone()
    if (x.gte(s)) {
        if ([0, "pow"].includes(mode)) x = rev ? x.mul(s.pow(p.sub(1))).root(p) : x.pow(p).div(s.pow(p.sub(1)))
        if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p,x.sub(s)).mul(s)
    }
    return x
}

Decimal.prototype.format = function (acc=2, max=9) { return format(this.clone(), acc, max) }

Decimal.prototype.formatGain = function (gain, mass=false) { return formatGain(this.clone(), gain, mass) }

function softcapHTML(x, start) { return E(x).gte(start)?` <span class='soft'>(softcapped)</span>`:"" }

Decimal.prototype.softcapHTML = function (start) { return softcapHTML(this.clone(), start) }

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getPlayerData() {
    let s = {
        grass: E(0),
        bestGrass: E(0),
        level: 0,
        xp: E(0),
        tier: 0,
        tp: E(0),

        upgs: {},
        autoUpg: {},

        maxPerk: 0,
        spentPerk: 0,

        plat: 0,

        pp: E(0),
        bestPP: E(0),
        pTimes: 0,

        crystal: E(0),
        bestCrystal: E(0),
        cTimes: 0,

        options: {
            hideUpgOption: false
        },

        chalUnl: false,

        chal: {
            progress: -1,
            comp: [],
        },

        grasshop: 0,

        steel: E(0),
        sTimes: 0,
        sTime: 0,

        chargeRate: E(0),
        bestCharge: E(0),

        decel: false,
        aGrass: E(0),
        aRes: {
            level: 0,
            xp: E(0),
            tier: 0,
            tp: E(0),
        },

        time: 0,
    }
    for (let x in UPGS) {
        s.upgs[x] = []
        s.autoUpg[x] = false
    }
    return s
}

function wipe(reload=false) {
    if (reload) {
        wipe()
        save()
        resetTemp()
        loadGame(false)
    }
    else player = getPlayerData()
}

function loadPlayer(load) {
    const DATA = getPlayerData()
    player = deepNaN(load, DATA)
    player = deepUndefinedAndDecimal(player, DATA)
    convertStringToDecimal()
}

function deepNaN(obj, data) {
    for (let x = 0; x < Object.keys(obj).length; x++) {
        let k = Object.keys(obj)[x]
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
    for (let x = 0; x < Object.keys(data).length; x++) {
        let k = Object.keys(data)[x]
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}

function convertStringToDecimal() {
    
}

function cannotSave() { return false }

function save(){
    let str = btoa(JSON.stringify(player))
    if (cannotSave() || findNaN(str, true)) return
    if (localStorage.getItem("gci_save") == '') wipe()
    localStorage.setItem("gci_save",str)
    tmp.prevSave = localStorage.getItem("gci_save")
    console.log("Game Saved")
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
    if (findNaN(str, true)) {
        console.warn("Error Exporting, because it got NaNed")
        return
    }
    save();
    let file = new Blob([str], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "GCI Save - "+new Date().toGMTString()+".txt"
    a.click()
}

function export_copy() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        console.warn("Error Exporting, because it got NaNed")
        return
    }

    let copyText = document.getElementById('copy')
    copyText.value = str
    copyText.style.visibility = "visible"
    copyText.select();
    document.execCommand("copy");
    copyText.style.visibility = "hidden"
    console.log("Exported to clipboard")
}

function importy() {
    let loadgame = prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")
        if (loadgame != null) {
            let keep = player
            try {
                setTimeout(_=>{
                    if (findNaN(loadgame, true)) {
                        addNotify("Error Importing, because it got NaNed")
                        return
                    }
                    load(loadgame)
                    save()
                    resetTemp()
                    loadGame(false)
                    location.reload()
                }, 200)
            } catch (error) {
                addNotify("Error Importing")
                player = keep
            }
        }
}

function loadGame(start=true, gotNaN=false) {
    if (!gotNaN) tmp.prevSave = localStorage.getItem("gci_save")
    wipe()
    load(tmp.prevSave)
    resetTemp()
    setupHTML()

    for (let x in UPGS) {
        UPGS_SCOST[x] = []
        for (let y in UPGS[x].ctn) UPGS_SCOST[x][y] = UPGS[x].ctn[y].cost(0)
    }
    
    if (start) {
        for (let x = 0; x < 50; x++) updateTemp()
        //for (let x = 0; x < 10; x++) createGrass()
        grassCanvas()
        setInterval(save,60000)
        setInterval(loop, 100/3)
        setInterval(checkNaN,1000)
    }
}

function checkNaN() {
    if (findNaN(player)) {
        console.warn("Game Data got NaNed")

        resetTemp()
        loadGame(false, true)
    }
}

function findNaN(obj, str=false, data=getPlayerData()) {
    if (str ? typeof obj == "string" : false) obj = JSON.parse(atob(obj))
    for (let x = 0; x < Object.keys(obj).length; x++) {
        let k = Object.keys(obj)[x]
        if (typeof obj[k] == "number") if (isNaN(obj[k])) return true
        if (str) {
            if (typeof obj[k] == "string") if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return true
        } else {
            if (obj[k] == null || obj[k] == undefined ? false : Object.getPrototypeOf(obj[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return true
        }
        if (typeof obj[k] == "object") return findNaN(obj[k], str, data[k])
    }
    return false
}