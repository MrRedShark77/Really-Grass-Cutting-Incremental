const SOLARIANS = {
    get offense() {
        let x = player.sol.fight_mult
        
        .mul(getFormingBonus('stats',0)).mul(getFormingBonus('stats',2))
        .mul(solarUpgEffect(6,5))
        .mul(solarUpgEffect(5,3))
        .mul(solarUpgEffect(9,1))

        .mul(getSolCompressionEffect(0))
        .mul(getFormingBonus('restore',3))

        .mul(getStarBonus(7)).mul(tmp.twilightBonus[0]??1)

        x = x.pow(solarUpgEffect(9,7)).pow(solarUpgEffect(9,9)).pow(solarUpgEffect(11,1)).pow(upgEffect('cs',1)).pow(tmp.twilightBonus[3]??1)

        if (hasSolarUpgrade(7,14)) x = x.pow(solarUpgEffect(7,14))

        return x
    },

    enemy: {
        get max_health() {
            let x = Decimal.pow(10,player.sol.stage.scale(3.5e5,3,3).scale(this.stage_scale,3,0).scale(14,hasSolarUpgrade(7,5)?1.75:2,0)).mul(1e3).root(getFormingBonus('adv',3))

            return x
        },
        get bulk_stage() {
            let x = tmp.sol.offense.pow(getFormingBonus('adv',3)).div(1e3).log10().scale(14,hasSolarUpgrade(7,5)?1.75:2,0,true).scale(this.stage_scale,3,0,true).scale(3.5e5,3,3,true)
            x = x.add(1).floor().sub(player.sol.stage).max(1).min(this.stage_skip)
            if (isNaN(x.mag)) return E(0)
            return x
        },
        get stage_scale() { return 99 + solarUpgEffect(11,2,0) },
        get stage_skip() { return player.sn.tier.gte(15) ? EINF : player.sn.tier.gte(7) ? 10 : 1 },
        calc_soul_gain(s) {
            let x = Decimal.pow(1.1,s).mul(s.add(1))

            .mul(getSolCompressionEffect(1)).mul(solarUpgEffect(9,0)).mul(solarUpgEffect(10,0)).mul(tmp.twilightBonus[1]??1)

            x = x.pow(upgEffect('cs',5)).pow(tmp.twilightBonus[4]??1)

            if (hasSolarUpgrade(7,2)) x = x.mul(2)

            if (hasSolarUpgrade(7,15)) x = x.pow(2)

            return x.floor()
        },
        get soul_gain() { return this.calc_soul_gain(player.sol.stage) },
    },

    get stageBonus() {
        let e = {}, s = player.sol.stage

        e.fm = Decimal.pow(3,s.min(100))
        e.sr = Decimal.pow(5,s)
        e.sunstone = Decimal.pow(3,s)

        if (s.gte(10)) e.ss = Decimal.pow(3,s.sub(9))
        if (s.gte(75)) e.sf = Decimal.pow(2,s.sub(74))
        if (s.gte(400)) e.lp = Decimal.pow(1.1,s.sub(399).overflow(100,0.5))
        if (s.gte(1900)) e.dl = Decimal.pow(1.1,s.sub(1899).overflow(100,0.5))
        if (s.gte(1e6)) e.de = Decimal.pow(1.1,s.sub(1e6-1).div(1e4).overflow(100,0.5))

        return e
    },

    get sunriseFM() {
        let x = Decimal.mul(getStageBonus('fm'),getFormingBonus('stats',1))

        return x
    },

    get collectingMult() {
        let x = E(1)

        x = x.mul(solarUpgEffect(8,0)).mul(solarUpgEffect(5,4)).mul(solarUpgEffect(8,7))

        .mul(getSolCompressionEffect(1)).mul(getFormingBonus('restore',1)).mul(getFormingBonus('fund',2))

        .mul(getStarBonus(8)).mul(solarUpgEffect(10,3)).mul(tmp.twilightBonus[1]??1)

        x = x.pow(solarUpgEffect(8,9)).pow(upgEffect('cs',4)).pow(tmp.twilightBonus[4]??1)

        if (hasSolarUpgrade(7,25)) x = x.pow(2)

        return x
    },
    get formingMult() {
        let x = E(1)

        x = x.mul(solarUpgEffect(8,1)).mul(solarUpgEffect(8,5)).mul(solarUpgEffect(5,5)).mul(solarUpgEffect(8,8))

        .mul(getSolCompressionEffect(1)).mul(getFormingBonus('restore',2)).mul(getFormingBonus('fund',3))

        if (hasSolarUpgrade(7,4)) x = x.mul(solarUpgEffect(7,4))

        x = x.mul(getStarBonus(8)).mul(solarUpgEffect(10,4)).mul(tmp.twilightBonus[1]??1)

        x = x.pow(solarUpgEffect(8,10)).pow(upgEffect('cs',4)).pow(tmp.twilightBonus[4]??1)

        if (hasSolarUpgrade(7,25)) x = x.pow(2)

        return x
    },
    get restoreMult() {
        let x = E(1)

        x = x.mul(solarUpgEffect(9,4)).mul(solarUpgEffect(5,7)).mul(solarUpgEffect(10,5)).mul(tmp.twilightBonus[1]??1).mul(solarUpgEffect(9,10))

        if (hasSolarUpgrade(7,7)) x = x.mul(solarUpgEffect(7,7))

        x = x.pow(upgEffect('cs',4)).pow(tmp.twilightBonus[4]??1)

        return x
    },
    get fundMult() {
        let x = E(1)
        
        x = x.mul(solarUpgEffect(10,7)).mul(tmp.twilightBonus[2]??1).mul(solarUpgEffect(12,2)).mul(solarUpgEffect(12,4))

        return x
    },

    get manaGain() {
        let c = tmp.sol.collectingMult.div(1e9)

        if (player.sol.bestStage.lt(20) && c.lt(1)) return E(0)

        let x = c.root(3)

        .mul(getSolCompressionEffect(2)).mul(getFormingBonus('restore',0))

        .mul(solarUpgEffect(9,3)).mul(solarUpgEffect(10,2))
        
        return x
    },
}

const SOL_MATERIALS = {
    sol: {
        name: "Sol",
        collected: true,
        base: "SolarBase",
        icon: "Curr/SolCurrency1",
        req: E(10),

        get mult() {
            let x = E(1)

            x = x.mul(solarUpgEffect(8,2))

            .mul(getFormingBonus('collect',0)).mul(getFormingBonus('collect',5))

            if (hasSolarUpgrade(7,29)) x = x.mul(player.sol.materials.log[0])

            return x
        },
    },
    log: {
        unl: ()=>player.sol.bestStage.gte(3),

        name: "Light Logs",
        collected: true,
        base: "SolarBase",
        icon: "Curr/SolCurrency2",
        req: E(100),

        get mult() {
            let x = E(1)

            x = x.mul(solarUpgEffect(8,3))

            .mul(getFormingBonus('collect',1))

            if (hasSolarUpgrade(7,29)) x = x.mul(player.sol.materials.stone[0])

            return x
        },
    },
    stone: {
        unl: ()=>player.sol.bestStage.gte(10),

        name: "Portal Stones",
        collected: true,
        base: "SolarBase",
        icon: "Curr/SolCurrency3",
        req: E(1e4),

        get mult() {
            let x = E(1)

            x = x.mul(solarUpgEffect(8,4))

            .mul(getFormingBonus('collect',2))

            if (hasSolarUpgrade(7,29)) x = x.mul(player.sol.materials.fragment[0])

            return x
        },
    },
    fragment: {
        unl: ()=>player.sol.bestStage.gte(20),

        name: "Fragments",
        collected: true,
        base: "SolarBase",
        icon: "Curr/SolCurrency4",
        req: E(1e10),

        get mult() {
            let x = E(1)

            x = x.mul(solarUpgEffect(8,6))

            .mul(getFormingBonus('collect',3))

            if (hasSolarUpgrade(7,29)) x = x.mul(player.sol.materials.essence[0])

            return x
        },
    },
    essence: {
        unl: ()=>player.sol.bestStage.gte(50),

        name: "Grass Essence",
        collected: true,
        base: "SolarBase",
        icon: "Curr/GrassEssence",
        req: E(1e35),

        get mult() {
            let x = E(1)

            x = x.mul(solarUpgEffect(9,5)).mul(getFormingBonus('collect',4))

            if (hasSolarUpgrade(7,29)) x = x.mul(player.sol.materials.infinity[0])

            return x
        },
    },
    infinity: {
        unl: ()=>player.sn.tier.gte(11),

        name: "Infinity Loop",
        collected: true,
        base: "SolarBase",
        icon: "Curr/InfinityLoop",
        req: E('1e700'),

        get mult() {
            let x = E(1)

            return x
        },
    },

    soul: {
        name: "Souls",
        display: true,
        base: "CentralizeBase",
        icon: "Curr/Soul",

        get amount() { return player.sol.soul },
        set amount(v) { return player.sol.soul = v },

        get gain() { return tmp.sol.soul_rate > 0 ? tmp.sol.soul_gain.mul(tmp.sol.soul_rate) : undefined },
    },
    divine: {
        unl: ()=>player.sn.sunsetTimes>0,
        
        name: "Divine Souls",
        display: true,
        base: "CentralizeBase",
        icon: "Curr/DivineSoul",

        get amount() { return player.sol.divineSoul },
        set amount(v) { return player.sol.divineSoul = v },

        get gain() { return player.sn.tier.gte(13) ? tmp.divineSoulGain.mul(0.01) : undefined },
    },
    mana: {
        unl: ()=>player.sol.bestStage.gte(20),

        name: "Mana<br><span style='font-size: 12px'>(based on collecting speed)</span>",
        display: true,
        base: "CentralizeBase",
        icon: "Curr/Mana",

        get amount() { return player.sol.mana },
        set amount(v) { return player.sol.mana = v },

        get gain() { return tmp.sol.manaGain },
    },
    dark: {
        unl: ()=>player.sn.sunsetTimes>0,

        name: "Darkness<br><span style='font-size: 12px'>(convert mana into darkness on sunset)</span>",
        display: true,
        base: "CentralizeBase",
        icon: "Curr/Darkness",

        get amount() { return player.sol.darkness },
        set amount(v) { return player.sol.darkness = v },

        get gain() { return hasSolarUpgrade(7,16) ? player.sol.mana : undefined },
    },

    sun: {
        icon: "Curr/Sunstone",
        get amount() { return player.sn.sunstone },
        set amount(v) { return player.sn.sunstone = v },
    },
    sf: {
        icon: "Curr/SolarFlare",
        get amount() { return player.sn.solarFlare },
        set amount(v) { return player.sn.solarFlare = v },
    },

    cs: {
        icon: "Curr/CorruptionShard",
        get amount() { return player.synthesis.cs },
        set amount(v) { return player.synthesis.cs = v },
    },
    fs: {
        icon: "Curr/FlareShard",
        get amount() { return player.synthesis.fs },
        set amount(v) { return player.synthesis.fs = v },
    },
    eg: {
        icon: "Curr/EmptyGem",
        get amount() { return player.synthesis.eg },
        set amount(v) { return player.synthesis.eg = v },
    },

    perk: {
        icon: "Curr/Perks",
        get amount() { return tmp.perkUnspent },
    },
}

const FORMING = {
    stats: {
        name: "Stats",
        ctn: [
            {
                title: "Offense",
                icon: "Icons/Sword",

                req: [1,10],
                rankReq: [100,10],
                materials: [
                    ['sol',1,4],
                ],
                rankMult: 5,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sol.bestStage.gte(3),

                title: "Sunrise FM",
                icon: "Icons/Fight",

                req: [10,100],
                rankReq: [100],
                materials: [
                    ['log',10,10],
                ],
                rankMult: 5,
                bonus: b => b.add(1),
            },{
                unl: ()=>player.sol.bestStage.gte(20),

                title: "Soul'ed Offense",
                icon: "Icons/Sword",

                req: [1e9,10],
                rankReq: [100,10],
                materials: [
                    ['soul',1e6,10],
                ],
                rankMult: 5,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },
        ],
    },
    basic: {
        unl: ()=>player.sol.bestStage.gte(3),
        name: "Basic",
        ctn: [
            {
                title: "Solar Shards",
                icon: "Curr/SolarShard",

                req: [10,50,1.05],
                rankReq: [100,10],
                materials: [
                    ['sol',10,3],
                    ['log',1,3],
                ],
                rankMult: 5,
                bonus: b => b.pow(2).div(10).add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sol.bestStage.gte(10),

                title: "Grass Exponent",
                icon: "Curr/Grass",

                max: 50,
                req: [1e5,100,1.25],
                rankReq: [100],
                materials: [
                    ['sol',1e3,3,1.1],
                    ['stone',1,3,1.1],
                ],
                rankMult: 2,
                bonus: b => b.div(100).add(1).overflow(5e4,hasSolarUpgrade(7,13)?0.5:0.25),
                bonusDesc: x => formatPow(x)+x.softcapHTML(5e4),
            },{
                unl: ()=>hasSolarUpgrade(7,3),

                title: "Compression",
                icon: "Curr/SolCurrency1a",

                req: [1e6,5,1.1],
                rankReq: [25],
                materials: [
                    ['sol',1e6,5,1.1],
                ],
                rankMult: 2,
                bonus: (b,l,r) => Decimal.pow(1.03,l).mul(Decimal.pow(5,r)),
            },
        ],
    },
    collect: {
        unl: ()=>player.sol.bestStage.gte(10),
        name: "Collection",
        ctn: [
            {
                title: "Sol Collection",
                icon: "Curr/SolCurrency1",

                req: [1e6,4,1.25],
                rankReq: [10],
                materials: [
                    ['stone',100,3,1.2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sol.bestStage.gte(15),

                title: "Light Logs Collection",
                icon: "Curr/SolCurrency2",

                req: [1e7,4,1.25],
                rankReq: [10],
                materials: [
                    ['stone',1000,3,1.2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sol.bestStage.gte(15),

                title: "Portal Stones Collection",
                icon: "Curr/SolCurrency3",

                req: [1e12,4,1.25],
                rankReq: [10],
                materials: [
                    ['sol',1e12,3,1.2],
                    ['fragment',1,3,1.2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sol.bestStage.gte(50),

                title: "Fragments Collection",
                icon: "Curr/SolCurrency4",

                req: [1e45,4,1.25],
                rankReq: [10],
                materials: [
                    ['mana',1e21,3,1.2],
                    ['essence',100,3,1.2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sn.tier.gte(11),

                title: "Grass Essence Collection",
                icon: "Curr/GrassEssence",

                req: ['1e900',4,1.5],
                rankReq: [10],
                materials: [
                    ['infinity',1,10,1.2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sn.tier.gte(11),

                title: "Sol Collection II",
                icon: "Curr/SolCurrency1",

                req: ['1e900',4,1.5],
                rankReq: [10],
                materials: [
                    ['infinity',100,100,1.2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                // bonusDesc: x => formatMult(x),
            },
        ],
    },
    restore: {
        unl: ()=>player.sn.tier.gte(6),
        name: "Restoration",
        get mult() { return tmp.sol.restoreMult },
        ctn: [
            {
                title: "Road to Success (Mana)",
                icon: "Curr/Mana",

                req: [1,10],
                rankReq: [100],
                materials: [
                    ['fragment',1e9,4,1.05],
                    ['mana',1e6,4,1.05],
                ],
                rankMult: 5,
                bonus: b => b.div(10).add(1),
            },{
                title: "Trees of Recollection (Collecting)",
                icon: "Icons/Collect",

                req: [10,10],
                rankReq: [100],
                materials: [
                    ['sol',1e30,5,1.05],
                    ['log',1e30,5,1.05],
                    ['sf',1e30,5,1.05],
                    ['mana',1e9,5,1.05],
                ],
                rankMult: 10,
                bonus: b => b.add(1),
            },{
                title: "Blocks of Creation (Forming)",
                icon: "Icons/Form",

                req: [10,10],
                rankReq: [100],
                materials: [
                    ['sun',1e15,5,1.05],
                    ['sf',1e30,5,1.05],
                    ['mana',1e9,5,1.05],
                ],
                rankMult: 10,
                bonus: b => b.add(1),
            },{
                title: "The Best Defense (Offense)",
                icon: "Icons/Sword",

                req: [100,10],
                rankReq: [100],
                materials: [
                    ['soul',1e15,5,1.05],
                    ['mana',1e12,5,1.05],
                ],
                rankMult: 10,
                bonus: b => b.add(1),
            },
        ],
    },
    dark: {
        unl: ()=>player.sn.sunsetTimes>0,
        name: "Darkness",
        get mult() { return tmp.sol.restoreMult },
        ctn: [
            {
                title: "Glimmer of Hope* (Divine Souls)",
                icon: "Curr/DivineSoul",

                req: [10,10],
                rankReq: [100],
                materials: [
                    ['dark',1e6,10,1.1],
                    ['mana',1e9,10,1.1],
                    ['sf',1e27,10,1.1],
                ],
                rankMult: 5,
                bonus: b => b.div(10).add(1),
            },{
                unl: ()=>player.sol.bestStage.gte(50) && !hasCentralized(29),

                title: "A Bright Star** (Star Growth)",
                icon: "Curr/StarGrow",

                req: [100,5],
                rankReq: [10],
                materials: [
                    ['dark',1e12,5,1.1],
                    ['essence',100,5,1.1],
                    ['sf',1e30,5,1.1],
                ],
                rankMult: 10,
                bonus: b => b.add(1),
            },{
                title: "Omega Star (Scaled Eclipse)",
                icon: "Icons/SR",

                req: [1000,10],
                rankReq: [100],
                materials: [
                    ['dark',1e18,100,1.2],
                    ['mana',1e21,100,1.2],
                ],
                rankMult: 2,
                bonus: b => b.softcap(5e4,10,3),
                bonusDesc: x => "+"+format(x,0)+" later"+x.softcapHTML(5e4),
            },{
                unl: ()=>hasSolarUpgrade(7,16),

                max: 25,

                title: "Lunar Eclipse (Lunar Power)",
                icon: "Curr/Lunar",

                req: [1e60,1e3],
                rankReq: [100,10],
                materials: [
                    ['dark','e360',100,1.2],
                    ['sun',1e100,100,1.1],
                ],
                rankMult: 3,
                bonus: (b,l,r) => Decimal.pow(1e100,b.pow(2+r/10).overflow(1e9,0.25)),
            },
        ],
    },
    fund: {
        unl: ()=>tmp.lunarianUnl,
        name: "Funding",
        get mult() { return tmp.sol.fundMult },
        ctn: [
            {
                max: 30,

                title: "Lunarian Offense",
                icon: "Icons/LunarSword",

                req: [1,10],
                rankReq: [100,10],
                materials: [
                    ['l_curr1',1,2],
                ],
                rankMult: 3,
                bonus: b => b.div(100).add(1),
                bonusDesc: x => "+"+formatPercent(x.sub(1),0),
            },{
                max: 30,
                
                title: "Lunarians",
                icon: "Curr/Lunarian",

                req: [1,10],
                rankReq: [100,10],
                materials: [
                    ['l_curr1',1,2],
                ],
                rankMult: 3,
                bonus: b => b,
                bonusDesc: x => "+"+format(x,0),
            },{
                unl: ()=>player.lun.res.l_curr2,

                title: "Lunarian Collector",
                icon: "Icons/Collect",

                req: [1e5,10],
                rankReq: [10],
                materials: [
                    ['l_curr2',1,2],
                ],
                max: 25,
                rankMult: 1.5,
                bonus: b => Decimal.pow(1e5,b.overflow(25,0.5)),
                bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.lun.res.l_curr2,

                title: "Lunarian Form",
                icon: "Icons/Form",

                req: [1e5,10],
                rankReq: [10],
                materials: [
                    ['l_curr2',1,2],
                ],
                max: 25,
                rankMult: 1.5,
                bonus: b => Decimal.pow(1e5,b.overflow(25,0.5)),
                bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.lun.res.l_curr3,

                title: "Lunarian Distant Level",
                icon: "Icons/XP",

                req: [1e17,10],
                rankReq: [100],
                materials: [
                    ['l_curr3',1,2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.lun.res.l_curr4,

                title: "Lunarian Generation A1-3",
                icon: "Icons/Placeholder",

                req: [1e75,10],
                rankReq: [10],
                materials: [
                    ['l_curr4',1,2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.lun.res.l_curr4,

                title: "Lunarian Soul Collector",
                icon: "Curr/LunarianSoul",

                req: [1e75,10],
                rankReq: [10],
                materials: [
                    ['l_curr4',1,2],
                ],
                rankMult: 2,
                bonus: b => b.add(1),
                bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.lun.res.l_curr5,

                title: "Lunarian Synthesis Speed",
                icon: "Icons/SynthesisSpeed",

                req: ['1e615',10],
                rankReq: [10],
                materials: [
                    ['l_curr5',1,2],
                ],
                rankMult: 5,
                bonus: (b,l,r) => Decimal.pow(1.2,l).mul(Decimal.pow(10,r)),
                bonusDesc: x => formatMult(x),
            },
        ],
    },
    adv: {
        unl: ()=>player.sn.tier.gte(12),
        name: "Advanced",
        get mult() { return tmp.sol.fundMult },
        ctn: [
            {
                title: "Advanced Lunarian Offense",
                icon: "Icons/LunarSword",

                req: [1e8,10,1.05],
                rankReq: [100],
                materials: [
                    ['cs',1e24,6,1.1],
                    ['fs',1,6,1.05],
                ],
                rankMult: 2,
                bonus: b => b.div(100).add(1),
                bonusDesc: x => "+"+formatPercent(x.sub(1),0),
            },{
                title: "Advanced Lunarians",
                icon: "Curr/Lunarian",

                req: [1e8,10,1.05],
                rankReq: [100],
                materials: [
                    ['cs',1e24,6,1.1],
                    ['fs',1,6,1.05],
                ],
                rankMult: 2,
                bonus: b => b.div(100).add(1),
                bonusDesc: x => "+"+formatPercent(x.sub(1),0),
            },{
                unl: ()=>player.lun.res.l_curr3,

                title: "Advanced Corruption Shards",
                icon: "Curr/CorruptionShard",

                req: [1e17,10],
                rankReq: [100],
                materials: [
                    ['perk',1e15,6,1.05],
                    ['fs',1e9,6,1.05],
                ],
                rankMult: 2,
                bonus: b => b.add(1).pow(2),
                bonusDesc: x => formatMult(x),
            },{
                unl: ()=>player.sn.tier.gte(14),

                title: "Advanced Anti-Solarian Health Reduction",
                icon: "Curr/EvilSolarian",

                req: [1e24,10],
                rankReq: [100],
                materials: [
                    ['fs',1e18,6,1.05],
                    ['eg',1,6,1.05],
                ],
                rankMult: 2,
                bonus: b => b.add(1).log10().add(1),
                bonusDesc: x => formatPow(x,4),
            },
        ],
    }
}

const COLLECTED_MATERIALS = Object.entries(SOL_MATERIALS).filter(x => x[1].collected).map(x => x[0])

COLLECTED_MATERIALS.forEach(x=>Object.defineProperty(SOL_MATERIALS[x],'amount',{
    get() { return player.sol.materials[x][0] },
    set(v) { return player.sol.materials[x][0] = v },
}))

var enemy_health = EINF
var attack_time = E(0)
var form_tab = 'stats'
var collect_tab = 0

function calcSolarians(dt) {
    if (!hasSolarUpgrade(7,0)) return;

    const ts = tmp.sol

    enemy_health = enemy_health.min(ts.enemy_max_health)
    
    let at = attack_time.add(ts.attack_speed*dt)
    if (isNaN(at.mag)) at = E(0)
    attack_time = at
    if (at.gte(1)) {
        let w = at.floor()
        enemy_health = enemy_health.sub(ts.offense.mul(w)).max(0)
        if (enemy_health.lte(0)) {
            let s = player.sol.stage.add(SOLARIANS.enemy.stage_skip > 1 ? SOLARIANS.enemy.bulk_stage : 1)
            player.sol.stage = s
            player.sol.soul = player.sol.soul.add(SOLARIANS.enemy.calc_soul_gain(s.sub(1))).round()
            setupSolarianStage()
        }
        attack_time = at.sub(w)
    }

    player.sol.bestStage = player.sol.bestStage.max(player.sol.stage)

    player.sol.mana = player.sol.mana.add(tmp.sol.manaGain.mul(dt))
    if (hasSolarUpgrade(7,16)) player.sol.darkness = player.sol.darkness.add(player.sol.mana.mul(dt))

    player.sol.soul = player.sol.soul.add(ts.soul_gain.mul(tmp.sol.soul_rate*dt))
    if (player.sn.tier.gte(13)) player.sol.divineSoul = player.sol.divineSoul.add(tmp.divineSoulGain.mul(dt/100))

    for (let id of COLLECTED_MATERIALS) {
        const s = SOL_MATERIALS[id]
        let unl = !s.unl || s.unl()
        if (!unl) continue;
        let m = player.sol.materials[id]
        let dm = m[1].add(ts.collectingMult.mul(dt))
        if (dm.gte(s.req)) {
            let w = dm.div(s.req).floor()
            dm = dm.sub(s.req.mul(w))
            m[0] = m[0].add(w.mul(ts.cm[id]))
        }
        m[1] = dm
    }

    var snt9 = player.sn.tier.gte(9)
    var snt15 = player.sn.tier.gte(15)
    var continuum = hasSolarUpgrade(7,28)

    for (let [fi,f] of Object.entries(FORMING)) {
        const ft = ts.form[fi]
        if (ft.unl) {
            const pf = player.sol.form[fi]
            const mult = f.mult ?? ts.formingMult

            const f_continuum = continuum && ['stats','basic','collect','restore','dark'].includes(fi)

            const noLA = !f_continuum && snt15 && fi != "fund"
            for (let [i,fc] of Object.entries(f.ctn)) if (ft.unls[i]) {
                const p = pf[i]
                const [value,l,r,active] = p
                if (fc.max && r.gte(fc.max)) continue
                if (!active) continue
                p[0] = p[0].add(mult.mul(dt))
                
                var [l0,la] = [fc.rankReq[0],fc.rankReq[1]??0]

                if (l.gte(1e9) && f_continuum) {
                    let rank = SOL_FORMULAS.decimalMIN(
                        ...fc.materials.map(x=>SOL_FORMULAS.getContinuumRank(l0,getSMaterial(x[0]).amount,x[1],x[2],x[3])),
                        SOL_FORMULAS.getContinuumRank(l0,value,fc.req[0],fc.req[1],fc.req[2])
                    ).max(r)

                    p[1] = SOL_FORMULAS.getSumLevelFromRank(rank,l0,la)
                    p[2] = rank
                } else if (ft.afford[i]) {
                    let got = false, sub = [E(0),[]]
                    if (la > 0 && noLA) la = 0

                    let bulk = SOL_FORMULAS.decimalMIN(
                        ...fc.materials.map(x=>SOL_FORMULAS.getLevelBulk(l,r,l0,getSMaterial(x[0]).amount,x[1],x[2],x[3],la)),
                        SOL_FORMULAS.getLevelBulk(l,r,l0,value,fc.req[0],fc.req[1],fc.req[2],la)
                    ).max(0)

                    if (bulk>0) {
                        got = true
                        ft.afford[i]=false
                        sub[0] = SOL_FORMULAS.getBulkedCost(bulk,l,r,l0,fc.req[0],fc.req[1],fc.req[2],la)
                        fc.materials.forEach(x=>{
                            sub[1].push(SOL_FORMULAS.getBulkedCost(bulk,l,r,l0,x[1],x[2],x[3],la))
                        })
                        p[1] = p[1].add(bulk).round()
                    }

                    if (p[1].gte(SOL_FORMULAS.getSumLevelFromRank(r.add(1),l0,la))) if (snt9) {
                        let bulk = SOL_FORMULAS.decimalMIN(
                            ...fc.materials.map(x=>SOL_FORMULAS.getRankBulk(l0,getSMaterial(x[0]).amount,x[1],x[2],x[3],la)),
                            SOL_FORMULAS.getRankBulk(l0,value,fc.req[0],fc.req[1],fc.req[2],la)
                        ).max(0)
                        if (bulk.gt(r)) {
                            p[2] = bulk.min(fc.max??EINF)
                            if (f_continuum) p[2] = p[2].min(1e9)
                            p[1] = SOL_FORMULAS.getSumLevelFromRank(bulk,l0,la)
                        } else p[2] = p[2].add(1).round()
                    }
                    else p[2] = p[2].add(1).round()

                    if (got) {
                        if (p[0].lt('ee9')) p[0] = p[0].sub(sub[0]).max(0)
                        fc.materials.forEach((x,i)=>{
                            if (x[0] == "perk") {
                                player.spentPerkSolar = player.spentPerkSolar.add(sub[1][i])
                                updateUnspentPerk()
                            } else {
                                let m = getSMaterial(x[0])
                                if (m.amount.lt('ee9')) m.amount = m.amount.sub(sub[1][i]).max(0)
                            }
                        })
                    }
                }
            }
        }
    }

    if (hasSolarUpgrade(7,3)) {
        let u = player.sol.compression_unl, s10 = hasSolarUpgrade(7,10)

        for (let i in SOL_COMPRESSION.ctn) {
            player.sol.compression[i] = player.sol.compression[i].add(SOL_COMPRESSION.gain(parseInt(i)).mul(dt))
            if (s10) player.sol.active_compression[i] = player.sol.active_compression[i].add(player.sol.compression[i].mul(dt/100))
        }

        if (u<SOL_COMPRESSION.ctn.length && player.sol.compression[u-1].gte(SOL_COMPRESSION.ctn[u].req)) player.sol.compression_unl++
    }

    if (player.sn.tier.gte(12)) player.sol.fight_mult = player.sol.fight_mult.max(tmp.sol.sunriseFM)
    // if (player.sn.tier.gte(14) && tmp.twilightBonusIncrease.gt(0)) player.sol.twilightBonus = player.sol.twilightBonus.add(tmp.twilightBonusIncrease)
}

function getSMaterial(id) { return SOL_MATERIALS[id] || LUNAR_MATERIALS[id] }

function setupSolarianStage() {
    updateSolarianTemp()
    enemy_health = tmp.sol.enemy_max_health
}

function getSolarianSave() {
    let s = {
        stage: E(0),
        bestStage: E(0),
        soul: E(0),
        materials: {},
        form: {},
        fight_mult: E(1),
        compression: [],
        active_compression: [],
        compression_unl: 1,

        mana: E(0),
        divineSoul: E(0),
        darkness: E(0),

        unstableSoul: E(0),
        twilightBonus: E(0),
    }
    for (let id of COLLECTED_MATERIALS) s.materials[id] = [E(0), E(0)]
    for (let [fi,f] of Object.entries(FORMING)) {
        s.form[fi] = []
        for (let i in f.ctn) s.form[fi][i] = [E(0),E(0),E(0)]
    }
    for (let i in SOL_COMPRESSION.ctn) {
        s.compression[i] = E(0)
        s.active_compression[i] = E(0)
    }
    return s
}

function updateSolarianTemp() {
    const ts = tmp.sol

    ts.compression_mult = SOL_COMPRESSION.mult

    var su24 = hasSolarUpgrade(7,24)

    for (let i in SOL_COMPRESSION.ctn) {
        let e = SOL_COMPRESSION.ctn[i].eff(player.sol.active_compression[i])
        if (su24) e = e.pow(2)
        ts.comp_eff[i] = e
    }

    ts.enemy_max_health = SOLARIANS.enemy.max_health
    ts.soul_gain = SOLARIANS.enemy.soul_gain
    ts.offense = SOLARIANS.offense
    ts.collectingMult = SOLARIANS.collectingMult
    ts.formingMult = SOLARIANS.formingMult
    ts.restoreMult = SOLARIANS.restoreMult
    ts.fundMult = SOLARIANS.fundMult

    ts.soul_rate = hasSolarUpgrade(7,9) ? 0.01 : 0

    ts.manaGain = SOLARIANS.manaGain

    ts.attack_speed = ts.offense.gte(ts.enemy_max_health) ? ts.offense.div(ts.enemy_max_health).max(1).log10().add(1).mul(2).toNumber() : 1

    ts.stageBonus = SOLARIANS.stageBonus
    ts.sunriseFM = SOLARIANS.sunriseFM
}

function getStageBonus(id,def=1) { return tmp.sol.stageBonus?.[id]??def }

function updateCFTemp() {
    const ts = tmp.sol

    for (let id of COLLECTED_MATERIALS) {
        const s = SOL_MATERIALS[id]
        ts.cm[id] = s.mult
    }

    for (let [fi,f] of Object.entries(FORMING)) {
        let unl = !f.unl || f.unl()
        const ft = ts.form[fi]
        ft.unl=unl
        if (unl) {
            const pf = player.sol.form[fi]
            for (let [i,fc] of Object.entries(f.ctn)) {
                unl = !fc.unl || fc.unl
                ft.unls[i] = unl
                if (unl) {
                    const [value,l,r,active] = pf[i]
                    ft.bonus[i] = fc.bonus(SOL_FORMULAS.bonus(l,r,fc.rankMult,fc.rankReq[0],fc.rankReq[1]),l,r)
                    let req = ft.req[i] = SOL_FORMULAS.getCost(l,r,fc.req[0],fc.req[1],fc.req[2])
                    let afford = value.gte(req)
                    if (afford) for (let mi in fc.materials) {
                        const m = fc.materials[mi]
                        if (getSMaterial(m[0]).amount.lt(SOL_FORMULAS.getCost(l,r,m[1],m[2],m[3]))) {
                            afford = false
                            break
                        }
                    }
                    ft.afford[i] = afford
                } else {
                    ft.bonus[i] = E(1)
                    ft.afford[i] = false
                }
            }
        } else {
            ft.bonus = []
            ft.afford = []
        }
    }
}

tmp_update.push(()=>{
    updateSolarianTemp()
    updateCFTemp()
})

const SOL_FORMULAS = {
    solvePQE: (a,b,c) => {let d = Decimal.pow(b,2).sub(Decimal.add(a,c).mul(4)); return d.lt(0) ? E(0) : d.sqrt().sub(b).div(a).div(2)}, // ax^2+bx+c=0 D=b^2-4ac x1=(-b+sqrt(D))/2a x2=(-b-sqrt(D))/2a
    getSumLevelFromRank: (r,l0,la=0) => r.sub(1).mul(la/2).add(l0).mul(r), // r*(l0+la*(r-1)/2)
    getCurrentLevel(l,r,l0,la=0) { return l.sub(this.getSumLevelFromRank(r,l0,la)).max(0).min(r.mul(la).add(l0)) },
    bonus(l,r,b,l0,la=0) {
        let lc = this.getCurrentLevel(l,r,l0,la), br = Decimal.pow(b,r)
        let s = Decimal.mul(lc,br).add(Decimal.mul(l0,br.sub(1).div(b-1)))
        if (la>0) s = Decimal.mul(la,r.sub(1).mul(br).mul(b).sub(br.mul(r)).add(b).div((b-1)**2)).add(s)
        return s
    },
    getCost(l,r,ms,br,bl=1) {
        return Decimal.pow(bl,l).mul(Decimal.pow(br,r)).mul(ms)
    },
    getBulkedCost(lb,l,r,l0,ms,br,bl=1,la=0) {
        return this.getCost(this.getSumLevelFromRank(r,l0,la),r,ms,br,bl).mul(bl>1?Decimal.pow(bl,lb).sub(1).mul(Decimal.pow(bl,this.getCurrentLevel(l,r,l0,la))).div(bl-1):lb)
    },
    getLevelBulk(l,r,l0,f,ms,br,bl=1,la=0) {
        let lc = this.getCurrentLevel(l,r,l0,la), lb = 0, lr = r.mul(la).add(l0);
        let mf = this.getCost(this.getSumLevelFromRank(r,l0,la),r,ms,br,bl)
        if (bl<=1) {
            lb = f.div(mf).floor().max(0).min(lr.sub(lc))
            if (lb.lte(0)) return E(0);
        } else {
            lb = f.mul(bl-1).div(mf).add(Decimal.pow(bl,lc)).log(bl).floor().max(0).min(lr)
            if (lb.lte(lc)) return E(0);
            lb = lb.sub(lc)
        }
        return lb
    },

    getRankBulk(l0,f,ms,br,bl=1,la=0) {
        return la == 0 ?
        (bl == 1 ? f.div(Decimal.mul(ms,l0)).log(br) : f.div(ms).log(bl).add(1).div(Math.logBase(br,bl)+l0)).floor().add(1)
        : bl == 1 ? Decimal.pow(br,l0/la).mul(f).mul(Math.log(br)).div(ms).div(la).lambertw().div(Math.log(br)).sub(l0/la).floor().add(1)
        : this.solvePQE(la,-la+2*l0+2*Math.logBase(br,bl),f.div(ms).log(bl).mul(-2).sub(2)).floor()
    },

    decimalMIN(...a) {
        let d = a[0]
        for (let i = 1; i < a.length; i++) d = d.min(a[i])
        return d
    },

    // Continuum Formulas

    getContinuumRank(l0,f,ms,br,bl=1) {
        return f.gte(ms) ? (bl == 1 ? f.div(Decimal.mul(ms,l0)).log(br) : f.div(ms).log(bl).add(1).div(Math.logBase(br,bl)+l0)).scale(2e15,2,0,true).add(1) : E(0)
    },
    getContinuumCost(l0,r,ms,br,bl=1) {
        r = r.scale(2e15,2,0)
        return bl == 1 ? Decimal.pow(br,r).mul(Decimal.mul(ms,l0)) : Decimal.pow(bl,r.mul(Math.logBase(br,bl)+l0).sub(1)).mul(ms)
    },
    getContinuumBonus(r,b) {
        return Decimal.mul(l0,Decimal.pow(b,r).sub(1).div(b-1))
    },
}

function getFormingBonus(id,i,def=1) { return tmp.sol.form[id].bonus[i]??def }

el.update.solarians = () => {
    const ts = tmp.sol
    if (mapID3 == 'stage') {
        tmp.el.solarian_stage.setHTML(`
        <h2>Stage ${player.sol.stage.format(0)}</h2>
        `)

        const h = enemy_health, mh = ts.enemy_max_health
        tmp.el.enemy_bar.setProperty('--percent',h.div(mh).max(0).min(1).mul(100)+'%')
        tmp.el.enemy_bar.setHTML(`<div>${h.format(0)} / ${mh.format(0)}</div>`)

        tmp.el.attack_bar.setProperty('--percent',attack_time.max(0).min(1).mul(100)+'%')
        
        tmp.el.enemy_soul.setTxt(ts.soul_gain.format(0))
        tmp.el.sol_offense.setTxt(ts.offense.format(0))

        let bonus = ts.stageBonus

        let t = `
        Sunrise FM: <b class='green'>${formatMult(bonus.fm,0)}</b>
        <br>Solar Rays: <b class='green'>${formatMult(bonus.sr,0)}</b>
        <br>Sunstone: <b class='green'>${formatMult(bonus.sunstone,0)}</b>
        `

        if (bonus.ss) t += `<br>Solar Shards: <b class='green'>${formatMult(bonus.ss,0)}</b>`
        if (bonus.form) t += `<br>Forming Speed: <b class='green'>${formatMult(bonus.form,0)}</b>`
        if (bonus.sf) t += `<br>Solar Flares: <b class='green'>${formatMult(bonus.sf,0)}</b>`
        if (bonus.lp) t += `<br>Lunar Power: <b class='green'>${formatPow(bonus.lp)}</b>`
        if (bonus.dl) t += `<br>Distant Level: <b class='green'>${formatMult(bonus.dl)}</b>`
        if (bonus.de) t += `<br>Distant Eclipse: <b class='green'>${formatMult(bonus.de)}</b>`

        tmp.el.stage_bonus.setHTML(t)
    } else if (mapID3 == 'sol') {
        tmp.el.collect_tab_btn1.setDisplay(tmp.lunarianUnl)

        for (let t = 0; t < 2; t++) tmp.el['collecting_tab'+t].setDisplay(collect_tab === t)

        if (collect_tab === 0) for (let [id,s] of Object.entries(SOL_MATERIALS)) {
            let el_id = `material_${id}`

            if (s.collected) {
                let unl = !s.unl || s.unl()
                tmp.el[el_id+'_div'].setDisplay(unl)

                if (!unl) continue;

                let m = player.sol.materials[id];

                tmp.el[el_id+'_amt'].setHTML(`
                <b>${m[0].format(0)}</b><br>
                <span>${formatMult(ts.cm[id],0)}</span>
                `)
                let collect = tmp.el[el_id+'_collect']
                collect.setProperty('--percent',ts.collectingMult.gte(s.req)?"100%":m[1].div(s.req).max(0).min(1).mul(100)+'%')
                collect.setHTML(`<div>${ts.collectingMult.gte(s.req) ? "+"+ts.collectingMult.div(s.req).mul(ts.cm[id]).format()+"/s" : formatTime(s.req.sub(m[1]).div(ts.collectingMult).max(0))}</div>`)
            } else if (s.display) {
                let unl = !s.unl || s.unl()
                tmp.el[el_id+'_div'].setDisplay(unl)

                if (!unl) continue;

                let amt = s.amount, gain = s.gain

                tmp.el[el_id+'_amt'].setHTML(`<b>${amt.format(0)}</b>`+(gain?`<br><span>${formatGain(amt,gain)}</span>`:""))
            }
        }
        else if (collect_tab === 1) for (let [id,s] of Object.entries(LUNAR_MATERIALS)) {
            let el_id = `lunar_material_${id}`

            let unl = !s.unl || s.unl()
            tmp.el[el_id+'_div'].setDisplay(unl)

            if (!unl) continue;

            let amt = s.amount, gain = s.gain

            tmp.el[el_id+'_amt'].setHTML(`<b>${amt.format(0)}</b>`+(gain?`<br><span>${formatGain(amt,gain)}</span>`:""))
        }

        let snt15 = player.sn.tier.gte(15)
        var continuum = hasSolarUpgrade(7,28)

        for (let [fi,f] of Object.entries(FORMING)) {
            let unl = !f.unl || f.unl()
            tmp.el[`fb_${fi}`].setDisplay(unl)
            unl &&= form_tab == fi
            tmp.el[`f_${fi}_div`].setDisplay(unl)

            const pf = player.sol.form[fi]
            const ft = ts.form[fi]
            const mult = f.mult ?? ts.formingMult
            const t_continuum = continuum && ['stats','basic','collect','restore','dark'].includes(fi)

            if (unl) for (let [i,fc] of Object.entries(f.ctn)) {
                let id = `f_${fi}_${i}`
                unl = !fc.unl || fc.unl()
                tmp.el[id+'_div'].setDisplay(unl)
                if (!unl) continue;

                const [value,l,r,active] = pf[i]
                const [l0,la] = [fc.rankReq[0],snt15?0:fc.rankReq[1]??0]

                tmp.el[id+'_bonus'].setHTML(`
                <div>Level <b class='level-color'>${format(l,0)}</b> : <b class='green'>${(fc.bonusDesc ?? formatMult)(ft.bonus[i])}</b><div>
                <div>Rank <b class='rank-color'>${format(r,0)}</b> : <b class='green'>${formatMult(Decimal.pow(fc.rankMult,r))}</b></div>
                `)

                for (let mi in fc.materials) {
                    const m = fc.materials[mi], cost = t_continuum ? SOL_FORMULAS.getContinuumCost(l0,r,m[1],m[2],m[3]) : SOL_FORMULAS.getCost(l,r,m[1],m[2],m[3])
                    tmp.el[id+'_m_'+mi].setHTML(`<b class="${getSMaterial(m[0]).amount.gte(cost) ? "green" : "red"}">${format(cost,0)}</b>`)
                }

                const [l_el, r_el] = [tmp.el[id+'_level'],tmp.el[id+'_rank']], visible = l.lt(1e9)

                l_el.setDisplay(visible)
                r_el.setDisplay(visible)

                if (visible) {
                    const bl = fc.req[2]??1
                    const req = ft.req[i], maxed = fc.max && r.gte(fc.max)

                    l_el.setProperty('--percent',maxed ? '100%' : value.div(req).max(0).min(1).mul(100)+'%')
                    l_el.setHTML(maxed ? "<div>Maxed</div>" : active&&(value.lt(req)||ft.afford[i])?`<div>${mult.gte(req)&&bl==1?"+"+mult.div(req).format()+"/s":formatTime(req.sub(value).div(mult).max(0))}</div>`:`<div>${format(value,0)} / ${format(req,0)}</div>`)

                    const lc = SOL_FORMULAS.getCurrentLevel(l,r,l0,la)

                    r_el.setProperty('--percent',maxed ? '100%' : Math.max(0,Math.min(1,lc/(l0+r*la)))*100+'%')
                    r_el.setHTML(maxed ? "<div>Maxed</div>" : `<div>${format(lc,0)} / ${format(l0+r*la,0)}</div>`)
                }

                tmp.el[id+"_btn"].setTxt(active?"Stop":"Start")
            }
        }
    } else if (mapID3 == 'solc') {
        updateSolCompressionHTML()
    }
}

el.setup.solarians = () => {
    let h = "<div id='collecting_tab0'>"

    for (let [id,s] of Object.entries(SOL_MATERIALS)) {
        h += s.collected ? `
        <div class="material-div" id="material_${id}_div">
            <img src="images/${s.icon}.png">
            <div class="material-name">${s.name}</div>
            <div class="material-amount" id="material_${id}_amt"><b>0</b><br><span>x1</span></div>
            <div class="progress-bar" id="material_${id}_collect"><div>???</div></div>
        </div>
        ` : s.display ? `
        <div class="material-div display" id="material_${id}_div">
            <img src="images/${s.icon}.png">
            <div class="material-name">${s.name}</div>
            <div class="material-amount" id="material_${id}_amt"><b>0</b><br><span>(+1/s)</span></div>
        </div>
        ` : ""
    }

    h += "</div><div id='collecting_tab1'>"

    for (let [id,s] of Object.entries(LUNAR_MATERIALS)) {
        h += `
        <div class="material-div display" id="lunar_material_${id}_div">
            <img src="images/${s.icon}.png">
            <div class="material-name">${s.name}</div>
            <div class="material-amount" id="lunar_material_${id}_amt"><b>0</b><br><span>(+1/s)</span></div>
        </div>
        `
    }

    h += "</div>"

    new Element('materials_table').setHTML(h)

    h = ["",""]

    for (let [fi,f] of Object.entries(FORMING)) {
        h[1] += `<button id="fb_${fi}" onclick="form_tab = '${fi}'">${f.name}</button>`
        h[0] += `<div id="f_${fi}_div">`
        for (let [i,fc] of Object.entries(f.ctn)) {
            let id = `f_${fi}_${i}`
            let mh = ''
            for (let [mi,m] of Object.entries(fc.materials)) mh += `<div>
                <img src="images/${getSMaterial(m[0]).icon}.png">
                <div id="${id}_m_${mi}">???</div>
            </div>`
            h[0] += `
            <div class="forming-div" id="${id}_div">
                <div class="forming-title">${fc.title}</div>
                <img src="images/${fc.icon}.png">
                <div id="${id}_bonus" class="forming-boost">
                    <div>Level 0 : ???</div>
                    <div>Rank 0 : ???</div>
                </div>
                <button id="${id}_btn" onclick="player.sol.form.${fi}[${i}][3]=!player.sol.form.${fi}[${i}][3]">Start</button>
                <div class="progress-bar f-level" id="${id}_level"><div>???</div></div>
                <div class="progress-bar f-rank" id="${id}_rank"><div>???</div></div>
                <div class="forming-res">${mh}</div>
            </div>
            `
        }
        h[0] += `</div>`
    }

    new Element('forming_table').setHTML(h[0])
    new Element('forming_tab_table').setHTML(h[1])
}

function resetMaterials(keep=[]) {
    COLLECTED_MATERIALS.forEach(x=>{if (!keep.includes(x)) player.sol.materials[x] = [E(0),E(0)]})
}

function resetForming(id,list=[],reset=false,decrease) {
    let ff = player.sol.form[id]
    for (let x = 0; x < FORMING[id].ctn.length; x++) if ((reset ? list.includes(x) : !list.includes(x)) && (decrease === undefined || decrease > 0)) {
        if (decrease === undefined) ff[x] = [E(0),E(0),E(0),ff[x][3]]
        else {
            const r = ff[x][2].sub(decrease).max(0), s = FORMING[id].ctn[x].rankReq
            ff[x] = [E(0),SOL_FORMULAS.getSumLevelFromRank(r,...s),r,ff[x][3]]
        }
    }
}