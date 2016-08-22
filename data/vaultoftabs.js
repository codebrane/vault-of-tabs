var now = new Date();
var tabsDate = now.toISOString().split("T")[0] + "-" + now.toTimeString().split(" ")[0];
tabsDate = tabsDate.replace(":", "-").replace(":", "-");
document.getElementById("tabsDirName").value = tabsDate;
document.getElementById("tabsDirName").focus();
document.getElementById("appendDate").checked = false;
document.getElementById("progress").style.display = "none";

function saveTabs() {
  var tabsDir = document.getElementById("tabsDirName").value;
  if (document.getElementById("appendDate").checked) {
    tabsDir += "-" + tabsDate;
  }
  self.port.emit("saveMyTabs", tabsDir);
}

document.getElementById("tabsDirName").addEventListener("keyup", function(e){
  if (e.keyCode == 13) {
    saveTabs();
    return false;
  }
});

document.getElementById("saveTabsButton").addEventListener("click", function(){
	saveTabs();
});

var noOfTabs;
self.port.on("noOfTabs", function(data) {
  noOfTabs = data;
	document.getElementById("saveTabsButton").innerHTML = "Save " + noOfTabs + " tabs";
  document.getElementById("tabsStatus").max = noOfTabs;
});

self.port.on('starting', function() {
  document.getElementById("tabsDirName").disabled = true;
  document.getElementById("saveTabsButton").disabled = true;
  document.getElementById("appendDate").disabled = true;
  document.getElementById("progress").style.display = "block";
});

self.port.on('finished', function() {
  document.getElementById("tabsDirName").disabled = false;
  document.getElementById("saveTabsButton").disabled = false;
  document.getElementById("appendDate").disabled = false;
  document.getElementById("progress").style.display = "none";
  document.getElementById("tabsStatus").max = 0;
  document.getElementById("tabsStatus").value = 0;
});

self.port.on('getPanelWindowSize', function() {
	self.port.emit("panelWindowSize", {height: window.innerHeight, width: window.innerWidth});
});

self.port.on("status", function(totalTabsProcessed) {
  document.getElementById("tabsStatus").value = parseFloat(totalTabsProcessed);
});
