const settingsList = ["canvasplus-setting-quicklink", "canvasplus-setting-search", "canvasplus-setting-smartscroll", "canvasplus-display-appearance", "canvasplus-setting-navigator", "canvasplus-setting-convopeeker", "canvasplus-setting-sidebar-hidelogo", "canvasplus-setting-sidebar-color", "canvasplus-setting-sidebar-size-toggle", "canvasplus-setting-linkcolor-toggle"];
let settings = {};

chrome.storage.local.get(settingsList, function(data) {
  settings = data;
  if(Object.entries(data).length < settingsList.length)
  {
    console.log(Object.entries(data).length, settingsList.length, data);
    chrome.storage.local.set({"canvasplus-setting-quicklink": true, "canvasplus-setting-search": true, "canvasplus-setting-smartscroll": true, "canvasplus-display-appearance": "light", "canvasplus-setting-navigator": false, "canvasplus-setting-convopeeker": true, "canvasplus-setting-sidebar-hidelogo": false, "canvasplus-setting-sidebar-color": '', "canvasplus-setting-sidebar-size-toggle": false, "canvasplus-setting-linkcolor-toggle": false});
  }
});

function checkSettingsChange() {
  chrome.storage.local.get(settingsList, function(data) {
    if(JSON.stringify(settings) != JSON.stringify(data)){
      alert.style.opacity = "1";
      alert.style.visibility = "visible";
      settings = data;
    }
  })
}

let alert = document.createElement("div");
alert.id = "canvasplus-alert";
alert.style.opacity = "0";
alert.style.visibility = "hidden";
alert.addEventListener("click", function (evt) {
  if (evt.target !== this)
    return;

  this.style.opacity = "0";
  this.style.visibility = "hidden";
});

let settingsUpdateBox = document.createElement("div");
settingsUpdateBox.id = "canvasplus-alert-settings-update"
settingsUpdateBox.innerHTML = "<h2>Canvas+ Settings were Changed</h2><p>Your changes will be applied once this page is reloaded.</p><br><button class='btn' onclick='location.reload()'>Reload</button>"

alert.appendChild(settingsUpdateBox);
document.body.insertBefore(alert, document.body.firstElementChild);

chrome.storage.local.get(["canvasplus-setting-search"], function(data) {
  if(data["canvasplus-setting-search"]) run();
});
