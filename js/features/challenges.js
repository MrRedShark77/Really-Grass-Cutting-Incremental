const CHALS = [
    {
        unl: ()=>true,

        max: 20,
        id: 'pp',

        title: `Less Level`,
        desc: `The Level requirement is expensive.`,
        reward: `XP gain is increased by <b class="green">100%</b> every completions.`,

        goal: i=>30+10*i,
        bulk: i=>Math.floor((i-30)/10+1),

        goalDesc: x=>"Level "+format(x,0),
        goalAmt: ()=>player.level,

        eff: i=>Decimal.pow(2,i),
        effDesc: x=>format(x)+"x",
    },{
        unl: ()=>true,

        max: 20,
        id: 'pp',

        title: `Grassless`,
        desc: `You cannot buy any grass upgrades.`,
        reward: `Grass gain is increased by <b class="green">100%</b> every completions.`,

        goal: i=>100+10*i,
        bulk: i=>Math.floor((i-100)/10+1),

        goalDesc: x=>"Level "+format(x,0),
        goalAmt: ()=>player.level,

        eff: i=>Decimal.pow(2,i),
        effDesc: x=>format(x)+"x",
    },{
        unl: ()=>true,

        max: 20,
        id: 'crystal',

        title: `No Tiers`,
        desc: `You cannot tier up.`,
        reward: `TP gain is increased by <b class="green">100%</b> every completions.`,

        goal: i=>100+10*i,
        bulk: i=>Math.floor((i-100)/10+1),

        goalDesc: x=>"Level "+format(x,0),
        goalAmt: ()=>player.level,

        eff: i=>Decimal.pow(2,i),
        effDesc: x=>format(x)+"x",
    },{
        unl: ()=>true,

        max: 10,
        id: 'crystal',

        title: `Reduced Resources`,
        desc: `^0.5 to Grass, XP & PP gain.`,
        reward: `Grass multiplier's exponent is increased by <b class="green">+2%</b> per completion.`,

        goal: i=>50+20*i,
        bulk: i=>Math.floor((i-50)/20+1),

        goalDesc: x=>"Level "+format(x,0),
        goalAmt: ()=>player.level,

        eff: i=>i/50+1,
        effDesc: x=>formatPow(x),
    },{
        unl: ()=>true,

        max: 10,
        id: 'crystal',

        title: `Prestigeless`,
        desc: `You cannot buy any Prestige Upgrades.`,
        reward: `PP gain is increased by <b class="green">100%</b> every completions.`,

        goal: i=>7+i,
        bulk: i=>i-6,

        goalDesc: x=>"Tier "+format(x,0),
        goalAmt: ()=>player.tier,

        eff: i=>Decimal.pow(2,i),
        effDesc: x=>format(x)+"x",
    },{
        unl: ()=>player.sTimes > 0,

        max: 10,
        id: 'steel',

        title: `Reduced Resources II`,
        desc: `^0.5 to Grass, XP, TP, PP & Crystal gain.`,
        reward: `Steel gain is increased by <b class="green">50%</b> every completions.`,

        goal: i=>100+i*20,
        bulk: i=>Math.floor((i-100)/20+1),

        goalDesc: x=>"Level "+format(x,0),
        goalAmt: ()=>player.level,

        eff: i=>Decimal.pow(1.5,i),
        effDesc: x=>format(x)+"x",
    },{
        unl: ()=>player.sTimes > 0,

        max: 10,
        id: 'steel',

        title: `Crystalless`,
        desc: `You cannot buy any Crystal Upgrades.`,
        reward: `Crystal gain is increased by <b class="green">100%</b> every completions.`,

        goal: i=>20+i,
        bulk: i=>i-19,

        goalDesc: x=>"Tier "+format(x,0),
        goalAmt: ()=>player.tier,

        eff: i=>Decimal.pow(2,i),
        effDesc: x=>format(x)+"x",
    },{
        unl: ()=>hasUpgrade('factory',2),

        max: 10,
        id: 'steel',

        title: `Challengerism`,
        desc: `You are trapped in Prestige & Crystal Challenges (except Reduced Resources).`,
        reward: `Charge rate is increased by <b class="green">10x</b> every completions.`,

        goal: i=>40+i*10,
        bulk: i=>Math.floor((i-40)/10+1),

        goalDesc: x=>"Level "+format(x,0),
        goalAmt: ()=>player.level,

        eff: i=>Decimal.pow(10,i),
        effDesc: x=>format(x)+"x",
    },
]

const chalSGoal = (()=>{
    let x = []
    for (let i in CHALS) x.push(CHALS[i].goal(0))
    return x
})()

function inChal(x) {
    let p = player.chal.progress
    return p == x
}

function enterChal(x) {
    if (player.chal.progress != x) {
        if (x == -1) RESET[CHALS[player.chal.progress].id].reset(true)

        player.chal.progress = x

        if (x > -1) RESET[CHALS[x].id].reset(true)
    } else enterChal(-1)
}

function chalEff(x,def=E(1)) { return tmp.chal.eff[x] || def }

tmp_update.push(()=>{
    for (let i in CHALS) {
        let c = player.chal.comp[i]||0
        tmp.chal.goal[i] = CHALS[i].goal(c)
        tmp.chal.eff[i] = CHALS[i].eff(c)
    }
    if (!inChal(-1)) {
        let p = player.chal.progress
        let c = CHALS[p]
        let a = c.goalAmt()
        tmp.chal.amt = a
        tmp.chal.bulk = a >= chalSGoal[p] ? Math.min(c.bulk(a),c.max) : 0
    }
})

el.setup.chal = ()=>{
    let table = new Element('chal_table')
    let html = ``

    for (let i in CHALS) {
        let c = CHALS[i]

        html += `
        <div class="chal_div ${c.id}" id="chal_div_${i}" onclick="enterChal(${i})">
            <h3>${c.title}</h3><br>
            <b class="yellow" id="chal_comp_${i}">0 / 0</b><br><br>
            ${c.desc}<br>
            Reward: ${c.reward}<br>
            Effect: <b class="cyan" id="chal_eff_${i}">???</b>

            <div style="position:absolute; bottom:7px; width:100%;">
                Status: <b class="red" id="chal_pro_${i}">Inactive</b><br>
                <b class="red" id="chal_goal_${i}">Goal: ???</b>
            </div>
        </div>
        `
    }

    table.setHTML(html)
}

el.update.chal = ()=>{
    if (mapID == 'chal') {
        let unl = !tmp.outsideNormal

        tmp.el.chal_unl.setDisplay(unl && player.cTimes == 0)
        tmp.el.chal_div.setDisplay(unl && player.cTimes > 0)

        if (unl) {
            for (let i in CHALS) {
                let c = CHALS[i]

                let unl2 = c.unl()

                tmp.el['chal_div_'+i].setDisplay(unl2)

                if (unl2) {
                    let l = player.chal.comp[i]||0
                    let completed = l >= c.max
                    let a = inChal(-1) ? 0 : tmp.chal.amt

                    tmp.el["chal_comp_"+i].setTxt(format(l,0) + " / " + format(c.max,0))
                    tmp.el["chal_eff_"+i].setHTML(c.effDesc(tmp.chal.eff[i]))
                    tmp.el["chal_pro_"+i].setTxt(completed ? "Completed" : inChal(i) ? "Progress" : "Inactive")
                    tmp.el["chal_pro_"+i].setClasses({[completed ? "green" : inChal(i) ? "yellow" : "red"]: true})

                    tmp.el["chal_goal_"+i].setTxt("Goal: "+c.goalDesc(tmp.chal.goal[i]))
                    tmp.el["chal_goal_"+i].setClasses({[inChal(i) && a >= tmp.chal.goal[i] ? "green" : "red"]: true})
                }
            }
        }
    }
}