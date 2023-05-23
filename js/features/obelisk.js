RESET.astralPrestige = {
    unl: ()=> player.lowGH<=-48,

    req: ()=>true,
    reqDesc: ()=>``,

    resetDesc: `
    To do an astral prestige, you must reach Astral 100.<br><br>
    Doing an astral prestige will reset your astral back to 0 but will significantly increase the power of the astral bonuses.<br>
    Each astral prestige done will increase the base SP requirement as well as the requirement scaling.<br><br>
    <span id='nextAPBonus' class='green'></span>
    `,
    resetGain: ()=> `Astral: ${format(player.astral,0)} / 100`,

    title: `Astral Prestige`,
    resetBtn: `Do Astral Prestige`,

    reset(force=false) {
        if (player.astral>=100||force) {
            if (!force) {
                player.astralPrestige++
            }

            player.astral = 0
            player.sp = E(0)

            updateTemp()
        } else if (player.astralPrestige>0) {
            player.astralPrestige--

            player.astral = 0
            player.sp = E(0)

            updateTemp()
        }
    },
}

const AP_BONUS = ['Dark Matter','Ring']
const AP_BONUS_BASE = [100,25]

const LUNAR_OB = [
    // 0 - multiplier, 1 - exponent

    ['Grass Value','Curr/Grass',10,1.1,0.001,1],
    ['XP','Icons/XP',10,1.1,0.001,1],
    [`TP`,'Icons/TP',10,1.1,0.001,1],
    [`Cosmic`,'Icons/XP2',20,10,1,0],
    [`Charge`,'Curr/Charge',100,1.1,0.001,1],
    [`Rocket Fuel`,'Curr/RocketFuel',1000,100,0.01,0],
    [`Planetarium`,'Curr/Planetoid',20,10,1,0],
]
const LUNAR_OB_MODE = ['x','^']

tmp_update.push(()=>{
    let x = Decimal.pow(1.5,Math.log10(player.moonstone)).div(100).mul(starTreeEff('ring',32))

    tmp.LPgain = x
    tmp.lunar_max_active = 1+getPTEffect(4,0)

    for (let i = 0; i < LUNAR_OB.length; i++) {
        let l = LUNAR_OB[i]

        tmp.lunar_next[i] = l[5]==0?Decimal.mul(l[3],player.lunar.level[i]).add(l[2]):Decimal.pow(l[3],player.lunar.level[i]).mul(l[2])
        tmp.lunar_eff[i] = (l[5]==1 ? softcap(player.lunar.level[i],200,0.5,0) : player.lunar.level[i]) * l[4] + 1
    }
})

function getLPLevel(i, lp = player.lunar.lp[i]) {
    let l = LUNAR_OB[i], b = l[3], s = l[2], x = 0

    if (l[5]==0) {
        let d = lp.mul(8*b).add((2*s-b)**2)

        x = d.sqrt().sub(2*s-b).div(2*b)
    } else if (l[5]==1) {
        x = lp.mul((b-1)/s).add(1).log(b)
    }

    return x.floor().toNumber()
}

function getLEffect(i) { return tmp.lunar_eff[i]||1 }

function chooseLA(i) {
    if (player.lunar.active.includes(i)) player.lunar.active.splice(player.lunar.active.indexOf(i),1)
    else {
        if (player.lunar.active.length >= tmp.lunar_max_active) player.lunar.active.splice(randint(0,player.lunar.active.length-1),1)
        player.lunar.active.push(i)
    }
}

el.setup.obelisk = () => {
    let el = new Element('lop_table')
    let h = ``

    for (let i in LUNAR_OB) {
        let l = LUNAR_OB[i]

        h += `
        <div>
            <div class="lop_btn" id='lop${i}_btn' onclick='chooseLA(${i})'>
                <img src="images/${l[1]}.png">
                <div id='lop${i}_lvl'>
                    The J
                </div>
            </div><div class="lop_progress" id="lop${i}_amt">
                0 / 0
            </div>
        </div>
        `
    }

    el.setHTML(h)
}

el.update.obelisk = () => {
    if (mapID2 == 'ap') {
        tmp.el.nextAPBonus.setHTML(`You'll unlock the ${AP_BONUS[player.astralPrestige]||'???'} astral bonus on next astral prestige.`)
        tmp.el.reset_btn_astralPrestige.setHTML(player.astral>=100?'Do Astral Prestige':'Undo Astral Prestige')

        let unl = player.grassjump>=5

        tmp.el.lunar_obelisk_div.setDisplay(unl)

        if (unl) {
            tmp.el.lp_gain.setHTML(tmp.LPgain.format()+"/s")
            tmp.el.lp_active.setHTML(player.lunar.active.length+" / "+tmp.lunar_max_active)

            for (let i = 0; i < LUNAR_OB.length; i++) {
                let id = 'lop'+i+'_', l = LUNAR_OB[i], lvl = player.lunar.level[i]

                tmp.el[id+'lvl'].setHTML(`
                <div class='cyan'>${l[0]}</div>
                <div class='yellow'>Level ${format(lvl,0)}</div>
                <div class='green'>${LUNAR_OB_MODE[l[5]]+format(tmp.lunar_eff[i],3)} <i style='font-size: 12px; color: grey'>(+${format(l[4],3)})</i></div>
                `)

                let nl = tmp.lunar_next[i]
                let p = l[5]==0?Decimal.pow(lvl,2).sub(lvl).mul(l[3]/2).add(l[2]*lvl):Decimal.pow(l[3],lvl).sub(1).mul(l[2]/(l[3]-1))

                tmp.el[id+'amt'].setHTML(`${player.lunar.lp[i].sub(p).max(0).min(nl).format(0)} / ${nl.format(0)}`)
                tmp.el[id+'btn'].changeStyle('border-color',player.lunar.active.includes(i)?'lime':'white')
            }
        }
    }
}