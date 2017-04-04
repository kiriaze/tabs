// get all tabs from current window and add them to page
chrome.tabs.getAllInWindow(null, function(tabs) {
	tabs.forEach(function(tab){
		// console.log(tab);
		addTab(tab);
	});
});

function addTab(tab) {
	// console.log();
	if ( tab.url.substring(0, 4) != 'http' ) return;

	var tabList     = document.querySelector('.tab-list'),
		listItem    = document.createElement('li'),
		favicon     = document.createElement('img'),
		itemAnchor  = document.createElement('a');

	tabList.appendChild(listItem);
	listItem.appendChild(itemAnchor);
	listItem.insertBefore(favicon, itemAnchor);
	
	favicon.setAttribute('src', tab.favIconUrl);
	itemAnchor.setAttribute('href', tab.url);
	itemAnchor.setAttribute('target', '_new');
	
	itemAnchor.innerText = tab.title;

}



let containers = [
	document.querySelector('.tab-list')
];
dragula(containers, {
	// isContainer: function (el) {
	// 	return false; // only elements in drake.containers will be taken into account
	// },
	// moves: function (el, source, handle, sibling) {
	// 	return true; // elements are always draggable by default
	// },
	// accepts: function (el, target, source, sibling) {
	// 	return true; // elements can be dropped in any of the `containers` by default
	// },
	// invalid: function (el, handle) {
	// 	return false; // don't prevent any drags from initiating by default
	// },
	// direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
	// copy: false,                       // elements are moved by default, not copied
	// copySortSource: false,             // elements in copy-source containers can be reordered
	// revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
	// removeOnSpill: false,              // spilling will `.remove` the element, if this is true
	// mirrorContainer: document.body,    // set the element that gets mirror elements appended
	// ignoreInputTextSelection: true     // allows users to select input text, see details below
});