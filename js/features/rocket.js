const RF_COST_POW = 1.1

const ROCKET = {
    bulk(x,r,base) {
        return x.mul(RF_COST_POW-1).div(base).div(tmp.rf_base_mult).add(Decimal.pow(RF_COST_POW,r)).log(RF_COST_POW).floor().toNumber()
    },
    create() {
        let rf = player.rocket.total_fp
        let b = tmp.rf_bulk

        if (b>rf) {
            player.rocket.total_fp = b

            player.rocket.amount += b-rf

            let c = Decimal.pow(RF_COST_POW, b).sub(Decimal.pow(RF_COST_POW, rf)).div(RF_COST_POW-1).mul(tmp.rf_base_mult)

            player.chargeRate = player.chargeRate.sub(Decimal.mul(c,1e36)).max(0)
            player.oil = player.oil.sub(Decimal.mul(c,1e9)).max(0)

            updateRocketTemp()
        }
    },
}

UPGS.rocket = {
    title: "Rocket Fuel Upgrade",

    unl: _=>hasUpgrade("factory",5),

    underDesc: _=>`You have ${format(player.rocket.amount,0)} Rocket Fuel`,

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
        },
    ],
}

RESET.rocket_part = {
    unl: _=> hasUpgrade('factory',6),

    req: _=>true,
    reqDesc: _=>``,

    resetDesc: `<span style="font-size: 14px">Reset everything liquefy does as well as oil, oil upgrades, steel and total rocket fuel.
    You will create a rocket part, earn one momentum, and reset the cost to make rocket fuel.
    You keep rocket fuel and rocket fuel upgrades.</span>`,
    resetGain: _=> `
        <span style="font-size: 14px">
        <b class="lightgray">Steel</b><br>
        <span class="${player.steel.gte(tmp.rp_req[0])?"green":"red"}">${player.steel.format(0)} / ${tmp.rp_req[0].format(0)}</span><br><br>
        <b class="lightblue">Total Rocket Fuel</b><br>
        <span class="${player.rocket.total_fp >= tmp.rp_req[1]?"green":"red"}">${format(player.rocket.total_fp,0)} / ${format(tmp.rp_req[1],0)}</span><br><br>
        You have created ${format(player.rocket.part,0)} Rocket Parts
        </span>
    `,

    title: `Rocket Part`,
    resetBtn: `Create Rocket Part`,

    reset(force=false) {
        if (player.steel.gte(tmp.rp_req[0])&&player.rocket.total_fp >= tmp.rp_req[1]||force) {
            if (!force) {
                player.rocket.part++
                player.momentum++
            }

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="rp") {
        player.rocket.total_fp = 0
        player.oil = E(0)
        player.bestOil = E(0)
        player.steel = E(0)
        player.chargeRate = E(0)
        player.aRes.level = 0
        player.aRes.tier = 0
        player.aRes.xp = E(0)
        player.aRes.tp = E(0)
        resetUpgrades('oil')
        RESET.oil.doReset(order)
        RESET.steel.doReset(order)
    },
}

UPGS.momentum = {
    title: "Momentum Upgrades",

    unl: _=>player.rocket.part>0,

    underDesc: _=>`You have ${format(player.momentum,0)} Momentum`,

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
        },
    ],
}

el.update.rocket = _=>{
    if (mapID == "as") {
        for (let i = 0; i < 2; i++) {
            let rc = tmp.el["rf_cost"+i]
            let res = [player.chargeRate,player.oil][i]
            let cost = tmp.rf_cost[i]

            rc.setTxt(res.format(0)+" / "+cost.format(0))
            rc.setClasses({[res.gte(cost)?"green":"red"]: true})
        }

        tmp.el.rf_craft_bulk.setTxt("Craft to "+format(Math.max(tmp.rf_bulk-player.rocket.total_fp,0),0)+" Rocket Fuel")
        tmp.el.rf_craft_bulk.setClasses({locked: tmp.rf_bulk<=player.rocket.total_fp })
    } else if (mapID == 'rp') {
        tmp.el.reset_btn_rocket_part.setClasses({locked: player.rocket.total_fp < tmp.rp_req[1] || player.steel.lt(tmp.rp_req[0])})
    }
}

function updateRocketTemp() {
    let rf = player.rocket.total_fp
    let b = Decimal.pow(RF_COST_POW,rf).mul(tmp.rf_base_mult)
    tmp.rf_cost = [b.mul(1e36),b.mul(1e9)]

    let bulk = 0
    if (player.chargeRate.gte(tmp.rf_cost[0]) && player.oil.gte(tmp.rf_cost[1])) bulk = Math.min(ROCKET.bulk(player.chargeRate,rf,1e36),ROCKET.bulk(player.oil,rf,1e9))
    tmp.rf_bulk = bulk
}

tmp_update.push(_=>{
    tmp.rp_req = [Decimal.pow(4+player.rocket.part/2,player.rocket.part).mul(1e60),player.rocket.part>9?1/0:15*player.rocket.part+15]
    tmp.rf_base_mult = Decimal.pow(1.5,player.rocket.part)

    updateRocketTemp()
})