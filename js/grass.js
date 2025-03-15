const GRASS = {
    field: {
        normal: {
            unl: ()=>true,
            pos: [0,0],

            get grow_speed() { return Decimal.mul(upgradeEffect('grass',3),upgradeEffect("perks",2)) },
            get grow_amount() { return Decimal.add(hasUpgrade('crystal',5)?2:1,upgradeEffect("perks",4,0)) },

            get cap() { return Decimal.add(10,upgradeEffect('grass',2,0)).add(upgradeEffect("perks",3,0)).add(upgradeEffect("star","P1",0)) },

            get autocut_speed() { return Decimal.add(upgradeEffect("auto",1,0),upgradeEffect('star',"P3",0)).mul(upgradeEffect("platinum",1)) },
            get autocut_value() { return Decimal.add(1,upgradeEffect('star',"P2",0)).mul(upgradeEffect("auto",2)).mul(upgradeEffect("auto",6)).mul(upgradeEffect("moonstone",10)) },

            res_base: 'grass',
            chances: ['platinum','moonstone'],
            bonus: ['xp','tp','sp'],
        },
        anti: {
            unl: ()=>tmp.anti_unl,
            pos: [20,0],
        
            get grow_speed() { return Decimal.mul(upgradeEffect('anti-grass',5),player.grassskip.gte(3)?5:1) },
            get grow_amount() { return 1 },
        
            get cap() { return Decimal.add(10,upgradeEffect('anti-grass',3,0)).add(upgradeEffect("anonymity",5,0)).add(upgradeEffect("star","P1",0)) },
        
            get autocut_speed() { return Decimal.mul(upgradeEffect("anti-auto",1,0),player.grassskip.gte(5)?3:1) },
            get autocut_value() { return Decimal.mul(upgradeEffect("anti-auto",2),player.grassskip.gte(7)?2:1) },
        
            res_base: 'anti-grass',
            bonus: ['anti-xp'],
        },
    },

    resource: {
        grass: {
            get mult() {
                let x = E(5).mul(upgradeEffect('grass',1)).mul(getLevelBonus('xp')).mul(upgradeEffect("perks",1)).mul(getLevelBonus('tp')).mul(ASTRAL.bonus('grass'))
                .mul(upgradeEffect('prestige',1)).mul(upgradeEffect('crystal',1)).mul(upgradeEffect('platinum',3)).mul(getAccomplishmentBonus(0))
                .mul(getAccomplishmentBonus(6)).mul(upgradeEffect('platinum',8)).mul(tmp.charger_bonus[3]??1).mul(upgradeEffect('anti-grass',6))
                .mul(upgradeEffect('anonymity',3)).mul(upgradeEffect('oil',2)).mul(upgradeEffect('refinery','1a')).mul(upgradeEffect('refinery','2a')).mul(upgradeEffect('momentum','1a'))
                .mul(upgradeEffect('star','SC1b')).mul(upgradeEffect('star','SC2b')).mul(upgradeEffect('moonstone',1)).mul(upgradeEffect('momentum','2c')).mul(upgradeEffect('momentum','3a'))
                if (player.grasshop.gte(1)) x = x.mul(getMilestoneEffect('grasshop',0));
                return x
            },
        },
        xp: {
            get mult() {
                let x = E(3).mul(upgradeEffect('grass',4)).mul(upgradeEffect("perks",'1a')).mul(getLevelBonus('tp')).mul(ASTRAL.bonus('xp'))
                .mul(upgradeEffect('prestige',2)).mul(upgradeEffect('crystal',2)).mul(upgradeEffect('platinum',2))
                .mul(upgradeEffect('perks',5)).mul(getAccomplishmentBonus(1)).mul(upgradeEffect('platinum',9))
                .mul(tmp.charger_bonus[1]??1).mul(upgradeEffect('anti-grass',7)).mul(upgradeEffect('anonymity',4))
                .mul(upgradeEffect('oil',3)).mul(upgradeEffect('refinery','1b')).mul(upgradeEffect('refinery','2b')).mul(upgradeEffect('refinery','3b')).mul(upgradeEffect('momentum','1b'))
                .mul(totalUpgradesEffectFromRange('star',[1,7],x=>`SC${x}c`,'mult')).mul(upgradeEffect('moonstone',4)).mul(upgradeEffect('moonstone',16)).mul(upgradeEffect('dark-matter',1))
                .mul(upgradeEffect('momentum','2d')).mul(upgradeEffect('momentum','3b')).mul(upgradeEffect('star-ultimate',2))
                if (player.grasshop.gte(2)) x = x.mul(getMilestoneEffect('grasshop',1));
                return x
            },
        },
        tp: {
            get mult() {
                if (player.prestige.times === 0) return E(0);
                let x = E(1).mul(upgradeEffect('prestige',3)).mul(upgradeEffect('crystal',3)).mul(upgradeEffect('oil',5)).mul(ASTRAL.bonus('tp'))
                .mul(upgradeEffect('perks',6)).mul(getAccomplishmentBonus(2)).mul(tmp.charger_bonus[2]??1)
                .mul(upgradeEffect('refinery','1c')).mul(upgradeEffect('refinery','2c')).mul(upgradeEffect('refinery','3c')).mul(upgradeEffect('momentum','1i'))
                .mul(totalUpgradesEffectFromRange('star',[1,5],x=>`SC${x}d`,'mult')).mul(upgradeEffect('moonstone',5)).mul(upgradeEffect('dark-matter',2))
                if (player.grasshop.gte(3)) x = x.mul(getMilestoneEffect('grasshop',2));
                return x
            },
        },
        sp: {
            get mult() {
                if (player.galactic.times === 0) return E(0);
                let x = E(1).add(getMilestoneEffect('grass-skip',1,0))
                x = x.mul(totalUpgradesEffectFromRange('star',[1,6],x=>'PS'+x,'mult')).mul(upgradeEffect('sfrgt',2)).mul(player.agh.lte(1)?10:1).mul(player.agh.lte(-6)?getMilestoneEffect('agh',12):1)
                .mul(upgradeEffect('dark-matter',3)).mul(upgradeEffect('unnatural-grass',5)).mul(upgradeEffect('normality',2)).mul(upgradeEffect('star-ultimate',3))
                return x
            },
        },
        platinum: {
            get mult() {
                let x = E(1).add(ASTRAL.bonus('platinum',0)).add(player.grassskip.gte(4)?10:0)
                if (player.grasshop.gte(4)) x = x.add(getMilestoneEffect('grasshop',3,0));
                x = x.mul(upgradeEffect('momentum','1e')).mul(upgradeEffect('moonstone',7)).mul(upgradeEffect("moonstone",11)).mul(upgradeEffect('moonstone',17)).mul(upgradeEffect('momentum','2a'))
                return x
            },
            get chance() {
                if (player.prestige.times === 0) return E(0);
                let x = E(.005).add(getAccomplishmentBonus(7))
                return x
            },
        },
        moonstone: {
            get mult() {
                let x = E(3).add(player.grassskip.gte(6)?10:0).add(ASTRAL.bonus('moonstone',0))
                if (player.grassskip.gte(20)) x = x.add(getMilestoneEffect('grass-skip',10,0));
                if (player.agh.lte(-9)) x = x.mul(2);
                return x
            },
            get chance() {
                if (player.galactic.times === 0) return E(0);
                let x = E(.03).add(getMilestoneEffect('agh',1,0))
                return x
            },
        },
        'anti-grass': {
            get mult() {
                let x = E(1).mul(upgradeEffect('anti-grass',1)).mul(getMilestoneEffect('grasshop',12)).mul(tmp.charger_bonus[6]??1)
                .mul(upgradeEffect('anonymity',2)).mul(upgradeEffect('oil',1))
                if (player.agh.lte(-30)) x = x.mul(player.anti.level.pow_base(1.1));
                return x
            },
        },
        'anti-xp': {
            get mult() {
                let x = E(1).mul(upgradeEffect('anti-grass',4)).mul(getMilestoneEffect('grasshop',13)).mul(tmp.charger_bonus[7]??1)
                .mul(upgradeEffect('anonymity',6)).mul(upgradeEffect('oil',4)).mul(totalUpgradesEffectFromRange('star',[1,7],x=>`SC${x}e`,'mult')).mul(upgradeEffect('moonstone',6)).mul(upgradeEffect("moonstone",15))
                .mul(upgradeEffect('momentum','2d')).mul(upgradeEffect('star-ultimate',2))
                if (player.agh.lte(22)) x = x.mul(player.tier.sub(1).max(0).pow_base(1.05));
                if (player.agh.lte(-3)) {
                    let exp = E(.5)
                    if (player.agh.lte(-9)) exp = exp.mul(getMilestoneEffect('agh',13));

                    x = x.mul(tmp.aghgs3eff = expPow(tmp.mults.xp ?? 1,exp))
                }
                return x
            },
        },
    },
}

var grass_data;

function calculatePassiveAutocut(id, name) {
    let f = GRASS.field[id], res = GRASS.resource[name], chance = E(1)

    if (!f.unl()) return E(0);

    if ('chances' in f && f.chances.includes(name)) {
        let i = 0;
        while (true) {
            chance = chance.mul(GRASS.resource[f.chances[i]]?.chance ?? 1);
            if (f.chances[i] === name) break;
            i++;
        }
    }

    return Decimal.mul(tmp.mults[id] ?? res.mult, chance).mul(f.autocut_value).mul(f.autocut_speed).mul(tmp.compaction).round()
}

function cutGrass(field) {
    let got_one = false

    for (let k in grass_data[field]) if (k !== 'time') {
        if (k === 'total') {
            let total = grass_data[field][k]
            got_one = total.gt(0)
            for (s of GRASS.field[field].bonus) gainCurrency(s,total.mul(GRASS.resource[s].mult.mul(tmp.compaction).round()));
        }
        else gainCurrency(k,grass_data[field][k].mul(GRASS.resource[k].mult.mul(tmp.compaction).round()));
        grass_data[field][k] = E(0);
    }

    if (got_one) updateHTMLSecond()
}

function calcGrass(dt) {
    for (let [k,v] of Object.entries(GRASS.field)) {
        if (v.unl()) {
            let d = grass_data[k], f = GRASS.field[k], cap = f.cap

            if (d.total.gte(cap)) {
                d.time = E(0)
                continue
            }

            let t = Decimal.mul(dt, f.grow_speed).add(d.time)

            if (t.gte(1)) {
                let s = t.floor().mul(f.grow_amount).add(d.total).min(cap).sub(d.total)

                d.total = d.total.add(s)

                if (f.chances) {
                    let w = E(s)

                    for (let i = 0; i < f.chances.length; i++) {
                        let cn = f.chances[i], c = GRASS.resource[cn].chance
                        let r = c > 0 ? Decimal.div(Math.random(),w.mod(Decimal.pow(c,-1)).max(1)).log(c).floor().add(w.mul(c).floor()) : E(0)
                        // console.log(r.format())
                        w = r.min(w)
                        d[cn] = d[cn].add(w)
                    }
                }

                d[f.res_base] = d[f.res_base].add(s)
            }

            d.time = t.mod(1)
        }
    }
}

function setupGrassField() {
    for (let [k,v] of Object.entries(GRASS.field)) {
        createGridElement(k+"-grass-field",{
            unl: v.unl,
            pos: v.pos,
            get html() {
                let h = ""

                for (let k2 of v.resources) {
                    let curr = CURRENCIES[k2]
                    h += `<div id="${k}-grass-resource-${k2}">${curr.name} <img src='images/${curr.icon}.png' class='field-amount'> x<span id="${k}-grass-resource-${k2}-amt">0</span></div>`
                }

                return `
                <button class='grid-fill-btn' onclick='cutGrass("${k}")'>
                    Cut <span id="${k}-grass-cut"></span>
                    <div>${h}</div>
                </button>
                `
            },
        })
    }
}

function updateGrass(field) {
    let v = GRASS.field[field]

    if (!v.unl()) return;

    let d = grass_data[field]

    el(field+"-grass-cut").innerHTML = `(${format(d.total,0) + "/" + format(v.cap,0)}) <span style="color:gray">(+${Decimal.mul(v.grow_amount,v.grow_speed).format()}/s)</span>`

    for (let k2 of v.resources) {
        let id = `${field}-grass-resource-${k2}`
        let unl = d[k2].gt(0)
        el(id).style.display = el_display(unl)
        if (unl) el(id+"-amt").innerHTML = format(d[k2],0)
    }
}

function resetGrass(field) {
    for (let k in grass_data[field]) grass_data[field][k] = E(0);
}