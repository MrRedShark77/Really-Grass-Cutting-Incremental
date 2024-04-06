RESET.astralPrestige = {
    unl: ()=> player.lowGH<=-48,

    req: ()=>true,
    reqDesc: ()=>``,

    resetDesc: `
    To do an astral prestige, you must reach Astral 100.<br><br>
    Doing an astral prestige will reset your astral back to 0 but will significantly increase the power of the astral bonuses.<br>
    Each astral prestige done will increase the base SP requirement as well as the requirement scaling.<br><br>
    <span id='nextAPBonus' class='green'></span>
    `,
    resetGain: ()=> `Astral: ${format(player.astral,0)} / 100`,

    title: `Astral Prestige`,
    resetBtn: `Do Astral Prestige`,

    reset(force=false) {
        if (player.astral>=100||force) {
            if (!force) {
                player.astralPrestige = player.astralPrestige.add(1)
            }

            player.astral = E(0)
            player.sp = E(0)

            updateTemp()
        } else if (player.astralPrestige>0) {
            player.astralPrestige = player.astralPrestige.sub(1)

            player.astral = E(0)
            player.sp = E(0)

            updateTemp()
        }
    },
}

const AP_BONUS = ['Dark Matter','Ring','Lunar Power','Arc','Line','Stardust','Solar Flare']
const AP_BONUS_BASE = [100,25,5,3,5,3,3]

const LUNAR_OB = [
    // 0 - multiplier, 1 - exponent

    ['Grass Value','Curr/Grass',10,1.1,0.001,1],
    ['XP','Icons/XP',10,1.1,0.001,1],
    [`TP`,'Icons/TP',10,1.1,0.001,1],
    [`Cosmic`,'Icons/XP2',20,5,2,0],
    [`Charge`,'Curr/Charge',100,1.1,0.001,1],
    [`Rocket Fuel`,'Curr/RocketFuel',1000,100,0.01,0],
    [`Planetarium`,'Curr/Planetoid',20,5,2,0],
]
const LUNAR_OB_MODE = ['x','^']

tmp_update.push(()=>{
    let x = Decimal.pow(1.5,player.moonstone.add(1).log10().overflow(1e3,0.4)).div(100).mul(starTreeEff('ring',32)).mul(starTreeEff('ring',36)).mul(getAPEff(2))

    .mul(cs_effect.moon||1)

    x = x.mul(tmp.darkChargeEffs.lunar||1)

    x = x.mul(solarUpgEffect(4,2)).mul(solarUpgEffect(1,19)).mul(getFormingBonus('dark',3))

    x = x.pow(getStageBonus('lp'))

    tmp.LPgain = x

    tmp.lunar_length = 7
    tmp.lunar_max_active = Math.min(1+getPTEffect(4,0),tmp.lunar_length)

    let su = hasSolarUpgrade(2,17)

    for (let i = 0; i < LUNAR_OB.length; i++) {
        let l = LUNAR_OB[i]
        let lvl = E(player.lunar.level[i])

        tmp.lunar_next[i] = l[5]==0?Decimal.mul(l[3],lvl).add(l[2]):Decimal.pow(l[3],lvl).mul(l[2])
        tmp.lunar_eff[i] = (!su && l[5]==1 ? lvl.softcap(200,0.5,0) : lvl).mul(l[4]).add(1)
    }
})

function getLPLevel(i, lp = player.lunar.lp[i]) {
    let l = LUNAR_OB[i], b = l[3], s = l[2], x = 0

    if (l[5]==0) {
        let d = lp.mul(8*b).add((2*s-b)**2)

        x = d.sqrt().sub(2*s-b).div(2*b)
    } else if (l[5]==1) {
        x = lp.mul((b-1)/s).add(1).log(b)
    }

    return x.floor()
}

function getLEffect(i) { return tmp.lunar_eff[i]||1 }

function chooseLA(i) {
    if (player.lunar.active.includes(i)) player.lunar.active.splice(player.lunar.active.indexOf(i),1)
    else {
        if (player.lunar.active.length >= tmp.lunar_max_active) player.lunar.active.splice(randint(0,player.lunar.active.length-1),1)
        player.lunar.active.push(i)
    }
}

el.setup.obelisk = () => {
    let el = new Element('lop_table')
    let h = ``

    for (let i in LUNAR_OB) {
        let l = LUNAR_OB[i]

        h += `
        <div id='lop${i}_div'>
            <div class="lop_btn" id='lop${i}_btn' onclick='chooseLA(${i})'>
                <img src="images/${l[1]}.png">
                <div id='lop${i}_lvl'>
                    The J
                </div>
            </div><div class="lop_progress" id="lop${i}_amt">
                0 / 0
            </div>
        </div>
        `
    }

    el.setHTML(h)

    el = new Element('void_table')
    h = ``

    for (let i in VOID_OBELISK) {
        let l = VOID_OBELISK[i]

        h += `
        <div id='void${i}_div'>
            <div class="lop_btn" id='void${i}_btn' onclick='activeVoid(${i})'>
                <img src="images/${l.icon}.png">
                <div><h3>${l.name}</h3></div>
            </div><div class="lop_progress" id="void${i}_amt">
                0 / 0
            </div>
        </div>
        `
    }

    el.setHTML(h)
}

el.update.obelisk = () => {
    if (mapID2 == 'ap') {
        tmp.el.nextAPBonus.setHTML(`You'll unlock the ${AP_BONUS[player.astralPrestige]||'???'} astral bonus on next astral prestige.`)
        tmp.el.reset_btn_astralPrestige.setHTML(player.astral>=100?'Do Astral Prestige':'Undo Astral Prestige')

        let unl = player.grassjump>=5

        tmp.el.lunar_obelisk_div.setDisplay(unl)

        if (unl) {
            tmp.el.lp_gain.setHTML(tmp.LPgain.format()+"/s")
            tmp.el.lp_active.setHTML(player.lunar.active.length+" / "+tmp.lunar_max_active)

            for (let i = 0; i < LUNAR_OB.length; i++) {
                let id = 'lop'+i+'_', l = LUNAR_OB[i], lvl = player.lunar.level[i]

                tmp.el[id+'div'].setDisplay(i < tmp.lunar_length)

                if (i >= tmp.lunar_length) continue;

                tmp.el[id+'lvl'].setHTML(`
                <div class='cyan'>${l[0]}</div>
                <div class='yellow'>Level ${format(lvl,0)}</div>
                <div class='green'>${LUNAR_OB_MODE[l[5]]+format(tmp.lunar_eff[i],3)} <i style='font-size: 12px; color: grey'>(+${format(l[4],3)})</i></div>
                `)

                let nl = tmp.lunar_next[i]
                let p = l[5]==0?Decimal.pow(lvl,2).sub(lvl).mul(l[3]/2).add(Decimal.mul(lvl,l[2])):Decimal.pow(l[3],lvl).sub(1).mul(l[2]/(l[3]-1))

                tmp.el[id+'amt'].setHTML(`${player.lunar.lp[i].sub(p).max(0).min(nl).format(0)} / ${nl.format(0)}`)
                tmp.el[id+'btn'].changeStyle('border-color',player.lunar.active.includes(i)?'lime':'white')
            }
        }

        unl = player.sn.tier.gte(5)

        tmp.el.void_obelisk_div.setDisplay(unl)

        if (unl) {
            for (let i = 0; i < VOID_OBELISK.length; i++) {
                let id = 'void'+i+'_', l = VOID_OBELISK[i]

                let cent = player.centralized.includes(i)

                tmp.el[id+'div'].setDisplay(!cent)

                if (cent) continue;

                tmp.el[id+'amt'].setHTML(`${l.amount.format(0)} / ${l.limit.format(0)}`)
                tmp.el[id+'btn'].changeStyle('border-color',l.amount.gte(l.limit)?'magenta':'darkmagenta')
            }
        }
    }
}

// Solar Obelisk

RESET.sunrise = {
    unl: ()=>player.sn.tier.gte(4),

    req: ()=>tmp.solarianUnl?player.sol.stage.gte(3):player.sn.eclipse.gte(100),
    reqDesc: ()=>tmp.solarianUnl?`Reach Stage 3`:`Reach Eclipse 100`,

    resetDesc: `
    <span id="sunrise_desc">Reset eclipse, remnants, and remnant upgrades for sunstone.</span>
    `,
    resetGain: ()=> `
    Gain <b class="yellow">${tmp.sunstoneGain.format(0)}</b> Sunstone and <b class="yellow">${tmp.solarShardGain.format(0)}</b> Solar Shards<br>
    <b class="green">${formatMult(tmp.sunriseEffect.ss)}</b> to Solar Shard<br>
    <b class="green">${formatMult(tmp.sunriseEffect.sfc)}</b> to Solar Flare Cap <b class="magenta">(${player.sn.bestEclipse.format(0)})</b><br>
    `+(tmp.solarianUnl?`
    Fight Multiplier: <b class="green">${formatMult(player.sol.fight_mult,0)+(tmp.sol.sunriseFM.gt(player.sol.fight_mult)&&player.sn.tier.lt(12)?" ➜ "+formatMult(tmp.sol.sunriseFM):"")}</b>
    `:""),

    title: `Sunrise`,
    resetBtn: `Rise the Sun!!!`,

    reset(force=false,lyr=0) {
        if (player.sn.eclipse.gte(100)||force) {
            if (!force) {
                player.sn.sunriseTimes++

                let g = tmp.solarShardGain

                player.sn.solarShard = player.sn.solarShard.add(g)
                player.sn.bestSSEarn = player.sn.bestSSEarn.max(g)
                player.sn.bestSS = player.sn.bestSS.max(player.sn.solarShard)

                player.sn.sunstone = player.sn.sunstone.add(tmp.sunstoneGain)

                player.sn.bestEclipse = player.sn.bestEclipse.max(player.sn.eclipse)

                if (tmp.solarianUnl) player.sol.fight_mult = player.sol.fight_mult.max(tmp.sol.sunriseFM)
            }

            if (tmp.solarianUnl) {
                assignCompression()

                player.sol.stage = E(0)
                resetMaterials()

                const d = lyr == 0 && hasSolarUpgrade(9,6) ? solarUpgEffect(9,6,undefined)
                : lyr == 1 && hasSolarUpgrade(11,3) ? solarUpgEffect(11,3,undefined)
                : undefined

                resetForming('stats',[],false,d)
                resetForming('collect',[],false,d)

                setupSolarianStage()

                updateCFTemp()
            }

            if (player.sn.tier.lt(8)) {
                player.sn.eclipse = E(0)
                player.sn.sr = E(0)
                player.sn.remnant = E(0)
                player.sn.totalRemnant = E(0)
            }

            let keep = []

            if (hasSolarUpgrade(2,14)) keep.push(0,1,2,3,4,5)
            if (hasSolarUpgrade(2,16)) keep.push(6,7,8)

            resetSolarUpgrades(5,keep)
        }
    },
}

RESET.sunset = {
    unl: ()=>player.sn.tier.gte(6),

    req: ()=>player.sol.stage.gte(40),
    reqDesc: ()=>`Reach Stage 40`,

    resetDesc: `
    Reset everything does sunrise as well as Souls, Soul Upgrades, Sol Compaction, FM, and Darkness Upgrades (marked with *). Convert Mana into Darkness at full rate. Gain more divine souls based on soul, starting at 1 Qt.
    <br><br>
    First Sunset unlocks Darkness in Forming tab and Divine Soul Upgrades Chart.
    `,
    resetGain: ()=> `
    Gain <b class="cyan">${tmp.divineSoulGain.format(0)}</b> Divine Souls and <b class="darkblue">${player.sol.mana.format(0)}</b> Darkness.
    `,

    title: `Sunset`,
    resetBtn: `Set the Sun down!!!`,

    reset(force=false,lyr=1) {
        if (player.sol.stage.gte(40)||force) {
            if (!force) {
                player.sn.sunsetTimes++

                player.sol.divineSoul = player.sol.divineSoul.add(tmp.divineSoulGain)
                player.sol.darkness = player.sol.darkness.add(player.sol.mana)
            }

            player.sol.compression = player.sol.compression.map(x=>E(0))
            player.sol.active_compression = player.sol.active_compression.map(x=>E(0))
            player.sol.compression_unl = 1

            player.sol.mana = E(0)

            const d = lyr == 1 && hasSolarUpgrade(11,3) ? solarUpgEffect(11,3,undefined) : undefined

            resetForming('basic',[2],true,d)
            resetForming('dark',[0],true,d)
            if (player.sn.tier.lt(10)) resetSolarUpgrades(8,[0,1,5],true)

            player.sol.fight_mult = E(1)
            player.sol.soul = E(0)

            RESET.sunrise.reset(true,lyr)
        }
    },
}

RESET.twilight = {
    unl: ()=>player.sn.tier.gte(10),

    req: ()=>player.sol.stage.gte(130),
    reqDesc: ()=>`Reach Stage 130`,

    resetDesc: `
    <span style="font-size: 16px">
    Reset everything does sunset as well as Restoration, Divine Souls, Divine Soul Upgrades, Darkness, Star Growth, and Darkness Upgrades (marked with **). Gain more unstable souls based on current stage, starting at 130.
    <br><br>
    <span id="twilight_bonus">???</span>
    </span>
    `,
    resetGain: ()=> `
    Gain <b class="lightgray">${tmp.unstableSoulGain.format(0)}</b> Unstable Souls.
    `,

    title: `Twilight`,
    resetBtn: `Twilight!!!`,

    reset(force=false) {
        if (player.sol.stage.gte(40)||force) {
            if (!force) {
                player.sn.twilightTimes++

                player.sol.unstableSoul = player.sol.unstableSoul.add(tmp.unstableSoulGain)
                player.sol.twilightBonus = player.sol.twilightBonus.add(tmp.twilightBonusIncrease)
            }

            resetForming('restore')
            if (player.sn.tier.lt(12)) resetSolarUpgrades(9,[0,1,2,3,4,7],true)

            player.sol.divineSoul = E(0)
            player.sol.darkness = E(0)

            player.stargrowth = E(0)
            resetForming('dark',[1],true)

            RESET.sunset.reset(true,2)
        }
    },
}

const SOLAR_OBELISK = {
    get sunstoneGain() {
        let e = player.sn.eclipse
        let x = Decimal.pow(1.025,e.min(300).sub(100)).mul(10)

        .mul(getStageBonus('sunstone'))

        if (hasSolarUpgrade(7,17) && e.gte(300)) x = x.mul(Decimal.pow(1.01,e.sub(300)))

        return x.floor()
    },
    get sunriseEffect() {
        let be = player.sn.bestEclipse, eff = {}

        eff.ss = Decimal.pow(1.01,be)
        eff.sfc = Decimal.pow(1.05,be)

        return eff
    },
    get divineSoulGain() {
        let x = player.sol.soul.div(1e18).max(1).root(12).mul(10)

        .mul(getFormingBonus('dark',0))

        .mul(getSolCompressionEffect(3))

        .mul(solarUpgEffect(5,6)).mul(solarUpgEffect(10,6)).mul(getStarBonus(10)).mul(tmp.twilightBonus?.[2]??1)
        .mul(solarUpgEffect(11,0))

        return x.softcap(1e9,0.5,0)
    },
    get unstableSoulGain() {
        let s = player.sol.stage.sub(130)
        if (s.lt(0)) return E(0)
        let x = Decimal.pow(1.1,s).mul(s.add(1)).mul(10)
        return x.floor()
    },
    twilight: {
        get nextBonus() {
            return player.sol.twilightBonus.add(tmp.twilightBonusIncrease).scale(5,2,0).mul(player.sn.tier.gte(13)?10:15).add(130).ceil()
        },
        get bonusIncrease() {
            let s = player.sol.stage.sub(130)
            if (s.lt(0)) return E(0)
            let x = s.div(player.sn.tier.gte(13)?10:15).scale(5,2,0,true).sub(player.sol.twilightBonus).add(1).max(0)
            if (isNaN(x.mag)) return E(0)
            return x.floor()
        },
        get bonusEffect() {
            let b = player.sol.twilightBonus, x = []
            x[0] = Decimal.pow(10,b.pow(2))
            x[1] = Decimal.pow(10,b.pow(1.5))
            x[2] = Decimal.pow(5,b)
            if (hasSolarUpgrade(7,27)) {
                x[3] = b.div(10).add(1).root(2)
                x[4] = b.div(10).add(1).root(3)
            }
            return x
        },
    },
}

// Void Obelisk

const VOID_OBELISK = [
    { // 0
        name: "Prestige Points",
        get amount() { return player.pp },
        limit: E('e8.4e8'),
        icon: "Curr/Prestige",
    },{ // 1
        name: "Crystal",
        get amount() { return player.crystal },
        limit: E('e2.9e9'),
        icon: "Curr/Crystal",
    },{ // 2
        name: "Steel",
        get amount() { return player.steel },
        limit: E('e1.5e10'),
        icon: "Curr/Steel2",
    },{ // 3
        name: "Anti-Grass",
        get amount() { return player.grass },
        limit: E('e1e11'),
        icon: "Curr/AntiGrass",
    },{ // 4
        name: "Anonymity Points",
        get amount() { return player.ap },
        limit: E('e3e13'),
        icon: "Curr/Anonymity",
    },{ // 5
        name: "Oil",
        get amount() { return player.oil },
        limit: E('e6e13'),
        icon: "Curr/Oil",
    },{ // 6
        name: "Charge",
        get amount() { return player.chargeRate },
        limit: E('e5e13'),
        icon: "Curr/Charge",
    },{ // 7
        name: "Rocket Fuel",
        get amount() { return player.rocket.amount },
        limit: E('e2700'),
        icon: "Curr/RocketFuel",
    },{ // 8
        name: "Platinum",
        get amount() { return player.plat },
        limit: E('e5e10'),
        icon: "Curr/Platinum",
    },{ // 9
        name: "Stars",
        get amount() { return player.stars },
        limit: E('e2e12'),
        icon: "Curr/Star",
    },{ // 10
        name: "Fun",
        get amount() { return player.fun },
        limit: E('e1.5e27'),
        icon: "Curr/Fun",
    },{ // 11
        name: "SFRGT",
        get amount() { return player.SFRGT },
        limit: E('e1e30'),
        icon: "Curr/SuperFun",
    },{ // 12
        name: "Dark Matter",
        get amount() { return player.dm },
        limit: E('e1e33'),
        icon: "Curr/DarkMatter",
    },{ // 13
        name: "Momentum",
        get amount() { return player.momentum },
        limit: E('e5e35'),
        icon: "Curr/Momentum",
    },{ // 14
        name: "Unnatural Grass",
        get amount() { return player.grass },
        limit: E('e1e38'),
        icon: "Curr/UGrass",
    },{ // 15
        name: "Normality Points",
        get amount() { return player.np },
        limit: E('e1e43'),
        icon: "Curr/Normality",
    },{ // 16
        name: "Cloud",
        get amount() { return player.cloud },
        limit: E('e2e56'),
        icon: "Curr/Cloud",
    },{ // 17
        name: "Moonstone",
        get amount() { return player.moonstone },
        limit: E('1e333'),
        icon: "Curr/Moonstone",
    },{ // 18
        name: "Rings",
        get amount() { return player.planetoid.ring },
        limit: E('e3e71'),
        icon: "Curr/Ring",
    },{ // 19
        name: "Planetarium",
        get amount() { return player.planetoid.pm },
        limit: E('e3e15'),
        icon: "Curr/Planetoid",
    },{ // 20
        name: "Astro",
        get amount() { return player.planetoid.astro },
        limit: E('e3e18'),
        icon: "Curr/Astrolabe",
    },{ // 21
        name: "Measure",
        get amount() { return player.planetoid.measure },
        limit: E('e3e23'),
        icon: "Curr/Measure",
    },{ // 22
        name: "Planet",
        get amount() { return player.planetoid.planet },
        limit: E('e3e27'),
        icon: "Curr/Planet",
    },{ // 23
        name: "Line",
        get amount() { return player.constellation.line },
        limit: E('e3e10'),
        icon: "Curr/Lines",
    },{ // 24
        name: "Arc",
        get amount() { return player.constellation.arc },
        limit: E('e3e55'),
        icon: "Curr/Arcs",
    },{ // 25
        name: "Observatorium",
        get amount() { return player.planetoid.observ },
        limit: E('e1e90'),
        icon: "Curr/Observatorium",
    },{ // 26
        name: "Reservatorium",
        get amount() { return player.planetoid.reserv },
        limit: E('e3e91'),
        icon: "Curr/Res4",
    },{ // 27
        name: "Dark Charge",
        get amount() { return player.darkCharge },
        limit: E('e1e92'),
        icon: "Curr/DarkCharge",
    },{ // 28
        name: "Stardust",
        get amount() { return player.stardust },
        limit: E('e8300000'),
        icon: "Curr/Stardust",
    },{ // 29
        name: "Star Growth",
        get amount() { return player.stargrowth },
        limit: E('e1.5e9'),
        icon: "Curr/StarGrow",
    },{ // 30
        name: "Solar Flare",
        get amount() { return player.sn.solarFlare },
        limit: E('e13e18'),
        icon: "Curr/SolarFlare",
    },
]

function hasCentralized(i) { return player.centralized.includes(i) }

function activeVoid(i) {
    let l = VOID_OBELISK[i]
    if (!hasCentralized(i) && l.amount.gte(l.limit)) {
        /*
        if (i == 12) {
            alert("Coming Soon!")
            return
        }
        */

        player.centralized.push(i)
        player.singularity++
        updateTemp()
    }
}