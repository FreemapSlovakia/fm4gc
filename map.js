const commonScript = document.createElement("script");
commonScript.src = chrome.runtime.getURL("common-injected.js");
document.documentElement.appendChild(commonScript);

const script = document.createElement("script");
script.src = chrome.runtime.getURL("map-injected.js");
document.documentElement.appendChild(script);
