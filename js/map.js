var mapID = 'g'
var mapPos = [3,3]

var mapID2 = 'sc'
var mapPos2 = [3,3]

window.addEventListener('keydown', e=>{
    if (e.keyCode == 65 || e.keyCode == 37) switchMap(-1,0)
    if (e.keyCode == 68 || e.keyCode == 39) switchMap(1,0)
    if (e.keyCode == 87 || e.keyCode == 38) switchMap(0,-1)
    if (e.keyCode == 83 || e.keyCode == 40) switchMap(0,1)
})

const MAP = [
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,'opt',null,'rp',null],
    [null,null,'auto','g','pc','gh','fd'],
    [null,null,null,'p','chal','as',null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
]

const SPACE_MAP = [
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,'sc','at',null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
]

const MAP_IDS = (_=>{
    let x = []
    for (i in MAP) for (j in MAP[i]) if (MAP[i][j]) x.push(MAP[i][j])
    for (i in SPACE_MAP) for (j in SPACE_MAP[i]) if (SPACE_MAP[i][j]) x.push(SPACE_MAP[i][j])
    return x
})()

function switchMap(dx,dy) {
    let m = tmp.space ? SPACE_MAP : MAP
    let m_pos = tmp.space ? mapPos2 : mapPos

    let [mx, my] = [m_pos[0]+dx, m_pos[1]+dy]
    if (m[my][mx]) {
        m_pos[0] = mx
        m_pos[1] = my

        if (tmp.space) mapID2 = m[my][mx]
        else mapID = m[my][mx]
    }
}

el.update.map = _=>{
    for (x in MAP_IDS) {
        let id = MAP_IDS[x]
        let m_div = tmp.el["map_div_"+id]

        if (m_div) m_div.setDisplay(id == (tmp.space ? mapID2 : mapID))
    }

    let [mx,my] = tmp.space ? mapPos2 : mapPos
    let m = tmp.space ? SPACE_MAP : MAP

    tmp.el.lMap.setClasses({locked: !m[my][mx-1]})
    tmp.el.rMap.setClasses({locked: !m[my][mx+1]})
    tmp.el.uMap.setClasses({locked: !m[my-1][mx]})
    tmp.el.dMap.setClasses({locked: !m[my+1][mx]})

    tmp.el.spaceButton.setDisplay(player.gTimes > 0)
    tmp.el.spaceButton.setTxt(tmp.space ? "Go to Ground" : "Go to Space")
}