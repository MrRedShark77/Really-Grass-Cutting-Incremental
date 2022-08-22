MAIN.pp = {
    gain() {
        let l = Math.max(player.level-29,0)
        let x = Decimal.pow(1.1,l).mul(l).mul(player.bestGrass.div(1e9).max(1).root(3))

        x = x.mul(upgEffect('crystal',3))
        x = x.mul(upgEffect('plat',3))
        x = x.mul(upgEffect('perk',7))

        x = x.mul(chalEff(4))

        x = x.mul(tmp.chargeEff[0]||6)

        x = x.pow(upgEffect('plat',6))

        if (inChal(3) || inChal(5)) x = x.root(2)

        return x.floor()
    },
}

RESET.pp = {
    unl: _=> !player.decel,

    req: _=>player.level>=30,
    reqDesc: _=>`Reach Level 30 to Prestige.`,

    resetDesc: `Prestiging resets your grass, grass upgrades, level and perks for Prestige Points (PP).<br>Gain more PP based on your level and grass.`,
    resetGain: _=> `Gain <b>${tmp.ppGain.format(0)}</b> Prestige Points`,

    title: `Prestige`,
    resetBtn: `Prestige`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                player.pp = player.pp.add(tmp.ppGain)
                player.pTimes++
            }

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="p") {
        player.grass = E(0)
        player.bestGrass = E(0)
        player.xp = E(0)
        player.level = 0

        let keep_perk = order == "p" && hasUpgrade('auto',4) || order == "c" && hasUpgrade('auto',7) || order == "gh" && player.grasshop >= 10

        if (!keep_perk) {
            player.maxPerk = 0
            player.spentPerk = 0
            resetUpgrades('perk')
        }

        resetUpgrades('grass')

        resetGlasses()

        updateTemp()
    },
}

UPGS.pp = {
    unl: _=> !player.decel,

    title: "Prestige Upgrades",

    cannotBuy: _=>inChal(4) || inChal(7),

    autoUnl: _=>hasUpgrade('auto',5),
    noSpend: _=>hasUpgrade('auto',9),

    req: _=>player.pTimes > 0,
    reqDesc: _=>`Prestige once to unlock.`,

    underDesc: _=>`You have ${format(player.pp,0)} Prestige Points`+(tmp.ppGainP > 0 ? " <span class='smallAmt'>"+formatGain(player.pp,tmp.ppGain.mul(tmp.ppGainP))+"</span>" : ""),

    ctn: [
        {
            max: 1000,

            title: "Grass Value II",
            desc: `Increase grass gain by <b class="green">+50%</b> per level. This effect is increased by <b class="green">50%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "pp",
            icon: ["Curr/Grass"],
                        
            cost: i => Decimal.pow(1.25,i).mul(1).ceil(),
            bulk: i => i.div(1).max(1).log(1.25).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.5,Math.floor(i/25)).mul(i/2+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "XP II",
            desc: `Increase XP gain by <b class="green">+50%</b> per level. This effect is increased by <b class="green">50%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "pp",
            icon: ["Icons/XP"],
                        
            cost: i => Decimal.pow(1.3,i).mul(3).ceil(),
            bulk: i => i.div(3).max(1).log(1.3).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.5,Math.floor(i/25)).mul(i/2+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "TP",
            desc: `Increase Tier Points (TP) gain by <b class="green">1</b> per level. This effect is <b class="green">doubled</b> for every <b class="yellow">25</b> levels.`,
        
            res: "pp",
            icon: ["Icons/TP"],
                        
            cost: i => Decimal.pow(1.5,i).mul(50).ceil(),
            bulk: i => i.div(50).max(1).log(1.5).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(2,Math.floor(i/25)).mul(i+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },
    ],
}

tmp_update.push(_=>{
    tmp.ppGain = MAIN.pp.gain()
    tmp.ppGainP = (upgEffect('auto',11,0)+upgEffect('gen',0,0))*upgEffect('factory',1,1)
})