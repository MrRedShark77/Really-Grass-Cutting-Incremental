const SYNTHESIS = {
    slot: [["wtf?",()=>true],["Supernova Tier 12",()=>player.sn.tier.gte(12)],["Supernova Tier 13",()=>player.sn.tier.gte(13)],["Supernova Tier 14",()=>player.sn.tier.gte(14)]],

    type: [
        {
            name: "Corruption Shard",
            icon: "Curr/CorruptionShard",
            unl: ()=>true,
            cost: 0,

            req: l => Decimal.pow(3,l.scale(tmp.synthesis.scaled_t1-1,2,0)).mul(10),
            bulk: x => x.div(10).log(3).scale(tmp.synthesis.scaled_t1-1,2,0,true).add(1).floor(),

            get amount() { return player.synthesis.cs },
            set amount(v) { player.synthesis.cs = v },

            get mult() { return tmp.synthesis.csMult }
        },{
            name: "Flare Shard",
            icon: "Curr/FlareShard",
            unl: ()=>player.sn.tier.gte(12),
            cost: 1e25,

            req: l => Decimal.pow(5,l).mul(1e5),
            bulk: x => x.div(1e5).log(5).add(1).floor(),

            get amount() { return player.synthesis.fs },
            set amount(v) { player.synthesis.fs = v },

            get mult() { return player.hsj>=7 ? tmp.hsjEffect[2]??1 : 1 }
        },{
            name: "Empty Gem",
            icon: "Curr/EmptyGem",
            unl: ()=>player.sn.tier.gte(14),
            cost: 1e100,

            req: l => Decimal.pow(5,l).mul(1e21),
            bulk: x => x.div(1e21).log(5).add(1).floor(),

            get amount() { return player.synthesis.eg },
            set amount(v) { player.synthesis.eg = v },

            get mult() { return 1 }
        },
    ],

    get csMult() {
        let x = Decimal.mul(solarUpgEffect(11,4),upgEffect('cs',0)).mul(getSolCompressionEffect(5)).mul(solarUpgEffect(5,8)).mul(solarUpgEffect(12,0)).mul(getFormingBonus('adv',2)).mul(getStarBonus(14))

        return x
    },

    get speed() {
        let x = Decimal.mul(solarUpgEffect(11,5),upgEffect('cs',2)).mul(solarUpgEffect(10,8)).mul(solarUpgEffect(12,1)).mul(getFormingBonus('fund',7))

        return x
    },
}

var ss_type_choosed = -1

function insetSSlot(i,type=ss_type_choosed) {
    var T, S = player.synthesis.slot[i]

    if (S[0] == -1) {
        T = SYNTHESIS.type[type]

        if (type > -1 && player.synthesis.cs.gte(T.cost)) {
            player.synthesis.cs = player.synthesis.cs.sub(T.cost)
            S[0] = type
        }
    } else {
        T = SYNTHESIS.type[S[0]]

        T.amount = T.amount.add(getSSData(i).gain)

        S[0] = -1
        S[1] = E(0)
    }
}

function getSSData(i, display=false) {
    var S = player.synthesis.slot[i]

    if (S[0] == -1) return {}
    
    var T = SYNTHESIS.type[S[0]], D = {}

    D.level = S[1].gte(T.req(E(0))) ? T.bulk(S[1]) : E(0)

    if (display) {
        var start = D.level.lte(0) ? E(0) : T.req(D.level.sub(1)), finish = T.req(D.level)
        D.percent = S[1].sub(start).div(finish.sub(start)).max(0).min(1).toNumber()*100
        D.time = finish.sub(S[1]).div(tmp.synthesis.speed).max(0)
    }

    D.gain = D.level.lte(0) ? E(0) : Decimal.pow(tmp.synthesis.base[S[0]], D.level.sub(1)).mul(T.mult).round()

    return D
}

UPGS.cs = {
    title: "Corruption Shard Upgrades",

    autoUnl: ()=>player.sn.tier.gte(14),
    noSpend: ()=>player.sn.tier.gte(14),

    req: ()=>player.hsj>=4,
    reqDesc: ()=>`Reach HSJ 4 to Unlock.`,

    underDesc: ()=>`You have ${format(player.synthesis.cs,0)} Corruption Shard`,

    ctn: [
        {
            max: 1000,

            title: "Corruption Shard Synthesis Yield",
            desc: `Increase yield of corruption shards by <b class="green">x1.25</b> per level.`,
        
            res: "cs",
            icon: ["Curr/CorruptionShard"],
                        
            cost: i => Decimal.pow(2,i).mul(2),
            bulk: i => i.div(2).max(1).log(2).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(1.25,i)
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 1000,

            title: "Corrupted Offense",
            desc: `Increase fighting offense by <b class="green">+^0.01</b> per level.`,
        
            res: "cs",
            icon: ["Icons/Sword"],
                        
            cost: i => Decimal.pow(5,i).mul(5),
            bulk: i => i.div(5).max(1).log(5).floor().add(1),
        
            effect(i) {
                let x = i.div(100).add(1)
        
                return x
            },
            effDesc: x => formatPow(x),
        },{
            max: 1000,

            title: "Synthesis Speed",
            desc: `Increase synthesis speed by <b class="green">x1.15</b> per level.`,
        
            res: "cs",
            icon: ["Icons/SynthesisSpeed"],
                        
            cost: i => Decimal.pow(3,i).mul(10),
            bulk: i => i.div(10).max(1).log(3).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(1.15,i)
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 1000,

            title: "Distant Level",
            desc: `Increase distant level scaling by <b class="green">x1.1</b> per level.<br>The starting scaling of distant level is <b class="green">1,000,000</b> (after HSJ 3).`,
        
            res: "cs",
            icon: ["Icons/XP"],
                        
            cost: i => Decimal.pow(4,i).mul(25),
            bulk: i => i.div(25).max(1).log(4).floor().add(1),
        
            effect(i) {
                let x = Decimal.pow(1.1,i)
        
                return x
            },
            effDesc: x => formatMult(x),
        },{
            max: 1000,

            title: "Corrupted CFR",
            desc: `Increase collecting, forming, and restore speeds by <b class="green">+^0.01</b> per level.`,
        
            res: "cs",
            icon: ["Icons/CFR"],
                        
            cost: i => Decimal.pow(6,i.pow(1.15)).mul(100),
            bulk: i => i.div(100).max(1).log(6).root(1.15).floor().add(1),
        
            effect(i) {
                let x = i.div(100).add(1)
        
                return x
            },
            effDesc: x => formatPow(x),
        },{
            max: 1000,

            title: "Corrupted Souls",
            desc: `Increase soul dropped by <b class="green">+^0.01</b> per level.`,
        
            res: "cs",
            icon: ["Curr/Soul"],
                        
            cost: i => Decimal.pow(10,i).mul(100),
            bulk: i => i.div(100).max(1).log(10).floor().add(1),
        
            effect(i) {
                let x = i.div(100).add(1)
        
                return x
            },
            effDesc: x => formatPow(x),
        },
    ],
}

el.setup.synthesis = ()=>{
    let h = ""

    SYNTHESIS.slot.forEach((x,i)=>{
        h += `
        <div class="synthesis-slot">
            <div class="ss-req" id="ss-${i}-req">Locked: ${x[0]}</div><div id="ss-${i}-div" style="display: none;">
                <div class="ss-name">S${i+1}</div>
                <img class="ss-icon" src="images/Icons/Placeholder.png" id="ss-${i}-img">
                <div class="ss-mid">
                    <div class="progress-bar ss-progress" id="ss-${i}-progress"><div></div></div>
                    <div class="ss-boost" id="ss-${i}-boost">???</div>
                </div>
                <div class="ss-level" id="ss-${i}-level">0</div>
                <button class="ss-btn" id="ss-${i}-btn" onclick="insetSSlot(${i})">Begin</button>
            </div>
        </div>
        `
    })

    new Element("synthesis_table").setHTML(h)

    h = ""

    SYNTHESIS.type.forEach((x,i)=>{
        h += `
        <div class="synthesis-insert" id="st-${i}-div" onclick="ss_type_choosed = ${i};">
            <img class="ss-icon" src="images/${x.icon}.png">
            <div class="si-desc">
                ${x.name}<br>
                ${x.cost > 0 ? format(x.cost,0) + " Corruption Shards" : "[FREE]"}
            </div>
        </div>
        `
    })

    new Element("synthesis_types").setHTML(h)
}

el.update.synthesis = ()=>{
    if (mapID == 'synt' && player.world == 'ground') {
        SYNTHESIS.type.forEach((x,i)=>{
            let el = tmp.el[`st-${i}-div`], unl = x.unl()
            el.setDisplay(unl)
            if (unl) {
                el.changeStyle('background-color',ss_type_choosed == i ? player.synthesis.cs.gte(x.cost) ? "#080" : "#800" : "gray")
            }
        })

        SYNTHESIS.slot.forEach((x,i)=>{
            let id = `ss-${i}`
            let unl = x[1]()

            tmp.el[id+"-req"].setDisplay(!unl)
            tmp.el[id+"-div"].setDisplay(unl)

            if (unl) {
                let s = player.synthesis.slot[i], T = SYNTHESIS.type[s[0]], data = getSSData(i,true), active = s[0] > -1

                tmp.el[id+"-img"].setAttr("src",active ? "images/"+T.icon+'.png' : "images/Icons/Placeholder.png")
                tmp.el[id+"-progress"].setProperty('--percent',active ? data.percent+'%' : "0%")
                tmp.el[id+"-progress"].setHTML(`<div>${active ? formatTime(data.time) : "Empty"}</div>`)

                tmp.el[id+"-level"].setHTML(format(data.level,0))
                tmp.el[id+"-boost"].setHTML(active ? "+"+format(data.gain,0)+" "+T.name : "")

                tmp.el[id+"-btn"].setHTML(active ? "End" : "Begin")
            }
        })
    }
}

function calcSynthesis(dt) {
    var tspeed = tmp.synthesis.speed
    var t = []
    if (player.sn.tier.gte(14)) t.push(0,1)
    if (player.sn.tier.gte(16)) t.push(2)
    SYNTHESIS.slot.forEach((x,i)=>{
        var S = player.synthesis.slot[i]
        if (S[0] > -1) {
            S[1] = S[1].add(tspeed.mul(dt))

            if (t.includes(S[0])) {
                var T = SYNTHESIS.type[S[0]]
                var data = getSSData(i)

                T.amount = T.amount.add(data.gain.mul(dt/100))
            }
        }
    })
}

tmp_update.push(()=>{
    var ts = tmp.synthesis

    ts.speed = SYNTHESIS.speed
    ts.csMult = SYNTHESIS.csMult

    var b = [5,5,5]

    if (hasSolarUpgrade(7,22)) b[0]++

    var t1_scale = 30

    if (hasSolarUpgrade(7,21)) t1_scale += 10

    ts.scaled_t1 = t1_scale
    ts.base = b
})