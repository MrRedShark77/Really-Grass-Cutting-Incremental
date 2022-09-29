MAIN.steel = {
    gain() {
        let l = player.grasshop+1
        let x = Decimal.pow(1.1,l).mul(l).mul(player.bestCrystal.div(1e21).max(1).root(3))

        if (hasUpgrade('factory',0)) x = x.mul(tmp.foundryEff)

        x = x.mul(upgEffect('foundry',0)).mul(upgEffect('foundry',1)).mul(upgEffect('foundry',2)).mul(upgEffect('plat',5)).mul(chalEff(5))

        x = x.mul(tmp.chargeEff[0]||1)

        x = x.mul(upgEffect('aGrass',2))
        x = x.mul(upgEffect('oil',5))

        x = x.mul(upgEffect('rocket',5))
        x = x.mul(upgEffect('momentum',6))

        x = x.mul(getASEff('steel'))

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

            x = x.mul(upgEffect('rocket',6))
            x = x.mul(upgEffect('momentum',7))

            x = x.mul(starTreeEff('speed',1)*starTreeEff('speed',2))

            if (player.decel) x = x.div(1e24)

            return x.max(1)
        },
        effs: [
            {
                req: E(0),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = c.max(1)

                    let x = s.root(6)

                    return x
                },
                effDesc: x => "Boost steel gain by "+format(x)+"x",
            },{
                req: E(1e3),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = c.div(this.req.div(tmp.chargeOoMMul).max(1)).max(1)

                    let x = s.root(3)

                    return x
                },
                effDesc: x => "Boost XP gain by "+format(x)+"x",
            },{
                req: E(1e5),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = c.div(this.req.div(tmp.chargeOoMMul).max(1)).max(1)

                    let x = s.log10().div(10).add(1).root(2)
                    if (!hasUpgrade('assembler',5)) x = x.softcap(1.25,1/2,0)

                    return x.toNumber()
                },
                effDesc: x => "Scaled level starts x"+format(x,4)+" later"+(hasUpgrade('assembler',5)?"":softcapHTML(x,1.25)),
            },{
                req: E(1e7),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = c.div(this.req.div(tmp.chargeOoMMul).max(1)).max(1)

                    let x = s.root(2)

                    return x
                },
                effDesc: x => "Boost TP gain by "+format(x)+"x",
            },{
                req: E(1e10),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = c.div(this.req.div(tmp.chargeOoMMul).max(1)).max(1)

                    let x = s.root(2)

                    return x
                },
                effDesc: x => "Boost grass gain by "+format(x)+"x",
            },{
                req: E(1e13),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return 0

                    let s = c.div(this.req.div(tmp.chargeOoMMul).max(1)).max(1)

                    let x = s.log10()

                    return x.toNumber()
                },
                effDesc: x => "Increase Tier's effect base by +"+format(x),
            },{
                req: E(1e16),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = c.div(this.req.div(tmp.chargeOoMMul).max(1)).max(1)

                    let x = s.root(3)

                    return x.toNumber()
                },
                effDesc: x => "Boost PP gain by "+format(x)+"x",
            },{
                req: E(1e19),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = c.div(this.req.div(tmp.chargeOoMMul).max(1)).max(1)

                    let x = s.root(3)

                    return x.toNumber()
                },
                effDesc: x => "Boost Crystal gain by "+format(x)+"x",
            },{
                unl: _=>player.aTimes>0,
                req: E(1e21),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = c.div(this.req.div(tmp.chargeOoMMul).max(1)).max(1)

                    let x = s.root(4)

                    return x.toNumber()
                },
                effDesc: x => "Boost AP gain by "+format(x)+"x",
            },{
                unl: _=>player.lTimes>0,
                req: E(1e26),
                eff(c) {
                    if (player.bestCharge.lt(this.req)) return E(1)

                    let s = c.div(this.req.div(tmp.chargeOoMMul).max(1)).max(1)

                    let x = s.root(4)

                    return x.toNumber()
                },
                effDesc: x => "Boost Oil gain by "+format(x)+"x",
            },
        ],
    },
}

RESET.steel = {
    unl: _=>player.grasshop>=10||player.gTimes>0,

    req: _=>player.level>=400,
    reqDesc: _=>`Reach Level 400.`,

    resetDesc: `Reset everything grasshop does, but it benefits from the milestones for grasshop.<br>Gain more Steels based on grasshop and Crystal.`,
    resetGain: _=> `Gain <b>${tmp.steelGain.format(0)}</b> Steel`,

    title: `Steelie`,
    resetBtn: `Steelie!`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                player.steel = player.steel.add(tmp.steelGain)
                player.sTimes++
            }

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="steel") {
        player.sTime = 0
        player.chargeRate = E(0)

        RESET.gh.reset(true)
    },
}

UPGS.factory = {
    title: "The Factory",

    unl: _=>player.sTimes > 0,

    underDesc: _=>`You have ${format(player.steel,0)} Steel`+(tmp.steelPass>0?" <span class='smallAmt'>"+player.steel.formatGain(tmp.steelGain.mul(tmp.steelPass))+"</span>":""),

    autoUnl: _=>hasStarTree('auto',2),

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

    unl: _=>hasUpgrade('factory',0),

    underDesc: _=>`<b class="green">${tmp.foundryEff.format()}x</b> <span style="font-size:14px;">to Steel multiplier based on time since last steelie (max 1 hour)</span>`,

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

    unl: _=>hasUpgrade('factory',1),

    underDesc: _=>`<b class="green">${format(upgEffect('factory',1))}x</b> <span style="font-size:14px;">to PP/Crystal generator multiplier from factory upgrade</span>`,

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

            unl: _=>player.grasshop>=14||player.gTimes>0,

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

            unl: _=>player.grasshop>=14||player.gTimes>0,

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

    unl: _=>hasUpgrade('factory',3),

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
            unl: _=>player.aTimes>0,

            title: "Limitless Crystal Upgrades",
            desc: `<b class="green">Tier Base</b> will no longer have maximum limit.`,
        
            res: "steel",
            icon: ["Curr/Crystal","Icons/Automation2"],
                        
            cost: i => E(1e45),
            bulk: i => 1,
        },{
            unl: _=>player.aTimes>0,

            title: "Limitless Crystal Upgrades II",
            desc: `<b class="green">Grass Value III, XP III, TP II & PP</b> will no longer have maximum limit.`,
        
            res: "steel",
            icon: ["Curr/Crystal","Icons/Automation2"],
                        
            cost: i => E(1e50),
            bulk: i => 1,
        },{
            unl: _=>player.lTimes>0,

            title: "Charge Milestone Effect",
            desc: `Unsoftcap the effect of 3rd charge milestone.`,
        
            res: "steel",
            icon: ["Curr/Charge","Icons/Plus"],
                        
            cost: i => E(1e53),
            bulk: i => 1,
        },
    ],
}

tmp_update.push(_=>{
    let ms = MAIN.steel
    
    tmp.steelPass = starTreeEff('speed',7,0)
    tmp.steelGain = ms.gain()
    tmp.foundryEff = ms.foundryEff()

    tmp.chargeGain = ms.charger.gain()

    tmp.chargeOoM = 0
    if (player.grasshop >= 18) tmp.chargeOoM++
    if (player.grasshop >= 20) tmp.chargeOoM++
    if (player.grasshop >= 24) tmp.chargeOoM += getGHEffect(12,0)

    tmp.chargeOoMMul = Decimal.pow(10,tmp.chargeOoM)

    for (let x = 0; x < ms.charger.effs.length; x++) {
        let ce = ms.charger.effs[x]
        let unl = ce.unl ? ce.unl() : true
        tmp.chargeEff[x] = ce.eff(unl?player.chargeRate:E(0))
    }
})

el.setup.factory = _=>{
    let table = new Element(charge_mil)
    let h = "Best Charge Milestones:"

    for (x in MAIN.steel.charger.effs) {
        let ce = MAIN.steel.charger.effs[x]

        h += `<div id="charge_mil${x}">${format(ce.req,0)} - <span id="charge_mil_eff${x}"></span></div>`
    }

    table.setHTML(h)
}

el.update.factory = _=>{
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