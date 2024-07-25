RESETS.grasshop = {
    pos: [0,10],
    unl: () => player.crystal.times>0,

    req: () => player.level.gte(201),
    get req_desc() { return `Reach Level 201` },
    lock: () => player.level.lt(GH.require),

    name: "Grasshop",
    get reset_desc() {
        return `Resets everything crystallize does as well as crystals and crystal upgrades.<br><br>Reach Level ${format(GH.require,0)} to grasshop.`
    },
    color: ['#ccc','#aaa'],

    icon: "Icons/Grasshop2",
    get gain_desc() { return "+"+format(GH.bulk,0) },

    success() {
        player.grasshop = player.grasshop.add(GH.bulk)

        ACCOM.check('prestige')
        ACCOM.check('crystal')
    },
    doReset() {
        player.crystal.points = E(0)

        if (player.grasshop.lt(8)) {
            player.perks = E(0)
            player.best_perks = E(0)
            resetUpgrades('perks')
        }

        resetUpgrades('crystal')

        RESETS.crystal.doReset()
    },
}

const GH = {
    get require() { return player.grasshop.mul(10).add(201) },
    get bulk() { return player.level.sub(191).div(10).floor().sub(player.grasshop).max(1).min(1) },
}

MILESTONES.grasshop = {
    unl: () => player.crystal.times>0,
    pos: [2,10],
    color: ['#ccc','#0c0'],

    name: "Grasshop",
    get amount() { return player.grasshop },
    get amount_desc() { return `You have grasshopped <b class="green">${format(this.amount,0)}</b> times.` },

    ctn: [
        {
            r: 1,
            get desc() { return `Unlocks <b class="green">Accomplishments</b>.<br>
                Unlocks more automation upgrades.<br>
                Increases grass value by <b class="green">+300%</b> per grasshop.`
            },
            effect: a => a.mul(3).add(1),
        },{
            r: 2,
            get desc() { return `Increases experience gained by <b class="green">+100%</b> per grasshop.` },
            effect: a => a.mul(1).add(1),
        },{
            r: 3,
            get desc() { return `Increases tier progress gained by <b class="green">+100%</b> per grasshop.` },
            effect: a => a.mul(1).add(1),
        },{
            r: 4,
            get desc() { return `Increases platinum gained by <b class="green">+1</b> per grasshop, starting at 4.` },
            effect: a => a.sub(3).max(0),
        },{
            r: 5,
            get desc() { return `Increases prestige's level scaling by <b class="green">+1%</b> per grasshop, starting at 5 and ending at 9. (Base is 5%)` },
            effect: a => a.sub(4).max(0).min(5).mul(.01),
        },{
            r: 6,
            get desc() { return `Increases crystal's tier scaling by <b class="green">+1%</b> per grasshop, starting at 6 and ending at 15. (Base is 10%)` },
            effect: a => a.sub(5).max(0).min(10).mul(.01),
        },{
            r: 7,
            get desc() { return `Increases perks gained by <b class="green">+1</b>.` },
        },{
            r: 8,
            get desc() { return `Permanently unlocks <b class="green">Steelie</b> (NYI).
                <br>Grasshop does not reset perks.`
            },
        },
    ],
}