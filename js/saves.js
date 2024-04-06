const VER = 0.0501
const EINF = Decimal.dInf
const BETA = false
const save_name = BETA ? "rgci_beta_save" : "gci_save"
const FPS = 30

Math.lerp = function (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};

Math.logBase = function (value, base) {
    return Math.log(value) / Math.log(base);
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function gainHTML(amt,gain,pass=0) {
    return pass>0?" <span class='smallAmt'>"+formatGain(amt,Decimal.mul(gain,pass))+"</span>":''
}

function getPlayerData() {
    let s = {
        grass: E(0),
        bestGrass: E(0),
        level: E(0),
        xp: E(0),
        tier: E(0),
        tp: E(0),

        upgs: {},
        autoUpg: {},

        maxPerk: E(0),
        generatedPerk: E(0),
        spentPerk: E(0),
        spentPerkSolar: E(0),

        plat: E(0),

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
        aBestGrass: E(0),
        aRes: {
            level: E(0),
            xp: E(0),
            tier: E(0),
            tp: E(0),
        },
        
        ap: E(0),
        bestAP: E(0),
        bestAP2: E(0),
        aTimes: 0,

        oil: E(0),
        bestOil: E(0),
        bestOil2: E(0),
        lTimes: 0,

        rocket: {
            total_fp: E(0),
            amount: E(0),
            part: 0,
        },

        momentum: E(0),

        gTimes: 0,
        gTime: 0,
        stars: E(0),
        lowGH: 1e300,

        astral: E(0),
        astralPrestige: E(0),
        sp: E(0),

        moonstone: E(0),
        grassskip: 0,
        bestGS: 0,

        gsUnl: false,

        ghMult: false,
        gsMult: false,

        autoGH: false,
        autoGS: false,

        star_chart: {
            auto: [],
            speed: [],
            progress: [],
            ring: [],
            reserv: [],
        },

        fTimes: 0,
        fun: E(0),
        SFRGT: E(0),

        sacTimes: 0,
        dm: E(0),

        recel: false,
        unGrass: E(0),
        unBestGrass: E(0),
        unRes: {
            level: E(0),
            xp: E(0),
            tier: E(0),
            tp: E(0),
        },

        np: E(0),
        bestNP: E(0),
        bestNP2: E(0),
        nTimes: 0,

        cloud: E(0),
        bestCloud: E(0),
        bestCloud2: E(0),
        cloudUnl: false,

        grassjump: 0,

        planetoid: getPlanetoidSave(),
        constellation: getConstellationSave(),

        lunar: {
            active: [],
            level: new Array(LUNAR_OB.length).fill(0),
            lp: new Array(LUNAR_OB.length).fill(E(0)),
        },

        centralized: [],
        singularity: 0,

        sol: getSolarianSave(),
        lun: getLunarianSave(),

        darkCharge: E(0),

        stardust: E(0),
        stargrowth: E(0),

        offline: { time: 0, current: 0, enabled: true },
        timewarp: { amt: 0, time: 0 },
        sn: getSupernovaSave(),

        synthesis: {
            slot: [],

            cs: E(0),
            fs: E(0),
            eg: E(0),
        },

        pinned_drag: {
            currency: [true],
            level: [true],
            bonus: [true],
        },

        hsj: 0,

        world: 'ground',

        time: 0,
        version: VER,
    }
    for (let x in UPGS) {
        s.upgs[x] = []
        s.autoUpg[x] = false
    }
    for (let x in SYNTHESIS.slot) {
        s.synthesis.slot[x] = [-1,E(0)]
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
    if (!player.version) player.version = 0
    player = deepUndefinedAndDecimal(player, DATA)
    convertStringToDecimal()

    let c = Date.now() - player.offline.current
    player.offline.time = player.offline.time === null || c < 60000 || !player.offline.enabled ? 0 : c
    player.offline.current = Date.now()
}

function checkVersion() {
    const DATA = getPlayerData()

    if (player.version < 0.0306 && player.rocket.total_fp > 0) {
        player.rocket.total_fp = E(0)
        player.rocket.amount = E(0)
        player.oil = E(0)
        player.bestOil = E(0)
        player.ap = E(0)
        player.bestAP = E(0)
        player.aGrass = E(0)
        player.aBestGrass = E(0)
        player.aRes.level = E(0)
        player.aRes.tier = E(0)
        player.aRes.xp = E(0)
        player.aRes.tp = E(0)

        player.steel = E(0)
        player.chargeRate = E(0)

        resetUpgrades('ap')
        resetUpgrades('oil')
        resetUpgrades('rocket')

        console.log('guh?')
    }

    if (player.version < 0.0401) {
        player.bestGS = Math.max(player.bestGS, player.grassskip)
    }
    
    if (player.version < 0.0404 && player.grassjump>=5) {
        player.lunar = DATA.lunar

        player.astralPrestige = 0

        player.grasshop = 0
        if (player.grassskip>60) player.grassskip = 60

        RESET.formRing.doReset()

        player.cloud = E(0)
        player.bestCloud = E(0)
        player.bestCloud2 = E(0)

        player.np = E(0)
        player.bestNP = E(0)
        player.bestNP2 = E(0)

        player.unGrass = E(0)
        player.unBestGrass = E(0)
        player.unRes.level = E(0)
        player.unRes.tier = E(0)
        player.unRes.xp = E(0)
        player.unRes.tp = E(0)

        if (player.grassjump>5) player.grassjump = 5

        RESET.sac.doReset()

        resetUpgrades('unGrass')
        resetUpgrades('np')
        resetUpgrades('cloud')

        if (player.planetoid.planetTier>10) player.planetoid.planetTier = 10

        resetUpgrades('planet')
        player.planetoid.planet = E(0)

        player.momentum = E(0)
        resetUpgrades('momentum')

        player.sfgrt = E(0)
        resetUpgrades('sfrgt')

        player.dm = E(0)
        resetUpgrades('dm')

        console.log('guh? ^2')
    }

    if (player.version < 0.05) {
        player.offline.current = Date.now();
        player.offline.time = 0;
    }

    if (player.version < 0.0501) {
        player.sn.totalRemnant = player.sn.eclipse
    }
 
    player.lowGH = Math.max(player.lowGH,-60)

    player.version = VER
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
        else if (data[k] !== null) {
            if (Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}

function convertStringToDecimal() {
    for (let x in UPGS) player.upgs[x] = player.upgs[x].map(a => E(a))

    fastDecimalCheck(player.lun.res)
    fastDecimalCheck(player.lun.items)
}

function cannotSave() { return !is_online }

function save(){
    player.offline.current = Date.now();

    let str = btoa(JSON.stringify(player))
    if (cannotSave() || findNaN(str, true)) return
    if (localStorage.getItem(save_name) == '') wipe()

    localStorage.setItem(save_name,str)
    tmp.prevSave = localStorage.getItem(save_name)
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
                setTimeout(()=>{
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
    if (!gotNaN) tmp.prevSave = localStorage.getItem(save_name)
    wipe()
    load(tmp.prevSave)
    resetTemp()
    setupHTML()

    for (let x in UPGS) {
        UPGS_SCOST[x] = []
        for (let y in UPGS[x].ctn) UPGS_SCOST[x][y] = UPGS[x].ctn[y].cost(E(0))
    }

    for (let x in STAR_CHART) {
        SC_SCOST[x] = []
        for (let y in STAR_CHART[x]) SC_SCOST[x][y] = STAR_CHART[x][y].cost(0)
    }
    
    if (start) {
        for (let x = 0; x < 50; x++) updateTemp()
        checkVersion()
        //for (let x = 0; x < 10; x++) createGrass()
        grassCanvas()
        treeCanvas()
        checkConstellationCosts()
        updateConstellation()
        setInterval(checkNaN,1000)
        setInterval(()=>{
            checkConstellationCosts()
            if (player.sn.tier.lt(14)) updateConstellation()
        },1000)
        setupSolarianStage()

        tmp.el.offline_box.setDisplay(false) 
        tmp.el.map.setDisplay(false) 

        updateHTML()

        setTimeout(()=>{
            tmp.el.app.setDisplay(true)
            if (player.offline.time > 0 && hasUpgrade('auto',0)) {
                simulateTime(player.offline.time/1e3, true)
            } else {
                setInterval(save,60000)
            }

            setInterval(loop,1000/FPS)
        },1000)
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

function overflow(number, start, power, meta=1){
	if(isNaN(number.mag))return new Decimal(0);
	start=E(start);
	if(number.gte(start)){
        let s = start.iteratedlog(10,meta)
		number=Decimal.iteratedexp(10,meta,number.iteratedlog(10,meta).div(s).pow(power).mul(s));
	}
	return number;
}

Decimal.prototype.overflow = function (start, power, meta) { return overflow(this.clone(), start, power, meta) }

var is_online = true
const MAX_TICKS = 500

function simulateTime(sec, start=false) {
    let ticks = sec * FPS
    let bonusDiff = 0
    if (ticks > MAX_TICKS) {
        bonusDiff = (ticks - MAX_TICKS) / FPS / MAX_TICKS
        ticks = MAX_TICKS
    }

    is_online = false
    let max_tick = ticks
    tmp.el.offline_time.setHTML(formatTime(sec,0))

    document.getElementById('offline_skip').onclick = ()=>{
        clearInterval(calc_interval)

        updateTemp()

        let dt = (1/FPS+bonusDiff) * (ticks)
        calc(dt)
        
        if (start) {
            calcTimeWarp(dt)
            setInterval(save,60000)
        }
        is_online = true
        tmp.el.offline_box.setDisplay(false)
    }

    var calc_interval = setInterval(()=>{
        ticks--

        updateTemp()

        let dt = 1/FPS+bonusDiff
        calc(dt)
        if (start) calcTimeWarp(dt)

        tmp.el.offline_bar.changeStyle('width',Math.min(Math.max(1-ticks/max_tick,0),1)*100+"%")
        tmp.el.offline_ticks.setHTML(max_tick-ticks + " / " + max_tick)

        if (ticks <= 0) {
            clearInterval(calc_interval)
            if (start) {
                setInterval(save,60000)
            }
            is_online = true
            tmp.el.offline_box.setDisplay(false)
            return
        }
    },1)

    tmp.el.offline_box.setDisplay(true)
}