// fase1.js - Lógica da Fase 1: Egito Antigo

// --- Variáveis Globais ---
let playerName = localStorage.getItem("playerName") || "Explorador";
let totalPoints = parseInt(localStorage.getItem("totalPoints") || "0");
// NOTA: 'isMusicPlaying' é lida aqui para o controle dos sons de feedback,
// mas a música de fundo é controlada pelo 'main.html'
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


// --- Banco de Perguntas da Fase 1 (Egito Antigo) ---
const allPhase1Questions = [
    {
        texto: "Qual rio era a principal fonte de vida e civilização para o Egito Antigo?",
        correta: "Nilo",
        alternativas: ["Tigre", "Eufrates", "Jordão"]
    },
    {
        texto: "Qual era o nome do governante supremo do Egito Antigo, considerado um deus na terra?",
        correta: "Faraó",
        alternativas: ["Imperador", "Rei", "Czar"]
    },
    {
        texto: "Qual estrutura monumental era construída como túmulo para os faraós?",
        correta: "Pirâmide",
        alternativas: ["Templo", "Zigurate", "Obelisco"]
    },
    {
        texto: "Qual processo era usado pelos egípcios para preservar os corpos dos mortos?",
        correta: "Mumificação",
        alternativas: ["Embalsamamento", "Cremalheira", "Taxidermia"]
    },
    {
        texto: "Qual animal era considerado sagrado e frequentemente associado à deusa Bastet?",
        correta: "Gato",
        alternativas: ["Cão", "Falcão", "Escorpião"]
    },
    {
        texto: "Qual material os egípcios usavam para escrever, feito de uma planta aquática?",
        correta: "Papiro",
        alternativas: ["Pergaminho", "Códex", "Tabuleta de argila"]
    },
    {
        texto: "Qual deus egípcio era associado ao sol e muitas vezes retratado com cabeça de falcão?",
        correta: "Rá",
        alternativas: ["Osíris", "Anúbis", "Hórus"]
    },
    {
        texto: "Qual rainha egípcia é famosa por seus relacionamentos com Júlio César e Marco Antônio?",
        correta: "Cleópatra",
        alternativas: ["Nefertiti", "Hatshepsut", "Tiy"]
    },
    {
        texto: "Qual era o tipo de escrita sagrada usada pelos antigos egípcios, composta por símbolos e imagens?",
        correta: "Hieróglifos",
        alternativas: ["Cuneiforme", "Demótico", "Arábica"]
    },
    {
        texto: "Qual era a função principal da Esfinge de Gizé?",
        correta: "Proteger as pirâmides",
        alternativas: ["Local de sacrifícios", "Observatório astronômico", "Mercado"]
    }
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

    greetingElement.innerText = `Saudações, ${playerName}... Você chegou ao Egito Antigo!`;
    descriptionElement.innerText = "As areias do tempo revelam segredos milenares. Desvende os mistérios dos faraós e das pirâmides para provar seu valor e avançar!";

    startPhaseBtn.addEventListener("click", () => {
        startQuizPhase();
    });
});

function startQuizPhase() {
    storyIntroContainer.classList.add("hidden");
    questionArea.classList.remove("hidden");

    currentQuestionIndex = 0;
    phaseScore = 0;
    currentQuestionsForPhase = selectRandomQuestions(allPhase1Questions, QUESTIONS_PER_PHASE); 
    
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
        // Isso só é verdade para fase6.js, mas mantemos a condição
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
        // Isso só é verdade para fase6.js, mas mantemos a condição
        if (window.location.pathname.includes('fase6.html')) {
            finishGame();
        } else {
            advanceToNextPhase();
        }
    }
}

function advanceToNextPhase() {
    totalPoints += phaseScore;
    localStorage.setItem("totalPoints", totalPoints);
    const nextPhaseNumber = currentPhaseNumber + 1; // Precisamos do número da fase atual
    localStorage.setItem("currentPhase", nextPhaseNumber); 

    // --- IMPORTANTE: NAVEGAÇÃO AJUSTADA PARA IFRAME ---
    // Diz ao pai (main.html) para carregar a próxima fase no iframe
    if (window.parent && window.parent.document.getElementById('gameFrame')) {
        window.parent.document.getElementById('gameFrame').src = `fase${nextPhaseNumber}.html`;
    } else {
        // Fallback para caso não esteja em um iframe
        window.location.href = `fase${nextPhaseNumber}.html`;
    }
}

// Para que a função advanceToNextPhase saiba qual é a fase atual,
// precisamos extrair o número da fase do nome do arquivo (ex: fase1.js -> 1)
const pathParts = window.location.pathname.split('/');
const currentFileName = pathParts[pathParts.length - 1]; // ex: "fase1.html"
const currentPhaseNumber = parseInt(currentFileName.replace('fase', '').replace('.html', ''));

// A função finishGame só deve ser definida e chamada em fase6.js
// Ela não é necessária aqui em fase1.js (ou outras fases intermediárias)
