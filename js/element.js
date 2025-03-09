function el_display(bool) { return bool ? "" : "none" }
function el_classes(data) { return Object.keys(data).filter(x => data[x]).join(" ") }

/**
 * @param {Element} elem - Element
 */
function makeContainerScrollHorizontally(elem) {
    let j_elem = $(elem);
    elem.addEventListener('wheel', e => {
        let width = elem.scrollWidth - elem.clientWidth, more = false, less = false;
        if (e.deltaY > 0) {
            if (elem.scrollLeft === width) more = true;
            j_elem.stop();
            j_elem.animate({scrollLeft: elem.scrollLeft + 200}, 200);
        }
        else {
            if (elem.scrollLeft === 0) less = true;
            j_elem.stop();
            j_elem.animate({scrollLeft: elem.scrollLeft - 200}, 200);
        }
        if (!(more || less)) e.preventDefault();
    })

    /*
    elem.addEventListener('wheel', (event) => {
        event.preventDefault();

        elem.scrollBy({
            left: event.deltaY * 2,
            behavior: 'smooth'
        });
    });
    */
}

function updateHTML() {
    if (tmp.the_end) {
        return
    }
    updateTabsHTML()
    updateLists()
    for (let field in GRASS.field) updateGrass(field);
    el('position').innerHTML = `(X: ${Math.round(-camera_pos.x/250)}, Y: ${Math.round(-camera_pos.y/250)})`

    if (tmp.anti_unl && isInsideCircle(20,0,10)) {
        document.body.style.setProperty('--primary-background-color', '#070064')
        document.body.style.setProperty('--secondary-background-color', '#060053')
    } else if (tmp.star_unl && isInsideCircle(0,-20,10)) {
        document.body.style.setProperty('--primary-background-color', '#02001d')
        document.body.style.setProperty('--secondary-background-color', '#fff1')
    } else {
        document.body.style.setProperty('--primary-background-color', '#0052af')
        document.body.style.setProperty('--secondary-background-color', '#00489b')
    }

    updateMaps()
}

function setupHTML() {
    setupGridElements()
    setupTabsHTML()
    setupLists()

    for (let [id, u] of Object.entries(UPGRADES)) {
        for (let ui in u.ctn) {
            el(`upg-${id}-${ui}-div`).addEventListener("contextmenu", (e) => {
                e.preventDefault();
                buyUpgrade(id,ui,true)
            })
        }
    }

    document.querySelectorAll(".upgrades-grid.normal-mode").forEach(x => {makeContainerScrollHorizontally(x)})
    document.querySelectorAll(".accomplishments-table").forEach(x => {makeContainerScrollHorizontally(x)})

    setupMaps()
}

function updateHTMLSecond() {
    updateGEsDisplay()
    updateGEsHTML()
    updateListsSecond()
}

function setupMaps() {
    let h1 = "", h2 = ""

    for (let i in TELEPORTS) {
        let t = TELEPORTS[i]

        h1 += `
        <div class="map-button" id="map-pin-${i}">
            <img class="map-img" src="images/${t[3]}.png" draggable="false" onclick="teleportTo(${i})">
            <img class="map-img" src="images/${t[4]}.png" draggable="false">
            <div class="map-text">${t[1]}</div>
        </div>
        `

        h2 += `
        <div class="map-button" id="map-button-${i}">
            <img class="map-img" src="images/${t[3]}.png" draggable="false" onclick="teleportTo(${i})">
            <img class="map-img" src="images/${t[4]}.png" draggable="false">
            <div class="map-text">${t[1]}</div>
            <img class="map-pin" src="images/Icons/Pin.png" draggable="false" onclick="player.map_pins[${i}] = !player.map_pins[${i}]">
        </div>
        `
    }

    el('map-pins').innerHTML = h1, el('tab-map-list').innerHTML = h2
}

function updateMaps() {
    let o = tabOpened && tabName == 'map'
    
    for (let i in TELEPORTS) {
        el(`map-pin-${i}`).style.display = el_display(TELEPORTS[i][0]() && player.map_pins[i])

        if (o) {
            el(`map-button-${i}`).style.display = el_display(TELEPORTS[i][0]())
            el(`map-button-${i}`).className = el_classes({ 'map-button': true, 'map-button-unpinned': !player.map_pins[i] })
        }
    }
}