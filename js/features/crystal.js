MAIN.crystal = {
    gain() {
        if (hasCentralized(1)) return player.grass.floor();

        let l = player.tier+1
        let x = Decimal.pow(1.1+getASEff('crystal'),l).mul(l).mul(player.bestPP.div(1e7).max(1).root(3))

        tmp.crystalGainBase = x

        x = x.mul(upgEffect('plat',4))
        x = x.mul(upgEffect('perk',8))

        x = x.mul(chalEff(6))

        x = x.mul(tmp.chargeEff[7]||1)

        x = x.mul(upgEffect('rocket',4))
        x = x.mul(upgEffect('momentum',5))

        x = x.mul(solarUpgEffect(1,2))

        x = x.pow(upgEffect('plat',7))

        if (inChal(5)) x = x.root(2)

        return x.floor()
    },
}

RESET.crystal = {
    unl: ()=>player.pTimes>0 && !tmp.outsideNormal,

    req: ()=>player.level>=100,
    reqDesc: ()=>`Reach Level 100 to Crystallize.`,

    resetDesc: `Crystallizing resets everything prestige as well except Platinum for Crystals.<br>Gain more Crystals based on your tier and PP.`,
    resetGain: ()=> `Gain <b>${tmp.crystalGain.format(0)}</b> Crystals`,

    title: `Crystallize`,
    resetBtn: `Crystallize`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                player.crystal = player.crystal.add(tmp.crystalGain)
                player.cTimes++
            }

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="c") {
        player.pp = E(0)
        player.bestPP = E(0)
        player.tp = E(0)
        player.tier = 0

        resetUpgrades('pp')

        RESET.pp.doReset(order)
    },
}

UPGS.crystal = {
    title: "Crystal Upgrades",

    unl: ()=>player.pTimes > 0 && !tmp.outsideNormal,

    req: ()=>player.cTimes > 0,
    reqDesc: ()=>`Crystallize once to unlock.`,

    underDesc: ()=>`You have ${format(player.crystal,0)} Crystal`+(tmp.crystalGainP > 0 ? " <span class='smallAmt'>"+formatGain(player.crystal,tmp.crystalGain.mul(tmp.crystalGainP))+"</span>" : ""),

    autoUnl: ()=>hasUpgrade('auto',8),
    noSpend: ()=>hasUpgrade('auto',10),

    cannotBuy: ()=>inChal(6),

    ctn: [
        {
            max: 1000,

            title: "Grass Value III",
            desc: `Increase grass gain by <b class="green">+50%</b> per level. This effect is increased by <b class="green">50%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "crystal",
            icon: ["Curr/Grass"],
                        
            cost: i => Decimal.pow(1.2,scale(E(i),1e6,2,0)).mul(4).ceil(),
            bulk: i => i.div(4).max(1).log(1.2).scale(1e6,2,0,true).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.5,Math.floor(i/25)).mul(i/2+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "XP III",
            desc: `Increase XP gain by <b class="green">+50%</b> per level. This effect is increased by <b class="green">50%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "crystal",
            icon: ["Icons/XP"],
                        
            cost: i => Decimal.pow(1.25,scale(E(i),1e6,2,0)).mul(5).ceil(),
            bulk: i => i.div(5).max(1).log(1.25).scale(1e6,2,0,true).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.5,Math.floor(i/25)).mul(i/2+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "TP II",
            desc: `Increase Tier Points (TP) gain by <b class="green">1</b> per level. This effect is <b class="green">doubled</b> for every <b class="yellow">25</b> levels.`,
        
            res: "crystal",
            icon: ["Icons/TP"],
                        
            cost: i => Decimal.pow(1.3,scale(E(i),1e6,2,0)).mul(6).ceil(),
            bulk: i => i.div(6).max(1).log(1.3).scale(1e6,2,0,true).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(2,Math.floor(i/25)).mul(i+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "PP",
            desc: `Increase PP gain by <b class="green">+25%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "crystal",
            icon: ["Curr/Prestige"],
                        
            cost: i => Decimal.pow(1.5,scale(E(i),1e6,2,0)).mul(11).ceil(),
            bulk: i => i.div(11).max(1).log(1.5).scale(1e6,2,0,true).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/4+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1,

            title: "Grow Amount",
            desc: `Increase grass grow amount by <b class="green">1</b>.`,
        
            res: "crystal",
            icon: ["Icons/Speed"],
                        
            cost: i => E(20),
            bulk: i => 1,
        
            effect(i) {
                let x = i
        
                return x
            },
            effDesc: x => "+"+format(x,0),
        },{
            max: 8,

            title: "Tier Base",
            desc: `Increase multiplier's base from Tier by <b class="green">1</b> per level. Starting base is <b class="green">2</b>.`,
        
            res: "crystal",
            icon: ["Icons/TP","Icons/Plus"],
                        
            cost: i => Decimal.pow(10,i**1.25).mul(100).ceil(),
            bulk: i => i.div(100).max(1).log(10).root(1.25).floor().toNumber()+1,
        
            effect(i) {
                let x = i
        
                return x
            },
            effDesc: x => "+"+format(x,0),
        },
    ],
}

// Liquefy, Oil

MAIN.oil = {
    gain() {
        let l = player.tier
        let x = Decimal.pow(1.1,l).mul(l).mul(player.bestAP.div(1e12).max(1).root(3))

        tmp.oilGainBase = x

        x = x.mul(tmp.chargeEff[9]||1)
        x = x.mul(upgEffect('plat',9))

        x = x.mul(upgEffect('rocket',8))
        x = x.mul(upgEffect('momentum',9))

        x = x.mul(starTreeEff('speed',6)*starTreeEff('speed',13)*starTreeEff('speed',18))

        x = x.mul(solarUpgEffect(1,7))

        return x.floor()
    },
}

RESET.oil = {
    unl: ()=> player.decel && player.aTimes > 0,

    req: ()=>player.level>=100,
    reqDesc: ()=>`Reach Level 100 to Liquefy.`,

    resetDesc: `Liquefy resets everything Anonymity as well as your AP, Anonymity upgrades & tier for Oil.<br>Gain more Oil based on your tier and AP.`,
    resetGain: ()=> `Gain <b>${tmp.oilGain.format(0)}</b> Oil`,

    title: `Liquefy`,
    resetBtn: `Liquefy`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                player.oil = player.oil.add(tmp.oilGain)
                player.lTimes++

                player.bestOil2 = player.bestOil2.max(tmp.oilGain)
            }

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="l") {
        player.tier = 0
        player.tp = E(0)
        player.ap = E(0)
        player.bestAP = E(0)

        resetUpgrades('ap')

        RESET.ap.doReset(order)
    },
}

UPGS.oil = {
    unl: ()=> player.decel && player.aTimes > 0,

    title: "Oil Upgrades",

    req: ()=>player.lTimes > 0,
    reqDesc: ()=>`Liquefy once to unlock.`,

    underDesc: ()=>`You have ${format(player.oil,0)} Oil`+(hasUpgrade('factory',7) ? " <span class='smallAmt'>"+formatGain(player.oil,player.bestOil2.mul(tmp.oilRigBase))+"</span>" : ""),

    autoUnl: ()=>hasUpgrade('auto',17),
    noSpend: ()=>hasUpgrade('auto',20),

    ctn: [
        {
            max: 1000,

            title: "Oily Grass Value",
            desc: `Increase grass gain by <b class="green">+25%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "oil",
            icon: ["Curr/Grass"],
                        
            cost: i => Decimal.pow(1.2,scale(E(i),1e5,2,0)).mul(2).ceil(),
            bulk: i => i.div(2).max(1).log(1.2).scale(1e5,2,0,true).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/4+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Oily XP",
            desc: `Increase XP gain by <b class="green">+25%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "oil",
            icon: ['Icons/XP'],
            
            cost: i => Decimal.pow(1.25,scale(E(i),1e5,2,0)).mul(3).ceil(),
            bulk: i => i.div(3).max(1).log(1.25).scale(1e5,2,0,true).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/4+1)

                return x
            },
            effDesc: x => x.format()+"x",
        },{
            max: 1000,

            title: "Oily TP",
            desc: `Increase TP gain by <b class="green">+50%</b> per level. This effect is increased by <b class="green">50%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "oil",
            icon: ['Icons/TP'],
            
            cost: i => Decimal.pow(1.3,scale(E(i),1e5,2,0)).mul(5).ceil(),
            bulk: i => i.div(5).max(1).log(1.3).scale(1e5,2,0,true).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.5,Math.floor(i/25)).mul(i/2+1)

                return x
            },
            effDesc: x => x.format()+"x",
        },{
            max: 1000,

            title: "Oily AP",
            desc: `Increase AP gain by <b class="green">+25%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "oil",
            icon: ['Curr/Anonymity'],
            
            cost: i => Decimal.pow(1.4,scale(E(i),1e5,2,0)).mul(10).ceil(),
            bulk: i => i.div(10).max(1).log(1.4).scale(1e5,2,0,true).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/4+1)

                return x
            },
            effDesc: x => x.format()+"x",
        },{
            max: 10,

            title: "Oily Platinum",
            desc: `Increase Platinum gain by <b class="green">50%</b> every level.`,
        
            res: "oil",
            icon: ['Curr/Platinum'],
            
            cost: i => Decimal.pow(10,scale(E(i),1e3,2,0)).mul(1e3).ceil(),
            bulk: i => i.div(1e3).max(1).log(10).scale(1e3,2,0,true).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.5,i).softcap(100,0.25,0)

                return x
            },
            effDesc: x => format(x)+"x"+x.softcapHTML(100),
        },{
            max: 1000,

            title: "Oily Steel",
            desc: `Increase steel gain by <b class="green">+25%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "oil",
            icon: ['Curr/Steel2'],
            
            cost: i => Decimal.pow(1.25,scale(E(i),1e5,2,0)).mul(1e4).ceil(),
            bulk: i => i.div(1e4).max(1).log(1.25).scale(1e5,2,0,true).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/4+1)

                return x
            },
            effDesc: x => format(x)+"x",
        },
    ],
}

MAIN.cloud = {
    gain() {
        let l = Math.max(0,player.tier-30)
        let x = Decimal.pow(1.1,l).mul(l).mul(player.bestNP.div(1e24).max(1).root(3))

        tmp.cloudGainBase = x

        x = x.mul(solarUpgEffect(1,12))

        return x.floor()
    },
}

RESET.cloud = {
    unl: ()=> player.recel && player.nTimes > 0,

    req: ()=>player.level>=150,
    reqDesc: ()=>`Reach Level 150 to Vaporize.`,

    resetDesc: `Vaporizer passively generates cloud based on NP & tier. Click "Start Vaporizing" to generate.`,
    resetGain: ()=> `Gain <b>+${tmp.cloudGain.format(0)}</b> Cloud per second`,

    title: `Vaporizer`,
    resetBtn: `Start Vaporizing`,

    reset(force=false) {
        player.cloudUnl = true
    },
}

UPGS.cloud = {
    unl: ()=> player.recel && player.nTimes > 0,

    title: "Cloud Upgrades",

    req: ()=>player.cloudUnl,
    reqDesc: ()=>`Click "Start Vaporizing" once to unlock.`,

    underDesc: ()=>`You have ${format(player.cloud,0)} Cloud`,

    autoUnl: ()=>hasStarTree('reserv',17),
    noSpend: ()=>hasStarTree('reserv',17),

    ctn: [
        {
            max: 1000,

            title: "Cloudy Dark Matter",
            desc: `Increase dark matter gain by <b class="green">+25%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "cloud",
            icon: ["Curr/DarkMatter"],
                        
            cost: i => Decimal.pow(1.2,i).mul(2).ceil(),
            bulk: i => i.div(2).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/4+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Cloudy SP",
            desc: `Increase SP gain by <b class="green">+25%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "cloud",
            icon: ["Icons/SP"],
                        
            cost: i => Decimal.pow(1.2,i).mul(2).ceil(),
            bulk: i => i.div(2).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/4+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Cloudy Ring",
            desc: `Increase ring gain by <b class="green">+25%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "cloud",
            icon: ["Curr/Ring"],
                        
            cost: i => Decimal.pow(1.25,i).mul(10).ceil(),
            bulk: i => i.div(10).max(1).log(1.25).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/4+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Cloudy NP",
            desc: `Increase NP gain by <b class="green">+25%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "cloud",
            icon: ["Curr/Normality"],
                        
            cost: i => Decimal.pow(1.25,i).mul(100).ceil(),
            bulk: i => i.div(100).max(1).log(1.25).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/4+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },
    ],
}

tmp_update.push(()=>{
    tmp.crystalGain = MAIN.crystal.gain()
    tmp.crystalGainP = (upgEffect('auto',12,0)+upgEffect('gen',1,0))*upgEffect('factory',1,1)

    tmp.oilGain = MAIN.oil.gain()

    tmp.cloudGain = MAIN.cloud.gain()
})