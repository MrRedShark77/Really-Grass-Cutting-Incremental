MAIN.gal = {
    gain() {
        let x = 10

        if (player.grassskip>0) x += getGSEffect(0,0)

        x = Decimal.pow(1.5,Math.max(player.rocket.part-10,0)).mul(x)

        x = x.mul(upgEffect('moonstone',4))

        if (player.lowGH <= 12) x = x.mul(getAGHEffect(4))

        x = x.mul(upgEffect('sfrgt',2))
        x = x.mul(upgEffect('rocket',10))

        return x.floor()
    },
}

RESET.gal = {
    unl: _=>player.rocket.part>=1,

    req: _=>player.rocket.part>=10,
    reqDesc: _=>`Reach 10 rocket parts.`,

    resetDesc: `Reset EVERYTHING except rocket fuel upgrades.<br>First galactic breaks rocket part's limit.<br>Gain more Stars based on rocket parts, starting at 10.`,
    resetGain: _=> `Gain <b>${tmp.starGain.format(0)}</b> Stars`,

    title: `Galactic`,
    resetBtn: `Go Galaxy!`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                player.stars = player.stars.add(tmp.starGain)
                player.gTimes++

                if (player.lowGH <= 0 && player.grasshop <= 0) player.lowGH = Math.min(player.lowGH,-player.grassskip)
                else player.lowGH = Math.min(player.lowGH,player.grasshop)

                tmp.space = true
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
        player.rocket.total_fp = 0
        player.rocket.amount = 0
        player.rocket.part = 0

        if (player.lowGH > -20) {
            resetUpgrades('momentum')
            player.momentum = 0
        }

        player.oil = E(0)
        player.bestOil = E(0)
        player.ap = E(0)
        player.bestAP = E(0)
        player.aGrass = E(0)
        player.aBestGrass = E(0)
        player.bestOil2 = E(0)
        player.bestAP2 = E(0)
        player.aRes.level = 0
        player.aRes.tier = 0
        player.aRes.xp = E(0)
        player.aRes.tp = E(0)

        player.steel = E(0)
        player.chargeRate = E(0)
        player.bestCharge = E(0)
        player.grasshop = 0
        player.grassskip = 0
        if (player.lowGH > -12) player.plat = 0

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
        let a = player.astral
        let x = {}

        x.pp = a/100
        x.crystal = a/25
        x.plat = a+1
        x.steel = 1.1**a*a+1

        return x
    },
    effDesc(e) {
        let x = `
        Increase PP base from level from <b class="green">1.1</b> to <b class="green">${format(1.1+e.pp,2)}</b><br>
        Increase Crystal base from tier from <b class="green">1.1</b> to <b class="green">${format(1.1+e.crystal,2)}</b><br>
        Increase Platinum gain by <b class="green">${formatMult(e.plat,0)}</b><br>
        Increase Steel gain by <b class="green">${formatMult(e.steel,1)}</b><br>
        `

        return x
    },
}

function getASEff(id,def=1) { return tmp.astral_eff[id]||def }

UPGS.moonstone = {
    title: "Moonstone Upgrades",

    underDesc: _=>`You have ${format(player.moonstone,0)} Moonstone (${formatPercent(tmp.moonstoneChance)} platinum grow chance)`,

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

            unl: _=>hasUpgrade('funnyMachine',1),

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

            unl: _=>player.lowGH<=-20,

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
            effDesc: x => "^"+format(x),
        },
    ],
}

tmp_update.push(_=>{
    let mg = MAIN.gal
    
    tmp.starGain = mg.gain()

    tmp.astral_eff = ASTRAL.eff()
})

el.update.space = _=>{
    if (mapID2 == 'sc') {
        updateStarChart()
        if (tree_canvas.width == 0 || tree_canvas.height == 0) resizeCanvas2()
        drawTree()
    }
    if (mapID2 == 'at') {
        tmp.el.astral2.setTxt(format(player.astral,0))
        tmp.el.astral_eff.setHTML(ASTRAL.effDesc(tmp.astral_eff))
    }
}