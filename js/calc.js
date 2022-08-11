function calc(dt) {
    tmp.spawn_time += dt
    tmp.autocutTime += dt
    player.time += dt

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

    for (let x in UPGS) if (tmp.upgs[x].autoUnl) if (player.autoUpg[x]) buyMaxUpgrades(x,true)

    player.bestGrass = player.bestGrass.max(player.grass)
    player.bestPP = player.bestPP.max(player.pp)
    player.bestCrystal = player.bestCrystal.max(player.crystal)

    if (player.level >= 200 && !player.chalUnl) player.chalUnl = true

    MAIN.checkCutting()
}