function tornaSu() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function setTemaIniziale() {//funzione per salvare il tema
  const temaSalvato = localStorage.getItem('theme');//memorizzo il tema
  const html = document.documentElement;
  const iconaTema = document.getElementById("icona-tema");//memorizza l'icona del tema
  const hamburger=document.getElementById("hamburger");
  if (temaSalvato === 'dark') {//se il tema è dark 
      html.classList.add('dark');//aggiungo alla pagina la classe dark 
      iconaTema.src = "img/moon.svg";//metto l'icona sole
      hamburger.src="img/hamburger-white.jpg";
  } else {//altrimenti
      html.classList.remove('dark');//rimuovo classe dark 
      iconaTema.src = "img/sun.png";//metto icona luna
      hamburger.src="img/hamburger-icon.png"
  }
}

// Funzione per cambiare il tema
function cambiaTema() {
  const html = document.documentElement;//prendo la pagina
  const iconaTema = document.getElementById("icona-tema");//memorizzo l'icona del tema 
  const hamburger=document.getElementById("hamburger");

  if (html.classList.contains("dark")) {//se la pagina contiene la classe dark 
      html.classList.remove("dark");//la rimuovo
      iconaTema.src = "img/sun.png";//metto la luna
      hamburger.src="img/hamburger-icon.png"
      localStorage.setItem('theme', 'light');//setto il tema del localStorage a light
  } else {//altrimenti
      html.classList.add("dark");//aggiungo alla pagina la classe dark
      iconaTema.src = "img/moon.svg";//metto icona sole
      hamburger.src="img/hamburger-white.jpg";
      localStorage.setItem('theme', 'dark');//setto il tema del localStorage a dark
  }
}

function toggleMenu() {
  const mobileMenu = document.getElementById('mobile-menu');//prendo il menu
  if (mobileMenu.classList.contains('hidden')) {//se è nascosto
      mobileMenu.classList.remove('hidden');//lo mostro
  } else {//altrimenti
      mobileMenu.classList.add('hidden');//lo nascondo
  }
}

window.onload = function() {//quando si carica la finestra
  setTemaIniziale(); // Imposta il tema salvato
  const modal = document.getElementById('benvenutoPopup');//prendo il popup
  modal.classList.remove('hidden');//lo rendo visibile
  modal.querySelector('div').classList.add('popup-animazione');//aggiungo l'animazione al popup
}

// Chiusura modal con il pulsante
document.getElementById('chiudiPopupBenvenuto').addEventListener('click', function() {//prendo il click sul pulsante per chiuderlo
  const modal = document.getElementById('benvenutoPopup');//prendo il popup
  modal.classList.add('hidden');//lo rendo nascosto
});

function elementoVisibile(el) {// verifica se un elemento è visibile
  // Ottiene le dimensioni e la posizione dell'elemento rispetto alla finestra di visualizzazione
  const rect = el.getBoundingClientRect();//con le priorità di rect prendo la posizione dell'elemento
  return (//returna true se l'elemento è visibile se no false
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0 //verifica se sia la parta superiore che  inferiore dell'elemento sia visibile
  );
}

function gestisciAnimazioniSezioni() {
  const sezioni = document.querySelectorAll('.contenuto-sezione');//prendo tutti i contenuti delle sezioni
  for (let i = 0; i < sezioni.length; i++) {//scorro gli elementi
      if (elementoVisibile(sezioni[i])) {//se l'elemento è visibile
          sezioni[i].classList.add('visibile');//lo metto vìisibile e parte l'animazione
      }
  }
}
// Aggiungi gli event listener per controllare quando le sezioni diventano visibili
window.addEventListener('scroll', gestisciAnimazioniSezioni);
window.addEventListener('load', gestisciAnimazioniSezioni);

document.querySelector('form[name="Contattami"]').addEventListener('submit', function(event) {//prendo il submit del form
  event.preventDefault();//prevenisco il default
  const risposta = grecaptcha.getResponse();//prendo la risposta del recaptcha
  const paginaEng = window.location.pathname.includes('/Portfolio/indexEng.html');//prendo il link della pagina inglese
  const recaptchaModal = document.getElementById('recaptchaModal');//prendo il popup
  const recaptchaMessage = document.getElementById('recaptchaMessage');//prendo il messaggio del popup
  if (risposta.length === 0) {//se la risposta del recaptcha è vuota
    if (paginaEng) {//se la pagina è inglese
      recaptchaMessage.textContent = "Please complete the reCAPTCHA verification";
    }else{//altrimenti
      recaptchaMessage.textContent = "Per favore, completa il reCAPTCHA";
    }
      recaptchaModal.classList.remove('hidden');//rendo il popup visibile
      recaptchaModal.querySelector('div').classList.add('modal-animation');//aggiungo l'animazione al popup
      return false;//returno false per fermare il submit
  }
  
  this.submit();
});
document.getElementById('closeRecaptcha').addEventListener('click', function() {//prendo il click del close del popup
  const recaptchaModal = document.getElementById('recaptchaModal');//prendo il popup
  recaptchaModal.classList.add('hidden');//lo rendo non visibile
});

