MAIN.sac = {
    dmGain() {
        let a = Math.max(1,tmp.total_astral-44)

        let x = player.stars.div(1e18).max(1).root(2).mul(Decimal.pow(1.1,a-1).mul(a))

        tmp.dmGainBase = x

        x = x.mul(upgEffect('np',2)).mul(upgEffect('cloud',0))

        x = x.mul(getASEff('dm'))

        if (player.grassjump>=1) x = x.mul(getGJEffect(0))

        x = x.mul(solarUpgEffect(1,14))

        return x.floor()
    },
}

RESET.sac = {
    unl: ()=> player.lowGH<=-24,

    req: ()=>player.stars.gte(1e18),
    reqDesc: ()=>`Reach ${format(1e18)} stars to unlock.`,

    resetDesc: `<span style="font-size:14px">Sacrifice forces a Galactic reset as well as resetting Astral, Stars, Fun, Fun Upgrades (excluding ones in The Funny Machine) and SFRGT to earn Dark Matter.<br>
    Gain more Dark Matters based on your stars (starting at 1 Qt) and astral (starting at 45).<br>First sacrifice unlocks new the funny machine upgrade and moonstone upgrade.</span>`,
    resetGain: ()=> `Gain <b>${tmp.dmGain.format(0)}</b> Dark Matters`,

    title: `Dark Matter Plant`,
    resetBtn: `Sacrifice`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                player.dm = player.dm.add(tmp.dmGain)
                player.sacTimes++
            }

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="sac") {
        if (!hasStarTree('reserv',14)) {
            resetUpgrades('fundry')
            resetUpgrades('sfrgt')
        }

        player.sp = E(0)
        player.astral = 0
        player.stars = E(0)
        player.fun = E(0)
        player.SFRGT = E(0)

        RESET.gal.doReset(order)
    },
}

UPGS.dm = {
    unl: ()=> player.lowGH<=-24,

    title: "Dark Matter Upgrades",

    req: ()=>player.sacTimes > 0,
    reqDesc: ()=>`Sacrifice once to unlock.`,

    underDesc: ()=>`You have ${format(player.dm,0)} Dark Matters`+gainHTML(player.dm,tmp.dmGain,tmp.dmGen),

    autoUnl: ()=>hasStarTree('reserv',23),
    noSpend: ()=>hasStarTree('reserv',23),

    ctn: [
        {
            max: 1000,

            title: "Dark TP",
            desc: `Increase TP gain by <b class="green">+100%</b> per level. This effect is increased by <b class="green">50%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "dm",
            icon: ["Icons/TP"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1).ceil(),
            bulk: i => i.div(1).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.5,Math.floor(i/25)).mul(i+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Dark Charge",
            desc: `Increase charge rate by <b class="green">+100%</b> per level. This effect is increased by <b class="green">50%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "dm",
            icon: ["Icons/Charge"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1).ceil(),
            bulk: i => i.div(1).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.5,Math.floor(i/25)).mul(i+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Dark XP",
            desc: `Increase XP gain by <b class="green">+100%</b> per level. This effect is increased by <b class="green">50%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "dm",
            icon: ["Icons/XP"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1).ceil(),
            bulk: i => i.div(1).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.5,Math.floor(i/25)).mul(i+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Dark SP",
            desc: `Increase SP gain by <b class="green">+100%</b> per level. This effect is increased by <b class="green">50%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "dm",
            icon: ["Icons/SP"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1).ceil(),
            bulk: i => i.div(1).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.5,Math.floor(i/25)).mul(i+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            title: "Dark Stars",
            desc: `Increase stars gain by <b class="green">+50%</b> per level.`,
        
            res: "dm",
            icon: ["Curr/Star"],
                        
            cost: i => Decimal.pow(1.25,i).mul(10).ceil(),
            bulk: i => i.div(10).max(1).log(1.25).floor().toNumber()+1,
        
            effect(i) {
                let x = i/2+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 5,

            title: "Star Base from Rocket",
            desc: `Increase star base from rocket part by <b class="green">0.1</b> per level.`,
        
            res: "dm",
            icon: ["Curr/Star","Icons/Plus"],
                        
            cost: i => Decimal.pow(10,i**1.5).mul(100).ceil(),
            bulk: i => i.div(100).max(1).log(10).root(1.5).floor().toNumber()+1,
        
            effect(i) {
                let x = i/10
        
                return x
            },
            effDesc: x => "+"+format(x,1),
        },{
            max: 1000,

            unl: ()=>player.lowGH<=-32,

            title: "Dark NP",
            desc: `Increase NP gain by <b class="green">+25%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "dm",
            icon: ["Curr/Normality"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e10).ceil(),
            bulk: i => i.div(1e10).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/4+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 500,

            unl: ()=>player.lowGH<=-32,

            title: "Dark Momentum",
            desc: `Increase momentum gain by <b class="green">+25%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "dm",
            icon: ["Curr/Momentum"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e11).ceil(),
            bulk: i => i.div(1e11).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/4+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },
    ]
}

tmp_update.push(()=>{
    tmp.dmGain = MAIN.sac.dmGain()
})