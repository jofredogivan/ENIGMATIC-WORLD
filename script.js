// script.js - Lógica da Tela de Início

document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("startGameBtn");
    const playerNameInput = document.getElementById("playerNameInput");

    localStorage.removeItem("totalPoints");
    localStorage.removeItem("currentPhase");

    startGameBtn.addEventListener("click", () => {
        const playerName = playerNameInput.value.trim();

        if (playerName) {
            localStorage.setItem("playerName", playerName);
            localStorage.setItem("totalPoints", "0");
            localStorage.setItem("currentPhase", "1"); 

            if (window.parent && window.parent.document.getElementById('gameFrame')) {
                window.parent.document.getElementById('gameFrame').src = "fase1.html";
            } else {
                window.location.href = "fase1.html";
            }
        } else {
            alert("Por favor, digite seu nome para iniciar a aventura!");
        }
    });
});

window.addEventListener('message', (event) => {
    if (event.source === window.parent && event.data && event.data.type === 'musicState') {
        localStorage.setItem("isMusicPlaying", event.data.isPlaying);
    }
});
