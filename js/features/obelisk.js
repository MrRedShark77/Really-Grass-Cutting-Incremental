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

el.update.obelisk = () => {
    if (mapID2 == 'ap') {
        tmp.el.nextAPBonus.setHTML(`You'll unlock the ${AP_BONUS[player.astralPrestige]||'???'} astral bonus on next astral prestige.`)
        tmp.el.reset_btn_astralPrestige.setHTML(player.astral>=100?'Do Astral Prestige':'Undo Astral Prestige')
    }
}