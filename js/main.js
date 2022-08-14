var player = {}, date = Date.now(), diff = 0;

function loop() {
    diff = Date.now() - date
    updateTemp()
    updateHTML()
    calc(diff/1000);
    date = Date.now();
}

const MAIN = {
    grassGain() {
        let x = Decimal.mul(5,upgEffect('grass',0)).mul(tmp.tier.mult)

        x = x.mul(upgEffect('perk',0))
        x = x.mul(upgEffect('pp',0))
        x = x.mul(upgEffect('crystal',0))
        x = x.mul(upgEffect('plat',2))

        x = x.mul(chalEff(1))

        if (player.grasshop >= 1) {
            x = x.mul(5).mul(getGHEffect(0))
        }

        x = x.pow(chalEff(3))
        if (inChal(3)) x = x.root(2)

        return x
    },
    grassCap() {
        let x = 10+upgEffect('grass',1,0)+upgEffect('perk',1,0)

        return x
    },
    grassSpwan() {
        let x = 2.5
        x /= upgEffect('grass',2,1)
        x /= upgEffect('perk',2,1)
        return x
    },
    xpGain() {
        let x = Decimal.mul(3,upgEffect('grass',3)).mul(tmp.tier.mult)

        x = x.mul(upgEffect('perk',3))
        x = x.mul(upgEffect('pp',1))
        x = x.mul(upgEffect('crystal',1))
        x = x.mul(upgEffect('plat',1))

        x = x.mul(chalEff(0))

        if (player.grasshop >= 2) {
            x = x.mul(5).mul(getGHEffect(1))
        }

        if (inChal(3)) x = x.root(2)

        return x
    },
    tpGain() {
        if (inChal(2)) return E(0)

        let x = upgEffect('pp',2)

        x = x.mul(upgEffect('crystal',2))
        x = x.mul(upgEffect('perk',6))

        x = x.mul(chalEff(2))

        if (player.grasshop >= 3) {
            x = x.mul(5).mul(getGHEffect(2))
        }

        return x
    },
    rangeCut: _=>50+upgEffect('grass',4,0)+upgEffect('perk',4,0),
    autoCut: _=>5-upgEffect('auto',0,0)-upgEffect('plat',0,0),
    level: {
        req(i) {
            i = E(i).scale(200,2,0)

            if (inChal(0)) i = i.mul(3)
            
            let x = Decimal.pow(2.7,i.pow(0.75)).mul(50)

            return x.ceil()
        },
        bulk(i) {
            let x = i.div(50)
            if (x.lt(1)) return 0
            x = x.log(2.7).root(0.75)

            if (inChal(0)) x = x.div(3)

            return Math.floor(x.scale(200,2,0,true).toNumber()+1)
        },
        cur(i) {
            return i > 0 ? this.req(i-1) : E(0) 
        },
        perk() {
            let x = player.level

            return x
        },
    },
    tier: {
        req(i) {
            let x = Decimal.pow(3,i**1.2).mul(100)

            return x.ceil()
        },
        bulk(i) {
            let x = i.div(100)
            if (x.lt(1)) return 0
            x = x.log(3).root(1.2)

            return Math.floor(x.toNumber()+1)
        },
        cur(i) {
            return i > 0 ? this.req(i-1) : E(0) 
        },
        mult(i) {
            let base = 2 + upgEffect('crystal',5,0)
            let x = Decimal.pow(base,i)

            return x
        },
    },
    checkCutting() {
        if (player.xp.gte(tmp.level.next)) {
            player.level = Math.max(player.level, tmp.level.bulk)
        }
        if (player.tp.gte(tmp.tier.next)) {
            player.tier = Math.max(player.tier, tmp.tier.bulk)
        }
    }, 
}

el.update.main = _=>{

    tmp.el.grassAmt.setHTML(player.grass.format(0))
    tmp.el.grassGain.setHTML(tmp.autoCutUnlocked ? formatGain(player.grass,tmp.grassGain.div(tmp.autocut).mul(tmp.autocutBonus).mul(tmp.autocutAmt)) : "")

    let tier_unl = player.pTimes > 0

    tmp.el.level.setHTML(`Level <b class="cyan">${format(player.level,0)}</b> (${formatPercent(tmp.level.percent)})`)

    tmp.el.tier.setDisplay(tier_unl)
    if (tier_unl) tmp.el.tier.setHTML(`Tier <b class="yellow">${format(player.tier,0)}</b> (${formatPercent(tmp.tier.percent)})`)

    if (mapID == 'g') {
        tmp.el.level_amt.setTxt(format(player.level,0))
        tmp.el.level_progress.setTxt(tmp.level.progress.format(0)+" / "+tmp.level.next.sub(tmp.level.cur).format(0)+" XP")
        tmp.el.level_bar.changeStyle("width",tmp.level.percent*100+"%")
        tmp.el.level_cut.setTxt("+"+tmp.XPGain.format(0)+" XP/cut")

        tmp.el.tier_div.setDisplay(tier_unl)

        if (tier_unl) {
            tmp.el.tier_amt.setTxt(format(player.tier,0))
            tmp.el.tier_progress.setTxt(tmp.tier.progress.format(0)+" / "+tmp.tier.next.sub(tmp.tier.cur).format(0)+" TP")
            tmp.el.tier_bar.changeStyle("width",tmp.tier.percent*100+"%")
            tmp.el.tier_cut.setTxt("+"+tmp.TPGain.format(0)+" TP/cut")
            tmp.el.tier_mult.setTxt(formatMult(tmp.tier.mult,0)+" → "+formatMult(MAIN.tier.mult(player.tier+1),0)+" multiplier")
        }
    }
}

tmp_update.push(_=>{
    tmp.grassCap = MAIN.grassCap()
    tmp.grassSpawn = MAIN.grassSpwan()
    tmp.rangeCut = MAIN.rangeCut()
    tmp.autocut = MAIN.autoCut()

    tmp.autoCutUnlocked = hasUpgrade('auto',0)

    tmp.autocutBonus = upgEffect('auto',1)
    tmp.autocutAmt = 1+upgEffect('auto',2,0)
    tmp.spawnAmt = 1+upgEffect('perk',5,0)+upgEffect('crystal',4,0)

    tmp.grassGain = MAIN.grassGain()
    tmp.XPGain = MAIN.xpGain()
    tmp.TPGain = MAIN.tpGain()

    tmp.perks = MAIN.level.perk()
    tmp.perkUnspent = Math.max(player.maxPerk-player.spentPerk,0)

    let lvl = player.level

    tmp.level.next = MAIN.level.req(lvl)
    tmp.level.bulk = MAIN.level.bulk(player.xp)
    tmp.level.cur = MAIN.level.cur(lvl)
    tmp.level.progress = player.xp.sub(tmp.level.cur).max(0).min(tmp.level.next)
    tmp.level.percent = tmp.level.progress.div(tmp.level.next.sub(tmp.level.cur)).max(0).min(1).toNumber()

    let t = player.tier

    tmp.tier.next = MAIN.tier.req(t)
    tmp.tier.bulk = MAIN.tier.bulk(player.tp)
    tmp.tier.cur = MAIN.tier.cur(t)
    tmp.tier.progress = player.tp.sub(tmp.tier.cur).max(0).min(tmp.tier.next)
    tmp.tier.percent = tmp.tier.progress.div(tmp.tier.next.sub(tmp.tier.cur)).max(0).min(1).toNumber()
    tmp.tier.mult = MAIN.tier.mult(t)

    tmp.platGain = 1
    if (player.grasshop >= 4) tmp.platGain += getGHEffect(3)

    tmp.platChance = 0.005
    if (player.grasshop >= 6) tmp.platChance *= 2
})