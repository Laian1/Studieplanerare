// --- meny funktioner ---
// Öppnar sidomenyn genom att göra den bredare
function openNav() {
    document.getElementById("side-menu").style.width = "300px";
}

// Stänger sidomenyn genom att gömma den igen
function closeNav() {
    document.getElementById("side-menu").style.width = "0";
}


// --- sidans logik ---
// Väntar tills hela sidan laddats innan vi kör JS
window.addEventListener('DOMContentLoaded', () => {
    
    const addBtn = document.getElementById("add-btn");
    const list = document.getElementById("homework-list");

    if (addBtn) {

        // Här sparar vi alla läxor i en lista så vi kan sortera dem
        let homeworks = [];

        addBtn.addEventListener("click", function() {

            // Hämtar allt som användaren skrivit/valt
            const subject = document.getElementById("subject").value;
            const day = document.getElementById("day").value;
            const priority = document.getElementById("priority").value;
            const text = document.getElementById("homework-text").value;

            // Kollar så att inget är tomt
            if (text.trim() === "" || subject === "" || day === "" || priority === "") {
                alert("Vänligen fyll i alla fält (inklusive prioritet)!");
                return;
            }

            // Skapar en "läxa" som ett objekt
            const newHomework = {
                subject,
                day,
                priority: parseInt(priority), // gör om till nummer så vi kan sortera
                text
            };

            // Lägger in läxan i listan
            homeworks.push(newHomework);

            // Sorterar så att viktigast (prio 1) kommer först
            homeworks.sort((a, b) => a.priority - b.priority);

            // Ritar om listan på sidan
            renderList();

            // Tömmer textfältet efter man lagt till
            document.getElementById("homework-text").value = "";
        });

        // Funktion som visar alla läxor på skärmen
        function renderList() {

            // Rensar listan först så vi inte dubblar
            list.innerHTML = "";

            // Går igenom alla läxor och skapar HTML för varje
            homeworks.forEach(hw => {
                const li = document.createElement("li");
                li.className = "homework-item";

                li.innerHTML = `
                    <input type="checkbox">
                    <span><strong>${hw.day}:</strong> ${hw.subject} - ${hw.text} (Prio: ${hw.priority})</span>
                `;

                list.appendChild(li);
            });
        }
    }
});


// --- kontrast för sidans tillgänglighet ---
// Väntar på att sidan laddas
window.addEventListener('DOMContentLoaded', () => {
    const contrastBtn = document.getElementById("contrast-toggle");

    if (contrastBtn) {

        // När man klickar byter vi mellan vanligt och högkontrast
        contrastBtn.addEventListener("click", () => {

            // Slår på/av CSS-klassen
            document.body.classList.toggle("high-contrast");
            
            // Byter text på knappen beroende på läge
            if (document.body.classList.contains("high-contrast")) {
                contrastBtn.textContent = "Vanligt läge";
            } else {
                contrastBtn.textContent = "Högkontrast";
            }
        });
    }
});


// Öppnar sidomenyn
function openNav() {
    document.getElementById("side-menu").style.width = "300px";
}

// Stänger sidomenyn
function closeNav() {
    document.getElementById("side-menu").style.width = "0";
}


// --- FOKUS-SIDANS LOGIK ---
// Kör när sidan laddats
window.addEventListener('DOMContentLoaded', () => {
    
    // Hämtar alla delar av timern
    const timerDisplay = document.getElementById("timer-time");
    const controlBtn = document.getElementById("timer-control");
    const durationRadios = document.querySelectorAll('input[name="focus-duration"]');

    let timerInterval;
    let secondsLeft;
    let isRunning = false;

    // Sätter starttid beroende på vad som är valt
    durationRadios.forEach(radio => {
        if (radio.checked) {
            secondsLeft = parseInt(radio.value) * 60;
            updateDisplay();
        }

        // Om man byter 25/50 min
        radio.addEventListener('change', () => {
            clearInterval(timerInterval);
            isRunning = false;
            controlBtn.textContent = "STARTA";
            secondsLeft = parseInt(radio.value) * 60;
            updateDisplay();
        });
    });

    // Visar tiden snyggt (00:00 format)
    function updateDisplay() {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;

        timerDisplay.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Start/stop knapp
    if (controlBtn) {
        controlBtn.addEventListener("click", () => {

            // Om timern inte körs → starta
            if (!isRunning) {
                isRunning = true;
                controlBtn.textContent = "STOPPA";

                timerInterval = setInterval(() => {
                    secondsLeft--;
                    updateDisplay();

                    // När tiden är slut
                    if (secondsLeft <= 0) {
                        clearInterval(timerInterval);
                        isRunning = false;
                        controlBtn.textContent = "STARTA";
                        alert("Dags för en paus!");
                    }
                }, 1000);

            } else {
                // Om den redan kör → stoppa
                clearInterval(timerInterval);
                isRunning = false;
                controlBtn.textContent = "STARTA";
            }
        });
    }
});


// --- KARTA (CAFe SÖK) ---
// Uppdaterar Google Maps beroende på vad användaren skriver
function updateMap() {
    const address = document.getElementById('user-address').value;
    const mapFrame = document.getElementById('cafe-map');
    
    if (address.trim() !== "") {

        // Gör om texten till en sökbar länk
        const searchQuery = encodeURIComponent("cafeer i " + address);
        
        // Bygger ny Google Maps-länk
        const newSrc = `https://maps.google.com/maps?q=${searchQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
        
        // Byter karta
        mapFrame.src = newSrc;

    } else {
        alert("Skriv in en stad eller adress först!");
    }
}