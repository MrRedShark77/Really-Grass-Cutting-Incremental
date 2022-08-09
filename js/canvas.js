function retrieveCanvasData() {
	let grassCanv = document.getElementById("grass_canvas")
	if (grassCanv===undefined||grassCanv===null) return false;
    grass_canvas = grassCanv
	grass_ctx = grass_canvas.getContext("2d");
    grass_rect = grass_canvas.getBoundingClientRect()
	return true;
}

function resizeCanvas() {
    if (!retrieveCanvasData()) return
	grass_canvas.width = 0;
	grass_canvas.height = 0;
	grass_canvas.width = grass_canvas.clientWidth
	grass_canvas.height = grass_canvas.clientHeight
}