const G_SIZE = 15
const G_RANGE = 50

var mouse_pos = {x:0,y:0}
var range_pos = {x:0,y:0}
var mouse_in = false

function createGrass() {
    if (tmp.grasses.length < tmp.grassCap) {
        let pl_active = player.planetoid.active

        let pl = pl_active?Math.random()<tmp.observChance:Math.random()<tmp.platChance&&player.tier>=3
        let ms = !pl_active&&Math.random()<tmp.moonstoneChance&&pl&&player.gTimes>0

        tmp.grasses.push({
            x: Math.random(),
            y: Math.random(),
            pl: pl,
            ms: ms,
        })
    }
}

function removeGrass(i,auto=false) {
    let tg = tmp.grasses[i]
    if (!tg) return

    let y = 1
    if (auto) y *= tmp.autocutBonus

    var p = player.planetoid.active, hsj4 = player.hsj >= 4

    if (hsj4 || p) {
        if (tg.pl) player.planetoid.observ = player.planetoid.observ.add(tmp.observGain)
    }
    if (hsj4 || !p) {
        if (tg.pl) player.plat = player.plat.add(tmp.platGain.mul(tmp.platCutAmt ? y : 1))
        if (tg.ms || (hsj4 && tg.pl)) player.moonstone = player.moonstone.add(tmp.moonstoneGain.mul(tmp.moonstonesCutAmt ? y : 1))
    }

    gainCurrenciesOnGrass(y)

    if (player.gTimes > 0) player.sp = player.sp.add(tmp.SPGain)

    tmp.grasses.splice(i, 1)
}

function gainCurrenciesOnGrass(bonus=1, mult=1) {
    // console.log(format(tmp.XPGain.mul(bonus).mul(mult),0))
    var p = player.planetoid.active, hsj4 = player.hsj >= 4

    if (hsj4 || p) {
        player.planetoid.pm = player.planetoid.pm.add(tmp.planetiumGain.mul(mult))
        player.planetoid.xp = player.planetoid.xp.add(tmp.cosmicGain.mul(mult))
    }
    if (hsj4 || !p) {
        let g = tmp.grassGain.mul(bonus).mul(mult)
        if (player.hsj > 0) {
            player.unGrass = player.unGrass.add(g)
            player.aGrass = player.aGrass.add(g)
            player.grass = player.grass.add(g)
        } else if (player.recel) player.unGrass = player.unGrass.add(g)
        else if (player.decel) player.aGrass = player.aGrass.add(g)
        else player.grass = player.grass.add(g)
        player.xp = player.xp.add(tmp.XPGain.mul(bonus).mul(mult))
        if (player.pTimes > 0) player.tp = player.tp.add(tmp.TPGain.mul(bonus).mul(mult))
    }

    if (player.gTimes > 0) player.sp = player.sp.add(tmp.SPGain.mul(mult))
}

el.update.grassCanvas = ()=>{
    if (mapID == 'g' && !tmp.space && !tmp.star) {
        if (grass_canvas.width == 0 || grass_canvas.height == 0) resizeCanvas()
        tmp.el.grass_canvas.setClasses({planetoid: player.planetoid.active})
        drawGrass()

        tmp.el.grass_cap.setHTML(`${format(tmp.grasses.length,0)} / ${format(tmp.grassCap,0)} <span class="smallAmt">(+${format(1/tmp.grassSpawn*tmp.spawnAmt)}/s)</span>`)
        tmp.el.grass_cut.setHTML("+"+format(player.planetoid.active?tmp.planetiumGain:tmp.grassGain,1)+'<span class="smallAmt">/cut</span>')
    }
}

function resetGlasses() {
    tmp.grasses = []
    tmp.spawn_time = 0
}

function drawGrass() {
	if (!retrieveCanvasData()) return;

    let pl_active = player.planetoid.active

	grass_ctx.clearRect(0, 0, grass_canvas.width, grass_canvas.height);
    let gs = tmp.grasses

    if (mouse_in) {
        grass_ctx.fillStyle = "#34AF7C77"

        grass_ctx.fillRect(range_pos.x,range_pos.y,tmp.rangeCut,tmp.rangeCut)
    }

    grass_ctx.strokeStyle = "black"

    for (let i = 0; i < gs.length; i++) {
        let g = gs[i]

        if (g) {
            grass_ctx.fillStyle = pl_active?g.pl?"#6C69C6":"#8500A3":g.pl?g.ms?'#008DFF':"#DDD":"#00AF00"

            let [x,y] = [Math.min(grass_canvas.width*g.x,grass_canvas.width-G_SIZE),Math.min(grass_canvas.height*g.y,grass_canvas.height-G_SIZE)]

            if (mouse_in) {
                if (range_pos.x < x + G_SIZE &&
                    range_pos.x + tmp.rangeCut > x &&
                    range_pos.y < y + G_SIZE &&
                    tmp.rangeCut + range_pos.y > y) {
                        removeGrass(i)
                        i--
        
                        continue
                    }
            }

            grass_ctx.fillRect(x,y,G_SIZE,G_SIZE)
            grass_ctx.strokeRect(x,y,G_SIZE,G_SIZE)
        }
    }
}

function grassCanvas() {
    if (!retrieveCanvasData()) return
    if (grass_canvas && grass_ctx) {
        window.addEventListener("resize", resizeCanvas)

        grass_canvas.width = grass_canvas.clientWidth
        grass_canvas.height = grass_canvas.clientHeight

        grass_canvas.addEventListener('mousemove', (event)=>{
            mouse_in = true
            mouse_pos.x = event.pageX - grass_rect.left
            mouse_pos.y = event.pageY - grass_rect.top

            range_pos.x = mouse_pos.x - tmp.rangeCut/2
            range_pos.y = mouse_pos.y - tmp.rangeCut/2
        })

        grass_canvas.addEventListener('mouseout', (event)=>{
            mouse_in = false
        })
    }
}