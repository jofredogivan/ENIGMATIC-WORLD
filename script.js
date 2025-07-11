// script.js - Lógica da Tela Inicial (index.html)

document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById("playerName");
    const startGameBtn = document.getElementById("startGameBtn");
    const backgroundMusic = document.getElementById("backgroundMusic");
    const toggleMusicBtn = document.getElementById("toggleMusicBtn");

    // Opcional: Carrega o nome do jogador se já existia de uma sessão anterior
    const storedPlayerName = localStorage.getItem("playerName");
    if (storedPlayerName) {
        playerNameInput.value = storedPlayerName;
    }

    // Carrega a preferência de áudio do usuário (true se estava ligado, false se desligado)
    let isMusicPlaying = localStorage.getItem("isMusicPlaying") === "true"; 

    // Atualiza o texto do botão de áudio baseado na preferência salva
    toggleMusicBtn.textContent = isMusicPlaying ? "🎶 Música: Desligar" : "🎶 Música: Ligar";
    
    // Se a música estava tocando, tenta iniciar (pode ser bloqueado pelo navegador sem interação)
    if (isMusicPlaying) {
        backgroundMusic.volume = 0.4; // Define o volume aqui também para garantir que comece no volume certo
        backgroundMusic.play().catch(e => console.log("Autoplay bloqueado na inicialização:", e));
    }

    // Event Listener para o botão de ligar/desligar música
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
        localStorage.setItem("isMusicPlaying", isMusicPlaying); // Salva a preferência
    });

    startGameBtn.addEventListener("click", () => {
        const playerName = playerNameInput.value.trim();

        if (playerName === "") {
            alert("Por favor, digite seu nome para iniciar a aventura!");
            return;
        }

        // Salva o nome do jogador e reinicia a pontuação/fase
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
