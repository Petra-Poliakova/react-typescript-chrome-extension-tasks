import React, { useEffect, useState } from 'react';
import './popup.css';

interface  Task{ 
 id: string,
 text: string
}

interface TimerData {
  minutes: string,
  seconds: string
}

function Popup() { 
const [tasks, setTasks] = useState<Task[]>([]);
const [newTask, setNewTask] = useState('');
const [time, setTime] = useState<TimerData>({ minutes: "25", seconds: "00" });

// useEffect(()=>{
//   chrome.storage.local.get(['tasks', 'timer'], (result)=> {
//     if (result.tasks) {
//       setTasks(result.tasks);
//     }
//     if (result.timer !== undefined) {
//       setTime(result.timer)
//     }
//   })
// },[]);

useEffect(()=>{
  chrome.storage.local.get(['tasks'], (result)=> {
    if (result.tasks) {
      setTasks(result.tasks);
    }
  })
},[]);

useEffect(()=> {
  setInterval(()=>updatedTime(), 1000 )
}, [time]);

// const updatedTime = () => {
//   chrome.storage.local.get(["timer"], (res) => {
//     if (res.timer !== undefined) {
//       setTime(res.timer)
//     }
    
//   })
// }
const updatedTime = () => {
    chrome.storage.local.get(["timer"], (res) => {
      //res.timer = 60 * 24 + 55;
      const minutes =  (25 - Math.ceil(res.timer / 60)).toString().padStart(2,"0");
      let seconds = "00";
      if (res.timer % 60 !== 0) {
       seconds = (60 - (res.timer % 60)).toString().padStart(2, "0");
      }
      setTime({ minutes, seconds })
      
    })
  }

const startTimerBtn = () => {
  chrome.storage.local.set({
    isRunning: true,
  })
}

const stopTimerBtn = () => {
  chrome.storage.local.set({
    isRunning: false,
  })
}

const resetTimerBtn = () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  })
}

const addTask = () => {
  if(newTask.trim() === '') return;
  const newTaskItem = {id: new Date().toISOString(),text: newTask};
  const updatedTasks  = [...tasks, newTaskItem]
  setTasks(updatedTasks );
  chrome.storage.local.set({ tasks: updatedTasks });
  setNewTask('');
}

const removeTask = (taskId: string) => {
 const updatedTasks  = tasks.filter((task) => task.id !== taskId);
 setTasks(updatedTasks );
 chrome.storage.local.set({tasks: updatedTasks });
}

  return (
    <div className="Popup">
     <h1>Task Timer</h1>
     <div className='imgBox'>
      <img src="icon.png" alt="timer" />
      </div>
      <div><h2>{`${time.minutes}:${time.seconds}`}</h2></div>
      <div className='timerBtn'>
        <button onClick={startTimerBtn}>Start</button>
        <button onClick={stopTimerBtn}>Stop</button>
        <button onClick={resetTimerBtn}>Reset</button>
      </div>
      <div className='addTaskBox'>
        <input type="text" placeholder='Enter a task..' value={newTask} onChange={(e)=> setNewTask(e.target.value)}/>
        <button onClick={addTask}>Add</button>
      </div>
      <div className='taskList'>
       <ul>
        {tasks.map((task, i)=> (
          <li className='taskItem' key={i}>
            <div className='task'>{task.text}</div>
            <button className='removeBtn' onClick={()=> removeTask(task.id)}>X</button>
          </li>
        ))}
       </ul>
       
      </div>
    </div>
  );
}

export default Popup;

//https://www.linkedin.com/pulse/creating-chrome-extension-react-step-by-step-guide-kevin-li
//Prečo Inštalácia webpack:  
//Chrome Extension má zvyčajne viacero súborov, ktoré zahrňujú HTML, CSS a preto je vhodné prispôsobiť konfiguráciu Webpacku  pre zabezpečenie optimálneho spracovania a balíčkovania rôznych typov súborov 
//Minifikácia a optimalizácia: Webpack poskytuje funkcie na minifikáciu kódu, čo znamená, že váš kód bude optimalizovaný pre efektívne načítavanie v prehliadači. To je obzvlášť dôležité pre rozšírenia, kde je rýchlosť a úspora miesta kritická.
//Vaše Chrome Extension môže závisieť na rôznych knižniciach a moduloch. Webpack umožňuje jednoduchú správu týchto závislostí a zabezpečuje, že sú zahrnuté iba potrebné súbory, čo znižuje veľkosť výsledného balíčka.
