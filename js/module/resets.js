const RESETS = {}

function setupResetsHTML() {
    for (let [id,r] of Object.entries(RESETS)) {
        createGridElement('reset-'+id,{
            unl: r.unl,
            pos: r.pos,
            size: [2,1],
            class: "upgrades-div",
            style: {
                backgroundColor: r.color[0],
            },
            get html() {
                let h = ""

                h += `<div class="reset-name">${r.name}</div><div class="reset-desc" id="reset-${id}-desc">???</div>`

                h += `<button class="reset-button" style="background-color: ${r.color[1]}" id="reset-${id}-button" onclick="doReset('${id}')">???</button><img class="reset-img" src="images/${r.icon}.png">`

                h += `<div id="reset-${id}-req" class="reset-req" style="background-color: ${r.color[0]}">
                    <div>???</div>
                </div>`

                return h
            },
            updateHTML() {
                updateResetHTML(id)
            },
        })
    }
}

function updateResetHTML(id) {
    let r = RESETS[id], req = r.req()

    el(`reset-${id}-req`).style.display = el_display(!req)
    if (req) {
        el(`reset-${id}-desc`).innerHTML = r.reset_desc
        el(`reset-${id}-button`).innerHTML = "+"+format(tmp.currency_gain[id],0)
    } else el(`reset-${id}-req`).innerHTML = `<div>${r.req_desc}</div>`
}

function doReset(id, force) {
    var reset = RESETS[id], curr = CURRENCIES[id]

    if (force || reset.unl() && reset.req()) {
        if (!force) {
            curr.amount = curr.amount.add(tmp.currency_gain[id]).max(0)

            if ("success" in reset) reset.success()
        }

        updateTemp()

        reset.doReset()

        updateHTMLSecond()
    }
}