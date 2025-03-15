var second_time = 0

function calc(dt) {
    for (let [i,v] of Object.entries(CURRENCIES)) {
        var passive = v.passive ?? 1
        gainCurrency(i, tmp.currency_gain[i].mul(dt*passive))
    }

    calcGrass(dt)

    second_time += dt

    player.time += dt
    player.prestige.time += dt
    player.crystal.time += dt
    player.steelie.time += dt
    player.anonymity.time += dt
    player.galactic.time += dt

    if (player.galactic.times) player.auto_accomplish += dt;

    player.funify.reached ||= player.grassskip.gte(8)

    if (second_time >= 1) {
        // Autobuyer

        for (let [id,u] of Object.entries(UPGRADES)) {
            let a = player.lists.currencies[u.al ?? id]?.[1]
            a ||= a === undefined
            if (u.autobuy?.() && a) for (let i in u.ctn) if (player.auto_upgs[id][i]) buyUpgrade(id,i,true,true);
        }

        if (player.auto_accomplish >= tmp.auto_accomplish_time) {
            let w = Math.floor(player.auto_accomplish / tmp.auto_accomplish_time)

            for (let i = 0; i < ACCOM.ctn.length; i++) if (player.agh.lte(-12) || i !== 9) player.accomplishments[i] = player.accomplishments[i].add(w).min(ACCOM.ctn[i].max);

            player.auto_accomplish %= tmp.auto_accomplish_time;
        }

        if (hasUpgrade('factory',6) && player.reset_options['rocket-fuel'][1]) doReset('rocket-fuel');

        if (hasUpgrade('star',"A12",2) && player.reset_options.grasshop[1] && player.level.gte(GH.require)) player.grasshop = player.grasshop.add(GH.bulk(true));
        if (hasUpgrade('star',"A13",2) && player.reset_options['grass-skip'][1] && player.anti.level.gte(GS.require)) player.grassskip = player.grassskip.add(GS.bulk(true));

        updateHTMLSecond()
        drawCanvas()

        second_time = 0
    }
}