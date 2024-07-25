const el = id => document.getElementById(id);
const FPS = 20;

var player = {}, date = Date.now(), diff = 0;

function loop() {
    updateTemp()
    diff = Date.now()-date;
    updateHTML()
    calc(diff/1000)
    date = Date.now()

    player.saved_cam = camera_pos
}

var camera_pos = {x: 0, y: 0}
var camera_lerp = {
    active: false,
    pos: { x: 0, y: 0 },
}

function doCameraLerp(x, y) {
    if (camera_lerp.active) return

    camera_lerp.active = true
    camera_lerp.pos.x = -x
    camera_lerp.pos.y = -y
}

function cameraEvent() {
    // make app draggable
    var app = el("app");
    var ge_el = el("grid-elements");
    var body = document.body;
    var isDragging = false;
    var offset = { x: 0, y: 0 };

    // body.style.backgroundPositionX = window.innerWidth/2 - 152 + "px";
    // body.style.backgroundPositionY = window.innerHeight/2 - 152 + "px";

    var innerSize = { x: window.innerWidth, y: window.innerHeight };

    window.updatePosition = function () {
        var xx = innerSize.x/2 + camera_pos.x, yy = innerSize.y/2 + camera_pos.y;

        body.style.backgroundPositionX = xx - 127 + "px";
        body.style.backgroundPositionY = yy - 127 + "px";

        ge_el.style.top = yy + "px";
        ge_el.style.left = xx + "px";

        // updateGEsDisplay()
    }

    app.addEventListener("mousedown", function (event) {
        isDragging = true;
        offset.x = event.clientX - body.offsetLeft - camera_pos.x;
        offset.y = event.clientY - body.offsetTop - camera_pos.y;
    });

    document.addEventListener("mousemove", function (event) {
        if (isDragging && !tmp.the_end) {
            if (camera_lerp.active) {
                offset.x = event.clientX - body.offsetLeft - camera_pos.x;
                offset.y = event.clientY - body.offsetTop - camera_pos.y;
                return
            }

            camera_pos.x = event.clientX - offset.x;
            camera_pos.y = event.clientY - offset.y;

            updatePosition()
            drawCanvas()
        }
    });

    document.addEventListener("mouseup", function () {
        if (!tmp.the_end) isDragging = false;
    });

    window.onresize = () => {
        innerSize = { x: window.innerWidth, y: window.innerHeight };

        updatePosition()
    }

    updatePosition()
}

function retrieveCanvasData() {
	let pre_canvas = document.getElementById("canvas-path")
	if (pre_canvas===undefined||pre_canvas===null) return false;
    canvas = pre_canvas
	canvas_ctx = canvas.getContext("2d");
    canvas_rect = canvas.getBoundingClientRect()
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
    if (!retrieveCanvasData()) return
    if (canvas && canvas_ctx) {
        window.addEventListener("resize", resizeCanvas)

        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
    }
}

const PYLONS = [
    {
        unl: ()=>player.crystal.times>0,
        dots: [[0,0],[0,10]],
    },
]

function drawCanvas() {
    let cw = canvas.width, ch = canvas.height

    canvas.width = canvas.clientWidth
	canvas.height = canvas.clientHeight

    if (cw == 0 || ch == 0) resizeCanvas();

    var dots = []

    canvas_ctx.clearRect(0, 0, cw, ch);

    canvas_ctx.lineWidth = 200
    canvas_ctx.strokeStyle = "#0003"
    canvas_ctx.fillStyle = "#0003"

    var innerSize = { x: window.innerWidth, y: window.innerHeight };
    var xx = innerSize.x/2 + camera_pos.x, yy = innerSize.y/2 + camera_pos.y;

    PYLONS.forEach(p => {
        if (p.unl()) {
            // dots.push(...p.dots.filter(([a1,a2]) => !dots.map(([b1,b2]) => b1+"-"+b2).includes(a1+"-"+a2)))

            let x0 = p.dots[0][0], y0 = p.dots[0][1], x1 = p.dots[1][0], y1 = p.dots[1][1];

            canvas_ctx.beginPath();
            canvas_ctx.moveTo(x0 * 250 + xx, y0 * 250 + yy);
            canvas_ctx.lineTo(x1 * 250 + xx, y1 * 250 + yy);
            canvas_ctx.stroke();
        }
    })

    dots.forEach(([x,y]) => {
        canvas_ctx.beginPath();
        canvas_ctx.arc(x*250+xx, y*250+yy, 100, 0, 2 * Math.PI);
        canvas_ctx.stroke();
    })
}

const TABS = [
    {
        name: "Options",
        unl: ()=>true,
        get html() {
            let h = `
            <div class="table-center">
                <button class="tiny-btn" onclick="save()">Save</button>
                <button class="tiny-btn" onclick="export_copy()">Export via clipboard</button>
                <button class="tiny-btn" onclick="exporty()">Export via file</button>
                <button class="tiny-btn" onclick="importy()">Import via prompt</button>
                <button class="tiny-btn" onclick="importy_file()">Import via file</button>
                <button class="tiny-btn" id="wipe" onclick="wipeConfirm()">WIPE!!!</button>
            </div>
            `

            return h
        },
    },{
        name: "Info/Credits",
        unl: ()=>true,
        get html() {
            let h = `
            <p><h4>Really<sup>2</sup> Grass Cutting Incremental</h4></p>
            <div style="width: 100%; text-align: left;">
                Created by <b>MrRedShark77</b> | Version <b>α1.1</b><br><br>
                <a href="https://discord.gg/mrredshark77-club-710184682620190731"><b>Discord</b></a><br>
                <a href="https://boosty.to/mrredshark77/donate"><b>Donate (Boosty)</b></a>
                <br><br>
                Tip: Move around by clicking and dragging. If you find the text is too small, you might need to zoom.
            </div>
            `

            return h
        },
    },
]

const TELEPORTS = [
    // [()=>true, "Timeless Space Breakdown", [0,0]],
]

function teleportTo(i) {
    var tp = TELEPORTS[i]

    if (tp[0]()) {
        camera_pos = {x: -tp[2][0] * 250, y: -tp[2][1] * 250}

        updatePosition()
        drawCanvas()

        updateHTML()
    }
}

var tab = -1

function switchTab(i) {
    if (i == -1) {
        tab = -1
        el("infos-div").style.display = "none"
        return
    }
    var t = TABS[i]
    if (t.unl()) {
        tab = i

        var info = el("infos-div")
        info.style.display = "block"
        info.style.width = t.width ?? "300px"
        updateTabsHTML()
    }
}

function setupTabsHTML() {
    el("tabs-div").innerHTML = TABS.map((t,i) => `<button id="tab-${i}" onclick="switchTab(${i})">${t.name ?? ""}</button>`).join("")
    el("infos-div").innerHTML += TABS.map((t,i) => `<div id="info-${i}">${t.html ?? ""}</div>`).join("")
}

function updateTabsHTML() {
    TABS.forEach((t,i) => {
        el('tab-' + i).style.display = el_display(t.unl())
        if (tab > -1) {
            el("info-" + i).style.display = el_display(i === tab)
            if (i === tab) t.updateHtml?.()
        }
    })
}