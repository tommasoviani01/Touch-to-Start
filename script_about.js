document.querySelector('.contact-form').addEventListener('submit', function(event) {
    // Impedisce l'invio tradizionale del form
    event.preventDefault(); 
    
    // Recupera i valori del form
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const messaggio = document.getElementById('messaggio').value;

    // Semplice controllo di validazione
    if (nome === '' || email === '' || messaggio === '') {
        alert('Per favore, compila tutti i campi richiesti.');
        return; // Ferma l'esecuzione se i campi sono vuoti
    }

    // Qui andrebbe il codice per inviare i dati a un server (es. fetch API)

    // Messaggio di successo
    alert(`Grazie per il tuo messaggio, ${nome}! Ti risponderemo al più presto, controlla la tua casella di posta.`);
    
    // Resetta il form
    this.reset();
});