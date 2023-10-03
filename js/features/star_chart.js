const SC_IDS = {
    auto: [
        [4,1,0,3,9],
        [13,12,2,5,''],
        [6,7,8],
        ['','',10,11,14],
    ],
    speed: [
        [0],
        [7,8,1,'',''],
        [3,4,2,5,6],
        [10,11,9,12,13],
        [15,16,14,17,18],
    ],
    progress: [
        [0],
        [1,2,3],
        [4,5,6],
        [7,9,8,12,''],
        [13,11,10,14,''],
    ],
    ring: [
        [0],
        [4,'',1,2,3],
        [9,5,6,7,8],
        [14,10,11,12,13],
        [19,15,16,17,18],
        [24,20,21,22,23],
        [29,25,26,27,28],
        [34,30,31,32,33],
        [38,35,36,37,40],
        ['',39,'','',''],
        [41,42,43,44,45],
    ],
    reserv: [
        [22,7,0,6,15],
        [1,2,3,4,5],
        [8,9,11,14,10],
        [12,13,19,16,21],
        [17,18,23,20,29],
        [25,24,27,28,''],
        [33,26,'',30,''],
        [35,31,'','',''],
        ['',32,'','',''],
        ['',34,'','',''],
        ['',36,'','',''],
        ['',37,'','',''],
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
            desc: `Allow grasshopping multiple times. (change in options)`,

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
            desc: `Allow grass-skipping multiple times. (change in options)`,

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
        {
            branch: [2],

            title: "Foundry Autobuy",
            desc: `Automate Foundry upgrades.`,

            icon: ['Icons/Foundry','Icons/StarAuto'],
                            
            cost: i => 2500,
            bulk: i => 1,
        },
        {
            branch: [2],

            title: "Generator Autobuy",
            desc: `Automate Generator upgrades.`,

            icon: ['Icons/Generator','Icons/StarAuto'],
                            
            cost: i => 2500,
            bulk: i => 1,
        },
        {
            branch: [2],

            title: "Assembler Autobuy",
            desc: `Automate Assembler upgrades.`,

            icon: ['Icons/Assemblerv2','Icons/StarAuto'],
                            
            cost: i => 2500,
            bulk: i => 1,
        },
        {
            branch: [3],

            title: "Platinum Upgrade Autobuy",
            desc: `Automate Platinum upgrades.`,

            icon: ['Curr/Platinum','Icons/StarAuto'],
                            
            cost: i => 10000,
            bulk: i => 1,
        },
        {
            branch: [6,7,8],

            title: "Rocket Fuel Automation",
            desc: `Automate Rocket Fuel, it will no longer spend resources.`,

            icon: ['Curr/RocketFuel','Icons/StarAuto'],
                            
            cost: i => 1000000,
            bulk: i => 1,
        },
        {
            branch: [10],

            title: "Momentum Autobuy",
            desc: `Automate Momentum upgrades, they no longer spend Momentum.`,

            icon: ['Curr/Momentum','Icons/StarAuto'],
                            
            cost: i => 1e15,
            bulk: i => 1,
        },
        {
            branch: [1],

            title: "Auto-Grasshop",
            desc: `Automate Grasshop. (change in grasshop)`,

            icon: ['Icons/Grasshop2','Icons/StarAuto'],
                            
            cost: i => 1e5,
            bulk: i => 1,
        },
        {
            branch: [4],

            title: "Auto-Grass-skip",
            desc: `Automate Grass-skip. (change in grass-skip)`,

            icon: ['Icons/GrassSkip','Icons/StarAuto'],
                            
            cost: i => 2.5e5,
            bulk: i => 1,
        },
        {
            branch: [11],

            title: "Rocket Part Autobuy",
            desc: `Automate Rocket Part, and it no longer resets anything except rocket fuel.`,

            icon: ['Curr/RocketFuel','Icons/StarAuto'],
                            
            cost: i => 1e24,
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
            unl: ()=> starTreeAmt('speed',0)>=10,
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
            unl: ()=> starTreeAmt('speed',0)>=10,
            max: 1,
            branch: [0],

            title: "Beyond Foundry",
            desc: `Uncap the limit of Foundry effect, but softcap its effect at maxed effect.`,

            icon: ['Icons/Foundry','Icons/StarSpeed'],
                            
            cost: i => 1e3,
            bulk: i => 1,
        },
        {
            max: 10,
            branch: [2],

            title: "Stellar Charger III",
            desc: `Increases charge rate by <span class="green">+100%</span> per level.`,

            icon: ['Icons/Charge','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(1000*1.75**i),
            bulk: i => i.div(1000).max(1).log(1.75).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [2],

            title: "Stellar Grass II",
            desc: `Increases grass gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Grass','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(500*1.75**i),
            bulk: i => i.div(500).max(1).log(1.75).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [2],

            title: "Stellar XP II",
            desc: `Increases XP gain by <span class="green">+100%</span> per level.`,

            icon: ['Icons/XP','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(500*1.75**i),
            bulk: i => i.div(500).max(1).log(1.75).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [2],

            title: "Stellar TP II",
            desc: `Increases TP by <span class="green">+100%</span> per level.`,

            icon: ['Icons/TP','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(500*1.75**i),
            bulk: i => i.div(500).max(1).log(1.75).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [2],

            title: "Stellar Oil II",
            desc: `Increases oil gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Oil','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(500*1.75**i),
            bulk: i => i.div(500).max(1).log(1.75).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [9],

            title: "Stellar Charger IV",
            desc: `Increases charge rate by <span class="green">+100%</span> per level.`,

            icon: ['Icons/Charge','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(1e6*2**i),
            bulk: i => i.div(1e6).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [9],

            title: "Stellar Grass III",
            desc: `Increases grass gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Grass','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(100000*2**i),
            bulk: i => i.div(100000).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [9],

            title: "Stellar XP III",
            desc: `Increases XP gain by <span class="green">+100%</span> per level.`,

            icon: ['Icons/XP','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(100000*2**i),
            bulk: i => i.div(100000).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [9],

            title: "Stellar TP III",
            desc: `Increases TP by <span class="green">+100%</span> per level.`,

            icon: ['Icons/TP','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(100000*2**i),
            bulk: i => i.div(100000).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [9],

            title: "Stellar Oil III",
            desc: `Increases oil gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Oil','Icons/StarSpeed'],
                            
            cost: i => Math.ceil(100000*2**i),
            bulk: i => i.div(100000).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
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

            icon: ['Icons/SP','Icons/StarProgression'],
                            
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
                            
            cost: i => Math.ceil(4000*10**i),
            bulk: i => i.div(4000).max(1).log(10).floor().toNumber()+1,

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
            desc: `Increase SP (Space Power) gained by <span class="green">+100%</span> per level. <span class="lightblue">Unlock more upgrades.</span>`,

            icon: ['Icons/SP','Icons/StarProgression'],
                            
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
        {
            max: 10,
            branch: [4],

            title: "Stellar Scaled Level II",
            desc: `Increase second scaled level starting by <span class="green">+5%</span> per level.`,

            icon: ['Icons/XP','Icons/StarProgression'],
                            
            cost: i => Math.ceil(10000*5**i**1.2),
            bulk: i => i.div(10000).max(1).log(5).root(1.2).floor().toNumber()+1,

            effect(i) {
                let x = i/20+1
        
                return x
            },
            effDesc: x => formatMult(x)+" later",
        },
        {
            max: 10,
            branch: [5],

            title: "Space Power III",
            desc: `Increase SP (Space Power) gained by <span class="green">+100%</span> per level.`,

            icon: ['Icons/SP','Icons/StarProgression'],
                            
            cost: i => Math.ceil(3000*1.8**i),
            bulk: i => i.div(3000).max(1).log(1.8).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [5],

            title: "More Rocket Fuels",
            desc: `Increase rocket fuel's cheapness by <span class="green">+5%</span> per level.`,

            icon: ['Curr/RocketFuel','Icons/StarProgression'],
                            
            cost: i => Math.ceil(5000*5**i),
            bulk: i => i.div(5000).max(1).log(5).floor().toNumber()+1,

            effect(i) {
                let x = i/20+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [8],

            title: "Space Power IV",
            desc: `Increase SP (Space Power) gained by <span class="green">+100%</span> per level.`,

            icon: ['Icons/SP','Icons/StarProgression'],
                            
            cost: i => Math.ceil(1e9*2**i),
            bulk: i => i.div(1e9).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [9],

            title: "More Rocket Fuels II",
            desc: `Increase rocket fuel's cheapness by <span class="green">+5%</span> per level.`,

            icon: ['Curr/RocketFuel','Icons/StarProgression'],
                            
            cost: i => Math.ceil(1e12*8**i),
            bulk: i => i.div(1e12).max(1).log(8).floor().toNumber()+1,

            effect(i) {
                let x = i/20+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [6],

            title: "Tier to SP Boost",
            desc: `<span class="green">+0.005</span> to base that boosts SP by Tier per level. (starting base is 1)`,

            icon: ['Icons/TP','Icons/StarProgression'],
                            
            cost: i => Math.ceil(1e14*10**i**1.3),
            bulk: i => i.div(1e14).max(1).log(10).root(1.3).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1+i/200,player.tier)
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 10,
            branch: [7],

            title: "Level Threshold",
            desc: `Decrease level threshold by <span class="green">1%</span> per level.`,

            icon: ['Icons/XP','Icons/StarProgression'],
                            
            cost: i => Math.ceil(1e33*5**i**1.2),
            bulk: i => i.div(1e33).max(1).log(5).root(1.2).floor().toNumber()+1,

            effect(i) {
                let x = i/100+1
        
                return x
            },
            effDesc: x => "/"+format(x,2),
        },
        {
            max: 10,
            branch: [12],

            title: "Tier Threshold",
            desc: `Decrease tier threshold by <span class="green">1%</span> per level.`,

            icon: ['Icons/TP','Icons/StarProgression'],
                            
            cost: i => Math.ceil(1e34*6**i**1.25),
            bulk: i => i.div(1e34).max(1).log(6).root(1.25).floor().toNumber()+1,

            effect(i) {
                let x = i/100+1
        
                return x
            },
            effDesc: x => "/"+format(x,2),
        },
    ],
    ring: [
        {
            max: 100,

            title: "Welcome to the Planetarium",
            desc: `Increase planetarium gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Planetoid'],
                            
            cost: i => Math.ceil(1*1.5**i),
            bulk: i => i.div(1).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [0],

            title: "Basic Cosmic",
            desc: `Increase cosmic gain by <span class="green">+50%</span> per level.`,

            icon: ['Icons/XP2'],
                            
            cost: i => Math.ceil(3*1.6**i),
            bulk: i => i.div(3).max(1).log(1.6).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [0],

            title: "Basic XP",
            desc: `Increase XP gain by <span class="green">+200%</span> per level.`,

            icon: ['Icons/XP'],
                            
            cost: i => Math.ceil(5*1.6**i),
            bulk: i => i.div(5).max(1).log(1.6).floor().toNumber()+1,

            effect(i) {
                let x = i*2+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [0],

            title: "Basic TP",
            desc: `Increase TP gain by <span class="green">+200%</span> per level.`,

            icon: ['Icons/TP'],
                            
            cost: i => Math.ceil(5*1.6**i),
            bulk: i => i.div(5).max(1).log(1.6).floor().toNumber()+1,

            effect(i) {
                let x = i*2+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [0],

            title: "Basic Planetarium",
            desc: `Increase planetarium gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Planetoid'],
                            
            cost: i => Math.ceil(10*1.6**i),
            bulk: i => i.div(10).max(1).log(1.6).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },

        {
            max: 100,
            branch: [4],

            title: "Basic Observatorium",
            desc: `Increase observatorium gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Observatorium'],
                            
            cost: i => Math.ceil(20*1.6**i),
            bulk: i => i.div(20).max(1).log(1.6).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [4],

            title: "Basic SP",
            desc: `Increase SP gain by <span class="green">+100%</span> per level.`,

            icon: ['Icons/SP'],
                            
            cost: i => Math.ceil(30*1.6**i),
            bulk: i => i.div(30).max(1).log(1.6).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [4],

            title: "Basic Grass Cap",
            desc: `Increase grass cap by <span class="green">+20%</span> per level.`,

            icon: ['Icons/MoreGrass'],
                            
            cost: i => Math.ceil(50*1.6**i),
            bulk: i => i.div(50).max(1).log(1.6).floor().toNumber()+1,

            effect(i) {
                let x = i/5+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 5,
            branch: [4],

            title: "Basic Reservatorium",
            desc: `<span class="green">+1%</span> of your observatorium will be converted to reservatorium on forming the ring.`,

            icon: ['Curr/Res4'],
                            
            cost: i => Math.ceil(100*2**i**1.25),
            bulk: i => i.div(100).max(1).log(2).root(1.25).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+format(x*100,0)+"%",
        },

        {
            max: 100,
            branch: [4],

            title: "Intermediate Planetarium",
            desc: `Increase planetarium gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Planetoid'],
                            
            cost: i => Math.ceil(250*1.7**i),
            bulk: i => i.div(250).max(1).log(1.7).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [9],

            title: "Intermediate Star",
            desc: `Increase star gain by <span class="green">+50%</span> per level.`,

            icon: ['Curr/Star'],
                            
            cost: i => Math.ceil(300*1.7**i),
            bulk: i => i.div(300).max(1).log(1.7).floor().toNumber()+1,

            effect(i) {
                let x = i/2+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [9],

            title: "Intermediate Observatorium",
            desc: `Increase observatorium gain by <span class="green">+25%</span> per level.`,

            icon: ['Curr/Observatorium'],
                            
            cost: i => Math.ceil(500*1.7**i),
            bulk: i => i.div(500).max(1).log(1.7).floor().toNumber()+1,

            effect(i) {
                let x = i/4+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 5,
            branch: [9],

            title: "Intermediate Reservatorium",
            desc: `<span class="green">+1%</span> of your observatorium will be converted to reservatorium on forming the ring.`,

            icon: ['Curr/Res4'],
                            
            cost: i => Math.ceil(1000*2.2**i**1.25),
            bulk: i => i.div(1000).max(1).log(2.2).root(1.25).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+format(x*100,0)+"%",
        },
        {
            max: 100,
            branch: [9],

            title: "Intermediate Cosmic",
            desc: `Increase cosmic gain by <span class="green">+50%</span> per level.`,

            icon: ['Icons/XP2'],
                            
            cost: i => Math.ceil(2000*1.7**i),
            bulk: i => i.div(2000).max(1).log(1.7).floor().toNumber()+1,

            effect(i) {
                let x = i/2+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },

        {
            max: 100,
            branch: [9],

            title: "Advanced Planetarium",
            desc: `Increase planetarium gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Planetoid'],
                            
            cost: i => Math.ceil(3e4*1.8**i),
            bulk: i => i.div(3e4).max(1).log(1.8).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [14],

            title: "Advanced Observatorium",
            desc: `Increase observatorium gain by <span class="green">+25%</span> per level.`,

            icon: ['Curr/Observatorium'],
                            
            cost: i => Math.ceil(5e4*1.8**i),
            bulk: i => i.div(5e4).max(1).log(1.8).floor().toNumber()+1,

            effect(i) {
                let x = i/4+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [14],

            title: "Intermediate SP",
            desc: `Increase SP gain by <span class="green">+100%</span> per level.`,

            icon: ['Icons/SP'],
                            
            cost: i => Math.ceil(1e5*1.7**i),
            bulk: i => i.div(1e5).max(1).log(1.7).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [14],

            title: "Advanced Cosmic",
            desc: `Increase cosmic gain by <span class="green">+50%</span> per level.`,

            icon: ['Icons/XP2'],
                            
            cost: i => Math.ceil(3e5*1.8**i),
            bulk: i => i.div(3e5).max(1).log(1.8).floor().toNumber()+1,

            effect(i) {
                let x = i/2+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [14],

            title: "Astrolabe",
            desc: `Increase astro gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Astrolabe'],
                            
            cost: i => Math.ceil(1e6*2**i),
            bulk: i => i.div(1e6).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },

        {
            max: 100,
            branch: [14],

            title: "Powerful Planetarium",
            desc: `Increase planetarium gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Planetoid'],
                            
            cost: i => Math.ceil(2e6*1.9**i),
            bulk: i => i.div(2e6).max(1).log(1.9).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [19],

            title: "Powerful Observatorium",
            desc: `Increase observatorium gain by <span class="green">+25%</span> per level.<br>On first purchase, increase observatorium chance to <span class="green">1%</span>.`,

            icon: ['Curr/Observatorium'],
                            
            cost: i => Math.ceil(4e6*1.9**i),
            bulk: i => i.div(4e6).max(1).log(1.9).floor().toNumber()+1,

            effect(i) {
                let x = i/4+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [19],

            title: "Powerful Cosmic",
            desc: `Increase cosmic gain by <span class="green">+50%</span> per level.`,

            icon: ['Icons/XP2'],
                            
            cost: i => Math.ceil(1e7*1.9**i),
            bulk: i => i.div(1e7).max(1).log(1.9).floor().toNumber()+1,

            effect(i) {
                let x = i/2+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [19],

            title: "Advanced Star",
            desc: `Increase star gain by <span class="green">+50%</span> per level.`,

            icon: ['Curr/Star'],
                            
            cost: i => Math.ceil(2.5e7*1.8**i),
            bulk: i => i.div(2.5e7).max(1).log(1.8).floor().toNumber()+1,

            effect(i) {
                let x = i/2+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [19],

            title: "Advanced SP",
            desc: `Increase SP gain by <span class="green">+100%</span> per level.`,

            icon: ['Icons/SP'],
                            
            cost: i => Math.ceil(1e8*1.8**i),
            bulk: i => i.div(1e8).max(1).log(1.8).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },

        {
            max: 100,
            branch: [19],

            title: "Mega Planetarium",
            desc: `Increase planetarium gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Planetoid'],
                            
            cost: i => Math.ceil(1e9*2**i),
            bulk: i => i.div(1e9).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [24],

            title: "Mega Observatorium",
            desc: `Increase observatorium gain by <span class="green">+100%</span> per level.<br>On first purchase, increase observatorium chance to <span class="green">2%</span>.`,

            icon: ['Curr/Observatorium'],
                            
            cost: i => Math.ceil(3e9*2**i),
            bulk: i => i.div(3e9).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [24],

            title: "Mega Cosmic",
            desc: `Increase cosmic gain by <span class="green">+100%</span> per level.`,

            icon: ['Icons/XP2'],
                            
            cost: i => Math.ceil(1e10*2**i),
            bulk: i => i.div(1e10).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [24],

            title: "Measure",
            desc: `Increase measure gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Measure'],
                            
            cost: i => Math.ceil(1e12*2**i),
            bulk: i => i.div(1e12).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 40,
            branch: [24],

            title: "Advanced Reservatorium",
            desc: `<span class="green">+1%</span> of your observatorium will be converted to reservatorium on forming the ring.`,

            icon: ['Curr/Res4'],
                            
            cost: i => Math.ceil(1e12*2.5**i**1.25),
            bulk: i => i.div(1e12).max(1).log(2.5).root(1.25).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+format(x*100,0)+"%",
        },

        {
            max: 100,
            branch: [24],

            title: "Giga Planetarium",
            desc: `Increase planetarium gain by <span class="green">+400%</span> per level.`,

            icon: ['Curr/Planetoid'],
                            
            cost: i => Math.ceil(1e30*2.2**i),
            bulk: i => i.div(1e30).max(1).log(2.2).floor().toNumber()+1,

            effect(i) {
                let x = i*4+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [29],

            title: "Giga Observatorium",
            desc: `Increase observatorium gain by <span class="green">+200%</span> per level.<br>On first purchase, increase observatorium chance to <span class="green">5%</span>.`,

            icon: ['Curr/Observatorium'],
                            
            cost: i => Math.ceil(1e33*2.2**i),
            bulk: i => i.div(1e33).max(1).log(2.2).floor().toNumber()+1,

            effect(i) {
                let x = i*2+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 20,
            branch: [29],

            title: "Ringy SP Exponent",
            desc: `Increase SP's exponent by <span class="green">+1%</span> per level.`,

            icon: ['Icons/SP','Icons/Exponent'],
                            
            cost: i => Math.ceil(1e36*3**i),
            bulk: i => i.div(1e36).max(1).log(3).floor().toNumber()+1,

            effect(i) {
                let x = i/100+1
        
                return x
            },
            effDesc: x => formatPow(x),
        },
        {
            unl:()=>tmp.lunarUnl,

            max: 100,
            branch: [29],

            title: "Basic Lunar Power",
            desc: `Increase lunar power gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Lunar'],
                            
            cost: i => Math.ceil(1e45*1.5**i),
            bulk: i => i.div(1e45).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            max: 100,
            branch: [29],

            title: "Giga Cosmic",
            desc: `Increase cosmic gain by <span class="green">+50%</span> compounding per level.`,

            icon: ['Icons/XP2'],
                            
            cost: i => Math.ceil(1e46*3**i),
            bulk: i => i.div(1e46).max(1).log(3).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.5,i)
        
                return x
            },
            effDesc: x => formatMult(x),
        },

        {
            unl: ()=>player.constellation.unl,
            max: 40,
            branch: [29],

            title: "Stabilizer I",
            desc: `Increase stabilizer power by <span class="green">+10%</span> per level.`,

            icon: ['Icons/ConstCooler'],
                            
            cost: i => Math.ceil(1e49*1.5**i),
            bulk: i => i.div(1e49).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 40,
            branch: [34],

            title: "Reinforcement I",
            desc: `Increase reinforcement by <span class="green">+10%</span> per level.`,

            icon: ['Icons/ConstellationSquare'],
                            
            cost: i => Math.ceil(1e50*1.5**i),
            bulk: i => i.div(1e50).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 100,
            branch: [34],

            title: "Advanced Lunar Power",
            desc: `Increase lunar power gain by <span class="green">+50%</span> per level.`,

            icon: ['Curr/Lunar'],
                            
            cost: i => Math.ceil(1e51*1.75**i),
            bulk: i => i.div(1e51).max(1).log(1.75).floor().toNumber()+1,

            effect(i) {
                let x = i/2+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 100,
            branch: [34],

            title: "Line I",
            desc: `Increase lines gain by <span class="green">+100%</span> per level.`,

            icon: ['Curr/Lines'],
                            
            cost: i => Math.ceil(1e57*1.5**i),
            bulk: i => i.div(1e57).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            unl: ()=>player.constellation.unl,
            max: 40,
            branch: [34],

            title: "Stabilizer II",
            desc: `Increase stabilizer power by <span class="green">+10%</span> per level.`,

            icon: ['Icons/ConstCooler'],
                            
            cost: i => Math.ceil(1e72*2**i),
            bulk: i => i.div(1e72).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 40,
            branch: [35],

            title: "Reinforcement II",
            desc: `Increase reinforcement by <span class="green">+10%</span> per level.`,

            icon: ['Icons/ConstellationSquare'],
                            
            cost: i => Math.ceil(1e73*2**i),
            bulk: i => i.div(1e73).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 100,
            branch: [34],

            unl: ()=>player.grassjump>=16,

            title: "Dark Charge I",
            desc: `Increase dark charge rate by <span class="green">+100%</span> per level.`,

            icon: ['Curr/DarkCharge'],
                            
            cost: i => Math.ceil(1e75*1.5**i),
            bulk: i => i.div(1e75).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },

        {
            max: 100,
            branch: [38],

            title: "Final Stabilizer",
            desc: `Increase stabilizer power compounding by <span class="green">+5%</span> per level.`,

            icon: ['Icons/ConstCooler'],
                            
            cost: i => Decimal.pow(10,i**1.5).mul(1e100),
            bulk: i => i.div(1e100).max(1).log(10).root(1.5).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.05,i)
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 100,
            branch: [39],

            title: "Final Reinforcement",
            desc: `Increase reinforcement power compounding by <span class="green">+5%</span> per level.`,

            icon: ['Icons/ConstellationSquare'],
                            
            cost: i => Decimal.pow(10,i**1.5).mul(1e150),
            bulk: i => i.div(1e150).max(1).log(10).root(1.5).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.05,i)
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 100,
            branch: [36],

            title: "Final Observatorium",
            desc: `Increase observatorium gain compounding by <span class="green">+25%</span> per level.`,

            icon: ['Curr/Observatorium'],
                            
            cost: i => Decimal.pow(10,i**1.35).mul(1e100),
            bulk: i => i.div(1e100).max(1).log(10).root(1.35).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.25,i)
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 100,
            branch: [37],

            title: "Final Line",
            desc: `Increase line gain compounding by <span class="green">+20%</span> per level.`,

            icon: ['Curr/Lines'],
                            
            cost: i => Decimal.pow(10,i**1.5).mul(1e150),
            bulk: i => i.div(1e150).max(1).log(10).root(1.5).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.2,i)
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 100,
            branch: [40],

            title: "Final Dark Charge",
            desc: `Increase dark charge rate compounding by <span class="green">+100%</span> per level.`,

            icon: ['Curr/DarkCharge'],
                            
            cost: i => Decimal.pow(10,i**1.35).mul(1e100),
            bulk: i => i.div(1e100).max(1).log(10).root(1.35).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(2,i)
        
                return x
            },
            effDesc: x => formatMult(x),
        },
    ],

    // Reservatorium

    reserv: [
        {
            max: 100,

            title: "Reserved Rings",
            desc: `Increase rings gain by <span class="green">+10%</span> per level.`,

            icon: ['Curr/Ring'],
            
            cost: i => Math.ceil(1*1.5**i),
            bulk: i => i.div(1).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            branch: [0],

            title: "Unnatural Automation",
            desc: `Automate <span class="green">Unnatural Upgrades</span>, and they no longer spend.`,

            icon: ['Curr/UGrass','Icons/Automation'],
            
            cost: i => 1000,
            bulk: i => 1,
        },
        {
            branch: [0],

            title: "Return to Autocut",
            desc: `Autocut grass/planetarium is always <span class="green">0.01s</span>.`,

            icon: ['Icons/Placeholder','Icons/Automation'],
            
            cost: i => 1000,
            bulk: i => 1,
        },
        {
            branch: [0],

            max: 100,

            title: "Star Generation",
            desc: `Passively generates <span class="green">+1%</span> of stars you would earn on galactic per second.`,

            icon: ['Curr/Star','Icons/Automation'],
            
            cost: i => Math.ceil(10000*1.5**i),
            bulk: i => i.div(10000).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+format(x*100,0)+"%/s",
        },
        {
            branch: [0],

            max: 100,

            title: "Fun Generation",
            desc: `Passively generates <span class="green">+1%</span> of fun you would earn on funify per second.`,

            icon: ['Curr/Fun','Icons/Automation'],
            
            cost: i => Math.ceil(50000*1.5**i),
            bulk: i => i.div(50000).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+format(x*100,0)+"%/s",
        },
        {
            branch: [0],

            title: "Ring Generation",
            desc: `Passively generates <span class="green">0.01%</span> of ring you would earn on forming ring per second.`,

            icon: ['Curr/Ring','Icons/Automation'],
            
            cost: i => 1e5,
            bulk: i => 1,
        },
        {
            branch: [0],

            max: 5,

            title: "Cosmic Exponent",
            desc: `Increase cosmic exponent by <span class="green">+10%</span> per level.`,

            icon: ['Icons/XP2','Icons/Exponent'],
            
            cost: i => Math.ceil(2000*10**i**1.25),
            bulk: i => i.div(2000).max(1).log(10).root(1.25).floor().toNumber()+1,

            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => formatPow(x,2),
        },
        {
            branch: [0],

            max: 10,

            title: "Planetarium Exponent",
            desc: `Increase planetarium exponent by <span class="green">+10%</span> per level.`,

            icon: ['Curr/Planetoid','Icons/Exponent'],
            
            cost: i => Math.ceil(2000*10**i**1.15),
            bulk: i => i.div(2000).max(1).log(10).root(1.15).floor().toNumber()+1,

            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => formatPow(x,2),
        },

        {
            branch: [1],

            title: "Normality Automation",
            desc: `Automate <span class="green">Normality Upgrades</span>, and they no longer spend.`,

            icon: ['Curr/Normality','Icons/Automation'],
            
            cost: i => 5e5,
            bulk: i => 1,
        },
        {
            branch: [2],

            title: "Planetarium Automation",
            desc: `Automate <span class="green">Planetarium Upgrades</span>, and they no longer spend.`,

            icon: ['Curr/Planetoid','Icons/Automation'],
            
            cost: i => 1e5,
            bulk: i => 1,
        },
        {
            branch: [5],

            title: "Ring Generation II",
            desc: `Increase ring generation by <span class="green">10x</span>.`,

            icon: ['Curr/Ring','Icons/Automation'],
            
            cost: i => 1e6,
            bulk: i => 1,
        },
        {
            branch: [3],

            title: "Ring-Free Star Chart",
            desc: `<span class="green">Ring Upgrades</span> in <span class="green">Star Chart</span> no longer spend ring.`,

            icon: ['Curr/Ring','Icons/Automation'],
            
            cost: i => 1e6,
            bulk: i => 1,
        },
        {
            branch: [8],

            max: 100,

            title: "A Normal Upgrade",
            desc: `Passively generate NP based off of your best normality, starts at 1% of best. Also, keep best liquefy/anonymity on galactic.`,

            icon: ['Curr/Normality','Icons/Automation'],
            
            cost: i => Math.ceil(2e6*1.5**i),
            bulk: i => i.div(2e6).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+format(x*100,0)+"%/s",
        },
        {
            branch: [9],

            title: "Astro Automation",
            desc: `Automate <span class="green">Astro Upgrades</span>, and they no longer spend.`,

            icon: ['Curr/Astrolabe','Icons/Automation'],
            
            cost: i => 1e8,
            bulk: i => 1,
        },
        {
            branch: [4],

            title: "Funspansion",
            desc: `<span class="green">Fun</span> and <span class="green">SFRGT Upgrades</span> are not reset on sacrifice.<br>Unlocks new <span class="green">SFRGT Upgrades</span>.`,

            icon: ['Curr/SuperFun','Icons/Automation'],
            
            cost: i => 1e7,
            bulk: i => 1,
        },

        {
            branch: [6],

            max: 6,

            title: "Astral to Cosmic",
            desc: `<span class="green">+0.05</span> to base that boosts Cosmic by Astral per level. (starting base is 1).`,

            icon: ['Icons/SP','Icons/StarProgression'],

            cost: i => Math.ceil(1e9*10**i**1.2),
            bulk: i => i.div(1e9).max(1).log(10).root(1.2).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1+i/20,tmp.total_astral)
        
                return x
            },
            effDesc: x => formatMult(x),
        },
        {
            branch: [14],

            max: 10,

            title: "Limit Generator",
            desc: `Increase <b class="green">Prestige & Crystal Charges</b>' maximum limit by <b class="green">+1,000</b> per level.`,

            icon: ['Icons/Generator','Icons/Automation2'],
            
            cost: i => Math.ceil(1e9*10**i**1.15),
            bulk: i => i.div(1e9).max(1).log(10).root(1.15).floor().toNumber()+1,

            effect(i) {
                let x = i*1000
        
                return x
            },
            effDesc: x => "+"+format(x,0),
        },
        
        {
            branch: [12],

            max: 1,

            title: "Cloud Automation",
            desc: `Automate <span class="green">Cloud Upgrades</span>, and they no longer spend.`,

            icon: ['Curr/Cloud','Icons/Automation'],
            
            cost: i => 1e11,
            bulk: i => 1,
        },
        {
            branch: [13],

            max: 100,

            title: "Astro Generation",
            desc: `Passively generates <span class="green">+1%</span> of astro you would earn on astrolabe per second.`,

            icon: ['Curr/Astrolabe','Icons/Automation'],
            
            cost: i => Math.ceil(1e12*1.5**i),
            bulk: i => i.div(1e12).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+format(x*100,0)+"%/s",
        },
        {
            branch: [11],

            max: 100,

            title: "Dark Matter Generation",
            desc: `Passively generates <span class="green">+1%</span> of dark matter you would earn on sacrifice per second.`,

            icon: ['Curr/DarkMatter','Icons/Automation'],
            
            cost: i => Math.ceil(1e12*1.5**i),
            bulk: i => i.div(1e12).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+format(x*100,0)+"%/s",
        },
        {
            branch: [16],

            max: 1,

            title: "Funny Automation",
            desc: `Automate <span class="green">Fun & SFRGT Upgrades</span>, and they no longer spend.`,

            icon: ['Curr/Fun','Icons/Automation'],

            cost: i => 1e11,
            bulk: i => 1,
        },
        {
            branch: [10],

            max: 1,

            title: "Ring Generation III",
            desc: `Increase ring generation by <span class="green">10x</span>.`,

            icon: ['Curr/Ring','Icons/Automation'],
            
            cost: i => 1e12,
            bulk: i => 1,
        },
        {
            branch: [7],

            max: 1,

            title: "Planetoid Compaction",
            desc: `Compaction now affects planetarium, cosmic, and observatorium.`,

            icon: ['Icons/Compaction','Icons/StarProgression'],
            
            cost: i => 1e14,
            bulk: i => 1,
        },
        {
            branch: [19],

            max: 1,

            title: "Dark Matter Automation",
            desc: `Automate <span class="green">Dark Matter Upgrades</span>, and they no longer spend.`,

            icon: ['Curr/DarkMatter','Icons/Automation'],
            
            cost: i => 1e13,
            bulk: i => 1,
        },
        {
            branch: [18],

            max: 1,

            title: "Measure Automation",
            desc: `Automate <span class="green">Measure Upgrades</span>, and they no longer spend.`,

            icon: ['Curr/Measure','Icons/Automation'],
            
            cost: i => 2.5e13,
            bulk: i => 1,
        },

        {
            branch: [17],

            max: 1,

            title: "Limitless Unnatural Upgrades",
            desc: `Uncap <span class="green">Unnatural Grass Upgrades</span>' maximum level (except <span class="green">Unnatural Pre-Prestige Exponent</span>).`,

            icon: ['Curr/UGrass','Icons/Automation2'],
            
            cost: i => 1e16,
            bulk: i => 1,
        },{
            branch: [24],

            max: 100,

            title: "Measure Generation",
            desc: `Passively generates <span class="green">+1%</span> of measure you would earn on quadrant per second.`,

            icon: ['Curr/Measure','Icons/Automation'],
            
            cost: i => Math.ceil(1e15*1.5**i),
            bulk: i => i.div(1e15).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+format(x*100,0)+"%/s",
        },{
            branch: [23],

            max: 100,

            title: "Momentum Generation",
            desc: `Passively generates <span class="green">+1%</span> of momentum you would earn on rocket part per second.`,

            icon: ['Curr/Momentum','Icons/Automation'],
            
            cost: i => Math.ceil(1e16*1.5**i),
            bulk: i => i.div(1e16).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+format(x*100,0)+"%/s",
        },{
            branch: [20],

            max: 1,

            title: "Limitless Foundry",
            desc: `Uncap <span class="green">Foundry Upgrades</span>' maximum level.`,

            icon: ['Icons/Foundry','Icons/Automation2'],
            
            cost: i => 1e16,
            bulk: i => 1,
        },{
            branch: [21],

            max: 1,

            title: "Ring Generation IV",
            desc: `Increase ring generation by <span class="green">10x</span>.`,

            icon: ['Curr/Ring','Icons/Automation'],
            
            cost: i => 1e18,
            bulk: i => 1,
        },{
            branch: [28],

            max: 1,

            title: "Beyond Fun",
            desc: `Uncap <span class="green">SFRGT Generation</span>'s maximum level.<br>Charge's SFRGT milestone now works outside anti-realm.`,

            icon: ['Curr/SuperFun','Icons/Automation2'],
            
            cost: i => 1e19,
            bulk: i => 1,
        },

        {
            branch: [26],

            max: 1,

            title: "Planet Automation",
            desc: `Automate <span class="green">Planet Upgrades</span>, and they no longer spend.`,

            icon: ['Curr/Planet','Icons/Automation'],
            
            cost: i => 1e18,
            bulk: i => 1,
        },{
            branch: [31],

            max: 100,

            title: "Planet Generation",
            desc: `Passively generates <span class="green">+1%</span> of planet you would earn on planetary per second.`,

            icon: ['Curr/Planet','Icons/Automation'],
            
            cost: i => Math.ceil(1e20*1.5**i),
            bulk: i => i.div(1e20).max(1).log(1.5).floor().toNumber()+1,

            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+format(x*100,0)+"%/s",
        },{
            branch: [25],

            max: 1,

            title: "Limitless Normality Upgrades",
            desc: `Uncap <span class="green">Normality Upgrades</span>' maximum level.`,

            icon: ['Curr/Normality','Icons/Automation2'],
            
            cost: i => 5e21,
            bulk: i => 1,
        },{
            branch: [32],

            max: 1,

            title: "Limitless Planetarium Upgrades",
            desc: `Uncap <span class="green">Planetarium Upgrades</span>' maximum level, except Planetarium Grow Speed & Planetarium Range.`,

            icon: ['Curr/Planetoid','Icons/Automation2'],
            
            cost: i => 1e23,
            bulk: i => 1,
        },{
            branch: [33],

            max: 1,

            title: "Limitless Cloud Upgrades",
            desc: `Uncap <span class="green">Cloud Upgrades</span>' maximum level.`,

            icon: ['Curr/Cloud','Icons/Automation2'],
            
            cost: i => 1e24,
            bulk: i => 1,
        },{
            branch: [34],

            max: 1,

            title: "Limitless Astro Upgrades",
            desc: `Uncap <span class="green">Astro Upgrades</span>' maximum level.`,

            icon: ['Curr/Astrolabe','Icons/Automation2'],
            
            cost: i => 1e27,
            bulk: i => 1,
        },{
            branch: [36],

            max: 1,

            title: "Limitless Measure Upgrades",
            desc: `Uncap <span class="green">Measure Upgrades</span>' maximum level, except Measured Observatorium and Measured XP-Exponent.`,

            icon: ['Curr/Measure','Icons/Automation2'],
            
            cost: i => 1e30,
            bulk: i => 1,
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

const SC_ICONS = {
    auto: ["Bases/SpaceBase",'Curr/Star'],
    speed: ["Bases/SpaceBase",'Curr/Star'],
    progress: ["Bases/SpaceBase",'Curr/Star'],
    ring: ["Bases/RingBase",'Curr/Ring'],
    reserv: ["Bases/ResBase",'Curr/Res4'],
}

el.setup.star_chart = ()=>{
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
                    let icon = [SC_ICONS[id][0]]
                    if (tu.icon) icon.push(...tu.icon)
                    else icon.push('Icons/Placeholder')

                    h2 += `
                    <div class="sc_upg_ctn" id="sc_upg_${id}${i}" onclick="tmp.sc_choosed = ['${id}',${i}]">`
                    for (ic in icon) h2 += `<img class="img_desc" draggable="false" src="${"images/"+icon[ic]+".png"}">`
                    h2 += `<img class="img_res" draggable="false" src="${"images/"+SC_ICONS[id][0]+".png"}"><img class="img_res" draggable="false" src="${"images/"+SC_ICONS[id][1]+".png"}">`
                    
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

        h += `<div style="height:200px"></div></div>`
    }

    nt.setHTML(h)
}

const SC_SCOST = {}

function hasStarTree(id,i) { return player.star_chart[id][i]>0 }
function starTreeEff(id,i,def=1) { return tmp.star_chart[id].eff[i]||def }
function starTreeAmt(id,i) { return player.star_chart[id][i]||0 }

function updateSCTemp() {
    let star = player.stars
    let ring = player.planetoid.ring
    let reserv = player.planetoid.reserv

    for (let id in STAR_CHART) {
        let res = id == 'ring' ? ring : id == 'reserv' ? reserv : star

        let tt = tmp.star_chart[id]

        for (let i = 0; i < STAR_CHART[id].length; i++) {
            let tu = STAR_CHART[id][i]
            let amt = player.star_chart[id][i]||0

            tt.max[i] = tu.max||1
            tt.cost[i] = tu.cost(amt)
            tt.bulk[i] = Decimal.gte(res,SC_SCOST[id][i])?Math.min(tu.bulk(res),tt.max[i]):0

            let unl = tu.unl?tu.unl():true
            let afford = res.gte(tt.cost[i])
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

tmp_update.push(()=>{
    updateSCTemp()
})

function buySCUpgrade(id,x) {
    let tu = tmp.star_chart[id]

    let amt = player.star_chart[id]

    if ((amt[x]||0) < tu.max[x]) if (Decimal.gte(id == 'ring' ? player.planetoid.ring : id == 'reserv' ? player.planetoid.reserv : player.stars,tu.cost[x])) {

        if (id == 'reserv') player.planetoid.reserv = player.planetoid.reserv.sub(tu.cost[x]).max(0)
        else if (id == 'ring' && !hasStarTree('reserv',11)) player.planetoid.ring = player.planetoid.ring.sub(tu.cost[x]).max(0)
        else player.stars = player.stars.sub(tu.cost[x]).max(0)
        amt[x] = amt[x] ? amt[x] + 1 : 1

        updateSCTemp()
    }
}

function buyNextSCUpgrade(id,x) {
	let tu = tmp.star_chart[id]

    let upg = STAR_CHART[id][x]
    let amt = player.star_chart[id]
	let amt2 = amt[x]||0

	if (amt2 < tu.max[x] && Decimal.gte(id == 'ring' ? player.planetoid.ring : id == 'reserv' ? player.planetoid.reserv : player.stars,tu.cost[x])) {
		let bulk = Math.min(tu.bulk[x], Math.ceil((amt2 + 1) / 25) * 25)

		if (bulk > amt2) {
			let cost = upg.cost(bulk-1)

			amt[x] = Math.min(amt[x] ? Math.max(amt[x],bulk) : bulk,tu.max[x])

            if (id == 'reserv') player.planetoid.reserv = player.planetoid.reserv.sub(cost).max(0)
            else if (id == 'ring' && !hasStarTree('reserv',11)) player.planetoid.ring = player.planetoid.ring.sub(cost).max(0)
			else player.stars = player.stars.sub(cost).max(0)

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

        if (amt2 < tu.max[x]) if (Decimal.gte(id == 'ring' ? player.planetoid.ring : id == 'reserv' ? player.planetoid.reserv : player.stars,tu.cost[x])) {
            let bulk = tu.bulk[x]

            if (bulk > amt2) {
                let cost = upg.cost(bulk-1)

                amt[x] = Math.min(amt[x] ? Math.max(amt[x],bulk) : bulk,tu.max[x])

                if (id == 'reserv') player.planetoid.reserv = player.planetoid.reserv.sub(cost).max(0)
                else if (id == 'ring') {if (!hasStarTree('reserv',11) && player.sn.tier.lt(2)) player.planetoid.ring = player.planetoid.ring.sub(cost).max(0)}
			    else player.stars = player.stars.sub(cost).max(0)

                updateSCTemp()
            }
        }
    }
}

function buyMaxSCs(id=tmp.sc_tab) {
    let sc = STAR_CHART[id]
    for (i in sc) if (tmp.sc_unl[id][i]) buyMaxSCUpgrade(id,i)
}

function updateStarChart() {
    let star = player.stars
    let ring = player.planetoid.ring
    let reserv = player.planetoid.reserv

    let ch = tmp.sc_choosed
    let sc_tab = tmp.sc_tab

    tmp.el.starAmt.setTxt(sc_tab == 'ring'?ring.format(0)+" Rings":sc_tab == 'reserv'?reserv.format(0)+" Reservatorium":star.format(0)+" Stars")

    tmp.el.sc_desc_div.setDisplay(ch[0])

    tmp.el.buy_all_sc.setDisplay(sc_tab == 'ring')

    tmp.el.planetoidUnl.setDisplay(player.planetoid.firstEnter)
    if (ch[0]) {
        let [id, i] = ch
        let tt = tmp.star_chart[id]
        let tu = STAR_CHART[id][i]
        let amt = player.star_chart[id][i]||0

        let res = id == 'ring' ? ring : id == 'reserv' ? reserv : star
        let resDisplay = id == 'ring' ? 'Rings' : id == 'reserv' ? 'Reservatorium' : 'Stars'

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
            <br><span class="${Decimal.gte(res,cost2)?"green":"red"}">Cost to next 25: ${format(cost2,0)} ${resDisplay}</span>
            <br><span class="${Decimal.gte(res,tt.cost[i])?"green":"red"}">Cost: ${format(tt.cost[i],0)} ${resDisplay}</span>
            `

            // if (id == "ring") h += `<br>You have ${format(res,0)} ${resDisplay}`
        }

        tmp.el.sc_desc.setHTML(h)
    }

    for (let id in STAR_CHART) {
        let d = tmp.sc_tab == id
        let tt = tmp.star_chart[id]

        let res = id == 'ring' ? ring : id == 'reserv' ? reserv : star
        let resDisplay = id == 'ring' ? 'Rings' : id == 'reserv' ? 'Reservatorium' : 'Stars'

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
                tmp.el[id2+"_cost"].setTxt(amt < tt.max[i] ? format(tt.cost[i],0,6) : "Maxed") // +" "+resDisplay
                tmp.el[id2+"_cost"].setClasses({scu_cost: true, locked: res.lt(tt.cost[i]) && amt < tt.max[i]})
            }
        }
    }
}