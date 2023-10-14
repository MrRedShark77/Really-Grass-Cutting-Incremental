const SOLARIANS = {
    get offense() {
        let x = player.sol.fight_mult
        
        .mul(getFormingBonus('stats',0)).mul(getFormingBonus('stats',2))
        .mul(solarUpgEffect(6,5))
        .mul(solarUpgEffect(5,3))
        .mul(solarUpgEffect(9,1))

        .mul(getSolCompressionEffect(0))
        .mul(getFormingBonus('restore',3))

        .mul(getStarBonus(7))

        x = x.pow(solarUpgEffect(9,7))

        return x
    },

    enemy: {
        get max_health() {
            let x = Decimal.pow(10,player.sol.stage.scale(99,3,0).scale(14,hasSolarUpgrade(7,5)?1.75:2,0)).mul(1e3)

            return x
        },
        get soul_gain() {
            let s = player.sol.stage

            let x = Decimal.pow(1.1,s).mul(s.add(1))

            .mul(getSolCompressionEffect(1)).mul(solarUpgEffect(9,0))

            if (hasSolarUpgrade(7,2)) x = x.mul(2)

            return x.floor()
        },
    },

    get stageBonus() {
        let e = {}, s = player.sol.stage

        e.fm = Decimal.pow(3,s.min(100))
        e.sr = Decimal.pow(5,s)
        e.sunstone = Decimal.pow(3,s)

        if (s.gte(10)) e.ss = Decimal.pow(3,s.sub(9))
        if (s.gte(75)) e.sf = Decimal.pow(2,s.sub(74))

        return e
    },

    get sunriseFM() {
        let x = Decimal.mul(getStageBonus('fm'),getFormingBonus('stats',1))

        return x
    },

    get collectingMult() {
        let x = E(1)

        x = x.mul(solarUpgEffect(8,0)).mul(solarUpgEffect(5,4)).mul(solarUpgEffect(8,7))

        .mul(getSolCompressionEffect(1)).mul(getFormingBonus('restore',1))

        .mul(getStarBonus(8))

        return x
    },
    get formingMult() {
        let x = E(1)

        x = x.mul(solarUpgEffect(8,1)).mul(solarUpgEffect(8,5)).mul(solarUpgEffect(5,5)).mul(solarUpgEffect(8,8))

        .mul(getSolCompressionEffect(1)).mul(getFormingBonus('restore',2))

        if (hasSolarUpgrade(7,4)) x = x.mul(solarUpgEffect(7,4))

        .mul(getStarBonus(8))

        return x
    },
    get restoreMult() {
        let x = E(1)

        x = x.mul(solarUpgEffect(9,4)).mul(solarUpgEffect(5,7))

        if (hasSolarUpgrade(7,7)) x = x.mul(solarUpgEffect(7,7))

        return x
    },

    get manaGain() {
        let c = tmp.sol.collectingMult.div(1e9)

        if (player.sol.bestStage.lt(20) && c.lt(1)) return E(0)

        let x = c.root(3)

        .mul(getSolCompressionEffect(2)).mul(getFormingBonus('restore',0))

        .mul(solarUpgEffect(9,3))
        
        return x
    },
}

const SOL_MATERIALS = {
    sol: {
        name: "Sol",
        collected: true,
        icon: "Curr/SolCurrency1",
        req: E(10),

        get mult() {
            let x = E(1)

            x = x.mul(solarUpgEffect(8,2))

            .mul(getFormingBonus('collect',0))

            return x
        },
    },
    log: {
        unl: ()=>player.sol.bestStage.gte(3),

        name: "Light Logs",
        collected: true,
        icon: "Curr/SolCurrency2",
        req: E(100),

        get mult() {
            let x = E(1)

            x = x.mul(solarUpgEffect(8,3))

            .mul(getFormingBonus('collect',1))

            return x
        },
    },
    stone: {
        unl: ()=>player.sol.bestStage.gte(10),

        name: "Portal Stones",
        collected: true,
        icon: "Curr/SolCurrency3",
        req: E(1e4),

        get mult() {
            let x = E(1)

            x = x.mul(solarUpgEffect(8,4))

            .mul(getFormingBonus('collect',2))

            return x
        },
    },
    fragment: {
        unl: ()=>player.sol.bestStage.gte(20),

        name: "Fragments",
        collected: true,
        icon: "Curr/SolCurrency4",
        req: E(1e10),

        get mult() {
            let x = E(1)

            x = x.mul(solarUpgEffect(8,6))

            .mul(getFormingBonus('collect',3))

            return x
        },
    },
    essence: {
        unl: ()=>player.sol.bestStage.gte(50),

        name: "Grass Essence",
        collected: true,
        icon: "Curr/GrassEssence",
        req: E(1e35),

        get mult() {
            let x = E(1)

            x = x.mul(solarUpgEffect(9,5))

            return x
        },
    },

    soul: {
        name: "Souls",
        display: true,
        icon: "Curr/Soul",

        get amount() { return player.sol.soul },
        set amount(v) { return player.sol.soul = v },

        get gain() { return tmp.sol.soul_rate > 0 ? tmp.sol.soul_gain.mul(tmp.sol.soul_rate) : undefined },
    },
    divine: {
        unl: ()=>player.sn.sunsetTimes>0,
        
        name: "Divine Souls",
        display: true,
        icon: "Curr/DivineSoul",

        get amount() { return player.sol.divineSoul },
        set amount(v) { return player.sol.divineSoul = v },
    },
    mana: {
        unl: ()=>player.sol.bestStage.gte(20),

        name: "Mana<br><span style='font-size: 12px'>(based on collecting speed)</span>",
        display: true,
        icon: "Curr/Mana",

        get amount() { return player.sol.mana },
        set amount(v) { return player.sol.mana = v },

        get gain() { return tmp.sol.manaGain },
    },
    dark: {
        unl: ()=>player.sn.sunsetTimes>0,

        name: "Darkness<br><span style='font-size: 12px'>(convert mana into darkness on sunset)</span>",
        display: true,
        icon: "Curr/Darkness",

        get amount() { return player.sol.darkness },
        set amount(v) { return player.sol.darkness = v }
    },

    sun: {
        icon: "Curr/Sunstone",
        get amount() { return player.sn.sunstone },
        set amount(v) { return player.sn.sunstone = v },
    },
    sf: {
        icon: "Curr/SolarFlare",
        get amount() { return player.sn.solarFlare },
        set amount(v) { return player.sn.solarFlare = v },
    },
}

const FORMING = {
    stats: {
        name: "Stats",
        ctn: [
            {
                title: "Offense",
                icon: "Icons/Sword",

                req: [1,10],
                rankReq: [100,10],
                materials: [
                    ['sol',1,4],
                ],
                rankMult: 5,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sol.bestStage.gte(3),

                title: "Sunrise FM",
                icon: "Icons/Fight",

                req: [10,100],
                rankReq: [100],
                materials: [
                    ['log',10,10],
                ],
                rankMult: 5,
                bonus: b => b.add(1),
            },{
                unl: ()=>player.sol.bestStage.gte(20),

                title: "Soul'ed Offense",
                icon: "Icons/Sword",

                req: [1e9,10],
                rankReq: [100,10],
                materials: [
                    ['soul',1e6,10],
                ],
                rankMult: 5,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },
        ],
    },
    basic: {
        unl: ()=>player.sol.bestStage.gte(3),
        name: "Basic",
        ctn: [
            {
                title: "Solar Shards",
                icon: "Curr/SolarShard",

                req: [10,50,1.05],
                rankReq: [100,10],
                materials: [
                    ['sol',10,3],
                    ['log',1,3],
                ],
                rankMult: 5,
                bonus: b => b.pow(2).div(10).add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sol.bestStage.gte(10),

                title: "Grass Exponent",
                icon: "Curr/Grass",

                req: [1e5,100,1.25],
                rankReq: [100],
                materials: [
                    ['sol',1e3,3,1.1],
                    ['stone',1,3,1.1],
                ],
                rankMult: 2,
                bonus: b => b.div(100).add(1).overflow(5e4,0.25),
                bonusDesc: x => formatPow(x)+x.softcapHTML(5e4),
            },{
                unl: ()=>hasSolarUpgrade(7,3),

                title: "Compression",
                icon: "Curr/SolCurrency1a",

                req: [1e6,5,1.1],
                rankReq: [25],
                materials: [
                    ['sol',1e6,5,1.1],
                ],
                rankMult: 2,
                bonus: (b,l,r) => Decimal.pow(1.03,l).mul(Decimal.pow(5,r)),
            },
        ],
    },
    collect: {
        unl: ()=>player.sol.bestStage.gte(10),
        name: "Collection",
        ctn: [
            {
                title: "Sol Collection",
                icon: "Curr/SolCurrency1",

                req: [1e6,4,1.25],
                rankReq: [10],
                materials: [
                    ['stone',100,3,1.2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sol.bestStage.gte(15),

                title: "Light Logs Collection",
                icon: "Curr/SolCurrency2",

                req: [1e7,4,1.25],
                rankReq: [10],
                materials: [
                    ['stone',1000,3,1.2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sol.bestStage.gte(15),

                title: "Portal Stones Collection",
                icon: "Curr/SolCurrency3",

                req: [1e12,4,1.25],
                rankReq: [10],
                materials: [
                    ['sol',1e12,3,1.2],
                    ['fragment',1,3,1.2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sol.bestStage.gte(50),

                title: "Fragments Collection",
                icon: "Curr/SolCurrency4",

                req: [1e45,4,1.25],
                rankReq: [10],
                materials: [
                    ['mana',1e21,3,1.2],
                    ['essence',100,3,1.2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },
        ],
    },
    restore: {
        unl: ()=>player.sn.tier.gte(6),
        name: "Restoration",
        get mult() { return tmp.sol.restoreMult },
        ctn: [
            {
                title: "Road to Success (Mana)",
                icon: "Curr/Mana",

                req: [1,10],
                rankReq: [100],
                materials: [
                    ['fragment',1e9,4,1.05],
                    ['mana',1e6,4,1.05],
                ],
                rankMult: 5,
                bonus: b => b.div(10).add(1),
            },{
                title: "Trees of Recollection (Collecting)",
                icon: "Icons/Collect",

                req: [10,10],
                rankReq: [100],
                materials: [
                    ['sol',1e30,5,1.05],
                    ['log',1e30,5,1.05],
                    ['sf',1e30,5,1.05],
                    ['mana',1e9,5,1.05],
                ],
                rankMult: 10,
                bonus: b => b.add(1),
            },{
                title: "Blocks of Creation (Forming)",
                icon: "Icons/Form",

                req: [10,10],
                rankReq: [100],
                materials: [
                    ['sun',1e15,5,1.05],
                    ['sf',1e30,5,1.05],
                    ['mana',1e9,5,1.05],
                ],
                rankMult: 10,
                bonus: b => b.add(1),
            },{
                title: "The Best Defense (Offense)",
                icon: "Icons/Sword",

                req: [100,10],
                rankReq: [100],
                materials: [
                    ['soul',1e15,5,1.05],
                    ['mana',1e12,5,1.05],
                ],
                rankMult: 10,
                bonus: b => b.add(1),
            },
        ],
    },
    dark: {
        unl: ()=>player.sn.sunsetTimes>0,
        name: "Darkness",
        get mult() { return tmp.sol.restoreMult },
        ctn: [
            {
                title: "Glimmer of Hope* (Divine Souls)",
                icon: "Curr/DivineSoul",

                req: [10,10],
                rankReq: [100],
                materials: [
                    ['dark',1e6,10,1.1],
                    ['mana',1e9,10,1.1],
                    ['sf',1e27,10,1.1],
                ],
                rankMult: 5,
                bonus: b => b.div(10).add(1),
            },{
                unl: ()=>player.sol.bestStage.gte(50),

                title: "A Bright Star (Star Growth)",
                icon: "Curr/StarGrow",

                req: [100,5],
                rankReq: [10],
                materials: [
                    ['dark',1e12,5,1.1],
                    ['essence',100,5,1.1],
                    ['sf',1e30,5,1.1],
                ],
                rankMult: 10,
                bonus: b => b.add(1),
            },{
                title: "Omega Star (Scaled Eclipse)",
                icon: "Icons/SR",

                req: [1000,10],
                rankReq: [100],
                materials: [
                    ['dark',1e18,100,1.2],
                    ['mana',1e21,100,1.2],
                ],
                rankMult: 2,
                bonus: b => b,
                bonusDesc: x => "+"+format(x,0)+" later",
            },
        ],
    },
}

const COLLECTED_MATERIALS = Object.entries(SOL_MATERIALS).filter(x => x[1].collected).map(x => x[0])

COLLECTED_MATERIALS.forEach(x=>Object.defineProperty(SOL_MATERIALS[x],'amount',{
    get() { return player.sol.materials[x][0] },
    set(v) { return player.sol.materials[x][0] = v },
}))

var enemy_health = EINF
var attack_time = E(0)
var form_tab = 'stats'

function calcSolarians(dt) {
    if (!hasSolarUpgrade(7,0)) return;

    const ts = tmp.sol

    enemy_health = enemy_health.min(ts.enemy_max_health)
    
    let at = attack_time.add(ts.attack_speed*dt)
    attack_time = at
    if (at.gte(1)) {
        let w = at.floor()
        enemy_health = enemy_health.sub(ts.offense.mul(w)).max(0)
        if (enemy_health.lte(0)) {
            player.sol.stage = player.sol.stage.add(1)
            player.sol.soul = player.sol.soul.add(ts.soul_gain).round()
            setupSolarianStage()
        }
        attack_time = at.sub(w)
    }

    player.sol.bestStage = player.sol.bestStage.max(player.sol.stage)

    player.sol.mana = player.sol.mana.add(tmp.sol.manaGain.mul(dt))

    player.sol.soul = player.sol.soul.add(ts.soul_gain.mul(tmp.sol.soul_rate*dt))

    for (let id of COLLECTED_MATERIALS) {
        const s = SOL_MATERIALS[id]
        let unl = !s.unl || s.unl()
        if (!unl) continue;
        let m = player.sol.materials[id]
        let dm = m[1].add(ts.collectingMult.mul(dt))
        if (dm.gte(s.req)) {
            let w = dm.div(s.req).floor()
            dm = dm.sub(s.req.mul(w))
            m[0] = m[0].add(w.mul(ts.cm[id]))
        }
        m[1] = dm
    }

    for (let [fi,f] of Object.entries(FORMING)) {
        const ft = ts.form[fi]
        if (ft.unl) {
            const pf = player.sol.form[fi]
            const mult = f.mult ?? ts.formingMult
            for (let [i,fc] of Object.entries(f.ctn)) if (ft.unls[i]) {
                const p = pf[i]
                const [value,l,r,active] = p
                if (!active) continue
                p[0] = p[0].add(mult.mul(dt))
                const [l0,la] = [fc.rankReq[0],fc.rankReq[1]??0], lc = SOL_FORMULAS.getCurrentLevel(l,r,l0,la)
                if (ft.afford[i]) {
                    let bulk = Math.max(Math.min(
                        ...fc.materials.map(x=>SOL_FORMULAS.getLevelBulk(l,r,l0,SOL_MATERIALS[x[0]].amount,x[1],x[2],x[3],la)),
                        SOL_FORMULAS.getLevelBulk(l,r,l0,value,fc.req[0],fc.req[1],fc.req[2],la)
                    ),0)
                    if (bulk>0) {
                        ft.afford[i]=false
                        p[0] = p[0].sub(SOL_FORMULAS.getBulkedCost(bulk,l,r,l0,fc.req[0],fc.req[1],fc.req[2],la)).max(0)
                        fc.materials.forEach(x=>{
                            let m = SOL_MATERIALS[x[0]]
                            m.amount = m.amount.sub(SOL_FORMULAS.getBulkedCost(bulk,l,r,l0,x[1],x[2],x[3],la)).max(0)
                        })
                        p[1] += bulk
                    }
                }
                if (lc >= l0 + r * la) p[2]++
            }
        }
    }

    if (hasSolarUpgrade(7,3)) {
        let u = player.sol.compression_unl, s10 = hasSolarUpgrade(7,10)

        for (let i in SOL_COMPRESSION.ctn) {
            player.sol.compression[i] = player.sol.compression[i].add(SOL_COMPRESSION.gain(parseInt(i)).mul(dt))
            if (s10) player.sol.active_compression[i] = player.sol.active_compression[i].add(player.sol.compression[i].mul(dt/100))
        }

        if (u<SOL_COMPRESSION.ctn.length && player.sol.compression[u-1].gte(SOL_COMPRESSION.ctn[u].req)) player.sol.compression_unl++
    }
}

function setupSolarianStage() {
    updateSolarianTemp()
    enemy_health = tmp.sol.enemy_max_health
}

function getSolarianSave() {
    let s = {
        stage: E(0),
        bestStage: E(0),
        soul: E(0),
        materials: {},
        form: {},
        fight_mult: E(1),
        compression: [],
        active_compression: [],
        compression_unl: 1,

        mana: E(0),
        divineSoul: E(0),
        darkness: E(0),
    }
    for (let id of COLLECTED_MATERIALS) s.materials[id] = [E(0), E(0)]
    for (let [fi,f] of Object.entries(FORMING)) {
        s.form[fi] = []
        for (let i in f.ctn) s.form[fi][i] = [E(0),0,0]
    }
    for (let i in SOL_COMPRESSION.ctn) {
        s.compression[i] = E(0)
        s.active_compression[i] = E(0)
    }
    return s
}

function updateSolarianTemp() {
    const ts = tmp.sol

    ts.compression_mult = SOL_COMPRESSION.mult

    for (let i in SOL_COMPRESSION.ctn) {
        ts.comp_eff[i] = SOL_COMPRESSION.ctn[i].eff(player.sol.active_compression[i])
    }

    ts.enemy_max_health = SOLARIANS.enemy.max_health
    ts.soul_gain = SOLARIANS.enemy.soul_gain
    ts.offense = SOLARIANS.offense
    ts.collectingMult = SOLARIANS.collectingMult
    ts.formingMult = SOLARIANS.formingMult
    ts.restoreMult = SOLARIANS.restoreMult

    ts.soul_rate = hasSolarUpgrade(7,9) ? 0.01 : 0

    ts.manaGain = SOLARIANS.manaGain

    ts.attack_speed = ts.offense.gte(ts.enemy_max_health) ? ts.offense.div(ts.enemy_max_health).log10().add(1).mul(2).toNumber() : 1

    ts.stageBonus = SOLARIANS.stageBonus
    ts.sunriseFM = SOLARIANS.sunriseFM
}

function getStageBonus(id,def=1) { return tmp.sol.stageBonus?.[id]??def }

function updateCFTemp() {
    const ts = tmp.sol

    for (let id of COLLECTED_MATERIALS) {
        const s = SOL_MATERIALS[id]
        ts.cm[id] = s.mult
    }

    for (let [fi,f] of Object.entries(FORMING)) {
        let unl = !f.unl || f.unl()
        const ft = ts.form[fi]
        ft.unl=unl
        if (unl) {
            const pf = player.sol.form[fi]
            for (let [i,fc] of Object.entries(f.ctn)) {
                unl = !fc.unl || fc.unl
                ft.unls[i] = unl
                if (unl) {
                    const [value,l,r,active] = pf[i]
                    ft.bonus[i] = fc.bonus(SOL_FORMULAS.bonus(l,r,fc.rankMult,fc.rankReq[0],fc.rankReq[1]),l,r)
                    let req = ft.req[i] = SOL_FORMULAS.getCost(l,r,fc.req[0],fc.req[1],fc.req[2])
                    let afford = value.gte(req)
                    if (afford) for (let mi in fc.materials) {
                        const m = fc.materials[mi]
                        if (SOL_MATERIALS[m[0]].amount.lt(SOL_FORMULAS.getCost(l,r,m[1],m[2],m[3]))) {
                            afford = false
                            break
                        }
                    }
                    ft.afford[i] = afford
                } else {
                    ft.bonus[i] = E(1)
                    ft.afford[i] = false
                }
            }
        } else {
            ft.bonus = []
            ft.afford = []
        }
    }
}

tmp_update.push(()=>{
    updateSolarianTemp()
    updateCFTemp()
})

const SOL_FORMULAS = {
    solvePQE: (a,b,c) => {let d = b**2-4*a*c; return d < 0 ? 0 : (-b+Math.sqrt(d))/(2*a)}, // ax^2+bx+c=0
    getSumLevelFromRank: (r,l0,la=0) => r*(l0+la*(r-1)/2),
    getCurrentLevel(l,r,l0,la=0) { return Math.min(Math.max(0,l-this.getSumLevelFromRank(r,l0,la)),l0+r*la) },
    bonus(l,r,b,l0,la=0) {
        let lc = this.getCurrentLevel(l,r,l0,la), br = Decimal.pow(b,r)
        let s = Decimal.mul(lc,br).add(Decimal.mul(l0,br.sub(1).div(b-1)))
        if (la>0) s = Decimal.mul(la,br.mul(b*(r-1)).sub(br.mul(r)).add(b).div((b-1)**2)).add(s)
        return s
    },
    getCost(l,r,ms,br,bl=1) {
        return Decimal.pow(bl,l).mul(Decimal.pow(br,r)).mul(ms)
    },
    getBulkedCost(lb,l,r,l0,ms,br,bl=1,la=0) {
        return this.getCost(this.getSumLevelFromRank(r,l0,la),r,ms,br,bl).mul(bl>1?Decimal.pow(bl,lb).sub(1).mul(Decimal.pow(bl,this.getCurrentLevel(l,r,l0,la))).div(bl-1):lb)
    },
    getLevelBulk(l,r,l0,f,ms,br,bl=1,la=0) {
        let lc = this.getCurrentLevel(l,r,l0,la), lb = 0, lr = l0+la*r;
        let mf = this.getCost(this.getSumLevelFromRank(r,l0,la),r,ms,br,bl)
        if (bl<=1) {
            lb = f.div(mf).floor().max(0).min(lr-lc).toNumber()
            if (lb<=0) return 0;
        } else {
            lb = f.mul(bl-1).div(mf).add(Decimal.pow(bl,lc)).log(bl).floor().max(0).min(lr).toNumber()
            if (lb<=lc) return 0;
            lb -= lc
        }
        return lb
    },
}

function getFormingBonus(id,i,def=1) { return tmp.sol.form[id].bonus[i]??def }

el.update.solarians = () => {
    const ts = tmp.sol
    if (mapID3 == 'stage') {
        tmp.el.solarian_stage.setHTML(`
        <h2>Stage ${player.sol.stage.format(0)}</h2>
        `)

        const h = enemy_health, mh = ts.enemy_max_health
        tmp.el.enemy_bar.setProperty('--percent',h.div(mh).max(0).min(1).mul(100)+'%')
        tmp.el.enemy_bar.setHTML(`<div>${h.format(0)} / ${mh.format(0)}</div>`)

        tmp.el.attack_bar.setProperty('--percent',attack_time.max(0).min(1).mul(100)+'%')
        
        tmp.el.enemy_soul.setTxt(ts.soul_gain.format(0))
        tmp.el.sol_offense.setTxt(ts.offense.format(0))

        let bonus = ts.stageBonus

        let t = `
        Sunrise FM: <b class='green'>${formatMult(bonus.fm,0)}</b>
        <br>Solar Rays: <b class='green'>${formatMult(bonus.sr,0)}</b>
        <br>Sunstone: <b class='green'>${formatMult(bonus.sunstone,0)}</b>
        `

        if (bonus.ss) t += `<br>Solar Shards: <b class='green'>${formatMult(bonus.ss,0)}</b>`
        if (bonus.form) t += `<br>Forming Speed: <b class='green'>${formatMult(bonus.form,0)}</b>`
        if (bonus.sf) t += `<br>Solar Flares: <b class='green'>${formatMult(bonus.sf,0)}</b>`

        tmp.el.stage_bonus.setHTML(t)
    } else if (mapID3 == 'sol') {
        for (let [id,s] of Object.entries(SOL_MATERIALS)) {
            let el_id = `material_${id}`

            if (s.collected) {
                let unl = !s.unl || s.unl()
                tmp.el[el_id+'_div'].setDisplay(unl)

                if (!unl) continue;

                let m = player.sol.materials[id];

                tmp.el[el_id+'_amt'].setHTML(`
                <b>${m[0].format(0)}</b><br>
                <span>${formatMult(ts.cm[id],0)}</span>
                `)
                let collect = tmp.el[el_id+'_collect']
                collect.setProperty('--percent',ts.collectingMult.gte(s.req)?"100%":m[1].div(s.req).max(0).min(1).mul(100)+'%')
                collect.setHTML(`<div>${ts.collectingMult.gte(s.req) ? "+"+ts.collectingMult.div(s.req).mul(ts.cm[id]).format()+"/s" : formatTime(s.req.sub(m[1]).div(ts.collectingMult).max(0))}</div>`)
            } else if (s.display) {
                let unl = !s.unl || s.unl()
                tmp.el[el_id+'_div'].setDisplay(unl)

                if (!unl) continue;

                let amt = s.amount, gain = s.gain

                tmp.el[el_id+'_amt'].setHTML(`<b>${amt.format(0)}</b>`+(gain?`<br><span>${formatGain(amt,gain)}</span>`:""))
            }
        }

        for (let [fi,f] of Object.entries(FORMING)) {
            let unl = !f.unl || f.unl()
            tmp.el[`fb_${fi}`].setDisplay(unl)
            unl &&= form_tab == fi
            tmp.el[`f_${fi}_div`].setDisplay(unl)

            const pf = player.sol.form[fi]
            const ft = ts.form[fi]
            const mult = f.mult ?? ts.formingMult

            if (unl) for (let [i,fc] of Object.entries(f.ctn)) {
                let id = `f_${fi}_${i}`
                unl = !fc.unl || fc.unl()
                tmp.el[id+'_div'].setDisplay(unl)
                if (!unl) continue;

                const [value,l,r,active] = pf[i]

                tmp.el[id+'_bonus'].setHTML(`
                <div>Level <b class='level-color'>${format(l,0)}</b> : <b class='green'>${(fc.bonusDesc ?? formatMult)(ft.bonus[i])}</b><div>
                <div>Rank <b class='rank-color'>${format(r,0)}</b> : <b class='green'>${formatMult(Decimal.pow(fc.rankMult,r))}</b></div>
                `)

                for (let mi in fc.materials) {
                    const m = fc.materials[mi], cost = SOL_FORMULAS.getCost(l,r,m[1],m[2],m[3])
                    tmp.el[id+'_m_'+mi].setHTML(`<b class="${SOL_MATERIALS[m[0]].amount.gte(cost) ? "green" : "red"}">${format(cost,0)}</b>`)
                }

                const [l_el, r_el] = [tmp.el[id+'_level'],tmp.el[id+'_rank']]

                const bl = fc.req[2]??1
                const req = ft.req[i]

                l_el.setProperty('--percent',value.div(req).max(0).min(1).mul(100)+'%')
                l_el.setHTML(active&&(value.lt(req)||ft.afford[i])?`<div>${mult.gte(req)&&bl==1?"+"+mult.div(req).format()+"/s":formatTime(req.sub(value).div(mult).max(0))}</div>`:`<div>${format(value,0)} / ${format(req,0)}</div>`)

                const [l0,la] = [fc.rankReq[0],fc.rankReq[1]??0], lc = SOL_FORMULAS.getCurrentLevel(l,r,l0,la)

                r_el.setProperty('--percent',Math.max(0,Math.min(1,lc/(l0+r*la)))*100+'%')
                r_el.setHTML(`<div>${format(lc,0)} / ${format(l0+r*la,0)}</div>`)

                tmp.el[id+"_btn"].setTxt(active?"Stop":"Start")
            }
        }
    } else if (mapID3 == 'solc') {
        updateSolCompressionHTML()
    }
}

el.setup.solarians = () => {
    let h = ""

    for (let [id,s] of Object.entries(SOL_MATERIALS)) {
        h += s.collected ? `
        <div class="material-div" id="material_${id}_div">
            <img src="images/${s.icon}.png">
            <div class="material-name">${s.name}</div>
            <div class="material-amount" id="material_${id}_amt"><b>0</b><br><span>x1</span></div>
            <div class="progress-bar" id="material_${id}_collect"><div>???</div></div>
        </div>
        ` : s.display ? `
        <div class="material-div display" id="material_${id}_div">
            <img src="images/${s.icon}.png">
            <div class="material-name">${s.name}</div>
            <div class="material-amount" id="material_${id}_amt"><b>0</b><br><span>(+1/s)</span></div>
        </div>
        ` : ""
    }

    new Element('materials_table').setHTML(h)

    h = ["",""]

    for (let [fi,f] of Object.entries(FORMING)) {
        h[1] += `<button id="fb_${fi}" onclick="form_tab = '${fi}'">${f.name}</button>`
        h[0] += `<div id="f_${fi}_div">`
        for (let [i,fc] of Object.entries(f.ctn)) {
            let id = `f_${fi}_${i}`
            let mh = ''
            for (let [mi,m] of Object.entries(fc.materials)) mh += `<div>
                <img src="images/${SOL_MATERIALS[m[0]].icon}.png">
                <div id="${id}_m_${mi}">???</div>
            </div>`
            h[0] += `
            <div class="forming-div" id="${id}_div">
                <div class="forming-title">${fc.title}</div>
                <img src="images/${fc.icon}.png">
                <div id="${id}_bonus" class="forming-boost">
                    <div>Level 0 : ???</div>
                    <div>Rank 0 : ???</div>
                </div>
                <button id="${id}_btn" onclick="player.sol.form.${fi}[${i}][3]=!player.sol.form.${fi}[${i}][3]">Start</button>
                <div class="progress-bar f-level" id="${id}_level"><div>???</div></div>
                <div class="progress-bar f-rank" id="${id}_rank"><div>???</div></div>
                <div class="forming-res">${mh}</div>
            </div>
            `
        }
        h[0] += `</div>`
    }

    new Element('forming_table').setHTML(h[0])
    new Element('forming_tab_table').setHTML(h[1])
}

function resetMaterials(keep=[]) {
    COLLECTED_MATERIALS.forEach(x=>{if (!keep.includes(x)) player.sol.materials[x] = [E(0),E(0)]})
}

function resetForming(id,list=[],reset=false,decrease) {
    let ff = player.sol.form[id]
    for (let x = 0; x < FORMING[id].ctn.length; x++) if ((reset ? list.includes(x) : !list.includes(x)) && (decrease === undefined || decrease > 0)) {
        if (decrease === undefined) ff[x] = [E(0),0,0,ff[x][3]]
        else {
            const r = Math.max(ff[x][2] - decrease,0), s = FORMING[id].ctn[x].rankReq
            ff[x] = [E(0),SOL_FORMULAS.getSumLevelFromRank(r,...s),r,ff[x][3]]
        }
    }
}