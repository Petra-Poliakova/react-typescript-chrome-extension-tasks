// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     console.log('msg', msg)
//     console.log('sender', sender)
//     sendResponse('From the background script!')

// })

chrome.alarms.create("taskTimer", {
    periodInMinutes: 1/60,
})

chrome.alarms.onAlarm.addListener((alarm: chrome.alarms.Alarm) => {
    if (alarm.name === "taskTimer") {
        chrome.storage.local.get(["timer", "isRunning"], (res) => {
            if (res.isRunning) {
                let timer: number = res.timer + 1
                let isRunning: boolean = true
                if (timer === 60 * 25) {
                    chrome.notifications.create({
                        type: 'basic',
                        iconUrl: 'icon.png',
                        title: 'Task Timer',
                        message: '25 minutes haspassed!'
                    })
                    //    this.registration.showNotification("Task Timer", {
                    //      body: "25 minutes haspassed!",
                    //      icon: "icon.png",
                    //  })
                    //timer = 0;
                    isRunning = false
                }

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