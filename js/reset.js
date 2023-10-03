const RESET = {}

el.setup.reset = ()=>{
    for (x in RESET) {
        let resetTable = new Element("reset_div_"+x)

        if (resetTable.el) {
            let r = RESET[x]

            let html = `
            <div>
                <h2>${r.title}</h2><br>
                ${r.resetDesc}
                <div style="position: absolute; bottom: 0; width: 100%;">
                    <div id="reset_gain_${x}"></div>
                    <button id="reset_btn_${x}" onclick="RESET.${x}.reset()">${r.resetBtn}</button>
                    ${x=='gh'||x=='gs'?`<button id="reset_auto_${x}">Auto: OFF</button>`:""}
                </div>
            </div>
            <div id="reset_req_div_${x}" class="reset_req ${x}"><div id="reset_req_desc_${x}"></div></div>
            `

            resetTable.setHTML(html)
            resetTable.addClass(x)
        }
    }

    document.getElementById('reset_auto_gh').onclick = ()=>{
        player.autoGH = !player.autoGH
    }

    document.getElementById('reset_auto_gs').onclick = ()=>{
        player.autoGS = !player.autoGS
    }
}

function updateResetHTML(id) {
    let r = RESET[id]
    let unl = r.unl?r.unl():true

    tmp.el["reset_div_"+id].setDisplay(unl)

    if (unl) {
        let req = r.req?r.req():true

        tmp.el["reset_req_div_"+id].setDisplay(!req)
        tmp.el["reset_req_desc_"+id].setHTML(r.reqDesc())

        if (req) {
            tmp.el["reset_gain_"+id].setHTML(r.resetGain())
        }
    }
}

el.update.reset = ()=> {
    if (mapID == 'pc') {
        updateResetHTML('pp')
        updateResetHTML('crystal')

        updateResetHTML('ap')
        updateResetHTML('oil')

        updateResetHTML('np')
        updateResetHTML('cloud')

        updateResetHTML('astro')
        updateResetHTML('quadrant')
    }
    else if (mapID == 'gh') {
        updateResetHTML('gh')
        updateResetHTML('steel')
        updateResetHTML('gs')
        updateResetHTML('fun')
        updateResetHTML('gj')
        updateResetHTML('hsj')

        updateResetHTML('planetary')
        updateResetHTML('constellation')
    }
    else if (mapID == 'as') {
        updateResetHTML('decel')
    }
    else if (mapID == 'rp') {
        updateResetHTML('rocket_part')
        updateResetHTML('gal')
        updateResetHTML('recel')

        updateResetHTML('supernova')
    }
    else if (mapID == 'auto') {
        updateResetHTML('formRing')

        updateResetHTML('timewarp')
    }

    if (mapID2 == 'sac') {
        updateResetHTML('sac')
        updateResetHTML('enterPlanetoid')
    }
    else if (mapID2 == 'ap') {
        updateResetHTML('astralPrestige')
    }

    if (mapID3 == 'sm') {
        updateResetHTML('sunrise')

        tmp.el.sunrise_desc.setHTML(
            tmp.solarianUnl
            ?`Reset eclipse, remnants, remnant upgrades, collecting, and forming for sunstone and update FM.`
            :`Reset eclipse, remnants, and remnant upgrades for sunstone.`
        )
    }
}