MAIN.gh = {
    req: _=> Math.ceil(300+E(player.grasshop).scale(20,2,0).toNumber()*10),
    bulk: _=> player.level>=300?E((player.level-300)/10).scale(20,2,0,true).floor().toNumber()+1:0,

    milestone: [
        {
            r: 1,
            desc: `Gain <b class="green">5x</b> more grass. Grass gain is increased by <b class="green">50%</b> every grasshop. Unlock more automation upgrades.`,
            effect: _=>Decimal.pow(1.5,player.grasshop),
            effDesc: x=> format(x)+"x",
        },{
            r: 2,
            desc: `Gain <b class="green">5x</b> more XP. XP gain is increased by <b class="green">50%</b> every grasshop.`,
            effect: _=>Decimal.pow(1.5,player.grasshop),
            effDesc: x=> format(x)+"x",
        },{
            r: 3,
            desc: `Gain <b class="green">5x</b> more TP. TP gain is increased by <b class="green">50%</b> every grasshop. Keep Prestige challenges on Grasshop.`,
            effect: _=>Decimal.pow(1.5,player.grasshop),
            effDesc: x=> format(x)+"x",
        },{
            r: 4,
            desc: `Platinum worth <b class="green">+1</b> per grasshop (start at 3). Unlock more automation upgrades.`,
            effect: _=>Math.max(0,player.grasshop-3),
            effDesc: x=> "+"+format(x,0),
        },{
            r: 5,
            desc: `Keep Crystallize challenges on Grasshop.`,
        },{
            r: 6,
            desc: `Platinum Chance <b class="green">2x</b>. Unlock perk autobuyer upgrade.`,
        },{
            r: 7,
            desc: `Tier multiplier's exponent is increased by <b class="green">25%</b>.`,
        },{
            r: 10,
            desc: `Unlock Steelie reset. Grasshop does not reset perks.`,
        },{
            r: 14,
            desc: `Unlock two more generator upgrades related to charge.`,
        },{
            r: 15,
            desc: `Charge rate is increased by <b class="green">25%</b> every grasshop.`,
            effect: _=>Decimal.pow(1.25,player.grasshop),
            effDesc: x=> format(x)+"x",
        },{
            r: 18,
            desc: `Charger charge bonuses increase <b class="green">1</b> OoM (order of magnitude) sooner.`,
        },{
            r: 20,
            desc: `Charger charge bonuses increase another <b class="green">1</b> OoM sooner. Grasshop animation will no longer play.`,
        },{
            r: 24,
            desc: `Charger charge bonuses increase another <b class="green">1</b> OoM sooner per grasshop starting at 24.`,
            effect: _=>Math.max(player.grasshop-23,0),
            effDesc: x=> "+"+format(x,0)+" later",
        },
    ],
}

MAIN.agh_milestone = [
    {
        r: 36,
        desc: `Grass gain is increased by <b class="green">100%</b> every astral.`,
        effect: _=>Decimal.pow(2,player.astral),
        effDesc: x=> format(x)+"x",
    },{
        r: 32,
        desc: `XP gain is increased by <b class="green">100%</b> every astral.<br>Keep challenges on Grasshop, Galactic.`,
        effect: _=>Decimal.pow(2,player.astral),
        effDesc: x=> format(x)+"x",
    },{
        r: 28,
        desc: `TP gain is increased by <b class="green">100%</b> every astral.`,
        effect: _=>Decimal.pow(2,player.astral),
        effDesc: x=> format(x)+"x",
    },{
        r: 24,
        desc: `Star gain is increased by <b class="green">10%</b> per astral.<br>Tier requirement is sightly weaker.`,
        effect: _=>player.astral/10+1,
        effDesc: x=> format(x)+"x",
    },
]

MAIN.gs = {
    req: _=> Math.ceil(400+E(player.grassskip).scale(10,2,0).toNumber()*10),

    milestone: [
        {
            r: 1,
            desc: `Gain <b class="green">+5</b> more stars per grass-skip.`,
            effect: _=>5*player.grassskip,
            effDesc: x=> "+"+format(x,0),
        },{
            r: 2,
            desc: `Gain <b class="green">+2</b> more SP per grass-skip.`,
            effect: _=>player.grassskip*2,
            effDesc: x=> "+"+format(x,0),
        },
    ],
}

const GH_MIL_LEN = MAIN.gh.milestone.length
const AGH_MIL_LEN = MAIN.agh_milestone.length
const GS_MIL_LEN = MAIN.gs.milestone.length

RESET.gh = {
    unl: _=>player.cTimes>0 && !player.decel,
    req: _=>player.level>=300,
    reqDesc: _=>`Reach Level 300.`,

    resetDesc: `Grasshopping resets everything crystalize does as well as crystals, crystal upgrades, challenges.`,
    resetGain: _=> `Reach Level <b>${format(tmp.gh_req,0)}</b> to Grasshop`,

    title: `Grasshop`,
    resetBtn: `Grasshop!`,

    reset(force=false) {
        if ((this.req()&&player.level>=tmp.gh_req)||force) {
            let res = Math.max(player.grasshop, MAIN.gh.bulk())
            if (force) {
                this.doReset()
            } else if (player.grasshop >= 20 || player.gTimes>0) {
                if (hasStarTree('auto',1) && player.ghMult) player.grasshop = res
                else player.grasshop++

                updateTemp()
        
                this.doReset()
            } else if (!tmp.ghRunning) {
                tmp.ghRunning = true
                document.body.style.animation = "implode 2s 1"
                setTimeout(_=>{
                    if (hasStarTree('auto',1) && player.ghMult) player.grasshop = res
                else player.grasshop++

                    updateTemp()
        
                    this.doReset()
                },1000)
                setTimeout(_=>{
                    document.body.style.animation = ""
                    tmp.ghRunning = false
                },2000)
            }
        }
    },

    doReset(order="gh") {
        player.crystal = E(0)
        player.bestCrystal = E(0)

        let keep = []
        if (player.grasshop >= 3) keep.push(0,1)
        if (player.grasshop >= 4) keep.push(2,3,4)
        for (let i = 0; i < 5; i++) if (!keep.includes(i) && player.lowGH > 32) player.chal.comp[i] = 0

        resetUpgrades('crystal')

        RESET.crystal.doReset(order)
    },
}

RESET.gs = {
    unl: _=>player.gTimes>0 && player.decel,
    req: _=>player.level>=400,
    reqDesc: _=>`Reach Level 400.`,

    resetDesc: `Grass-skipping resets everything liquefy does as well as oil except oil upgrades.`,
    resetGain: _=> `Reach Level <b>${format(tmp.gs_req,0)}</b> to Grass-skip`,

    title: `Grass-Skip`,
    resetBtn: `Grass-Skip!`,

    reset(force=false) {
        if ((this.req()&&player.level>=tmp.gs_req)||force) {
            if (force) {
                this.doReset()
            } else {
                player.gsUnl = true
                player.grassskip++

                updateTemp()
        
                this.doReset()
            }
        }
    },

    doReset(order="gh") {
        player.oil = E(0)
        player.bestOil = E(0)

        RESET.oil.doReset(order)
    },
}

tmp_update.push(_=>{
    tmp.gh_req = MAIN.gh.req()

    for (let x = 0; x < GH_MIL_LEN; x++) {
        let m = MAIN.gh.milestone[x]
        if (m.effect) tmp.ghEffect[x] = m.effect()
    }

    for (let x = 0; x < AGH_MIL_LEN; x++) {
        let m = MAIN.agh_milestone[x]
        if (m.effect) tmp.aghEffect[x] = m.effect()
    }

    tmp.gs_req = MAIN.gs.req()

    for (let x = 0; x < GS_MIL_LEN; x++) {
        let m = MAIN.gs.milestone[x]
        if (m.effect) tmp.gsEffect[x] = m.effect()
    }
})

function getGHEffect(x,def=1) { return tmp.ghEffect[x]||def }
function getGSEffect(x,def=1) { return tmp.gsEffect[x]||def }
function getAGHEffect(x,def=1) { return tmp.aghEffect[x]||def }

el.setup.milestones = _=>{
    let t = new Element("milestone_div_gh")
    let h = ""

    h += `<div style="position:absolute;top:50%;width: 100%;transform:translateY(-50%);font-size:30px;" id="gh_mil_req">
        Grasshop once to unlock.
    </div><div id="gh_mil_ctns">You have grasshopped <b id="gh">0</b> times<div class="milestone_ctns">`

    for (i in MAIN.gh.milestone) {
        let m = MAIN.gh.milestone[i]

        h += `
        <div id="gh_mil_ctn${i}_div">
            <h3>${m.r} Grasshop</h3><br>
            ${m.desc}
            ${m.effDesc?`<br>Effect: <b class="cyan" id="gh_mil_ctn${i}_eff"></b>`:""}
        </div>
        `
    }

    h += `</div></div>`

    t.setHTML(h)

    t = new Element("milestone_div_agh")
    h = ""

    h += `<div id="gh_mil_ctns">Your lowest grasshop is <b id="agh">0</b><div class="milestone_ctns">`

    for (i in MAIN.agh_milestone) {
        let m = MAIN.agh_milestone[i]

        h += `
        <div id="agh_mil_ctn${i}_div">
            <h3>${m.r} Grasshop</h3><br>
            ${m.desc}
            ${m.effDesc?`<br>Effect: <b class="cyan" id="agh_mil_ctn${i}_eff"></b>`:""}
        </div>
        `
    }

    h += `</div></div>`

    t.setHTML(h)

    t = new Element("milestone_div_gs")
    h = ""

    h += `<div style="position:absolute;top:50%;width: 100%;transform:translateY(-50%);font-size:30px;" id="gs_mil_req">
        Grass-skip once to unlock.
    </div><div id="gs_mil_ctns">You have grass-skipped <b id="gs">0</b> times<div class="milestone_ctns">`

    for (i in MAIN.gs.milestone) {
        let m = MAIN.gs.milestone[i]

        h += `
        <div id="gs_mil_ctn${i}_div">
            <h3>${m.r} Grass-skip</h3><br>
            ${m.desc}
            ${m.effDesc?`<br>Effect: <b class="cyan" id="gs_mil_ctn${i}_eff"></b>`:""}
        </div>
        `
    }

    h += `</div></div>`

    t.setHTML(h)
}

el.update.milestones = _=>{
    if (mapID == 'gh') {
        tmp.el.reset_btn_gh.setClasses({locked: player.level < tmp.gh_req})
        tmp.el.reset_btn_gs.setClasses({locked: player.level < tmp.gs_req})

        let unl = player.cTimes>0 && !player.decel

        tmp.el.milestone_div_gh.setDisplay(unl)

        if (unl) {
            unl = player.grasshop>0 || player.gTimes>0

            tmp.el.gh_mil_req.setDisplay(!unl)
            tmp.el.gh_mil_ctns.setDisplay(unl)

            if (unl) {
                tmp.el.gh.setHTML(format(player.grasshop,0))

                for (let x = 0; x < GH_MIL_LEN; x++) {
                    let m = MAIN.gh.milestone[x]
                    let id = "gh_mil_ctn"+x

                    tmp.el[id+"_div"].setClasses({bought: player.grasshop >= m.r})
                    if (m.effDesc) tmp.el[id+"_eff"].setHTML(m.effDesc(tmp.ghEffect[x]))
                }
            }
        }

        unl = player.gTimes>0 && player.decel

        tmp.el.milestone_div_gs.setDisplay(unl)

        if (unl) {
            unl = player.grassskip>0 || player.gsUnl

            tmp.el.gs_mil_req.setDisplay(!unl)
            tmp.el.gs_mil_ctns.setDisplay(unl)

            if (unl) {
                tmp.el.gs.setHTML(format(player.grassskip,0))

                for (let x = 0; x < GS_MIL_LEN; x++) {
                    let m = MAIN.gs.milestone[x]
                    let id = "gs_mil_ctn"+x

                    tmp.el[id+"_div"].setClasses({bought: player.grassskip >= m.r})
                    if (m.effDesc) tmp.el[id+"_eff"].setHTML(m.effDesc(tmp.gsEffect[x]))
                }
            }
        }
    }
    if (mapID2 == 'at') {
        tmp.el.agh.setHTML(format(player.lowGH,0))

        for (let x = 0; x < AGH_MIL_LEN; x++) {
            let m = MAIN.agh_milestone[x]
            let id = "agh_mil_ctn"+x

            tmp.el[id+"_div"].setClasses({bought: player.lowGH <= m.r})
            if (m.effDesc) tmp.el[id+"_eff"].setHTML(m.effDesc(tmp.aghEffect[x]))
        }
    }
    if (mapID == 'opt') {
        tmp.el.multGHOption.setTxt(player.ghMult?"ON":"OFF")
    }
}

function changeGHMult() { player.ghMult = !player.ghMult }