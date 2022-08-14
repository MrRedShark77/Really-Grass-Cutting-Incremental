MAIN.gh = {
    req: _=> 300+player.grasshop*10,

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
            effect: _=>player.grasshop-3,
            effDesc: x=> "+"+format(x,0),
        },{
            r: 5,
            desc: `Keep Crystallize challenges on Grasshop.`,
        },{
            r: 6,
            desc: `Platinum Chance <b class="green">2x</b>. Unlock perk autobuyer upgrade.`,
        },
    ],
}

const GH_MIL_LEN = MAIN.gh.milestone.length

RESET.gh = {
    unl: _=>player.cTimes>0,
    req: _=>player.level>=300,
    reqDesc: _=>`Reach Level 300.`,

    resetDesc: `Grasshopping resets everything crystalize does as well as crystals, crystal upgrades, challenges.`,
    resetGain: _=> `Reach Level <b>${format(tmp.gh_req,0)}</b> to Grasshop`,

    title: `Grasshop`,
    resetBtn: `Grasshop!`,

    reset(force=false) {
        if ((this.req()&&player.level>=tmp.gh_req)||force) {
            if (!tmp.ghRunning) {
                tmp.ghRunning = true
                document.body.style.animation = "implode 2s 1"
                setTimeout(_=>{
                    if (!force) {
                        player.grasshop++
                    }

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
        player.chal.progress = -1

        let keep = []
        if (player.grasshop >= 3) keep.push(0,1)
        if (player.grasshop >= 4) keep.push(2,3,4)
        for (let i = 0; i < CHALS.length; i++) if (!keep.includes(i)) player.chal.comp[i] = 0

        resetUpgrades('crystal')

        RESET.crystal.doReset(order)
    },
}

tmp_update.push(_=>{
    tmp.gh_req = MAIN.gh.req()

    for (let x = 0; x < GH_MIL_LEN; x++) {
        let m = MAIN.gh.milestone[x]
        if (m.effect) tmp.ghEffect[x] = m.effect()
    }
})

function getGHEffect(x,def=E(1)) { return tmp.ghEffect[x]||def }

el.setup.ghMilestone = _=>{
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
}

el.update.ghMilestone = _=>{
    if (mapID == 'gh') {
        tmp.el.reset_btn_gh.setClasses({locked: player.level < tmp.gh_req})

        let unl = player.cTimes>0

        tmp.el.milestone_div_gh.setDisplay(unl)

        if (unl) {
            unl = player.grasshop>0

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
    }
}