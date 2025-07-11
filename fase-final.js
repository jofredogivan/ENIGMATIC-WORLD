// fase-final.js - Lógica da Tela Final do Jogo

document.addEventListener("DOMContentLoaded", () => {
    const finalGreetingElement = document.getElementById("finalGreeting");
    const finalScoreDisplay = document.getElementById("finalScoreDisplay");
    const finalMessageElement = document.getElementById("finalMessage");
    const restartGameBtn = document.getElementById("restartGameBtn");

    const playerName = localStorage.getItem("playerName") || "Explorador";
    const totalPoints = parseInt(localStorage.getItem("totalPoints") || "0");

    finalGreetingElement.innerText = `Parabéns, ${playerName}!`;
    finalScoreDisplay.textContent = totalPoints;

    if (totalPoints >= 100) { 
        finalMessageElement.innerText = "Você desvendou os maiores mistérios das eras com sabedoria e perspicácia!";
    } else if (totalPoints >= 50) {
        finalMessageElement.innerText = "Sua mente perspicaz o guiou através dos desafios históricos.";
    } else {
        finalMessageElement.innerText = "Sua jornada foi um aprendizado, e novos desafios esperam por você.";
    }

    restartGameBtn.addEventListener("click", () => {
        localStorage.clear(); 
        // --- IMPORTANTE: NAVEGAÇÃO AJUSTADA PARA IFRAME ---
        // Diz ao pai (main.html) para carregar o index.html no iframe para recomeçar
        if (window.parent && window.parent.document.getElementById('gameFrame')) {
            window.parent.document.getElementById('gameFrame').src = "index.html";
        } else {
            // Fallback
            window.location.href = "index.html";
        }
    });
});
