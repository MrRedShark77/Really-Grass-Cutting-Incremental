const SOL_COMPRESSION = {
    get mult() {
        let x = E(1)

        return x
    },
    gain(i) {
        if (i>=player.sol.compression_unl) return E(0)
        return (player.sol.compression[i+1] ?? E(0)).add(1).mul(tmp.sol.compression_mult)
    },
    ctn: [
        {
            eff(c) {
                let x = c.div(10).add(1)

                return x.softcap(1e6,0.5,0)
            },
            effDesc: x => `<b class='green'>${formatMult(x)}</b> Offense`+x.softcapHTML(1e6),
        },{
            eff(c) {
                let x = c.div(10).add(1)

                return x.softcap(1e3,0.5,0)
            },
            effDesc: x => `<b class='green'>${formatMult(x)}</b> Collecting, Forming, & Soul`+x.softcapHTML(1e3),
            req: E(1000),
        },
    ],
}

function updateSolCompressionHTML() {
    const ts = tmp.sol

    for (let i in SOL_COMPRESSION.ctn) {
        i = parseInt(i)

        let el_id = 'solc_'+i

        tmp.el[el_id+"_div"].setDisplay(i<player.sol.compression_unl)
        if (i<player.sol.compression_unl) {
            const SC = SOL_COMPRESSION.ctn[i]

            tmp.el[el_id+"_mult"].setHTML(`(${formatMult(ts.compression_mult)})`)
            tmp.el[el_id+"_gain"].setHTML(`${player.sol.compression[i].format(0)} | ${player.sol.active_compression[i].format(0)} <span class="smallAmt">${player.sol.compression[i].formatGain(SOL_COMPRESSION.gain(i))}</span>`)
            tmp.el[el_id+"_eff"].setHTML(SC.effDesc(ts.comp_eff[i]))
        }
    }
}

function getSolCompressionEffect(i,def=1) { return tmp.sol.comp_eff[i] ?? def }

el.setup.sol_compression = () => {
    let h = ""

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