const ST_NAMES = [
	null, [
		["","U","D","T","Qa","Qt","Sx","Sp","Oc","No"],
		["","Dc","Vg","Tg","Qag","Qtg","Sxg","Spg","Ocg","Nog"],
		["","Ce","De","Te","Qae","Qte","Sxe","Spe","Oce","Noe"],
	],[
		["","Mi","Mc","Na","Pc","Fm","At","Zp","Yc","Xn"],
		["","Me","Du","Tr","Te","Pe","He","Hp","Ot","En"],
		["","c","Ic","TCn","TeC","PCn","HCn","HpC","OCn","ECn"],
		["","Hc","DHe","THt","TeH","PHc","HHe","HpH","OHt","EHc"]
	]
]

const FORMATS = {
    omega: {
        config: {
            greek: "βζλψΣΘΨω",
            infinity: "Ω",
        },
        format(value) {
            const step = Decimal.floor(value.div(1000));
            const omegaAmount = Decimal.floor(step.div(this.config.greek.length));
            let lastLetter = this.config.greek[step.toNumber() % this.config.greek.length] + toSubscript(value.toNumber() % 1000);
            const beyondGreekArrayBounds = this.config.greek[step.toNumber() % this.config.greek.length] === undefined;
            if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
            lastLetter = "ω";
            }
            const omegaOrder = Decimal.log(value, 8000);
            if (omegaAmount.equals(0)) {
            return lastLetter;
            } else if (omegaAmount.gt(0) && omegaAmount.lte(3)) {
            const omegas = [];
            for (let i = 0; i < omegaAmount.toNumber(); i++) {
                omegas.push("ω");
            }
            return `${omegas.join("^")}^${lastLetter}`;
            } else if (omegaAmount.gt(3) && omegaAmount.lt(10)) {
            return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
            } else if (omegaOrder < 3) {
            return `ω(${this.format(omegaAmount)})^${lastLetter}`;
            } else if (omegaOrder < 6) {
            return `ω(${this.format(omegaAmount)})`;
            }
            const val = Decimal.pow(8000, omegaOrder % 1);
            const orderStr = omegaOrder < 100
            ? Math.floor(omegaOrder).toFixed(0)
            : this.format(Decimal.floor(omegaOrder));
            return `ω[${orderStr}](${this.format(val)})`;
        },
    },
    omega_short: {
        config: {
            greek: "βζλψΣΘΨω",
            infinity: "Ω",
        },
        format(value) {
            const step = Decimal.floor(value.div(1000));
            const omegaAmount = Decimal.floor(step.div(this.config.greek.length));
            let lastLetter = this.config.greek[step.toNumber() % this.config.greek.length] + toSubscript(value.toNumber() % 1000);
            const beyondGreekArrayBounds = this.config.greek[step.toNumber() % this.config.greek.length] === undefined;
            if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
            lastLetter = "ω";
            }
            const omegaOrder = Decimal.log(value, 8000);
            if (omegaAmount.equals(0)) {
            return lastLetter;
            } else if (omegaAmount.gt(0) && omegaAmount.lte(2)) {
            const omegas = [];
            for (let i = 0; i < omegaAmount.toNumber(); i++) {
                omegas.push("ω");
            }
            return `${omegas.join("^")}^${lastLetter}`;
            } else if (omegaAmount.gt(2) && omegaAmount.lt(10)) {
            return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
            }
            const val = Decimal.pow(8000, omegaOrder % 1);
            const orderStr = omegaOrder < 100
            ? Math.floor(omegaOrder).toFixed(0)
            : this.format(Decimal.floor(omegaOrder));
            return `ω[${orderStr}](${this.format(val)})`;
        }
    },
    elemental: {
      config: {
        element_lists: [["H"],
        ["He", "Li", "Be", "B", "C", "N", "O", "F"],
        ["Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl"],
        [
          "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe",
          "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br"
        ],
        [
          "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru",
          "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I"
        ],
        [
          "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm",
          "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm",
          "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir",
          "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At"
        ],
        [
          "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np",
          "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md",
          "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt",
          "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts"
        ],
        ["Og"]],
      },
      getOffset(group) {
        if (group == 1) return 1
        let n = Math.floor(group / 2)
        let r = 2 * n * (n + 1) * (2 * n + 1) / 3 - 2
        if (group % 2 == 1) r += 2 * Math.pow(n + 1, 2)
        return r
      },
      getAbbreviation(group, progress) {
        const length = this.abbreviationLength(group)
        const elemRel = Math.floor(length * progress)
  
        const elem = elemRel + this.getOffset(group)
  
        return elem > 118 ? this.beyondOg(elem) : this.config.element_lists[group - 1][elemRel]
      },
      beyondOg(x) {
        let log = Math.floor(Math.log10(x))
        let list = ["n", "u", "b", "t", "q", "p", "h", "s", "o", "e"]
        let r = ""
        for (var i = log; i >= 0; i--) {
          let n = Math.floor(x / Math.pow(10, i)) % 10
          if (r == "") r = list[n].toUpperCase()
          else r += list[n]
        }
        return r
      },
      abbreviationLength(group) {
        return group == 1 ? 1 : Math.pow(Math.floor(group / 2) + 1, 2) * 2
      },
      getAbbreviationAndValue(x) {
        const abbreviationListUnfloored = x.log(118).toNumber()
        const abbreviationListIndex = Math.floor(abbreviationListUnfloored) + 1
        const abbreviationLength = this.abbreviationLength(abbreviationListIndex)
        const abbreviationProgress = abbreviationListUnfloored - abbreviationListIndex + 1
        const abbreviationIndex = Math.floor(abbreviationProgress * abbreviationLength)
        const abbreviation = this.getAbbreviation(abbreviationListIndex, abbreviationProgress)
        const value = E(118).pow(abbreviationListIndex + abbreviationIndex / abbreviationLength - 1)
        return [abbreviation, value];
      },
      formatElementalPart(abbreviation, n) {
        if (n.eq(1)) {
          return abbreviation;
        }
        return `${n} ${abbreviation}`;
      },
      format(value,acc) {
        if (value.gt(E(118).pow(E(118).pow(E(118).pow(4))))) return "e"+this.format(value.log10(),acc)
  
        let log = value.log(118)
        let slog = log.log(118)
        let sslog = slog.log(118).toNumber()
        let max = Math.max(4 - sslog * 2, 1)
        const parts = [];
        while (log.gte(1) && parts.length < max) {
          const [abbreviation, value] = this.getAbbreviationAndValue(log)
          const n = log.div(value).floor()
          log = log.sub(n.mul(value))
          parts.unshift([abbreviation, n])
        }
        if (parts.length >= max) {
          return parts.map((x) => this.formatElementalPart(x[0], x[1])).join(" + ");
        }
        const formattedMantissa = E(118).pow(log).toFixed(parts.length === 1 ? 3 : acc);
        if (parts.length === 0) {
          return formattedMantissa;
        }
        if (parts.length === 1) {
          return `${formattedMantissa} × ${this.formatElementalPart(parts[0][0], parts[0][1])}`;
        }
        return `${formattedMantissa} × (${parts.map((x) => this.formatElementalPart(x[0], x[1])).join(" + ")})`;
      },
    },
    old_sc: {
      format(ex, acc) {
        ex = E(ex)
        let e = ex.log10().floor()
        if (e.lt(9)) {
            if (e.lt(3)) {
                return ex.toFixed(acc)
            }
            return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        } else {
            if (ex.gte("eeee10")) {
                let slog = ex.slog()
                return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + this.format(slog.floor(), 0)
            }
            let m = ex.div(E(10).pow(e))
            return (e.log10().gte(9)?'':m.toFixed(4))+'e'+this.format(e,0)
        }
      }
    },
    eng: {
      format(ex, acc) {
        ex = E(ex)
        let e = ex.log10().floor()
        if (e.lt(9)) {
          if (e.lt(3)) {
              return ex.toFixed(acc)
          }
          return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        } else {
          if (ex.gte("eeee10")) {
            let slog = ex.slog()
            return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + this.format(slog.floor(), 0)
          }
          let m = ex.div(E(1000).pow(e.div(3).floor()))
          return (e.log10().gte(9)?'':m.toFixed(E(4).sub(e.sub(e.div(3).floor().mul(3)))))+'e'+this.format(e.div(3).floor().mul(3),0)
        }
      },
    },
    mixed_sc: {
      format(ex, acc, max) {
        ex = E(ex)
        let e = ex.log10().floor()
        if (e.lt(63) && e.gte(max)) return format(ex,acc,max,"st")
        else return format(ex,acc,max,"sc")
      }
    },
    layer: {
      layers: ["infinity","eternity","reality","equality","affinity","celerity","identity","vitality","immunity","atrocity"],
      format(ex, acc, max) {
        ex = E(ex)
        let layer = ex.max(1).log10().max(1).log(INFINITY_NUM.log10()).floor()
        if (layer.lte(0)) return format(ex,acc,max,"sc")
        ex = E(10).pow(ex.max(1).log10().div(INFINITY_NUM.log10().pow(layer)).sub(layer.gte(1)?1:0))
        let meta = layer.div(10).floor()
        let layer_id = layer.toNumber()%10-1
        return format(ex,Math.max(4,acc),max,"sc") + " " + (meta.gte(1)?"meta"+(meta.gte(2)?"^"+format(meta,0,max,"sc"):"")+"-":"") + (isNaN(layer_id)?"nanity":this.layers[layer_id])
      },
    },
    standard: {
      tier1(x) {
        return ST_NAMES[1][0][x % 10] +
        ST_NAMES[1][1][Math.floor(x / 10) % 10] +
        ST_NAMES[1][2][Math.floor(x / 100)]
      },
      tier2(x) {
        let o = x % 10
        let t = Math.floor(x / 10) % 10
        let h = Math.floor(x / 100) % 10
  
        let r = ''
        if (x < 10) return ST_NAMES[2][0][x]
        if (t == 1 && o == 0) r += "Vec"
        else r += ST_NAMES[2][1][o] + ST_NAMES[2][2][t]
        r += ST_NAMES[2][3][h]
  
        return r
      },
    },
    inf: {
      format(ex, acc, max) {
        let meta = 0
        let inf = E(Number.MAX_VALUE)
        let symbols = ["", "∞", "Ω", "Ψ", "ʊ"]
        let symbols2 = ["", "", "m", "mm", "mmm"]
        while (ex.gte(inf)) {
          ex = ex.log(inf)
          meta++
        }
  
        if (meta == 0) return format(ex, acc, max, "sc")
        if (ex.gte(3)) return symbols2[meta] + symbols[meta] + "ω^"+format(ex.sub(1), acc, max, "sc")
        if (ex.gte(2)) return symbols2[meta] + "ω" + symbols[meta] + "-"+format(inf.pow(ex.sub(2)), acc, max, "sc")
        return symbols2[meta] + symbols[meta] + "-"+format(inf.pow(ex.sub(1)), acc, max, "sc")
      }
    },
}


const INFINITY_NUM = E(2).pow(1024);
const SUBSCRIPT_NUMBERS = "₀₁₂₃₄₅₆₇₈₉";
const SUPERSCRIPT_NUMBERS = "⁰¹²³⁴⁵⁶⁷⁸⁹";

function toSubscript(value) {
    return value.toFixed(0).split("")
      .map((x) => x === "-" ? "₋" : SUBSCRIPT_NUMBERS[parseInt(x, 10)])
      .join("");
}

function toSuperscript(value) {
    return value.toFixed(0).split("")
      .map((x) => x === "-" ? "₋" : SUPERSCRIPT_NUMBERS[parseInt(x, 10)])
      .join("");
}

function format(ex, acc=2, max=9, type="mixed_sc") {
    ex = E(ex)
    neg = ex.lt(0)?"-":""
    if (ex.mag == Infinity) return neg + 'Infinity'
    if (Number.isNaN(ex.mag)) return neg + 'NaN'
    if (ex.lt(0)) ex = ex.mul(-1)
    if (ex.eq(0)) return ex.toFixed(acc)
    let e = ex.log10().floor()
    switch (type) {
        case "sc":
            if (ex.log10().lt(Math.min(-acc,0)) && acc > 1) {
                let e = ex.log10().ceil()
                let m = ex.div(e.eq(-1)?E(0.1):E(10).pow(e))
                let be = e.mul(-1).max(1).log10().gte(9)
                return neg+(be?'':m.toFixed(2))+'e'+format(e, 0, max, "mixed_sc")
            } else if (e.lt(max)) {
                let a = Math.max(Math.min(acc-e.toNumber(), acc), 0)
                return neg+(a>0?ex.toFixed(a):ex.toFixed(a).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
            } else {
                if (ex.gte("eeee10")) {
                    let slog = ex.slog()
                    return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(2)) + "F" + format(slog.floor(), 0)
                }
                let m = ex.div(E(10).pow(e))
                let be = e.log10().gte(9)
                return neg+(be?'':m.toFixed(2))+'e'+format(e, 0, max, "mixed_sc")
            }
        case "st":
            let e3 = ex.log(1e3).floor()
            if (e3.lt(1)) {
              return neg+ex.toFixed(Math.max(Math.min(acc-e.toNumber(), acc), 0))
            } else {
              let e3_mul = e3.mul(3)
              let ee = e3.log10().floor()
              if (ee.gte(3000)) return "e"+format(e, acc, max, "st")

              let final = ""
              if (e3.lt(4)) final = ["", "K", "M", "B"][Math.round(e3.toNumber())]
              else {
                let ee3 = Math.floor(e3.log(1e3).toNumber())
                if (ee3 < 100) ee3 = Math.max(ee3 - 1, 0)
                e3 = e3.sub(1).div(E(10).pow(ee3*3))
                while (e3.gt(0)) {
                  let div1000 = e3.div(1e3).floor()
                  let mod1000 = e3.sub(div1000.mul(1e3)).floor().toNumber()
                  if (mod1000 > 0) {
                    if (mod1000 == 1 && !ee3) final = "U"
                    if (ee3) final = FORMATS.standard.tier2(ee3) + (final ? "-" + final : "")
                    if (mod1000 > 1) final = FORMATS.standard.tier1(mod1000) + final
                  }
                  e3 = div1000
                  ee3++
                }
              }

              let m = ex.div(E(10).pow(e3_mul))
              return neg+(ee.gte(10)?'':(m.toFixed(E(2).sub(e.sub(e3_mul)).add(1).toNumber()))+' ')+final
            }
        default:
            return neg+FORMATS[type].format(ex, acc, max)
    }
}

function formatGain(amt, gain) {
    let next = amt.add(gain)
    let rate
    let ooms = next.div(amt)
    if (ooms.gte(10) && amt.gte(1e100)) {
        ooms = ooms.log10().mul(20)
        rate = "(+"+format(ooms) + " OoMs/sec)"
    }
    else rate = "(+"+format(gain)+"/sec)"
    return rate
}

function formatTime(ex,acc=2,type="s") {
    ex = E(ex)
    if (ex.gte(86400)) return format(ex.div(86400).floor(),0,12,"sc")+":"+formatTime(ex.mod(86400),acc,'d')
    if (ex.gte(3600)||type=="d") return (ex.div(3600).gte(10)||type!="d"?"":"0")+format(ex.div(3600).floor(),0,12,"sc")+":"+formatTime(ex.mod(3600),acc,'h')
    if (ex.gte(60)||type=="h") return (ex.div(60).gte(10)||type!="h"?"":"0")+format(ex.div(60).floor(),0,12,"sc")+":"+formatTime(ex.mod(60),acc,'m')
    return (ex.gte(10)||type!="m" ?"":"0")+format(ex,acc,12,"sc")
}

function formatReduction(ex) { ex = E(ex); return format(E(1).sub(ex).mul(100))+"%" }

function formatPercent(ex) { ex = E(ex); return format(ex.mul(100))+"%" }

function formatMult(ex,acc=2) { ex = E(ex); return ex.gte(1)?"×"+ex.format(acc):"/"+ex.pow(-1).format(acc)}

function expMult(a,b,base=10) { return Decimal.gte(a,10) ? Decimal.pow(base,Decimal.log(a,base).pow(b)) : E(a) }