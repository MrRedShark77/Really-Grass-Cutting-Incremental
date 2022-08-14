var mapID = 'g'
var mapPos = [3,3]

window.addEventListener('keydown', e=>{
    if (e.keyCode == 65 || e.keyCode == 37) switchMap(-1,0)
    if (e.keyCode == 68 || e.keyCode == 39) switchMap(1,0)
    if (e.keyCode == 87 || e.keyCode == 38) switchMap(0,-1)
    if (e.keyCode == 83 || e.keyCode == 40) switchMap(0,1)
})

const MAP = [
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,'opt',null,null,null],
    [null,null,'auto','g','pc','gh',null],
    [null,null,null,'p','chal',null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
]

const MAP_IDS = (_=>{
    let x = []
    for (i in MAP) for (j in MAP[i]) if (MAP[i][j]) x.push(MAP[i][j])
    return x
})()

function switchMap(dx,dy) {
    let [mx, my] = [mapPos[0]+dx, mapPos[1]+dy]
    if (MAP[my][mx]) {
        mapPos[0] = mx
        mapPos[1] = my

        mapID = MAP[my][mx]
    }
}

el.update.map = _=>{
    for (x in MAP_IDS) {
        let id = MAP_IDS[x]
        let m_div = tmp.el["map_div_"+id]

        if (m_div) m_div.setDisplay(id == mapID)
    }

    let [mx,my] = mapPos

    tmp.el.lMap.setClasses({locked: !MAP[my][mx-1]})
    tmp.el.rMap.setClasses({locked: !MAP[my][mx+1]})
    tmp.el.uMap.setClasses({locked: !MAP[my-1][mx]})
    tmp.el.dMap.setClasses({locked: !MAP[my+1][mx]})
}