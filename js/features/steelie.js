MAIN.steel = {
    gain() {
        if (hasCentralized(2)) return player.grass.floor();

        let l = tmp.minStats.gh+1
        let x = Decimal.pow(1.1,l).mul(l).mul(player.bestCrystal.div(1e21).max(1).root(3))

        tmp.steelGainBase = x

        if (hasUpgrade('factory',0)) x = x.mul(tmp.foundryEff)

        x = x.mul(upgEffect('foundry',0)).mul(upgEffect('foundry',1)).mul(upgEffect('foundry',2)).mul(upgEffect('plat',5)).mul(chalEff(5))

        x = x.mul(tmp.chargeEff[0]||1)

        x = x.mul(upgEffect('aGrass',2))
        x = x.mul(upgEffect('oil',5))

        x = x.mul(upgEffect('rocket',5))
        x = x.mul(upgEffect('momentum',6))

        x = x.mul(getASEff('steel'))

        x = x.mul(solarUpgEffect(1,3))

        if (tmp.minStats.gs >= 25) x = x.mul(getGSEffect(6,1))

        return x.floor()
    },
    foundryEff() {
        let max = Decimal.mul(1000,upgEffect('factory',0))
        let p = player.sTime/3600/starTreeEff('speed',0)
        if (!hasStarTree('speed',8)) p = Math.min(p,1)
        if (p >= 1) p = Math.log10(p)+1
        let x = max.pow(p).max(1)

        return x
    },
    charger: {
        gain() {
            let x = E(upgEffect('factory',2)).mul(getGHEffect(9)).mul(upgEffect('factory',3)).mul(upgEffect('factory',4)).mul(upgEffect('factory',5)).mul(upgEffect('factory',6)).mul(upgEffect('factory',7))

            x = x.mul(upgEffect('gen',2)).mul(upgEffect('gen',3)).mul(chalEff(7))

            x = x.mul(upgEffect('aGrass',0))
            x = x.mul(upgEffect('ap',1))

            x = x.mul(upgEffect('rocket',6)).mul(upgEffect('momentum',12))
            x = x.mul(upgEffect('momentum',7))

            x = x.mul(starTreeEff('speed',1)*starTreeEff('speed',2)*starTreeEff('speed',9)*starTreeEff('speed',14))

            x = x.mul(upgEffect('funnyMachine',0)).mul(upgEffect('funnyMachine',2)).mul(upgEffect('funnyMachine',3)).mul(upgEffect('funnyMachine',4))

            x = x.mul(upgEffect('dm',1))

            x = x.mul(tmp.darkChargeEffs.charge||1)

            x = x.mul(solarUpgEffect(1,5)).mul(solarUpgEffect(4,1))

            if (player.decel && player.hsj <= 0) x = x.div(1e24)

            if (player.recel && player.hsj <= 0) x = x.div(1e72)

            if (x.lt(1)) return x

            x = x.pow(upgEffect('moonstone',7)).pow(getLEffect(4))

            if (player.recel && player.hsj <= 0) x = x.root(2)

            return x.max(1)
        },
        effs: [
            {
                req: E(1),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = calcChargeAmountFromOoM(c,this.req).max(1)

                    let x = s.root(6)

                    return x
                },
                effDesc: x => "Boost steel gain by "+format(x)+"x",
            },{
                req: E(1e3),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = calcChargeAmountFromOoM(c,this.req).max(1)

                    let x = s.root(3)

                    return x
                },
                effDesc: x => "Boost XP gain by "+format(x)+"x",
            },{
                req: E(1e5),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = calcChargeAmountFromOoM(c,this.req).max(1)

                    let x = s.log10().div(10).add(1).root(2)
                    if (!hasUpgrade('assembler',5)) x = x.softcap(1.25,1/2,0)

                    return x.toNumber()
                },
                effDesc: x => "Scaled level starts x"+format(x,4)+" later"+(hasUpgrade('assembler',5)?"":softcapHTML(x,1.25)),
            },{
                req: E(1e7),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = calcChargeAmountFromOoM(c,this.req).max(1)

                    let x = s.root(2)

                    return x
                },
                effDesc: x => "Boost TP gain by "+format(x)+"x",
            },{
                req: E(1e10),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = calcChargeAmountFromOoM(c,this.req).max(1)

                    let x = s.root(2)

                    return x
                },
                effDesc: x => "Boost grass gain by "+format(x)+"x",
            },{
                req: E(1e13),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return 0

                    let s = calcChargeAmountFromOoM(c,this.req).max(1)

                    let x = s.log10()

                    return x.toNumber()
                },
                effDesc: x => "Increase Tier's effect base by +"+format(x),
            },{
                req: E(1e16),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = calcChargeAmountFromOoM(c,this.req).max(1)

                    let x = s.root(3)

                    return x
                },
                effDesc: x => "Boost PP gain by "+format(x)+"x",
            },{
                req: E(1e19),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = calcChargeAmountFromOoM(c,this.req).max(1)

                    let x = s.root(3)

                    return x
                },
                effDesc: x => "Boost Crystal gain by "+format(x)+"x",
            },{
                unl: ()=>player.aTimes>0,
                req: E(1e21),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = calcChargeAmountFromOoM(c,this.req).max(1)

                    let x = s.root(4)

                    return x
                },
                effDesc: x => "Boost AP gain by "+format(x)+"x",
            },{
                unl: ()=>player.lTimes>0,
                req: E(1e26),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = calcChargeAmountFromOoM(c,this.req).max(1)

                    let x = s.root(4)

                    return x
                },
                effDesc: x => "Boost Oil gain by "+format(x)+"x",
            },{
                unl: ()=>hasUpgrade('funnyMachine',2),
                req: E(1e30),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = c.div(this.req).max(1)

                    let x = s.root(4)

                    return x
                },
                effDesc: x => "Boost Fun gain by "+format(x)+"x",
            },{
                unl: ()=>hasUpgrade('funnyMachine',2),
                req: E(1e33),
                eff(c) {
                    if (player.bestCharge.lt(this.req) || ((!player.decel || player.hsj > 0) && !hasStarTree('reserv',30))) return E(1)

                    let s = c.div(this.req).max(1)

                    let x = s.root(4)

                    return x
                },
                effDesc: x => "Boost SFRGT gain by "+format(x)+"x",
            },
        ],
    },
}

RESET.steel = {
    unl: ()=>(tmp.minStats.gh>=10||player.gTimes>0)&&!tmp.outsideNormal,

    req: ()=>player.level>=400,
    reqDesc: ()=>`Reach Level 400.`,

    resetDesc: `Reset everything grasshop does, but it benefits from the milestones for grasshop.<br>Gain more Steels based on grasshop and Crystal.`,
    resetGain: ()=> `Gain <b>${tmp.steelGain.format(0)}</b> Steel`,

    title: `Steelie`,
    resetBtn: `Steelie!`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                player.steel = player.steel.add(tmp.steelGain)
                player.sTimes++
            }

            tmp.pass = 2

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="steel") {
        if (player.lowGH > -8) player.sTime = 0
        player.chargeRate = E(0)

        RESET.gh.reset(true)
    },
}

UPGS.factory = {
    title: "The Factory",

    unl: ()=>player.sTimes > 0&&!tmp.outsideNormal,

    underDesc: ()=>`You have ${format(player.steel,0)} Steel`+(tmp.steelPass>0?" <span class='smallAmt'>"+player.steel.formatGain(tmp.steelGain.mul(tmp.steelPass))+"</span>":""),

    autoUnl: ()=>hasStarTree('auto',2),

    ctn: [
        {
            max: 100,

            title: "Foundry",
            desc: `Unlock a building (on right of Factory) where you can upgrade steel production. Each level increases foundry's effect by <b class="green">+10%</b>.`,
        
            res: "steel",
            icon: ["Icons/Foundry"],
                        
            cost: i => Decimal.pow(1.2,i).mul(10).ceil(),
            bulk: i => i.div(10).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            title: "Generator",
            desc: `Unlock a building (on right of Factory) where you can upgrade prestige/crystal generation. Each level increases generator's effect by <b class="green">+10%</b>.`,
        
            res: "steel",
            icon: ["Icons/Generator"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e6).ceil(),
            bulk: i => i.div(1e6).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            title: "Charger",
            desc: `Unlock a building (on right of Factory) where you can boost production multipliers with charge. Each level increases charge rate by <b class="green">+10%</b>.`,
        
            res: "steel",
            icon: ["Icons/Charger"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e7).ceil(),
            bulk: i => i.div(1e7).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            title: "Assembler",
            desc: `Unlock a building (on right of Factory) where you can unscale anything. Each level increases charge rate by <b class="green">+10%</b>.`,
        
            res: "steel",
            icon: ["Icons/Assemblerv2"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e15).ceil(),
            bulk: i => i.div(1e15).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            title: "Decelerator",
            desc: `Unlock a building (on bottom of Factory) where you can slow down time. Each level increases charge rate by <b class="green">+10%</b>.`,
        
            res: "steel",
            icon: ["Icons/Decelerate Badge"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e38).ceil(),
            bulk: i => i.div(1e38).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            title: "Refinery",
            desc: `Unlock a building (on bottom of Factory) where you can convert charge and oil into rocket fuel. Each level increases charge rate by <b class="green">+10%</b>.`,
        
            res: "steel",
            icon: ["Icons/Refinery"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e57).ceil(),
            bulk: i => i.div(1e57).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            title: "Rocket Launch Pad",
            desc: `Unlock a building (on top of Factory) where you can build a rocket. Each level increases charge rate by <b class="green">+10%</b>.`,
        
            res: "steel",
            icon: ["Icons/LaunchPad"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e61).ceil(),
            bulk: i => i.div(1e61).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 100,

            title: "Oil Drilling Rig",
            desc: `Passively generate oil and AP slowly based off your best Liquefy/Anonymity per level. Each level increases charge rate by <b class="green">+10%</b>.`,
        
            res: "steel",
            icon: ["Icons/OilRigAlt"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e63).ceil(),
            bulk: i => i.div(1e63).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = i/10+1
        
                return x
            },
            effDesc: x => format(x)+"x",
        },
    ],
}

UPGS.foundry = {
    title: "Foundry",

    unl: ()=>hasUpgrade('factory',0)&&!tmp.outsideNormal,

    underDesc: ()=>`<b class="green">${tmp.foundryEff.format()}x</b> <span style="font-size:14px;">to Steel multiplier based on time since last steelie (max 1 hour)</span>`,

    autoUnl: ()=>hasStarTree('auto',6),

    ctn: [
        {
            max: 1000,

            title: "Steel Grass",
            desc: `Increase steel gain by <b class="green">+10%</b> per level. This effect is increased by <b class="green">10%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "grass",
            icon: ["Curr/Steel2"],
                        
            cost: i => Decimal.pow(1.25,i).mul(1e84).ceil(),
            bulk: i => i.div(1e84).max(1).log(1.25).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.1,Math.floor(i/25)).mul(i/10+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Steel Prestige",
            desc: `Increase steel gain by <b class="green">+10%</b> per level. This effect is increased by <b class="green">10%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "pp",
            icon: ["Curr/Steel2"],
                        
            cost: i => Decimal.pow(1.25,i).mul(1e51).ceil(),
            bulk: i => i.div(1e51).max(1).log(1.25).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.1,Math.floor(i/25)).mul(i/10+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            title: "Steel Steel",
            desc: `Increase steel gain by <b class="green">+10%</b> per level. This effect is increased by <b class="green">10%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "steel",
            icon: ["Curr/Steel2"],
                        
            cost: i => Decimal.pow(1.25,i).mul(1e3).ceil(),
            bulk: i => i.div(1e3).max(1).log(1.25).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.1,Math.floor(i/25)).mul(i/10+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },
    ],
}

UPGS.gen = {
    title: "Generator",

    unl: ()=>hasUpgrade('factory',1)&&!tmp.outsideNormal,

    underDesc: ()=>`<b class="green">${format(upgEffect('factory',1))}x</b> <span style="font-size:14px;">to PP/Crystal generator multiplier from factory upgrade</span>`,

    autoUnl: ()=>hasStarTree('auto',7),

    ctn: [
        {
            max: 90,

            title: "PP Generation",
            desc: `<b class="green">+1%</b> passive PP generation per level.`,
        
            res: "steel",
            icon: ["Curr/Prestige"],
                        
            cost: i => Decimal.pow(1.15,i).mul(1e4).ceil(),
            bulk: i => i.div(1e4).max(1).log(1.15).floor().toNumber()+1,
        
            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+formatPercent(x)+"/s",
        },{
            max: 90,

            title: "Crystal Generation",
            desc: `<b class="green">+1%</b> passive Crystal generation per level.`,
        
            res: "steel",
            icon: ["Curr/Crystal"],
                        
            cost: i => Decimal.pow(1.15,i).mul(1e5).ceil(),
            bulk: i => i.div(1e5).max(1).log(1.15).floor().toNumber()+1,
        
            effect(i) {
                let x = i/100
        
                return x
            },
            effDesc: x => "+"+formatPercent(x)+"/s",
        },{
            max: 1000,

            unl: ()=>tmp.minStats.gh>=14||player.gTimes>0,

            title: "Prestige Charge",
            desc: `Increase charge rate by <b class="green">+10%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "pp",
            icon: ["Curr/Charge"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e57).ceil(),
            bulk: i => i.div(1e57).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/10+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },{
            max: 1000,

            unl: ()=>tmp.minStats.gh>=14||player.gTimes>0,

            title: "Crystal Charge",
            desc: `Increase charge rate by <b class="green">+10%</b> per level. This effect is increased by <b class="green">25%</b> for every <b class="yellow">25</b> levels.`,
        
            res: "crystal",
            icon: ["Curr/Charge"],
                        
            cost: i => Decimal.pow(1.2,i).mul(1e27).ceil(),
            bulk: i => i.div(1e27).max(1).log(1.2).floor().toNumber()+1,
        
            effect(i) {
                let x = Decimal.pow(1.25,Math.floor(i/25)).mul(i/10+1)
        
                return x
            },
            effDesc: x => format(x)+"x",
        },
    ],
}

UPGS.assembler = {
    title: "Assembler",

    unl: ()=>hasUpgrade('factory',3),

    autoUnl: ()=>hasStarTree('auto',8),

    ctn: [
        {
            title: "Limitless Grass Upgrades",
            desc: `<b class="green">Grass Value</b> will no longer have maximum limit.`,
        
            res: "steel",
            icon: ["Curr/Grass","Icons/Automation2"],
                        
            cost: i => E(1e15),
            bulk: i => 1,
        },{
            title: "Limitless Grass Upgrades II",
            desc: `<b class="green">XP</b> will no longer have maximum limit.`,
        
            res: "steel",
            icon: ["Curr/Grass","Icons/Automation2"],
                        
            cost: i => E(1e18),
            bulk: i => 1,
        },{
            title: "Limitless Prestige Upgrades",
            desc: `Prestige Upgrades will no longer have maximum limit.`,
        
            res: "steel",
            icon: ["Curr/Prestige","Icons/Automation2"],
                        
            cost: i => E(1e26),
            bulk: i => 1,
        },{
            unl: ()=>player.aTimes>0,

            title: "Limitless Crystal Upgrades",
            desc: `<b class="green">Tier Base</b> will no longer have maximum limit.`,
        
            res: "steel",
            icon: ["Curr/Crystal","Icons/Automation2"],
                        
            cost: i => E(1e45),
            bulk: i => 1,
        },{
            unl: ()=>player.aTimes>0,

            title: "Limitless Crystal Upgrades II",
            desc: `<b class="green">Grass Value III, XP III, TP II & PP</b> will no longer have maximum limit.`,
        
            res: "steel",
            icon: ["Curr/Crystal","Icons/Automation2"],
                        
            cost: i => E(1e50),
            bulk: i => 1,
        },{
            unl: ()=>player.lTimes>0,

            title: "Charge Milestone Effect",
            desc: `Unsoftcap the effect of 3rd charge milestone.`,
        
            res: "steel",
            icon: ["Curr/Charge","Icons/Plus"],
                        
            cost: i => E(1e53),
            bulk: i => 1,
        },{
            unl: ()=>hasUpgrade('funnyMachine',3),

            title: "Limitless Anti-Grass Upgrades",
            desc: `<b class="green">Anti-Grass Steel, Anti-Grass Value & Anti-Grass XP</b> will no longer have maximum limit.`,
        
            res: "steel",
            icon: ["Curr/AntiGrass","Icons/Automation2"],
                        
            cost: i => E(1e220),
            bulk: i => 1,
        },{
            unl: ()=>hasUpgrade('funnyMachine',3),

            title: "Limitless Anonymity Upgrades",
            desc: `<b class="green">AP Value, AP Charge, AP XP & AP TP</b> will no longer have maximum limit.`,
        
            res: "steel",
            icon: ["Curr/Anonymity","Icons/Automation2"],
                        
            cost: i => E(1e235),
            bulk: i => 1,
        },{
            unl: ()=>hasUpgrade('funnyMachine',3),

            title: "Beyond Charge OoM Reduction",
            desc: `Make charge OoM reductions (softcapped) instead of (hardcapped). (charge OoM reductions can go below 0, but negative charge OoMs are softcapped).`,
        
            res: "steel",
            icon: ["Curr/Charge","Icons/Infinite"],
                        
            cost: i => E(1e275),
            bulk: i => 1,
        },{
            unl: ()=>hasUpgrade('funnyMachine',3),

            title: "Limitless Anti-Grass Upgrades II",
            desc: `<b class="green">Anti-Grass Charge & Scaled Level</b> will no longer have maximum limit.<br>Remind: <b class="green">Anti-Grass Charge</b>'s effect softcaps at <b class="green">1 Bx</b>.`,
        
            res: "steel",
            icon: ["Curr/AntiGrass","Icons/Automation2"],
                        
            cost: i => E('e330'),
            bulk: i => 1,
        },{
            unl: ()=>hasUpgrade('funnyMachine',3),

            title: "Limitless Anonymity Upgrades II",
            desc: `<b class="green">Scaled Level II</b> will no longer have maximum limit.`,
        
            res: "steel",
            icon: ["Curr/Anonymity","Icons/Automation2"],
                        
            cost: i => E('e385'),
            bulk: i => 1,
        },{
            unl: ()=>hasUpgrade('funnyMachine',3),

            title: "Limitless Oil Upgrades",
            desc: `Oil upgrades will no longer have maximum limit.<br>Remind: <b class="green">Oily Platinum</b>'s effect softcaps at <b class="green">100x</b>.`,
        
            res: "steel",
            icon: ["Curr/Oil","Icons/Automation2"],
                        
            cost: i => E('e435'),
            bulk: i => 1,
        },
    ],
}

tmp_update.push(()=>{
    let ms = MAIN.steel
    
    tmp.steelPass = starTreeEff('speed',7,0)
    tmp.steelGain = ms.gain()
    tmp.foundryEff = ms.foundryEff()

    tmp.chargeGain = ms.charger.gain()

    tmp.beyondOoM = hasUpgrade('assembler',8)

    tmp.chargeOoM = 0
    if (tmp.minStats.gh >= 18) tmp.chargeOoM++
    if (tmp.minStats.gh >= 20) tmp.chargeOoM++
    if (tmp.minStats.gh >= 24) tmp.chargeOoM += getGHEffect(12,0)
    if (player.lowGH <= -4) tmp.chargeOoM += getAGHEffect(8,0)
    tmp.chargeOoM += upgEffect('sfrgt',3,0)

    for (let x = 0; x < ms.charger.effs.length; x++) {
        let ce = ms.charger.effs[x]
        let unl = ce.unl ? ce.unl() : true
        tmp.chargeEff[x] = ce.eff(unl?player.chargeRate:E(0))
    }
})

function calcChargeAmountFromOoM(charge, req, oom=tmp.chargeOoM) {
    let r

    if (tmp.beyondOoM) {
        let rl = Number(req.log10().round())
        if (oom >= rl) oom = (oom-rl+1)**0.6+rl-1

        r = req.div(Decimal.pow(10,oom))
    } else {
        r = req.div(Decimal.pow(10,oom)).max(1)
    }

    let x = charge.div(r).max(1)

    return x
}

el.setup.factory = ()=>{
    let table = new Element(charge_mil)
    let h = "Best Charge Milestones:"

    for (x in MAIN.steel.charger.effs) {
        let ce = MAIN.steel.charger.effs[x]

        h += `<div id="charge_mil${x}">${format(ce.req,0)} - <span id="charge_mil_eff${x}"></span></div>`
    }

    table.setHTML(h)
}

el.update.factory = ()=>{
    if (mapID == "fd") {
        let unl = hasUpgrade('factory',2)

        tmp.el.charger_div.setDisplay(unl)

        if (unl) {
            tmp.el.charge_upper.setHTML("<b class='yellow'>Temp. Charge:</b> "+player.chargeRate.format(0)+" <span class='smallAmt'>"+player.chargeRate.formatGain(tmp.chargeGain)+"</span>")
            tmp.el.charge_under.setHTML("<b class='yellow'>Best Charge:</b> "+player.bestCharge.format(0))

            for (x in MAIN.steel.charger.effs) {
                let ce = MAIN.steel.charger.effs[x]
                let unl = ce.unl ? ce.unl() : true

                tmp.el['charge_mil'+x].setDisplay(unl)
                if (unl) {
                    tmp.el['charge_mil'+x].setClasses({green: player.bestCharge.gte(ce.req)})

                    tmp.el['charge_mil_eff'+x].setHTML(ce.effDesc(tmp.chargeEff[x]))
                }
            }
        }
    }
    if (mapID == "as") tmp.el.refinery_div.setDisplay(hasUpgrade('factory',5))
}