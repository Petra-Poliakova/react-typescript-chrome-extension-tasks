import React, { useEffect, useState } from 'react'

import './options.css'

const Options = () => {
  const [timeOption, setTimeOption] = useState<number>(25);

  useEffect(() => {
    chrome.storage.local.get(["timeOption"], (res) => {
      setTimeOption(res.timeOption || 25);
    })
  },[])

const onSaveOption = () => {
  chrome.storage.local.set({
    timer: 0,
    timeOption: timeOption,
    isRunning: false,
  })
}

  return (
    <div>
        <h1>Task Timer Options</h1>
        <label htmlFor="timeOption"> Deafult time in Minutes (1-60) 
        <input type="number" id="timeOption" min={1} max={60} step={1} value={timeOption} onChange={(e) => setTimeOption(e.target.valueAsNumber)}/>
        </label>
        <button onClick={onSaveOption}>Save Options</button>
        </div>
  )
}

export default Options