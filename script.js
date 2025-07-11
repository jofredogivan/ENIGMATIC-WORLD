// script.js - Lógica da Tela de Início

document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("startGameBtn");
    const playerNameInput = document.getElementById("playerNameInput");

    // Limpa totalPoints e currentPhase ao iniciar um novo jogo
    localStorage.removeItem("totalPoints");
    localStorage.removeItem("currentPhase");

    startGameBtn.addEventListener("click", () => {
        const playerName = playerNameInput.value.trim();

        if (playerName) {
            localStorage.setItem("playerName", playerName);
            localStorage.setItem("totalPoints", "0");
            localStorage.setItem("currentPhase", "1"); // Define a fase inicial como 1

            // --- IMPORTANTE: NAVEGAÇÃO AJUSTADA PARA IFRAME ---
            // Diz ao PARENT (main.html) para carregar a fase1.html no iframe
            if (window.parent && window.parent.document.getElementById('gameFrame')) {
                window.parent.document.getElementById('gameFrame').src = "fase1.html";
            } else {
                // Fallback para caso não esteja em um iframe (útil para testes diretos)
                window.location.href = "fase1.html";
            }
        } else {
            alert("Por favor, digite seu nome para iniciar a aventura!");
        }
    });
});

// Listener para receber o estado da música do PARENT (main.html)
window.addEventListener('message', (event) => {
    // Garante que a mensagem vem do parent e tem o tipo correto
    if (event.source === window.parent && event.data && event.data.type === 'musicState') {
        localStorage.setItem("isMusicPlaying", event.data.isPlaying);
        // Não precisamos fazer mais nada aqui, pois o main.html já lida com a reprodução
    }
});
