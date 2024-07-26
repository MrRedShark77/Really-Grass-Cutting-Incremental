const ACCOM = {
    ctn: [
        {
            unl:()=>true,
            name: "Just Prestige",
            layer: "prestige",
            max: 10,

            reward: a => a.pow_base(4),
            rewardName: "Grass bonus",
            rewardDisplay: x => formatMult(x,0),

            get res() { return LEVELS.xp.level },
            goal: a => a.mul(20).add(201),
            bulk: a => a.sub(181).div(20).floor(),
            goalDisplay: x => "Level "+format(x,0),
        },{
            unl:()=>true,
            name: "Less Grass",
            layer: "prestige",
            max: 10,

            restriction: {
                get value() { return calculateTotalUpgrades('grass') },
                limit: 100,
                name: "Grass upgrades bought:",
            },

            reward: a => a.pow_base(3),
            rewardName: "Experience bonus",
            rewardDisplay: x => formatMult(x,0),

            get res() { return LEVELS.xp.level },
            goal: a => a.mul(20).add(131),
            bulk: a => a.sub(111).div(20).floor(),
            goalDisplay: x => "Level "+format(x,0),
        },{
            unl:()=>true,
            name: "Grassless",
            layer: "prestige",
            max: 10,

            restriction: {
                get value() { return calculateTotalUpgrades('grass') },
                limit: 0,
                name: "Grass upgrades bought:",
            },

            reward: a => a.pow_base(3),
            rewardName: "Tier progress bonus",
            rewardDisplay: x => formatMult(x,0),

            get res() { return LEVELS.xp.level },
            goal: a => a.mul(20).add(131),
            bulk: a => a.sub(111).div(20).floor(),
            goalDisplay: x => "Level "+format(x,0),
        },{
            unl:()=>true,
            name: "Prestige Speedrun",
            layer: "prestige",
            max: 10,

            restriction: {
                get value() { return player.prestige.time },
                limit: 60,
                name: "Time since last prestige:",
            },

            reward: a => a.pow_base(2),
            rewardName: "PP bonus",
            rewardDisplay: x => formatMult(x),

            get res() { return LEVELS.xp.level },
            goal: a => a.mul(20).add(201),
            bulk: a => a.sub(181).div(20).floor(),
            goalDisplay: x => "Level "+format(x,0),
        },{
            unl:()=>true,
            name: "Just Crystallize",
            layer: "crystal",
            max: 10,

            reward: a => a,
            rewardName: "Perks bonus",
            rewardDisplay: x => "+"+format(x,0),

            get res() { return LEVELS.tp.level },
            goal: a => a.mul(2).add(20),
            bulk: a => a.sub(18).div(2).floor(),
            goalDisplay: x => "Tier "+format(x,0),
        },{
            unl:()=>true,
            name: "Less Prestige",
            layer: "crystal",
            max: 5,

            restriction: {
                get value() { return calculateTotalUpgrades('prestige') },
                limit: 10,
                name: "Prestige upgrades bought:",
            },

            reward: a => a.pow_base(1.5),
            rewardName: "Crystals bonus",
            rewardDisplay: x => formatMult(x),

            get res() { return LEVELS.tp.level },
            goal: a => a.mul(2).add(15),
            bulk: a => a.sub(13).div(2).floor(),
            goalDisplay: x => "Tier "+format(x,0),
        },{
            unl:()=>true,
            name: "Prestigeless",
            layer: "crystal",
            max: 5,

            restriction: {
                get value() { return calculateTotalUpgrades('prestige') },
                limit: 0,
                name: "Prestige upgrades bought:",
            },

            reward: a => a.pow_base(2),
            rewardName: "Grass bonus",
            rewardDisplay: x => formatMult(x),

            get res() { return LEVELS.tp.level },
            goal: a => a.mul(2).add(15),
            bulk: a => a.sub(13).div(2).floor(),
            goalDisplay: x => "Tier "+format(x,0),
        },{
            unl:()=>true,
            name: "Less Grass II",
            layer: "crystal",
            max: 10,

            restriction: {
                get value() { return calculateTotalUpgrades('grass') },
                limit: 25,
                name: "Grass upgrades bought:",
            },

            reward: a => a.mul(.001),
            rewardName: "Platinum grow chance bonus",
            rewardDisplay: x => "+"+formatPercent(x),

            get res() { return LEVELS.tp.level },
            goal: a => a.mul(2).add(15),
            bulk: a => a.sub(13).div(2).floor(),
            goalDisplay: x => "Tier "+format(x,0),
        },{
            unl:()=>true,
            name: "Crystallize Speedrun",
            layer: "crystal",
            max: 10,

            restriction: {
                get value() { return player.crystal.time },
                limit: 600,
                name: "Time since last crystallize:",
            },

            reward: a => a.pow_base(1.5),
            rewardName: "Crystals bonus",
            rewardDisplay: x => formatMult(x),

            get res() { return LEVELS.tp.level },
            goal: a => a.mul(2).add(20),
            bulk: a => a.sub(18).div(2).floor(),
            goalDisplay: x => "Tier "+format(x,0),
        },{
            unl:()=>player.grasshop.gte(8),
            name: "Empower",
            layer: "steelie",
            max: 10,

            restriction: {
                get value() { return player.steelie.time },
                limit: 60,
                name: "Time since last steelie:",
            },

            reward: a => a.pow_base(10),
            rewardName: "Charge Rate bonus",
            rewardDisplay: x => formatMult(x),

            get res() { return LEVELS.xp.level },
            goal: a => a.scale(4,2,"L").mul(10).add(271),
            bulk: a => a.sub(271).div(10).scale(4,2,"L",true).add(1).floor(),
            goalDisplay: x => "Level "+format(x,0),
        },
    ],

    check(layer) {
        if (player.grasshop.gte(1)) for (let i = 0; i < this.ctn.length; i++) {
            let a = this.ctn[i], rest = a.restriction, amt = player.accomplishments[i], res = a.res
            if (a.unl() && amt.lt(a.max) && a.layer === layer && (!rest || Decimal.lte(rest.value, rest.limit)) && res.gte(a.goal(amt))) player.accomplishments[i] = a.bulk(res).max(amt.add(1)).min(a.max);
        }
    },

    colors: {
        prestige: "#13BDE7",
        crystal: "magenta",
        steelie: "#ccc",
    },

    setup() {
        createGridElement('accomplishments',{
            unl: ()=>player.grasshop.gte(1),
            pos: [1,3],
            size: [5,1],
            class: 'fill-div',
            style: { backgroundColor: '#e20074' },
            get html() {
                let h = `<div class='reset-name'>Accomplishments</div>`
                
                let hh = ""

                for (let i = 0; i < ACCOM.ctn.length; i++) {
                    let a = ACCOM.ctn[i], html = ""

                    html += `<div><h4 id='accomplishment-${i}-status'>${a.name}</h4><br><h4 id='accomplishment-${i}-amount' style='color: yellow'>0 / 0</h4></div>`

                    if ('restriction' in a) html += `<div class='accomplishment-rest' id='accomplishment-${i}-rest'>???</div>`;

                    html += `<div class='accomplishment-reward' id='accomplishment-${i}-reward'>???</div>`

                    html += `<div class='accomplishment-goal'><h4 id='accomplishment-${i}-goal'>Goal: ???</h4></div>`

                    hh += `<div class='accomplishment-div' style='background-color: ${ACCOM.colors[a.layer] ?? '#ccc'}' id='accomplishment-${i}-div'>${html}</div>`
                }

                h += `<div class='accomplishments-table'>${hh}</div>`

                return h
            },
            updateHTML() {
                for (let i = 0; i < ACCOM.ctn.length; i++) {
                    let a = ACCOM.ctn[i], unl = a.unl()

                    el(`accomplishment-${i}-div`).style.display = el_display(unl)
                    if (unl) {
                        let max = a.max, amt = player.accomplishments[i], res = a.res, el_id = `accomplishment-${i}`, goal = a.goal(amt)
                        
                        el(el_id+"-amount").innerHTML = format(amt,0) + " / " + format(max,0)

                        let rest = a.restriction, penalty = false
                        
                        if (rest) {
                            let val = rest.value
                            
                            penalty = Decimal.gt(val,rest.limit)

                            el(`accomplishment-${i}-rest`).innerHTML = rest.name + `<br><b class='${penalty ? 'red' : 'green'}'>${format(val,0) + " / " + format(rest.limit,0)}</b>`
                        }

                        el(el_id+"-status").style.color = amt.gte(max) ? 'pink' : penalty ? 'red' : res.gte(goal) ? 'lime' : 'orange'

                        el(el_id+"-reward").innerHTML = a.rewardName+": <b class='green'>"+a.rewardDisplay(a.reward(amt))+"</b> ➜ <b class='yellow'>"+a.rewardDisplay(a.reward(amt.add(1)))+'</b>'
                        el(el_id+"-goal").innerHTML = "Goal: "+a.goalDisplay(goal)
                    }
                }
            },
        })
    },
}

function getAccomplishmentBonus(id) { return ACCOM.ctn[id].reward(player.accomplishments[id]) }