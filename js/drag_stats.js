const drag_stats = {}

function createDragElement(id,name,x,y,list=[]) {
    if (id in drag_stats) return

    var s = drag_stats[id] = [false,false,list]

    var el = document.createElement("div")
    el.id = "drag-div-" + id
    el.className = "drag-div"
    el.innerHTML = `
    <div class="drag-top">
        <img id="drag-expand-${id}" src="images/expand_drag.png" draggable="false">
        <div id="drag-top-${id}">${name.bold()}</div>
        <img id="drag-pin-${id}" src="images/unpin_drag.png" draggable="false">
    </div><div class="drag-list" id="drag-list-${id}"></div>
    `
    el.style.top = y+"px"
    el.style.left = x+"px"
    document.getElementById("drag_stats").appendChild(el)

    function onDrag({movementX, movementY}){
        let getStyle = window.getComputedStyle(el)
        el.style.left = `${parseInt(getStyle.left) + movementX}px`;
        el.style.top = `${parseInt(getStyle.top) + movementY}px`;
    }
    document.getElementById("drag-top-" + id).addEventListener("mousedown", ()=>{
        window.addEventListener("mousemove", onDrag);
    });
    document.addEventListener("mouseup", ()=>{
        window.removeEventListener("mousemove", onDrag);
    });

    document.getElementById("drag-expand-" + id).onclick = () => {
        s[0] = !s[0]
        document.getElementById("drag-expand-" + id).setAttribute("src", "images/" + (s[0] ? "collapse_drag" : "expand_drag") + ".png")
    }
    document.getElementById("drag-pin-" + id).onclick = () => {
        s[1] = !s[1]
        document.getElementById("drag-pin-" + id).setAttribute("src", "images/" + (s[1] ? "pin_drag" : "unpin_drag") + ".png")
    }

    document.getElementById("drag-list-" + id).innerHTML = list.map((x,i) => {
        let icons = x.icon.map((y,j) => `<img src="images/${j==0?"Bases/":""}${y}.png" draggable="false">`).join("")
        return `
        <div class="drag-item" id="drag-item-${i}-${id}" onclick="changeDragPin('${id}',${i})">
            ${icons}
            <div id="drag-item-text-${i}-${id}"></div>
        </div>
        `
    }).join("")
}

/*
grass: ["Grass",()=>[player,"grass"],'GrassBase','Curr/Grass'],
perk: ["Perk",()=>[tmp,"perkUnspent"],'PerkBase','Curr/Perks'],
pp: ["PP",()=>[player,"pp"],'PrestigeBase','Curr/Prestige'],
plat: ["Platinum",()=>[player,"plat"],"PlatBase",'Curr/Platinum'],
crystal: ["Crystal",()=>[player,"crystal"],"CrystalBase",'Curr/Crystal'],
steel: ["Steel",()=>[player,"steel"],"GrasshopBase",'Curr/Steel2'],
aGrass: ["Anti-Grass",()=>[player,"aGrass"],'AntiGrassBase','Curr/AntiGrass'],
ap: ["AP",()=>[player,"ap"],'AnonymityBase','Curr/Anonymity'],
oil: ["Oil",()=>[player,"oil"],'LiquefyBase','Curr/Oil'],
rf: ["Rocket Fuel",()=>[player.rocket,"amount"],'RocketBase','Curr/RocketFuel'],
momentum: ["Momentum",()=>[player,"momentum"],'RocketBase',"Curr/Momentum"],
moonstone: ["Moonstone",()=>[player,"moonstone"],'MoonBase','Curr/Moonstone'],
fun: ["Fun",()=>[player,"fun"],'FunBase','Curr/Fun'],
star: ["Star",()=>[player,"stars"],'SpaceBase','Curr/Star'],
SFRGT: ["SFRGT",()=>[player,"SFRGT"],'FunBase','Curr/SuperFun'],
dm: ["Dark Matter",()=>[player,"dm"],'DarkMatterBase','Curr/DarkMatter'],
unGrass: ["Un-Grass",()=>[player,"unGrass"],'UnnaturalBase','Curr/UGrass'],
np: ["NP",()=>[player,"np"],'NormalityBase','Curr/Normality'],
pm: ["Planetarium",()=>[player.planetoid,"pm"],'PlanetBase','Curr/Planetoid'],
observ: ["Observatorium",()=>[player.planetoid,"observ"],'ObsBase','Curr/Observatorium'],
astro: ["Astro",()=>[player.planetoid,"astro"],'AstroBase','Curr/Astrolabe'],
measure: ["Measure",()=>[player.planetoid,"measure"],'MeasureBase','Curr/Measure'],
cloud: ["Cloud",()=>[player,"cloud"],'CloudBase','Curr/Cloud'],
planet: ["Planet",()=>[player.planetoid,"planet"],'PlanetaryBase','Curr/Planet'],
line: ["Line",()=>[player.constellation,"line"],'ConstellationBase','Curr/Lines'],
arc: ["Arc",()=>[player.constellation,"arc"],'ConstellationBase','Curr/Arcs'],
stardust: ["Stardust",()=>[player,"stardust"],'NebulaBase','Curr/Stardust'],
*/

function changeDragPin(id,i) {
    if (drag_stats[id][1]) {
        player.pinned_drag[id][i] = !player.pinned_drag[id][i]
    }
}

el.setup.drag = () => {
    createDragElement('bonus',"Bonuses",20,90,[
        {
            name: "XP Multiplier",
            icon: ['PrestigeBase','Icons/XP'],
            get primary_text() { return formatMult(tmp.XPGain) },
        },{
            unl: () => player.pTimes>0,
            name: "TP Multiplier",
            icon: ['CrystalBase','Icons/TP'],
            get primary_text() { return formatMult(tmp.TPGain) },
        },{
            unl: () => player.gTimes>0,
            name: "SP Multiplier",
            icon: ['SpaceBase','Icons/SP'],
            get primary_text() { return formatMult(tmp.SPGain) },
        },{
            unl: () => player.planetoid.firstEnter,
            name: "Cosmic Multiplier",
            icon: ['PlanetBase','Icons/XP2'],
            get primary_text() { return formatMult(tmp.cosmicGain) },
        },{
            unl: () => player.planetoid.firstEnter,
            name: "Rings Gain",
            icon: ['RingBase','Curr/Ring'],
            get primary_text() { return "+"+format(tmp.ringGain,0) },
        },{
            unl: () => player.sn.tier.gte(1),
            name: "Solar Shards Gain",
            icon: ['SupernovaBase','Curr/SolarShard'],
            get primary_text() { return "+"+format(tmp.solarShardGain,0) },
        },{
            unl: () => player.sn.tier.gte(2),
            name: "SR Multiplier",
            icon: ['EclipseBase','Icons/SR'],
            get primary_text() { return formatMult(tmp.SRgain) },
        },{
            unl: () => hasSolarUpgrade(7,0),
            name: "Offense",
            icon: ['CentralizeBase','Icons/Sword'],
            get primary_text() { return formatMult(tmp.sol.offense) },
        },{
            unl: () => hasSolarUpgrade(7,0),
            name: "Sunrise FM",
            icon: ['SolarBase','Icons/Fight'],
            get primary_text() { return formatMult(tmp.sol.sunriseFM) },
        },{
            unl: () => hasSolarUpgrade(7,0),
            name: "Fighting Multiplier",
            icon: ['CentralizeBase','Icons/Fight'],
            get primary_text() { return formatMult(player.sol.fight_mult) },
        },{
            unl: () => hasSolarUpgrade(7,0),
            name: "Collecting Multiplier",
            icon: ['CentralizeBase','Icons/Collect'],
            get primary_text() { return formatMult(tmp.sol.collectingMult) },
        },{
            unl: () => hasSolarUpgrade(7,0),
            name: "Forming Multiplier",
            icon: ['CentralizeBase','Icons/Form'],
            get primary_text() { return formatMult(tmp.sol.formingMult) },
        },{
            unl: () => hasSolarUpgrade(7,0),
            name: "Restoring Multiplier",
            icon: ['CentralizeBase','Icons/Restore'],
            get primary_text() { return formatMult(tmp.sol.restoreMult) },
        },{
            unl: () => hasSolarUpgrade(7,0),
            name: "Funding Multiplier",
            icon: ['LunarianBase','Icons/Fund'],
            get primary_text() { return formatMult(tmp.sol.fundMult) },
        },
    ])

    createDragElement('level',"Levels",20,60,[
        {
            name: "Normal Level",
            icon: ['PrestigeBase','Icons/XP'],
            get primary_text() { return format(player.level,0) },
        },{
            unl: () => player.hsj == 0 && (hasUpgrade("factory",4) || player.gTimes>0),
            name: "Anti-Level",
            icon: ['AnonymityBase','Icons/XP'],
            get primary_text() { return format(player.aRes.level,0) },
        },{
            unl: () => player.hsj == 0 && (hasUpgrade("funnyMachine",4) || player.sn.times>0),
            name: "Unnatural Level",
            icon: ['NormalityBase','Icons/XP'],
            get primary_text() { return format(player.unRes.level,0) },
        },{
            unl: () => player.pTimes>0,
            name: "Tier",
            icon: ['CrystalBase','Icons/TP'],
            get primary_text() { return format(player.hsj > 0 ? player.tier : player.decel ? player.aRes.tier : player.recel ? player.unRes.tier : player.tier,0) },
        },{
            unl: () => player.gTimes>0,
            name: "Astral",
            icon: ['SpaceBase','Icons/SP'],
            get primary_text() { return (player.astralPrestige>0?format(player.astralPrestige,0)+"-":"")+format(player.astral,0) },
        },{
            unl: () => player.planetoid.firstEnter,
            name: "Cosmic",
            icon: ['PlanetBase','Icons/XP2'],
            get primary_text() { return format(player.planetoid.level,0) },
        },{
            unl: () => player.grasshop>0 || player.gTimes>0,
            name: "Grasshop",
            icon: ['GrasshopBase','Icons/Grasshop2'],
            get primary_text() { return format(player.grasshop,0) },
        },{
            unl: () => player.bestGS>0,
            name: "Grass-Skip",
            icon: ['FunBase','Icons/GrassSkip'],
            get primary_text() { return format(player.grassskip,0) },
        },{
            unl: () => player.grassjump>0 || player.sn.times>0,
            name: "Grass Jump",
            icon: ['UnstableBase','Icons/GrassJump'],
            get primary_text() { return format(player.grassjump,0) },
        },{
            unl: () => player.planetoid.planetTier>0 || player.sn.times>0,
            name: "Planetary Tier",
            icon: ['PlanetaryBase','Curr/Planet'],
            get primary_text() { return format(player.planetoid.planetTier,0) },
        },{
            unl: () => player.sn.tier.gte(2),
            name: "Eclipse",
            icon: ['EclipseBase','Icons/SR'],
            get primary_text() { return format(player.sn.eclipse,0) },
        },{
            unl: () => hasSolarUpgrade(7,0),
            name: "Fighting Stage",
            icon: ['CentralizeBase','Icons/Sword'],
            get primary_text() { return format(player.sol.stage,0) },
        },
    ])

    const res_exc = ['sf','sun','mana','dark','cs','fs','eg','perk'], sol_drag=[], lun_drag =[]

    for (let [i,v] of Object.entries(SOL_MATERIALS)) if (!res_exc.includes(i)) {
        let u = {
            unl: v.unl??(i=='sol'||i=='soul'?()=>hasSolarUpgrade(7,0):undefined),
            name: v.name,
            icon: [v.base,v.icon],
            get primary_text() { return format(v.amount,0) },
        }
        sol_drag.push(u)
    }

    for (let [i,v] of Object.entries(LUNAR_MATERIALS)) if (!res_exc.includes(i)) {
        let u = {
            unl: v.unl,
            name: v.name,
            icon: [v.base,v.icon],
            get primary_text() { return format(v.amount,0) },
        }
        lun_drag.push(u)
    }

    createDragElement('currency',"Currencies",20,30,[
        {
            name: "Grass",
            icon: ['GrassBase','Curr/Grass'],
            get primary_text() { return format(player.grass,0) },
        },{
            unl: () => player.hsj == 0 && (hasUpgrade("factory",4) || player.gTimes>0),
            name: "Anti-Grass",
            icon: ['AntiGrassBase','Curr/AntiGrass'],
            get primary_text() { return format(player.aRes.grass,0) },
        },{
            unl: () => player.hsj == 0 && (hasUpgrade("funnyMachine",4) || player.sn.times>0),
            name: "Unnatural Grass",
            icon: ['UnnaturalBase','Curr/UGrass'],
            get primary_text() { return format(player.unRes.grass,0) },
        },{
            name: "Perks",
            icon: ['PerkBase','Curr/Perks'],
            get primary_text() { return format(tmp.perkUnspent,0) },
        },{
            unl: () => player.pTimes>0,
            name: "Prestige Points",
            icon: ['PrestigeBase','Curr/Prestige'],
            get primary_text() { return format(player.pp,0) },
        },{
            unl: () => player.pTimes>0,
            name: "Platinum",
            icon: ["PlatBase",'Curr/Platinum'],
            get primary_text() { return format(player.plat,0) },
        },{
            unl: () => player.cTimes>0,
            name: "Crystal",
            icon: ['CrystalBase','Curr/Crystal'],
            get primary_text() { return format(player.crystal,0) },
        },{
            unl: () => player.sTimes>0,
            name: "Steel",
            icon: ['GrasshopBase','Curr/Steel2'],
            get primary_text() { return format(player.steel,0) },
        },{
            unl: () => hasUpgrade('factory',2) || player.gTimes>0,
            name: "Charge",
            icon: ['GrasshopBase','Curr/Charge'],
            get primary_text() { return format(player.chargeRate,0) },
        },{
            unl: () => player.grassjump >= 16 || player.sn.times>0,
            name: "Dark Charge",
            icon: ['UnstableBase','Curr/DarkCharge'],
            get primary_text() { return format(player.darkCharge,0) },
        },{
            unl: () => player.aTimes>0,
            name: "Anonymity Points",
            icon: ['AnonymityBase','Curr/Anonymity'],
            get primary_text() { return format(player.ap,0) },
        },{
            unl: () => player.lTimes>0,
            name: "Oil",
            icon: ['LiquefyBase','Curr/Oil'],
            get primary_text() { return format(player.oil,0) },
        },{
            unl: () => hasUpgrade("factory",5) || player.gTimes>0,
            name: "Rocket Fuel",
            icon: ['RocketBase','Curr/RocketFuel'],
            get primary_text() { return format(player.rocket.amount,0) },
        },{
            unl: () => player.rocket.part>0 || player.gTimes>0,
            name: "Momentum",
            icon: ['RocketBase',"Curr/Momentum"],
            get primary_text() { return format(player.momentum,0) },
        },{
            unl: () => player.gTimes>0,
            name: "Stars",
            icon: ['SpaceBase','Curr/Star'],
            get primary_text() { return format(player.stars,0) },
        },{
            unl: () => player.gTimes>0,
            name: "Moonstone",
            icon: ['MoonBase','Curr/Moonstone'],
            get primary_text() { return format(player.moonstone,0) },
        },{
            unl: () => player.fTimes>0,
            name: "Fun",
            icon: ['FunBase','Curr/Fun'],
            get primary_text() { return format(player.fun,0) },
        },{
            unl: () => hasUpgrade("funnyMachine",1) || player.sn.times>0,
            name: "SFRGT",
            icon: ['FunBase','Curr/SuperFun'],
            get primary_text() { return format(player.SFRGT,0) },
        },{
            unl: () => player.sacTimes>0,
            name: "Dark Matter",
            icon: ['DarkMatterBase','Curr/DarkMatter'],
            get primary_text() { return format(player.dm,0) },
        },{
            unl: () => player.nTimes>0,
            name: "Normality Points",
            icon: ['NormalityBase','Curr/Normality'],
            get primary_text() { return format(player.np,0) },
        },{
            unl: () => player.cloudUnl || player.sn.times>0,
            name: "Cloud",
            icon: ['CloudBase','Curr/Cloud'],
            get primary_text() { return format(player.cloud,0) },
        },{
            unl: () => player.planetoid.firstEnter,
            name: "Planetarium",
            icon: ['PlanetBase','Curr/Planetoid'],
            get primary_text() { return format(player.planetoid.pm,0) },
        },{
            unl: () => player.planetoid.firstEnter,
            name: "Rings",
            icon: ['RingBase','Curr/Ring'],
            get primary_text() { return format(player.planetoid.ring,0) },
        },{
            unl: () => player.planetoid.firstEnter,
            name: "Observatorium",
            icon: ['ObsBase','Curr/Observatorium'],
            get primary_text() { return format(player.planetoid.observ,0) },
        },{
            unl: () => player.planetoid.firstEnter,
            name: "Reservatorium",
            icon: ['ResBase','Curr/Res4'],
            get primary_text() { return format(player.planetoid.reserv,0) },
        },{
            unl: () => player.planetoid.firstEnter,
            name: "Astro",
            icon: ['AstroBase','Curr/Astrolabe'],
            get primary_text() { return format(player.planetoid.astro,0) },
        },{
            unl: () => player.planetoid.firstEnter,
            name: "Measure",
            icon: ['MeasureBase','Curr/Measure'],
            get primary_text() { return format(player.planetoid.measure,0) },
        },{
            unl: () => player.planetoid.firstEnter,
            name: "Planets",
            icon: ['PlanetaryBase','Curr/Planet'],
            get primary_text() { return format(player.planetoid.planet,0) },
        },{
            unl: () => player.constellation.unl,
            name: "Lines",
            icon: ['ConstellationBase','Curr/Lines'],
            get primary_text() { return format(player.constellation.line,0) },
        },{
            unl: () => player.constellation.arcUnl,
            name: "Arcs",
            icon: ['ConstellationBase','Curr/Arcs'],
            get primary_text() { return format(player.constellation.arc,0) },
        },{
            unl: () => player.grassjump >= 30 || player.sn.times>0,
            name: "Stardust",
            icon: ['NebulaBase','Curr/Stardust'],
            get primary_text() { return format(player.stardust,0) },
        },{
            unl: () => player.grassjump >= 30 || player.sn.times>0,
            name: "Star Growth",
            icon: ['NebulaBase','Curr/StarGrow'],
            get primary_text() { return format(player.stargrowth,0) },
        },{
            unl: () => player.sn.times>0,
            name: "Solar Shards",
            icon: ['SupernovaBase','Curr/SolarShard'],
            get primary_text() { return format(player.sn.solarShard,0) },
        },{
            unl: () => player.sn.times>0,
            name: "Solar Flares",
            icon: ['SupernovaBase','Curr/SolarFlare'],
            get primary_text() { return format(player.sn.solarFlare,0) },
            get secondary_text() { return "Max "+format(tmp.maxSolarFlare,0) },
        },{
            unl: () => player.sn.tier.gte(2),
            name: "Remnants",
            icon: ['UnstableBase','Curr/Remnant'],
            get primary_text() { return format(player.sn.remnant,0) },
        },{
            unl: () => player.sn.tier.gte(4),
            name: "Sunstone",
            icon: ['SolarBase','Curr/Sunstone'],
            get primary_text() { return format(player.sn.sunstone,0) },
        },{
            unl: () => player.sn.tier.gte(5),
            name: "Singularity",
            icon: ['CentralizeBase','Curr/Singularity'],
            get primary_text() { return format(player.singularity,0) },
        },
        ...sol_drag,
        {
            unl: () => hasSolarUpgrade(7,3),
            name: "Compressed Sol",
            icon: ['SolarBase','Curr/SolCurrency1a'],
            get primary_text() { return format(player.sol.compression[0],0) },
        },{
            unl: () => player.sol.bestStage.gte(20),
            name: "Mana",
            icon: ['CentralizeBase','Curr/Mana'],
            get primary_text() { return format(player.sol.mana,0) },
        },{
            unl: () => player.sn.sunsetTimes>0,
            name: "Darkness",
            icon: ['CentralizeBase','Curr/Darkness'],
            get primary_text() { return format(player.sol.darkness,0) },
        },{
            unl: () => player.sn.twilightTimes>0,
            name: "Unstable Soul",
            icon: ['CentralizeBase','Curr/UnstableSoul'],
            get primary_text() { return format(player.sol.unstableSoul,0) },
        },
        ...lun_drag,
        {
            unl: () => player.hsj>=4,
            name: "Corruption Shard",
            icon: ['UnstableBase','Curr/CorruptionShard'],
            get primary_text() { return format(player.synthesis.cs,0) },
        },{
            unl: () => player.sn.tier.gte(12),
            name: "Flare Shards",
            icon: ['UnstableBase','Curr/FlareShard'],
            get primary_text() { return format(player.synthesis.fs,0) },
        },{
            unl: () => player.sn.tier.gte(14),
            name: "Empty Gem",
            icon: ['UnstableBase','Curr/EmptyGem'],
            get primary_text() { return format(player.synthesis.eg,0) },
        },
    ])
}

el.update.drag = () => {
    for (let [i,x] of Object.entries(drag_stats)) {
        document.getElementById("drag-list-" + i).style.display = x[0] ? "block" : "none"

        var dp = player.pinned_drag[i]

        if (x[0]) x[2].forEach((y,j) => {
            let unl = (x[1] || dp[j]) && (!y.unl || y.unl())

            var el = document.getElementById("drag-item-" + j + "-" + i)

            el.style.display = unl ? "block" : "none"

            if (!unl) return

            el.style.cursor = x[1] ? "pointer" : "default"
            el.style.backgroundColor = x[1] ? dp[j] ? "#0f02" : "#f002" : "#0000"

            document.getElementById("drag-item-text-" + j + "-" + i).innerHTML = `
            <div class="drag-small-text">${y.name.bold()}</div>${y.primary_text??""}<div class="drag-small-text">${y.secondary_text??""}</div>
            `
        })
    }
}