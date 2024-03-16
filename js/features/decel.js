RESET.decel = {
    unl: ()=>hasUpgrade('factory',4),

    req: ()=>true,
    reqDesc: ()=>"",

    resetDesc: `<span style="font-size: 14px;">Decelerating will temporarily slow down time and reduce the effectiveness of everything significantly until you press the Accelerate button.
    <br>During this time you will not be able to earn regular grass, Instead you earn anti-grass which is spent in Anti-grass upgrades panel which takes the place of regular Grass Upgrades panel.
    These upgrades affect the normal realm.<br>However, and level scales instantly.
    </span>`,
    resetGain: ()=> `Decelerating will force a Steelie.`,

    title: `Decelerator`,
    resetBtn: `Decelerate`,

    reset(force=false) {
        if (player.planetoid.active) return;
        
        if (true) {
            let aa

            if (player.hsj <= 0) {
                aa = player.unRes

                if (player.recel) {
                    aa.level = player.level
                    aa.tier = player.tier
                    aa.xp = player.xp
                    aa.tp = player.tp
                }

                aa = player.aRes

                if (player.decel) {
                    aa.level = player.level
                    aa.tier = player.tier
                    aa.xp = player.xp
                    aa.tp = player.tp
                }
            }

            player.decel = !player.decel
            player.recel = false

            updateTemp()

            if (player.hsj <= 0) RESET.steel.reset(true)

            if (player.hsj <= 0) {
                if (player.decel) {
                    player.level = aa.level
                    player.tier = aa.tier
                    player.xp = aa.xp
                    player.tp = aa.tp
                }
            }
        }
    },
}

el.update.decel = ()=>{
    tmp.el.fog.setDisplay(player.decel || player.recel)
    tmp.el.fog.changeStyle('background-color',player.recel?"#1f3b00":"#001c3b")
    if (mapID == "as") tmp.el.reset_btn_decel.setTxt(player.decel?"Accelerate":"Decelerate")
}

UPGS.aGrass = {
    unl: ()=> player.decel,

    title: "Anti-Grass Upgrades",

    autoUnl: ()=>hasUpgrade('auto',14),

    noSpend: ()=>hasUpgrade('auto',16),

    ctn: [
        {
            max: 1000,

            title: "Anti-Grass Charge",
            desc: `Increase charge rate by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">25%</b> every <b class="yellow">25</b> levels.`,

            res: "aGrass",
            icon: ['Curr/Charge'],
            
            cost: i => Decimal.pow(1.25,scale(E(i),1e5,2,0)).mul(1e3).ceil(),
            bulk: i => i.div(1e3).max(1).log(1.25).scale(1e5,2,0,true).floor().add(1),

            effect(i) {
                let x = Decimal.pow(1.25,i.div(25).floor()).mul(i.div(10).add(1)).softcap(1e9,0.25,0)

                return x
            },
            effDesc: x => x.format()+"x"+x.softcapHTML(1e9),
        },{
            max: 250,

            title: "Anti-Grass Grow Speed",
            desc: `Increase grass grow speed by <b class="green">10%</b> per level.`,

            res: "aGrass",
            icon: ['Icons/Speed'],
            
            cost: i => Decimal.pow(1.75,i).mul(1e4).ceil(),
            bulk: i => i.div(1e4).max(1).log(1.75).floor().add(1),

            effect(i) {
                let x = i/10+1

                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Anti-Grass Steel",
            desc: `Increase steel gain by <b class="green">+10%</b> per level.<br>This effect is increased by <b class="green">10%</b> every <b class="yellow">25</b> levels.`,

            res: "aGrass",
            icon: ['Curr/Steel2'],
            
            cost: i => Decimal.pow(1.25,scale(E(i),1e5,2,0)).mul(1e5).ceil(),
            bulk: i => i.div(1e5).max(1).log(1.25).scale(1e5,2,0,true).floor().add(1),

            effect(i) {
                let x = Decimal.pow(1.1,i.div(25).floor()).mul(i.div(10).add(1))

                return x
            },
            effDesc: x => x.format()+"x",
        },{
            max: 1000,

            title: "Anti-Grass Value",
            desc: `Increase grass gain by <b class="green">+50%</b> per level.<br>This effect is increased by <b class="green">50%</b> every <b class="yellow">25</b> levels.`,

            res: "aGrass",
            icon: ['Curr/Grass'],
            
            cost: i => Decimal.pow(1.2,scale(E(i),1e5,2,0)).mul(1e6).ceil(),
            bulk: i => i.div(1e6).max(1).log(1.2).scale(1e5,2,0,true).floor().add(1),

            effect(i) {
                let x = Decimal.pow(1.5,i.div(25).floor()).mul(i.div(2).add(1))

                return x
            },
            effDesc: x => x.format()+"x",
        },{
            max: 1000,

            title: "Anti-Grass XP",
            desc: `Increase XP gain by <b class="green">+50%</b> per level.<br>This effect is increased by <b class="green">50%</b> every <b class="yellow">25</b> levels.`,

            res: "aGrass",
            icon: ['Icons/XP'],
            
            cost: i => Decimal.pow(1.2,scale(E(i),1e5,2,0)).mul(1e7).ceil(),
            bulk: i => i.div(1e7).max(1).log(1.2).scale(1e5,2,0,true).floor().add(1),

            effect(i) {
                let x = Decimal.pow(1.5,i.div(25).floor()).mul(i.div(2).add(1))

                return x
            },
            effDesc: x => x.format()+"x",
        },{
            max: 50,

            title: "Scaled Level",
            desc: `Level scales <b class="green">+1</b> later per level (before multiplication).`,

            res: "aGrass",
            icon: ['Icons/XP','Icons/Plus'],
            
            cost: i => Decimal.pow(3,i.pow(1.4)).mul(1e12).ceil(),
            bulk: i => i.div(1e12).max(1).log(3).root(1.4).floor().add(1),

            effect(i) {
                let x = i

                return x
            },
            effDesc: x => "+"+format(x,0)+" later",
        },
    ],
}