const SC_IDS = {
    auto: [
        [0],
        [4,1,'',3,''],
        ['',2,5],
    ],
    speed: [
        [0],
        [7,8,1,'',''],
        [3,4,2,5,6],
    ],
    progress: [
        [0],
        [1,2,3],
        [4,5,6],
    ],
}

const STAR_CHART = {
    auto: [
        {
            title: "Automation Keeper",
            desc: `Keep all automation upgrades on Galactic. <span class="lightblue">Unlock more upgrades.</span>`,

            icon: ['Icons/Assemblerv2','Icons/StarAuto'],
                            
            cost: i => 5,
            bulk: i => 1,
        },
        {
            branch: [0],

            title: "Multi Grasshop",
            desc: `Allow grasshopping multiple times. [not implemented]`,

            icon: ['Icons/Grasshop2','Icons/StarAuto'],
                            
            cost: i => 1000,
            bulk: i => 1,
        },
        {
            branch: [0],

            title: "The Factory Automation",
            desc: `You can now automatically buy the Factory upgrades.`,

            icon: ['Curr/Steel2','Icons/StarAuto'],
                            
            cost: i => 400,
            bulk: i => 1,
        },
        {
            branch: [0],

            title: "Autocut Value Platinum",
            desc: `Autocut value applies to <span class="green">platinum</span>.`,

            icon: ['Curr/Platinum','Icons/StarAuto'],
                            
            cost: i => 500,
            bulk: i => 1,
        },
        {
            branch: [1],

            title: "Multi Grass-Skip",
            desc: `Allow grass-skipping multiple times. [not implemented]`,

            icon: ['Icons/GrassSkip','Icons/StarAuto'],
                            
            cost: i => 25000,
            bulk: i => 1,
        },
        {
            branch: [3],

            title: "Autocut Value Moonstone",
            desc: `Autocut value applies to <span class="green">moonstone</span>.`,

            icon: ['Curr/Moonstone','Icons/StarAuto'],
                            
            cost: i => 5000,
            bulk: i => 1,
        },
    ],
    speed: [
        {
            max: 10,

            title: "Faster Foundry",
            desc: `Divide the time to max foundry bonus by <span class="green">2</span> per level. <span class="lightblue">Unlock Steel Generation upgrade at max level.</span>`,

            icon: ['Icons/Foundry','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(5*2**i),
            bulk: i => i.div(5).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = 0.5**i
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [0],

            title: "Stellar Charger",
            desc: `Increases charge rate by <span class="green">+100%</span> per level. <span class="lightblue">Unlock more upgrades.</span>`,

            icon: ['Icons/Charge','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(15*1.5**i),
            bulk: i => i.div(15).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [1],

            title: "Stellar Charger II",
            desc: `Increases charge rate by <span class="green">+100%</span> per level.`,

            icon: ['Icons/Charge','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(50*1.5**i),
            bulk: i => i.div(50).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [1],

            title: "Stellar Grass",
            desc: `Increases grass gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Grass','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(20*1.5**i),
            bulk: i => i.div(20).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [1],

            title: "Stellar XP",
            desc: `Increases XP gain by <span class="green">+100%</span> per level.`,

            icon: ['Icons/XP','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(20*1.5**i),
            bulk: i => i.div(20).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [1],

            title: "Stellar TP",
            desc: `Increases TP by <span class="green">+100%</span> per level.`,

            icon: ['Icons/TP','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(20*1.5**i),
            bulk: i => i.div(20).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [1],

            title: "Stellar Oil",
            desc: `Increases oil gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Oil','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(20*1.5**i),
            bulk: i => i.div(20).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            unl: _=> starTreeAmt('speed',0)>=10,
            max: 100,
            branch: [0],

            title: "Steel Generation",
            desc: `You can now passively generate <span class="green">+1%</span> of steel gained on reset per level.`,

            icon: ['Curr/Steel2','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(1e4*1.5**i),
            bulk: i => i.div(1e4).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+formatPercent(x)+"/s",
        },
        {
            unl: _=> starTreeAmt('speed',0)>=10,
            max: 1,
            branch: [0],

            title: "Beyond Foundry",
            desc: `Uncap the limit of Foundry effect, but softcap its effect at maxed effect. [not implemented]`,

            icon: ['Icons/Foundry','Icons/StarSpeed'],
                            
            cost: i => 1e3,
            bulk: i => 1,
        },
    ],
    progress: [
        {
            max: 10,

            title: "Stellar Grass Cap",
            desc: `Increase grass cap by <span class="green">250</span> per level. <span class="lightblue">Unlock more upgrades.</span>`,

            icon: ['Icons/MoreGrass','Icons/StarProgression'],
                            
            cost: i => Math.ceil(5*300**i),
            bulk: i => i.div(5).max(1).log(300).floor().toNumber()+1,

            effect(i) {
                let x = 250*i
        
                return x
            },
            effDesc: x => "+"+format(x,0),
        },
        {
            max: 10,
            branch: [0],

            title: "Stellar Autocut",
            desc: `Increase auto cut amount by <span class="green">3</span> per level.`,

            icon: ['Curr/Grass','Icons/StarProgression'],
                            
            cost: i => Math.ceil(20*100**i),
            bulk: i => i.div(20).max(1).log(100).floor().toNumber()+1,

            effect(i) {
                let x = 3*i
        
                return x
            },
            effDesc: x => "+"+format(x,0),
        },
        {
            max: 10,
            branch: [0],

            title: "Space Power",
            desc: `Increase SP (Space Power) gained by <span class="green">+100%</span> per level. <span class="lightblue">Unlock more upgrades.</span>`,

            icon: ['Curr/SP','Icons/StarProgression'],
                            
            cost: i => Math.ceil(15*1.6**i),
            bulk: i => i.div(15).max(1).log(1.6).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 9,
            branch: [0],

            title: "Stellar ACS",
            desc: `Decreases auto cut time by <span class="green">.01s</span> per level.`,

            icon: ['Icons/Speed','Icons/StarProgression'],
                            
            cost: i => Math.ceil(4000*1e3**i),
            bulk: i => i.div(4000).max(1).log(1e3).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "-"+format(x,2),
        },
        {
            max: 10,
            branch: [2],

            title: "Stellar Scaled Level",
            desc: `Increase first scaled level starting by <span class="green">+10%</span> per level.`,

            icon: ['Icons/XP','Icons/StarProgression'],
                            
            cost: i => Math.ceil(200*3**i**1.15),
            bulk: i => i.div(200).max(1).log(3).root(1.15).floor().toNumber()+1,

            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => formatMult(x)+" later",
        },
        {
            max: 10,
            branch: [2],

            title: "Space Power II",
            desc: `Increase SP (Space Power) gained by <span class="green">+100%</span> per level.`,

            icon: ['Curr/SP','Icons/StarProgression'],
                            
            cost: i => Math.ceil(300*1.6**i),
            bulk: i => i.div(300).max(1).log(1.6).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [2],

            title: "Anti-Tier Boost",
            desc: `Tier multiplier (base of 2) in anti-realm gives a <span class="green">+^0.05</span> boost to Grass, XP & TP.`,

            icon: ['Icons/TP','Icons/StarProgression'],
                            
            cost: i => Math.ceil(400*10**i**1.25),
            bulk: i => i.div(400).max(1).log(10).root(1.25).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(2,player.aRes.tier).pow(i/20)
        
                return x
            },
            effDesc: x => formatMult(x),
        },
    ],
}

function drawTree() {
	if (!retrieveCanvasData2()) return;
	tree_ctx.clearRect(0, 0, tree_canvas.width, tree_canvas.height);
    for (let id in STAR_CHART) if (tmp.sc_tab == id) {
        for (let i = 0; i < STAR_CHART[id].length; i++) {
            let tu = STAR_CHART[id][i]

            let branch = tu.branch||[]

            if (branch.length > 0 && tmp.sc_unl[id][i]) for (let y in branch) if (tmp.sc_unl[id][y]) {
                drawTreeBranch(id, branch[y], i)
            }
        }
	}
}

function treeCanvas() {
    if (!retrieveCanvasData2()) return
    if (tree_canvas && tree_ctx) {
        window.addEventListener("resize", resizeCanvas2)

        tree_canvas.width = tree_canvas.clientWidth
        tree_canvas.height = tree_canvas.clientHeight
    }
}

function drawTreeBranch(id, num1, num2) {
    var start = document.getElementById("sc_upg_"+id+num1).getBoundingClientRect();
    var end = document.getElementById("sc_upg_"+id+num2).getBoundingClientRect();
    var x1 = start.left + (start.width / 2) - (document.body.scrollWidth-tree_canvas.width)/2;
    var y1 = start.top + (start.height / 2) - (window.innerHeight-tree_canvas.height) + 90;
    var x2 = end.left + (end.width / 2) - (document.body.scrollWidth-tree_canvas.width)/2;
    var y2 = end.top + (end.height / 2) - (window.innerHeight-tree_canvas.height) + 90;
    tree_ctx.lineWidth=10;
    tree_ctx.beginPath();
    let color = "#00520b"
    tree_ctx.strokeStyle = "#fff"
    tree_ctx.moveTo(x1, y1);
    tree_ctx.lineTo(x2, y2);
    tree_ctx.stroke();
}

el.setup.star_chart = _=>{
    let nt = new Element("star_chart_table")
    let h = ""

    for (let id in SC_IDS) {
        h += `<div id="star_chart_${id}">`

        let t = SC_IDS[id]

        for (let y in t) {
            h += `<div class="table_center">`

            for (let x in t[y]) {
                let i = t[y][x]

                let h2 = ""

                if (Number.isInteger(i) || i != "") {
                    let tu = STAR_CHART[id][i]
                    let icon = ['Bases/SpaceBase']
                    if (tu.icon) for (ic in tu.icon) icon.push(tu.icon[ic])
                    else icon.push('Icons/Placeholder')

                    h2 += `
                    <div class="sc_upg_ctn" id="sc_upg_${id}${i}" onclick="tmp.sc_choosed = ['${id}',${i}]">`
                    for (ic in icon) h2 += `<img draggable="false" src="${"images/"+icon[ic]+".png"}">`
                    
                    h2 += `
                        <div id="sc_upg_${id}${i}_cost" class="scu_cost">??? Stars</div>
                        <div id="sc_upg_${id}${i}_amt" class="scu_amt">0</div>
                    </div>
                    `
                }

                h += `
                <div class="sc_upg_div">
                    ${h2}
                </div>
                `
            }

            h += `</div>`
        }

        h += `</div>`
    }

    nt.setHTML(h)
}

const SC_SCOST = {}

function hasStarTree(id,i) { return player.star_chart[id][i]>0 }
function starTreeEff(id,i,def=1) { return tmp.star_chart[id].eff[i]||def }
function starTreeAmt(id,i) { return player.star_chart[id][i]||0 }

function updateSCTemp() {
    let star = player.stars

    for (let id in STAR_CHART) {
        let tt = tmp.star_chart[id]

        for (let i = 0; i < STAR_CHART[id].length; i++) {
            let tu = STAR_CHART[id][i]
            let amt = player.star_chart[id][i]||0

            tt.max[i] = tu.max||1
            tt.cost[i] = tu.cost(amt)
            tt.bulk[i] = Decimal.gte(star,SC_SCOST[id][i])?Math.min(tu.bulk(star),tt.max[i]):0

            let unl = tu.unl?tu.unl():true
            let afford = star.gte(tt.cost[i])
            if (tu.branch) for (let y in tu.branch) if (!hasStarTree(id,tu.branch[y])) {
                afford = false
                unl = false
                break
            }

            tmp.sc_afford[id][i] = afford
            tmp.sc_unl[id][i] = unl

            if (tu.effect) tt.eff[i] = tu.effect(amt)
        }
    }
}

tmp_update.push(_=>{
    updateSCTemp()
})

function buySCUpgrade(id,x) {
    let tu = tmp.star_chart[id]

    let amt = player.star_chart[id]

    if ((amt[x]||0) < tu.max[x]) if (Decimal.gte(player.stars,tu.cost[x])) {

        player.stars = player.stars.sub(tu.cost[x]).max(0)
        amt[x] = amt[x] ? amt[x] + 1 : 1

        updateSCTemp()
    }
}

function buyNextSCUpgrade(id,x) {
	let tu = tmp.star_chart[id]

    let upg = STAR_CHART[id][x]
    let amt = player.star_chart[id]
	let amt2 = amt[x]||0

	if (amt2 < tu.max[x] && Decimal.gte(player.stars,tu.cost[x])) {
		let bulk = Math.min(tu.bulk[x], Math.ceil((amt2 + 1) / 25) * 25)

		if (bulk > amt2) {
			let cost = upg.cost(bulk-1)

			amt[x] = Math.min(amt[x] ? Math.max(amt[x],bulk) : bulk,tu.max[x])
			player.stars = player.stars.sub(cost).max(0)

			updateSCTemp()
		}
	}
}

function buyMaxSCUpgrade(id,x) {
    let tu = tmp.star_chart[id]

    let upg = STAR_CHART[id][x]

    if (true) {
        let amt = player.star_chart[id]
	    let amt2 = amt[x]||0

        if (amt2 < tu.max[x]) if (Decimal.gte(player.stars,tu.cost[x])) {
            let bulk = tu.bulk[x]

            if (bulk > amt2) {
                let cost = upg.cost(bulk-1)

                amt[x] = Math.min(amt[x] ? Math.max(amt[x],bulk) : bulk,tu.max[x])
                player.stars = player.stars.sub(cost).max(0)

                updateSCTemp()
            }
        }
    }
}

function updateStarChart() {
    let star = player.stars
    let ch = tmp.sc_choosed

    tmp.el.starAmt.setTxt(star.format(0))

    tmp.el.sc_desc_div.setDisplay(ch[0])
    if (ch[0]) {
        let [id, i] = ch
        let tt = tmp.star_chart[id]
        let tu = STAR_CHART[id][i]
        let amt = player.star_chart[id][i]||0

        tmp.el.sc_title.setHTML(`[${id}-#${i}] <h3>${tu.title}</h3>`)

        let h = `
        Level <b class="yellow">${format(amt,0)}${tt.max[i] < Infinity ? ` / ${format(tt.max[i],0)}` : ""}</b><br>
        ${tu.desc}
        `

        if (tu.effDesc) h += '<br>Effect: <span class="cyan">'+tu.effDesc(tt.eff[i])+"</span>"

        if (amt < tt.max[i]) {
            let m = Math.min(25,tt.max[i]-Math.floor(amt/25)*25)
            let cost2 = tu.costOnce?Decimal.mul(tt.cost[i],m-amt%m):tu.cost((Math.floor(amt/m)+1)*m-1)//upg.cost(amt+25)
            
            h += `
            <br><span class="${Decimal.gte(star,cost2)?"green":"red"}">Cost to next 25: ${format(cost2,0)} Stars</span>
            <br><span class="${Decimal.gte(star,tt.cost[i])?"green":"red"}">Cost: ${format(tt.cost[i],0)} Stars</span>
            ` // <br>You have ${format(res,0)} Stars
        }

        tmp.el.sc_desc.setHTML(h)
    }

    for (let id in STAR_CHART) {
        let d = tmp.sc_tab == id
        let tt = tmp.star_chart[id]

        tmp.el["star_chart_"+id].setDisplay(d)

        if (d) for (let i = 0; i < STAR_CHART[id].length; i++) {
            let id2 = "sc_upg_"+id+i
            let ud = tmp.el[id2]

            if (!ud) continue

            let unl = tmp.sc_unl[id][i]

            tmp.el[id2].setClasses({sc_upg_ctn: true, choosed: ch[0] == id && ch[1] == i})
            tmp.el[id2].setDisplay(unl)

            if (id2) {
                let amt = player.star_chart[id][i]||0

                tmp.el[id2+"_amt"].setTxt(amt)
                tmp.el[id2+"_cost"].setTxt(amt < tt.max[i] ? format(tt.cost[i],0,6)+" Stars" : "Maxed")
                tmp.el[id2+"_cost"].setClasses({scu_cost: true, locked: star.lt(tt.cost[i]) && amt < tt.max[i]})
            }
        }
    }
}