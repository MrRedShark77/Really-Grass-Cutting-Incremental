var second_time = 0

function calc(dt) {
    for (let [i,v] of Object.entries(CURRENCIES)) {
        var passive = v.passive ?? 1
        gainCurrency(i, tmp.currency_gain[i].mul(dt*passive))
    }

    calcGrass(dt)

    second_time += dt

    if (second_time >= 1) {
        // Autobuyer

        for (let [id,u] of Object.entries(UPGRADES)) if (u.autobuy?.()) for (let i in u.ctn) if (player.auto_upgs[id][i]) buyUpgrade(id,i,true,true);

        updateHTMLSecond()

        second_time = 0
    }

    player.time += dt

    // drawCanvas()
}