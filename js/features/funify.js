MAIN.fun = {
    gain() {
        if (hasCentralized(10)) return player.grass.floor();

        let l = tmp.minStats.gs+1
        let x = Decimal.pow(1.1,l).mul(l).mul(player.bestOil.div(1e42).max(1).root(3))

        tmp.funGainBase = x

        x = x.mul(upgEffect('rocket',9))

        x = x.mul(upgEffect('fundry',0)).mul(upgEffect('fundry',1)).mul(upgEffect('fundry',2)).mul(upgEffect('fundry',3))

        x = x.mul(tmp.chargeEff[10]||1)

        x = x.mul(upgEffect('unGrass',4))

        if (player.lowGH <= -12) x = x.mul(getAGHEffect(10))

        x = x.mul(solarUpgEffect(1,8))

        return x.floor()
    },
    SFRGTgain() {
        if (hasCentralized(11)) return player.grass.floor();

        let x = E(1)

        x = x.mul(upgEffect('funnyMachine',1))
        x = x.mul(upgEffect('sfrgt',0)).mul(upgEffect('sfrgt',4))
        x = x.mul(upgEffect('moonstone',5))

        if (player.lowGH <= 8) x = x.mul(getAGHEffect(5))
        if (tmp.minStats.gs >= 15) x = x.mul(getGSEffect(4,1))

        x = x.mul(tmp.chargeEff[11]||1)

        return x
    },
}

RESET.fun = {
    unl: ()=>(player.bestGS>=10||player.fTimes>0)&&player.decel,

    req: ()=>player.level>=490,
    reqDesc: ()=>`Reach Level 490.`,

    resetDesc: `Reset everything grass-skip does, but it benefits from the milestones for grass-skip.<br>Gain more Fun based on grass-skip and oil.`,
    resetGain: ()=> `Gain <b>${tmp.funGain.format(0)}</b> Fun`,

    title: `Funify`,
    resetBtn: `Funify!`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                player.fun = player.fun.add(tmp.funGain)
                player.fTimes++
            }

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="fun") {
        player.oil = E(0)
        player.bestOil = E(0)
        resetUpgrades('oil')

        RESET.oil.doReset(order)
    },
}

tmp_update.push(()=>{
    let mf = MAIN.fun
    
    tmp.SFRGTgain = mf.SFRGTgain()
    tmp.funGain = mf.gain()
})

UPGS.funnyMachine = {
    title: "The Funny Machine",

    unl: ()=>player.fTimes > 0&&player.decel,

    underDesc: ()=>`You have ${format(player.fun,0)} Fun`,

    autoUnl: ()=>hasStarTree('reserv',20),
    noSpend: ()=>hasStarTree('reserv',20),

    ctn: [
        {
            max: 100,

            title: "Fundry",
            desc: `Unlock a building (on right of Funny Machine) where you can upgrade fun production. Each level increases charge rate by <b class="green">+10%</b>.`,
        
            res: "fun",
            icon: ["Icons/Fundry"],
                        
            cost: i => Decimal.pow(1.2,i).mul(10).ceil(),
            bulk: i => i.div(10).max(1).log(1.2).floor().add(1),
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            title: "Super Fun Real Good Time Generator",
            desc: `Unlock a building (on right of Funny Machine) where you can generate SFRGT and spend them on powerful upgrades. Each level increases SFRGT generation by <b class="green">+10%</b>.`,
        
            res: "fun",
            icon: ["Curr/SuperFun"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e6).ceil(),
            bulk: i => i.div(1e6).max(1).log(1.2).floor().add(1),
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            title: "Charger Mk.II",
            desc: `Unlock new charge milestones, which aren't affected by OoM charge starting. Each level increases charge rate by <b class="green">+10%</b>.`,
        
            res: "fun",
            icon: ["Icons/Charger"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e11).ceil(),
            bulk: i => i.div(1e11).max(1).log(1.2).floor().add(1),
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            title: "Assembler Mk.II",
            desc: `Unlock new assembler upgrades. Each level increases charge rate by <b class="green">+10%</b>.<br>Keep assembler upgrades on galactic.`,
        
            res: "fun",
            icon: ["Icons/Assemblerv2"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e14).ceil(),
            bulk: i => i.div(1e14).max(1).log(1.2).floor().add(1),
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            unl: ()=>player.sacTimes>0,

            title: "Recelerator",
            desc: `Unlock a building (on top of Factory/Funny Machine) where you can recelerate time. Each level increases charge rate by <b class="green">+10%</b>.`,
        
            res: "fun",
            icon: ["Icons/Recelerator Badge"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e42).ceil(),
            bulk: i => i.div(1e42).max(1).log(1.2).floor().add(1),
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },
    ],
}

UPGS.fundry = {
    title: "Fundry",

    unl: ()=>hasUpgrade('funnyMachine',0)&&player.decel,

    autoUnl: ()=>hasStarTree('reserv',20),
    noSpend: ()=>hasStarTree('reserv',20),

    ctn: [
        {
            max: 1000,

            title: "Fun Platinum",
            desc: `Increase fun gain by <b class="green">+10%</b> per level. This effect is increased by <b class="green">10%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "plat",
            icon: ["Curr/Fun"],
                        
            cost: i => Math.ceil(1.25**i*1e5),
            bulk: i => Math.floor(Math.log(Math.max(1,i/1e5))/Math.log(1.25))+1,
        
            effect(i) {
                let x = Decimal.pow(1.1,Math.floor(i/25)).mul(i/10+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Fun Stars",
            desc: `Increase fun gain by <b class="green">+10%</b> per level. This effect is increased by <b class="green">10%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "star",
            icon: ["Curr/Fun"],
                        
            cost: i => Decimal.pow(1.25,i).mul(1e2).ceil(),
            bulk: i => i.div(1e2).max(1).log(1.25).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(1.1,Math.floor(i/25)).mul(i/10+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Fun Fun",
            desc: `Increase fun gain by <b class="green">+10%</b> per level. This effect is increased by <b class="green">10%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "fun",
            icon: ["Curr/Fun"],
                        
            cost: i => Decimal.pow(1.25,i).mul(10).ceil(),
            bulk: i => i.div(10).max(1).log(1.25).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(1.1,Math.floor(i/25)).mul(i/10+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Fun SFRGT",
            desc: `Increase fun gain by <b class="green">+10%</b> per level. This effect is increased by <b class="green">10%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "SFRGT",
            icon: ["Curr/Fun"],
                        
            cost: i => Decimal.pow(1.25,i).mul(100).ceil(),
            bulk: i => i.div(100).max(1).log(1.25).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(1.1,Math.floor(i/25)).mul(i/10+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },
    ],
}

UPGS.sfrgt = {
    title: "Super Fun Real Good Time Generator",

    unl: ()=>hasUpgrade('funnyMachine',1)&&player.decel,

    underDesc: ()=>`You have ${format(player.SFRGT,0)} SFRGT <span class='smallAmt'>${player.SFRGT.formatGain(tmp.SFRGTgain)}</span>`,

    autoUnl: ()=>hasStarTree('reserv',20),
    noSpend: ()=>hasStarTree('reserv',20),

    ctn: [
        {
            max: 100,

            title: "SFRGT Generation",
            desc: `<b class="green">Double</b> SFRGT gain per level.`,
        
            res: "fun",
            icon: ["Curr/SuperFun"],
                        
            cost: i => Decimal.pow(10,i).mul(1e5).ceil(),
            bulk: i => i.div(1e5).max(1).log(10).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(2,i)
        
                return x
            },
            effDesc: x => format(x,0)+"x",
        },{
            max: 1000,

            title: "SFRGT SP",
            desc: `Increase SP gain by <b class="green">+10%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "SFRGT",
            icon: ["Icons/SP"],
                        
            cost: i => Decimal.pow(1.25,i).mul(50).ceil(),
            bulk: i => i.div(50).max(1).log(1.25).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(1.25,i.div(25).floor()).mul(i.div(10).add(1))
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "SFRGT Stars",
            desc: `Increase stars gain by <b class="green">+10%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "SFRGT",
            icon: ["Curr/Star"],
                        
            cost: i => Decimal.pow(1.4,i).mul(100).ceil(),
            bulk: i => i.div(100).max(1).log(1.4).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(1.25,i.div(25).floor()).mul(i.div(10).add(1))
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 15,

            title: "SFRGT Charge OoM",
            desc: `Increase charger charge bonuses sooner by <b class="green">+1</b> OoM per level.`,
        
            res: "SFRGT",
            icon: ["Curr/Charge"],
                        
            cost: i => Decimal.pow(5,i).mul(1e4).ceil(),
            bulk: i => i.div(1e4).max(1).log(5).floor().add(1),
        
            effect(i) {
                let x = i
        
                return x
            },
            effDesc: x => "+"+format(x,0)+" OoMs later",
        },{
            max: 1000,

            unl: ()=>hasStarTree('reserv',14),

            title: "SFRGT Generation II",
            desc: `<b class="green">Double</b> SFRGT gain per level.`,
        
            res: "SFRGT",
            icon: ["Curr/SuperFun"],
                        
            cost: i => Decimal.pow(10,i).mul(1e54).ceil(),
            bulk: i => i.div(1e54).max(1).log(10).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(2,i)
        
                return x
            },
            effDesc: x => format(x,0)+"x",
        },{
            max: 10000,

            unl: ()=>hasStarTree('reserv',14),

            title: "SFRGT NP",
            desc: `Increase NP gain by <b class="green">1%</b> every level.`,
        
            res: "SFRGT",
            icon: ["Curr/Normality"],
                        
            cost: i => Decimal.pow(1.15,i).mul(1e63).ceil(),
            bulk: i => i.div(1e63).max(1).log(1.15).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(1.01,i)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 10000,

            unl: ()=>hasStarTree('reserv',14),

            title: "SFRGT SP II",
            desc: `Increase SP gain by <b class="green">1%</b> every level.`,
        
            res: "SFRGT",
            icon: ["Icons/SP"],
                        
            cost: i => Decimal.pow(1.15,i).mul(1e63).ceil(),
            bulk: i => i.div(1e63).max(1).log(1.15).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(1.01,i)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },
    ],
}