// 1. Selectam elementele din HTML cu care vom interactiona
const formular = document.getElementById('formular-recrutare');
const mesajStatus = document.getElementById('mesaj-status');

// 2. Adaugam un "ascultator" pentru momentul in care cineva apasa pe butonul de Trimite
formular.addEventListener('submit', function(eveniment) {
    
    // Oprim comportamentul standard al formularului (care ar fi sa reincarce pagina)
    eveniment.preventDefault();

    // Afisam un mesaj temporar de incarcare
    mesajStatus.style.color = '#333';
    mesajStatus.textContent = 'Se trimite inscrierea...';

    // 3. Adunam toate datele introduse in formular
    const dateFormular = new FormData(formular);

    // 4. AICI INTERVINE API-ul: Folosim fetch pentru a trimite datele
    // INLOCUIESTE LINK-UL DE MAI JOS cu Endpoint-ul tau de la Formspree!
    fetch('https://formspree.io/f/mbgdvpny', {
        method: 'POST', // Metoda POST inseamna ca trimitem date catre server
        body: dateFormular, // Acestea sunt datele din formular
        headers: {
            'Accept': 'application/json' // Ii spunem API-ului sa ne raspunda in format JSON
        }
    })
    .then(raspuns => {
        // 5. Ce se intampla DUPA ce API-ul a primit datele
        if (raspuns.ok) {
            // Daca raspunsul de la server este pozitiv (succes)
            mesajStatus.style.color = '#34a064'; // Text verde
            mesajStatus.textContent = 'Felicitari! Te-ai inscris cu succes. Te vom contacta in curand!';
            formular.reset(); // Golim casutele formularului
        } else {
            // Daca API-ul ne da o eroare (de ex. link gresit)
            mesajStatus.style.color = '#8B0000'; // Text rosu
            mesajStatus.textContent = 'A aparut o problema la trimitere. Te rugam sa incerci din nou.';
        }
    })
    .catch(eroare => {
        // 6. Ce se intampla daca nu exista conexiune la internet
        mesajStatus.style.color = '#8B0000';
        mesajStatus.textContent = 'Eroare de conexiune. Verifica internetul si incearca iar.';
    });
});