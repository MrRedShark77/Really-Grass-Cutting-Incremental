const SOLAR_UPGS = [
    {
        title: "Automation Upgrades",
        tab: ['Icons/Assemblerv2'],
        res: "ss",

        require() { return player.sn.times >= 2 },
        req_txt: `SN 2`,

        ctn: [
            {
                max: 20,
                title: "Free GH",
                desc: `Raise free grasshops by <b class="green">4</b> per level.`,
                icon: ['Icons/Grasshop2'],     
                cost: i => Decimal.pow(1.2,i).mul(2),
                bulk: i => i.div(2).log(1.2).floor().toNumber()+1,
                effect(i) {
                    let x = i * 4
                        
                    return x
                },
                effDesc: x => +format(x,0),
            },{
                max: 20,
                title: "Free GS",
                desc: `Raise free grass-skips by <b class="green">4</b> per level. This upgrade affects AGH.`,
                icon: ['Icons/GrassSkip'],     
                cost: i => Decimal.pow(1.2,i).mul(2),
                bulk: i => i.div(2).log(1.2).floor().toNumber()+1,
                effect(i) {
                    let x = i * 4
                        
                    return x
                },
                effDesc: x => format(x,0),
            },{
                max: 25,
                title: "Starting AGH",
                desc: `Raise starting AGH milestone.`,
                icon: ['Icons/Grasshop3'],     
                cost: i => Decimal.pow(1.2,i).mul(2),
                bulk: i => i.div(2).log(1.2).floor().toNumber()+1,
                effect(i) {
                    let x = 40 - i * 4
                        
                    return x
                },
                effDesc: x => format(x,0),
                onBuy() { player.lowGH = Math.min(player.lowGH, solarUpgEffect(0,2,0)) },
            },{
                title: "Starting Momentum",
                desc: `Start with momentum upgrades with a base cost of <b class="green">1</b>.`,
                icon: ['Curr/Momentum'],
                cost: i => 1,
                onBuy: startMomentum,
            },{
                title: "Planetary Jump",
                desc: `Automatically update grass jump and planetary tier without reset.`,
                icon: ['Icons/PlanetJump'],
                cost: i => 10,
            },{
                max: 10,
                title: "Starting Astral Prestige",
                desc: `Raise starting astral prestige by <b class="green">1</b> per level.`,
                icon: ['Icons/AstralPrestige'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                cost: i => Decimal.pow(3,i**1.25).mul(30),
                bulk: i => i.div(30).log(3).root(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = i
                        
                    return x
                },
                effDesc: x => format(x,0),
                onBuy() {
                    let e = solarUpgEffect(0,5,0)
                    if (player.astralPrestige < e) {player.astralPrestige = E(e); player.sp = E(0); player.astral = E(0)}
                },
            },{
                max: 20,
                title: "Starting PT",
                desc: `Raise starting planetary tier.`,
                icon: ['Curr/Planet'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                cost: i => Decimal.pow(1.2,i).mul(20),
                bulk: i => i.div(20).log(1.2).floor().toNumber()+1,
                effect(i) {
                    let x = 2 * i
                        
                    return x
                },
                effDesc: x => format(x,0),
                onBuy() { player.planetoid.planetTier = Math.max(player.planetoid.planetTier, solarUpgEffect(0,6,0)) },
            },{
                max: 12,
                title: "Starting Star Chart",
                desc: `Start with star chart upgrades below base cost.`,
                icon: ['Curr/Star'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                cost: i => Decimal.pow(1.2,i).mul(20),
                bulk: i => i.div(20).log(1.2).floor().toNumber()+1,
                effect(i) {
                    if (i == 0) return E(0)

                    let x = Decimal.pow(1e3,i)
                        
                    return x
                },
                effDesc: x => format(x,0),
                onBuy: startStarChart,
            },{
                max: 10,
                title: "Starting Reservatory",
                desc: `Start with reservatory upgrades below base cost.`,
                icon: ['Curr/Res4'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                cost: i => Decimal.pow(1.2,i).mul(20),
                bulk: i => i.div(20).log(1.2).floor().toNumber()+1,
                effect(i) {
                    if (i == 0) return E(0)

                    let x = Decimal.pow(1e3,i)
                        
                    return x
                },
                effDesc: x => format(x,0),
                onBuy: startStarChart,
            },{
                max: 15,
                title: "Starting Reservatory",
                desc: `Start with ring upgrades below base cost.`,
                icon: ['Curr/Ring'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                cost: i => Decimal.pow(1.2,i).mul(20),
                bulk: i => i.div(20).log(1.2).floor().toNumber()+1,
                effect(i) {
                    if (i == 0) return E(0)
                    
                    let x = Decimal.pow(1e5,i)
                        
                    return x
                },
                effDesc: x => format(x,0),
                onBuy: startStarChart,
            },{
                max: 20,
                title: "Starting GJ",
                desc: `Raise starting grass jump.`,
                icon: ['Icons/GrassJump'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                cost: i => Decimal.pow(1.2,i).mul(50),
                bulk: i => i.div(50).log(1.2).floor().toNumber()+1,
                effect(i) {
                    let x = 2 * i
                        
                    return x
                },
                effDesc: x => format(x,0),
                onBuy() { player.grassjump = Math.max(player.grassjump, solarUpgEffect(0,10,0)) },
            },{
                title: "Observatory Automation",
                desc: `Automate the observatory upgrades.`,
                icon: ['Curr/Observatorium'],
                cost: i => 1e6,
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
            },{
                title: "Constellation Automation",
                desc: `Automate lines & arcs upgrades.`,
                icon: ['Curr/Lines'],
                cost: i => 1e6,
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
            },{
                title: "The Star Automation",
                desc: `Automate the star upgrades.`,
                icon: ['Curr/StarGrow'],
                cost: i => 1e9,
                require() { return player.sn.tier.gte(5) },
                req_txt: `T5`,
            },
        ],
    },{
        title: "Basic Upgrades",
        tab: ['Curr/Prestige','#159edd'],
        res: "ss",

        ctn: [
            {
                max: 1000,
                title: "Solar Powered Grass",
                get desc() {return `Increase grass value by <b class="green">${formatMult(1e100)}</b> per squared level.`},
                icon: ['Curr/Grass'],     
                cost: i => Decimal.pow(3,i),
                bulk: i => i.log(3).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e100,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(0),
                max: 100,
                title: "Solar Powered Prestige",
                get desc() {return `Increase prestige points gain by <b class="green">${formatMult(1e100)}</b> per squared level.`},
                icon: ['Curr/Prestige'],
                cost: i => Decimal.pow(3,i),
                bulk: i => i.log(3).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e100,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(1),
                max: 100,
                title: "Solar Powered Crystals",
                get desc() {return `Increase crystals gain by <b class="green">${formatMult(1e100)}</b> per squared level.`},
                icon: ['Curr/Crystal'],                 
                cost: i => Decimal.pow(3,i).mul(2),
                bulk: i => i.div(2).log(3).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e100,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(2),
                max: 100,
                title: "Solar Powered Steel",
                get desc() {return `Increase steel gain by <b class="green">${formatMult(1e10)}</b> per squared level.`},
                icon: ['Curr/Steel2'],                 
                cost: i => Decimal.pow(3,i).mul(3),
                bulk: i => i.div(3).log(3).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e10,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(23),
                max: 1000,
                title: "Solar Powered Lines",
                get desc() {return `Increase lines gain by <b class="green">${formatMult(1e3)}</b> per level.`},
                icon: ['Curr/Lines'],                 
                cost: i => Decimal.pow(3,i).mul(3),
                bulk: i => i.div(3).log(3).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e3,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(6),
                max: 100,
                title: "Solar Powered",
                get desc() {return `Increase charge rate by <b class="green">${formatMult(1e10)}</b> per squared level.`},
                icon: ['Curr/Charge'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                cost: i => Decimal.pow(3.5,i).mul(10),
                bulk: i => i.div(10).log(3.5).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e10,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(4),
                max: 100,
                title: "Solar Powered Anonymity",
                get desc() {return `Increase anonymity points gain by <b class="green">${formatMult(1e100)}</b> per squared level.`},
                icon: ['Curr/Anonymity'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                cost: i => Decimal.pow(3.5,i).mul(10),
                bulk: i => i.div(10).log(3.5).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e100,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(5),
                max: 100,
                title: "Solar Powered Oil",
                get desc() {return `Increase oil gain by <b class="green">${formatMult(1e100)}</b> per squared level.`},
                icon: ['Curr/Oil'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                cost: i => Decimal.pow(3.5,i).mul(10),
                bulk: i => i.div(10).log(3.5).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e100,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(10),
                max: 100,
                title: "Solar Powered Fun",
                get desc() {return `Increase fun gain by <b class="green">${formatMult(1e10)}</b> per squared level.`},
                icon: ['Curr/Fun'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                cost: i => Decimal.pow(3.5,i).mul(10),
                bulk: i => i.div(10).log(3.5).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e10,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(24),
                max: 1000,
                title: "Solar Powered Arcs",
                get desc() {return `Increase arcs gain by <b class="green">${formatMult(100)}</b> per level.`},
                icon: ['Curr/Arcs'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,    
                cost: i => Decimal.pow(3.5,i).mul(10),
                bulk: i => i.div(10).log(3.5).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(100,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(27),
                max: 100,
                title: "Solar Powered II",
                get desc() {return `Increase dark charge rate by <b class="green">${formatMult(1000)}</b> per level.`},
                icon: ['Curr/DarkCharge'],
                require() { return player.sn.tier.gte(3) },
                req_txt: `T3`,
                cost: i => Decimal.pow(4,i).mul(500),
                bulk: i => i.div(500).log(4).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e3,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(15),
                max: 100,
                title: "Solar Powered Normality",
                get desc() {return `Increase normality points gain by <b class="green">${formatMult(1e100)}</b> per squared level.`},
                icon: ['Curr/Normality'],
                require() { return player.sn.tier.gte(3) },
                req_txt: `T3`,
                cost: i => Decimal.pow(4,i).mul(500),
                bulk: i => i.div(500).log(4).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e100,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(16),
                max: 100,
                title: "Solar Powered Cloud",
                get desc() {return `Increase cloud generated by <b class="green">${formatMult(1e100)}</b> per squared level.`},
                icon: ['Curr/Cloud'],
                require() { return player.sn.tier.gte(3) },
                req_txt: `T3`,
                cost: i => Decimal.pow(4,i).mul(500),
                bulk: i => i.div(500).log(4).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e100,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(9),
                max: 100,
                title: "Solar Powered Stars",
                get desc() {return `Increase stars gain by <b class="green">${formatMult(1e100)}</b> per squared level.`},
                icon: ['Curr/Star'],
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                cost: i => Decimal.pow(5,i).mul(10000),
                bulk: i => i.div(10000).log(5).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e100,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(12),
                max: 100,
                title: "Solar Powered Dark Matter",
                get desc() {return `Increase dark matter gain by <b class="green">${formatMult(1e100)}</b> per squared level.`},
                icon: ['Curr/DarkMatter'],
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                cost: i => Decimal.pow(5,i).mul(10000),
                bulk: i => i.div(10000).log(5).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e100,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(19),
                max: 1000,
                title: "Solar Powered Planetarium",
                get desc() {return `Increase planetarium gain by <b class="green">${formatMult(1e10)}</b> per squared level.`},
                icon: ['Curr/Planetoid'],
                require() { return player.sn.tier.gte(5) },
                req_txt: `T5`,
                cost: i => Decimal.pow(6,i).mul(1e8),
                bulk: i => i.div(1e8).log(6).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e10,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(20),
                max: 1000,
                title: "Solar Powered Astro",
                get desc() {return `Increase astro gain by <b class="green">${formatMult(1e10)}</b> per squared level.`},
                icon: ['Curr/Astrolabe'],
                require() { return player.sn.tier.gte(5) },
                req_txt: `T5`,
                cost: i => Decimal.pow(6,i).mul(1e8),
                bulk: i => i.div(1e8).log(6).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e10,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(21),
                max: 1000,
                title: "Solar Powered Measure",
                get desc() {return `Increase measure gain by <b class="green">${formatMult(1e10)}</b> per squared level.`},
                icon: ['Curr/Measure'],
                require() { return player.sn.tier.gte(5) },
                req_txt: `T5`,
                cost: i => Decimal.pow(6,i).mul(1e8),
                bulk: i => i.div(1e8).log(6).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e10,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(22),
                max: 1000,
                title: "Solar Powered Planet",
                get desc() {return `Increase planets gain by <b class="green">${formatMult(1e10)}</b> per squared level.`},
                icon: ['Curr/Planet'],
                require() { return player.sn.tier.gte(5) },
                req_txt: `T5`,
                cost: i => Decimal.pow(6,i).mul(1e8),
                bulk: i => i.div(1e8).log(6).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e10,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar Powered Lunar Power",
                get desc() {return `Increase lunar power gain by <b class="green">${formatMult(1e100)}</b> per squared level.`},
                icon: ['Curr/Lunar'],
                require() { return player.sol.bestStage.gte(100) },
                req_txt: `Stage 100`,
                cost: i => Decimal.pow(10,i).mul(1e150),
                bulk: i => i.div(1e150).log(10).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e100,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(17),
                max: 6,
                title: "Solar Powered Moonstone",
                get desc() {return `Increase moonstone gain by <b class="green">${formatMult(1e10)}</b> per squared level.`},
                icon: ['Curr/Moonstone'],
                require() { return player.sn.tier.gte(11) },
                req_txt: `T11`,
                cost: i => Decimal.pow(10,i).mul('1e530'),
                bulk: i => i.div('1e530').log(10).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1e10,i**2)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>!hasCentralized(27),
                max: 10,
                title: "Solar Powered III",
                desc: `Increase dark charge rate by <b class="green">^2</b> per level.`,
                icon: ['Curr/DarkCharge'],
                require() { return player.hsj>=10 },
                req_txt: `HSJ10`,
                cost: i => Decimal.pow('e7e9',i).mul('e1e11'),
                bulk: i => i.div('e1e11').log('e7e9').floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(2,i)
                        
                    return x
                },
                effDesc: x => formatPow(x),
            },{
                unl: ()=>!hasCentralized(28),
                max: 10,
                title: "Solar Powered Stardust",
                desc: `Increase stardust gain by <b class="green">^2</b> per level.`,
                icon: ['Curr/Stardust'],
                require() { return player.hsj>=10 },
                req_txt: `HSJ10`,
                cost: i => Decimal.pow('e7e9',i).mul('e1e11'),
                bulk: i => i.div('e1e11').log('e7e9').floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(2,i)
                        
                    return x
                },
                effDesc: x => formatPow(x),
            },
        ],
    },{
        title: "Advanced Upgrades",
        tab: ['Curr/DarkMatter','#305'],
        res: "ss",

        ctn: [
            {
                max: 100,

                title: "Solar Flare Capacity",
                desc: `Double solar flare's capacity.`,
                icon: ['Curr/SolarFlare'],
                cost: i => Decimal.pow(3,i).mul(2),
                bulk: i => i.div(2).log(3).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                title: "Orbit",
                desc: `Planets boost planetarium.`,
                icon: ['Curr/Planet'],
                cost: i => 3,
                effect(i) {
                    let x = player.planetoid.planet.add(1).overflow(1e300,0.5)
                        
                    return x
                },
                effDesc: x => formatMult(x)+x.softcapHTML(1e300),
            },{
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                title: "Constant RF",
                desc: `Rocket fuel generation is permanently enabled and based on oil/charge generated per second, it requires oil drilling rig. The base of rocket fuel's requirement no longer increased by rocket parts, however, rocket part's requirement is changed.`,
                icon: ['Curr/RocketFuel'],
                cost: i => 3,
            },{
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`, 
                title: "Prism",
                desc: `Unlock the Prism constellation that acts like an all in one constellation for generation and boosts.`,
                icon: ['Icons/PrismIcon'],
                cost: i => 100,
            },{
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`, 
                title: "Lunar Powered",
                desc: `Lunar powers will level up without needing to be active.`,
                icon: ['Curr/Lunar'],
                cost: i => 100,
            },{
                require() { return player.sn.tier.gte(4) && hasSolarUpgrade(2,3) },
                req_txt: `T4 & Prism`,
                title: "Last Prism",
                desc: `Unlock final prism constellation, but remove all non-persistent constellations. Unlock a new constellation upgrade.`,
                icon: ['Icons/PrismUpgrade'],
                cost: i => 1e6,
                onBuy() {
                    cs_selected = ''
                    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
                        let g = player.constellation.grid[y][x], t = parseInt(g.split('t')[0])
                        if (g != '' && t <= 13) player.constellation.grid[y][x] = ''
                    }
                },
            },{
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                title: "Constellation Grid",
                desc: `Unlock Constellation Grid constellation. "A nice grid full of magnifiers and moons for you."`,
                icon: ['Icons/GridUpgrade'],
                cost: i => 1e6,
            },{
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                title: "Ray",
                desc: `Unlock Ray constellation. "Increases solar rays earned."`,
                icon: ['Icons/RayUpgrade'],
                cost: i => 1e6,
            },{
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                title: "Star",
                desc: `Unlock Star constellation. "Globally boosts persistent constellations a small amount."`,
                icon: ['Icons/StarUpgrade'],
                cost: i => 1e6,
            },{
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                title: "Improver",
                desc: `Unlock Improver constellation. "Slightly boosts adjacent persistent constellations."`,
                icon: ['Icons/UpgraderUpgrade'],
                cost: i => 1e6,
            },{
                require() { return player.sol.bestStage.gte(3) },
                req_txt: `Stage 3`,
                title: "Solar Ray Generation",
                desc: `Passively generate 1% of solar rays earned on supernova per second.`,
                icon: ['Icons/SR'],
                cost: i => 1e12,
            },{
                require() { return player.sol.bestStage.gte(5) },
                req_txt: `Stage 5`,
                title: "Solar Shards Updater",
                desc: `Automatically update best solar shards on supernova.`,
                icon: ['Curr/SolarShard'],
                cost: i => 1e13,
            },{
                require() { return player.sol.bestStage.gte(8) },
                req_txt: `Stage 8`,
                title: "Solar Flares Generator Generation",
                desc: `Passively increase solar flare generation based on your current star tier.`,
                icon: ['Curr/SolarFlare'],
                cost: i => 1e14,
            },{
                require() { return player.sol.bestStage.gte(12) },
                req_txt: `Stage 12`,
                title: "Powerful Constellation",
                desc: `Star constellations are <b class="green">thrice</b> as more powerful.`,
                icon: ['Icons/StarUpgrade'],
                cost: i => 1e18,
            },{
                require() { return player.sol.bestStage.gte(16) },
                req_txt: `Stage 16`,
                title: "Remnant Keeper I",
                desc: `Keep first six Remnant Upgrades on reset.`,
                icon: ['Curr/Remnant'],
                cost: i => 1e21,
            },{
                title: "No Grid Effect Cap",
                desc: `Grid's Effect no longer has cap.`,
                icon: ['Icons/GridUpgrade','Icons/Infinite'],
                cost: i => 1e75,
                require() { return player.sol.bestStage.gte(75) },
                req_txt: `Stage 75`,
            },{
                require() { return player.sol.bestStage.gte(100) },
                req_txt: `Stage 100`,
                title: "Remnant Keeper II",
                desc: `Keep 7-8th Remnant Upgrades on reset.`,
                icon: ['Curr/Remnant'],
                cost: i => 1e121,
            },{
                require() { return player.sol.bestStage.gte(200) },
                req_txt: `Stage 200`,
                title: "Softcapless Lunar Boost",
                desc: `Any exponential-only lunar boost no longer gets softcapped.`,
                icon: ['Curr/Lunar','Icons/Infinite'],
                costOnce: true,
                cost: i => E('e480'),
            },
        ],
    },{
        title: "Filler Upgrades",
        tab: ['Curr/SolarShard','yellow'],
        res: "ss",

        require() { return player.sn.times >= 2 },
        req_txt: `SN 2`,

        ctn: [
            {
                max: 1000,
                title: "Solar Stardust",
                desc: `Increase stardust generated by <b class="green">+10%</b> per level.`,
                icon: ['Curr/Stardust'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i/10
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar Platinum",
                desc: `Increase platinum gain by <b class="green">+100%</b> per level.`,
                icon: ['Curr/Platinum'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i
                        
                    return x
                },
                effDesc: x => formatMult(x,0),
            },{
                max: 1000,
                title: "Solar Moonstone",
                desc: `Increase moonstone gain by <b class="green">+100%</b> per level.`,
                icon: ['Curr/MoonStone'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i
                        
                    return x
                },
                effDesc: x => formatMult(x,0),
            },{
                max: 1000,
                title: "Solar Stars",
                desc: `Increase stars gain by <b class="green">+100%</b> per level.`,
                icon: ['Curr/Star'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i
                        
                    return x
                },
                effDesc: x => formatMult(x,0),
            },{
                max: 1000,
                title: "Solar Flares",
                desc: `Increase solar flares generated by <b class="green">+20%</b> per level.`,
                icon: ['Curr/SolarFlare'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i/5
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar Planetarium",
                desc: `Increase planetarium gain by <b class="green">+100%</b> per level.`,
                icon: ['Curr/Planetoid'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                costOnce: true,
                cost: i => 3,
                effect(i) {
                    let x = 1+i
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar Observatorium",
                desc: `Increase observatorium gain by <b class="green">+25%</b> per level.`,
                icon: ['Curr/Observatorium'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                costOnce: true,
                cost: i => 3,
                effect(i) {
                    let x = 1+i/4
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar Astro",
                desc: `Increase astro gain by <b class="green">+100%</b> per level.`,
                icon: ['Curr/Astrolabe'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                costOnce: true,
                cost: i => 3,
                effect(i) {
                    let x = 1+i
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar Measure",
                desc: `Increase measure gain by <b class="green">+100%</b> per level.`,
                icon: ['Curr/Measure'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                costOnce: true,
                cost: i => 3,
                effect(i) {
                    let x = 1+i
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar Planets",
                desc: `Increase planets gain by <b class="green">+100%</b> per level.`,
                icon: ['Curr/Planet'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                costOnce: true,
                cost: i => 3,
                effect(i) {
                    let x = 1+i
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar Rays Filler",
                desc: `Increase solar rays gain by <b class="green">+5%</b> per level.`,
                icon: ['Icons/SR'],
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                costOnce: true,
                cost: i => 1e5,
                effect(i) {
                    let x = 1+i/20
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },
        ],
    },{
        title: "Solar Flare Upgrades",
        tab: ['Curr/SolarFlare','orange'],
        res: "sf",

        ctn: [
            {
                max: 25,
                title: "Super Star",
                desc: `Increase star grow speed per supernova (based on level).`,
                icon: ['Curr/StarGrow'],
                cost: i => Decimal.pow(1.5,i).mul(100),
                bulk: i => i.div(100).log(1.5).floor().toNumber()+1,
                effect(i) {
                    if (i == 0) return 1;

                    let x = Decimal.pow(1.15,i-1).mul(0.15*player.sn.times).add(1)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 100,
                title: "Supercharged",
                desc: `Increase charge rate by <b class="green">+200%</b> compounding per level.`,
                icon: ['Curr/Charge'],
                cost: i => Decimal.pow(1.35,i).mul(500),
                bulk: i => i.div(500).log(1.35).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(3,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Superpower",
                desc: `Increase lunar power rate by <b class="green">+25%</b> per level.`,
                icon: ['Curr/Lunar'],
                costOnce: true,
                cost: i => 250,
                effect(i) {
                    let x = i/4+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 100,
                title: "Solar Shards",
                desc: `Increase solar shards gain by <b class="green">+10%</b> per level.`,
                icon: ['Curr/SolarShard'],
                cost: i => Decimal.pow(1.15,i).mul(500),
                bulk: i => i.div(500).log(1.15).floor().toNumber()+1,
                effect(i) {
                    let x = i/10+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                title: "The Solar Idler",
                desc: `Generate best solar shards. This upgrade triggers everyday.`,
                icon: ['Curr/SolarShard','Icons/Automation'],
                cost: i => 100,
            },{
                max: 25,
                title: "Solar Powered Lines II",
                desc: `Increase lines generated by <b class="green">+50%</b> compounding per level.`,
                icon: ['Curr/Lines'],
                cost: i => Decimal.pow(1.65,i).mul(300),
                bulk: i => i.div(300).log(1.65).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.5,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 25,
                title: "Solar Powered Arcs II",
                desc: `Increase arcs generated by <b class="green">+50%</b> compounding per level.`,
                icon: ['Curr/Arcs'],
                cost: i => Decimal.pow(1.65,i).mul(600),
                bulk: i => i.div(600).log(1.65).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.5,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 25,
                title: "Supercharged Dark",
                desc: `Increase dark charge rate by <b class="green">+100%</b> compounding per level.`,
                icon: ['Curr/DarkCharge'],
                cost: i => Decimal.pow(1.75,i).mul(1e3),
                bulk: i => i.div(1e3).log(1.75).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar Stardust II",
                desc: `Increase stardust generated by <b class="green">+10%</b> per level.`,
                icon: ['Curr/Stardust'],
                costOnce: true,
                cost: i => 300,
                effect(i) {
                    let x = i/10+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar Observatorium II",
                desc: `Increase observatorium gain by <b class="green">+25%</b> per level.`,
                icon: ['Curr/Observatorium'],
                costOnce: true,
                cost: i => 200,
                effect(i) {
                    let x = i/4+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar XP",
                desc: `Increase the exponent of XP by <b class="green">+0.1%</b> per level.`,
                icon: ['Icons/XP','Icons/Exponent'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                costOnce: true,
                cost: i => 1e4,
                effect(i) {
                    let x = i/1e3+1
                        
                    return x
                },
                effDesc: x => formatPow(x,3),
            },{
                max: 1000,
                title: "Solar TP",
                desc: `Increase the exponent of TP by <b class="green">+0.1%</b> per level.`,
                icon: ['Icons/TP','Icons/Exponent'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                costOnce: true,
                cost: i => 1e4,
                effect(i) {
                    let x = i/1e3+1
                        
                    return x
                },
                effDesc: x => formatPow(x,3),
            },{
                max: 1000,
                title: "Solar SP",
                desc: `Increase the exponent of SP by <b class="green">+0.1%</b> per level.`,
                icon: ['Icons/SP','Icons/Exponent'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                costOnce: true,
                cost: i => 1e4,
                effect(i) {
                    let x = i/1e3+1
                        
                    return x
                },
                effDesc: x => formatPow(x,3),
            },{
                max: 1000,
                title: "Solar Cosmic",
                desc: `Increase the exponent of Cosmic by <b class="green">+0.1%</b> per level.`,
                icon: ['Icons/XP2','Icons/Exponent'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                costOnce: true,
                cost: i => 1e4,
                effect(i) {
                    let x = i/1e3+1
                        
                    return x
                },
                effDesc: x => formatPow(x,3),
            },{
                max: 100,
                title: "Solar Rays",
                desc: `Increase solar rays gain by <b class="green">+1%</b> per level.`,
                icon: ['Icons/SR'],
                require() { return player.sn.tier.gte(2) },
                req_txt: `T2`,
                costOnce: true,
                cost: i => 1e5,
                effect(i) {
                    let x = i/100+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 100,
                title: "Solar XP II",
                desc: `Increase the exponent of XP by <b class="green">+1%</b> per level.`,
                icon: ['Icons/XP','Icons/Exponent'],
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                cost: i => Decimal.pow(1.25,i).mul(1e8),
                bulk: i => i.div(1e8).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = i/1e2+1
                        
                    return x
                },
                effDesc: x => formatPow(x,2),
            },{
                max: 100,
                title: "Solar TP II",
                desc: `Increase the exponent of TP by <b class="green">+1%</b> per level.`,
                icon: ['Icons/TP','Icons/Exponent'],
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                cost: i => Decimal.pow(1.25,i).mul(1e8),
                bulk: i => i.div(1e8).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = i/1e2+1
                        
                    return x
                },
                effDesc: x => formatPow(x,2),
            },{
                max: 100,
                title: "Solar SP II",
                desc: `Increase the exponent of SP by <b class="green">+1%</b> per level.`,
                icon: ['Icons/SP','Icons/Exponent'],
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                cost: i => Decimal.pow(1.25,i).mul(1e8),
                bulk: i => i.div(1e8).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = i/1e2+1
                        
                    return x
                },
                effDesc: x => formatPow(x,2),
            },{
                max: 100,
                title: "Solar Cosmic II",
                desc: `Increase the exponent of Cosmic by <b class="green">+1%</b> per level.`,
                icon: ['Icons/XP2','Icons/Exponent'],
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                cost: i => Decimal.pow(1.25,i).mul(1e8),
                bulk: i => i.div(1e8).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = i/1e2+1
                        
                    return x
                },
                effDesc: x => formatPow(x,2),
            },{
                max: 1000,
                title: "Solar Rays II",
                desc: `Increase solar rays gain by <b class="green">+1%</b> per level.`,
                icon: ['Icons/SR'],
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                costOnce: true,
                cost: i => 1e9,
                effect(i) {
                    let x = i/100+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 100,
                title: "Solar Star Growth",
                desc: `Increase star grow speed by <b class="green">+20%</b> compounding per level.`,
                icon: ['Curr/StarGrow'],
                require() { return player.sn.tier.gte(4) },
                req_txt: `T4`,
                cost: i => Decimal.pow(1.2,i).mul(1e8),
                bulk: i => i.div(1e8).log(1.2).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },
        ],
    },{
        title: "Remnant Upgrades",
        tab: ['Curr/Remnant','black'],
        res: "remnant",

        require() { return player.sn.tier.gte(2) },
        req_txt: `T2`,

        ctn: [
            {
                max: 1000,
                title: "Solar Flare Remnants",
                desc: `Increase solar flares generated by <b class="green">+20%</b> per level.`,
                icon: ['Curr/SolarFlare'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i/5
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Solar Shard Remnants",
                desc: `Increase solar shards gain by <b class="green">+5%</b> per level.`,
                icon: ['Curr/SolarShard'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i/20
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Star Growth Remnants",
                desc: `Increase star grow speed by <b class="green">+10%</b> per level.`,
                icon: ['Curr/StarGrow'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i/10
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Offense Remnants",
                desc: `Increase fighting offense by <b class="green">+10%</b> per level.`,
                icon: ['Icons/Sword'],
                unl: () => hasSolarUpgrade(7,1),
                costOnce: true,
                cost: i => 10,
                effect(i) {
                    let x = 1+i/10
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Collection Remnants",
                desc: `Increase collection speed by <b class="green">+10%</b> per level.`,
                icon: ['Icons/Collect'],
                unl: () => hasSolarUpgrade(7,1),
                costOnce: true,
                cost: i => 10,
                effect(i) {
                    let x = 1+i/10
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Forming Remnants",
                desc: `Increase forming speed by <b class="green">+10%</b> per level.`,
                icon: ['Icons/Form'],
                unl: () => hasSolarUpgrade(7,1),
                costOnce: true,
                cost: i => 10,
                effect(i) {
                    let x = 1+i/10
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Divine Soul Remnants",
                desc: `Increase divine soul gained by <b class="green">+10%</b> per level.`,
                icon: ['Curr/DivineSoul'],
                unl: () => player.sn.tier.gte(8),
                cost: i => Decimal.pow(1.2,i).mul(1e4).ceil(),
                bulk: i => i.div(1e4).log(1.2).floor().toNumber()+1,
                effect(i) {
                    let x = 1+i/10
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Restoration Remnants",
                desc: `Increase restoring speed by <b class="green">+10%</b> compounding per level.`,
                icon: ['Icons/Restore'],
                unl: () => player.sn.tier.gte(8),
                cost: i => Decimal.pow(1.2,i).mul(1e4).ceil(),
                bulk: i => i.div(1e4).log(1.2).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.1,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "CS Remnants",
                desc: `Increase yield of corruption shards by <b class="green">+100%</b> per level.`,
                icon: ['Curr/CorruptionShard'],
                unl: () => player.hsj>=4,
                costOnce: true,
                cost: i => 1e12,
                effect(i) {
                    let x = i+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },
        ],
    },{
        title: "Sun Upgrades",
        tab: ['Curr/Sunstone','yellow'],
        res: "sunstone",

        require() { return player.sn.tier.gte(4) },
        req_txt: `T4`,

        ctn: [
            {
                max: 100,
                title: "Sunstone Solar Flares",
                desc: `Increase solar flares generated by <b class="green">+50%</b> per level.`,
                icon: ['Curr/SolarFlare'],
                cost: i => Decimal.pow(1.1,i).mul(10).ceil(),
                bulk: i => i.div(10).log(1.1).floor().toNumber()+1,
                effect(i) {
                    let x = 1+i/2
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 100,
                title: "Sunstone Star Growth",
                desc: `Increase star grow speed by <b class="green">+20%</b> compounding per level.`,
                icon: ['Curr/StarGrow'],
                cost: i => Decimal.pow(1.5,i).mul(20).ceil(),
                bulk: i => i.div(20).log(1.5).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 10,
                title: "Sunstone Remnants",
                desc: `Increase remnants gain by <b class="green">+100%</b> per level.`,
                icon: ['Curr/Remnant'],
                cost: i => Decimal.pow(20,i).mul(100).ceil(),
                bulk: i => i.div(100).log(20).floor().toNumber()+1,
                effect(i) {
                    let x = i+1
                        
                    return x
                },
                effDesc: x => formatMult(x,0),
                onBuy: updateRemnant,
            },{
                max: 10,
                title: "Ray Cap",
                desc: `Increases rays cap by <b class="green">+1</b> per level.`,
                icon: ['Icons/RayUpgrade'],
                require() { return player.sn.tier.gte(5) },
                req_txt: `T5`,
                cost: i => Decimal.pow(1.5,i).mul(50).ceil(),
                bulk: i => i.div(50).log(1.5).floor().toNumber()+1,
                effect(i) {
                    let x = i
                        
                    return x
                },
                effDesc: x => "+"+format(x,0),
            },{
                max: 10,
                title: "Improver Cap",
                desc: `Increases improver cap by <b class="green">+1</b> per level.`,
                icon: ['Icons/UpgraderUpgrade'],
                require() { return player.sn.tier.gte(5) },
                req_txt: `T5`,
                cost: i => Decimal.pow(1.5,i).mul(75).ceil(),
                bulk: i => i.div(75).log(1.5).floor().toNumber()+1,
                effect(i) {
                    let x = i
                        
                    return x
                },
                effDesc: x => "+"+format(x,0),
            },{
                max: 100,
                title: "Sunstone Offense",
                desc: `Increase fighting offense by <b class="green">+10%</b> per level.`,
                icon: ['Icons/Sword'],
                require() { return player.sol.bestStage.gte(5) },
                req_txt: `Stage 5`,
                cost: i => Decimal.pow(1.2,i).mul(1e4).ceil(),
                bulk: i => i.div(1e4).log(1.2).floor().toNumber()+1,
                effect(i) {
                    let x = i/10+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 100,
                title: "Sunstone Solar Shards",
                desc: `Increase solar shards earned by <b class="green">+10%</b> per level.`,
                icon: ['Curr/SolarShard'],
                require() { return player.sol.bestStage.gte(10) },
                req_txt: `Stage 10`,
                cost: i => Decimal.pow(1.2,i).mul(1e9).ceil(),
                bulk: i => i.div(1e9).log(1.2).floor().toNumber()+1,
                effect(i) {
                    let x = i/10+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 16,
                title: "Faster Solar Idler",
                desc: `Speed The Solar Idler's trigger time by <b class="green">x2</b> per level.`,
                icon: ['Curr/SolarShard','Icons/Automation'],
                require() { return player.sol.bestStage.gte(15) },
                req_txt: `Stage 15`,
                cost: i => Decimal.pow(1.5,i).mul(1e10).ceil(),
                bulk: i => i.div(1e10).log(1.5).floor().toNumber()+1,
                effect(i) {
                    let x = 2**i
                        
                    return x
                },
                effDesc: x => formatMult(x,0),
            },{
                unl: ()=>player.sn.tier.gte(8),
                max: 1000,
    
                title: "Solar Final Prism Upgrade",
                desc: `Increase Final Prism's tier again.`,

                icon: ['Icons/PrismUpgrade',"Icons/StarSpeed"],
                    
                cost: i => Decimal.pow(1.5,i**1.1).mul(1e45).ceil(),
                bulk: i => i.div(1e45).max(1).log(1.5).root(1.1).floor().add(1),
    
                effect(i) {
                    let x = i
    
                    return x
                },
                effDesc: x => "+"+format(x,0),
            },
        ],
    },{
        title: "Singularity Upgrades",
        tab: ['Curr/Singularity','darkmagenta'],
        res: "singularity",

        require() { return player.sn.tier.gte(5) },
        req_txt: `T5`,

        ctn: [
            {
                title: "Solarian",
                desc: `Unlock the <b class="green">Solarians</b> (on left of solar upgrades).`,
                icon: ['Curr/Solarian'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,0),
                title: "Remnants",
                desc: `Double remnants earned and unlock more remnant upgrades.`,
                icon: ['Curr/Remnant'],
                cost: i => 1,
                onBuy: updateRemnant,
            },{
                unl: () => hasSolarUpgrade(7,0),
                title: "Soul Stealer",
                desc: `<b class="green">Double</b> soul dropped.`,
                icon: ['Curr/Soul'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,1) && hasSolarUpgrade(7,2),
                title: "Sol Compression",
                desc: `Unlock the <b class="green">Sol Compression</b> (on bottom of solarian stage).`,
                icon: ['Curr/SolCurrency1a'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,3),
                title: "Forming Being Collector",
                desc: `Collector speed boosts Forming speed slightly.`,
                icon: ['Icons/Form'],
                cost: i => 1,
                effect(i) {
                    let x = tmp.sol.collectingMult?.root(3) ?? E(1)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: () => hasSolarUpgrade(7,3),
                title: "Reduced Enemy I",
                desc: `Reduce Enemy's health scaling by <b class="green">20%</b>.`,
                icon: ['Curr/EvilSolarian'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,4) && hasSolarUpgrade(7,5),
                title: "Further Soul",
                desc: `Unlock two more Soul upgrades.`,
                icon: ['Curr/Soul'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,6),
                title: "Restoration Being Forming",
                desc: `Forming speed boosts Restoring speed very slightly, starting at 1e50.`,
                icon: ['Icons/Restore'],
                cost: i => 1,
                effect(i) {
                    let x = tmp.sol.formingMult ?? E(1)
                        
                    return expMult(x.div(1e50).max(1),hasSolarUpgrade(7,18) ? 0.55 : 0.5)
                },
                effDesc: x => formatMult(x),
            },{
                unl: () => hasSolarUpgrade(7,6),
                title: "No Softcap Compression I",
                desc: `The effects of Compression T1-2 no longer have first softcap.`,
                icon: ['Curr/SolCurrency1a','Icons/Infinite'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,7) && hasSolarUpgrade(7,8),
                title: "Soul Absorber",
                desc: `Passively generate souls based on the current stages reward at <b class="green">1%</b> rate.`,
                icon: ['Curr/Soul'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,9),
                title: "Auto Compression",
                desc: `Automatically level compression equal to <b class="green">1%</b> of your current compressed sol (of that tier) per second.`,
                icon: ['Curr/SolCurrency1a','Icons/Automation2'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,9),
                title: "Better Remnant",
                desc: `Increase remnants earned by <b class="green">+5%</b> compounding per square-rooted current eclipse, starting at 1,000.`,
                icon: ['Curr/Remnant'],
                cost: i => 1,
                effect(i) {
                    let x = Decimal.pow(1.05,player.sn.eclipse.sub(1000).max(0).root(2))
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: () => hasSolarUpgrade(7,10) && hasSolarUpgrade(7,11) && hasCentralized(12),
                title: "Lunarian",
                desc: `Unlock the <b class='green'>Lunarian</b> features, including the Lunarian Map (bottom) & Inventory (bottom-right).`,
                icon: ['Curr/Lunarian'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,12),
                title: "Less Grass Softcap I",
                desc: `The softcap of 'Grass Exponent' Forming is <b class='green'>50%</b> weaker.`,
                icon: ['Curr/Grass'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,13),
                title: "Luanrian Offense",
                desc: `Lunarian Damage provides an exponential boost to Offense.`,
                icon: ['Icons/LunarSword'],
                cost: i => 1,
                effect(i) {
                    let x = getStartingStats().damage.max(1).log10().div(4).add(1)

                    if (hasSolarUpgrade(7,26)) x = x.pow(1.5)
                        
                    return x
                },
                effDesc: x => formatPow(x),
            },{
                unl: () => hasSolarUpgrade(7,13),
                title: "Squared Soul",
                desc: `<b class='green'>Square</b> Soul dropped.`,
                icon: ['Curr/Soul'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,14) && hasSolarUpgrade(7,15),
                title: "Darkness Arrives",
                desc: `Generates darkness equal to <b class='green'>100%</b> of your current mana per second. Unlock new darkness forming.`,
                icon: ['Curr/Darkness'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,16),
                title: "Better Sunstone",
                desc: `Sunstone's formula from Eclipse is overpowered.`,
                icon: ['Curr/Sunstone'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,17),
                title: "Better Restoration",
                desc: `Improve <b class='green'>'Restoration Being Forming'</b> better.`,
                icon: ['Icons/Restore'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,17),
                title: "Better Compression T4",
                desc: `Improve compression T4's effect better.`,
                icon: ['Curr/DivineSoul'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,18) && hasSolarUpgrade(7,19),
                title: "Lunarian Generation",
                desc: `Passively generates each lunarian resource equal to <b class='green'>10%</b> of minimum resource dropped by enemy with your current level.`,
                icon: ['Curr/Lunarian','Icons/Automation'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,20),
                title: "Scaled Corruption Shards",
                desc: `Scaled Corruption Shard in Synthesis starts <b class='green'>+10</b> later.`,
                icon: ['Curr/CorruptionShard'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,20),
                title: "Better Corruption Shards",
                desc: `Corruption Shard's base in Synthesis is increased by <b class='green'>+1</b>.`,
                icon: ['Curr/CorruptionShard'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,21) && hasSolarUpgrade(7,22),
                title: "Squared Compressed Sol",
                desc: `<b class='green'>Square</b> Compressed Sol generated.`,
                icon: ['Curr/SolCurrency1a'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,21) && hasSolarUpgrade(7,22),
                title: "Squared Compressed Sol Effects",
                desc: `<b class='green'>Square</b> the effects of first 6 Compressed Sol Tiers.`,
                icon: ['Curr/SolCurrency1a'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,23) && hasSolarUpgrade(7,24),
                title: "The Big One",
                desc: `<b class='green'>Square</b> collecting and forming.`,
                icon: ['Icons/Collect'],
                cost: i => 2,
            },{
                unl: () => hasSolarUpgrade(7,25),
                title: "Better Luanrian Offense",
                desc: `Improve <b class='green'>'Luanrian Offense'</b> better.`,
                icon: ['Icons/LunarSword'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,26),
                title: "Better Bonuses",
                desc: `Twilight bounses now provide exponential boosts to offense and souls/collect/form/restore.`,
                icon: ['Curr/UnstableSoul'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,27),
                title: "Forming Continuum",
                get desc() { return `Forming Stats/Basic/Collection/Restoration/Darkness will automatically update the best level & rank each without spending any resources (starting only at rank <b class="green">${format(1e9,0)}</b>), improving the level & rank formula.` },
                icon: ['Icons/Form','Icons/Infinite'],
                cost: i => 1,
            },{
                unl: () => hasSolarUpgrade(7,28),
                title: "Collector is Collector",
                desc: `Each collected material boosts the previous.`,
                icon: ['Icons/Collect'],
                cost: i => 1,
            },
        ],
    },{
        title: "Soul Upgrades",
        tab: ['Curr/Soul','cyan'],
        res: "soul",

        require() { return player.sol.bestStage.gte(1) },
        req_txt: `Stage 1`,

        ctn: [
            {
                max: 1000,
                title: "Collector I",
                desc: `Increase collection speed by <b class="green">+50%</b> per level.`,
                icon: ['Icons/Collect'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i/2
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Forming I",
                desc: `Increase forming speed by <b class="green">+50%</b> per level.`,
                icon: ['Icons/Form'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i/2
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 5,
                title: "Sol",
                desc: `Sol's multiplier is <b class="green">doubled</b> every level.`,
                icon: ['Curr/SolCurrency1'],
                cost: i => Decimal.pow(4,i).mul(10).ceil(),
                bulk: i => i.div(10).log(4).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x,0),
            },{
                max: 4,
                title: "Light Log",
                desc: `Light Log's multiplier is <b class="green">doubled</b> every level.`,
                icon: ['Curr/SolCurrency2'],
                require() { return player.sol.bestStage.gte(3) },
                req_txt: `Stage 3`,
                cost: i => Decimal.pow(6,i).mul(100).ceil(),
                bulk: i => i.div(100).log(6).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x,0),
            },{
                max: 3,
                title: "Portal Stone",
                desc: `Portal Stone's multiplier is <b class="green">doubled</b> every level.`,
                icon: ['Curr/SolCurrency3'],
                require() { return player.sol.bestStage.gte(10) },
                req_txt: `Stage 8`,
                cost: i => Decimal.pow(8,i).mul(1000).ceil(),
                bulk: i => i.div(1000).log(8).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x,0),
            },{
                max: 1000,
                title: "Forming II",
                desc: `Increase forming speed by <b class="green">+100%</b> per level.`,
                icon: ['Icons/Form'],
                costOnce: true,
                cost: i => 1e4,
                effect(i) {
                    let x = 1+i
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 3,
                title: "Fragment",
                desc: `Fragment's multiplier is <b class="green">doubled</b> every level.`,
                icon: ['Curr/SolCurrency4'],
                require() { return player.sol.bestStage.gte(20) },
                req_txt: `Stage 20`,
                cost: i => Decimal.pow(10,i).mul(1e8).ceil(),
                bulk: i => i.div(1e8).log(10).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x,0),
            },{
                unl: () => hasSolarUpgrade(7,6),
                max: 1000,
                title: "Collector II",
                desc: `Increase collection speed by <b class="green">+20%</b> compounding per level.`,
                icon: ['Icons/Collect'],
                cost: i => Decimal.pow(1.5,i**1.1).mul(1e25).ceil(),
                bulk: i => i.div(1e25).log(1.5).root(1.1).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: () => hasSolarUpgrade(7,6),
                max: 1000,
                title: "Forming III",
                desc: `Increase forming speed by <b class="green">+20%</b> compounding per level.`,
                icon: ['Icons/Form'],
                cost: i => Decimal.pow(1.5,i**1.1).mul(1e25).ceil(),
                bulk: i => i.div(1e25).log(1.5).root(1.1).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                require() { return player.sn.tier.gte(10) },
                req_txt: `T10`,
                max: 100,
                title: "Collector Exponent",
                desc: `Increase collection speed exponent by <b class="green">+1%</b> per level.`,
                icon: ['Icons/Collect','Icons/Exponent'],
                cost: i => Decimal.pow(10,i**2).mul('e400').ceil(),
                bulk: i => i.div('e400').log(10).root(2).floor().toNumber()+1,
                effect(i) {
                    let x = i/100+1
                        
                    return x
                },
                effDesc: x => formatPow(x),
            },{
                require() { return player.sn.tier.gte(10) },
                req_txt: `T10`,
                max: 100,
                title: "Forming Exponent",
                desc: `Increase forming speed exponent by <b class="green">+1%</b> per level.`,
                icon: ['Icons/Form','Icons/Exponent'],
                cost: i => Decimal.pow(10,i**2).mul('e400').ceil(),
                bulk: i => i.div('e400').log(10).root(2).floor().toNumber()+1,
                effect(i) {
                    let x = i/100+1
                        
                    return x
                },
                effDesc: x => formatPow(x),
            },
        ],
    },{
        title: "Divine Soul Upgrades",
        tab: ['Curr/DivineSoul','lightblue'],
        res: "divineSoul",

        require() { return player.sn.sunsetTimes>0 },
        req_txt: `First Sunset`,

        ctn: [
            {
                max: 1000,
                title: "Souls I",
                desc: `Increase soul dropped by <b class="green">+10%</b> per level.`,
                icon: ['Curr/Soul'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i/10
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Offense I",
                desc: `Increase offense multiplier by <b class="green">+100%</b> per level.`,
                icon: ['Icons/Sword'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Compression I",
                desc: `Increase compression speed by <b class="green">+100%</b> per level.`,
                icon: ['Curr/SolCurrency1a'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Mana Generation I",
                desc: `Increase mana generated by <b class="green">+10%</b> per level.`,
                icon: ['Curr/Mana'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i/10
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Restore I",
                desc: `Increase restore speed by <b class="green">+10%</b> per level.`,
                icon: ['Icons/Restore'],
                costOnce: true,
                cost: i => 1,
                effect(i) {
                    let x = 1+i/10
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 5,
                title: "Grass Essence I",
                desc: `Grass Essence's multiplier is <b class="green">doubled</b> every level.`,
                icon: ['Curr/GrassEssence'],
                require() { return player.sol.bestStage.gte(50) },
                req_txt: `Stage 50`,
                cost: i => Decimal.pow(10,i).mul(100).ceil(),
                bulk: i => i.div(100).log(10).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x,0),
            },{
                max: 6,
                title: "Keep Rank",
                desc: `Only lose up to ranks on sunrise.`,
                icon: ['Curr/Sunstone'],
                require() { return player.sol.bestStage.gte(60) },
                req_txt: `Stage 60`,
                cost: i => Decimal.pow(25,i).mul(1e3).ceil(),
                bulk: i => i.div(1e3).log(25).floor().toNumber()+1,
                effect(i) {
                    let x = i == 0 ? Infinity : 12 - 2 * i
                        
                    return x
                },
                effDesc: x => "-"+format(x,0),
            },{
                max: 10,
                title: "Offense Exponent",
                desc: `Increase fighting offense by <b class="green">+^0.05</b> per level.`,
                icon: ['Icons/Sword','Icons/Exponent'],
                require() { return player.sol.bestStage.gte(75) },
                req_txt: `Stage 75`,
                cost: i => Decimal.pow(100,i).mul(1e5).ceil(),
                bulk: i => i.div(1e5).log(100).floor().toNumber()+1,
                effect(i) {
                    let x = i/20+1
                        
                    return x
                },
                effDesc: x => formatPow(x),
            },{
                max: 10,
                title: "Solar Ray Exponent",
                desc: `Increase SR gain by <b class="green">+^0.1</b> per level.`,
                icon: ['Icons/SR','Icons/Exponent'],
                require() { return player.sol.bestStage.gte(100) },
                req_txt: `Stage 100`,
                cost: i => Decimal.pow(10,i).mul(1e9).ceil(),
                bulk: i => i.div(1e9).log(10).floor().toNumber()+1,
                effect(i) {
                    let x = i/10+1
                        
                    return x
                },
                effDesc: x => formatPow(x),
            },{
                require() { return player.sn.tier.gte(10) },
                req_txt: `T10`,
                max: 100,
                title: "Offense Exponent II",
                desc: `Increase fighting offense by <b class="green">+^0.1</b> per level.`,
                icon: ['Icons/Sword','Icons/Exponent'],
                cost: i => Decimal.pow(10,i**2).mul(1e35).ceil(),
                bulk: i => i.div(1e35).log(10).root(2).floor().toNumber()+1,
                effect(i) {
                    let x = i/10+1
                        
                    return x
                },
                effDesc: x => formatPow(x),
            },{
                require() { return player.sn.tier.gte(10) },
                req_txt: `T10`,
                max: 1000,
                title: "Restore II",
                desc: `Increase restore speed by <b class="green">+20%</b> compounding per level.`,
                icon: ['Icons/Restore'],
                cost: i => Decimal.pow(1.25,i**1.1).mul(1e35).ceil(),
                bulk: i => i.div(1e35).log(1.25).root(1.1).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },
        ],
    },{
        title: "Lunarian Soul Upgrades",
        tab: ['Curr/LunarianSoul','orange'],
        res: "lunar_soul",

        require() { return tmp.lunarianUnl },
        req_txt: `???`,

        ctn: [
            {
                max: 1000,
                title: "Souls II",
                desc: `Increase soul dropped by <b class="green">x2</b> per level.`,
                icon: ['Curr/Soul'],
                cost: i => Decimal.pow(1.25,i).mul(10).ceil(),
                bulk: i => i.div(10).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Compression II",
                desc: `Increase compression speed by <b class="green">x10</b> per level.`,
                icon: ['Curr/SolCurrency1a'],
                cost: i => Decimal.pow(1.25,i).mul(10).ceil(),
                bulk: i => i.div(10).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(10,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Mana Generation II",
                desc: `Increase mana generated by <b class="green">x5</b> per level.`,
                icon: ['Curr/Mana'],
                cost: i => Decimal.pow(1.25,i).mul(10).ceil(),
                bulk: i => i.div(10).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(5,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Lunarian Collector",
                desc: `Increase collection speed by <b class="green">x3</b> per level.`,
                icon: ['Icons/Collect'],
                cost: i => Decimal.pow(1.25,i).mul(10).ceil(),
                bulk: i => i.div(10).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(3,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Lunarian Forming",
                desc: `Increase forming speed by <b class="green">x3</b> per level.`,
                icon: ['Icons/Form'],
                cost: i => Decimal.pow(1.25,i).mul(10).ceil(),
                bulk: i => i.div(10).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(3,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Lunarian Restoration",
                desc: `Increase restore speed by <b class="green">x1.5</b> per level.`,
                icon: ['Icons/Restore'],
                cost: i => Decimal.pow(1.25,i).mul(10).ceil(),
                bulk: i => i.div(10).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.5,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Divine Souls I",
                desc: `Increase divine soul gain by <b class="green">x1.2</b> per level.`,
                icon: ['Curr/DivineSoul'],
                cost: i => Decimal.pow(1.25,i).mul(100).ceil(),
                bulk: i => i.div(100).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Funding",
                desc: `Increase funding speed by <b class="green">x1.1</b> per level.`,
                icon: ['Icons/Fund'],
                cost: i => Decimal.pow(1.25,i).mul(100).ceil(),
                bulk: i => i.div(100).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.1,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Lunarian Synthesis Speed",
                desc: `Increase synthesis speed by <b class="green">x1.1</b> per level.`,
                icon: ['Icons/SynthesisSpeed'],
                require() { return player.hsj >= 4 },
                req_txt: `HSJ4`,
                cost: i => Decimal.pow(1.25,i).mul(1e3).ceil(),
                bulk: i => i.div(1e3).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.1,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },
        ],
    },{
        title: "Unstable Soul Upgrades",
        tab: ['Curr/UnstableSoul','black'],
        res: "unstableSoul",

        require() { return player.sn.twilightTimes>0 },
        req_txt: `First Twilight`,

        ctn: [
            {
                max: 1000,
                title: "Divine Souls II",
                desc: `Increase divine soul gain by <b class="green">x1.2</b> per level.`,
                icon: ['Curr/DivineSoul'],
                cost: i => Decimal.pow(1.25,i).mul(5).ceil(),
                bulk: i => i.div(5).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 100,
                title: "Unstable Offense Exponent",
                desc: `Increase fighting offense by <b class="green">+^0.1</b> per level.`,
                icon: ['Icons/Sword','Icons/Exponent'],
                cost: i => Decimal.pow(2,i**1.5).mul(10).ceil(),
                bulk: i => i.div(10).log(2).root(1.5).floor().toNumber()+1,
                effect(i) {
                    let x = i/10+1
                        
                    return x
                },
                effDesc: x => formatPow(x),
            },{
                max: 100,
                title: "Scaled Stage I",
                desc: `Increase scaled stages starting by <b class="green">+5</b> per level.`,
                icon: ['Curr/EvilSolarian'],
                cost: i => Decimal.pow(2,i**1.5).mul(10).ceil(),
                bulk: i => i.div(10).log(2).root(1.5).floor().toNumber()+1,
                effect(i) {
                    let x = i * 5
                        
                    return x
                },
                effDesc: x => "+"+format(x,0)+" later",
            },{
                max: 6,
                title: "Super Keep Rank",
                desc: `Only lose up to ranks on sunset.`,
                icon: ['Curr/DivineSoul'],
                cost: i => Decimal.pow(10,i).mul(1e3).ceil(),
                bulk: i => i.div(1e3).log(10).floor().toNumber()+1,
                effect(i) {
                    let x = i == 0 ? Infinity : 12 - 2 * i
                        
                    return x
                },
                effDesc: x => "-"+format(x,0),
            },{
                max: 200,
                title: "Unstable Corruption Shards",
                desc: `Increase yield of corrupton shards by <b class="green">x1.1</b> per level.`,
                icon: ['Curr/CorruptionShard'],
                require() { return player.hsj >= 4 },
                req_txt: `HSJ4`,
                cost: i => Decimal.pow(1.5,i).mul(1e6).ceil(),
                bulk: i => i.div(1e6).log(1.5).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.1,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 200,
                title: "Unstable Synthesis Speed",
                desc: `Increase synthesis speed by <b class="green">x1.1</b> per level.`,
                icon: ['Icons/SynthesisSpeed'],
                require() { return player.hsj >= 4 },
                req_txt: `HSJ4`,
                cost: i => Decimal.pow(2,i).mul(1e6).ceil(),
                bulk: i => i.div(1e6).log(2).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.1,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },
        ],
    },{
        title: "Advanced Perk Upgrades",
        tab: ['Curr/Perks','#159edd'],
        res: "perks",

        require() { return player.hsj>=4 },
        req_txt: `HSJ4`,

        ctn: [
            {
                max: 1000,
                title: "Corruption Shard Perk",
                desc: `Increase yield of corruption shards by <b class="green">+10%</b> per level.`,
                icon: ['Curr/CorruptionShard'],
                costOnce: true,
                cost: i => 1e8,
                effect(i) {
                    let x = i/10+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Synthesis Speed Perk",
                desc: `Increase synthesis speed by <b class="green">+10%</b> per level.`,
                icon: ['Icons/SynthesisSpeed'],
                costOnce: true,
                cost: i => 1e8,
                effect(i) {
                    let x = i/10+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                max: 1000,
                title: "Funding Perk I",
                desc: `Increase funding speed by <b class="green">+10%</b> per level.`,
                icon: ['Icons/Fund'],
                costOnce: true,
                cost: i => 1e8,
                effect(i) {
                    let x = i/10+1
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>player.hsj>=5,

                max: 100,
                title: "Distant Level Perk",
                desc: `Increase distant level scaling by <b class="green">x2</b> per level.`,
                icon: ["Icons/XP"],
                cost: i => Decimal.pow(10,i).mul(1e10).ceil(),
                bulk: i => i.div(1e10).log(10).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(2,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },{
                unl: ()=>player.hsj>=5,

                max: 1000,
                title: "Funding Perk II",
                desc: `Increase funding speed by <b class="green">x1.1</b> per level.`,
                icon: ['Icons/Fund'],
                cost: i => Decimal.pow(1.25,i).mul(1e15).ceil(),
                bulk: i => i.div(1e15).log(1.25).floor().toNumber()+1,
                effect(i) {
                    let x = Decimal.pow(1.1,i)
                        
                    return x
                },
                effDesc: x => formatMult(x),
            },
        ],
    },
]

for (let x of SOLAR_UPGS) for (let y of x.ctn) y.max ??= 1

/*
{
    title: "Placeholder",
    desc: `Placeholder.`,
    icon: ['Icons/Placeholder'],
    require() { return player.sn.times >= 2 },
    req_txt: `SN 2`,
    cost: i => EINF,
    bulk: i => 1,
    effect(i) {
        let x = E(1)
            
        return x
    },
    effDesc: x => formatMult(x),
},
*/

const SU_RES = {
    ss: {
        name: "Solar Shard",

        base: "Bases/SupernovaBase",
        icon: "Curr/SolarShard",

        get amount() { return player.sn.solarShard },
        set amount(v) { player.sn.solarShard = v },

        get html() { return `Solar Shards: ${this.amount.format(0)}`+(hasSolarUpgrade(4,4) ? `<br>(+${player.sn.bestSSEarn.format(0)} in ${formatTime((86400-player.sn.triggerTime)/solarUpgEffect(6,7),0)})` : "") },
    },
    sf: {
        name: "Solar Flare",

        base: "Bases/SupernovaBase",
        icon: "Curr/SolarFlare",

        get amount() { return player.sn.solarFlare },
        set amount(v) { player.sn.solarFlare = v },

        get html() { return `Solar Flares: ${this.amount.format(0)} / ${tmp.maxSolarFlare.format(0)}<br>${this.amount.formatGain(tmp.flareGain)}` },
    },
    remnant: {
        name: "Remnants",

        base: "Bases/UnstableBase",
        icon: "Curr/Remnant",

        get amount() { return player.sn.remnant },
        set amount(v) { player.sn.remnant = v },

        get html() { return `
        Remnants: ${this.amount.format(0) + (player.sn.tier.gte(8) ? " " + this.amount.formatGain(player.sn.totalRemnant.div(100)) : "")}
        <br>Eclipse ${player.sn.eclipse.format(0)} | Solar Rays: ${player.sn.sr.sub(SUPERNOVA.eclipse.req(1)).max(0).format(0)} / ${SUPERNOVA.eclipse.reqBase.format(0)}` },
    },
    sunstone: {
        name: "Sunstone",

        base: "Bases/SolarBase",
        icon: "Curr/Sunstone",

        get amount() { return player.sn.sunstone },
        set amount(v) { player.sn.sunstone = v },

        get html() { return `Sunstone: ${this.amount.format(0)}` },
    },
    singularity: {
        name: "Singularity",

        base: "Bases/CentralizeBase",
        icon: "Curr/Singularity",

        get amount() { return E(player.singularity) },
        set amount(v) { player.singularity = v.round().toNumber() },

        get html() { return `Singularity: ${this.amount.format(0)}` },
    },
    soul: {
        name: "Soul",

        base: "Bases/CentralizeBase",
        icon: "Curr/Soul",

        get amount() { return player.sol.soul.round() },
        set amount(v) { player.sol.soul = v },

        get html() { return `Souls: ${this.amount.format(0)}` },
    },
    divineSoul: {
        name: "Divine Soul",

        base: "Bases/CentralizeBase",
        icon: "Curr/DivineSoul",

        get amount() { return player.sol.divineSoul.round() },
        set amount(v) { player.sol.divineSoul = v },

        get html() { return `Divine Souls: ${this.amount.format(0)}` },
    },
    lunar_soul: {
        name: "Lunarian Soul",

        base: "Bases/LunarianBase",
        icon: "Curr/LunarianSoul",

        get amount() { return LUNAR_MATERIALS.l_soul.amount },
        set amount(v) { LUNAR_MATERIALS.l_soul.amount = v },

        get html() { return `Lunarian Souls: ${this.amount.format(0)}` },
    },
    unstableSoul: {
        name: "Unstable Soul",

        base: "Bases/CentralizeBase",
        icon: "Curr/UnstableSoul",

        get amount() { return player.sol.unstableSoul.round() },
        set amount(v) { player.sol.unstableSoul = v },

        get html() { return `Unstable Souls: ${this.amount.format(0)}` },
    },
    perks: {
        name: "Perks",

        base: "Bases/PerkBase",
        icon: "Curr/Perks",

        get amount() { return tmp.perkUnspent },

        get html() { return `Perks: ${this.amount.format(0)}` + (player.hsj >= 5 ? " " + formatGain(this.amount,tmp.perks.div(100)) : "") },
    },
}

var solar_tab = 1
var solar_upg = [null,null]

function solarTab(i) {
    let t = SOLAR_UPGS[i]
    if (!t.require || t.require()) solar_tab = i
}

function chooseSolarUpg(i,x) {
    let t = SOLAR_UPGS[i].ctn[x]
    if (!t.require || t.require()) solar_upg = [i,x]
}

function hasSolarUpgrade(id,x) { return player.sn.solarUpgs[id][x] ?? 0 > 0 }
function solarUpgEffect(id,x,def=1) { return tmp.solar_upgs_effect[id][x] ?? def }

el.setup.solar_upgs = () => {
    let h1 = '', h2 = ''

    for (let i in SOLAR_UPGS) {
        t = SOLAR_UPGS[i]
        h1 += `
        <button id="solar-tab${i}" class="solar-tab-btn" style="background: ${t.tab[1] ?? "lightgray"}" onclick="solarTab(${i})">
            <div class="stb-img-icon" style="background-image: url(images/${t.tab[0]}.png)"></div>
            <div class="stb-img-locked">${t.req_txt ?? "???"}</div>
        </button>`

        h2 += `<div id="solar-upgs${i}-div">[${i}] <h2>${t.title}</h2><div class="table_left">`

        const r = SU_RES[t.res]

        for (let x in t.ctn) {
            const u = t.ctn[x]

            let icon = [r.base]
            if (u.icon) icon.push(...u.icon)
            else icon.push('Icons/Placeholder')

            let h = ""

            h += `
            <div class="solar_upg_ctn locked" id="solar_upg_${i}_${x}" onclick="chooseSolarUpg(${i},${x})">`
            for (ic in icon) h += `<img class="img_desc" draggable="false" src="${"images/"+icon[ic]+".png"}">`
            h += `<img class="img_res" draggable="false" src="${"images/"+r.base+".png"}"><img class="img_res" draggable="false" src="${"images/"+r.icon+".png"}">`
            h += `<img class="img_lock" draggable="false" src="images/Icons/Lock.png">`
            
            h += `
                <div id="solar_upg_${i}_${x}_cost" class="su_cost">???</div>
                <div id="solar_upg_${i}_${x}_amt" class="su_amt">0</div>
                <div id="solar_upg_${i}_${x}_req" class="su_req">${u.req_txt ?? "???"}</div>
            </div>
            `

            h2 += `
            <div class="solar_upg_div">
                ${h}
            </div>
            `
        }

        h2 += "</div></div>"
    }

    new Element("solar_tabs").setHTML(h1)
    new Element("solar_upgs_table").setHTML(h2)

    for (let [i,t] of Object.entries(SOLAR_UPGS)) {
        for (let x = 0; x < t.ctn.length; x++) {
            document.getElementById(`solar_upg_${i}_${x}`).addEventListener("contextmenu", e => {
                e.preventDefault();
                if (!t.ctn[x]?.require || t.ctn[x]?.require()) buyMaxSolarUpgrade(i,x)
            })
        }
    }
}

el.update.solar_upgs = () => {
    tmp.el.solar_upgs_res.setHTML(SU_RES[SOLAR_UPGS[solar_tab].res].html)

    tmp.el.su_desc_div.setDisplay(solar_upg[0] !== null)
    if (solar_upg[0] !== null) {
        let [id, i] = solar_upg
        const su = SOLAR_UPGS[id]
        const u = su.ctn[i]
        let amt = player.sn.solarUpgs[id][i]??0
        let res = SU_RES[su.res]

        tmp.el.su_title.setHTML(`[${id}-#${i}] <h3>${u.title}</h3>`)

        let h = ''

        if (u.max > 1) h += `Level <b class="yellow">${format(amt,0)}${u.max < Infinity ? ` / ${format(u.max,0)}` : ""}</b><br>`
        
        h += `
        ${u.desc}
        `

        if (u.effDesc) h += '<br>Effect: <span class="cyan">'+u.effDesc(tmp.solar_upgs_effect[id][i])+"</span>" + (amt < u.max && u.max > 1 ? " ➜ <span class='cyan'>"+u.effDesc(u.effect(amt+1))+"</span>" : "")

        if (amt < u.max) {
            let cost = u.cost(amt)
            let m = Math.min(25,u.max-Math.floor(amt/25)*25)
            let cost2 = u.costOnce?Decimal.mul(cost,m-amt%m):u.cost((Math.floor(amt/m)+1)*m-1)//upg.cost(amt+25)
            
            if (u.max > 1) h += `<br><span class="${Decimal.gte(res.amount,cost2)?"green":"red"}">Cost to next 25: ${format(cost2,0)} ${res.name}</span>`
            
            h += `<br><span class="${Decimal.gte(res.amount,cost)?"green":"red"}">Cost: ${format(cost,0)} ${res.name}</span>`
        }

        tmp.el.su_desc.setHTML(h)
    }

    for (let i in SOLAR_UPGS) {
        i = parseInt(i)
        let t = SOLAR_UPGS[i]

        tmp.el['solar-tab'+i].setClasses({"solar-tab-btn": true, locked: t.require && !t.require()})
        tmp.el['solar-upgs'+i+"-div"].setDisplay(solar_tab == i)
        if (solar_tab == i) {
            for (let x in t.ctn) {
                x = parseInt(x)

                const u = t.ctn[x]
                const id = `solar_upg_${i}_${x}`

                const unl = !u.unl || u.unl()

                tmp.el[id].setDisplay(unl)

                if (!unl) continue;

                const req = !u.require || u.require()

                tmp.el[id].setClasses({solar_upg_ctn: true, locked: !req, choosed: solar_upg[0] == i && solar_upg[1] == x})

                if (req) {
                    let amt = player.sn.solarUpgs[i][x]??0, cost = u.cost(amt), res = SU_RES[t.res]

                    tmp.el[id+"_amt"].setTxt(format(amt,0))
                    tmp.el[id+"_cost"].setTxt(amt < u.max ? format(cost,0,6) : "Maxed") // +" "+resDisplay
                    tmp.el[id+"_cost"].setClasses({su_cost: true, locked: res.amount.lt(cost) && amt < u.max})
                }
            }
        }
    }
}

function buySolarUpgrade(id,x) {
    const su = SOLAR_UPGS[id], u = su.ctn[x]
    const res = SU_RES[su.res]
    let amt = player.sn.solarUpgs[id]

    if ((amt[x]??0) >= u.max) return

    let cost = u.cost(amt[x]??0)

    if (Decimal.gte(res.amount,cost)) {
        if (id == 12) {
            player.spentPerkSolar = player.spentPerkSolar.add(cost)
            updateUnspentPerk()
        }
        else res.amount = res.amount.sub(cost).max(0)
        amt[x] = amt[x] ? amt[x] + 1 : 1
        updateSolarUpgradesTemp(id)
        if (u.onBuy) u.onBuy()
    }
}

function buyNextSolarUpgrade(id,x) {
	const su = SOLAR_UPGS[id], u = su.ctn[x]
    const res = SU_RES[su.res]
    let amt = player.sn.solarUpgs[id], amt2 = amt[x] ?? 0

    if (amt2 >= u.max) return

    let cost = u.cost(amt2)

	if (Decimal.gte(res.amount,cost)) {
		let bulk = u.max > 1 ? u.costOnce ? Math.min(Math.floor(res.amount / cost), 25 - amt2 % 25) : Math.min(u.bulk(res.amount), Math.ceil((amt2 + 1) / 25) * 25) : 1

		if (bulk > (u.costOnce ? 0 : amt2)) {
            //console.log(bulk)

			amt[x] = Math.min(u.costOnce ? bulk + amt2 : Math.max(amt2,bulk),u.max)

            cost = u.costOnce ? Decimal.mul(cost,amt[x] - amt2) : u.cost(amt[x]-1)
            
            if (id == 12) {
                player.spentPerkSolar = player.spentPerkSolar.add(cost)
                updateUnspentPerk()
            }
            else res.amount = res.amount.sub(cost).max(0)

            updateSolarUpgradesTemp(id)

            if (u.onBuy) u.onBuy()
		}
	}
}

function buyMaxSolarUpgrade(id,x) {
    const su = SOLAR_UPGS[id], u = su.ctn[x]
    const res = SU_RES[su.res]
    let amt = player.sn.solarUpgs[id], amt2 = amt[x] ?? 0

    if (amt2 >= u.max) return

    let cost = u.cost(amt2)

	if (Decimal.gte(res.amount,cost)) {
		let bulk = u.max > 1 ? u.costOnce ? Math.floor(res.amount / cost) : u.bulk(res.amount) : 1

		if (bulk > (u.costOnce ? 0 : amt2)) {
			amt[x] = Math.min(u.costOnce ? bulk + amt2 : Math.max(amt2,bulk),u.max)

            cost = u.costOnce ? Decimal.mul(cost,amt[x] - amt2) : u.cost(amt[x]-1)

            if (id == 12) {
                player.spentPerkSolar = player.spentPerkSolar.add(cost)
                updateUnspentPerk()
            }
            else res.amount = res.amount.sub(cost).max(0)

            updateSolarUpgradesTemp(id)

            if (u.onBuy) u.onBuy()
		}
	}
}

function updateSolarUpgradesTemp(id) {
    const su = SOLAR_UPGS[id];
    for (let i = 0; i < su.ctn.length; i++) {
        const u = su.ctn[i]
        if (u.effect) tmp.solar_upgs_effect[id][i] = u.effect(player.sn.solarUpgs[id][i] ?? 0)
    }
}

function resetSolarUpgrades(id,keep_list=[],reset_list=false) {
    const u = player.sn.solarUpgs[id], su = SOLAR_UPGS[id]
    for (let i = 0; i < su.ctn.length; i++) {
        let include = !keep_list.includes(i)
        if (reset_list) include = !include
        if (include) u[i] = 0
    }
    updateSolarUpgradesTemp(id)
}

tmp_update.push(()=>{
    for (let id in SOLAR_UPGS) updateSolarUpgradesTemp(id)
})