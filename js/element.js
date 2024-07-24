function el_display(bool) { return bool ? "" : "none" }
function el_classes(data) { return Object.keys(data).filter(x => data[x]).join(" ") }

function updateHTML() {
    if (tmp.the_end) {
        return
    }
    updateTabsHTML()
    for (let field in GRASS.field) updateGrass(field);
}

function setupHTML() {
    setupGridElements()
    setupTabsHTML()

    for (let [id, u] of Object.entries(UPGRADES)) {
        for (let ui in u.ctn) {
            el(`upg-${id}-${ui}-div`).addEventListener("contextmenu", (e) => {
                e.preventDefault();
                buyUpgrade(id,ui,true)
            })
        }
    }
}

function updateHTMLSecond() {
    updateGEsDisplay()
    updateGEsHTML()
}