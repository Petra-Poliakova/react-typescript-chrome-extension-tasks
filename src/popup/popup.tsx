import React from 'react';
import './popup.css';

function Popup() {
  return (
    <div className="Popup">
     <h1>Hello world</h1>
    </div>
  );
}

export default Popup;

//https://www.linkedin.com/pulse/creating-chrome-extension-react-step-by-step-guide-kevin-li
//Prečo Inštalácia webpack:  
//Chrome Extension má zvyčajne viacero súborov, ktoré zahrňujú HTML, CSS a preto je vhodné prispôsobiť konfiguráciu Webpacku  pre zabezpečenie optimálneho spracovania a balíčkovania rôznych typov súborov 
//Minifikácia a optimalizácia: Webpack poskytuje funkcie na minifikáciu kódu, čo znamená, že váš kód bude optimalizovaný pre efektívne načítavanie v prehliadači. To je obzvlášť dôležité pre rozšírenia, kde je rýchlosť a úspora miesta kritická.
//Vaše Chrome Extension môže závisieť na rôznych knižniciach a moduloch. Webpack umožňuje jednoduchú správu týchto závislostí a zabezpečuje, že sú zahrnuté iba potrebné súbory, čo znižuje veľkosť výsledného balíčka.
