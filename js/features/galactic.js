MAIN.gal = {
    gain() {
        let y = 10

        if (tmp.minStats.gs>0) y += getGSEffect(0,0)

        let x = Decimal.pow(1.5+upgEffect('dm',5,0),Math.max(player.rocket.part-10,0))

        tmp.starGainBase = x

        x = x.mul(y)

        x = x.mul(upgEffect('moonstone',4))

        if (player.lowGH <= 12) x = x.mul(getAGHEffect(4))

        x = x.mul(upgEffect('sfrgt',2))
        x = x.mul(upgEffect('rocket',10))

        x = x.mul(upgEffect('dm',4))

        x = x.mul(starTreeEff('ring',10)).mul(starTreeEff('ring',22))

        if (player.sn.tier.gte(1)) x = x.mul(100)

        x = x.mul(solarUpgEffect(3,3))
        .mul(solarUpgEffect(1,13))

        return x.floor()
    },
}

RESET.gal = {
    unl: ()=>!player.planetoid.active && player.rocket.part>=1,

    req: ()=>player.rocket.part>=10,
    reqDesc: ()=>`Reach 10 rocket parts.`,

    resetDesc: `Reset EVERYTHING except rocket fuel upgrades.<br>First galactic breaks rocket part's limit.<br>Gain more Stars based on rocket parts, starting at 10.`,
    resetGain: ()=> `Gain <b>${tmp.starGain.format(0)}</b> Stars`,

    title: `Galactic`,
    resetBtn: `Go Galaxy!`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                player.stars = player.stars.add(tmp.starGain)
                player.gTimes++

                if (!hasSolarUpgrade(0,1) && player.lowGH <= 0 && player.grasshop <= 0) player.lowGH = Math.max(Math.min(player.lowGH,-player.grassskip),-60)
                else player.lowGH = Math.max(Math.min(player.lowGH,hasSolarUpgrade(0,1) ? -tmp.minStats.gs : player.grasshop),-60)

                player.world = 'space'
            }

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="gal") {
        player.gTime = 0
        player.chargeRate = E(0)

        resetUpgrades('factory')
        resetUpgrades('foundry')
        resetUpgrades('gen')
        if (!hasUpgrade('funnyMachine',3)) resetUpgrades('assembler')
        
        if (!hasStarTree('auto',0)) resetUpgrades('auto')
        resetUpgrades('plat')

        player.decel = false
        player.rocket.total_fp = E(0)
        player.rocket.amount = E(0)
        player.rocket.part = 0

        if (player.lowGH > -20) {
            startMomentum(true)
            player.momentum = E(0)
        }

        player.oil = E(0)
        player.bestOil = E(0)
        player.ap = E(0)
        player.bestAP = E(0)
        player.aGrass = E(0)
        player.aBestGrass = E(0)
        if (!hasStarTree('reserv',12)) {
            player.bestOil2 = E(0)
            player.bestAP2 = E(0)
        }
        player.aRes.level = 0
        player.aRes.tier = 0
        player.aRes.xp = E(0)
        player.aRes.tp = E(0)

        player.steel = E(0)
        player.chargeRate = E(0)
        player.bestCharge = E(0)

        if (player.lowGH > -60) {
            player.grasshop = 0
            player.grassskip = 0
        }

        if (player.lowGH > -12 || order=='sac') player.plat = E(0)

        if (player.lowGH > 28) player.chal.comp = []

        resetUpgrades('ap')
        resetUpgrades('oil')
        resetUpgrades('aGrass')

        if (player.lowGH > -16) player.sTime = 0

        RESET.gh.doReset(order)
    },
}

const ASTRAL = {
    eff() {
        let a = tmp.total_astral
        let x = {}

        x.pp = a/100
        x.crystal = a/25
        x.plat = a+1
        x.steel = 1.1**a*a+1

        if (player.astralPrestige>0) x.dm = getAPEff(0)
        if (player.astralPrestige>1) x.ring = getAPEff(1)
        if (player.astralPrestige>2) x.lunar = getAPEff(2)
        if (player.astralPrestige>3) x.arc = getAPEff(3)
        if (player.astralPrestige>4) x.line = getAPEff(4)
        if (player.astralPrestige>5) x.sd = getAPEff(5)
        if (player.astralPrestige>6) x.sf = getAPEff(6)

        return x
    },
    effDesc(e) {
        let x = `
        Increase PP base from level from <b class="green">1.1</b> to <b class="green">${format(1.1+e.pp,2)}</b><br>
        Increase Crystal base from tier from <b class="green">1.1</b> to <b class="green">${format(1.1+e.crystal,2)}</b><br>
        Increase Platinum gain by <b class="green">${formatMult(e.plat,0)}</b><br>
        Increase Steel gain by <b class="green">${formatMult(e.steel,1)}</b><br>
        `

        if (e.dm) x += `Increase Dark Matter gain by <b class="green">${formatMult(e.dm,0)}</b><br>`
        if (e.ring) x += `Increase Rings gain by <b class="green">${formatMult(e.ring,0)}</b><br>`
        if (e.lunar) x += `Increase Lunar Powers gain by <b class="green">${formatMult(e.lunar,0)}</b><br>`
        if (e.arc) x += `Increase Arcs gain by <b class="green">${formatMult(e.arc,0)}</b><br>`
        if (e.line) x += `Increase Lines gain by <b class="green">${formatMult(e.line,0)}</b><br>`
        if (e.sd) x += `Increase Stardust gain by <b class="green">${formatMult(e.sd,0)}</b><br>`
        if (e.sf) x += `Increase Solar Flare gain by <b class="green">${formatMult(e.sf,0)}</b><br>`

        return x
    },
}

function getASEff(id,def=1) { return tmp.astral_eff[id]||def }
function getAPEff(id) { return Decimal.pow(AP_BONUS_BASE[id],softcap(player.astralPrestige,10,0.25,0)-id).max(1) }

UPGS.moonstone = {
    title: "Moonstone Upgrades",

    underDesc: ()=>`You have ${format(player.moonstone,0)} Moonstone (${formatPercent(tmp.moonstoneChance)} platinum grow chance)`,

    ctn: [
        {
            max: 100,

            costOnce: true,

            title: "Moon Grass",
            desc: `Increase grass gain by <b class="green">+50%</b> per level.`,

            res: "moonstone",
            icon: ['Curr/Grass'],
            
            cost: i => 3,
            bulk: i => Math.floor(i/3),

            effect(i) {
                let x = i/2+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            costOnce: true,

            title: "Moon XP",
            desc: `Increase XP gain by <b class="green">+50%</b> per level.`,

            res: "moonstone",
            icon: ['Icons/XP'],
            
            cost: i => 3,
            bulk: i => Math.floor(i/3),

            effect(i) {
                let x = i/2+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            costOnce: true,

            title: "Moon TP",
            desc: `Increase TP gain by <b class="green">+50%</b> per level.`,

            res: "moonstone",
            icon: ['Icons/TP'],
            
            cost: i => 3,
            bulk: i => Math.floor(i/3),

            effect(i) {
                let x = i/2+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            costOnce: true,

            title: "Moon Platinum",
            desc: `Increase platinum gain by <b class="green">+25%</b> per level.`,

            res: "moonstone",
            icon: ['Curr/Platinum'],
            
            cost: i => 10,
            bulk: i => Math.floor(i/10),

            effect(i) {
                let x = i/4+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            costOnce: true,

            title: "Moon Star",
            desc: `Increase stars gain by <b class="green">+10%</b> per level.`,

            res: "moonstone",
            icon: ['Curr/Star'],
            
            cost: i => 50,
            bulk: i => Math.floor(i/50),

            effect(i) {
                let x = i/10+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            unl: ()=>hasUpgrade('funnyMachine',1),

            costOnce: true,

            title: "Moon SFRGT",
            desc: `Increase SFRGT gain by <b class="green">+50%</b> per level.`,

            res: "moonstone",
            icon: ['Curr/SuperFun'],
            
            cost: i => 250,
            bulk: i => Math.floor(i/250),

            effect(i) {
                let x = i/2+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 10,

            unl: ()=>player.lowGH<=-20,

            costOnce: true,

            title: "Moon-Exponential XP",
            desc: `Increase XP multiplier's exponent by <b class="green">+1%</b> per level.`,

            res: "moonstone",
            icon: ['Icons/XP','Icons/Exponent'],
            
            cost: i => 2500,
            bulk: i => Math.floor(i/2500),

            effect(i) {
                let x = i*0.01+1

                return x
            },
            effDesc: x => formatPow(x),
        },{
            max: 10,

            unl: ()=>player.sacTimes>0,

            costOnce: true,

            title: "Charge-Exponential XP",
            desc: `Increase charge rate's exponent by <b class="green">+1%</b> per level.`,

            res: "moonstone",
            icon: ['Icons/Charge','Icons/Exponent'],
            
            cost: i => 2.5e5,
            bulk: i => Math.floor(i/2.5e5),

            effect(i) {
                let x = i*0.01+1

                return x
            },
            effDesc: x => formatPow(x),
        },
    ],
}

tmp_update.push(()=>{
    let mg = MAIN.gal
    
    tmp.starGain = mg.gain()

    tmp.astral_eff = ASTRAL.eff()
})

el.update.space = ()=>{
    if (tmp.space) {
        if (mapID2 == 'sc') {
            updateStarChart()
            if (tree_canvas.width == 0 || tree_canvas.height == 0) resizeCanvas2()
            drawTree()
        }
        if (mapID2 == 'at') {
            tmp.el.astral2.setTxt((player.astralPrestige>0?format(player.astralPrestige,0)+"-":"")+format(player.astral,0))
            tmp.el.astral_eff.setHTML(ASTRAL.effDesc(tmp.astral_eff))
        }
    }
}