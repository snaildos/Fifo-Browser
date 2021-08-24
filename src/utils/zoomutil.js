const electron = require("electron");

// Import BrowserWindow using Electron remote
const BrowserWindow = electron.remote.BrowserWindow;
let win = BrowserWindow.getFocusedWindow();

// let win = BrowserWindow.getAllWindows()[0];

// If reduced below Minimum value
// Error - 'zoomFactor' must be a double greater than 0.0
win.webContents.setZoomFactor(1.0);

// Upper Limit is working of 500 %
win.webContents
	.setVisualZoomLevelLimits(1, 5)
	.then(console.log("Zoom Levels Have been Set between 100% and 500%"))
	.catch((err) => console.log(err));

win.webContents.on("zoom-changed", (event, zoomDirection) => {
	console.log(zoomDirection);
	var currentZoom = win.webContents.getZoomFactor();
	console.log("Current Zoom Factor - ", currentZoom);
	// console.log('Current Zoom Level at - '
	// , win.webContents.getZoomLevel());
	console.log("Current Zoom Level at - ", win.webContents.zoomLevel);

	if (zoomDirection === "in") {
		
		// win.webContents.setZoomFactor(currentZoom + 0.20);
		win.webContents.zoomFactor = currentZoom + 0.2;

		console.log("Zoom Factor Increased to - "
					, win.webContents.zoomFactor * 100, "%");
	}
	if (zoomDirection === "out") {
		
		// win.webContents.setZoomFactor(currentZoom - 0.20);
		win.webContents.zoomFactor = currentZoom - 0.2;

		console.log("Zoom Factor Decreased to - "
					, win.webContents.zoomFactor * 100, "%");
	}
});
