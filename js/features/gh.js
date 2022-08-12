RESET.gh = {
    unl: _=>player.cTimes>0,
    req: _=>player.level>=300,
    reqDesc: _=>`Reach Level 300.`,

    resetDesc: `Grasshopping resets everything crystalize does as well as crystals, crystal upgrades, challenges.`,
    resetGain: _=> `Reach Level <b>${format(300,0)}</b> to Grasshop`,

    title: `Grasshop`,
    resetBtn: `Coming Soon...`,

    reset(force=false) {
        if (this.req()||force) {
            if (!force) {
                
            }

            this.doReset()
        }
    },

    doReset(order="gh") {
        
    },
}