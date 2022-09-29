function retrieveCanvasData() {
	let grassCanv = document.getElementById("grass_canvas")
	if (grassCanv===undefined||grassCanv===null) return false;
    grass_canvas = grassCanv
	grass_ctx = grass_canvas.getContext("2d");
    grass_rect = grass_canvas.getBoundingClientRect()
	return true;
}

function retrieveCanvasData2() {
	let treeCanv = document.getElementById("star_chart_canvas")
	if (treeCanv===undefined||treeCanv===null) return false;
    tree_canvas = treeCanv
	tree_ctx = tree_canvas.getContext("2d");
	tree_rect = tree_canvas.getBoundingClientRect()
	return true;
}

function resizeCanvas() {
    if (!retrieveCanvasData()) return
	grass_canvas.width = 0;
	grass_canvas.height = 0;
	grass_canvas.width = grass_canvas.clientWidth
	grass_canvas.height = grass_canvas.clientHeight
}

function resizeCanvas2() {
    if (!retrieveCanvasData2()) return
	tree_canvas.width = 0;
	tree_canvas.height = 0;
	tree_canvas.width = tree_canvas.clientWidth
	tree_canvas.height = tree_canvas.clientHeight
}