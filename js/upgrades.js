const U_STEP = [1,25,1/0]

const UPG_RES = {
    grass: ["Grass",_=>[player,"grass"],'GrassBase'],
    perk: ["Perk",_=>[tmp,"perkUnspent"],'PerkBase'],
    pp: ["PP",_=>[player,"pp"],'PrestigeBase'],
    plat: ["Platinum",_=>[player,"plat"],"PlatBase"],
    crystal: ["Crystal",_=>[player,"crystal"],"CrystalBase"],
    steel: ["Steel",_=>[player,"steel"],"GrasshopBase"],
    aGrass: ["Anti-Grass",_=>[player,"aGrass"],'AntiGrassBase'],
}

const isResNumber = ['perk','plat']

const UPGS = {
    grass: {
        unl: _=> !player.decel,

        cannotBuy: _=>inChal(1) || inChal(7),

        autoUnl: _=>hasUpgrade('auto',3),

        noSpend: _=>hasUpgrade('auto',6),

        title: "Grass Upgrades",

        ctn: [
            {
                max: 1000,

                title: "Grass Value",
                desc: `Increase Grass gain by <b class="green">1</b> per level.<br>This effect is <b class="green">doubled</b> every <b class="yellow">25</b> levels.`,

                res: "grass",
                icon: ['Curr/Grass'],
                
                cost: i => Decimal.pow(1.2,i).mul(10).ceil(),
                bulk: i => i.div(10).max(1).log(1.2).floor().toNumber()+1,

                effect(i) {
                    let x = Decimal.pow(2,Math.floor(i/25)).mul(i+1)

                    return x
                },
                effDesc: x => x.format()+"x",
            },{
                max: 1000,

                title: "More Grass",
                desc: `Increase grass cap by <b class="green">1</b> per level.`,

                res: "grass",
                icon: ['Icons/MoreGrass'],
                
                cost: i => Decimal.pow(1.4,i).mul(25).ceil(),
                bulk: i => i.div(25).max(1).log(1.4).floor().toNumber()+1,

                effect(i) {
                    let x = i

                    return x
                },
                effDesc: x => "+"+format(x,0),
            },{
                max: 250,

                title: "Grow Speed",
                desc: `Increase grass grow speed by <b class="green">10%</b> per level.`,

                res: "grass",
                icon: ['Icons/Speed'],
                
                cost: i => Decimal.pow(1.75,i).mul(100).ceil(),
                bulk: i => i.div(100).max(1).log(1.75).floor().toNumber()+1,

                effect(i) {
                    let x = i/10+1

                    return x
                },
                effDesc: x => format(x)+"x",
            },{
                max: 1000,

                title: "XP",
                desc: `Increase experience (XP) gained by <b class="green">1</b> per level.<br>This effect is <b class="green">doubled</b> every <b class="yellow">25</b> levels.`,

                res: "grass",
                icon: ['Icons/XP'],
                
                cost: i => Decimal.pow(1.3,i).mul(1e3).ceil(),
                bulk: i => i.div(1e3).max(1).log(1.3).floor().toNumber()+1,

                effect(i) {
                    let x = Decimal.pow(2,Math.floor(i/25)).mul(i+1)

                    return x
                },
                effDesc: x => x.format()+"x",
            },{
                max: 5,

                title: "Range",
                desc: `Increase grass cut range by <b class="green">10</b> per level. Base is 50.`,

                res: "grass",
                icon: ['Icons/Range'],
                
                cost: i => Decimal.pow(2,i).mul(1e4).ceil(),
                bulk: i => i.div(1e4).max(1).log(2).floor().toNumber()+1,

                effect(i) {
                    let x = i*10

                    return x
                },
                effDesc: x => "+"+format(x,0),
            },
        ],
    },
    perk: {
        title: "Perk Upgrades",

        req: _=>player.level >= 1 || player.pTimes > 0,
        reqDesc: _=>`Reach Level 1 to unlock.`,

        underDesc: _=>`You have ${format(tmp.perkUnspent,0)} Perk`,

        autoUnl: _=>hasUpgrade('auto',13),

        ctn: [
            {
                max: 50,

                costOnce: true,

                title: "Value Perk",
                desc: `Increase Grass gain by <b class="green">20%</b> per level multiplied by experience level.`,

                res: "perk",
                icon: ['Curr/Grass'],
                
                cost: i => 1,
                bulk: i => i,

                effect(i) {
                    let x = Decimal.mul(player.level*i,0.2).add(1)

                    return x
                },
                effDesc: x => x.format()+"x",
            },{
                max: 10,

                costOnce: true,

                title: "Cap Perk",
                desc: `Increase grass cap by <b class="green">10</b> per level.`,

                res: "perk",
                icon: ['Icons/MoreGrass'],
                
                cost: i => 1,
                bulk: i => i,

                effect(i) {
                    let x = i*10

                    return x
                },
                effDesc: x => "+"+format(x,0),
            },{
                max: 10,

                costOnce: true,

                title: "Grow Speed Perk",
                desc: `Increase grass grow speed by <b class="green">25%</b> per level.`,

                res: "perk",
                icon: ['Icons/Speed'],
                
                cost: i => 1,
                bulk: i => i,

                effect(i) {
                    let x = 1+i*0.25

                    return x
                },
                effDesc: x => format(x)+"x",
            },{
                max: 50,

                costOnce: true,

                title: "XP Perk",
                desc: `Increase XP gain by <b class="green">20%</b> per level multiplied by experience level.`,

                res: "perk",
                icon: ['Icons/XP'],
                
                cost: i => 1,
                bulk: i => i,

                effect(i) {
                    // if (player.decel) return 1

                    let x = Decimal.mul(player.level*i,0.2).add(1)

                    return x
                },
                effDesc: x => x.format()+"x",
            },{
                max: 5,

                costOnce: true,

                title: "Range Perk",
                desc: `Increase grass cut range by <b class="green">10</b> per level.`,

                res: "perk",
                icon: ['Icons/Range'],
                
                cost: i => 1,
                bulk: i => i,

                effect(i) {
                    let x = i*10

                    return x
                },
                effDesc: x => "+"+format(x,0),
            },{
                max: 1,

                costOnce: true,

                title: "Grow Amount Perk",
                desc: `Increase the grass grow amount by <b class="green">1</b>.`,

                res: "perk",
                icon: ['Icons/MoreGrass'],
                
                cost: i => 10,
                bulk: i => Math.floor(i/10),

                effect(i) {
                    let x = i

                    return x
                },
                effDesc: x => "+"+format(x,0),
            },{
                max: 10,

                unl: _=>player.cTimes>0,

                costOnce: true,

                title: "TP Perk",
                desc: `Increase TP gain by <b class="green">5%</b> per level multiplied by experience level.`,

                res: "perk",
                icon: ['Icons/TP'],
                
                cost: i => 1,
                bulk: i => i,

                effect(i) {
                    let x = Decimal.mul(player.level*i,0.05).add(1)

                    return x
                },
                effDesc: x => x.format()+"x",
            },{
                max: 25,

                unl: _=>player.cTimes>0,

                costOnce: true,

                title: "PP Perk",
                desc: `Increase PP gain by <b class="green">20%</b> per level.`,

                res: "perk",
                icon: ['Curr/Prestige'],
                
                cost: i => 2,
                bulk: i => Math.floor(i/2),

                effect(i) {
                    let x = Decimal.mul(i,0.2).add(1)

                    return x
                },
                effDesc: x => x.format()+"x",
            },{
                max: 25,

                unl: _=>player.cTimes>0,

                costOnce: true,

                title: "Crystal Perk",
                desc: `Increase Crystal gain by <b class="green">20%</b> per level.`,

                res: "perk",
                icon: ['Curr/Crystal'],
                
                cost: i => 4,
                bulk: i => Math.floor(i/4),

                effect(i) {
                    let x = Decimal.mul(i,0.2).add(1)

                    return x
                },
                effDesc: x => x.format()+"x",
            },
        ],
    },
    auto: {
        title: "Automation Upgrades",

        req: _=>player.level >= 5 || player.pTimes > 0,
        reqDesc: _=>`Reach Level 5 to unlock.`,

        ctn: [
            {
                max: 5,

                title: "Autocut",
                desc: `Auto cuts grass every <b class="green">5</b> seconds (-1s every level after the first).`,
            
                res: "grass",
                icon: ['Curr/Grass','Icons/Automation'],
                            
                cost: i => Decimal.pow(10,i).mul(1e3).ceil(),
                bulk: i => i.div(1e3).max(1).log(10).floor().toNumber()+1,
            
                effect(i) {
                    let x = Math.max(i-1,0)
            
                    return x
                },
                effDesc: x => format(tmp.autocut)+" seconds",
            },{
                unl: _=>player.pTimes>0,
                max: 5,

                title: "Autocut Value",
                desc: `Auto cuts grass is worth <b class="green">+100%</b> more grass, XP & TP.`,
            
                res: "pp",
                icon: ['Curr/Grass'],
                            
                cost: i => Decimal.pow(3,i).mul(20).ceil(),
                bulk: i => i.div(20).max(1).log(3).floor().toNumber()+1,
            
                effect(i) {
                    let x = E(i+1)
            
                    return x
                },
                effDesc: x => format(x)+"x",
            },{
                unl: _=>player.pTimes>0,
                max: 3,

                title: "Autocut Amount",
                desc: `Increases auto cut amount by <b class="green">1</b>.`,
            
                res: "pp",
                icon: ['Curr/Grass','Icons/Automation'],
                            
                cost: i => Decimal.pow(5,i).mul(25).ceil(),
                bulk: i => i.div(25).max(1).log(5).floor().toNumber()+1,
            
                effect(i) {
                    let x = i
            
                    return x
                },
                effDesc: x => "+"+format(x,0),
            },{
                unl: _=>player.pTimes>0,

                title: "Grass Upgrade Autobuy",
                desc: `You can now automatically buy Grass Upgrades.`,
            
                res: "pp",
                icon: ['Curr/Grass','Icons/Automation'],
                            
                cost: i => E(1e3),
                bulk: i => 1,
            },{
                unl: _=>player.pTimes>0,

                title: "Perk Save P",
                desc: `Keep perks on Prestige.`,
            
                res: "pp",
                icon: ['Curr/Perks','Icons/Automation'],
                            
                cost: i => E(1e4),
                bulk: i => 1,
            },{
                unl: _=>player.cTimes>0,

                title: "Prestige Upgrade Autobuy",
                desc: `You can now automatically buy Prestige Upgrades.`,
            
                res: "crystal",
                icon: ['Curr/Prestige','Icons/Automation'],
                            
                cost: i => E(50),
                bulk: i => 1,
            },{
                unl: _=>player.cTimes>0,

                title: "Grass Upgrades EL",
                desc: `Grass Upgrades no longer spend grass.`,
            
                res: "crystal",
                icon: ['Curr/Grass','Icons/Infinite'],
                            
                cost: i => E(150),
                bulk: i => 1,
            },{
                unl: _=>player.cTimes>0,

                title: "Perk Save C",
                desc: `Keep perks on Crystallize.`,
            
                res: "crystal",
                icon: ['Curr/Perks','Icons/Automation'],
                            
                cost: i => E(500),
                bulk: i => 1,
            },{
                unl: _=>player.grasshop>0,

                title: "Crystal Upgrade Autobuy",
                desc: `You can now automatically buy Crystal Upgrades.`,
            
                res: "crystal",
                icon: ['Curr/Crystal','Icons/Automation'],
                            
                cost: i => E(1e11),
                bulk: i => 1,
            },{
                unl: _=>player.grasshop>0,

                title: "Prestige Upgrades EL",
                desc: `Prestige Upgrades no longer spend PP.`,
            
                res: "crystal",
                icon: ['Curr/Prestige','Icons/Infinite'],
                            
                cost: i => E(1e12),
                bulk: i => 1,
            },{
                unl: _=>player.grasshop>=4,

                title: "Crystal Upgrades EL",
                desc: `Crystal Upgrades no longer spend crystal.`,
            
                res: "crystal",
                icon: ['Curr/Crystal','Icons/Infinite'],
                            
                cost: i => E(1e15),
                bulk: i => 1,
            },{
                unl: _=>player.grasshop>=4,

                max: 10,

                title: "PP Generation",
                desc: `Passively generate <b class="green">1%</b> of PP you would earn on prestige per second.`,
            
                res: "pp",
                icon: ['Curr/Prestige','Icons/Automation'],
                            
                cost: i => Decimal.pow(2,i).mul(1e40).ceil(),
                bulk: i => i.div(1e40).max(1).log(2).floor().toNumber()+1,
                effect(i) {
                    let x = i/100
            
                    return x
                },
                effDesc: x => "+"+formatPercent(x,0)+"/s",
            },{
                unl: _=>player.grasshop>=4,

                max: 10,

                title: "Crystal Generation",
                desc: `Passively generate <b class="green">1%</b> of crystal you would earn on crystallize per second.`,
            
                res: "pp",
                icon: ['Curr/Crystal','Icons/Automation'],
                            
                cost: i => Decimal.pow(2,i).mul(1e42).ceil(),
                bulk: i => i.div(1e42).max(1).log(2).floor().toNumber()+1,
                effect(i) {
                    let x = i/100
            
                    return x
                },
                effDesc: x => "+"+formatPercent(x,0)+"/s",
            },{
                unl: _=>player.grasshop>=6,

                title: "Perk Autobuy",
                desc: `You can now automatically buy Perk Upgrades.`,
            
                res: "crystal",
                icon: ['Curr/Perks','Icons/Automation'],
                            
                cost: i => E(1e16),
                bulk: i => 1,
            },
        ],
    },
    plat: {
        title: "Platinum Upgrades",

        unl: _=>player.pTimes>0,

        req: _=>player.tier >= 3||player.cTimes > 0,
        reqDesc: _=>`Reach Tier 3 to unlock.`,

        underDesc: _=>`You have ${format(player.plat,0)} Platinum (${formatPercent(tmp.platChance)} grow chance)`,

        ctn: [
            {
                max: 9,

                costOnce: true,

                title: "Starter AC",
                desc: `Decreases auto cut time by <b class="green">0.1</b> seconds per level.`,

                res: "plat",
                icon: ['Curr/Grass','Icons/Automation'],
                
                cost: i => 5,
                bulk: i => Math.floor(i/5),

                effect(i) {
                    let x = i/10

                    return x
                },
                effDesc: x => format(tmp.autocut)+" seconds",
            },{
                max: 100,

                costOnce: true,

                title: "Plat XP",
                desc: `Increase XP gain by <b class="green">+20%</b> per level.`,

                res: "plat",
                icon: ['Icons/XP'],
                
                cost: i => 10,
                bulk: i => Math.floor(i/10),

                effect(i) {
                    let x = E(i*0.2+1)

                    return x
                },
                effDesc: x => format(x)+"x",
            },{
                max: 100,

                costOnce: true,

                title: "Plat Grass",
                desc: `Increase grass gain by <b class="green">+20%</b> per level.`,

                res: "plat",
                icon: ['Curr/Grass'],
                
                cost: i => 10,
                bulk: i => Math.floor(i/10),

                effect(i) {
                    let x = E(i*0.2+1)

                    return x
                },
                effDesc: x => format(x)+"x",
            },{
                max: 100,

                unl: _=>player.cTimes>0,

                costOnce: true,

                title: "Plat PP",
                desc: `Increase PP gain by <b class="green">+20%</b> per level.`,

                res: "plat",
                icon: ['Curr/Prestige'],
                
                cost: i => 100,
                bulk: i => Math.floor(i/100),

                effect(i) {
                    let x = E(i*0.2+1)

                    return x
                },
                effDesc: x => format(x)+"x",
            },{
                max: 100,

                unl: _=>player.cTimes>0,

                costOnce: true,

                title: "Plat Crystal",
                desc: `Increase Crystal gain by <b class="green">+20%</b> per level.`,

                res: "plat",
                icon: ['Curr/Crystal'],
                
                cost: i => 100,
                bulk: i => Math.floor(i/100),

                effect(i) {
                    let x = E(i*0.2+1)

                    return x
                },
                effDesc: x => format(x)+"x",
            },{
                max: 100,

                unl: _=>player.sTimes>0,

                costOnce: true,

                title: "Platinum Steel",
                desc: `Increase steel gain by <b class="green">+10%</b> per level.`,

                res: "plat",
                icon: ['Curr/Steel2'],
                
                cost: i => 1000,
                bulk: i => Math.floor(i/1000),

                effect(i) {
                    let x = E(i*0.1+1)

                    return x
                },
                effDesc: x => format(x)+"x",
            },{
                max: 25,

                unl: _=>player.sTimes>0,

                costOnce: true,

                title: "Plat-Exponential PP",
                desc: `Increase PP multiplier's exponent by <b class="green">+1%</b> per level.`,

                res: "plat",
                icon: ['Curr/Prestige','Icons/Exponent'],
                
                cost: i => 2000,
                bulk: i => Math.floor(i/2000),

                effect(i) {
                    let x = E(i*0.01+1)

                    return x
                },
                effDesc: x => "^"+format(x),
            },{
                max: 25,

                unl: _=>player.sTimes>0,

                costOnce: true,

                title: "Plat-Exponential Crystal",
                desc: `Increase Crystal multiplier's exponent by <b class="green">+1%</b> per level.`,

                res: "plat",
                icon: ['Curr/Crystal','Icons/Exponent'],
                
                cost: i => 3000,
                bulk: i => Math.floor(i/3000),

                effect(i) {
                    let x = E(i*0.01+1)

                    return x
                },
                effDesc: x => "^"+format(x),
            },
        ],
    },
}

// <b class="green"></b>
// <b class="yellow"></b>

/*
{
    title: "Placeholder",
    desc: `Placeholder.`,

    res: "grass",
                
    cost: i => Decimal.pow(1.15,i).mul(10).ceil(),
    bulk: i => i.div(10).max(1).log(1.15).floor().toNumber()+1,

    effect(i) {
        let x = E(1)

        return x
    },
    effDesc: x => format(x)+"x",
},
*/

const UPGS_SCOST = {}

function buyUpgrade(id,x) {
    let tu = tmp.upgs[id]

    if (tu.cannotBuy) return

    let upg = UPGS[id].ctn[x]
    let resDis = upg.res
    let res = tmp.upg_res[resDis]
    let amt = player.upgs[id]

    if ((amt[x]||0) < tu.max[x]) if (Decimal.gte(res,tu.cost[x])) {
        let [p,q] = UPG_RES[resDis][1]()

        if (resDis == 'perk') {
            player.spentPerk += tu.cost[x]
            tmp.perkUnspent = Math.max(player.maxPerk-player.spentPerk,0)
        }
        else if (!tu.noSpend) p[q] = isResNumber.includes(resDis) ? Math.max(p[q]-tu.cost[x],0) : p[q].sub(tu.cost[x]).max(0)
        amt[x] = amt[x] ? amt[x] + 1 : 1

        updateUpgResource(resDis)

        updateUpgTemp(id)
    }
}

function buyMaxUpgrade(id,x,auto=false) {
    let tu = tmp.upgs[id]

    if (tu.cannotBuy) return

    let upg = UPGS[id].ctn[x]
    let resDis = upg.res
    let res = tmp.upg_res[resDis]

    if (!auto || (tu.unlLength > 0 && Decimal.gte(res,tu.unlLength))) {
        let numInc = isResNumber.includes(resDis)

        let costOnce = upg.costOnce
        
        let res2 = res
        if (auto) res = numInc ? Math.ceil(res / tu.unlLength) : res.div(tu.unlLength).ceil()
        let amt = player.upgs[id]
        let amt2 = amt[x]||0

        if (amt2 < tu.max[x]) if (Decimal.gte(res2,tu.cost[x])) {
            if (auto) res = numInc ? Math.max(res,tu.cost[x]*1.01) : res.max(tu.cost[x]*1.01)
            let bulk = auto ? upg.bulk(res) : tu.bulk[x]

            if (costOnce ? true : bulk > amt2) {
                let [p,q] = UPG_RES[resDis][1]()
                let cost = costOnce ? tu.cost[x]*(Math.min(amt2+bulk,tu.max[x])-amt2) : upg.cost(bulk-1)

                amt[x] = Math.min(amt[x] ? costOnce ? amt[x]+bulk : Math.max(amt[x],bulk) : bulk,tu.max[x])
                if (resDis == 'perk') {
                    player.spentPerk += cost
                    tmp.perkUnspent = Math.max(player.maxPerk-player.spentPerk,0)
                }
                else if (!tu.noSpend) p[q] = numInc ? Math.max(p[q]-cost,0) : p[q].sub(cost).max(0)

                updateUpgResource(resDis)

                updateUpgTemp(id)
            }
        }
    }
}

function switchAutoUpg(id) {
    player.autoUpg[id] = !player.autoUpg[id]
}

function updateUpgTemp(id) {
    let upgs = UPGS[id]
    let uc = upgs.ctn
    let tu = tmp.upgs[id]
    let ul = 0
    for (let x = 0; x < uc.length; x++) {
        let upg = uc[x]
        let amt = player.upgs[id][x]||0
        let res = tmp.upg_res[upg.res]
        
        tu.max[x] = upg.max||1
        if (id == "grass") {
            if (hasUpgrade('assembler',0) && x == 0) tu.max[x] = Infinity
            else if (hasUpgrade('assembler',1) && x == 3) tu.max[x] = Infinity
        } else if (id == "pp") {
            if (hasUpgrade('assembler',2)) tu.max[x] = Infinity
        }

        if (upg.unl?upg.unl():true) if (amt < tu.max[x]) ul++

        tu.cost[x] = upg.cost(amt)
        tu.bulk[x] = Decimal.gte(res,UPGS_SCOST[id][x])?Math.min(upg.bulk(res),tu.max[x]):0

        if (upg.effect) tu.eff[x] = upg.effect(amt)
    }
    if (upgs.cannotBuy) tu.cannotBuy = upgs.cannotBuy()
    if (upgs.noSpend) tu.noSpend = upgs.noSpend()
    if (upgs.autoUnl) tu.autoUnl = upgs.autoUnl()
    tu.unlLength = ul
}

function setupUpgradesHTML(id) {
    let table = new Element("upgs_div_"+id)

    if (table.el) {
        let upgs = UPGS[id]
        let html = ""

        table.addClass(id)

        html += `
        <div style="height: 40px;">
            ${upgs.title} <button class="buyAllUpg" onclick="buyMaxUpgrades('${id}')">Buy All</button><button class="buyAllUpg" id="upg_auto_${id}" onclick="switchAutoUpg('${id}')">Auto: OFF</button>
        </div><div id="upgs_ctn_${id}" class="upgs_ctn">
        </div><div style="height: 40px;" id="upg_under_${id}">
            
        </div>
        <div id="upg_desc_div_${id}" class="upg_desc ${id}">
            <div id="upg_desc_${id}"></div>
            <div style="position: absolute; bottom: 0; width: 100%;">
                <button onclick="tmp.upg_ch.${id} = -1">Cancel</button>
                <button onclick="buyUpgrade('${id}',tmp.upg_ch.${id})">Buy 1</button>
                <button onclick="buyMaxUpgrade('${id}',tmp.upg_ch.${id})">Buy Max</button>
            </div>
        </div>
        <div id="upg_req_div_${id}" class="upg_desc ${id}">
            <div id="upg_req_desc_${id}" style="position:absolute;top:50%;width: 100%;transform:translateY(-50%);font-size:30px;"></div>
        </div>
        `

        table.setHTML(html)

        let height = document.getElementById(`upgs_ctn_${id}`).offsetHeight-25

        html = ""

        for (let x in UPGS[id].ctn) {
            let upg = UPGS[id].ctn[x]
            let icon = [id=='auto'&&x==0?'Bases/AutoBase':'Bases/'+UPG_RES[upg.res][2]]
            if (upg.icon) for (i in upg.icon) icon.push(upg.icon[i])
            else icon.push('Icons/Placeholder')

            html += `
            <div class="upg_ctn" id="upg_ctn_${id}${x}" style="width: ${height}px; height: ${height}px;" onclick="tmp.upg_ch.${id} = ${x}">`
            for (i in icon) html +=
                `<img draggable="false" src="${"images/"+icon[i]+".png"}">`
            html += `
                <div id="upg_ctn_${id}${x}_cost" class="upg_cost"></div>
                <div id="upg_ctn_${id}${x}_amt" class="upg_amt">argh</div>
            </div>
            `
        }

        new Element(`upgs_ctn_${id}`).setHTML(html)
    }
}

function updateUpgradesHTML(id) {
    let upgs = UPGS[id]
    let height = document.getElementById(`upgs_ctn_${id}`).offsetHeight-25
    let tu = tmp.upgs[id]
    let ch = tmp.upg_ch[id]

    let unl = upgs.unl?upgs.unl():true
    tmp.el["upgs_div_"+id].setDisplay(unl)

    if (unl) {
        let req = upgs.req?upgs.req():true

        tmp.el["upg_req_div_"+id].setDisplay(!req)

        if (req) {
            if (upgs.underDesc) tmp.el["upg_under_"+id].setHTML(upgs.underDesc())
            tmp.el["upg_desc_div_"+id].setDisplay(ch > -1)

            if (ch > -1) {
                let upg = UPGS[id].ctn[ch]
                let amt = player.upgs[id][ch]||0
                let res = tmp.upg_res[upg.res]
                let dis = UPG_RES[upg.res][0]

                let h = `
                [#${ch}] <h2>${upg.title}</h2><br>
                Level <b class="yellow">${format(amt,0)}${tu.max[ch] < Infinity ? ` / ${format(tu.max[ch],0)}` : ""}</b><br>
                ${upg.desc}
                `

                if (upg.effDesc) h += '<br>Effect: <span class="cyan">'+upg.effDesc(tu.eff[ch])+"</span>"

                if (amt < tu.max[ch]) {
                    let cost2 = upg.costOnce?Decimal.mul(tu.cost[ch],25):upg.cost((Math.floor(amt/25)+1)*25-1)//upg.cost(amt+25)
                    
                    h += `
                    <br><span class="${Decimal.gte(tmp.upg_res[upg.res],cost2)?"green":"red"}">Cost to next 25: ${format(cost2,0)} ${dis}</span>
                    <br><span class="${Decimal.gte(tmp.upg_res[upg.res],tu.cost[ch])?"green":"red"}">Cost: ${format(tu.cost[ch],0)} ${dis}</span>
                    <br>You have ${format(res,0)} ${dis}
                    `
                }

                tmp.el["upg_desc_"+id].setHTML(h)
            }

            if (ch < 0) {
                tmp.el["upg_auto_"+id].setDisplay(tu.autoUnl)
                if (tu.autoUnl) tmp.el["upg_auto_"+id].setTxt("Auto: "+(player.autoUpg[id]?"ON":"OFF"))

                for (let x = 0; x < upgs.ctn.length; x++) {
                    let upg = upgs.ctn[x]
                    let div_id = "upg_ctn_"+id+x
                    let amt = player.upgs[id][x]||0

                    let unlc = (upg.unl?upg.unl():true) && (player.options.hideUpgOption?amt < tu.max[x]:true)
                    tmp.el[div_id].setDisplay(unlc)

                    if (!unlc) continue

                    let res = tmp.upg_res[upg.res]

                    tmp.el[div_id].changeStyle("width",height+"px")
                    tmp.el[div_id].changeStyle("height",height+"px")

                    tmp.el[div_id+"_cost"].setTxt(amt < tu.max[x] ? format(tu.cost[x],0,6)+" "+UPG_RES[upg.res][0] : "Maxed")
                    tmp.el[div_id+"_cost"].setClasses({upg_cost: true, locked: Decimal.lt(res,tu.cost[x]) && amt < tu.max[x]})
                    //tmp.el[div_id+"_cost"].changeStyle("font-size",(tmp.el[div_id+"_cost"].el.offsetHeight-4)+"px")

                    tmp.el[div_id+"_amt"].setTxt(format(amt,0))
                    //tmp.el[div_id+"_amt"].changeStyle("font-size",(tmp.el[div_id+"_amt"].el.offsetHeight-4)+"px")
                }
            }
        } else if (upgs.reqDesc) tmp.el["upg_req_desc_"+id].setHTML(upgs.reqDesc())
    }
}

function hasUpgrade(id,x) { return player.upgs[id][x] > 0 }
function upgEffect(id,x,def=E(1)) { return tmp.upgs[id].eff[x] || def }

function resetUpgrades(id) {
    for (let x in UPGS[id].ctn) player.upgs[id][x] = 0
}

function buyMaxUpgrades(id) {
    let upgs = UPGS[id]
    for (let x = 0; x < UPGS[id].ctn.length; x++) {
        let upg = upgs.ctn[x]

        if (upg.unl?upg.unl():true) buyMaxUpgrade(id,x,true)
    }
}

function updateUpgResource(id) {
    let [p,q] = UPG_RES[id][1]()
    tmp.upg_res[id] = p[q]
}

function hideUpgOption() { player.options.hideUpgOption = !player.options.hideUpgOption }

tmp_update.push(_=>{
    for (let x in UPG_RES) updateUpgResource(x)
    for (let x in UPGS) updateUpgTemp(x)
})

el.setup.upgs = _=>{
    for (let x in UPGS) setupUpgradesHTML(x)
}

el.update.upgs = _=>{
    if (mapID == 'g') {
        updateUpgradesHTML('grass')
        updateUpgradesHTML('aGrass')
    }
    if (mapID == 'p') {
        updateUpgradesHTML('perk')
        updateUpgradesHTML('plat')
    }
    if (mapID == 'auto') updateUpgradesHTML('auto')
    if (mapID == 'pc') {
        updateUpgradesHTML('pp')
        updateUpgradesHTML('crystal')
    }
    if (mapID == 'gh') updateUpgradesHTML('factory')
    if (mapID == 'fd') {
        updateUpgradesHTML('foundry')
        updateUpgradesHTML('gen')
    }
    if (mapID == 'as') updateUpgradesHTML('assembler')

    if (mapID == 'opt') tmp.el.hideUpgOption.setTxt(player.options.hideUpgOption?"ON":"OFF")
}