// fase2.js - Lógica da Fase 2: Roma Antiga

// --- Variáveis Globais ---
let playerName = localStorage.getItem("playerName") || "Explorador";
let totalPoints = parseInt(localStorage.getItem("totalPoints") || "0");
let isMusicPlaying = localStorage.getItem("isMusicPlaying") === "true"; 

// --- Variáveis de Controle da Fase ---
let currentQuestionsForPhase = [];
let currentQuestionIndex = 0;
let phaseScore = 0;
const QUESTIONS_PER_PHASE = 5;

// --- Referências aos Elementos HTML ---
const greetingElement = document.getElementById("greeting");
const descriptionElement = document.getElementById("descricao");
const storyIntroContainer = document.getElementById("story-intro");
const startPhaseBtn = document.getElementById("startPhaseBtn");

const questionArea = document.getElementById("questionArea");
const currentQuestionNumElement = document.getElementById("current-question-num");
const totalQuestionsNumElement = document.getElementById("total-questions-num");
const questionTextElement = document.getElementById("pergunta");
const optionsContainer = document.getElementById("opcoes");
const feedbackElement = document.getElementById("feedback");

const nextActionButton = document.createElement("button");
nextActionButton.id = "nextActionButton";
nextActionButton.classList.add("hidden", "next-button");
feedbackElement.parentNode.insertBefore(nextActionButton, feedbackElement.nextSibling);

// Referências aos elementos de áudio (apenas para feedback)
const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");


// --- Banco de Perguntas da Fase 2 (Roma Antiga) ---
const allPhase2Questions = [
    {
        texto: "Qual foi o fundador lendário de Roma, que matou seu irmão Remus?",
        correta: "Rômulo",
        alternativas: ["Júlio César", "Augusto", "Nero"]
    },
    {
        texto: "Qual foi o nome do sistema político que substituiu a monarquia em Roma, antes do império?",
        correta: "República",
        alternativas: ["Democracia", "Ditadura", "Feudalismo"]
    },
    {
        texto: "Qual estrutura romana era usada para lutas de gladiadores e grandes espetáculos públicos?",
        correta: "Coliseu",
        alternativas: ["Partenon", "Circo Máximo", "Fórum Romano"]
    },
    {
        texto: "Quem foi o general cartaginês que atravessou os Alpes com elefantes para atacar Roma?",
        correta: "Aníbal",
        alternativas: ["Cipião Africano", "Alexandre, o Grande", "Brutus"]
    },
    {
        texto: "Qual foi o idioma oficial do Império Romano?",
        correta: "Latim",
        alternativas: ["Grego", "Aramaico", "Hebraico"]
    },
    {
        texto: "Qual imperador romano é conhecido por ter dividido o império em Ocidente e Oriente?",
        correta: "Diocleciano",
        alternativas: ["Constantino", "Augusto", "Teodósio I"]
    },
    {
        texto: "Qual foi o nome dado às guerras entre Roma e Cartago?",
        correta: "Guerras Púnicas",
        alternativas: ["Guerras Médicas", "Guerras Gálicas", "Guerras Civis"]
    },
    {
        texto: "Quem foi o primeiro imperador romano?",
        correta: "Otávio Augusto",
        alternativas: ["Júlio César", "Marco Antônio", "Nero"]
    },
    {
        texto: "Qual era a principal via de abastecimento de água para as cidades romanas?",
        correta: "Aquedutos",
        alternativas: ["Canais", "Represas", "Cisternas"]
    },
    {
        texto: "Qual famosa frase é atribuída a Júlio César após cruzar um rio proibido, iniciando uma guerra civil?",
        correta: "Alea jacta est (A sorte está lançada)",
        alternativas: ["Veni, vidi, vici (Vim, vi, venci)", "Et tu, Brute? (Até tu, Brutus?)", "Carpe Diem (Aproveite o dia)"]
    }
    // Adicione mais perguntas aqui para Roma Antiga
];

// --- Funções Auxiliares Comuns ---
function selectRandomQuestions(sourceArray, numQuestions) {
    const shuffled = [...sourceArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, Math.min(numQuestions, sourceArray.length));
}

// Funções para tocar efeitos sonoros (Mantenha estas!)
function playCorrectSound() {
    if (isMusicPlaying) { 
        correctSound.currentTime = 0; 
        correctSound.volume = 0.7;
        correctSound.play().catch(e => console.log("Erro ao tocar som correto:", e));
    }
}

function playIncorrectSound() {
    if (isMusicPlaying) { 
        incorrectSound.currentTime = 0; 
        incorrectSound.volume = 0.7;
        incorrectSound.play().catch(e => console.log("Erro ao tocar som incorreto:", e));
    }
}

// --- Funções de Lógica da Fase ---
document.addEventListener("DOMContentLoaded", () => {
    // Assegura que o jogador e os pontos totais são carregados
    playerName = localStorage.getItem("playerName") || "Explorador";
    totalPoints = parseInt(localStorage.getItem("totalPoints") || "0");
    isMusicPlaying = localStorage.getItem("isMusicPlaying") === "true"; // Atualiza a preferência de música

    greetingElement.innerText = `Saudações, ${playerName}... Você chegou à Roma Antiga!`;
    descriptionElement.innerText = "Gladiadores, imperadores e um império colossal! Navegue pelas intrigas e glórias de Roma para provar sua astúcia.";

    startPhaseBtn.addEventListener("click", () => {
        startQuizPhase();
    });
});

function startQuizPhase() {
    storyIntroContainer.classList.add("hidden");
    questionArea.classList.remove("hidden");

    currentQuestionIndex = 0;
    phaseScore = 0;
    currentQuestionsForPhase = selectRandomQuestions(allPhase2Questions, QUESTIONS_PER_PHASE); 
    
    displayQuestion();
}

function displayQuestion() {
    const question = currentQuestionsForPhase[currentQuestionIndex];

    currentQuestionNumElement.textContent = currentQuestionIndex + 1;
    totalQuestionsNumElement.textContent = currentQuestionsForPhase.length;

    questionTextElement.innerText = question.texto;
    optionsContainer.innerHTML = '';
    feedbackElement.innerHTML = '';
    nextActionButton.classList.add("hidden");

    nextActionButton.textContent = "Próxima Pergunta";
    nextActionButton.onclick = nextQuestion; 

    const allOptions = [question.correta, ...question.alternativas];
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(option, question.correta, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedOption, correctAnswer, clickedButton) {
    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct-answer");
        } else {
            btn.classList.add("incorrect-answer");
        }
    });

    if (selectedOption === correctAnswer) {
        phaseScore += 10;
        feedbackElement.innerHTML = `<p class="feedback-correct">✔️ Correto! "${correctAnswer}" era a resposta certa.</p>`;
        playCorrectSound(); 
    } else {
        phaseScore -= 5;
        feedbackElement.innerHTML = `<p class="feedback-incorrect">❌ Errado. A resposta certa era "${correctAnswer}".</p>`;
        playIncorrectSound(); 
    }
    
    nextActionButton.classList.remove("hidden");
    
    if (currentQuestionIndex === currentQuestionsForPhase.length - 1) {
        // Esta condição só será verdadeira para fase6.js no final
        if (window.location.pathname.includes('fase6.html')) { 
            nextActionButton.textContent = "Ver Resultados Finais";
            nextActionButton.onclick = finishGame;
        } else { 
            nextActionButton.textContent = "Avançar para a Próxima Fase";
            nextActionButton.onclick = advanceToNextPhase;
        }
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestionsForPhase.length) {
        displayQuestion();
    } else {
        // Esta condição só será verdadeira para fase6.js no final
        if (window.location.pathname.includes('fase6.html')) {
            finishGame();
        } else {
            advanceToNextPhase();
        }
    }
}

// Para que a função advanceToNextPhase saiba qual é a fase atual,
// precisamos extrair o número da fase do nome do arquivo (ex: fase2.js -> 2)
const pathParts = window.location.pathname.split('/');
const currentFileName = pathParts[pathParts.length - 1]; // ex: "fase2.html"
const currentPhaseNumber = parseInt(currentFileName.replace('fase', '').replace('.html', ''));

function advanceToNextPhase() {
    totalPoints += phaseScore;
    localStorage.setItem("totalPoints", totalPoints);
    const nextPhaseNumber = currentPhaseNumber + 1; 
    localStorage.setItem("currentPhase", nextPhaseNumber); 

    // --- IMPORTANTE: NAVEGAÇÃO AJUSTADA PARA IFRAME ---
    // Diz ao pai (main.html) para carregar a próxima fase no iframe
    if (window.parent && window.parent.document.getElementById('gameFrame')) {
        window.parent.document.getElementById('gameFrame').src = `fase${nextPhaseNumber}.html`;
    } else {
        // Fallback para caso não esteja em um iframe (útil para testes diretos)
        window.location.href = `fase${nextPhaseNumber}.html`;
    }
}

// A função finishGame é específica da fase6.js, não deve estar aqui.
