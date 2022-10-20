MAIN.fun = {
    gain() {
        let l = player.grassskip+1
        let x = Decimal.pow(1.1,l).mul(l).mul(player.bestOil.div(1e42).max(1).root(3))

        x = x.mul(upgEffect('rocket',9))

        x = x.mul(upgEffect('fundry',0)).mul(upgEffect('fundry',1)).mul(upgEffect('fundry',2)).mul(upgEffect('fundry',3))

        return x.floor()
    },
    SFRGTgain() {
        let x = E(1)

        x = x.mul(upgEffect('funnyMachine',1))
        x = x.mul(upgEffect('sfrgt',0))

        if (player.lowGH <= 8) x = x.mul(getAGHEffect(5))

        return x
    },
}

RESET.fun = {
    unl: _=>(player.bestGS>=10||player.fTimes>0)&&player.decel,

    req: _=>player.level>=490,
    reqDesc: _=>`Reach Level 490.`,

    resetDesc: `Reset everything grass-skip does, but it benefits from the milestones for grass-skip.<br>Gain more Fun based on grass-skip and oil.`,
    resetGain: _=> `Gain <b>${tmp.funGain.format(0)}</b> Fun`,

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

tmp_update.push(_=>{
    let mf = MAIN.fun
    
    tmp.SFRGTgain = mf.SFRGTgain()
    tmp.funGain = mf.gain()
})

UPGS.funnyMachine = {
    title: "The Funny Machine",

    unl: _=>player.fTimes > 0&&player.decel,

    underDesc: _=>`You have ${format(player.fun,0)} Fun`,

    ctn: [
        {
            max: 100,

            title: "Fundry",
            desc: `Unlock a building (on right of Funny Machine) where you can upgrade fun production. Each level increases charge rate by <b class="green">+10%</b>.`,
        
            res: "fun",
            icon: ["Icons/Fundry"],
                        
            cost: i => Decimal.pow(1.2,i).mul(10).ceil(),
            bulk: i => i.div(10).max(1).log(1.2).floor().toNumber()+1,
        
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
            bulk: i => i.div(1e6).max(1).log(1.2).floor().toNumber()+1,
        
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

    unl: _=>hasUpgrade('funnyMachine',0)&&player.decel,

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
            bulk: i => i.div(1e2).max(1).log(1.25).floor().toNumber()+1,
        
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
            bulk: i => i.div(10).max(1).log(1.25).floor().toNumber()+1,
        
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
            bulk: i => i.div(100).max(1).log(1.25).floor().toNumber()+1,
        
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

    unl: _=>hasUpgrade('funnyMachine',1)&&player.decel,

    underDesc: _=>`You have ${format(player.SFRGT,0)} SFRGT <span class='smallAmt'>${player.SFRGT.formatGain(tmp.SFRGTgain)}</span>`,

    ctn: [
        {
            max: 100,

            title: "SFRGT Generation",
            desc: `<b class="green">Double</b> SFRGT gain per level.`,
        
            res: "fun",
            icon: ["Curr/SuperFun"],
                        
            cost: i => Decimal.pow(10,i).mul(1e5).ceil(),
            bulk: i => i.div(1e5).max(1).log(10).floor().toNumber()+1,
        
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
            icon: ["Curr/SP"],
                        
            cost: i => Decimal.pow(1.25,i).mul(50).ceil(),
            bulk: i => i.div(50).max(1).log(1.25).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/10+1)
        
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
            bulk: i => i.div(100).max(1).log(1.4).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/10+1)
        
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
            bulk: i => i.div(1e4).max(1).log(5).floor().toNumber()+1,
        
            effect(i) {
                let x = i
        
                return x
            },
            effDesc: x => "+"+format(x,0)+" OoMs later",
        },
    ],
}