// get all tabs from current window and add them to page
chrome.tabs.getAllInWindow(null, function(tabs) {
	tabs.forEach(function(tab){
		myFunction(tab.url);
	});
});

function myFunction(tablink) {
	if ( tablink.substring(0, 4) == "http" ) {
		// console.log(tablink);
		var urlList  = document.getElementById("urlList"),
			oNewNode = document.createElement("li");
		urlList.appendChild(oNewNode);
		oNewNode.innerText = tablink;
	}
}