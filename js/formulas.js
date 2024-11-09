function sumBase(x,a) {
    return Decimal.pow(a,x).sub(1).div(Decimal.sub(a,1))
}
function revSumBase(x,a) {
    return Decimal.mul(x,Decimal.sub(a,1)).add(1).log(a).floor()
}

Decimal.prototype.sumBase = function(a,rev=false) { return rev ? revSumBase(this,a) : sumBase(this,a) }

function powPO(x,b,rev=false) {
    if (Decimal.lt(b,1.4285714287176406e-8)) {
        return rev ? Decimal.ln(x).div(b) : Decimal.mul(x,b).exp();
    } else {
        return rev ? Decimal.log(x,Decimal.add(b,1)) : Decimal.add(b,1).pow(x);
    }
}

Decimal.prototype.powPO = function(x,rev) { return powPO(this,x,rev) }

function sumBasePO(x,a,rev=false) {
    if (Decimal.lte(a,0)) return x
    return rev ? Decimal.mul(x,a).add(1).powPO(a,true) : powPO(x,a).sub(1).div(a)
}

Decimal.prototype.sumBasePO = function(x,rev) { return sumBasePO(this,x,rev) }

function calcLevelBonus(l,l0,b) {
    var r = Decimal.div(l,l0).floor(), c = Decimal.sub(l,r.mul(l0))
    return sumBase(r,b,l0).add(Decimal.pow(b,r).mul(c))
}

function expPow(a,b) { return Decimal.pow(10,Decimal.max(a,1).log10().add(1).pow(b).sub(1)) }
function revExpPow(a,b) { return Decimal.pow(10,Decimal.max(a,1).log10().add(1).root(b).sub(1)) } // return expPow(a,Decimal.invert(b))

Decimal.prototype.clone = function() {
    return this
}

/*
Decimal.prototype.modular=Decimal.prototype.mod=function (other){
    other=E(other);
    if (other.eq(0)) return E(0);
    if (this.sign*other.sign==-1) return this.abs().mod(other.abs()).neg();
    if (this.sign==-1) return this.abs().mod(other.abs());
    return this.sub(this.div(other).floor().mul(other));
};
*/

Decimal.prototype.softcap = function (start, power, mode, dis=false) {
    var x = this.clone()
    if (!dis&&x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).max(1).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
        if ([2, "exp"].includes(mode)) x = expPow(x.div(start), power).mul(start)
        if ([3, "log"].includes(mode)) x = x.div(start).log(power).add(1).mul(start)
    }
    return x
}

Decimal.prototype.scale = function (s, p, mode, rev=false) {
    var x = this.clone()

    if (Decimal.lte(x,s)) return x

    switch (mode) {
        case 'L':
            // (x-s)*p+s
            return rev ? x.sub(s).div(p).add(s) : x.sub(s).mul(p).add(s)
        case 'P':
            // (x/s)^p*s
            return rev ? x.div(s).root(p).mul(s) : x.div(s).pow(p).mul(s)
        case 'E1':
            // p^(x-s)*s
            return rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p,x.sub(s)).mul(s)
        case 'E2':
            // p^(x/s-1)*s, p >= 2.71828
            return rev ? x.div(s).max(1).log(p).add(1).mul(s) : Decimal.pow(p,x.div(s).sub(1)).mul(s)
        case 'ME1': {
            // p^(x-s)*x
            let ln_p = Decimal.ln(p)
            return rev ? Decimal.pow(p,s).mul(x).mul(ln_p).lambertw().div(ln_p) : Decimal.pow(p,x.sub(s)).mul(x)
        }
        case 'ME2': {
            // p^(x/s-1)*x
            let ln_p = Decimal.ln(p)
            return rev ? x.mul(p).mul(ln_p).div(s).lambertw().mul(s).div(ln_p) : Decimal.pow(p,x.div(s).sub(1)).mul(x)
        }
        case 'D': {
            // 10^((lg(x)/s)^p*s)
            let s10 = Decimal.log10(s)
            return rev ? Decimal.pow(10,x.log10().div(s10).root(p).mul(s10)) : Decimal.pow(10,x.log10().div(s10).pow(p).mul(s10))
        }
    }
}

function overflow(number, start, power, meta=1){
    if(isNaN(number.mag))return new Decimal(0);
    start=Decimal.iteratedexp(10,meta-1,1.0001).max(start);
    if(number.gte(start)){
        let s = start.iteratedlog(10,meta)
        number=Decimal.iteratedexp(10,meta,number.iteratedlog(10,meta).div(s).pow(power).mul(s));
    }
    return number;
}

Decimal.prototype.overflow = function (start, power, meta) { return overflow(this.clone(), start, power, meta) }

function tetraflow(number,start,power) { // EXPERIMENTAL FUNCTION - x => 10^^((slog10(x)-slog10(s))*p+slog10(s))
    if(isNaN(number.mag))return new Decimal(0);
    start=E(start);
    if(number.gte(start)){
        let s = start.slog(10)
        // Fun Fact: if 0 < number.slog(10) - start.slog(10) < 1, such like overflow(number,start,power,start.slog(10).sub(1).floor())
        number=Decimal.tetrate(10,number.slog(10).div(s).pow(power).mul(s))
    }
    return number;
}

Decimal.prototype.addTP = function (val) {
    var e = this.clone()
    return Decimal.tetrate(10, e.slog(10).add(val))
}

function preventNaNDecimal(x) {
    return isNaN(x.mag) ? new Decimal(0) : x
}

Math.logBase = function (x, base) {
    return Math.log(x) / Math.log(base)
}

function romanize(num) {
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
    for ( i in lookup ) {
        var m = Math.floor(num / lookup[i]);
        roman += i.repeat(m);
        num -= m*lookup[i];
    }
    return roman;
}

const F = {}

F.gammainc_lower = (s, z) => {
    let sum, x, k;
    for (k = 1, sum = new Decimal(1), x = new Decimal(1); k < 100; ++k) {
        sum = sum.add(x = x.mul(z).div(Decimal.add(s,k)))
        if (x.div(sum).lt(1e-14)) break;
    };
    // Math.exp(s * Math.log(z) - z - lngamma(s + 1) + Math.log(sum));
    return Decimal.ln(z).mul(s).sub(z).sub(Decimal.add(s,1).lngamma()).add(sum.ln()).exp().min(1)
}

F.exponential_sum = (t, height) => {
    if (Decimal.lte(height,10)) {
        var sum = new Decimal(1), div = new Decimal(1)
        for (let i = 1; i <= Decimal.round(height).toNumber(); i++) {
            div = div.mul(i)
            sum = sum.add(Decimal.pow(t,i).div(div))
        }
        return sum
    } else {
        // Almost accurate...
        var x = Decimal.div(height,1.5), y = Decimal.exp(t)
        
        if (Decimal.lte(t,x)) return y
        else {
            var z = 
            Decimal.pow(t,2)
            .add(Decimal.mul(t,height))
            .add(Decimal.mul(height,Decimal.sub(height,1)))
            .mul(Decimal.pow(t,Decimal.sub(height,2)))
            .div(Decimal.factorial(height))
            if (Decimal.gte(t,Decimal.mul(height,2).sub(x))) return z
            else {
                var u = Decimal.sub(t,x).div(Decimal.sub(height,x)).div(2)
                return y.pow(Decimal.sub(1,u).max(0)).mul(z.pow(u.min(1)))
            }
        }
    }
}

F.solveQuadratic = (a,b,c) => {
    let d = Decimal.sqr(b).sub(Decimal.mul(a,c).mul(4))
    if (d.lt(0)) return E(0);
    return Decimal.sub(d.sqrt(),b).div(a).div(2)
}

function lerp(a,b,t) { return a+(b-a)*t; }

function simpleCost(x,type,...arg) {
    switch (type) {
        case "EA": { // a*(1+b*x)*c^x, b > 0, c > 1
            let [base,increment,exponent] = arg
            return Decimal.pow(exponent,x).mul(Decimal.mul(x,increment).add(1)).mul(base)
        }
        case "EAI": { // inverse of EA
            let [base,increment,exponent] = arg
            let ln = Decimal.ln(exponent)
            return ln.mul(x).mul(Decimal.root(exponent,increment)).div(base).div(increment).lambertw().mul(increment).sub(ln).div(ln).div(increment)
        }
        default: {
            return E(0)
        }
    }
}

function inversedSimpleCost(x,type,...arg) {
    return simpleCost(x,type+"I",...arg)
}

function costToNext25(n, func, ...arg) {
    let sum = E(0)
    for (let i = 1; i <= Decimal.sub(25, Decimal.modulo(n, 25)).toNumber(); i++) {
        sum = sum.add(func(Decimal.add(n, i),...arg))
    }
    return sum
}