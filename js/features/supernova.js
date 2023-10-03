RESET.supernova = {
    unl: ()=>player.planetoid.active&&player.grassjump>=30,

    req: ()=>tmp.starTier.gte(1),
    reqDesc: ()=>`Reach Star Tier 1 to Unlock.`,

    resetDesc: `
    Reset EVERYTHING up to this point!<br><br>
    Gain more Solar Shards based on your current star tier and star growth.
    `,
    resetGain: ()=> `Gain <b class="yellow">${tmp.solarShardGain.format(0)}</b> Solar Shards`
    +(player.sn.tier.gte(2) ? `<br><b class="yellow">+${tmp.SRgain.format(0)}</b> Solar Rays (<b class="yellow">+${SUPERNOVA.eclipse.calcBulk(player.sn.sr.add(tmp.SRgain)).format(0)}</b> Eclipse)` : ""),

    title: `Supernova`,
    resetBtn: `Become Supernova`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                player.sn.times++

                let g = tmp.solarShardGain

                player.sn.solarShard = player.sn.solarShard.add(g)
                player.sn.bestSSEarn = player.sn.bestSSEarn.max(g)
                player.sn.bestSS = player.sn.bestSS.max(player.sn.solarShard)

                player.sn.tier = player.sn.tier.max(tmp.starTier)
                player.sn.totalSFEarn = player.sn.totalSFEarn.add(SUPERNOVA.flareEarn)

                player.world = "star"

                if (player.sn.tier.gte(2)) player.sn.sr = player.sn.sr.add(SUPERNOVA.eclipse.SRgain)
            }

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="supernova") {
        const DATA = getPlayerData()
        startStarChart(true)
        if (player.sn.tier.gte(2)) {
            player.star_chart.speed[7] = 100;
            [5,10,21,29].forEach(x => {player.star_chart.reserv[x] = 1})
        }
        player.lowGH = solarUpgEffect(0,2,0)

        // Planetoid

        let k = {
            fe: player.planetoid.firstEnter,
        }
        if (player.sn.tier.gte(3)) k.bestALNV = [player.bestAP2,player.bestOil2,player.bestNP2,player.bestCloud2]
        player.planetoid = getPlanetoidSave()
        player.planetoid.firstEnter = k.fe
        player.planetoid.planetTier = solarUpgEffect(0,6,0)

        sellAllGrids(false,false,true)
        updateConstellationTemp()
        updateConstellation()
        resetUpgrades('constellation')
        resetUpgrades('observ')
        player.constellation.line = E(0)
        player.constellation.arc = E(0)
        RESET.constellation.doReset(order)

        resetUpgrades('stardust')
        player.stardust = E(0)
        player.stargrowth = E(0)
        player.darkCharge = E(0)

        player.unRes = DATA.unRes
        player.aRes = DATA.aRes

        // Unnatural Realm

        RESET.gj.doReset(order)
        player.grassjump = solarUpgEffect(0,10,0)

        // Other

        player.astralPrestige = solarUpgEffect(0,5,0)
        player.lunar = DATA.lunar
        player.dm = E(0)
        resetUpgrades('dm')
        player.moonstone = 0
        if (player.sn.tier.lt(3)) {
            resetUpgrades('moonstone')
            resetUpgrades('rocket')
        }

        RESET.sac.doReset(order)
        resetUpgrades('funnyMachine')

        if (k.bestALNV) {
            player.bestAP2 = k.bestALNV[0]
            player.bestOil2 = k.bestALNV[1]
            player.bestNP2 = k.bestALNV[2]
            player.bestCloud2 = k.bestALNV[3]
        }

        updateTemp()

        tmp.pass = 3
    },
}

const SUPERNOVA = {
    gain() {
        let st = tmp.starTier, sg = player.stargrowth

        if (st.lt(1)) return E(0)

        let x = Decimal.pow(5,st.sub(1)).mul(sg.div(1e7).max(1).log10().add(1).pow(st.div(4))).mul(10).mul(st)

        x = x.mul(solarUpgEffect(4,3)).mul(solarUpgEffect(5,1)).mul(solarUpgEffect(6,6))

        x = x.mul(tmp.sunriseEffect.ss).mul(getFormingBonus('basic',0))

        .mul(getStageBonus('ss'))

        return x.floor()
    },
    maxFlare() {
        let x = Decimal.mul(1e4,solarUpgEffect(2,0))
        if (player.sn.tier.gte(4)) x = x.mul(Decimal.pow(100,player.sn.tier.sub(3)))
        x = x.mul(tmp.sunriseEffect.sfc)
        return x
    },
    get flareEarn() {
        let st = tmp.starTier
        if (st.lt(1)) return E(0)
        return Decimal.pow(10,st.sub(1))
    },
    flareGain() {
        let x = player.sn.totalSFEarn
        
        .mul(solarUpgEffect(3,4))
        .mul(solarUpgEffect(5,0))
        .mul(solarUpgEffect(6,0))
        
        .mul(getASEff('sf'))

        return x
    },
    eclipse: {
        req(offest = 0) { return Decimal.pow(1.05,player.sn.eclipse.sub(offest).scale(300,2,0).add(1)).sub(1).mul(2000) },
        calcBulk(res = player.sn.sr) { return res.div(2000).add(1).log(1.05).sub(1).scale(300,2,0,true).add(1).sub(player.sn.eclipse).floor() },

        get require() { return this.req() },
        get reqBase() {
            let e = player.sn.eclipse
            return Decimal.pow(1.05,e.add(1).scale(300,2,0)).sub(Decimal.pow(1.05,e.scale(300,2,0))).mul(2000)
        },
        get bulk() { return this.calcBulk() },

        get SRgain() {
            let x = Decimal.pow(1.15, player.stargrowth.add(1).log10()).mul(10)

            .mul(solarUpgEffect(3,10))

            .mul(solarUpgEffect(4,14))
            .mul(solarUpgEffect(4,19))

            .mul(cs_effect.ray)

            .mul(getStageBonus('sr'))

            if (player.grassjump >= 35) x = x.mul(getGJEffect(7))

            return x.floor()
        }
    },
    milestone: [
        {
            r: 1,
            desc: `
            - Keep Automation, Anti-Anti-Automation, and Star Chart Automation upgrades on Supernova and Galactic.<br>
            - Unlock constellation tiers 13-24.<br>
            - Stars and Rings are increased <b class="green">100x</b>.<br>
            - Planetarium is increased <b class="green">1,000x</b>.<br>
            `,
        },{
            r: 2,
            desc: `
            - Unlock Eclipse, and earn Solar Rays (SR) from Supernova.<br>
            - Keep Steel Generation upgrades on Supernova.<br>
            - Keep Reservatorium Ring Generation upgrades on Supernova.<br>
            - Automatically buy ring upgrades.
            `,
        },{
            r: 3,
            desc: `
            - Unlock a new grass jump milestone.<br>
            - Keep best Anonymity/Liquefy/Normality/Vaporize on Supernova.<br>
            - Keep rocket fuel and moonstone upgrades on Supernova.
            `,
        },{
            r: 4,
            desc: `
            - Unlock the <b class="green">Sunrise</b> reset (on bottom of supernova milestones).<br>
            - Dark Matter Upgrades' cap is broken.<br>
            - Solar Flares cap is increased by <b class="green">100x</b> per Supernova Tier, starting at 4.
            `,
        },{
            r: 5,
            desc: `
            - Unlock the third obelisk.
            `,
        },
    ],
}

tmp_update.push(()=>{
    tmp.sunriseEffect = SOLAR_OBELISK.sunriseEffect

    tmp.solarShardGain = SUPERNOVA.gain()
    tmp.maxSolarFlare = SUPERNOVA.maxFlare()
    tmp.flareGain = SUPERNOVA.flareGain()
    tmp.SRgain = SUPERNOVA.eclipse.SRgain

    tmp.sunstoneGain = SOLAR_OBELISK.sunstoneGain

    for (let i in tmp.minStats) tmp.minStats[i] = getFreeStats(i)
})

function getSupernovaSave() {
    let s = {
        solarShard: E(0),
        bestSS: E(0),
        bestSSEarn: E(0),
        triggerTime: 0,

        solarFlare: E(0),
        totalSFEarn: E(0),

        times: 0,
        tier: E(0),

        solarUpgs: [],

        sr: E(0),
        eclipse: E(0),
        bestEclipse: E(0),
        remnant: E(0),
        totalRemnant: E(0),

        sunstone: E(0),
        sunriseTimes: 0,
    }
    for (let i in SOLAR_UPGS) s.solarUpgs[i] = []
    return s
}

function startStarChart(reset=false) {
    for (let id in player.star_chart) if (id !== 'auto') {
        if (reset) player.star_chart[id] = [];

        let sc = player.star_chart[id]

        let res = id == 'ring' ? solarUpgEffect(0,9) : id == 'reserv' ? solarUpgEffect(0,8) : solarUpgEffect(0,7)
        // Maximum: Ring - 1e75 (15x5), Reservatorium - 1e30 (10x3), Stars - 1e34 (12x3)

        for (let [k,v] of Object.entries(STAR_CHART[id])) if (res.gte(v.cost(0))) sc[k] = v.max ?? 1
    }
}

function startMomentum(reset=false) {
    if (reset) resetUpgrades('momentum')

    for (let x = 0; x < 10; x++) player.upgs.momentum[x] = 1
}

function getFreeStats(id) {
    switch (id) {
        case 'gh': return Math.max(player.grasshop,solarUpgEffect(0,0));
        case 'gs': return Math.max(player.grassskip,solarUpgEffect(0,1));
    }
}

function calcSupernova(dt) {
    if (hasSolarUpgrade(0,4)) {
        player.planetoid.planetTier = Math.max(player.planetoid.planetTier,PLANETOID.planetary.tierBulk())
    }

    if (player.sn.times > 0) {
        player.sn.solarFlare = player.sn.solarFlare.add(tmp.flareGain.mul(dt)).min(tmp.maxSolarFlare)
    }

    if (hasSolarUpgrade(4,4)) {
        let s = player.sn.triggerTime + dt * solarUpgEffect(6,7)
        if (s >= 86400) {
            let w = Math.floor(s / 86400)
            player.sn.solarShard = player.sn.solarShard.add(player.sn.bestSSEarn.mul(w))
            s -= w * 86400
        }
        player.sn.triggerTime = s
    }

    if (player.sn.tier.gte(2)) {
        buyMaxSCs('ring')
        if (hasSolarUpgrade(2,10)) player.sn.sr = player.sn.sr.add(SUPERNOVA.eclipse.SRgain.mul(dt/100))
    }

    if (player.sn.tier.gte(2) && player.sn.sr.gte(SUPERNOVA.eclipse.require)) {
        const b = SUPERNOVA.eclipse.bulk
        player.sn.eclipse = player.sn.eclipse.add(b).round()
        var g = b.mul(solarUpgEffect(6,2))
        if (hasSolarUpgrade(7,1)) g = g.mul(2)
        player.sn.totalRemnant = player.sn.totalRemnant.add(g).round()
        player.sn.remnant = player.sn.remnant.add(g).round()
    }

    if (hasSolarUpgrade(2,11)) player.sn.bestSSEarn = player.sn.bestSSEarn.max(tmp.solarShardGain)
    if (hasSolarUpgrade(2,12)) player.sn.totalSFEarn = player.sn.totalSFEarn.add(SUPERNOVA.flareEarn.mul(dt))
}

function updateRemnant() {
    let g = player.sn.eclipse.mul(solarUpgEffect(6,2))
    if (hasSolarUpgrade(7,1)) g = g.mul(2)
    g = g.sub(player.sn.totalRemnant).max(0)
    player.sn.remnant = player.sn.remnant.add(g).round()
    player.sn.totalRemnant = player.sn.totalRemnant.add(g).round()
}

el.update.sn = () => {
    let st = player.sn.tier

    if (mapID3 == 'sm') {
        tmp.el.sn_tier.setHTML(`<div>${st.format(0)}</div>`);

        for (let i in SUPERNOVA.milestone) {
            i = parseInt(i)

            tmp.el['sn-milestone'+i].setDisplay(i == 0 || st.gte(SUPERNOVA.milestone[i-1].r))
        }
    }
}

el.setup.sn = () => {
    let h = ""

    for (const [i,x] of Object.entries(SUPERNOVA.milestone)) {
        h += `<div class="sn-milestone" id="sn-milestone${i}">
            <h3>Supernova Tier ${x.r}</h3><br><br>
            ${x.desc}
        </div>`
    }

    new Element('sn_milestones').setHTML(h)
}