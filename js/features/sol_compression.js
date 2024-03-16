const SOL_COMPRESSION = {
    get mult() {
        let x = E(1)

        .mul(getFormingBonus('basic',2)).mul(solarUpgEffect(9,2)).mul(solarUpgEffect(10,1))

        return x
    },
    gain(i) {
        if (i>=player.sol.compression_unl) return E(0)
        let x = (player.sol.compression[i+1] ?? E(0)).add(1).mul(tmp.sol.compression_mult)
        if (hasSolarUpgrade(7,23)) x = x.pow(2)
        return x
    },
    ctn: [
        {
            eff(c) {
                let x = c.div(10).add(1)

                return x.softcap(1e6,0.5,0,hasSolarUpgrade(7,8)).overflow(1e30,0.5)
            },
            effDesc: x => `<b class='green'>${formatMult(x)}</b> Offense`+x.softcapHTML(1e6,hasSolarUpgrade(7,8)),
        },{
            eff(c) {
                let x = c.div(10).add(1)

                return x.softcap(1e3,0.5,0,hasSolarUpgrade(7,8)).overflow(1e25,0.5)
            },
            effDesc: x => `<b class='green'>${formatMult(x)}</b> Collecting, Forming, & Soul`+x.softcapHTML(1e3,hasSolarUpgrade(7,8)),
            req: E(1000),
        },{
            eff(c) {
                let x = c.div(1000).add(1).root(3)

                return x.overflow(1e18,0.5)
            },
            effDesc: x => `<b class='green'>${formatMult(x)}</b> Mana`,
            req: E(1e8),
        },{
            eff(c) {
                let x = hasSolarUpgrade(7,19) ? expMult(c.div('1e55').add(1),0.5) : c.div(1e55).add(1).log10().add(1)

                return x
            },
            effDesc: x => `<b class='green'>${formatMult(x)}</b> Divine Souls`,
            req: E(1e55),
        },{
            eff(c) {
                let x = c.div(1e200).add(1).root(2)

                return x
            },
            effDesc: x => `<b class='green'>${formatMult(x)}</b> Solar Flares`,
            req: E(1e200),
        },{
            eff(c) {
                let x = expMult(c.div('1e600').add(1),0.25)

                return x
            },
            effDesc: x => `<b class='green'>${formatMult(x)}</b> Corruption Shards`,
            req: E('1e600'),
        },
    ],
}

function updateSolCompressionHTML() {
    const ts = tmp.sol, u = player.sol.compression_unl, cu = SOL_COMPRESSION.ctn[u]

    tmp.el.solc_req.setHTML(cu ? `Reach <b class='green'>${cu.req.format(0)}</b> T${u} to unlock next tier.` : "")

    for (let i in SOL_COMPRESSION.ctn) {
        i = parseInt(i)

        let el_id = 'solc_'+i

        tmp.el[el_id+"_div"].setDisplay(i<u)
        if (i<u) {
            const SC = SOL_COMPRESSION.ctn[i]

            tmp.el[el_id+"_mult"].setHTML(`(${formatMult(ts.compression_mult)})`)
            tmp.el[el_id+"_gain"].setHTML(`${player.sol.compression[i].format(0)} | ${player.sol.active_compression[i].format(0)} <span class="smallAmt">${player.sol.compression[i].formatGain(SOL_COMPRESSION.gain(i))}</span>`)
            tmp.el[el_id+"_eff"].setHTML(SC.effDesc(ts.comp_eff[i]))
        }
    }
}

function getSolCompressionEffect(i,def=1) { return tmp.sol.comp_eff[i] ?? def }

el.setup.sol_compression = () => {
    let h = ``

    for (let i in SOL_COMPRESSION.ctn) {
        h += `
        <div class="compression-div" id="solc_${i}_div">
            <h3>[Tier ${parseInt(i)+1}]</h3> <span class="smallAmt" id="solc_${i}_mult">(x1)</span>
            <div id="solc_${i}_gain">1.23e123,456,789 | 1.23e123,456,789 <span class="smallAmt">(+1.23e123,456,789/s)</span></div>
            <div id="solc_${i}_eff">???</div>
        </div>
        `
    }

    new Element('solc_table').setHTML(h)
}

function assignCompression(no_spend=false) {
    player.sol.active_compression = player.sol.active_compression.map((x,i)=>x.add(player.sol.compression[i]))
    if (!no_spend) player.sol.compression = player.sol.compression.map(x=>E(0))
}