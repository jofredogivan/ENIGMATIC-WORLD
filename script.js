// script.js - Lógica da Tela Inicial (index.html)

document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById("playerName");
    const startGameBtn = document.getElementById("startGameBtn");
    const backgroundMusic = document.getElementById("backgroundMusic");
    const toggleMusicBtn = document.getElementById("toggleMusicBtn");

    const storedPlayerName = localStorage.getItem("playerName");
    if (storedPlayerName) {
        playerNameInput.value = storedPlayerName;
    }

    let isMusicPlaying = localStorage.getItem("isMusicPlaying") === "true"; 

    toggleMusicBtn.textContent = isMusicPlaying ? "🎶 Música: Desligar" : "🎶 Música: Ligar";
    
    // Tenta tocar a música se estava tocando antes.
    if (isMusicPlaying) {
        // Define o volume aqui também para garantir que comece no volume certo
        backgroundMusic.volume = 0.4; 
        backgroundMusic.play().catch(e => console.log("Autoplay bloqueado na inicialização:", e));
    }

    toggleMusicBtn.addEventListener("click", () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                toggleMusicBtn.textContent = "🎶 Música: Desligar";
            }).catch(e => {
                console.log("Erro ao tocar música:", e);
                alert("O navegador pode ter bloqueado a reprodução automática. Por favor, interaja com a página.");
            });
        } else {
            backgroundMusic.pause();
            isMusicPlaying = false;
            toggleMusicBtn.textContent = "🎶 Música: Ligar";
        }
        localStorage.setItem("isMusicPlaying", isMusicPlaying); 
    });

    startGameBtn.addEventListener("click", () => {
        const playerName = playerNameInput.value.trim();

        if (playerName === "") {
            alert("Por favor, digite seu nome para iniciar a aventura!");
            return;
        }

        localStorage.setItem("playerName", playerName);
        localStorage.setItem("totalPoints", 0); 
        localStorage.setItem("currentPhase", 1); 

        // Se a música estiver ligada na tela inicial, garanta que ela continue tocando ao ir para a fase 1
        if (isMusicPlaying && backgroundMusic.paused) {
             backgroundMusic.volume = 0.4; // Define o volume
             backgroundMusic.play().catch(e => console.log("Erro ao continuar música:", e));
        }

        window.location.href = "fase1.html";
    });
});
