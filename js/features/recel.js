RESET.recel = {
    unl: ()=>hasUpgrade('funnyMachine',4) && !player.planetoid.active,

    req: ()=>true,
    reqDesc: ()=>"",

    resetDesc: `<span style="font-size: 14px;">Recelerating will temporarily slow down time and reduce the effectiveness of everything significantly until you press the Accelerate button.
    <br>During this time you will not be able to earn regular grass, Instead you earn unnatural grass which is spent in unnatural grass upgrades panel which takes the place of regular Grass Upgrades panel.
    These upgrades affect the normal and anti realm, are kept on galactic/sacrifice.<br>However, and level scales instantly.
    </span>`,
    resetGain: ()=> `Recelerating will force a Steelie.`,

    title: `Recelerator`,
    resetBtn: `Recelerate`,

    reset(force=false) {
        if (player.planetoid.active) return;

        if (true) {
            let aa

            if (player.hsj <= 0) {
                aa = player.aRes

                if (player.decel) {
                    aa.level = player.level
                    aa.tier = player.tier
                    aa.xp = player.xp
                    aa.tp = player.tp
                }

                aa = player.unRes

                if (player.recel) {
                    aa.level = player.level
                    aa.tier = player.tier
                    aa.xp = player.xp
                    aa.tp = player.tp
                }
            }

            player.recel = !player.recel
            player.decel = false

            updateTemp()

            if (player.hsj <= 0) RESET.steel.reset(true)

            if (player.recel && player.hsj <= 0) {
                player.level = aa.level
                player.tier = aa.tier
                player.xp = aa.xp
                player.tp = aa.tp
            }
        }
    },
}

el.update.recel = ()=>{
    if (mapID == "rp") tmp.el.reset_btn_recel.setTxt(player.recel?"Accelerate":"Recelerate")
}

UPGS.unGrass = {
    unl: ()=> player.recel,

    title: "Unnatural Grass Upgrades",

    autoUnl: ()=>hasStarTree('reserv',1),

    noSpend: ()=>hasStarTree('reserv',1),

    ctn: [
        {
            max: 1000,

            title: "Unnatural Grow Speed",
            desc: `Increase grass grow speed by <b class="green">+40%</b> per level.`,

            res: "unGrass",
            icon: ['Icons/Speed'],
            
            cost: i => Decimal.pow(1.75,i).mul(1e3).ceil(),
            bulk: i => i.div(1e3).max(1).log(1.75).floor().toNumber()+1,

            effect(i) {
                let x = i*.4+1

                return x
            },
            effDesc: x => format(x,1)+"x",
        },{
            max: 100,

            title: "Unnatural Grass Cap",
            desc: `Increase grass cap by <b class="green">+10%</b> per level.`,

            res: "unGrass",
            icon: ['Icons/MoreGrass'],
            
            cost: i => Decimal.pow(1.75,i).mul(1e5).ceil(),
            bulk: i => i.div(1e5).max(1).log(1.75).floor().toNumber()+1,

            effect(i) {
                let x = i*.1+1

                return x
            },
            effDesc: x => format(x,1)+"x",
        },{
            max: 1000,

            title: "Unnatural SP",
            desc: `Increase SP gain by <b class="green">+50%</b> per level.<br>This effect is increased by <b class="green">25%</b> every <b class="yellow">25</b> levels.`,

            res: "unGrass",
            icon: ['Icons/SP'],
            
            cost: i => Decimal.pow(1.25,i).mul(1e6).ceil(),
            bulk: i => i.div(1e6).max(1).log(1.25).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/2+1)

                return x
            },
            effDesc: x => format(x,2)+"x",
        },{
            max: 1000,

            title: "Compaction",
            desc: `Increase compaction by <b class="green">+100%</b> per level.<br>This upgrade will apply a direct multiplier to grass you cut at the cost of reduced grow speed and cap, but it will never go below 100/s.`,

            res: "unGrass",
            icon: ['Icons/Compaction'],
            
            cost: i => Decimal.pow(2,i).mul(1e8).ceil(),
            bulk: i => i.div(1e8).max(1).log(2).floor().toNumber()+1,

            effect(i) {
                let x = i+1

                return x
            },
            effDesc: x => format(x,0)+"x",
        },{
            max: 1000,

            title: "Unnatural Fun",
            desc: `Increase Fun gain by <b class="green">+50%</b> per level.<br>This effect is increased by <b class="green">25%</b> every <b class="yellow">25</b> levels.`,

            res: "unGrass",
            icon: ['Curr/Fun'],
            
            cost: i => Decimal.pow(1.25,i).mul(1e9).ceil(),
            bulk: i => i.div(1e9).max(1).log(1.25).floor().toNumber()+1,

            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/2+1)

                return x
            },
            effDesc: x => format(x,2)+"x",
        },{
            max: 10,

            title: "Unnatural Pre-Prestige Exponent",
            desc: `Raise grass and XP gain by <b class="green">+1%</b> per level. (only outside unnatural realm)`,

            res: "unGrass",
            icon: ['Icons/Placeholder','Icons/Exponent'],
            
            cost: i => Decimal.pow(10,i**1.25).mul(1e15).ceil(),
            bulk: i => i.div(1e15).max(1).log(10).root(1.25).floor().toNumber()+1,

            effect(i) {
                let x = i/100+1

                return x
            },
            effDesc: x => formatPow(x,2),
        },
    ],
}