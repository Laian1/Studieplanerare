window.onload = function() {

    // --- DEL 1: MENYN (Hover effekt) ---
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.color = 'darkgrey';
            link.style.transform = 'scale(1.1)'; 
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.color = '#333';
            link.style.transform = 'scale(1)';
        });
    });

    // --- DEL 2: LÄXOR (Lägg till & Ta bort) ---
    const knapp = document.getElementById('laggTillBtn');
    const lista = document.getElementById('laxaLista');
    const laxaInput = document.getElementById('laxaInput');
    const dagInput = document.getElementById('dagInput');

    // Funktion för att skapa en ny läxa
    knapp.addEventListener('click', () => {
        if (laxaInput.value !== "") {
            const nyLaxa = document.createElement('li');
            
            // Vi lägger till texten och en liten instruktion
            nyLaxa.innerHTML = `<span><strong>${dagInput.value}:</strong> ${laxaInput.value}</span> <small>(Klicka för att ta bort)</small>`;
            
            // Lägg till funktionen att ta bort läxan när man klickar på den
            nyLaxa.addEventListener('click', () => {
                nyLaxa.remove();
            });

            lista.appendChild(nyLaxa);
            
            // Töm rutorna
            laxaInput.value = "";
            dagInput.value = "";
        } else {
            alert("Du måste skriva något i läx-rutan!");
        }
    });
};
