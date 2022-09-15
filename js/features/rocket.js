const ROCKET = {
    bulk(x,r,base) {
        return Decimal.mul(base*80,x).add(Decimal.mul(base*base,361+76*r+4*r*r)).root(2).sub(base*21).div(base*2).floor().toNumber()+1
    },
    create() {
        let rf = player.rocket.total_fp
        let b = tmp.rf_bulk

        if (b>rf) {
            player.rocket.total_fp = b

            player.rocket.amount += b-rf

            let c = b*((b-1)/20+1)-rf*(1+(rf-1)/20)

            player.chargeRate = player.chargeRate.sub(Decimal.mul(c,1e36)).max(0)
            player.oil = player.oil.sub(Decimal.mul(c,1e9)).max(0)
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
    }
}

function updateRocketTemp() {
    let rf = player.rocket.total_fp
    let b = rf/10+1
    tmp.rf_cost = [Decimal.mul(b,1e36),Decimal.mul(b,1e9)]

    let bulk = 0
    if (player.chargeRate.gte(tmp.rf_cost[0]) && player.oil.gte(tmp.rf_cost[1])) bulk = Math.min(ROCKET.bulk(player.chargeRate,rf,1e36),ROCKET.bulk(player.oil,rf,1e9))
    tmp.rf_bulk = bulk
}

tmp_update.push(_=>{
    updateRocketTemp()
})