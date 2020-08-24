function saveOptions(e) {
	alert("saving");
  e.preventDefault();
  let seconds = document.querySelector("#seconds").value
	if(! isNan(parseInt(seconds))){
	  browser.storage.sync.set({
		  seconds: seconds
	 });
	}
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#seconds").value = result.seconds || "6";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("seconds");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

