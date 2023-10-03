function calc(dt) {
    if (tmp.pass > 0) {
        tmp.pass--
        return
    }

    let hsj1 = player.hsj > 0
    let decel = player.decel || hsj1
    let recel = player.recel || hsj1

    let outsideNormal = (decel || recel) && player.hsj < 1

    player.time += dt
    player.sTime += dt
    player.gTime += dt

    if (is_online) {
        tmp.spawn_time += dt
        tmp.autocutTime += dt

        calcTimeWarp(dt)

        if (tmp.spawn_time >= tmp.grassSpawn) {
            while (tmp.spawn_time >= tmp.grassSpawn) {
                tmp.spawn_time -= tmp.grassSpawn
                for (let i=0;i<tmp.spawnAmt;i++) createGrass()
            }
            tmp.spawn_time = 0
        }

        if (tmp.autocutTime >= tmp.autocut && tmp.grasses.length > 0 && hasUpgrade('auto',0)) {
            while (tmp.autocutTime >= tmp.autocut) {
                tmp.autocutTime -= tmp.autocut
                for (let i=0;i<tmp.autocutAmt;i++) removeGrass(randint(0, tmp.grasses.length-1),true)
            }
            tmp.autocutTime = 0
        }
    } else {
        gainCurrenciesOnGrass(tmp.autocutBonus, tmp.autocutAmt / tmp.autocut * dt)
    }

    if (!player.planetoid.active || hsj1) {
        if (tmp.ppGainP > 0 && player.level >= 30 && !outsideNormal) player.pp = player.pp.add(tmp.ppGain.mul(dt*tmp.ppGainP))
        if (tmp.crystalGainP > 0 && player.level >= 100 && !outsideNormal) player.crystal = player.crystal.add(tmp.crystalGain.mul(dt*tmp.crystalGainP))

        if (hasUpgrade('factory',7)) {
            player.ap = player.ap.add(player.bestAP2.mul(dt*tmp.oilRigBase))
            player.oil = player.oil.add(player.bestOil2.mul(dt*tmp.oilRigBase))
        }

        if (hasStarTree('reserv',12)) {
            player.np = player.np.add(player.bestNP2.mul(dt*tmp.npGen))
            if (recel) player.bestNP2 = player.bestNP2.max(tmp.npGain)
        }

        if (tmp.steelPass > 0) {
            player.steel = player.steel.add(tmp.steelGain.mul(tmp.steelPass*dt))
        }

        if (tmp.starGen > 0) player.stars = player.stars.add(tmp.starGain.mul(dt*tmp.starGen))
        if (decel) if (tmp.funGen > 0) player.fun = player.fun.add(tmp.funGain.mul(dt*tmp.funGen))

        if (hasUpgrade('factory',2)) player.chargeRate = player.chargeRate.add(tmp.chargeGain.mul(dt))

        if (player.cloudUnl) {
            player.bestCloud = player.bestCloud.max(player.cloud)
            if (recel) player.bestCloud2 = player.bestCloud2.max(tmp.cloudGain)
            player.cloud = player.cloud.add(player.bestCloud2.mul(dt))
        }

        player.bestGrass = player.bestGrass.max(player.grass)
        player.bestPP = player.bestPP.max(player.pp)
        player.bestCrystal = player.bestCrystal.max(player.crystal)
        player.bestCharge = player.bestCharge.max(player.chargeRate)

        player.aBestGrass = player.aBestGrass.max(player.aGrass)
        player.bestAP = player.bestAP.max(player.ap)
        player.bestOil = player.bestOil.max(player.oil)

        player.unBestGrass = player.unBestGrass.max(player.unGrass)
        player.bestNP = player.bestNP.max(player.np)

        if (player.level >= 200 && !player.chalUnl) player.chalUnl = true

        if (!inChal(-1)) {
            let p = player.chal.progress
            player.chal.comp[p] = Math.min(Math.max(player.chal.comp[p]||0,tmp.chal.bulk),CHALS[p].max)
        }

        if (player.lowGH <= 16 && decel) {
            player.bestAP2 = player.bestAP2.max(tmp.apGain)
            player.bestOil2 = player.bestOil2.max(tmp.oilGain)
        }

        if (hasUpgrade('funnyMachine',1)) {
            player.SFRGT = player.SFRGT.add(tmp.SFRGTgain.mul(dt))
        }

        if (hasSolarUpgrade(2,2) && hasUpgrade('factory',5)) {
            let g = tmp.rf_bulk.mul(dt)
            player.rocket.amount = player.rocket.amount.add(g)
            player.rocket.total_fp = player.rocket.total_fp.add(g)
        }
        else if (hasStarTree('auto',10)) ROCKET.create()

        if (hasStarTree('auto',14)) RESET.rocket_part.reset(false,true)

        if (player.autoGH && (!tmp.outsideNormal || hsj1)) {
            if (player.lowGH > -36 && !hasSolarUpgrade(0,0)) RESET.gh.reset()
            else player.grasshop = Math.max(player.grasshop,MAIN.gh.bulk())
        }
        if (player.autoGS && decel) {
            if (player.lowGH > -36 && !hasSolarUpgrade(0,1)) RESET.gs.reset()
            else player.grassskip = Math.max(player.grassskip,MAIN.gs.bulk())
        }
        if (hasSolarUpgrade(0,4)) {
            if (recel) player.grassjump = Math.max(player.grassjump,MAIN.gj.bulk())
        }

        if (tmp.momentumGen > 0) {
            player.momentum = player.momentum.add(tmp.momentumGain.mul(tmp.momentumGen*dt))
        }
    }

    for (let x in UPGS) if (tmp.upgs[x].autoUnl && !(['grass','pp','crystal'].includes(x) && outsideNormal) && (hsj1 || !(['aGrass'].includes(x) && !outsideNormal))) if (player.autoUpg[x]) buyMaxUpgrades(x,true)
    player.maxPerk = Math.max(player.maxPerk, tmp.perks)

    if (tmp.ringGen > 0) player.planetoid.ring = player.planetoid.ring.add(tmp.ringGain.mul(dt*tmp.ringGen))

    if (tmp.aGen > 0) {
        player.planetoid.astro = player.planetoid.astro.add(tmp.astroGain.mul(dt*tmp.aGen))
        player.planetoid.bestAstro = player.planetoid.bestAstro.max(player.planetoid.astro)
    }

    if (tmp.measureGen > 0) {
        player.planetoid.measure = player.planetoid.measure.add(tmp.measureGain.mul(dt*tmp.measureGen))
        player.planetoid.bestMeasure = player.planetoid.bestMeasure.max(player.planetoid.measure)
    }

    if (tmp.planetGen > 0) {
        player.planetoid.planet = player.planetoid.planet.add(tmp.planetGain.mul(dt*tmp.planetGen))
        player.planetoid.bestPlanet = player.planetoid.bestPlanet.max(player.planetoid.planet)
    }

    if (tmp.dmGen > 0) player.dm = player.dm.add(tmp.dmGain.mul(dt*tmp.dmGen))

    for (let i = 0; i < LUNAR_OB.length; i++) {
        if (player.lunar.active.includes(i) || hasSolarUpgrade(2,4)) player.lunar.lp[i] = player.lunar.lp[i].add(tmp.LPgain.mul(dt))
        if (player.lunar.lp[i].gte(tmp.lunar_next[i])) player.lunar.level[i] = Decimal.max(player.lunar.level[i],getLPLevel(i))
    }

    if (player.constellation.unl) {
        player.constellation.line = player.constellation.line.add(tmp.lineGain.mul(dt))
        player.constellation.arc = player.constellation.arc.add(tmp.arcGain.mul(dt))

        player.constellation.arcUnl = player.constellation.arcUnl || player.constellation.arc.gt(0)
    }

    if (player.grassjump>=16) {
        player.darkCharge = player.darkCharge.add(tmp.darkChargeRate.mul(dt))
    }

    if (player.grassjump>=30) {
        player.stardust = player.stardust.add(tmp.stardustGain.mul(dt))
        player.stargrowth = player.stargrowth.add(tmp.growSpeed.mul(dt))
    }

    player.planetoid.bestPm = player.planetoid.bestPm.max(player.planetoid.pm)

    calcSupernova(dt)
    calcSolarians(dt)

    MAIN.checkCutting()
}