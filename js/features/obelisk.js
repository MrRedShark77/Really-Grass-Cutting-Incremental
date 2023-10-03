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
                player.astralPrestige++
            }

            player.astral = 0
            player.sp = E(0)

            updateTemp()
        } else if (player.astralPrestige>0) {
            player.astralPrestige--

            player.astral = 0
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
    let x = Decimal.pow(1.5,Math.log10(player.moonstone+1)).div(100).mul(starTreeEff('ring',32)).mul(starTreeEff('ring',36)).mul(getAPEff(2))

    .mul(cs_effect.moon||1)

    x = x.mul(tmp.darkChargeEffs.lunar||1)

    x = x.mul(solarUpgEffect(4,2))

    tmp.LPgain = x

    tmp.lunar_length = 7
    tmp.lunar_max_active = Math.min(1+getPTEffect(4,0),tmp.lunar_length)

    for (let i = 0; i < LUNAR_OB.length; i++) {
        let l = LUNAR_OB[i]
        let lvl = E(player.lunar.level[i])

        tmp.lunar_next[i] = l[5]==0?Decimal.mul(l[3],lvl).add(l[2]):Decimal.pow(l[3],lvl).mul(l[2])
        tmp.lunar_eff[i] = (l[5]==1 ? lvl.softcap(200,0.5,0) : lvl).mul(l[4]).add(1)
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
                let p = l[5]==0?Decimal.pow(lvl,2).sub(lvl).mul(l[3]/2).add(lvl.mul(l[2])):Decimal.pow(l[3],lvl).sub(1).mul(l[2]/(l[3]-1))

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
    Fight Multiplier: <b class="green">${formatMult(player.sol.fight_mult,0)+(tmp.sol.sunriseFM.gt(player.sol.fight_mult)?" ➜ "+formatMult(tmp.sol.sunriseFM):"")}</b>
    `:""),

    title: `Sunrise`,
    resetBtn: `Rise the Sun!!!`,

    reset(force=false) {
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
                player.sol.active_compression = player.sol.active_compression.map((x,i)=>x.add(player.sol.compression[i]))
                player.sol.compression = player.sol.compression.map(x=>E(0))

                player.sol.stage = E(0)
                resetMaterials()
                resetForming('stats')
                resetForming('collect')
                setupSolarianStage()
            }

            player.sn.eclipse = E(0)
            player.sn.sr = E(0)
            player.sn.remnant = E(0)
            player.sn.totalRemnant = E(0)

            let keep = []

            if (hasSolarUpgrade(2,14)) keep.push(0,1,2,3,4,5)

            resetSolarUpgrades(5,keep)
        }
    },
}

const SOLAR_OBELISK = {
    get sunstoneGain() {
        let e = player.sn.eclipse
        let x = Decimal.pow(1.025,e.min(300).sub(100)).mul(10)

        .mul(getStageBonus('sunstone'))

        return x.floor()
    },
    get sunriseEffect() {
        let be = player.sn.bestEclipse, eff = {}

        eff.ss = Decimal.pow(1.01,be)
        eff.sfc = Decimal.pow(1.05,be)

        return eff
    }
}

// Void Obelisk

const VOID_OBELISK = [
    {
        name: "Prestige Points",
        get amount() { return player.pp },
        limit: E('e8.4e8'),
        icon: "Curr/Prestige",
    },{
        name: "Crystal",
        get amount() { return player.crystal },
        limit: E('e2.9e9'),
        icon: "Curr/Crystal",
    },{
        name: "Steel",
        get amount() { return player.steel },
        limit: E('e1.5e10'),
        icon: "Curr/Steel2",
    },{
        name: "Anti-Grass",
        get amount() { return player.grass },
        limit: E('e1e11'),
        icon: "Curr/AntiGrass",
    },
]

function hasCentralized(i) { return player.centralized.includes(i) }

function activeVoid(i) {
    let l = VOID_OBELISK[i]
    if (!hasCentralized(i) && l.amount.gte(l.limit)) {
        player.centralized.push(i)
        player.singularity++
        updateTemp()
    }
}