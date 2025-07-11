// script.js - Lógica da Tela de Boas-Vindas

document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById("playerName");
    const startGameBtn = document.getElementById("startGameBtn");

    // Tenta carregar o nome do jogador se já existia
    const storedPlayerName = localStorage.getItem("playerName");
    if (storedPlayerName) {
        playerNameInput.value = storedPlayerName;
    }

    startGameBtn.addEventListener("click", () => {
        const name = playerNameInput.value.trim();
        if (name) {
            localStorage.setItem("playerName", name);
            localStorage.setItem("totalPoints", "0");
            localStorage.setItem("currentPhase", "1"); // Inicia na Fase 1

            // --- IMPORTANTE: NAVEGAÇÃO AJUSTADA PARA IFRAME ---
            // Diz ao pai (main.html) para carregar fase1.html no iframe
            if (window.parent && window.parent.document.getElementById('gameFrame')) {
                window.parent.document.getElementById('gameFrame').src = 'fase1.html';
            } else {
                // Fallback para caso não esteja em um iframe (ex: testando diretamente index.html)
                window.location.href = 'fase1.html';
            }
        } else {
            alert("Por favor, digite seu nome para iniciar a aventura!");
        }
    });

    // --- REMOVIDO: Lógica de controle de música, agora no main.html ---
    // const backgroundMusic = document.getElementById("backgroundMusic");
    // const toggleMusicBtn = document.getElementById("toggleMusicBtn");
    // let isMusicPlaying = localStorage.getItem("isMusicPlaying") === "true"; 

    // // Configuração inicial do botão de música
    // toggleMusicBtn.textContent = isMusicPlaying ? "🎶 Música: Desligar" : "🎶 Música: Ligar";
    // if (isMusicPlaying) {
    //     backgroundMusic.volume = 0.4;
    //     backgroundMusic.play().catch(e => console.log("Autoplay bloqueado:", e));
    // }

    // // Listener para o botão de toggle da música
    // toggleMusicBtn.addEventListener("click", () => {
    //     if (backgroundMusic.paused) {
    //         backgroundMusic.play().then(() => {
    //             isMusicPlaying = true;
    //             toggleMusicBtn.textContent = "🎶 Música: Desligar";
    //         }).catch(e => {
    //             console.log("Erro ao tocar música:", e);
    //             alert("O navegador pode ter bloqueado a reprodução automática. Por favor, interaja com a página.");
    //         });
    //     } else {
    //         backgroundMusic.pause();
    //         isMusicPlaying = false;
    //         toggleMusicBtn.textContent = "🎶 Música: Ligar";
    //     }
    //     localStorage.setItem("isMusicPlaying", isMusicPlaying);
    // });
});
