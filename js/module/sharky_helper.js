const SH = {}

SH.exponential_sum = (t, height) => {
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

SH.simpleCost = function(x,type,...arg) {
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
        case "E": {
            let [base,exponent] = arg
            return Decimal.pow(exponent,x).mul(base)
        }
        case "EI": {
            let [base,exponent] = arg
            return x.div(base).log(exponent)
        }
        default: {
            return E(0)
        }
    }
}

SH.inversedSimpleCost = function(x,type,...arg) {
    return simpleCost(x,type+"I",...arg)
}

SH.costToNext25 = function(n, func, ...arg) {
    let sum = E(0)
    for (let i = 0; i < Decimal.sub(25, Decimal.modulo(n, 25)).toNumber(); i++) {
        sum = sum.add(func(Decimal.add(n, i),...arg))
    }
    return sum
}

SH.advancedCostToNext25 = function(n, max, func, ...arg) {
    let sum = E(0)
    for (let i = 0; i < Decimal.sub(25, Decimal.modulo(n, 25)).add(n).min(max).sub(n).toNumber(); i++) {
        sum = sum.add(func(Decimal.add(n, i),...arg))
    }
    return sum
}

Decimal.prototype.simpleCost = function(type, ...arg) { return SH.simpleCost(this, type, ...arg) }