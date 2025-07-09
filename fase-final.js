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
        window.location.href = "index.html";
    });
});
