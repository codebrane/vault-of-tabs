function saveTabsInVault(tabs) {
	var master = [];
  for (let tab of tabs) {
		master.push(
			{
				index: tab.index,
				title: tab.title,
				url: tab.url,
				// lastAccessed: new Date(tab.lastAccessed)
				lastAccessed: moment(tab.lastAccessed).format('dddd MMMM Do YYYY, HH:mm:ss')
			}
		);
  }
	
	var blob = new Blob([JSON.stringify(master, null, 2)], {type : 'application/json'});
	browser.downloads.download({
			url: URL.createObjectURL(blob),
			filename: getDate() + ".json",
			saveAs: true
		}
	);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function saveTabs() {
	var findAllTheTabs = browser.tabs.query({});
	findAllTheTabs.then(saveTabsInVault, onError);	
}

function getDate() {
	var now = new Date();
	var tabsDate = now.toISOString().split("T")[0] + "-" + now.toTimeString().split(" ")[0];
	return tabsDate.replace(":", "-").replace(":", "-");
}

browser.browserAction.onClicked.addListener(saveTabs);
