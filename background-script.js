var zoomSuccessRegex = /^((http[s]?):\/)?\/?((\/\w+)*)(.*)(zoom.us)((\/\w+)*\/)(.*)?(status=|#)success$/
var webexRegex = /^.*\.webex\.com.*\/meeting\/.*$/

let delayInMinutes = 0.1

function closeMeetingTab(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        if (zoomSuccessRegex.test(changeInfo.url)) {
			browser.alarms.create("killZoom" + tabId, {delayInMinutes:delayInMinutes});
        }
        if (webexRegex.test(changeInfo.url)) {
			browser.alarms.create("killZoom" + tabId, {delayInMinutes:delayInMinutes});
        }
    }
}

function handleAlarm(alarmInfo){
	const tabId = parseInt(alarmInfo.name.slice(8))
	browser.tabs.remove(tabId);
}
browser.tabs.onUpdated.addListener(closeMeetingTab);
browser.alarms.onAlarm.addListener(handleAlarm);


function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  if (item.seconds) {
    let seconds = parseInt(item.seconds);
	delayInMinutes = seconds / 60;
  }
}

let getting = browser.storage.sync.get("seconds");
getting.then(onGot, onError);
