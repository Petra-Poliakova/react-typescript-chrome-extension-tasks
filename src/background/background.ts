chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log('msg', msg)
    console.log('sender', sender)
    sendResponse('From the background script!')

})

chrome.alarms.create("taskTimer", {
    periodInMinutes: 1/60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "taskTimer") {
        chrome.storage.local.get(["timer", "isRunning"], (res) => {
            if (res.isRunning) {
                let timer = res.timer + 1
                console.log(timer)
                chrome.storage.local.set({
                    timer,
                })
            }
        })
    }
})

chrome.storage.local.get(["timer", "isRunning"], (res) => {
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0,
        isRunning: "isRunning" in res ? res.isRunning : false,
     })
})