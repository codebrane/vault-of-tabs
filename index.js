var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var url = require("sdk/url");

const {Cu} = require("chrome");
const {TextDecoder, TextEncoder, OS} = Cu.import("resource://gre/modules/osfile.jsm", {});
const {atob, btoa} = Cu.import("resource://gre/modules/Services.jsm");
let { search } = require("sdk/places/history");

// tabs[0].url = "http://www.stravaiger.com";
// tabs.open("http://www.google.com");
// tabs.open("http://xe.com");

var button = buttons.ActionButton({
  id: "tabsaver-link",
  label: "Save Tabs",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: showPanel
});

var panel;
function showPanel(state) {
	panel = require("sdk/panel").Panel({
	  contentURL: "./vaultoftabs.html",
		contentScriptFile: "./vaultoftabs.js",
		contentStyleFile: "./vaultoftabs.css"
	});
	
	panel.show({
		position: button
	});
	
	panel.port.on("saveMyTabs", function(tabDirNameFromPanel) {
		panel.port.emit("starting");
		createTabsDir(tabDirNameFromPanel);
		saveTab(0);
	});
		
	panel.port.emit("noOfTabs", tabs.length);
}

var tabsDir;
var master;
var totalTabsProcessed;
var masterLookup;

function createTabsDir(tabDirNameFromPanel) {
	tabsDir = require('sdk/preferences/service').get(['extensions', require('sdk/self').id, 'tabsDir'].join('.'));
	
	// 2016-01-31-12-01-00
	tabsDir += "/" + tabDirNameFromPanel;

	OS.File.makeDir(tabsDir);

	master = [];
	totalTabsProcessed = 0;
	masterLookup = {};
}

var { setTimeout } = require("sdk/timers");
function saveTab(tabIndex) {
	let encoder = new TextEncoder();

	master.push({index: tabs[tabIndex].index, title: tabs[tabIndex].title, url: tabs[tabIndex].url});
	masterLookup[tabs[tabIndex].url] = tabIndex;

	search (
		// search doesn't work on some specific urls
	  { url: url.URL(tabs[tabIndex].url).host }
	).on("end", function (results) {
		if (results.length > 0) {
			for (var c=0; c < results.length; c++) {
				if (masterLookup[results[c].url] != null) {
					master[masterLookup[results[c].url]].time = new Date(results[c].time).toString();
					master[masterLookup[results[c].url]].searchTitle = results[c].title;
					master[masterLookup[results[c].url]].dateAdded = results[c].dateAdded;

					OS.File.writeAtomic(tabsDir + "/" + masterLookup[results[c].url] + ".json",
						encoder.encode(
							JSON.stringify(master[masterLookup[results[c].url]], null, 2)
						)
					);
				} // if (masterLookup[results[c].url])
			} // for (var c=0; c < results.length; c++)
		} // if (results.length > 0)
		
		OS.File.writeAtomic(tabsDir + "/master.json",
			encoder.encode(
				JSON.stringify(master, null, 2)
			)
		);

		totalTabsProcessed++;
		
		if (totalTabsProcessed == tabs.length) {
			panel.hide();
			panel.port.emit("finished");
			setTimeout(function() {
				panel.destroy();
			}, 1000);
		}
		else {
			setTimeout(function() {
				saveTab(tabIndex + 1);
			}, 0);
			panel.port.emit("status", totalTabsProcessed);
		}
	}); // search (
} // saveTab

// http://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers
function stringToUint8Array(str) {
	var buf = new ArrayBuffer(str.length*2);
	var bufView = new Uint8Array(buf);
	for (var i=0, strLen=str.length; i<strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;	
}
