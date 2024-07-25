const MILESTONES = {}

function setupMilestones() {
    for (let id in MILESTONES) {
        let m = MILESTONES[id]
        createGridElement('milestone-'+id, {
            unl: m.unl,
            pos: m.pos,
            size: [2,2],
            class: "milestone-div",
            style: {
                backgroundColor: m.color[0],
            },
            get html() {
                let h = `<div class='milestone-amount' id='milestone-${id}-amount'>???</div>`

                let t = m.ctn.map((x,i)=>`<div style='background-color: ${m.color[0]}' id='milestone-${id}-${i}-div'><h2>${m.name} ${x.r}</h2><div id='milestone-${id}-${i}-desc'>???</div></div>`).join("")

                h += `<div class='milestone-table'>${t}</div>`

                return h
            },
            updateHTML() {
                let el_id = `milestone-${id}`
                let amount = m.amount

                el(el_id+"-amount").innerHTML = m.amount_desc

                let left = 2
                for (let i = 0; i < m.ctn.length; i++) {
                    let x = m.ctn[i], unl = left > 0
                    if (amount.lt(x.r)) left--;
                    el(el_id+"-"+i+"-div").style.display = el_display(unl)
                    if (unl) {
                        el(el_id+"-"+i+"-desc").innerHTML = x.desc
                        el(el_id+"-"+i+"-div").style.backgroundColor = m.color[+amount.gte(x.r)]
                    }
                }
            },
        })
    }
}

function getMilestoneEffect(i,j,def=1) { return MILESTONES[i].ctn[j].effect?.(MILESTONES[i].amount) ?? def }