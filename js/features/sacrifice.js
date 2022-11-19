MAIN.sac = {
    dmGain() {
        let a = Math.max(1,player.astral-44)

        let x = player.stars.div(1e18).max(1).root(2).mul(Decimal.pow(1.1,a-1).mul(a))

        return x.floor()
    },
}

RESET.sac = {
    unl: _=> player.lowGH<=-24,

    req: _=>player.stars.gte(1e18),
    reqDesc: _=>`Reach ${format(1e18)} stars to unlock.`,

    resetDesc: `<span style="font-size:14px">Sacrifice forces a Galactic reset as well as resetting Astral, Stars, Fun, Fun Upgrades (excluding ones in The Funny Machine) and SFRGT to earn Dark Matter.<br>
    Gain more Dark Matters based on your stars (starting at 1 Qt) and astral (starting at 45).<br>First sacrifice unlocks new the funny machine upgrade.</span>`,
    resetGain: _=> `Gain <b>${tmp.dmGain.format(0)}</b> Dark Matters`,

    title: `Dark Matter Plant`,
    resetBtn: `Sacrifice`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                
            }

            alert("Coming Soon!")

            updateTemp()

            this.doReset()
        }
    },

    doReset(order="sac") {
        
    },
}

tmp_update.push(_=>{
    tmp.dmGain = MAIN.sac.dmGain()
})