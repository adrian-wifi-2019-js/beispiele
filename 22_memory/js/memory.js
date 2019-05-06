console.log('memory.js wurde geladen');

document.addEventListener('DOMContentLoaded', function(){
  const spalten = 4;
  const reihen = 4;
  const zahlen = [22, 5, 66, 5, 24, 66, 22, 24, 10, 10, 99, 99, 1, 1, 42, 42];
  let ersteKarte = null;

  document.getElementById('btn_start').onclick = erzeugeSpielfeld;

  function erzeugeSpielfeld (){
    const spielParent = document.getElementById('spiel');
    const spielGrid = document.createElement('div');

    spielParent.innerHTML = ''; // altes SpielGrid wird gelöscht

    spielGrid.classList.add('memory');

    for(let i = 0; i < spalten * reihen; i++ ){
      let karte = document.createElement('div');
      karte.onclick = karteGeklickt;
      karte.classList.add('karte');

      let inhalt = document.createElement('span');
      inhalt.innerText = zahlen[i];
      inhalt.style.display = 'none';

      karte.appendChild(inhalt);
      spielGrid.appendChild(karte);
    }

    spielParent.appendChild(spielGrid);
  } // Ende erzeugeSpielfeld

  function karteGeklickt(){
    let inhalt = this.firstElementChild;
    inhalt.style.display = 'inline';

    if(ersteKarte === null || ersteKarte === this){ // keine 1. Karte aufgedeckt...
      if(ersteKarte === this){ console.log('Mehrfach-Klick auf dieselbe Karte'); }

      ersteKarte = this;
    } else { // 2. Karte wurde aufgedeckt
      let inhaltErsteKarte = ersteKarte.firstElementChild;
      if(inhalt.innerText === inhaltErsteKarte.innerText){ // gleicher Inhalt
        // beide Karten bleiben aufgedeckt;
      } else { // verschiedener Inhalt
        setTimeout(
          function(){
            inhalt.style.display = 'none';
            inhaltErsteKarte.style.display = 'none';
          },
          2000 // delay in ms
        );
      }
      ersteKarte = null;
    }
  } // Ende karteGeklickt

}); // Ende DOMContentLoaded
