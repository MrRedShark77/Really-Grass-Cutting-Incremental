var mapID = 'g' // 'cs'
var mapPos = [3,3]

var mapID2 = 'sc'
var mapPos2 = [3,3]

var mapID3 = 'star'
var mapPos3 = [3,3]

var map_mode = false

window.addEventListener('keydown', e=>{
    if (e.keyCode == 65 || e.keyCode == 37) switchMap(-1,0)
    if (e.keyCode == 68 || e.keyCode == 39) switchMap(1,0)
    if (e.keyCode == 87 || e.keyCode == 38) switchMap(0,-1)
    if (e.keyCode == 83 || e.keyCode == 40) switchMap(0,1)
})

const MAP = [
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,'stats','opt','cs','rp',null],
    [null,null,'auto','g','pc','gh','fd'],
    [null,null,null,'p','chal','as',null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
]

const SPACE_MAP = [
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,'ap',null,null,null],
    [null,null,'sac','sc','at',null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
]

const STAR_MAP = [
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,'sol','cs',null,null,null],
    [null,null,'stage','star','sm',null,null],
    [null,null,'solc',null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
]

const MAP_NAMES = {
    // Ground - All Realms

    'g': `Grass Field`,
    get 'p'() { return player.planetoid.active ? `Observatorium` : `Perks` },
    get 'auto'() { return player.planetoid.active ? `Ring Form` : `Automation` },
    'opt': `Options`,
    'stats': `Statistics`,
    'cs': `Constellation`,
    'chal': `Challenge`,
    get 'fd'() { return player.decel ? `Fundry` : `Foundry` },
    'as': `Special Factory`,
    get 'gh'() { return player.decel ? `Grass-Skip` : player.recel ? `Grass Jump` : `Grasshop` },
    get 'rp'() { return player.planetoid.active ? `The Star` : `The Launch Pad` },
    'pc': `Prestige Field`,

    // Space

    'sc': `Star Chart`,
    'ap': `Obelisks`,
    'sac': `Sacrifice`,
    'at': `Astral / AGH`,

    // Star

    'star': `Star`,
    'sm': `Supernova Milestone`,
    'stage': "Solarian Stage",
    'sol': "Collecting/Forming",
    'solc': "Sol Compression",
}

const MAP_UNLOCKS = {
    // Ground - All Realms

    'chal': () => !tmp.outsideNormal && player.cTimes > 0,
    'cs': () => player.constellation.unl,
    'gh': () => (!player.planetoid.active || player.lowGH <= -48) && player.cTimes > 0,
    'fd': () => !player.planetoid.active && hasUpgrade('factory',0),
    'as': () => !player.planetoid.active && hasUpgrade('factory',3),
    'rp': () => hasUpgrade('factory',6) || player.grassjump>=30,

    // Space

    'ap': () => player.lowGH <= -48,
    'sac': () => player.lowGH <= -24,

    // Star

    'stage': () => tmp.solarianUnl,
    'sol': () => tmp.solarianUnl,
    'solc': () => hasSolarUpgrade(7,3),
}

const MAP_IDS = (()=>{
    let x = [];
    [...MAP,...SPACE_MAP,...STAR_MAP].forEach(e => {e.forEach(s => {if (s !== null && !x.includes(s)) x.push(s)})})
    return x
})()

function switchMap(dx,dy) {
    let m_pos = tmp.star ? mapPos3 : tmp.space ? mapPos2 : mapPos

    changeMap(m_pos[0]+dx, m_pos[1]+dy)
}

function changeMap(x,y) {
    let m = tmp.star ? STAR_MAP : tmp.space ? SPACE_MAP : MAP
    let m_pos = tmp.star ? mapPos3 : tmp.space ? mapPos2 : mapPos

    let p = m[y][x]
    if (p && (!MAP_UNLOCKS[p] || MAP_UNLOCKS[p]())) {
        m_pos[0] = x
        m_pos[1] = y

        if (tmp.star) mapID3 = p
        else if (tmp.space) mapID2 = p
        else mapID = p
    }
}

const MAP_POS_D = [[0,-1],[0,1],[-1,0],[1,0]]
const MAP_POS_D_NAMES = ['lMap','rMap','uMap','dMap']

el.update.map = ()=>{
    let m_id = tmp.star ? mapID3 : tmp.space ? mapID2 : mapID

    for (id of MAP_IDS) {
        let m_div = tmp.el["map_div_"+id]

        if (m_div) m_div.setDisplay(id == m_id)
    }

    let [mx,my] = tmp.star ? mapPos3 : tmp.space ? mapPos2 : mapPos
    let m = tmp.star ? STAR_MAP : tmp.space ? SPACE_MAP : MAP

    for (let d = 0; d < 4; d++) {
        let dp = MAP_POS_D[d], p = m[my+dp[0]][mx+dp[1]], u = MAP_UNLOCKS[p]

        tmp.el[MAP_POS_D_NAMES[d]].setClasses({locked: !p || u && !u()})
    }

    tmp.el.map_name.setHTML(MAP_NAMES[m_id])
    tmp.el.spaceButton.setDisplay(player.gTimes > 0)
    tmp.el.starButton.setDisplay(player.sn.times > 0)

    tmp.el.map.setDisplay(map_mode)

    if (map_mode) {
        for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
            let p = m[y][x], el = tmp.el[`map_${y}_${x}`], u = MAP_UNLOCKS[p], vis = p && (!u || u())
            el.setDisplay(vis)
            if (!vis) continue;
            el.setHTML(MAP_NAMES[p])
        }
    }

    tmp.el.main_app.changeStyle('background-color',tmp.space ? "#fff1" : "#fff2")
    document.body.style.background = tmp.star ? "radial-gradient(circle, #ffa500 0%, #ffc65c 25%, #ffa500 50%, #ffc65c 75%, #ffa500 100%)" : tmp.space ? "#0A001E" : player.planetoid.active ? "#24002C" : "#0052af"
    document.body.className = player.planetoid.active ? 'planetoid' : ''
    tmp.el.grass_cap_div.changeStyle('background-color',player.planetoid.active ? "#D000FF" : "#29b146")

    tmp.el.cs_div.setDisplay(player.constellation.unl)
}

el.setup.map = () => {
    let h = ""
    for (let y = 0; y < 7; y++) {
        h += `<tr>`
        for (let x = 0; x < 7; x++) {
            h += `<td><button id="map_${y}_${x}" style="display: none" onclick="changeMap(${x},${y})">${y*7+x}</button></td>`
        }
        h += `</tr>`
    }
    new Element('map_table').setHTML(h)
}