const GRASS = {
    field: {
        normal: {
            unl: ()=>true,
            pos: [0,0],

            get grow_speed() { return Decimal.mul(upgradeEffect('grass',3),upgradeEffect("perks",2)) },
            get grow_amount() { return Decimal.add(hasUpgrade('crystal',5)?2:1,upgradeEffect("perks",4,0)) },

            get cap() { return Decimal.add(10,upgradeEffect('grass',2,0)).add(upgradeEffect("perks",3,0)) },

            get autocut_speed() { return Decimal.mul(upgradeEffect("auto",1,0),upgradeEffect("platinum",1)) },
            get autocut_value() { return Decimal.mul(upgradeEffect("auto",2),upgradeEffect("auto",6)) },

            res_base: 'grass',
            chances: ['platinum'],
            bonus: ['xp','tp'],
        },
        anti: {
            unl: ()=>tmp.anti_unl,
            pos: [20,0],
        
            get grow_speed() { return upgradeEffect('anti-grass',5) },
            get grow_amount() { return 1 },
        
            get cap() { return Decimal.add(10,upgradeEffect('anti-grass',3,0)).add(upgradeEffect("anonymity",5,0)) },
        
            get autocut_speed() { return upgradeEffect("anti-auto",1,0) },
            get autocut_value() { return upgradeEffect("anti-auto",2) },
        
            res_base: 'anti-grass',
            bonus: ['anti-xp'],
        },
    },

    resource: {
        grass: {
            get mult() {
                let x = E(5).mul(upgradeEffect('grass',1)).mul(getLevelBonus('xp')).mul(upgradeEffect("perks",1)).mul(getLevelBonus('tp'))
                .mul(upgradeEffect('prestige',1)).mul(upgradeEffect('crystal',1)).mul(upgradeEffect('platinum',3)).mul(getAccomplishmentBonus(0))
                .mul(getAccomplishmentBonus(6)).mul(upgradeEffect('platinum',8)).mul(tmp.charger_bonus[3]??1).mul(upgradeEffect('anti-grass',6))
                .mul(upgradeEffect('anonymity',3)).mul(upgradeEffect('oil',2)).mul(upgradeEffect('refinery','1a')).mul(upgradeEffect('momentum','1a'))
                if (player.grasshop.gte(1)) x = x.mul(getMilestoneEffect('grasshop',0));
                return x
            },
        },
        xp: {
            get mult() {
                let x = E(3).mul(upgradeEffect('grass',4)).mul(upgradeEffect("perks",'1a')).mul(getLevelBonus('tp'))
                .mul(upgradeEffect('prestige',2)).mul(upgradeEffect('crystal',2)).mul(upgradeEffect('platinum',2))
                .mul(upgradeEffect('perks',5)).mul(getAccomplishmentBonus(1)).mul(upgradeEffect('platinum',9))
                .mul(tmp.charger_bonus[1]??1).mul(upgradeEffect('anti-grass',7)).mul(upgradeEffect('anonymity',4))
                .mul(upgradeEffect('oil',3)).mul(upgradeEffect('refinery','1b')).mul(upgradeEffect('momentum','1b'))
                if (player.grasshop.gte(2)) x = x.mul(getMilestoneEffect('grasshop',1));
                return x
            },
        },
        tp: {
            get mult() {
                if (player.prestige.times === 0) return E(0);
                let x = E(1).mul(upgradeEffect('prestige',3)).mul(upgradeEffect('crystal',3)).mul(upgradeEffect('oil',5))
                .mul(upgradeEffect('perks',6)).mul(getAccomplishmentBonus(2)).mul(tmp.charger_bonus[2]??1)
                .mul(upgradeEffect('refinery','1c')).mul(upgradeEffect('momentum','1i'))
                if (player.grasshop.gte(3)) x = x.mul(getMilestoneEffect('grasshop',2));
                return x
            },
        },
        platinum: {
            get mult() {
                let x = E(3)
                if (player.grasshop.gte(4)) x = x.add(getMilestoneEffect('grasshop',3,0));
                x = x.mul(upgradeEffect('momentum','1e'))
                return x
            },
            get chance() {
                if (player.prestige.times === 0) return E(0);
                let x = E(.005).add(getAccomplishmentBonus(7))
                return x
            },
        },
        'anti-grass': {
            get mult() {
                let x = E(1).mul(upgradeEffect('anti-grass',1)).mul(getMilestoneEffect('grasshop',12)).mul(tmp.charger_bonus[6]??1)
                .mul(upgradeEffect('anonymity',2)).mul(upgradeEffect('oil',1))
                return x
            },
        },
        'anti-xp': {
            get mult() {
                let x = E(1).mul(upgradeEffect('anti-grass',4)).mul(getMilestoneEffect('grasshop',13)).mul(tmp.charger_bonus[7]??1)
                .mul(upgradeEffect('anonymity',6)).mul(upgradeEffect('oil',4))
                return x
            },
        },
    },
}

for (let k in GRASS.field) {
    let v = GRASS.field[k]
    v.resources = [v.res_base,...(v.chances??[])]
}

var grass_data = (()=>{
    let data = {}
    for (let [k,v] of Object.entries(GRASS.field)) {
        let data2 = {
            time: E(0),
            total: E(0),
        }
        for (let k2 of v.resources) data2[k2] = E(0)
        data[k] = data2
    }
    return data
})()

function calculatePassiveAutocut(id, name) {
    let f = GRASS.field[id], res = GRASS.resource[name]

    return Decimal.mul(res.mult, res?.chance ?? 1).mul(f.autocut_value).mul(f.autocut_speed).round()
}

function cutGrass(field) {
    let got_one = false

    for (let k in grass_data[field]) if (k !== 'time') {
        if (k === 'total') {
            let total = grass_data[field][k]
            got_one = total.gt(0)
            for (s of GRASS.field[field].bonus) gainCurrency(s,total.mul(GRASS.resource[s].mult.round()));
        }
        else gainCurrency(k,grass_data[field][k].mul(GRASS.resource[k].mult.round()));
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

                let w = E(0)

                if (f.chances) for (let i = 0; i < f.chances.length; i++) {
                    let cn = f.chances[i], c = GRASS.resource[cn].chance
                    let r = c > 0 ? Decimal.div(Math.random(),s.mod(Decimal.pow(c,-1)).max(1)).log(c).floor().add(s.mul(c).floor()) : E(0)
                    // console.log(r.format())
                    w = i == 0 ? r.min(s) : r.min(w)
                    d[cn] = d[cn].add(w)
                }

                d[f.res_base] = d[f.res_base].add(s.sub(w))
            }

            d.time = t.mod(1)
        }
    }
}

function setupGrassField() {
    for (let [k,v] of Object.entries(GRASS.field)) {
        createGridElement(k+"-grass-field",{
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