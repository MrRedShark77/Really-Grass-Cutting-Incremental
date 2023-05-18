const STATS = {
    grass: {
        title: "Grass",
        icon: "Curr/Grass",
        getDesc() {
            let x = E(1),h = ''

            h += `Total grass gain: <b>+${format(tmp.grassGain,1)}</b><br>`

            // Muliplier

            if (player.pTimes>0) h += `<br>Tier Multiplier: <b>${formatMult(tmp.tier.mult)}</b>`

            x = upgEffect('grass',0).mul(upgEffect('pp',0)).mul(upgEffect('crystal',0))
            .mul(upgEffect('perk',0)).mul(upgEffect('plat',2)).mul(upgEffect('rocket',0))
            .mul(upgEffect('momentum',0)).mul(upgEffect('momentum',10))

            h += `<br>Normal Realm Multiplier: <b>${formatMult(x)}</b>`

            if (hasUpgrade('factory',4)) {
                x = upgEffect('aGrass',3).mul(upgEffect('ap',0)).mul(upgEffect('oil',0))

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (hasUpgrade('funnyMachine',4)) {
                x = upgEffect('np',0)

                h += `<br>Unnatural Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.gTimes>0) {
                x = Decimal.mul(upgEffect('moonstone',0),starTreeEff('speed',3)*starTreeEff('speed',10)*starTreeEff('speed',15))
            
                if (!player.decel) x = x.mul(starTreeEff('progress',6))

                h += `<br>Space Multiplier: <b>${formatMult(x)}</b>`
            }

            x = tmp.chargeEff[4]||E(1)

            h += `<br>Charge Milestone Multiplier: <b>${formatMult(x)}</b>`

            x = E(1)

            if (player.grasshop >= 1) {
                x = x.mul(5).mul(getGHEffect(0))
            }

            if (player.lowGH <= 36) x = x.mul(getAGHEffect(0))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`

            if (tmp.compact>1) h += `<br>Compaction Bonus: <b>${formatMult(tmp.compact)}</b>`

            x = chalEff(1)

            h += `<br>Other Multiplier: <b>${formatMult(x)}</b>`

            if (player.decel) {
                x = Decimal.div(1,1e15)

                h += `<br><span class="red">Decelerator Penalty: <b>${formatMult(x)}</b></span>`
            }

            if (player.recel) {
                x = Decimal.div(1,1e170)

                h += `<br><span class="red">Recelerator Penalty: <b>${formatMult(x)}</b></span>`
            }

            // Exponent

            x = E(chalEff(3)).mul(getLEffect(0))

            if (inChal(3) || inChal(5)) x = x.div(2)
            if (player.recel) x = x.div(2)
            if (!player.recel) x = x.mul(upgEffect('unGrass',5))

            h += `<br><br>Total Exponent: <b>^${format(x)}</b> (if multiplier goes above 1)`

            if (player.recel) {
                h += `<br><span class="red">Recelerator Exponential Penalty: <b>^0.5</b></span>`
            }

            return h
        },
    },
    xp: {
        title: "Experience",
        icon: "Icons/XP",
        getDesc() {
            let x = E(1),h = ''

            h += `Total XP gain: <b>+${format(tmp.XPGain,1)}</b><br>`

            // Muliplier

            if (player.pTimes>0) h += `<br>Tier Multiplier: <b>${formatMult(tmp.tier.mult)}</b>`

            x = upgEffect('grass',3).mul(upgEffect('perk',3)).mul(upgEffect('pp',1)).
            mul(upgEffect('crystal',1)).mul(upgEffect('plat',1)).mul(upgEffect('momentum',2))
            .mul(upgEffect('momentum',11)).mul(upgEffect('rocket',1))

            h += `<br>Normal Realm Multiplier: <b>${formatMult(x)}</b>`

            if (hasUpgrade('factory',4)) {
                x = upgEffect('aGrass',4).mul(upgEffect('ap',2)).mul(upgEffect('oil',1))

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.gTimes>0) {
                x = Decimal.mul(upgEffect('moonstone',1),starTreeEff('speed',4)*starTreeEff('speed',11)*starTreeEff('speed',16)).mul(upgEffect('dm',2))
            
                if (!player.decel) x = x.mul(starTreeEff('progress',6))

                h += `<br>Space Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.planetoid.firstEnter) {
                x = Decimal.mul(starTreeEff('ring',2),upgEffect('astro',3)).mul(upgEffect('planet',2))

                h += `<br>Planetoid Multiplier: <b>${formatMult(x)}</b>`
            }

            x = tmp.chargeEff[1]||E(1)

            h += `<br>Charge Milestone Multiplier: <b>${formatMult(x)}</b>`

            x = E(1)

            if (player.grasshop >= 2) {
                x = x.mul(5).mul(getGHEffect(1))
            }

            if (player.lowGH <= 28) x = x.mul(getAGHEffect(1))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`

            if (tmp.compact>1) h += `<br>Compaction Bonus: <b>${formatMult(tmp.compact)}</b>`

            x = chalEff(0)

            h += `<br>Other Multiplier: <b>${formatMult(x)}</b>`

            if (player.decel) {
                x = Decimal.div(1,1e16)

                h += `<br><span class="red">Decelerator Penalty: <b>${formatMult(x)}</b></span>`
            }

            if (player.recel) {
                x = Decimal.div(1,1e165)

                h += `<br><span class="red">Recelerator Penalty: <b>${formatMult(x)}</b></span>`
            }
            
            // Exponent

            x = Decimal.mul(upgEffect('moonstone',6),upgEffect('measure',3)).mul(getLEffect(1))

            if (!player.decel && hasUpgrade('plat',10)) x = x.mul(upgEffect('plat',10,1))

            if (inChal(3) || inChal(5)) x = x.div(2)
            if (player.recel) x = x.div(player.lowGH<=-36?4/3:2)
            if (!player.recel) x = x.mul(upgEffect('unGrass',5))

            h += `<br><br>Total Exponent: <b>^${format(x)}</b> (if multiplier goes above 1)`

            if (player.recel) {
                h += `<br><span class="red">Recelerator Exponential Penalty: <b>^0.5</b></span>`
            }
            
            return h
        },
    },
    tp: {
        unl:()=>player.pTimes>0,
        title: "Tier",
        title2: "Tier Points Gain",
        icon: "Icons/TP",
        getDesc() {
            let x = E(1),h = ''

            h += `Total TP gain: <b>+${format(tmp.TPGain,1)}</b><br>`

            // Muliplier

            x = upgEffect('pp',2).mul(upgEffect('perk',6)).
            mul(upgEffect('crystal',2)).mul(upgEffect('momentum',3))
            .mul(upgEffect('rocket',2))

            h += `<br>Normal Realm Multiplier: <b>${formatMult(x)}</b>`

            if (hasUpgrade('factory',4)) {
                x = upgEffect('ap',3).mul(upgEffect('oil',2))

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.gTimes>0) {
                x = Decimal.mul(upgEffect('moonstone',2),starTreeEff('speed',5)*starTreeEff('speed',12)*starTreeEff('speed',17)).mul(upgEffect('dm',0))
            
                if (!player.decel) x = x.mul(starTreeEff('progress',6))

                h += `<br>Space Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.planetoid.firstEnter) {
                x = starTreeEff('ring',3)

                h += `<br>Planetoid Multiplier: <b>${formatMult(x)}</b>`
            }

            x = tmp.chargeEff[3]||E(1)

            h += `<br>Charge Milestone Multiplier: <b>${formatMult(x)}</b>`

            x = E(1)

            if (player.grasshop >= 3) {
                x = x.mul(5).mul(getGHEffect(2))
            }

            if (player.lowGH <= 20) x = x.mul(getAGHEffect(2))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`

            if (tmp.compact>1) h += `<br>Compaction Bonus: <b>${formatMult(tmp.compact)}</b>`

            x = chalEff(2)

            h += `<br>Other Multiplier: <b>${formatMult(x)}</b>`

            if (player.decel) {
                x = Decimal.div(1,1e16)

                h += `<br><span class="red">Decelerator Penalty: <b>${formatMult(x)}</b></span>`
            }

            if (player.recel) {
                x = Decimal.div(1,1e114)

                h += `<br><span class="red">Recelerator Penalty: <b>${formatMult(x)}</b></span>`
            }
            
            // Exponent

            x = E(1).mul(getLEffect(2))

            if (player.grasshop >= 7 || player.lowGH <= 4) x = x.mul(1.25)

            if (inChal(5)) x = x.div(2)
            if (player.recel) x = x.div(2)

            h += `<br><br>Total Exponent: <b>^${format(x)}</b> (if multiplier goes above 1)`

            if (player.recel) {
                h += `<br><span class="red">Recelerator Exponential Penalty: <b>^0.5</b></span>`
            }

            return h
        },
    },
    sp: {
        unl:()=>player.gTimes>0,
        title: "Space Power",
        icon: "Icons/SP",
        getDesc() {
            let x = E(1),h = ''

            h += `Total SP gain: <b>+${format(tmp.SPGain,1)}</b><br>`

            // Muliplier

            x = E(1)

            if (player.grassskip>=2) x = x.add(getGSEffect(1,0))

            h += `<br>Base before multiplier: <b>${format(x,0)}</b>`

            if (hasUpgrade('factory',4)) {
                x = upgEffect('sfrgt',1).mul(upgEffect('sfrgt',6))

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (hasUpgrade('funnyMachine',4)) {
                x = upgEffect('np',1).mul(upgEffect('unGrass',2)).mul(upgEffect('cloud',1))

                h += `<br>Unnatural Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.gTimes>0) {
                x = upgEffect('dm',3).mul(starTreeEff('progress',2)*starTreeEff('progress',5)*starTreeEff('progress',8)*starTreeEff('progress',10))
                .mul(starTreeEff('progress',12))

                h += `<br>Space Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.planetoid.firstEnter) {
                x = Decimal.mul(starTreeEff('ring',6),starTreeEff('ring',16)).mul(starTreeEff('ring',23))

                h += `<br>Planetoid Multiplier: <b>${formatMult(x)}</b>`
            }

            x = E(1)

            if (player.lowGH <= 4) x = x.mul(10)
            if (player.lowGH <= -8) x = x.mul(getAGHEffect(9,1))
            if (player.grassjump>=3) x = x.mul(getGJEffect(2))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`

            if (tmp.compact>1) h += `<br>Compaction Bonus: <b>${formatMult(tmp.compact)}</b>`
            
            // Exponent

            x = E(1).mul(starTreeEff('ring',31))

            if (player.lowGH <= -16) x = x.mul(1.25)
            if (player.grassjump >= 1) x = x.mul(1.25)

            h += `<br><br>Total Exponent: <b>^${format(x)}</b> (if multiplier goes above 1)`

            return h
        },
    },
    plat: {
        unl:()=>player.pTimes>0,
        title: "Platinum",
        icon: "Curr/Platinum",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Platinum gain: <b>+${format(tmp.platGain,0)}</b><br>`

            // Muliplier

            x = 1

            if (player.grasshop >= 4) x += getGHEffect(3)

            h += `<br>Base before multiplier: <b>${format(x,0)}</b>`

            if (hasUpgrade('factory',4)) {
                x = upgEffect('oil',4,1)

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.gTimes>0) {
                x = getASEff('plat') * upgEffect('moonstone',3)

                h += `<br>Space Multiplier: <b>${formatMult(x)}</b>`
            }

            x = 1

            if (player.lowGH <= 4) x *= 10

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`

            if (tmp.compact>1) h += `<br>Compaction Bonus: <b>${formatMult(tmp.compact)}</b>`
            
            // Exponent

            
            
            return h
        },
    },
    pp: {
        unl:()=>player.pTimes>0,
        title: "Prestige",
        title2: "Prestige Points Gain",
        icon: "Curr/Prestige",
        getDesc() {
            let x = E(1),h = ''

            h += `Total PP gain: <b>+${format(tmp.ppGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.ppGainBase)}</b>`

            x = upgEffect('perk',7).mul(upgEffect('plat',3))
            .mul(upgEffect('crystal',3)).mul(upgEffect('momentum',4))
            .mul(upgEffect('rocket',3))

            h += `<br>Normal Realm Multiplier: <b>${formatMult(x)}</b>`

            x = tmp.chargeEff[6]||E(1)

            h += `<br>Charge Milestone Multiplier: <b>${formatMult(x)}</b>`

            x = chalEff(4)

            h += `<br>Other Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent

            x = upgEffect('plat',6)

            if (inChal(3) || inChal(5)) x = x.div(2)

            h += `<br><br>Total Exponent: <b>^${format(x)}</b> (if multiplier goes above 1)`

            return h
        },
    },
    crystal: {
        unl:()=>player.cTimes>0,
        title: "Crystallize",
        title2: "Crystal Gain",
        icon: "Curr/Crystal",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Crystal gain: <b>+${format(tmp.crystalGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.crystalGainBase)}</b>`

            x = Decimal.mul(upgEffect('perk',4),upgEffect('plat',8))
            .mul(upgEffect('momentum',5))
            .mul(upgEffect('rocket',4))

            h += `<br>Normal Realm Multiplier: <b>${formatMult(x)}</b>`

            x = tmp.chargeEff[7]||E(1)

            h += `<br>Charge Milestone Multiplier: <b>${formatMult(x)}</b>`

            x = chalEff(6)

            h += `<br>Other Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent

            x = upgEffect('plat',7)

            if (inChal(5)) x = x.div(2)

            h += `<br><br>Total Exponent: <b>^${format(x)}</b> (if multiplier goes above 1)`

            return h
        },
    },
    steel: {
        unl:()=>player.sTimes>0,
        title: "Steel",
        icon: "Curr/Steel2",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Steel gain: <b>+${format(tmp.steelGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.steelGainBase)}</b>`

            x = upgEffect('plat',5).mul(upgEffect('rocket',5)).mul(upgEffect('momentum',6))
            .mul(upgEffect('foundry',0)).mul(upgEffect('foundry',1)).mul(upgEffect('foundry',2))

            h += `<br>Normal Realm Multiplier: <b>${formatMult(x)}</b>`

            if (hasUpgrade('factory',4)) {
                x = upgEffect('aGrass',2).mul(upgEffect('oil',5))

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.gTimes>0) {
                x = getASEff('steel')

                h += `<br>Space Multiplier: <b>${formatMult(x)}</b>`
            }

            if (hasUpgrade('factory',0)) h += `<br>Foundry Effect: <b>${formatMult(tmp.foundryEff)}</b>`

            x = tmp.chargeEff[0]||E(1)

            h += `<br>Charge Milestone Multiplier: <b>${formatMult(x)}</b>`

            x = E(1)

            if (player.grassskip >= 25) x = x.mul(getGSEffect(6,1))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`

            x = chalEff(5)

            h += `<br>Other Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent


           
            return h
        },
    },
    charge: {
        unl:()=>hasUpgrade('factory',2),
        title: "Charge",
        title2: "Charge Rate",
        icon: "Curr/Charge",
        getDesc() {
            let x = E(1),h = ''

            h += `Total charge rate: <b>+${format(tmp.chargeGain,1)}/s</b><br>`

            // Muliplier

            x = Decimal.mul(upgEffect('factory',2),upgEffect('factory',3))
            .mul(upgEffect('factory',4)).mul(upgEffect('factory',5))
            .mul(upgEffect('factory',6)).mul(upgEffect('factory',7))
            .mul(upgEffect('gen',2)).mul(upgEffect('gen',3)).mul(upgEffect('momentum',7))
            .mul(upgEffect('rocket',6)).mul(upgEffect('momentum',12))

            h += `<br>Normal Realm Multiplier: <b>${formatMult(x)}</b>`

            if (hasUpgrade('factory',4)) {
                x = upgEffect('aGrass',0).mul(upgEffect('ap',1)).mul(upgEffect('funnyMachine',0))
                .mul(upgEffect('funnyMachine',2)).mul(upgEffect('funnyMachine',3)).mul(upgEffect('funnyMachine',4))

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.gTimes>0) {
                x = upgEffect('dm',1).mul(starTreeEff('speed',1)*starTreeEff('speed',2)*starTreeEff('speed',9)*starTreeEff('speed',14))

                h += `<br>Space Multiplier: <b>${formatMult(x)}</b>`
            }

            x = getGHEffect(9)

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`

            x = chalEff(7)

            h += `<br>Other Multiplier: <b>${formatMult(x)}</b>`

            if (player.decel) {
                x = Decimal.div(1,1e24)

                h += `<br><span class="red">Decelerator Penalty: <b>${formatMult(x)}</b></span>`
            }

            if (player.recel) {
                x = Decimal.div(1,1e72)

                h += `<br><span class="red">Recelerator Penalty: <b>${formatMult(x)}</b></span>`
            }
            
            // Exponent

            x = E(1).mul(getLEffect(4))

            if (player.recel) x = x.div(2)

            x = x.mul(upgEffect('moonstone',7))

            h += `<br><br>Total Exponent: <b>^${format(x)}</b> (if multiplier goes above 1)`

            if (player.recel) {
                h += `<br><span class="red">Recelerator Exponential Penalty: <b>^0.5</b></span>`
            }
           
            return h
        },
    },
    ap: {
        unl:()=>player.aTimes>0,
        title: "Anonymity",
        title2: "Anonymity Points Gain",
        icon: "Curr/Anonymity",
        getDesc() {
            let x = E(1),h = ''

            h += `Total AP gain: <b>+${format(tmp.apGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.apGainBase)}</b>`

            x = upgEffect('plat',8).mul(upgEffect('rocket',7)).mul(upgEffect('momentum',8))

            h += `<br>Normal Realm Multiplier: <b>${formatMult(x)}</b>`

            if (hasUpgrade('factory',4)) {
                x = upgEffect('oil',3)

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            x = tmp.chargeEff[8]||E(1)

            h += `<br>Charge Milestone Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent

            

            return h
        },
    },
    oil: {
        unl:()=>player.lTimes>0,
        title: "Oil",
        icon: "Curr/Oil",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Oil gain: <b>+${format(tmp.oilGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.oilGainBase)}</b>`

            x = upgEffect('plat',9).mul(upgEffect('rocket',8)).mul(upgEffect('momentum',9))

            h += `<br>Normal Realm Multiplier: <b>${formatMult(x)}</b>`

            if (player.gTimes>0) {
                x = starTreeEff('speed',6)*starTreeEff('speed',13)*starTreeEff('speed',18)

                h += `<br>Space Multiplier: <b>${formatMult(x)}</b>`
            }

            x = tmp.chargeEff[9]||E(1)

            h += `<br>Charge Milestone Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent

            

            return h
        },
    },
    star: {
        unl:()=>player.gTimes>0,
        title: "Stars",
        icon: "Curr/Star",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Stars gain: <b>+${format(tmp.starGain,0)}</b><br>`

            // Muliplier

            x = 10

            if (player.grassskip>0) x += getGSEffect(0,0)

            h += `<br>Base before Multiplier: <b>${format(x,0)}</b>`

            h += `<br>Base Multiplier: <b>${formatMult(tmp.starGainBase)}</b>`

            x = upgEffect('rocket',10)

            h += `<br>Normal Realm Multiplier: <b>${formatMult(x)}</b>`

            if (hasUpgrade('factory',4)) {
                x = upgEffect('sfrgt',2)

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.gTimes>0) {
                x = Decimal.mul(upgEffect('dm',4),upgEffect('moonstone',4))

                h += `<br>Space Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.planetoid.firstEnter) {
                x = Decimal.mul(starTreeEff('ring',10),starTreeEff('ring',22))

                h += `<br>Planetoid Multiplier: <b>${formatMult(x)}</b>`
            }

            x = E(1)

            if (player.lowGH <= 12) x = x.mul(getAGHEffect(4))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent


           
            return h
        },
    },
    moonstone: {
        unl:()=>player.gTimes>0,
        title: "Moonstone",
        icon: "Curr/Moonstone",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Moonstone gain: <b>+${format(tmp.moonstoneGain,0)}</b><br>`

            // Muliplier

            x = 1

            if (player.grassskip >= 8) x += getGSEffect(2,0)

            h += `<br>Base before multiplier: <b>${format(x,0)}</b>`

            x = 1

            if (player.grassskip >= 21) x *= 2

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`

            if (tmp.compact>1) h += `<br>Compaction Bonus: <b>${formatMult(tmp.compact)}</b>`
            
            // Exponent

            
            
            return h
        },
    },
    fun: {
        unl:()=>player.fTimes>0,
        title: "Fun",
        icon: "Curr/Fun",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Fun gain: <b>+${format(tmp.funGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.funGainBase)}</b>`

            x = upgEffect('rocket',9)

            h += `<br>Normal Realm Multiplier: <b>${formatMult(x)}</b>`

            if (hasUpgrade('factory',4)) {
                x = upgEffect('fundry',0).mul(upgEffect('fundry',1))
                .mul(upgEffect('fundry',2)).mul(upgEffect('fundry',3))

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (hasUpgrade('funnyMachine',4)) {
                x = upgEffect('unGrass',4)

                h += `<br>Unnatural Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            x = tmp.chargeEff[10]||E(1)

            h += `<br>Charge Milestone Multiplier: <b>${formatMult(x)}</b>`

            x = E(1)

            if (player.lowGH <= -12) x = x.mul(getAGHEffect(10))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent


           
            return h
        },
    },
    sfrgt: {
        unl:()=>hasUpgrade('funnyMachine',1),
        title: "SFRGT",
        icon: "Curr/SuperFun",
        getDesc() {
            let x = E(1),h = ''

            h += `Total SFRGT gain: <b>+${format(tmp.SFRGTgain,0)}</b><br>`

            // Muliplier

            if (hasUpgrade('factory',4)) {
                x = upgEffect('sfrgt',0).mul(upgEffect('funnyMachine',1)).mul(upgEffect('sfrgt',4))

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.gTimes>0) {
                x = upgEffect('moonstone',5)

                h += `<br>Space Multiplier: <b>${formatMult(x)}</b>`
            }

            x = tmp.chargeEff[11]||E(1)

            h += `<br>Charge Milestone Multiplier: <b>${formatMult(x)}</b>`

            x = E(1)

            if (player.lowGH <= 8) x = x.mul(getAGHEffect(5))
            if (player.grassskip >= 15) x = x.mul(getGSEffect(4,1))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent


           
            return h
        },
    },
    dm: {
        unl:()=>player.sacTimes>0,
        title: "Dark Matter",
        icon: "Curr/DarkMatter",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Dark Matter gain: <b>+${format(tmp.dmGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.dmGainBase)}</b>`

            if (hasUpgrade('funnyMachine',4)) {
                x = upgEffect('np',2).mul(upgEffect('cloud',0))

                h += `<br>Unnatural Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            x = E(1)

            if (player.grassjump>=1) x = x.mul(getGJEffect(0))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent


           
            return h
        },
    },
    np: {
        unl:()=>player.nTimes>0,
        title: "Normality",
        title2: "Normality Points Gain",
        icon: "Curr/Normality",
        getDesc() {
            let x = E(1),h = ''

            h += `Total NP gain: <b>+${format(tmp.npGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.npGainBase)}</b>`

            if (hasUpgrade('factory',4)) {
                x = upgEffect('sfrgt',5)

                h += `<br>Anti-Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.gTimes>0) {
                x = upgEffect('dm',6)

                h += `<br>Space Multiplier: <b>${formatMult(x)}</b>`
            }

            if (hasUpgrade('funnyMachine',4)) {
                x = upgEffect('cloud',3)

                h += `<br>Unnatural Realm Multiplier: <b>${formatMult(x)}</b>`
            }
            
            // Exponent

            

            return h
        },
    },
    cloud: {
        unl:()=>player.cloudUnl,
        title: "Cloud",
        icon: "Curr/Cloud",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Cloud gain: <b>+${format(tmp.cloudGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.cloudGainBase)}</b>`
            
            // Exponent

            

            return h
        },
    },
    pm: {
        unl:()=>player.planetoid.firstEnter,
        title: "Planetarium",
        icon: "Curr/Planetoid",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Planetarium gain: <b>+${format(tmp.planetiumGain,0)}</b><br>`

            // Muliplier

            if (player.planetoid.firstEnter) {
                x = E(5)
        
                .mul(upgEffect('planetarium',1))
                .mul(upgEffect('observ',0))
        
                .mul(starTreeEff('ring',0))
                .mul(starTreeEff('ring',4))
                .mul(starTreeEff('ring',9))
                .mul(starTreeEff('ring',14))
                .mul(starTreeEff('ring',19))
                .mul(starTreeEff('ring',24))
                .mul(starTreeEff('ring',29))
        
                .mul(upgEffect('astro',0))
                .mul(upgEffect('measure',1))

                .mul(upgEffect('planet',0))

                h += `<br>Planetoid Multiplier: <b>${formatMult(x)}</b>`
            }

            if (tmp.lunarUnl) {
                x = getLEffect(6)

                h += `<br>LO Multiplier: <b>${formatMult(x)}</b>`
            }

            x = E(1)

            if (player.planetoid.planetTier>0) x = x.mul(getPTEffect(0))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent

            x = E(1).mul(starTreeEff('reserv',7))

            h += `<br><br>Total Exponent: <b>^${format(x)}</b> (if multiplier goes above 1)`

            return h
        },
    },
    cosmic: {
        unl:()=>player.planetoid.firstEnter,
        title: "Cosmic",
        icon: "Icons/XP2",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Cosmic gain: <b>+${format(tmp.cosmicGain,0)}</b><br>`

            // Muliplier

            if (player.planetoid.firstEnter) {
                x = E(1)
        
                .mul(upgEffect('planetarium',2))
                .mul(upgEffect('observ',2))
                .mul(upgEffect('observ',5))

                .mul(starTreeEff('ring',1))
                .mul(starTreeEff('ring',13))
                .mul(starTreeEff('ring',17))
                .mul(starTreeEff('ring',21))
                .mul(starTreeEff('ring',26))

                .mul(starTreeEff('reserv',15))

                h += `<br>Planetoid Multiplier: <b>${formatMult(x)}</b>`
            }

            if (tmp.lunarUnl) {
                x = getLEffect(3)

                h += `<br>LO Multiplier: <b>${formatMult(x)}</b>`
            }

            x = E(1)

            if (player.planetoid.planetTier>0) x = x.mul(getPTEffect(0))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent

            x = E(1).mul(starTreeEff('reserv',6))

            h += `<br><br>Total Exponent: <b>^${format(x)}</b> (if multiplier goes above 1)`

            return h
        },
    },
    ring: {
        unl:()=>player.planetoid.firstEnter,
        title: "Rings",
        icon: "Curr/Ring",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Rings gain: <b>+${format(tmp.ringGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.ringGainBase)}</b>`

            if (hasUpgrade('funnyMachine',4)) {
                x = upgEffect('cloud',2)

                h += `<br>Unnatural Realm Multiplier: <b>${formatMult(x)}</b>`
            }

            if (player.planetoid.firstEnter) {
                x = E(5)
        
                .mul(upgEffect('observ',1))
                .mul(upgEffect('observ',6))

                .mul(starTreeEff('reserv',0))

                .mul(upgEffect('astro',1))
                
                .mul(upgEffect('measure',2))

                h += `<br>Planetoid Multiplier: <b>${formatMult(x)}</b>`
            }

            x = E(1).mul(getASEff('ring'))

            if (player.lowGH <= -40) x = x.mul(getAGHEffect(17))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent

            return h
        },
    },
    observ: {
        unl:()=>player.planetoid.firstEnter,
        title: "Observatorium",
        icon: "Curr/Observatorium",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Observatorium gain: <b>+${format(tmp.observGain,0)}</b><br>`

            // Muliplier

            if (player.planetoid.firstEnter) {
                x = E(1)
        
                .mul(starTreeEff('ring',5))
                .mul(starTreeEff('ring',11))
                .mul(starTreeEff('ring',15))
                .mul(starTreeEff('ring',20))
                .mul(starTreeEff('ring',25))
                .mul(starTreeEff('ring',30))

                .mul(upgEffect('measure',0))
                .mul(upgEffect('measure',4))

                .mul(upgEffect('planet',1))

                h += `<br>Planetoid Multiplier: <b>${formatMult(x)}</b>`
            }
            
            // Exponent

            return h
        },
    },
    astro: {
        unl:()=>player.planetoid.firstEnter,
        title: "Astro",
        icon: "Curr/Astrolabe",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Astro gain: <b>+${format(tmp.astroGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.astroGainBase)}</b>`

            if (player.planetoid.firstEnter) {
                x = E(1)
        
                .mul(upgEffect('observ',4))
                .mul(upgEffect('observ',7))
                .mul(starTreeEff('ring',18))

                h += `<br>Planetoid Multiplier: <b>${formatMult(x)}</b>`
            }

            x = E(1)

            if (player.planetoid.planetTier>1) x = x.mul(getPTEffect(1))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent

            return h
        },
    },
    measure: {
        unl:()=>player.planetoid.firstEnter,
        title: "Measure",
        icon: "Curr/Measure",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Measure gain: <b>+${format(tmp.measureGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.measureGainBase)}</b>`

            if (player.planetoid.firstEnter) {
                x = E(1)
        
                .mul(starTreeEff('ring',27))
                .mul(upgEffect('observ',8))

                h += `<br>Planetoid Multiplier: <b>${formatMult(x)}</b>`
            }

            x = E(1)

            if (player.planetoid.planetTier>1) x = x.mul(getPTEffect(1))

            h += `<br>Milestone Multiplier: <b>${formatMult(x)}</b>`
            
            // Exponent

            return h
        },
    },
    planet: {
        unl:()=>player.lowGH<=-48,
        title: "Planets",
        icon: "Curr/Planet",
        getDesc() {
            let x = E(1),h = ''

            h += `Total Measure gain: <b>+${format(tmp.planetGain,0)}</b><br>`

            // Muliplier

            h += `<br>Base Multiplier: <b>${formatMult(tmp.planetGainBase)}</b>`
            
            // Exponent

            return h
        },
    },
}

el.setup.stats = ()=>{
    let table = new Element('stats_tab_div')
    let html = ""

    for (let x in STATS) {
        let st = STATS[x]

        html += `
        <div class="stats_tab_btn" id="stats_tab_${x}_btn" onclick="tmp.stats_tab = '${x}'">
            <img draggable="false" src="images/${st.icon}.png">
            <div>${st.title}</div>
        </div>
        `
    }

    table.setHTML(html)
}

el.update.stats = ()=>{
    if (mapID == 'stats' && !tmp.space) {
        let st

        for (let x in STATS) {
            st = STATS[x]
            if (st.unl) tmp.el["stats_tab_"+x+"_btn"].setDisplay(st.unl())
        }

        st = STATS[tmp.stats_tab]

        tmp.el.stats_title.setTxt(st.title2||(st.title+" Gain"))

        tmp.el.stats_desc.setHTML(st.getDesc())
    }
}