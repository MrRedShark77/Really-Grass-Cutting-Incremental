const RESET = {}

el.setup.reset = _=>{
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
                </div>
            </div>
            <div id="reset_req_div_${x}" class="reset_req ${x}"><div id="reset_req_desc_${x}"></div></div>
            `

            resetTable.setHTML(html)
            resetTable.addClass(x)
        }
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

el.update.reset = _=> {
    if (mapID == 'pc') {
        updateResetHTML('pp')
        updateResetHTML('crystal')
    }
    if (mapID == 'gh') {
        updateResetHTML('gh')
        updateResetHTML('steel')
    }
    if (mapID == 'as') {
        updateResetHTML('decel')
    }
}