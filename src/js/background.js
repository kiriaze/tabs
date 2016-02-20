(function () {

	setBrowserAction();

})();

function setBrowserAction() {
	// extension icon on click open index
	chrome.browserAction.onClicked.addListener(function () {
		chrome.tabs.create({
			url: chrome.extension.getURL('/src/index.html#/?shortcut=true')
		}, _noop);
	});
}

function _noop() {}







//
// Context Menu
//

// The onClicked callback function.
function onClickHandler(info, tab) {

	var url = '';

	switch ( info.menuItemId ) {
		case "radio1":
		case "radio2":
			// do it
			console.log("radio item " + info.menuItemId +
			" was clicked (previous checked state was "  +
				info.wasChecked + ")");
		break;

		case "checkbox1":
		case "checkbox2":
			// do it
			console.log(JSON.stringify(info));
			console.log("checkbox item " + info.menuItemId +
				" was clicked, state is now: " + info.checked +
				" (previous state was " + info.wasChecked + ")");
		break;

		case "add_all_tabs":

			chrome.tabs.getAllInWindow(null, function(tabs) {
				tabs.forEach(function(tab){
					if ( tab.url.substring(0, 4) == "http" ) {
						console.log(tab.url);
					}
				});
			});

		break;

		// add one tab
		default:

			console.log("item " + info.menuItemId + " was clicked");
			console.log("info: " + JSON.stringify(info));
			console.log("tab: " + JSON.stringify(tab));

			url = info.pageUrl;
			url = info.mediaType === "image" ? info.srcUrl : url;
			url = info.linkUrl ? info.linkUrl : url;

			console.log(url);

	}

};


// run on click
chrome.contextMenus.onClicked.addListener(onClickHandler);


// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {

	chrome.contextMenus.create({
		"title": "Display Tabs",
		"id": "display_tabs"
	});

	chrome.contextMenus.create({
		"title": "Add Tab",
		"contexts": ["page", "selection", "image", "link"],
		"id": "add_tab"
	});

	chrome.contextMenus.create({
		"title": "Add all to Tabs",
		"id": "add_all_tabs"
	});

	chrome.contextMenus.create({
		"type": "separator",
		"id": "separator",
	});

	// Create one test item for each context type.
	// e.g. selection would be when user selects/highights text on page,
	// then control + click or secondary click (browser contextual menu)
	// will display a unique action for selection.
	var contexts = [
		"page",
		"frame",
		"selection",
		"link",
		"editable",
		"image",
		"video",
		"audio",
		"browser_action",
		"page_action"
	];

	for ( var i = 0; i < contexts.length; i++ ) {

		var context = contexts[i],
			title   = "Test '" + context + "' menu item",
			id      = chrome.contextMenus.create({
				"title": title,
				"contexts":[context],
				"id": "context_" + context
			});

		console.log("'" + context + "' item:" + id);

	}

	// Create a parent item and two children.
	chrome.contextMenus.create({
		"title": "Named Tab Groups",
		"id": "parent"
	});

	chrome.contextMenus.create({
		"title": "Child 1",
		"parentId": "parent",
		"id": "child1"
	});

	chrome.contextMenus.create({
		"title": "Child 2",
		"parentId": "parent",
		"id": "child2"
	});

	console.log("parent child1 child2");

	// // Create some radio items.
	// chrome.contextMenus.create({"title": "Radio 1", "type": "radio",
	// 	"id": "radio1"});
	// chrome.contextMenus.create({"title": "Radio 2", "type": "radio",
	// 	"id": "radio2"});
	// console.log("radio1 radio2");

	// // Create some checkbox items.
	// chrome.contextMenus.create(
	// 	{"title": "Checkbox1", "type": "checkbox", "id": "checkbox1"});
	// chrome.contextMenus.create(
	// 	{"title": "Checkbox2", "type": "checkbox", "id": "checkbox2"});
	// console.log("checkbox1 checkbox2");

});