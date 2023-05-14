function calc(dt) {
    let decel = player.decel
    let recel = player.recel

    let outsideNormal = decel || recel

    tmp.spawn_time += dt
    tmp.autocutTime += dt
    player.time += dt
    player.sTime += dt
    player.gTime += dt
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

    if (!player.planetoid.active) {
        if (tmp.ppGainP > 0 && player.level >= 30 && !outsideNormal) player.pp = player.pp.add(tmp.ppGain.mul(dt*tmp.ppGainP))
        if (tmp.crystalGainP > 0 && player.level >= 100 && !outsideNormal) player.crystal = player.crystal.add(tmp.crystalGain.mul(dt*tmp.crystalGainP))

        if (hasUpgrade('factory',7)) {
            player.ap = player.ap.add(player.bestAP2.mul(dt*tmp.oilRigBase))
            player.oil = player.oil.add(player.bestOil2.mul(dt*tmp.oilRigBase))
        }

        if (hasStarTree('reserv',12)) {
            player.np = player.np.add(player.bestNP2.mul(dt*tmp.npGen))
            if (player.recel) player.bestNP2 = player.bestNP2.max(tmp.npGain)
        }

        if (tmp.steelPass > 0) {
            player.steel = player.steel.add(tmp.steelGain.mul(tmp.steelPass*dt))
        }

        if (tmp.starGen > 0) player.stars = player.stars.add(tmp.starGain.mul(dt*tmp.starGen))
        if (player.decel) if (tmp.funGen > 0) player.fun = player.fun.add(tmp.funGain.mul(dt*tmp.funGen))

        if (hasUpgrade('factory',2)) player.chargeRate = player.chargeRate.add(tmp.chargeGain.mul(dt))

        if (player.cloudUnl) {
            player.bestCloud = player.bestCloud.max(player.cloud)
            if (player.recel) player.bestCloud2 = player.bestCloud2.max(tmp.cloudGain)
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

        if (player.lowGH <= 16 && player.decel) {
            player.bestAP2 = player.bestAP2.max(tmp.apGain)
            player.bestOil2 = player.bestOil2.max(tmp.oilGain)
        }

        if (hasUpgrade('funnyMachine',1)) {
            player.SFRGT = player.SFRGT.add(tmp.SFRGTgain.mul(dt))
        }

        if (hasStarTree('auto',10)) ROCKET.create()

        if (hasStarTree('auto',14)) RESET.rocket_part.reset(false,true)

        if (player.autoGH && !tmp.outsideNormal) {
            if (player.lowGH > -36) RESET.gh.reset()
            else player.grasshop = Math.max(player.grasshop,MAIN.gh.bulk())
        }
        if (player.autoGS && player.decel) {
            if (player.lowGH > -36) RESET.gs.reset()
            else player.grassskip = Math.max(player.grassskip,MAIN.gs.bulk())
        }

        if (tmp.momentumGen > 0) {
            player.momentum += tmp.momentumGain*tmp.momentumGen*dt
        }
    }

    for (let x in UPGS) if (tmp.upgs[x].autoUnl && !(['grass','pp','crystal'].includes(x) && outsideNormal) && !(['aGrass'].includes(x) && !outsideNormal)) if (player.autoUpg[x]) buyMaxUpgrades(x,true)
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

    if (tmp.dmGen > 0) player.dm = player.dm.add(tmp.dmGain.mul(dt*tmp.dmGen))

    player.planetoid.bestPm = player.planetoid.bestPm.max(player.planetoid.pm)
    MAIN.checkCutting()
}