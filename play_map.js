const commonScript = document.createElement("script");
commonScript.src = chrome.runtime.getURL("common-injected.js");
document.documentElement.appendChild(commonScript);

const script = document.createElement("script");
script.src = chrome.runtime.getURL("play_map-injected.js");
document.documentElement.appendChild(script);
