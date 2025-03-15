CURRENCIES.star = {
    name: "Stars",
    icon: "Curr/Star",
    base: "Bases/SpaceBase",

    get amount() { return player.galactic.star },
    set amount(v) { player.galactic.star = v.max(0) },

    get gain() {
        if (!RESETS.galactic.unl()) return E(0);

        let x = E(10).add(getMilestoneEffect('grass-skip',0,0))

        x = x.mul(ASTRAL.bonus('stars')).mul(upgradeEffect('moonstone',8)).mul(tmp.star_acc_effect??1).mul(upgradeEffect('accumulator',1)).mul(upgradeEffect('accumulator',2)).mul(upgradeEffect('accumulator',3)).mul(upgradeEffect("moonstone",14)).mul(upgradeEffect("moonstone",18)).mul(upgradeEffect('sfrgt',3)).mul(upgradeEffect('refinery','1i')).mul(upgradeEffect('refinery','2i')).mul(upgradeEffect('dark-matter',5))

        return x.floor()
    },

    get passive() { return 0 },
}

RESETS.galactic = {
    pos: [-4,11],
    unl: () => player.rocket.part.gte(player.agh.lte(-24) ? 1 : 10),

    req: () => true,
    req_desc: "???",

    name: "Galactic",
    reset_desc: `Resets EVERYTHING except rocket fuel upgrades (rocket fuel itself is reset).`,
    color: ["#34006e", "#6900dd"],

    icon: "Curr/Star",
    curr: "star",

    success() {
        player.galactic.times++

        player.agh = player.agh.min(player.grasshop)
        if (player.grasshop.eq(0)) player.agh = player.agh.min(player.grassskip.neg()).max(-60);

        updateTemp()

        teleportTo(4,true)
    },
    doReset() {
        resetUpgrades('factory')
        resetUpgrades('foundry')
        resetUpgrades('generator')
        resetUpgrades('assembler')

        let k = []

        if (hasUpgrade("star","A1")) k.push("3");
        if (hasUpgrade("star","A2")) k.push("5","9");
        if (hasUpgrade("star","A3")) k.push("1","2","6");
        if (hasUpgrade("star","A4")) k.push("8","10");
        if (hasUpgrade("star","A5")) k.push("4","7");

        resetUpgrades('auto',k)

        k = []

        if (hasUpgrade("star","A7")) k.push("1","2","3");
        if (hasUpgrade("star","A9")) k.push("4");
        if (hasUpgrade("star","A11")) k.push("5");

        resetUpgrades('anti-auto',k)
        resetUpgrades('platinum')

        player.grasshop = E(0)
        player.grassskip = E(0)
        player.rocket.part = E(0)

        CURRENCIES['rocket-fuel'].amount = E(0)

        if (player.agh.gt(-21)) {
            CURRENCIES.momentum.amount = E(0)
            resetUpgrades('momentum')
        }

        if (player.agh.gt(-15)) CURRENCIES.platinum.amount = E(0);

        CURRENCIES.charge.best=E(0)

        for (let i = 0; i < ACCOM.ctn.length; i++) if (player.agh.gt(7) || i === 9) player.accomplishments[i] = E(0);

        player.auto_accomplish = 0;
        player.galactic.time = 0;
        player.funify.gal_times = 0;

        RESETS["rocket-part"].doReset()
        RESETS.steelie.doReset()
    },
}

UPGRADES.star = {
    unl: () => tmp.star_unl,
    pos: [-3, -21],
    size: [7, 2],
    color: ['#02001d','#ccc'],
    type: "vertical-center",
    base: "Bases/SpaceBase",
    curr_dis: {
        id: "star",
        // get text() { return "RAAAAAAAAAUGH" },
    },
    bottom_text: "",
    cannot_hide: true,
    map: [
        ["","A1","","S4","S3","S1","","","","P1",""],
        ["A13","A2","A3","S5","S2","SC1a","SC1f","","P2","PS1","P3"],
        ["A12","A4","A5","SC1b","SC1c","SC2a","SC1d","SC1e","PS2","PS3","PS4"],
        ["A6","A7","A8","SC2b","SC2c","SC3a","SC2d","SC2e","PS5","PS6",""],
        ["","A9","","","SC3c","SC4a","SC3d","SC3e","","",""],
        ["A10","A11","","","SC4c","SC5a","SC4d","SC4e","","",""],
        ["","SC5c","SC6a","SC5d","SC5e"],
        ["SC6c","SC7a","SC6e"],
        ["SC7c","SC8a","SC7e"],
        ["SC9a"],
    ],
    ctn: {
        "A1": {
            unl: ()=>true,
            icons: ["Curr/Grass","Icons/StarAuto"],

            name: `Automation Keeper A`,
            desc: `Keep the grass upgrade autobuyer upgrade on Galactic.<br><span class="lightblue">Unlocks more upgrades.</span>`,

            noCostIncrease: true,
            cost: ()=>5,
            res: "star",
        },
        "A2": {
            unl: ()=>hasUpgrade('star','A1'),
            icons: ["Curr/Prestige","Icons/StarAuto"],

            name: `Automation Keeper B1`,
            desc: `Keep the prestige upgrade autobuyer and PP Generation upgrades on Galactic.<br><span class="lightblue">Unlocks more upgrades.</span>`,

            noCostIncrease: true,
            cost: ()=>15,
            res: "star",
        },
        "A3": {
            unl: ()=>hasUpgrade('star','A1'),
            icons: ["Curr/Grass","Icons/StarAuto"],

            name: `Automation Keeper B2`,
            desc: `Keep all automation autocut upgrades on Galactic.`,

            noCostIncrease: true,
            cost: ()=>10,
            res: "star",
        },
        "A4": {
            unl: ()=>hasUpgrade('star','A2'),
            icons: ["Curr/Crystal","Icons/StarAuto"],

            name: `Automation Keeper C1`,
            desc: `Keep the crystal upgrade autobuyer and Crystal Generation upgrades on Galactic.<br><span class="lightblue">Unlocks more upgrades.</span>`,

            noCostIncrease: true,
            cost: ()=>40,
            res: "star",
        },
        "A5": {
            unl: ()=>hasUpgrade('star','A2'),
            icons: ["Curr/Perks","Icons/StarAuto"],

            name: `Automation Keeper C2`,
            desc: `Keep all perk keeper upgrades on Galactic.`,

            noCostIncrease: true,
            cost: ()=>60,
            res: "star",
        },
        "A6": {
            unl: ()=>hasUpgrade('star','A4'),
            icons: ["Curr/Steel2","Icons/StarAuto"],

            name: `The Factory Automation`,
            desc: `Automates all factory upgrades, including the factory, foundry, generator, and assembler upgrades (comes with EL).`,

            noCostIncrease: true,
            cost: ()=>400,
            res: "star",
        },
        "A7": {
            unl: ()=>hasUpgrade('star','A4'),
            icons: ["Curr/AntiGrass","Icons/StarAuto"],

            name: `Automation Keeper D1`,
            desc: `Keep all anti-grass upgrade autobuyer and anti autocut upgrades on Galactic.<br><span class="lightblue">Unlocks more upgrades.</span>`,

            noCostIncrease: true,
            cost: ()=>300,
            res: "star",
        },
        "A8": {
            unl: ()=>hasUpgrade('star','A4'),
            icons: ["Curr/Perks","Icons/StarAuto"],

            name: `Perk Autobuy`,
            desc: `Unlocks perk autobuyer (comes with EL).`,

            noCostIncrease: true,
            cost: ()=>600,
            res: "star",
        },
        "A9": {
            unl: ()=>hasUpgrade('star','A7'),
            icons: ["Curr/Anonymity","Icons/StarAuto"],

            name: `Automation Keeper E1`,
            desc: `Keep the anonymity upgrade autobuyer upgrade on Galactic.<br><span class="lightblue">Unlocks more upgrades.</span>`,

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "star",
        },
        "A10": {
            unl: ()=>hasUpgrade('star','A9'),
            icons: ["Curr/Platinum","Icons/StarAuto"],

            name: `Platinum Autobuy`,
            desc: `Unlocks platinum autobuyer.`,

            noCostIncrease: true,
            cost: ()=>5e3,
            res: "star",
        },
        "A11": {
            unl: ()=>hasUpgrade('star','A9'),
            icons: ["Curr/Oil","Icons/StarAuto"],

            name: `Automation Keeper F1`,
            desc: `Keep the oil upgrade autobuyer upgrade on Galactic.<br><span class="lightblue">Unlocks upgrade.</span>`,

            noCostIncrease: true,
            cost: ()=>2e3,
            res: "star",
        },
        "A12": {
            max: 2,
            unl: ()=>hasUpgrade('star','A2'),
            icons: ["Icons/Grasshop2","Icons/StarAuto"],

            name: `Multi & Auto Grasshop`,
            desc: `On the first level, allows grasshopping multiple times if your level is high enough.<br>On the second level, automatically updates grasshop count.`,

            cost: a=>[1e3,1e12][a]??EINF,
            res: "star",
        },
        "A13": {
            max: 2,
            unl: ()=>hasUpgrade('star','A12'),
            icons: ["Icons/GrassSkip","Icons/StarAuto"],

            name: `Multi & Auto Grass-Skip`,
            desc: `On the first level, allows grass-skipping multiple times if your level is high enough.<br>On the second level, automatically updates grass-skip count.`,

            cost: a=>[2.5e4,1e14][a]??EINF,
            res: "star",
        },

        "S1": {
            max: 10,
            unl: ()=>true,
            icons: ["Curr/Steel2","Icons/StarSpeed"],

            name: `Faster Foundry`,
            desc: `Divides the time to max foundry bonus by <b class="green">2</b> per level.<br><span class="lightblue">Unlocks more upgrades.</span><br><span class="lightblue">Unlocks Steel Generation upgrade at max level.</span>`,

            cost: a => a.simpleCost("EA", 5, .2, 2).ceil(),
            res: "star",

            effect(a) {
                let x = a.pow_base(2)
                return x
            },
            effDesc: x => formatMult(x.pow(-1)),
        },
        "S2": {
            max: 10,
            unl: ()=>hasUpgrade('star','S1'),
            icons: ["Icons/Accomplishment","Icons/StarSpeed"],

            name: `Faster Auto Accomplishments`,
            desc: `Divides the time for auto accomplish by <b class="green">2</b> per level.`,

            cost: a => a.simpleCost("EA", 15, .2, 2).ceil(),
            res: "star",

            effect(a) {
                let x = a.pow_base(2)
                return x
            },
            effDesc: x => formatMult(x.pow(-1)),
        },
        "S3": {
            max: 100,
            unl: ()=>hasUpgrade('star','S1',10),
            icons: ["Curr/Steel2","Icons/StarSpeed"],

            name: `Steel Generation`,
            desc: `<b class="green">+1%</b> passive steel generation per level.`,

            noCostIncrease: true,
            cost: ()=>1e4,
            res: "star",

            effect(a) {
                let x = a.mul(.01)
                return x
            },
            effDesc: x => "+"+formatPercent(x),
        },
        "S4": {
            max: 100,
            unl: ()=>hasUpgrade('star','S3'),
            icons: ["Curr/Steel2","Icons/StarSpeed"],

            name: `Steel Generation II`,
            tier: "II",
            desc: `<b class="green">+9%</b> passive steel generation per level.`,

            noCostIncrease: true,
            cost: ()=>1e9,
            res: "star",

            effect(a) {
                let x = a.mul(.09)
                return x
            },
            effDesc: x => "+"+formatPercent(x),
        },
        "S5": {
            unl: ()=>hasUpgrade('star','S3'),
            icons: ["Curr/Oil","Icons/StarSpeed"],

            name: `Unlock Oily Steel II`,
            desc: `Unlocks a second oily steel upgrade.`,

            noCostIncrease: true,
            cost: ()=>1e7,
            res: "star",
        },

        "SC1a": {
            max: 10,
            unl: ()=>hasUpgrade('star','S1'),
            icons: ["Curr/Charge","Icons/StarSpeed"],

            name: `Stellar Charge`,
            desc: `Increases charge rate by <b class="green">+100%</b> per level.<br><span class="lightblue">Unlocks more upgrades.</span>`,

            noCostIncrease: true,
            cost: ()=>15,
            res: "star",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC2a": {
            max: 10,
            unl: ()=>hasUpgrade('star','SC1a'),
            icons: ["Curr/Charge","Icons/StarSpeed"],

            name: `Stellar Charge II`,
            tier: "II",
            desc: `Increases charge rate by <b class="green">+100%</b> per level.<br><span class="lightblue">Unlocks more upgrades at max level.</span>`,

            noCostIncrease: true,
            cost: ()=>50,
            res: "star",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC3a": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC2a',10),
            icons: ["Curr/Charge","Icons/StarSpeed"],

            name: `Stellar Charge III`,
            tier: "III",
            desc: `Increases charge rate by <b class="green">+50%</b> per level.<br><span class="lightblue">Unlocks more upgrades at max level.</span>`,

            noCostIncrease: true,
            cost: ()=>250,
            res: "star",

            effect(a) {
                let x = a.mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC4a": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC3a',100),
            icons: ["Curr/Charge","Icons/StarSpeed"],

            name: `Stellar Charge IV`,
            tier: "IV",
            desc: `Increases charge rate by <b class="green">+25%</b> per level.<br><span class="lightblue">Unlocks more upgrades at max level.</span>`,

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "star",

            effect(a) {
                let x = a.mul(.25).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC5a": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC4a',100),
            icons: ["Curr/Charge","Icons/StarSpeed"],

            name: `Stellar Charge V`,
            tier: "V",
            desc: `Increases charge rate by <b class="green">+10%</b> per level.<br><span class="lightblue">Unlocks more upgrades at max level.</span>`,

            noCostIncrease: true,
            cost: ()=>1e4,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC6a": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC5a',100),
            icons: ["Curr/Charge","Icons/StarSpeed"],

            name: `Stellar Charge VI`,
            tier: "VI",
            desc: `Increases charge rate by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e6,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC7a": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC6a',100),
            icons: ["Curr/Charge","Icons/StarSpeed"],

            name: `Stellar Charge VII`,
            tier: "VII",
            desc: `Increases charge rate by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e9,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC8a": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC7a',100),
            icons: ["Curr/Charge","Icons/StarSpeed"],

            name: `Stellar Charge VIII`,
            tier: "VIII",
            desc: `Increases charge rate by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e13,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC9a": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC8a',100),
            icons: ["Curr/Charge","Icons/StarSpeed"],

            name: `Stellar Charge IX`,
            tier: "IX",
            desc: `Increases charge rate by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e16,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },

        "SC1b": {
            max: 10,
            unl: ()=>hasUpgrade('star','SC1a'),
            icons: ["Curr/Grass","Icons/StarSpeed"],

            name: `Stellar Grass`,
            desc: `Increases grass value by <b class="green">+100%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>20,
            res: "star",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC1c": {
            max: 10,
            unl: ()=>hasUpgrade('star','SC1a'),
            icons: ["Icons/XP","Icons/StarSpeed"],

            name: `Stellar XP`,
            desc: `Increases experience gained by <b class="green">+100%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>20,
            res: "star",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC1d": {
            max: 10,
            unl: ()=>hasUpgrade('star','SC1a'),
            icons: ["Icons/TP","Icons/StarSpeed"],

            name: `Stellar TP`,
            desc: `Increases tier progress gained by <b class="green">+100%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>20,
            res: "star",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC1e": {
            max: 10,
            unl: ()=>hasUpgrade('star','SC1a'),
            icons: ["Icons/AntiXP","Icons/StarSpeed"],

            name: `Stellar Anti XP`,
            desc: `Increases anti experience gained by <b class="green">+100%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>20,
            res: "star",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC1f": {
            max: 10,
            unl: ()=>hasUpgrade('star','SC1a'),
            icons: ["Curr/Oil","Icons/StarSpeed"],

            name: `Stellar Oil`,
            desc: `Increases oil gained by <b class="green">+100%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>20,
            res: "star",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC2b": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC2a',10),
            icons: ["Curr/Grass","Icons/StarSpeed"],

            name: `Stellar Grass II`,
            tier: "II",
            desc: `Increases grass value by <b class="green">+50%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>250,
            res: "star",

            effect(a) {
                let x = a.mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC2c": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC2a',10),
            icons: ["Icons/XP","Icons/StarSpeed"],

            name: `Stellar XP II`,
            tier: "II",
            desc: `Increases experience gained by <b class="green">+50%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>250,
            res: "star",

            effect(a) {
                let x = a.mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC2d": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC2a',10),
            icons: ["Icons/TP","Icons/StarSpeed"],

            name: `Stellar TP II`,
            tier: "II",
            desc: `Increases tier progress gained by <b class="green">+50%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>250,
            res: "star",

            effect(a) {
                let x = a.mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC2e": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC2a',10),
            icons: ["Icons/AntiXP","Icons/StarSpeed"],

            name: `Stellar Anti XP II`,
            tier: "II",
            desc: `Increases anti experience gained by <b class="green">+50%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>250,
            res: "star",

            effect(a) {
                let x = a.mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC3c": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC3a',100),
            icons: ["Icons/XP","Icons/StarSpeed"],

            name: `Stellar XP III`,
            tier: "III",
            desc: `Increases experience gained by <b class="green">+25%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "star",

            effect(a) {
                let x = a.mul(.25).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC3d": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC3a',100),
            icons: ["Icons/TP","Icons/StarSpeed"],

            name: `Stellar TP III`,
            tier: "III",
            desc: `Increases tier progress gained by <b class="green">+25%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "star",

            effect(a) {
                let x = a.mul(.25).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC3e": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC3a',100),
            icons: ["Icons/AntiXP","Icons/StarSpeed"],

            name: `Stellar Anti XP III`,
            tier: "III",
            desc: `Increases anti experience gained by <b class="green">+50%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "star",

            effect(a) {
                let x = a.mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC4c": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC4a',100),
            icons: ["Icons/XP","Icons/StarSpeed"],

            name: `Stellar XP IV`,
            tier: "IV",
            desc: `Increases experience gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e4,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC4d": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC4a',100),
            icons: ["Icons/TP","Icons/StarSpeed"],

            name: `Stellar TP IV`,
            tier: "IV",
            desc: `Increases tier progress gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e4,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC4e": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC4a',100),
            icons: ["Icons/AntiXP","Icons/StarSpeed"],

            name: `Stellar Anti XP IV`,
            tier: "IV",
            desc: `Increases anti experience gained by <b class="green">+50%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e4,
            res: "star",

            effect(a) {
                let x = a.mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC5c": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC5a',100),
            icons: ["Icons/XP","Icons/StarSpeed"],

            name: `Stellar XP V`,
            tier: "V",
            desc: `Increases experience gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e6,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC5d": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC5a',100),
            icons: ["Icons/TP","Icons/StarSpeed"],

            name: `Stellar TP V`,
            tier: "V",
            desc: `Increases tier progress gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e6,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC5e": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC5a',100),
            icons: ["Icons/AntiXP","Icons/StarSpeed"],

            name: `Stellar Anti XP V`,
            tier: "V",
            desc: `Increases anti experience gained by <b class="green">+50%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e6,
            res: "star",

            effect(a) {
                let x = a.mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC6c": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC6a',100),
            icons: ["Icons/XP","Icons/StarSpeed"],

            name: `Stellar XP VI`,
            tier: "VI",
            desc: `Increases experience gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e9,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC6e": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC6a',100),
            icons: ["Icons/AntiXP","Icons/StarSpeed"],

            name: `Stellar Anti XP VI`,
            tier: "VI",
            desc: `Increases anti experience gained by <b class="green">+25%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e9,
            res: "star",

            effect(a) {
                let x = a.mul(.25).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC7c": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC7a',100),
            icons: ["Icons/XP","Icons/StarSpeed"],

            name: `Stellar XP VII`,
            tier: "VII",
            desc: `Increases experience gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e13,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "SC7e": {
            max: 100,
            unl: ()=>hasUpgrade('star','SC7a',100),
            icons: ["Icons/AntiXP","Icons/StarSpeed"],

            name: `Stellar Anti XP VII`,
            tier: "VII",
            desc: `Increases anti experience gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e13,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },

        // SCa - 9
        // SCb - 2
        // SCc - 7
        // SCd - 5
        // SCe - 6
        // SCf - 1

        "P1": {
            max: 10,
            unl: ()=>true,
            icons: ["Icons/MoreGrass","Icons/StarProgression"],

            name: `Stellar Grass Cap`,
            desc: `Increases grass and anti-grass cap by <b class="green">250</b> per level.<br><span class="lightblue">Unlocks more upgrades.</span>`,

            cost: a => a.lt(1) ? 5 : a.simpleCost("E", 1, 1e3),
            res: "star",

            effect(a) {
                let x = a.mul(250)
                return x
            },
            effDesc: x => "+"+format(x,0),
        },
        "P2": {
            max: 10,
            unl: ()=>hasUpgrade('star','P1'),
            icons: ["Curr/Grass","Icons/StarProgression"],

            name: `Stellar Autocut`,
            desc: `Increases autocut amount by <b class="green">3</b> per level.`,

            cost: a => a.simpleCost("E", 20, 100),
            res: "star",

            effect(a) {
                let x = a.mul(3)
                return x
            },
            effDesc: x => "+"+format(x,0),
        },
        "P3": {
            max: 10,
            unl: ()=>hasUpgrade('star','P1'),
            icons: ["Icons/Speed","Icons/StarProgression"],

            name: `Stellar ACS`,
            desc: `Increases autocut speed by <b class="green">1 grass/s</b> per level.`,

            cost: a => a.simpleCost("E", 4e3, 100),
            res: "star",

            effect(a) {
                let x = a
                return x
            },
            effDesc: x => "+"+format(x,0)+"/s",
        },

        "PS1": {
            max: 5,
            unl: ()=>hasUpgrade('star','P1'),
            icons: ["Icons/SP","Icons/StarProgression"],

            name: `Space Power`,
            desc: `Increases space power (SP) gained by <b class="green">+100%</b> per level.<br><span class="lightblue">Unlocks a upgrade at max level.</span>`,

            noCostIncrease: true,
            cost: ()=>15,
            res: "star",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "PS2": {
            max: 10,
            unl: ()=>hasUpgrade('star','PS1',5),
            icons: ["Icons/SP","Icons/StarProgression"],

            name: `Space Power II`,
            tier: "II",
            desc: `Increases space power (SP) gained by <b class="green">+50%</b> per level.<br><span class="lightblue">Unlocks a upgrade at max level.</span>`,

            noCostIncrease: true,
            cost: ()=>300,
            res: "star",

            effect(a) {
                let x = a.mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "PS3": {
            max: 100,
            unl: ()=>hasUpgrade('star','PS2',10),
            icons: ["Icons/SP","Icons/StarProgression"],

            name: `Space Power III`,
            tier: "III",
            desc: `Increases space power (SP) gained by <b class="green">+25%</b> per level.<br><span class="lightblue">Unlocks a upgrade at max level.</span>`,

            noCostIncrease: true,
            cost: ()=>2e3,
            res: "star",

            effect(a) {
                let x = a.mul(.25).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "PS4": {
            max: 100,
            unl: ()=>hasUpgrade('star','PS3',100),
            icons: ["Icons/SP","Icons/StarProgression"],

            name: `Space Power IV`,
            tier: "IV",
            desc: `Increases space power (SP) gained by <b class="green">+10%</b> per level.<br><span class="lightblue">Unlocks a upgrade at max level.</span>`,

            noCostIncrease: true,
            cost: ()=>1e4,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "PS5": {
            max: 100,
            unl: ()=>hasUpgrade('star','PS4',100),
            icons: ["Icons/SP","Icons/StarProgression"],

            name: `Space Power V`,
            tier: "V",
            desc: `Increases space power (SP) gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e6,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "PS6": {
            max: 100,
            unl: ()=>hasUpgrade('star','PS5',100),
            icons: ["Icons/SP","Icons/StarProgression"],

            name: `Space Power VI`,
            tier: "VI",
            desc: `Increases space power (SP) gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e9,
            res: "star",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}

UPGRADES['star-ultimate'] = {
    unl: () => player.agh.lte(-27),
    pos: [-3, -22],
    size: [3, 1],
    color: ['#02001d','#ccc'],
    type: "normal",
    base: "Bases/SpaceBase",
    curr_dis: {
        get text() { return "Ultimate Star Chart" },
        icon: "Curr/Star",
    },
    ctn: {
        "1": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Charge"],

            name: `Stellar Charger U`,
            desc: `Increases charge rate by <b class="green">+5%</b> compounding per level.`,

            cost: a => a.simpleCost("EA", 1e15, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e15, .2, 1.15).add(1).floor(),
            res: "star",

            effect(a) {
                let x = a.pow_base(1.05)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2": {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/XP"],

            name: `Stellar XP U`,
            desc: `Increases normal and anti experience gained by <b class="green">+5%</b> compounding per level.`,

            cost: a => a.simpleCost("EA", 1e15, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e15, .2, 1.15).add(1).floor(),
            res: "star",

            effect(a) {
                let x = a.pow_base(1.05)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3": {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/SP"],

            name: `Stellar Power U`,
            desc: `Increases space power gained by <b class="green">+5%</b> compounding per level.`,

            cost: a => a.simpleCost("EA", 1e15, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e15, .2, 1.15).add(1).floor(),
            res: "star",

            effect(a) {
                let x = a.pow_base(1.05)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "4": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Oil"],

            name: `Stellar Oil U`,
            desc: `Increases oil gained by <b class="green">+5%</b> compounding per level.`,

            cost: a => a.simpleCost("EA", 1e15, .2, 1.15).ceil(),
            bulk: a => a.simpleCost("EAI", 1e15, .2, 1.15).add(1).floor(),
            res: "star",

            effect(a) {
                let x = a.pow_base(1.05)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}

MILESTONES.agh = {
    unl: () => tmp.star_unl,
    pos: [4,-21],
    color: ["#5e005f", "#0c0"],

    name: x => x >= 0 ? `${x} Grasshop or lower` : `0 Grasshop and ${-x} Grass-Skip`,
    get amount() { return player.agh },
    get amount_desc() {
        let h = `Your lowest Grasshop is <b class="green">${format(this.amount.max(0),0)}</b>.`
        if (this.amount.lt(0)) h = `<b class="small-text">${h}<br>Your highest Zero Grasshop Grasshop-Skips is <b class="green">${format(this.amount.neg(),0)}</b>.</b>`
        return h
    },
    condition(x) { return player.agh.lte(x) },

    ctn: [
        { // 0
            r: 28,
            get desc() { return `Earns <b class="green">x1.25</b> more grass per astral.<br>
                Unlocks an oil upgrade autobuyer upgrade.`
            },
        },{
            r: 25,
            get desc() { return `Earns <b class="green">x1.25</b> more XP per astral.<br>
                <b class="green">+1%</b> moonstone chance per anti-grasshop milestone below this up to 7%.` },
            effect: a => Decimal.sub(28,a).div(3).floor().max(0).min(7).mul(.01),
        },{
            r: 22,
            get desc() { return `Earns <b class="green">x1.25</b> more tier progress per astral.<br>
                Increases anti-experience gained by <b class="green">x1.05</b> per tier.` },
        },{
            r: 19,
            get desc() { return `Earns <b class="green">+10%</b> more stars per astral.<br>
                Unlocks a new factory upgrade.`
            },
        },{
            r: 16,
            get desc() { return `Earns <b class="green">+1</b> more moonstones per astral.` },
        },{ // 5
            r: 13,
            get desc() { return `Earns <b class="green">x1.25</b> more charge per astral.` },
        },{
            r: 10,
            get desc() { return `Earns <b class="green">x2</b> more SFRGT generation per astral, starting at 19 and ending at 100.` },
        },{
            r: 7,
            get desc() { return `Keeps accomplishment levels on galactic, except Empower.` },
        },{
            r: 4,
            get desc() { return `<b class="green">Oil Drilling Rig</b> upgrade is always unlocked without getting the first rocket part.` },
        },{
            r: 1,
            get desc() { return `Earns <b class="green">x10</b> more SP.` },
        },{ // 10
            r: 0,
            get desc() { return `Unlocks a new rocket fuel and moonstone upgrade for stars.` },
        },{
            r: -3,
            get desc() { return `Normal realm XP multiplier boosts anti realm XP multiplier by <b class="green">x10<sup>lg(XP)<sup>${format(getMilestoneEffect('agh',13).mul(.5),3)}</sup></sup></b>. <b class="gray">(${formatMult(tmp.aghgs3eff ?? 1)})</b><br>
                Earns <b class="green">+5</b> more stars per grass-skip.` },
        },{
            r: -6,
            get desc() { return `Doubles SP gained for every 3 zero grasshop grass-skips (ends at 60).` },
            effect: a => a.neg().max(0).div(3).floor().pow_base(2),
        },{
            r: -9,
            get desc() { return `Increases the exponent of AGHGS3's boost to Anti-XP by <b class="green">+2.5%</b> for every 3 zero grasshop grass-skips (ends at 30).<br>
                Doubles moonstone worth.` },
                effect: a => a.neg().max(0).div(3).floor().mul(.025).add(1).min(1.25),
        },{
            r: -12,
            get desc() { return `Auto accomplish applies to Empower.` },
        },{
            r: -15,
            get desc() { return `You don't lose platinum on galactic.` },
        },{
            r: -18,
            get desc() { return `Unlocks <b class="green">Sacrifice</b>.` },
        },{
            r: -21,
            get desc() { return `Keeps momentum and momentum upgrades on galactic.<br>
                Unlock more momentum upgrades.` },
        },{
            r: -24,
            get desc() { return `Galactic only requires one part which is the same cost as the 10th part normally.<br>
                Rocket part cap is increased and requirements scale significantly, but you earn more momentum.` },
        },{
            r: -27,
            get desc() { return `Unlock more dark matter upgrades and star chart Ultimate Tree.` },
        },{
            r: -30,
            get desc() { return `Unlocks the <b class="green">Planetoid</b>. <b class="gray">(Not yet implemented!)</b><br>
                Earns <b class="green">10%</b> more anti-grass compounding per each anti-level.` },
        },
    ],
}

const ASTRAL = {
    effects: {
        prestige: {
            desc: x => `PP bonus: <b class="green">${formatMult(x)}</b>`,
            effect: x => x.sub(1).pow_base(1.4),
        },
        crystal: {
            desc: x => `Crystal bonus: <b class="green">${formatMult(x)}</b>`,
            effect: x => x.sub(1).pow_base(1.1),
        },
        platinum: {
            desc: x => `Platinum worth: <b class="green">+${format(x,0)}</b>`,
            effect: x => x.sub(1).div(2).sub(1).floor().max(0)
        },
        steel: {
            desc: x => `Steel bonus: <b class="green">${formatMult(x)}</b>`,
            effect: x => x,
        },
        grass: {
            unl: () => player.agh.lte(28),
            desc: x => `Grass bonus: <b class="green">${formatMult(x)}</b>`,
            effect: x => x.sub(1).pow_base(1.25),
        },
        xp: {
            unl: () => player.agh.lte(25),
            desc: x => `XP bonus: <b class="green">${formatMult(x)}</b>`,
            effect: x => x.sub(1).pow_base(1.25),
        },
        tp: {
            unl: () => player.agh.lte(22),
            desc: x => `TP bonus: <b class="green">${formatMult(x)}</b>`,
            effect: x => x.sub(1).pow_base(1.25),
        },
        stars: {
            unl: () => player.agh.lte(19),
            desc: x => `Stars bonus: <b class="green">${formatMult(x)}</b>`,
            effect: x => x.mul(.1).add(1),
        },
        moonstone: {
            unl: () => player.agh.lte(16),
            desc: x => `Moonstone worth: <b class="green">+${format(x,0)}</b>`,
            effect: x => x.sub(1)
        },
        charge: {
            unl: () => player.agh.lte(13),
            desc: x => `Charge bonus: <b class="green">${formatMult(x)}</b>`,
            effect: x => x.sub(1).pow_base(1.25),
        },
        sfrgt: {
            unl: () => player.agh.lte(10),
            desc: x => `SFRGT bonus: <b class="green">${formatMult(x)}</b>`,
            effect: x => x.max(18).min(100).sub(18).max(0).pow_base(2),
        },

        /*
            x.prestige = a.pow_base(1.4)
            x.crystal = a.pow_base(1.1)
            x.platinum = a.div(2).sub(1).floor().max(0)
            x.steel = a

            if (player.agh.lte(28)) x.grass = a.pow_base(1.25);
            if (player.agh.lte(25)) x.xp = a.pow_base(1.25);
            if (player.agh.lte(22)) x.tp = a.pow_base(1.25);
            if (player.agh.lte(19)) x.stars = a.mul(.1).add(1);
        */
    },

    bonus: (x,def=E(1)) => tmp.lvl_bonus.sp[x] ?? def,

    setup() {
        createGridElement('astral-bonus',{
            unl: ()=>player.astral.gte(1),
            pos: [4,-19],
            size: [2,2],
            class: "fill-div",
            style: {
                backgroundColor: "purple",
            },
            get html() {
                let h = ``

                h += `<div class="upg-curr-display"><img src="images/Icons/SP.png"><div id="astral-amount">???</div></div>`

                let html = ""

                for (let i in ASTRAL.effects) {
                    html += `<div id="astral-effect-${i}"></div>`
                }

                h += `<div class="astral-table">${html}</div>`

                return h
            },
            updateHTML() {
                el('astral-amount').innerHTML = "Astral " + format(player.astral,0)

                for (let i in ASTRAL.effects) {
                    let m = ASTRAL.effects[i]

                    el('astral-effect-'+i).style.display = !m.unl || m.unl() ? "block" : "none"

                    el('astral-effect-'+i).innerHTML = m.desc(tmp.lvl_bonus.sp[i])
                    // el('charger-milestone-'+i).className = best_oom.gte(m.oom) ? "green" : "gray"
                }
            },
        })
    },
}

UPGRADES.moonstone = {
    unl: ()=>player.galactic.times>0,
    pos: [2,-19],
    size: [2,2],
    type: 'vertical',
    color: ['#5368C3','#2B346C'],
    base: "Bases/MoonBase",
    curr_dis: {
        id: "moonstone",
        // get text() { return "RAAAAAAAAAUGH" },
    },
    get bottom_text() { return `Moonstone grow chance: <b class='green'>${formatPercent(GRASS.resource.moonstone.chance)}</b> in place of platinum` },
    ctn: {
        "1": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Grass"],

            name: `Moon Grass`,
            desc: `Increases grass value by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>3,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Prestige"],

            name: `Moon Prestige`,
            desc: `Increases prestige points gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>3,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Crystal"],

            name: `Moon Crystal`,
            desc: `Increases crystals gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>3,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "4": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/XP"],

            name: `Moon XP`,
            desc: `Increases experience gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>10,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "5": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/TP"],

            name: `Moon TP`,
            desc: `Increases tier progress gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>10,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "6": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/AntiXP"],

            name: `Moon Anti XP`,
            desc: `Increases anti experience gained by <b class="green">+25%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>15,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.25).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "7": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Platinum"],

            name: `Moon Platinum`,
            desc: `Increases platinum gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>15,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "8": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Star"],

            name: `Moon Stars`,
            desc: `Increases stars gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>50,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "9": {
            max: 100,
            unl: ()=>player.funify.reached,
            icons: ["Curr/SuperFun"],

            name: `Moon SFRGT`,
            desc: `Increases SFRGT gained by <b class="green">+25%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>250,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.25).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "10": {
            max: 5,
            unl: ()=>true,
            icons: ["Curr/Grass"],

            name: `Autocut Value`,
            desc: `Increase grass autocut value <b class="green">+100%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "moonstone",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "11": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Platinum"],

            name: `Moon Platinum II`,
            tier: "II",
            desc: `Increases platinum gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "12": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Steel2"],

            name: `Moon Steel`,
            desc: `Increases steel gained by <b class="green">+25%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e3,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.25).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "13": {
            max: 100,
            unl: ()=>player.funify.reached,
            icons: ["Curr/Fun"],

            name: `Moon Fun`,
            desc: `Increases fun gained by <b class="green">+100%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>2e3,
            res: "moonstone",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "14": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Star"],

            name: `Moon Stars II`,
            tier: "II",
            desc: `Increases stars gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e4,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "15": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/AntiXP"],

            name: `Moon Anti XP II`,
            tier: "II",
            desc: `Increases anti experience gained by <b class="green">+25%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e4,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.25).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "16": {
            max: 100,
            unl: ()=>true,
            icons: ["Icons/XP"],

            name: `Moon XP II`,
            tier: "II",
            desc: `Increases experience gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e6,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "17": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Platinum"],

            name: `Moon Platinum III`,
            tier: "III",
            desc: `Increases platinum gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e6,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "18": {
            max: 100,
            unl: ()=>true,
            req: ()=>player.agh.lte(0),
            req_desc: "AGH 0",
            icons: ["Curr/Star"],

            name: `Moon Stars III`,
            tier: "III",
            desc: `Increases stars gained by <b class="green">+10%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e7,
            res: "moonstone",

            effect(a) {
                let x = a.mul(.1).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "19": {
            max: 100,
            unl: ()=>player.funify.reached,
            icons: ["Curr/Fun"],

            name: `Moon Fun II`,
            tier: "II",
            desc: `Increases fun gained by <b class="green">+100%</b> per level.`,

            noCostIncrease: true,
            cost: ()=>1e8,
            res: "moonstone",

            effect(a) {
                let x = a.add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}

CURRENCIES['dark-matter'] = {
    name: "Dark Matter",
    icon: "Curr/DarkMatter",
    base: "Bases/DarkMatterBase",

    get amount() { return player.sacrifice.points },
    set amount(v) { player.sacrifice.points = v.max(0) },

    get gain() {
        let s = player.galactic.star, x = s.div(1e15)

        if (player.agh.gt(-18) || x.lt(1)) return E(0);

        x = s.add(1).log(1.05).sub(700).mul(x.root(5))

        x = x.mul(upgradeEffect('normality',4)).mul(upgradeEffect('momentum','3c'))

        return x.floor()
    },

    get passive() { return 0 },
}

RESETS.sacrifice = {
    pos: [4,-22],
    unl: () => player.agh.lte(-18),

    req: () => true,
    req_desc: "???",

    name: "Sacrifice",
    get reset_desc() {
        return `Resets everything galactic does, as well as astral, stars, fun, fun upgrades (except ones in the funny machine) and SFRGT. Gain more dark matter based on stars.`
        +(player.sacrifice.times > 0 ? "" : `<br><b class="yellow">First Sacrifice unlocks a new building in the Funny Machine!</b>`)
    },
    color: ["#280643", "#5e005f"],

    icon: "Curr/DarkMatter",
    curr: "dark-matter",

    success() {
        player.sacrifice.times++
    },
    doReset() {
        player.galactic.star = E(0)

        player.sp = E(0)
        player.astral = E(1)

        player.funify.fun = E(0)
        player.funify.sfrgt = E(0)

        resetUpgrades('fundry')
        resetUpgrades('sfrgt')

        RESETS.galactic.doReset()
    },
}

UPGRADES['dark-matter'] = {
    unl: () => player.agh.lte(-18),
    pos: [0,-22],
    size: [4,1],
    color: ["#280643", "#5e005f"],
    type: "normal",
    base: "Bases/DarkMatterBase",
    curr_dis: {
        id: "dark-matter",
        // get text() { return "RAAAAAAAAAUGH" },
    },
    ctn: {
        "1": {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/XP"],

            name: `Dark XP`,
            desc: `Increases experience gained by <b class="green">+100%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 1, .2, 1.2).add(1).floor(),
            res: "dark-matter",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        "2": {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/TP"],

            name: `Dark TP`,
            desc: `Increases tier progress gained by <b class="green">+100%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 1, .2, 1.2).add(1).floor(),
            res: "dark-matter",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        "3": {
            max: 1000,
            unl: ()=>true,
            icons: ["Icons/SP"],

            name: `Dark SP`,
            desc: `Increases space power gained by <b class="green">+100%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 1, .2, 1.2).add(1).floor(),
            res: "dark-matter",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        "4": {
            max: 1000,
            unl: ()=>true,
            icons: ["Curr/Charge"],

            name: `Dark Charge`,
            desc: `Increases charge rate by <b class="green">+100%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 1, .2, 1.2).add(1).floor(),
            res: "dark-matter",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        "5": {
            max: 100,
            unl: ()=>true,
            icons: ["Curr/Star"],

            name: `Dark Stars`,
            desc: `Increases stars gained by <b class="green">+50%</b> per level.`,

            cost: a => a.simpleCost("EA", 10, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 10, .2, 1.2).add(1).floor(),
            res: "dark-matter",

            effect(a) {
                let x = a.mul(.5).add(1)
                return x
            },
            effDesc: x => formatMult(x),
        },
        "6": {
            max: 1000,
            unl: ()=>true,
            req: ()=>player.agh.lte(-27),
            req_desc: "AGHGS 27",
            icons: ["Curr/Normality"],

            name: `Dark NP`,
            desc: `Increases normality points gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 100, .2, 1.2).ceil(),
            bulk: a => a.simpleCost("EAI", 100, .2, 1.2).add(1).floor(),
            res: "dark-matter",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
        "7": {
            max: 1000,
            unl: ()=>true,
            req: ()=>player.agh.lte(-27),
            req_desc: "AGHGS 27",
            icons: ["Curr/Momentum"],

            name: `Dark Momentum`,
            desc: `Increases momentum gained by <b class="green">+25%</b> per level.<br>This effect is increased by <b class="green">+25%</b> every <b class="yellow">25</b> levels.`,

            cost: a => a.simpleCost("EA", 1000, .2, 1.18).ceil(),
            bulk: a => a.simpleCost("EAI", 1000, .2, 1.18).add(1).floor(),
            res: "dark-matter",

            effect(a) {
                let x = Decimal.pow(1.25,a.div(25).floor()).mul(a.mul(.25).add(1))
                return x
            },
            effDesc: x => formatMult(x),
        },
    },
}