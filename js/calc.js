function calc(dt) {
    let decel = player.decel

    tmp.spawn_time += dt
    tmp.autocutTime += dt
    player.time += dt
    player.sTime += dt

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

    player.maxPerk = Math.max(player.maxPerk, tmp.perks)

    for (let x in UPGS) if (tmp.upgs[x].autoUnl && !(['grass','pp','crystal'].includes(x) && decel) && !(['aGrass'].includes(x) && !decel)) if (player.autoUpg[x]) buyMaxUpgrades(x,true)

    if (tmp.ppGainP > 0 && player.level >= 30 && !decel) player.pp = player.pp.add(tmp.ppGain.mul(dt*tmp.ppGainP))
    if (tmp.crystalGainP > 0 && player.level >= 100 && !decel) player.crystal = player.crystal.add(tmp.crystalGain.mul(dt*tmp.crystalGainP))

    if (hasUpgrade('factory',2)) player.chargeRate = player.chargeRate.add(tmp.chargeGain.mul(dt))

    player.bestGrass = player.bestGrass.max(player.grass)
    player.bestPP = player.bestPP.max(player.pp)
    player.bestCrystal = player.bestCrystal.max(player.crystal)
    player.bestCharge = player.bestCharge.max(player.chargeRate)

    if (player.level >= 200 && !player.chalUnl) player.chalUnl = true

    if (!inChal(-1)) {
        let p = player.chal.progress
        player.chal.comp[p] = Math.min(Math.max(player.chal.comp[p]||0,tmp.chal.bulk),CHALS[p].max)
    }

    MAIN.checkCutting()
}