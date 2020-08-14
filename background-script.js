var zoomSuccessRegex = /^((http[s]?):\/)?\/?((\/\w+)*)(.*)(zoom.us)((\/\w+)*\/)(.*)?(status=|#)success$/
var webexRegex = /^.*\.webex\.com.*\/meeting\/.*$/


function closeZoomTab(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        if (zoomSuccessRegex.test(changeInfo.url)) {
			browser.alarms.create("killZoom" + tabId, {delayInMinutes:0.1});
        }
        if (webexRegex.test(changeInfo.url)) {
			browser.alarms.create("killZoom" + tabId, {delayInMinutes:0.1});
        }
    }
}

function handleAlarm(alarmInfo){
	const tabId = parseInt(alarmInfo.name.slice(8))
	browser.tabs.remove(tabId);
}
browser.tabs.onUpdated.addListener(closeZoomTab);
browser.alarms.onAlarm.addListener(handleAlarm);
