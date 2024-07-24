var grid_elements = {}
var visible_ge = []

function createGridElement(name,data = {}) {
    grid_elements[name] = data
}

function setupGridElements() {
    var ge_el = document.getElementById("grid-elements")

    for ([id,data] of Object.entries(grid_elements)) {
        var g = document.createElement("div")
        g.className = "grid-element"
        g.id = "grid-element-" + id
        g.style.top = (250 * data.pos?.[1] ?? 0) + 125 * ((data.size?.[1] ?? 1) - 1), g.style.left = (250 * data.pos?.[0] ?? 0) + 125 * ((data.size?.[0] ?? 1) - 1)
        g.style.width = (250 * data.size?.[0] ?? 1) - 10, g.style.height = (250 * data.size?.[1] ?? 1) - 10
        g.style.visibility = "hidden"
        if (data.style) for (let [k,v] of Object.entries(data.style)) g.style[k] = v
        data.el = g

        ge_el.appendChild(g)

        g = document.createElement("div")
        g.className = "grid-element-content "+data.class??""
        g.id = "grid-element-content-" + id
        g.innerHTML = data.html ?? ""
        data.el_content = g

        data.el.appendChild(g)

        if (data.sub_html) {
            g = document.createElement("div")
            g.innerHTML = data.sub_html

            data.el.appendChild(g)
        }
    }
}

function updateGEsDisplay() {
    var v = []

    for ([id,data] of Object.entries(grid_elements)) {
        var g = data.el, bounding = g.getBoundingClientRect()

        var unl = !data.unl || data.unl()
        var inside = tmp.the_end ? data.persist : unl && (data.persist || bounding.bottom >= 0 && bounding.right >= 0 && bounding.top <= window.innerHeight && bounding.left <= window.innerWidth)

        g.style.visibility = inside ? "visible" : "hidden"

        if (inside) v.push(id)
    }

    visible_ge = v

    // console.log(v)
}

function updateGEsHTML() {
    for (let i = 0; i < visible_ge.length; i++) {
        var id = visible_ge[i]
        var g = grid_elements[id]

        g.updateHTML?.()
    }
}