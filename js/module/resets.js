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

                for (let i = 0; i < 2; i++) if (r.reset_options?.[i]) {
                    h += `<div class="reset-option ${['left','right'][i]}" id="reset-${id}-option-${i}"><div>${r.reset_options[i][0]}</div><button id="reset-${id}-option-${i}-button" style="background-color: ${r.color[1]}" onclick="switchResetOption('${id}',${i})">O</button></div>`
                }

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
        let gain = tmp.currency_gain[r.curr ?? id]

        el(`reset-${id}-desc`).innerHTML = r.reset_desc
        el(`reset-${id}-button`).innerHTML = (gain?"+"+format(tmp.currency_gain[r.curr ?? id],0):"")+" "+(r.gain_desc??"")

        el(`reset-${id}-button`).className = el_classes({'reset-button': true, 'reset-lock': r.lock?.()})

        for (let i = 0; i < 2; i++) if (r.reset_options?.[i]) {
            let o = r.reset_options[i]
            el(`reset-${id}-option-${i}`).style.display = el_display(o[1]?.() ?? true)
            el(`reset-${id}-option-${i}-button`).textContent = player.reset_options[id][i] ? "X" : ""
        }
    } else el(`reset-${id}-req`).innerHTML = `<div>${r.req_desc}</div>`
}

function doReset(id, force) {
    var reset = RESETS[id]

    if (force || reset.unl() && reset.req() && !reset.lock?.()) {
        if (!force) {
            let curr = reset.curr ?? id

            if (curr in CURRENCIES) gainCurrency(curr,tmp.currency_gain[curr])

            if ("success" in reset) reset.success()
        }

        updateTemp()

        reset.doReset()

        updateHTMLSecond()
    }
}

function switchResetOption(id,i) { if (RESETS[id].reset_options[i][1]?.() ?? true) player.reset_options[id][i] = !player.reset_options[id][i]; }