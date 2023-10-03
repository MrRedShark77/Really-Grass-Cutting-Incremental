MAIN.gh = {
    req: ()=> Math.ceil(300+E(player.grasshop).scale(20,2,0).toNumber()*10),
    bulk: ()=> player.level>=300?E((player.level-300)/10).scale(20,2,0,true).floor().toNumber()+1:0,

    milestone: [
        {
            r: 1,
            desc: `Gain <b class="green">5x</b> more grass. Grass gain is increased by <b class="green">50%</b> every grasshop. Unlock more automation upgrades.`,
            effect: ()=>Decimal.pow(1.5,tmp.minStats.gh),
            effDesc: x=> format(x)+"x",
        },{
            r: 2,
            desc: `Gain <b class="green">5x</b> more XP. XP gain is increased by <b class="green">50%</b> every grasshop.`,
            effect: ()=>Decimal.pow(1.5,tmp.minStats.gh),
            effDesc: x=> format(x)+"x",
        },{
            r: 3,
            desc: `Gain <b class="green">5x</b> more TP. TP gain is increased by <b class="green">50%</b> every grasshop. Keep Prestige challenges on Grasshop.`,
            effect: ()=>Decimal.pow(1.5,tmp.minStats.gh),
            effDesc: x=> format(x)+"x",
        },{
            r: 4,
            desc: `Platinum worth <b class="green">+1</b> per grasshop (start at 3). Unlock more automation upgrades.`,
            effect: ()=>Math.max(0,tmp.minStats.gh-3),
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
            effect: ()=>Decimal.pow(1.25,tmp.minStats.gh),
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
            effect: ()=>Math.max(tmp.minStats.gh-23,0),
            effDesc: x=> "+"+format(x,0)+" later",
        },
    ],
}

MAIN.agh_milestone = [
    {
        r: 36,
        desc: `Grass gain is increased by <b class="green">100%</b> every astral.`,
        effect: ()=>Decimal.pow(2,tmp.total_astral),
        effDesc: x=> format(x)+"x",
    },{
        r: 28,
        desc: `XP gain is increased by <b class="green">100%</b> every astral.<br>Keep challenges on Grasshop, Galactic.`,
        effect: ()=>Decimal.pow(2,tmp.total_astral),
        effDesc: x=> format(x)+"x",
    },{
        r: 20,
        desc: `TP gain is increased by <b class="green">100%</b> every astral.`,
        effect: ()=>Decimal.pow(2,tmp.total_astral),
        effDesc: x=> format(x)+"x",
    },{
        r: 16,
        desc: `Automatically update best anonymity/liquefy with current values if they are higher (while decelerated).`,
    },{
        r: 12,
        desc: `Star gain is increased by <b class="green">10%</b> per astral.<br>Tier requirement is sightly weaker.`,
        effect: ()=>tmp.total_astral/10+1,
        effDesc: x=> format(x)+"x",
    },{
        r: 8,
        desc: `SFRGT gain is increased by <b class="green">25%</b> every astral.`,
        effect: ()=>Decimal.pow(1.25,tmp.total_astral),
        effDesc: x=> format(x)+"x",
    },{
        r: 4,
        desc: `Gain <b class="green">x10</b> more platinum and SP.<br>Active sixth 7 grasshop milestones if you haven't reached them.`,
    },{
        r: 0,
        desc: `Unlock a new rocket fuel for stars.<br>Unlock milestones below grasshop 0.`,
    },{
        r: -4,
        desc: `Charger charge bonuses increase <b class="green">1</b> OoM sooner per grassskip.`,
        effect: ()=>Math.max(tmp.minStats.gs,0),
        effDesc: x=> "+"+format(x,0)+" later",
    },{
        r: -8,
        desc: `Increase SP gained by <b class="green">25%</b> every zero grasshop grass-skips, ending at 60.<br>Steelie no longer reset its time.`,
        effect: ()=>Decimal.pow(1.25,Math.min(Math.max(-player.lowGH,0),60)),
        effDesc: x=> format(x)+"x",
    },{
        r: -12,
        desc: `Increase Fun gained by <b class="green">10%</b> every astral.<br>You don't lose platinum on galactic.`,
        effect: ()=>Decimal.pow(1.1,tmp.total_astral),
        effDesc: x=> format(x)+"x",
    },{
        r: -16,
        desc: `Raise SP gain of the <b class="green">1.25</b>th power.<br>Galactic no longer reset Steelie time.`,
    },{
        r: -20,
        desc: `Keep momentum and momentum upgrades on galactic.<br>Unlock more momentum upgrades, one moonstone upgrade.`,
    },{
        r: -24,
        desc: `Unlock the <b class="green">Dark Matter Plant</b> (on left of Star Chart).`,
    },{
        r: -28,
        desc: `Increase momentum gain by <b class="green">+1</b> per 8 astral.`,
        effect: ()=>Math.floor(tmp.total_astral/8),
        effDesc: x=> "+"+format(x,0),
    },{
        r: -32,
        desc: `Unlock more dark matter upgrades.<br>Unlock the <b class="green">Planetoid</b>.`,
    },{
        r: -36,
        desc: `Reduce XP penalty in <b class="green">Unnatural Realm</b>.<br>Auto Grasshop & Grass-skip no longer reset anything.`,
    },{
        r: -40,
        desc: `Rings gain is increased by <b class="green">10%</b> every astral.`,
        effect: ()=>Decimal.pow(1.1,softcap(tmp.total_astral,120,0.5,0)),
        effDesc: x=> format(x)+"x",
    },{
        r: -44,
        desc: `Momentum gain is increased based on rocket part at a reduced rate.`,
        effect: ()=>Decimal.pow(1.05,player.rocket.part).mul(player.rocket.part+1),
        effDesc: x=> format(x)+"x",
    },{
        r: -48,
        desc: `Unlock the <b class="green">Stellar Obelisk</b> (aka. Astral Prestige, on top of star chart) and <b class="green">Planetary</b>.`,
    },{
        r: -60,
        desc: `Keep grasshop & grass-skip on galactic/sacrifice.<br><l>Will stop getting zero grasshop and more grass-skips.</l>`,
    },
]

MAIN.gs = {
    req: ()=> Math.ceil(400+E(tmp.minStats.gs).scale(10,2,0).toNumber()*10),
    bulk: ()=> player.level>=400?E((player.level-400)/10).scale(10,2,0,true).floor().toNumber()+1:0,

    milestone: [
        {
            r: 1,
            desc: `Gain <b class="green">+5</b> more stars per grass-skip.`,
            effect: ()=>5*tmp.minStats.gs,
            effDesc: x=> "+"+format(x,0),
        },{
            r: 2,
            desc: `Gain <b class="green">+2</b> more SP per grass-skip.`,
            effect: ()=>tmp.minStats.gs*2,
            effDesc: x=> "+"+format(x,0),
        },{
            r: 8,
            desc: `Gain <b class="green">+1</b> more moonstones per 2 grass-skips (starting at 8).`,
            effect: ()=>Math.floor((Math.max(tmp.minStats.gs-7,0)+1)/2),
            effDesc: x=> "+"+format(x,0),
        },{
            r: 10,
            desc: `Unlock Funify reset and The Funny Upgrade rocket fuel upgrade.`,
        },{
            r: 15,
            desc: `SFRGT is increased by <b class="green">50%</b> every grass-skip.`,
            effect: ()=>Decimal.pow(1.5,tmp.minStats.gs),
            effDesc: x=> format(x)+"x",
        },{
            r: 21,
            desc: `<b class="green">Double</b> moonstone earned and its chance.`,
        },{
            r: 25,
            desc: `Steel is increased by <b class="green">50%</b> every grass-skip.`,
            effect: ()=>Decimal.pow(1.5,tmp.minStats.gs),
            effDesc: x=> format(x)+"x",
        },
    ],
}

MAIN.gj = {
    req: ()=> Math.ceil(300+E(player.grassjump).scale(10,2,0).toNumber()*20),
    bulk: ()=> player.level>=300?E((player.level-300)/20).scale(10,2,0,true).floor().toNumber()+1:0,

    milestone: [
        {
            r: 1,
            desc: `Increase Dark Matter gained by <b class="green">+100%</b> per grass-jump.<br>SP gain is raised to the <b class="green">1.25th</b> power.`,
            effect: ()=>player.grassjump+1,
            effDesc: x=> format(x)+"x",
        },{
            r: 2,
            desc: `Increase Momentum gained by <b class="green">+100%</b> per grass-jump.<br>Compaction works <b class="green">^2</b> as stronger.<br>Grow speed is increased <b class="green">x10</b> after compaction.`,
            effect: ()=>player.grassjump+1,
            effDesc: x=> format(x)+"x",
        },{
            r: 3,
            desc: `<b class="green">x10</b> SP gained every grass-jump.`,
            effect: ()=>Decimal.pow(10,player.grassjump),
            effDesc: x=> format(x)+"x",
        },{
            r: 5,
            desc: `Unlock the <b class="green">Lunar Obelisk</b> (on top of star chart).`,
        },{
            r: 16,
            desc: `Unlock the <b class="green">Dark Charger</b> (in constellation).`,
        },{
            r: 20,
            desc: `<b class="green">Double</b> Dark Charge rate every grass-jump, starting at 20.`,
            effect: ()=>Decimal.pow(2,player.grassjump-19),
            effDesc: x=> format(x)+"x",
        },{
            r: 30,
            desc: `Unlock <b class="green">the Star</b> in the planetoid (on right of constellation).`,
        },{
            r: 35,
            desc: `Increase solar rays gain by <b class="green">+10%</b> compounding per grass jump, starting at 35.`,
            effect: ()=>Decimal.pow(1.1,softcap(player.grassjump,75,1/3,2)-34),
            effDesc: x=>formatMult(x),
        },{
            r: 70,
            desc: `Unlock the <b class="green">Crazy Machine</b> on bottom of Grass Jump.`,
        },
    ],
}

const GH_MIL_LEN = MAIN.gh.milestone.length
const AGH_MIL_LEN = MAIN.agh_milestone.length
const GS_MIL_LEN = MAIN.gs.milestone.length
const GJ_MIL_LEN = MAIN.gj.milestone.length

RESET.gh = {
    unl: ()=>player.cTimes>0 && !tmp.outsideNormal,
    req: ()=>player.level>=300,
    reqDesc: ()=>`Reach Level 300.`,

    resetDesc: `Grasshopping resets everything crystalize does as well as crystals, crystal upgrades, challenges.`,
    resetGain: ()=> `Reach Level <b>${format(tmp.gh_req,0)}</b> to Grasshop`,

    title: `Grasshop`,
    resetBtn: `Grasshop!`,

    reset(force=false) {
        if ((this.req()&&player.level>=tmp.gh_req)||force) {
            let res = Math.max(player.grasshop, MAIN.gh.bulk())
            if (force) {
                this.doReset()
            } else if (player.grasshop >= 20 || player.gTimes>0) {
                if (hasStarTree('auto',1) && player.ghMult && res > player.grasshop) player.grasshop = res
                    else player.grasshop++

                updateTemp()
        
                this.doReset()
            } else if (!tmp.ghRunning) {
                tmp.ghRunning = true
                document.body.style.animation = "implode 2s 1"
                setTimeout(()=>{
                    if (hasStarTree('auto',1) && player.ghMult && res > player.grasshop) player.grasshop = res
                    else player.grasshop++

                    updateTemp()
        
                    this.doReset()
                },1000)
                setTimeout(()=>{
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
        if (tmp.minStats.gh >= 3) keep.push(0,1)
        if (tmp.minStats.gh >= 4) keep.push(2,3,4)
        for (let i = 0; i < 5; i++) if (!keep.includes(i) && player.lowGH > 28) player.chal.comp[i] = 0

        resetUpgrades('crystal')

        RESET.crystal.doReset(order)
    },
}

RESET.gs = {
    unl: ()=>player.gTimes>0 && player.decel,
    req: ()=>player.level>=400,
    reqDesc: ()=>`Reach Level 400.`,

    resetDesc: `Grass-skipping resets everything liquefy does as well as oil except oil upgrades.`,
    resetGain: ()=> `Reach Level <b>${format(tmp.gs_req,0)}</b> to Grass-skip`,

    title: `Grass-Skip`,
    resetBtn: `Grass-Skip!`,

    reset(force=false) {
        if ((this.req()&&player.level>=tmp.gs_req)||force) {
            let res = Math.max(player.grassskip, MAIN.gs.bulk())
            if (force) {
                this.doReset()
            } else {
                player.gsUnl = true

                if (hasStarTree('auto',4) && player.gsMult && res > player.grassskip) player.grassskip = res
                else player.grassskip++

                player.bestGS = Math.max(player.bestGS, player.grassskip)

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

RESET.gj = {
    unl: ()=>player.planetoid.planetTier>=5 && player.recel,
    req: ()=>player.level>=300,
    reqDesc: ()=>`Reach Level 300.`,

    resetDesc: `Grass-jumping resets everything normality does as well as cloud, cloud upgrades.`,
    resetGain: ()=> `Reach Level <b>${format(tmp.gj_req,0)}</b> to Grass-Jump`,

    title: `Grass-Jump`,
    resetBtn: `Grass-Jump!`,

    reset(force=false) {
        if ((this.req()&&player.level>=tmp.gj_req)||force) {
            // let res = Math.max(player.grassjump, MAIN.gj.bulk())
            if (force) {
                this.doReset()
            } else {
                // player.gjUnl = true

                player.grassjump++

                updateTemp()
        
                this.doReset()
            }
        }
    },

    doReset(order="gj") {
        player.cloud = E(0)
        player.bestCloud = E(0)
        player.bestCloud2 = E(0)
        resetUpgrades('cloud')

        player.np = E(0)
        player.bestNP = E(0)
        player.bestNP2 = E(0)
        resetUpgrades('np')

        RESET.np.doReset(order)
    },
}

MAIN.hsj = {
    get amount() { return player.hsj },
    set amount(v) { return player.hsj = v },

    get require() { return [10000][this.amount] || Infinity },
    get desc() {
        return [
            `Doing this will allow you to use upgrades, generate currencies, and auto grasshop/skip/jump from all three realms at the same time.`,
        ][this.amount] || "Say Nothing!"
    },
}

RESET.hsj = {
    unl: ()=>player.grassjump>=70 && player.recel,
    req: ()=>true,
    reqDesc: ()=>`wtfff!!!`,

    resetDesc: `<span id='hsj_desc'></span>`,
    resetGain: ()=>`Reach Level <b>${format(MAIN.hsj.require,0)}</b> to do Hop-Skip-Jump`,

    title: `Hop-Skip-Jump`,
    resetBtn: `DO IT NOW!`,

    reset() {
        if (this.req()&&player.level>=MAIN.hsj.require) {
            MAIN.hsj.amount++
        }
    },
}

tmp_update.push(()=>{
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

    for (let x in PLANETOID.planetary.milestone) {
        let m = PLANETOID.planetary.milestone[x]
        if (m.effect) tmp.ptEffect[x] = m.effect()
    }

    tmp.gj_req = MAIN.gj.req()

    for (let x = 0; x < GJ_MIL_LEN; x++) {
        let m = MAIN.gj.milestone[x]
        if (m.effect) tmp.gjEffect[x] = m.effect()
    }
})

function getGHEffect(x,def=1) { return tmp.ghEffect[x]!==undefined?tmp.ghEffect[x]:def }
function getGSEffect(x,def=1) { return tmp.gsEffect[x]!==undefined?tmp.gsEffect[x]:def }
function getAGHEffect(x,def=1) { return tmp.aghEffect[x]!==undefined?tmp.aghEffect[x]:def }
function getGJEffect(x,def=1) { return tmp.gjEffect[x]!==undefined?tmp.gjEffect[x]:def }

function getPTEffect(x,def=1) { return tmp.ptEffect[x]!==undefined?tmp.ptEffect[x]:def }

el.setup.milestones = ()=>{
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

    h += `<div id="gh_mil_ctns">Your <span id="aghgs_text">lowest grasshop</span> is <b id="agh">0</b><div class="milestone_ctns">`

    for (i in MAIN.agh_milestone) {
        let m = MAIN.agh_milestone[i]

        h += `
        <div id="agh_mil_ctn${i}_div">
            <h3>${Math.max(0,m.r)} Grasshop${m.r<0?' and '+(-m.r)+' Grass-skip':''}</h3><br>
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

    t = new Element("milestone_div_planetary")
    h = ""

    h += `<div id="planetary_mil_ctns">You have reached Planetary Tier <b id="planetTier" class='green'>0</b><div class="milestone_ctns">`

    for (i in PLANETOID.planetary.milestone) {
        let m = PLANETOID.planetary.milestone[i]

        h += `
        <div id="pt_mil_ctn${i}_div">
            <h3 class='green'>Planetary Tier ${m.r}</h3><br>
            ${m.desc}
            ${m.effDesc?`<br>Effect: <b class="cyan" id="pt_mil_ctn${i}_eff"></b>`:""}
        </div>
        `
    }

    h += `</div></div>`

    t.setHTML(h)

    t = new Element("milestone_div_gj")
    h = ""

    h += `<div style="position:absolute;top:50%;width: 100%;transform:translateY(-50%);font-size:30px;" id="gj_mil_req">
        Grass-Jump once to unlock.
    </div><div id="gj_mil_ctns">You have grass-jumped <b id="gj">0</b> times<div class="milestone_ctns">`

    for (i in MAIN.gj.milestone) {
        let m = MAIN.gj.milestone[i]

        h += `
        <div id="gj_mil_ctn${i}_div">
            <h3>${m.r}</h3><br>
            ${m.desc}
            ${m.effDesc?`<br>Effect: <b class="cyan" id="gj_mil_ctn${i}_eff"></b>`:""}
        </div>
        `
    }

    h += `</div></div>`

    t.setHTML(h)
}

el.update.milestones = ()=>{
    if (mapID == 'gh') {
        tmp.el.reset_btn_gh.setClasses({locked: player.level < tmp.gh_req})
        tmp.el.reset_btn_gs.setClasses({locked: player.level < tmp.gs_req})

        tmp.el.reset_auto_gh.setTxt('Auto: '+(player.autoGH?"ON":"OFF"))
        tmp.el.reset_auto_gs.setTxt('Auto: '+(player.autoGS?"ON":"OFF"))

        tmp.el.reset_auto_gh.setDisplay(hasStarTree('auto',12))
        tmp.el.reset_auto_gs.setDisplay(hasStarTree('auto',13))

        let unl = player.cTimes>0 && !tmp.outsideNormal

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

        unl = player.planetoid.planetTier>=5 && player.recel

        tmp.el.milestone_div_gj.setDisplay(unl)

        if (unl) {
            unl = player.grassjump>0

            tmp.el.gj_mil_req.setDisplay(!unl)
            tmp.el.gj_mil_ctns.setDisplay(unl)

            if (unl) {
                tmp.el.gj.setHTML(format(player.grassjump,0))

                const sn2 = player.sn.tier.gte(2), sn3 = player.sn.tier.gte(3)

                for (let x = 0; x < GJ_MIL_LEN; x++) {
                    let m = MAIN.gj.milestone[x]
                    let id = "gj_mil_ctn"+x

                    tmp.el[id+"_div"].setDisplay((x<=6 || sn2) && (x<=7 || sn3))
                    tmp.el[id+"_div"].setClasses({bought: player.grassjump >= m.r})
                    if (m.effDesc) tmp.el[id+"_eff"].setHTML(m.effDesc(tmp.gjEffect[x]))
                }
            }
        }

        tmp.el.hsj_desc.setHTML(MAIN.hsj.desc)
    }
    if (mapID2 == 'at') {
        tmp.el.aghgs_text.setTxt(player.lowGH<0?"AGH Grass-skip":"lowest grasshop")
        tmp.el.agh.setHTML(format(Math.abs(player.lowGH),0))

        let agh = player.lowGH<=0

        for (let x = 0; x < AGH_MIL_LEN; x++) {
            let m = MAIN.agh_milestone[x]
            let id = "agh_mil_ctn"+x

            tmp.el[id+"_div"].setDisplay(x<=7 || agh)
            tmp.el[id+"_div"].setClasses({bought: player.lowGH <= m.r})
            if (m.effDesc) tmp.el[id+"_eff"].setHTML(m.effDesc(tmp.aghEffect[x]))
        }
    }
    if (mapID == 'opt') {
        tmp.el.multGHOption.setTxt(player.ghMult?"ON":"OFF")
        tmp.el.multGHButton.setDisplay(hasStarTree('auto',1))
        tmp.el.multGSOption.setTxt(player.gsMult?"ON":"OFF")
        tmp.el.multGSButton.setDisplay(hasStarTree('auto',4))
    }
}

function changeGHMult() { player.ghMult = !player.ghMult }
function changeGSMult() { player.gsMult = !player.gsMult }