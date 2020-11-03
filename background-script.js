var zoomSuccessRegex = /^((http[s]?):\/)?\/?((\/\w+)*)(.*)(zoom.us)((\/\w+)*\/)(.*)?(status=|#)success$/
var webexRegex = /^.*\.webex\.com.*\/meeting\/.*$/
var liveShareRegex = /https:\/\/prod\.liveshare\.vs.*\.visualstudio\.com\/join\?.*/

let delayInMinutes = 0.1

function closeMeetingTab(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        if (zoomSuccessRegex.test(changeInfo.url)) {
			browser.alarms.create("killZoom" + tabId, {delayInMinutes:delayInMinutes});
        }
        if (webexRegex.test(changeInfo.url)) {
			browser.alarms.create("killZoom" + tabId, {delayInMinutes:delayInMinutes});
        }
        if (liveShareRegex.test(changeInfo.url)) {
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

