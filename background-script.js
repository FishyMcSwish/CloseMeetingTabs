const zoomSuccessRegex = /^((http[s]?):\/)?\/?((\/\w+)*)(.*)(zoom.us)((\/\w+)*\/)(.*)?(status=|#)success$/
const webexRegex = /^.*\.webex\.com.*\/meeting\/.*$/
const liveShareRegex = /https:\/\/prod\.liveshare\.vs.*\.visualstudio\.com\/join\?.*/
const pragliRegex = /^.*pragli\.com\/team.*$/


function closeMeetingTab(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        if (zoomSuccessRegex.test(changeInfo.url)) {
			setKillTabAlarm(tabId)
        }
        if (webexRegex.test(changeInfo.url)) {
			setKillTabAlarm(tabId)
        }
        if (liveShareRegex.test(changeInfo.url)) {
			setKillTabAlarm(tabId)
        }
        if (pragliRegex.test(changeInfo.url)) {
			setKillTabAlarmSlow(tabId);
        }
    }
}

function setKillTabAlarm(tabId){
	browser.alarms.create("killZoom" + tabId, {delayInMinutes:0.1});
}
function setKillTabAlarmSlow(tabId){
	browser.alarms.create("killZoom" + tabId, {delayInMinutes:0.3});
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

