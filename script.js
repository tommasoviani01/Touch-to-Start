/*

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("scopri");
  
  btn.addEventListener("click", () => {
    document.getElementById("servizi").scrollIntoView({ 
      behavior: "smooth" 
    });
  });
});
*/


// 0. INIT
// Facciamo partire il tutto quando il contenuto della pagina è stato caricato
document.addEventListener("DOMContentLoaded", function () {
  // =================================================================================
  // 1. SELEZIONE DEGLI ELEMENTI E IMPOSTAZIONI INIZIALI
  // =================================================================================

  // Selezioniamo il pulsante per scorrere alla slide precedente usando la sua classe CSS.
  var prevButton = document.querySelector(".prev-slide");

  // Selezioniamo il pulsante per scorrere alla slide successiva.
  var nextButton = document.querySelector(".next-slide");

  // Selezioniamo tutti gli elementi con la classe '.slide'.
  // 'querySelectorAll' restituisce una NodeList, quindi usiamo 'Array.from()'
  // per convertirla in un vero e proprio array, più facile da manipolare.
  var slides = Array.from(document.querySelectorAll(".slide"));

  // Selezioniamo il contenitore dove inseriremo i pallini di navigazione (i "dots").
  var dotsContainer = document.querySelector(".slider-dots");

  // Creiamo una variabile per tenere traccia dell'indice della slide attualmente visibile.
  // Iniziamo dalla prima slide, che ha indice 0.
  var currentIndex = 0;

  // =================================================================================
  // 2. FUNZIONI PRINCIPALI
  // =================================================================================

  /**
   * Funzione per "attivare" una slide. Rende visibile la slide corrispondente all'indice passato.
   */
  function activateSlide(index) {
    // Se stiamo già mostrando la slide richiesta, non facciamo nulla.
    // Questo previene lavoro non necessario.
    if (index === currentIndex) return;

    // Aggiorniamo l'indice corrente con il nuovo indice.
    currentIndex = index;

    // Usiamo il metodo 'scrollIntoView()' per dire al browser di scorrere
    // il contenitore fino a rendere completamente visibile la slide richiesta,
    // allineandola al centro orizzontale della viewport.

    slides[index].scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });

    var dots = document.querySelectorAll(".dot");
    var dot = dots[index];
    var oldDot=document.querySelector(".active");
    if (oldDot!==null) {
      oldDot.classList.remove("active");
    }

    dot.classList.add("active");
  }

  /**
   * Funzione per passare alla slide precedente.
   */
  function goToPrev() {
    var newIndex;

    // Controlliamo se la slide corrente è la prima (indice > 0).
    if (currentIndex > 0) {
      // Se non è la prima, calcoliamo l'indice precedente semplicemente sottraendo 1.
      newIndex = currentIndex - 1;
    } else {
      // Se è la prima, creiamo un "loop": l'indice diventa quello dell'ultima slide.
      newIndex = slides.length - 1;
    }

    // Chiamiamo la funzione principale per mostrare la nuova slide.
    activateSlide(newIndex);
  }

  /**
   * Funzione per passare alla slide successiva.
   */
  function goToNext() {
    var newIndex;

    // Controlliamo se la slide corrente NON è l'ultima.
    // L'indice dell'ultima slide è sempre 'lunghezza dell'array - 1'.
    if (currentIndex < slides.length - 1) {
      // Se non è l'ultima, calcoliamo l'indice successivo aggiungendo 1.
      newIndex = currentIndex + 1;
    } else {
      // Se è l'ultima, creiamo un "loop": l'indice torna a 0 (la prima slide).
      newIndex = 0;
    }

    // Chiamiamo la funzione principale per mostrare la nuova slide.
    activateSlide(newIndex);
  }

  // =================================================================================
  // 3. COLLEGAMENTO DEGLI EVENTI (EVENT LISTENERS)
  // =================================================================================

  // Aggiungiamo un "ascoltatore di eventi" al pulsante "precedente".
  // Quando l'utente fa "click", viene eseguita la funzione 'goToPrev'.
  prevButton.addEventListener("click", goToPrev);

  // Facciamo la stessa cosa per il pulsante "successivo".
  // Al "click", viene eseguita la funzione 'goToNext'.
  nextButton.addEventListener("click", goToNext);

  // =================================================================================
  // 4. CREAZIONE DINAMICA DEI PALLINI (DOTS)
  // =================================================================================

  // Usiamo il metodo 'forEach' per eseguire un'azione per ogni slide presente nel nostro array.
  slides.forEach(function (slide, index) {
    // Per ogni slide, creiamo un nuovo elemento HTML <button>.
    var dot = document.createElement("button");

    // Aggiungiamo la classe CSS '.dot' al pulsante appena creato per dargli uno stile.
    dot.classList.add("dot");
    if (index === 0) {
      dot.classList.add("active");
    }

    // Inseriamo il pallino appena creato all'interno del suo contenitore.
    dotsContainer.appendChild(dot);

    // Aggiungiamo un "ascoltatore di eventi" al pallino.
    // Quando l'utente fa "click" su questo specifico pallino...
    dot.addEventListener("click", function () {
      // ...chiamiamo la funzione 'activateSlide' passando l'indice
      // della slide a cui questo pallino corrisponde.
      activateSlide(index);
    });
  });
});
