const RF_COST_POW = 1.1

const ROCKET = {
    bulk(x,r,base) {
        return x.mul(RF_COST_POW-1).div(base).div(tmp.rf_base_mult).add(hasSolarUpgrade(2,2) ? 1 : Decimal.pow(RF_COST_POW,r)).log(RF_COST_POW).mul(tmp.rf_cheap).floor()
    },
    create() {
        if (hasSolarUpgrade(2,2)) return;

        let rf = player.rocket.total_fp
        let b = tmp.rf_bulk

        if (b.gt(rf)) {
            player.rocket.total_fp = b

            player.rocket.amount = player.rocket.amount.add(b.sub(rf))

            if (!hasStarTree('auto',10)) {
                let c = Decimal.pow(RF_COST_POW, Decimal.div(b,tmp.rf_cheap)).sub(Decimal.pow(RF_COST_POW, Decimal.div(rf,tmp.rf_cheap))).div(RF_COST_POW-1).mul(tmp.rf_base_mult)

                player.chargeRate = player.chargeRate.sub(Decimal.mul(c,1e36)).max(0)
                player.oil = player.oil.sub(Decimal.mul(c,1e9)).max(0)
            }

            updateRocketTemp()
        }
    },
}

UPGS.rocket = {
    title: "Rocket Fuel Upgrade",

    unl: ()=>!player.planetoid.active && hasUpgrade("factory",5),

    underDesc: ()=>`You have ${format(player.rocket.amount,0)} Rocket Fuel`+(hasSolarUpgrade(2,2) ? gainHTML(player.rocket.amount,tmp.rf_bulk,1) : ""),

    ctn: [
        {
            max: 1000,

            costOnce: true,

            title: "Rocket Fueled Grass",
            desc: `Increase grass gain by <b class="green">+10%</b> per level.`,

            res: "rf",
            icon: ['Curr/Grass'],
            
            cost: i => 1,
            bulk: i => i,

            effect(i) {
                let x = E(i*0.1+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            costOnce: true,

            title: "Rocket Fueled Levels",
            desc: `Increase XP gain by <b class="green">+10%</b> per level.`,

            res: "rf",
            icon: ['Icons/XP'],
            
            cost: i => 1,
            bulk: i => i,

            effect(i) {
                let x = E(i*0.1+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            costOnce: true,

            title: "Rocket Fueled Tiers",
            desc: `Increase TP gain by <b class="green">+10%</b> per level.`,

            res: "rf",
            icon: ['Icons/TP'],
            
            cost: i => 1,
            bulk: i => i,

            effect(i) {
                let x = E(i*0.1+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            costOnce: true,

            title: "Rocket Fueled Prestiges",
            desc: `Increase PP gain by <b class="green">+10%</b> per level.`,

            res: "rf",
            icon: ['Curr/Prestige'],
            
            cost: i => 1,
            bulk: i => i,

            effect(i) {
                let x = E(i*0.1+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            costOnce: true,

            title: "Rocket Fueled Crystallize",
            desc: `Increase crystal gain by <b class="green">+10%</b> per level.`,

            res: "rf",
            icon: ['Curr/Crystal'],
            
            cost: i => 1,
            bulk: i => i,

            effect(i) {
                let x = E(i*0.1+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            costOnce: true,

            title: "Rocket Fueled Foundry",
            desc: `Increase steel gain by <b class="green">+10%</b> per level.`,

            res: "rf",
            icon: ['Curr/Steel2'],
            
            cost: i => 1,
            bulk: i => i,

            effect(i) {
                let x = E(i*0.1+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            costOnce: true,

            title: "Rocket Fueled Charge",
            desc: `Increase charge rate by <b class="green">+10%</b> per level.`,

            res: "rf",
            icon: ['Icons/Charge'],
            
            cost: i => 1,
            bulk: i => i,

            effect(i) {
                let x = E(i*0.1+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            costOnce: true,

            title: "Rocket Fueled Anonymity",
            desc: `Increase AP gain by <b class="green">+10%</b> per level.`,

            res: "rf",
            icon: ['Curr/Anonymity'],
            
            cost: i => 1,
            bulk: i => i,

            effect(i) {
                let x = E(i*0.1+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            costOnce: true,

            title: "Rocket Fueled Pumpjacks",
            desc: `Increase oil gain by <b class="green">+10%</b> per level.`,

            res: "rf",
            icon: ['Curr/Oil'],
            
            cost: i => 1,
            bulk: i => i,

            effect(i) {
                let x = E(i*0.1+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 10000,

            unl: ()=> player.bestGS>=10,

            costOnce: true,

            title: "The Funny Upgrade",
            desc: `Increase fun gain by <b class="green">+1%</b> per level.`,

            res: "rf",
            icon: ['Curr/Fun'],
            
            cost: i => 5,
            bulk: i => i.div(5).floor(),

            effect(i) {
                let x = E(i*0.01+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 10000,

            unl: ()=> player.lowGH<=0,

            costOnce: true,

            title: "Rocket Fueled Celestal",
            desc: `Increase star gain by <b class="green">+2.5%</b> per level.`,

            res: "rf",
            icon: ['Curr/Star'],
            
            cost: i => 100,
            bulk: i => i.div(100).floor(),

            effect(i) {
                let x = E(i*0.025+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },
    ],
}

RESET.rocket_part = {
    unl: ()=>!player.planetoid.active && hasUpgrade('factory',6),

    req: ()=>true,
    reqDesc: ()=>``,

    resetDesc: `<span style="font-size: 14px">Reset everything liquefy does as well as oil, oil upgrades, steel and total rocket fuel.
    You will create a rocket part, earn <b class="green" id="momentumGain">1</b> momentum, and reset the cost to make rocket fuel.
    You keep rocket fuel and rocket fuel upgrades.</span>`,
    resetGain: ()=> `
        <span style="font-size: 14px">
        <b class="lightgray">Steel</b><br>
        <span class="${player.steel.gte(tmp.rp_req[0])?"green":"red"}">${player.steel.format(0)} / ${tmp.rp_req[0].format(0)}</span><br><br>
        <b class="lightblue">Total Rocket Fuel</b><br>
        <span class="${player.rocket.total_fp.gte(tmp.rp_req[1])?"green":"red"}">${format(player.rocket.total_fp,0)} / ${format(tmp.rp_req[1],0)}</span><br><br>
        You have created ${format(player.rocket.part,0)} Rocket Parts
        </span>
    `,

    title: `Rocket Part`,
    resetBtn: `Create Rocket Part`,

    reset(force=false, auto=false) {
        if (player.steel.gte(tmp.rp_req[0])&&player.rocket.total_fp.gte(tmp.rp_req[1])||force) {
            if (tmp.rp_bulk <= 0) return;

            const su = hasSolarUpgrade(2,2)

            if (!force) {
                player.rocket.part += tmp.rp_bulk
                player.momentum = player.momentum.add(tmp.momentumGain.mul(tmp.rp_bulk))
            }

            updateTemp()

            if (auto) {
                if (!su) player.rocket.total_fp = E(0)
            }
            else this.doReset()
        }
    },

    doReset(order="rp") {
        player.rocket.total_fp = E(0)
        player.oil = E(0)
        player.bestOil = E(0)
        player.steel = E(0)
        player.chargeRate = E(0)
        player.aRes.level = E(0)
        player.aRes.tier = E(0)
        player.aRes.xp = E(0)
        player.aRes.tp = E(0)
        resetUpgrades('oil')
        RESET.oil.doReset(order)
        RESET.steel.doReset(order)
    },
}

UPGS.momentum = {
    title: "Momentum Upgrades",

    unl: ()=>!player.planetoid.active && player.rocket.part>0,

    underDesc: ()=>`You have ${format(player.momentum,0)} Momentum`+gainHTML(E(player.momentum),tmp.momentumGain,tmp.momentumGen),

    autoUnl: ()=>hasStarTree('auto',11),
    noSpend: ()=>hasStarTree('auto',11),

    ctn: [
        {
            costOnce: true,

            title: "Grass is Life",
            desc: `Multiply grass gain by 10.`,

            res: "momentum",
            icon: ['Curr/Grass'],
            
            cost: i => 1,
            bulk: i => 1,

            effect(i) {
                let x = i*9+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            costOnce: true,

            title: "Gotta Grow Fast",
            desc: `Multiply grass grow speed by 5.`,

            res: "momentum",
            icon: ['Icons/Speed'],
            
            cost: i => 1,
            bulk: i => 1,

            effect(i) {
                let x = i*4+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            costOnce: true,

            title: "Gas Gas Gas",
            desc: `Multiply XP gain by 10.`,

            res: "momentum",
            icon: ['Icons/XP'],
            
            cost: i => 1,
            bulk: i => 1,

            effect(i) {
                let x = i*9+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            costOnce: true,

            title: "In Tiers",
            desc: `Multiply TP gain by 10.`,

            res: "momentum",
            icon: ['Icons/TP'],
            
            cost: i => 1,
            bulk: i => 1,

            effect(i) {
                let x = i*9+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            costOnce: true,

            title: "Popular",
            desc: `Multiply PP gain by 10.`,

            res: "momentum",
            icon: ['Curr/Prestige'],
            
            cost: i => 1,
            bulk: i => 1,

            effect(i) {
                let x = i*9+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            costOnce: true,

            title: "Shine Bright",
            desc: `Multiply Crystal gain by 10.`,

            res: "momentum",
            icon: ['Curr/Crystal'],
            
            cost: i => 1,
            bulk: i => 1,

            effect(i) {
                let x = i*9+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            costOnce: true,

            title: "Steel Going?",
            desc: `Multiply steel gain by 10.`,

            res: "momentum",
            icon: ['Curr/Steel2'],
            
            cost: i => 1,
            bulk: i => 1,

            effect(i) {
                let x = i*9+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            costOnce: true,

            title: "Powerful",
            desc: `Multiply charge rate by 10.`,

            res: "momentum",
            icon: ['Icons/Charge'],
            
            cost: i => 1,
            bulk: i => 1,

            effect(i) {
                let x = i*9+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            costOnce: true,

            title: "Quickly Forgettable",
            desc: `Multiply AP gain by 10.`,

            res: "momentum",
            icon: ['Curr/Anonymity'],
            
            cost: i => 1,
            bulk: i => 1,

            effect(i) {
                let x = i*9+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            costOnce: true,

            title: "Fracking",
            desc: `Multiply oil gain by 10.`,

            res: "momentum",
            icon: ['Curr/Oil'],
            
            cost: i => 1,
            bulk: i => 1,

            effect(i) {
                let x = i*9+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            unl: ()=>player.lowGH<=-20,

            title: "Great Grass",
            desc: `Increase grass gain by 100% every level.`,

            res: "momentum",
            icon: ['Curr/Grass'],
            
            cost: i => Decimal.pow(1.1,i).mul(10).ceil(),
            bulk: i => i.div(10).max(1).log(1.1).add(1).floor(),

            effect(i) {
                let x = Decimal.pow(2,i)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            unl: ()=>player.lowGH<=-20,

            title: "Great Level",
            desc: `Increase XP gain by 100% every level.`,

            res: "momentum",
            icon: ['Icons/XP'],
            
            cost: i => Decimal.pow(1.1,i).mul(10).ceil(),
            bulk: i => i.div(10).max(1).log(1.1).add(1).floor(),

            effect(i) {
                let x = Decimal.pow(2,i)

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            unl: ()=>player.lowGH<=-20,

            title: "Giga Charge",
            desc: `Increase charge rate by 50% every level.`,

            res: "momentum",
            icon: ['Icons/Charge'],
            
            cost: i => Decimal.pow(1.25,i).mul(25).ceil(),
            bulk: i => i.div(25).max(1).log(1.25).add(1).floor(),

            effect(i) {
                let x = Decimal.pow(1.5,i)

                return x
            },
            effDesc: x => format(x)+"x",
        },
    ],
}

el.update.rocket = ()=>{
    if (mapID == "as") {
        for (let i = 0; i < 2; i++) {
            let rc = tmp.el["rf_cost"+i]
            let res = [player.chargeRate,player.oil][i]
            let cost = tmp.rf_cost[i]

            rc.setTxt(res.format(0)+" / "+cost.format(0))
            rc.setClasses({[res.gte(cost)?"green":"red"]: true})
        }

        tmp.el.rf_craft_bulk.setDisplay(!hasSolarUpgrade(2,2))
        tmp.el.rf_craft_bulk.setTxt("Craft to "+format(tmp.rf_bulk.sub(player.rocket.total_fp).max(0),0)+" Rocket Fuel")
        tmp.el.rf_craft_bulk.setClasses({locked: tmp.rf_bulk.lte(player.rocket.total_fp) })
    } else if (mapID == 'rp') {
        tmp.el.reset_btn_rocket_part.setClasses({locked: player.rocket.total_fp.lt(tmp.rp_req[1]) || player.steel.lt(tmp.rp_req[0])})
        tmp.el.momentumGain.setTxt(format(tmp.momentumGain,0))
    }
}

function updateRocketTemp() {
    let cheap = hasCentralized(7) ? player.grass.max(1).floor() : Decimal.mul(starTreeEff('progress',9,1),starTreeEff('progress',11,1)).mul(getLEffect(5))
    
    let rf = Decimal.div(player.rocket.total_fp,cheap)
    let b = hasSolarUpgrade(2,2) ? E(1) : Decimal.pow(RF_COST_POW,rf).mul(tmp.rf_base_mult)
    tmp.rf_cost = [b.mul(1e36),b.mul(1e9)]
    tmp.rf_cheap = cheap

    let bulk = E(0)
    if (player.chargeRate.gte(tmp.rf_cost[0]) && player.oil.gte(tmp.rf_cost[1])) bulk = Decimal.min(ROCKET.bulk(player.chargeRate,rf,1e36),ROCKET.bulk(player.oil,rf,1e9))
    tmp.rf_bulk = bulk
}

tmp_update.push(()=>{
    let rp = player.rocket.part, req, mult = E(1), bulk = 1

    if (hasSolarUpgrade(2,2)) {
        req = [Decimal.pow(10, rp**1.5).mul(1e60), Decimal.mul(rp+1,10).scale(1e6,2,2).scale(100,3,3).pow(2)]
        bulk = player.rocket.total_fp.root(2).scale(100,3,3,true).scale(1e6,2,2,true).div(10).min(player.steel.div(10).max(1).log10().pow(1.5).add(1)).sub(rp).max(0).floor().toNumber()
    } else {
        if (rp > 50) rp = (rp/50)**2.5*50
        req = [Decimal.pow(4+rp/2,rp).mul(1e60),player.rocket.part>9&&player.gTimes==0?1/0:Math.ceil(15*rp)+15]
        mult = Decimal.pow(1.5,rp)
    }

    tmp.rp_req = req
    tmp.rf_base_mult = mult
    tmp.rp_bulk = bulk

    updateRocketTemp()

    if (hasCentralized(13)) tmp.momentumGain = player.grass.floor()
    else {
        let m = E(1)
        if (player.lowGH <= -28) m = m.add(getAGHEffect(14))
    
        m = m.mul(upgEffect('np',3)).mul(upgEffect('dm',7))
    
        if (player.lowGH <= -44) m = m.mul(getAGHEffect(18))
    
        if (player.grassjump>=2) m = m.mul(getGJEffect(1))
    
        tmp.momentumGain = Decimal.ceil(m)
    }
})