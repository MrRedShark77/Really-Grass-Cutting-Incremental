const A60_SIN = 0.8660254037844386;
const ANGLE_30 = 2 * Math.PI / 6;
const H_RADIUS = 90;
const FOG_DIST = 4;

var debug = {
    randomTeleport() {player.position = getRandomTile().split(';').map(i=>parseInt(i))},
}

var tiles = {};
var objects = {};
var goal = {
    total: 0,
    enemy: 0,
    max_enemies: 0,
    max_treasures: 0,
}
var player = {
    position: [0,0],
    start_lunarians: E(100),
    lunarians: E(100),
    start_damage: E(1),
    items: {},

    killed: 0,
    opened: 0,
    found: {},

    portal_opened: false,
    status: "",
    run: true,
}
var world_init = {
    id: [0,0],
    type: "lunar1",
    colors: [],
    size: 50,
    level: 1,
}
var world_config = {}
var trasture_before = []
var treasure_chances = []
var visible_tile = {};
var gps_tile = {};
var portal_pos = [0,0];

var preload_textures = [
    ['Curr/Lunarian','lunarian'],
    ['Curr/EvilLunarian','evil_lunarian'],
    ['Curr/LunarianChest','chest'],
    ['Curr/HealthChest','heal_chest'],
    ['Curr/ClosedPortal','close_portal'],
    ['Curr/OpenedPortal','open_portal'],
]
var loaded_textures = {}

const nameToImage = {
    'enemy': 'evil_lunarian',
    'treasure': 'chest',
    'heal': 'heal_chest',
}

var camera_pos = [0,0]
var before_mouse_pos = [0,0]
var mouse_pos = [0,0]
var object_hover = ""

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min) + min); }
function lerp(s,f,t) { return s + (f-s) * t }
function distance(x1,y1,x2,y2) { return Math.sqrt((x1-x2)**2+(y1-y2)**2) }
function getRandomTile() { return Object.keys(tiles)[getRandomInt(0,Object.keys(tiles).length-1)] }

function retrieveCanvasData() {
	let pre_canvas = document.getElementById("map_canvas")
    let pre_canvas_gps = document.getElementById("lunar_gps")
	if (pre_canvas===undefined||pre_canvas===null||pre_canvas_gps===undefined||pre_canvas_gps===null) return false;
    canvas = pre_canvas
	canvas_ctx = canvas.getContext("2d");
    canvas_rect = canvas.getBoundingClientRect()
    canvas_gps = pre_canvas_gps
    canvas_gps_ctx = canvas_gps.getContext("2d");
    canvas_gps_rect = canvas_gps.getBoundingClientRect()
	return true;
}

function resizeCanvas() {
    if (!retrieveCanvasData()) return
	canvas.width = 0;
	canvas.height = 0;
	canvas.width = canvas.clientWidth
	canvas.height = canvas.clientHeight
}

function setupCanvas() {
    setupCanvasImages()
    if (!retrieveCanvasData()) return
    if (canvas && canvas_ctx) {
        window.addEventListener("resize", resizeCanvas)

        window.addEventListener('mousemove', e=>{
            before_mouse_pos = [e.clientX,e.clientY]
        })

        window.addEventListener('click', e=>{
            actionPlayer()
        })

        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
    }
}

function actionPlayer() {
    if (!player.run) return

    let [px,py] = player.position
    let [mx,my] = mouse_pos
    let id = mx+';'+my
    let d = distance(...getPositionMult(px,py),...getPositionMult(mx,my))

    if (d < FOG_DIST - 0.25 && id in tiles && !equalPos(mouse_pos,player.position)) {
        if (id in objects) {
            let o = objects[id]
            switch (o.type) {
                case 'treasure':
                    if (LUNAR_ITEMS.key.amount.lt(1)) {
                        addOutput("You haven't got any keys to open!")
                        return
                    }
                    
                    if (Math.random() < temp.key_chance) addOutput("<b class='green'>SAVED KEY!!!</b>")
                    else addItem('key',-1)
    
                    var c = Math.random(), item = treasure_chances.find(x => c < x[1])
                    addItem(item[0],o.weight[item[0]],true," from treasure! ("+formatPercent(item[2])+" chance)"+(item[2]<1e-3?" <b class='yellow'>LEGENDARY ITEM!!!</b>":""))

                    player.opened++
    
                    delete objects[id]
                break;
                case 'heal':
                    if (LUNAR_ITEMS.key.amount.lt(1)) {
                        addOutput("You haven't got any keys to open!")
                        return
                    }
                    if (temp.max_lunar.lte(player.lunarians)) {
                        addOutput("You cannot be healed!")
                        return
                    }

                    if (Math.random() < temp.key_chance) addOutput("<b class='green'>SAVED KEY!!!</b>")
                    else addItem('key',-1)

                    var health = temp.max_lunar.mul(o.percent*temp.hc_power).min(temp.max_lunar.sub(player.lunarians)).round()
                    player.lunarians = player.lunarians.add(health)

                    addOutput(`Healed <b class="green">+${format(health,0)}</b> Lunarians!`)
    
                    delete objects[id]
                break;
                case 'enemy':
                    var dmg = temp.damage, crit = Math.random() < temp.crit_chance
                    if (crit) dmg = dmg.mul(2)
                    var ls = dmg.mul(temp.life_stealer)

                    o.health = o.health.add(ls).min(temp.max_lunar)
                    o.health = o.health.sub(dmg).max(0)
    
                    addOutput(`You deal <b>${format(dmg,0)}</b> damage to enemy!`+(crit?" <b class='red'>CRITICAL!!!</b>":""))
                    if (ls.gt(0)) addOutput(`Your damage heals <b class='green'>+${format(ls,0)}</b> Lunarians!`)
                    
                    if (o.health.lte(0)) {
                        player.killed++
                        addOutput(`You defeated the enemy!`+(o.key ? " <b class='green'>YOU GOT A KEY!!!</b>" : ""))
                        addItem('l_soul',o.soul,true," from defeated enemy!")
                        if (o.key) addItem('key',1,true)
                        if (!player.portal_opened && player.killed >= goal.enemy) {
                            player.portal_opened = true
                            addOutput("<b class='green'>THE PORTAL IS OPENED!!!</b>")
                        }
                        delete objects[id]
                        return
                    }
    
                    if (Math.random() < temp.block_chance) addOutput("<b class='green'>BLOCKED ENEMY'S ATTACK!!!</b>")
                    else {
                        dmg = o.damage.div(temp.defense).round()
    
                        player.lunarians = player.lunarians.sub(dmg).max(0)
        
                        addOutput(`Enemy deals <b>${format(dmg,0)}</b> damage to you!`)

                        if (player.lunarians.lte(0)) {
                            player.run = false
                            player.status = 'dead'
                            endLunarian()
                        }
                    }
                break;
                case 'portal':
                    if (player.portal_opened) {
                        player.run = false
                        player.position = mouse_pos
                        player.status = 'win'
                        endLunarian()
                    }
                break;
            }
        } else if (id in tiles) player.position = mouse_pos
    } 
}

function createObject(type,x,y,config={}) {
    if (x+";"+y in objects || equalPos(player.position,[x,y])) return false;

    let data = {
        type,
        image: config.image??nameToImage[type],
    }

    var lvl_len = world_config.lvl_size ?? 5

    var soul_mlt = Decimal.mul(world_config.soul_mult??1,world_init.soul_mult)

    switch (type) {
        case 'enemy':
            var lvl = Math.round(Math.max(0,Math.min(lvl_len,distance(...player.position,x,y)/world_init.size*lvl_len+2*(Math.random()-0.5)))) + world_init.level
            data.level = lvl
            data.key = config.key

            var base = Decimal.pow(world_config.health_scaling??1.1,lvl-1)
            
            data.soul = base.mul(lvl).mul(soul_mlt).round()
            data.damage = (data.health = data.max_health = base.mul(5+(lvl-1)*2).mul(world_config.health_mult??1).round()).div(10).round().max(1)
        break
        case 'treasure':
            var lvl = world_init.level + Math.random()**2*lvl_len
            var w = Decimal.pow(1.1,lvl-1).mul(lvl)
            data.weight = {}
            world_config.treasure_weight.forEach(([i,c,a]) => {data.weight[i] = LUNAR_ITEMS[i].type == "items" ? 1 : w.mul(a??1).mul(i == 'l_soul'?soul_mlt:1).round().max(1)})
        break
        case 'heal':
            data.percent = 0.25 + (Math.random()-0.5)*0.1
        break
        case 'portal':
            Object.defineProperty(data,'image',{
                get() { return player.portal_opened ? 'open_portal' : 'close_portal' },
            })
            portal_pos = [x,y]
        break
    }

    objects[x+";"+y] = data
    return true;
}

function generateTiles() {
    world_config = WORLD_GENERATION[world_init.type].config

    document.body.style.backgroundColor = world_config.background
    let color = world_config.tileColor ?? '#003875'

    noise.seed(Math.random())
    tiles = {}

    // Generating Tiles by Noise

    for (let y = 0; y < world_init.size; y++) for (let x = 0; x < world_init.size; x++) {
        let k = noise.simplex2(...getPositionMult(x/8,y/8))
        if (k <= 0.5 && k >= -0.5) tiles[x+';'+y] = color
    }

    // Removing Small Islands (X<=25)

    let tile_found = [], o = 0, ot = []

    const deep_find = (x,y) => {
        let t = x+";"+y

        if (!tiles[t] || tile_found.includes(t)) return;

        tile_found.push(t)
        ot.push(t)
        o++

        for (let [dx,dy] of getHexDirection(y)) deep_find(x+dx,y+dy)
    }

    for (let t in tiles) {
        if (tile_found.includes(t)) continue;

        o = 0, ot = []

        deep_find(...t.split(';').map(i=>parseInt(i)))

        if (o < 25) ot.map(i => {delete tiles[i]})
    }

    debug.randomTeleport()

    // Generating Objects and Other

    let [px,py] = player.position

    WORLD_GENERATION[world_init.type].run()

    var max_enemies = getRandomInt(...world_config.enemies_range),
    max_treasures = getRandomInt(...world_config.treasures_range),
    max_heals = Math.round(max_treasures/3)
    
    goal.enemy = Math.round(max_enemies * 2 / 3)
    goal.total = max_enemies + max_treasures - max_heals
    goal.max_enemies = max_enemies
    goal.max_treasures = max_treasures - max_heals

    treasure_weight_before = world_config.treasure_weight

    /*
    let mw = 0, w = 0

    config.treasure_weight.forEach(([i,x]) => {mw += x})
    treasure_chances = config.treasure_weight.map(([i,x]) => {
        w += x
        return [i,w/mw,x/mw]
    })
    */

    let obj = 0

    while (obj < max_treasures) {
        if (createObject(obj < max_heals ? 'heal' : 'treasure',...getRandomTile().split(';').map(i=>parseInt(i)))) obj++
    }

    obj = 0;

    while (obj < max_enemies) {
        let t = getRandomTile().split(';').map(i=>parseInt(i))
        if (createObject('enemy',...t,{
            key: obj < max_treasures,
        })) obj++;
    }

    while (!createObject('portal',...getRandomTile().split(';').map(i=>parseInt(i)))) {}
}

function drawHexagon(x,y,r,color) {
    l = r/10
    r -= l/2

    if (r <= 0) return;

    canvas_ctx.strokeStyle = "black"
    canvas_ctx.fillStyle = color
    canvas_ctx.lineWidth = l

    canvas_ctx.beginPath();
    for (var i = 0.5; i < 6.5; i++) {
        canvas_ctx.lineTo(x + r * Math.cos(ANGLE_30 * i), y + r * Math.sin(ANGLE_30 * i));
    }
    canvas_ctx.closePath();

    canvas_ctx.stroke();
    canvas_ctx.fill();
}

function getHexDirection(y) {
    let w = y % 2
    return [[1,0],[w,-1],[w-1,-1],[-1,0],[w-1,1],[w,1]]
}

function getPositionMult(x,y) {
    return [(0.5*(y%2)+x)*A60_SIN,0.75*y]
}

function equalPos(p1,p2) { return p1[0] === p2[0] && p1[1] === p2[1] }

function getHexPosition(x,y) {
    let yy = Math.round(y/0.75)
    return [Math.round(x/A60_SIN-0.5*(yy%2)),yy]
}

function setupCanvasImages() {
    let images = document.getElementById('canvas_images')
    preload_textures.map(([src,id]) => {
        var image = document.createElement('img');
        image.src = 'images/'+src+'.png'
        image.appendChild(images)
        image.onload = () => {
            loaded_textures[id] = image
        }
    })
    //console.log(images)
}

function calcCanvas(dt) {
    let cw = canvas.width, ch = canvas.height
    let [px,py] = player.position
    let ppm = getPositionMult(px,py)

    camera_pos = camera_pos.map((i,j) => lerp(i,ppm[j],0.1))

    mouse_pos = getHexPosition((before_mouse_pos[0] - cw/2)/H_RADIUS + camera_pos[0], (before_mouse_pos[1] - ch/2)/H_RADIUS + camera_pos[1])

    var gps = temp.gps

    visible_tile = {}

    let cph = getHexPosition(...camera_pos)

    for (let dy = -5; dy <= 5; dy++) for (let dx = -5; dx <= 5; dx++) {
        let x = cph[0]+dx, y = cph[1]+dy;
        let d = distance(...getPositionMult(x,y),...camera_pos)
        if (d <= FOG_DIST) visible_tile[x+';'+y] = Math.min(1,FOG_DIST-d)
    }
}

function drawImage(image,x,y,w,h) {
    if (w <= 0 || h <= 0) return;

    canvas_ctx.save()
    canvas_ctx.translate(-w/2,-h/2)
    canvas_ctx.drawImage(loaded_textures[image], x, y, w, h)
    canvas_ctx.restore()
}

function drawCanvas() {
    let cw = canvas.width, ch = canvas.height

    if (cw == 0 || ch == 0) resizeCanvas();

    canvas_ctx.clearRect(0, 0, cw, ch);

    let [px,py] = player.position
    let [pxx,pyy] = getPositionMult(px,py)
    let [cpx,cpy] = camera_pos
    let vtk = Object.keys(visible_tile)

    let d = 0;
    
    for (let t in visible_tile) if (t in tiles) {
        let [x,y] = t.split(';').map(i=>parseInt(i))
        let [xx,yy] = getPositionMult(x,y)

        drawHexagon(H_RADIUS * (xx-cpx) + cw/2, H_RADIUS * (yy-cpy) + ch/2, H_RADIUS / 2 * visible_tile[t], equalPos([x,y],mouse_pos) && !equalPos([x,y],player.position) && visible_tile[t] > 0.25 ? "green" : tiles[t])
    }

    for (let t in visible_tile) if (t in objects) {
        let o = objects[t], s = H_RADIUS * visible_tile[t]

        let [x,y] = t.split(';').map(i=>parseInt(i))
        let [xx,yy] = getPositionMult(x,y)

        drawImage(o.image, H_RADIUS * (xx-cpx) + cw/2, H_RADIUS * (yy-cpy) + ch/2, s, s)
    }

    let pt = vtk.indexOf(px+";"+py)

    if (pt >= 0) {
        let s = H_RADIUS * visible_tile[vtk[pt]]
        drawImage("lunarian", H_RADIUS * (pxx-cpx) + cw/2, H_RADIUS * (pyy-cpy) + ch/2, s, s)
    }

    /*

    for (let yy = 0; yy < 10; yy++) {
        // y = yy-4.5

        for (let xx = 0; xx < 10; xx++) {
            // x = (xx-4.5+0.5*(yy%2))*1/A60_SIN

            let [x,y] = getPositionMult(xx,yy)

            drawHexagon(100 + x * 100, 100 + y * 100, 50, '#003875') // *Math.min(1,4.5-Math.sqrt(x**2+y**2))
        }
    }

    */

    canvas_gps_ctx.clearRect(0, 0, 290, 290);
    document.getElementById("lunar_gps").style.display = temp.gps ? "" : "none";
    if (temp.gps) {
        var step = 290 / world_init.size
        for (let [t,o] of Object.entries(objects)) {
            let [x,y] = t.split(';').map(i=>parseInt(i))
            canvas_gps_ctx.fillStyle = o.type == 'treasure' ? 'yellow' : o.type == 'enemy' ? 'red' : o.type == 'heal' ? 'lime' : o.type == 'portal' ? 'cyan' : 'white'
            canvas_gps_ctx.fillRect(step * x, step * y, step, step)
        }

        canvas_gps_ctx.fillStyle = "white"
        canvas_gps_ctx.fillRect(step * px, step * py, step, step)
    }
}