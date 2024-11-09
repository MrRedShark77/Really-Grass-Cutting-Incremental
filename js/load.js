function loadGame(start=true, gotNaN=false) {
    if (!gotNaN) prevSave = localStorage.getItem(SAVE_ID)
    player = getPlayerData()
    load(prevSave)
    reloadTemp()

    if (start) {
        doCreateGridElements()
        setupHTML()
        setupCanvas()
        cameraEvent()

        setTimeout(() => {
            updateTemp()
            calc((Date.now() - player.latest)/1000)
            loop()

            el("app").style.display = ""

            updateHTMLSecond()
            drawCanvas()
            
            autosave = setInterval(save, 60000, true)
            setInterval(loop, 1000/FPS)
        }, 100);
    }
}

function doCreateGridElements() {
    /*
    createGridElement("final-star", {
        unl: ()=>hasUpgrade("UNLOCK5"),
        pos: [40,40],

        html: `
        <img id="final-star-img" src="style/spark.png" draggable="false">
        `,
    })

    createGridElement("black-hole", {
        persist: true,

        unl: ()=>hasUpgrade("END4"),
        pos: [20,20],

        html: `
        <img id="black-hole-img" src="style/black-hole.png" draggable="false">
        `,
    })

    CURR_GRIDS.forEach(x => {createCurrencyGridElement(x)})

    for (let i in RESETS) createResetGridElement(i);

    setupChallenges()

    createGridElement("EED",{
        unl: () => hasUpgrade("A7"),

        html: `
        <p>You have <span id="EED-amount">0</span> <b class='iconly-bolt'></b>P, which increases energy rate by <b id="EED-effect">???</b>.</p>
        <p>Tickspeed: <b id="EED-tickspeed">1/s</b></p>
        <div id="EED-ctns"></div>
        `,

        style: {
            "background" : "#111",
        },

        pos: [4, -1], size: [2, 2],

        updateHTML() {
            el('EED-amount').innerHTML = format(player.eed.amount, 0) + " " + formatGain(player.eed.amount, tmp.currency_gain.energy_p)
            el('EED-tickspeed').innerHTML = format(tmp.eed.tickspeed) + "/s"
            el('EED-effect').innerHTML = formatMult(tmp.eed.effect)

            let dim = tmp.eed.dimensions, h = "", ticks = player.eed.ticks

            if (dim.lte(8)) for (let i = 1; i <= dim.floor().toNumber(); i++) {
                h += `<div>Energy Dimension ${format(i,0)} | ${F.exponential_sum(ticks, dim.sub(i)).format(0)}</div>`
            } else for (let i = 1; i <= 4; i++) {
                if (i == 1) h += `<div>Energy Dimension 1 | ${F.exponential_sum(ticks, dim.sub(1)).format(0)}</div>`;
                else if (i == 2) h += `<div>...</div>`;
                else h += `<div>Energy Dimension ${format(dim.sub(4).add(i),0)} | ${F.exponential_sum(ticks, 4-i).format(0)}</div>`;
            }

            el('EED-ctns').innerHTML = h
        },
    })

    createGridElement("energy-galaxy",{
        unl: () => hasUpgrade("C6"),
        style: {
            "background" : "#111",
        },
        pos: [2, 19], size: [2, 2],
        html: `
        <div style="position: relative; height: 400px; width: 100%;"><div id="energy-galaxy"><img id="energy-galaxy-img" draggable="false" src="style/galaxy.png"></div></div>
        <p>Your energy galaxy's diameter is <b id="energy-galaxy-diameter">123</b> light years, which translates to <b id="energy-galaxy-effect">+123</b> extra bases of <b>B2</b> & <b>B4</b>.</p>
        `,
        updateHTML() {
            el('energy-galaxy-img').style.width = tmp.galaxy.diameter.root(9).div(10).max(0).min(1).toNumber()*400 + "px"

            el('energy-galaxy-diameter').innerHTML = format(tmp.galaxy.diameter,0)
            el('energy-galaxy-effect').innerHTML = "+"+format(tmp.galaxy.effect,4)
        },
    })

    createGridElement("psi-btn",{
        unl: ()=>hasUpgrade("UNLOCK4"),
        pos: [40,21],

        html: `
        <button onclick="enterPSI()" class="grid-button">
        Dialting forces a galactic energy reset. In the dilation, all pre-galactic resources and the tickspeed of <b>EED</b> are reduced by <b>^0.75</b> to the exponent, and upgrades <b>F1</b> & <b>F12</b> don't work. Psi Essence (<b class='iconly-delta'></b>) is generated based on your energy.<br><br><div id="psi-text"></div>
        </button>
        `,

        updateHTML() {
            el('psi-text').innerHTML = player.psi.active ? "Stop dilating." : "Start the Dilation."
        },
    })

    createGridElement("meta-particle",{
        unl: () => player.meta.unl,
        style: {
            "background" : "#111",
        },
        pos: [42, 40], size: [2, 2],
        html: `
        <p>You have <span id="meta-particle-amount">0</span> <b class='iconly-infinity'></b>P (based on your energy and meta-energy).</p>
        <div id="meta-particle-effect"></div>
        `,
        updateHTML() {
            el('meta-particle-amount').innerHTML = format(player.meta.particles, 0) + " " + formatGain(player.meta.particles, tmp.currency_gain.meta_p)

            el('meta-particle-effect').innerHTML = META_PARTICLE_EFFECTS.filter(v => v[0]()).map((v,i) => v[2](tmp.meta_p_effects[i])).join("<br>")
        },
    })

    setupUpgrades()
    */

    setupGrassField()
    setupUpgrades()
    setupLevels()
    setupResetsHTML()
    setupMilestones()
    ACCOM.setup()
    CHARGER.setup()

    createGridElement('decel-teleport',{
        unl: () => tmp.anti_unl,
        pos: [4,12],

        html: `
        <button onclick="teleportTo(2)" class="grid-fill-btn">
            Teleport to <b>Anti-realm</b>
        </button>
        `,
    })
    createGridElement('normal-teleport',{
        unl: () => tmp.anti_unl,
        pos: [20,-1],

        html: `
        <button onclick="teleportTo(0)" class="grid-fill-btn">
            Teleport back to <b>normal realm</b>
        </button>
        `,
    })
}