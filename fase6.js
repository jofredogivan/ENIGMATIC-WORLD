// fase6.js - Lógica da Fase 6: Séculos XX e XXI

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


// --- Banco de Perguntas da Fase 6 (Séculos XX e XXI) ---
const allPhase6Questions = [
    {
        texto: "Qual foi o evento que marcou o início da Primeira Guerra Mundial?",
        correta: "Assassinato do Arquiduque Francisco Ferdinando",
        alternativas: ["Invasão da Polônia", "Ataque a Pearl Harbor", "Queda do Muro de Berlim"]
    },
    {
        texto: "Quem foi o líder da União Soviética durante a maior parte da Segunda Guerra Mundial?",
        correta: "Josef Stalin",
        alternativas: ["Vladimir Lenin", "Leon Trotsky", "Mikhail Gorbachev"]
    },
    {
        texto: "Qual invenção do século XX revolucionou as comunicações e o acesso à informação em escala global?",
        correta: "Internet",
        alternativas: ["Televisão", "Telefone", "Rádio"]
    },
    {
        texto: "Qual foi o nome da política de segregação racial imposta na África do Sul até 1994?",
        correta: "Apartheid",
        alternativas: ["Jim Crow", "Holocausto", "Lei Seca"]
    },
    {
        texto: "Qual organização internacional foi criada após a Segunda Guerra Mundial para promover a paz e a cooperação?",
        correta: "Organização das Nações Unidas (ONU)",
        alternativas: ["Liga das Nações", "OTAN", "União Europeia"]
    },
    {
        texto: "Em que ano ocorreu o ataque terrorista às Torres Gêmeas nos Estados Unidos?",
        correta: "2001",
        alternativas: ["1999", "2000", "2002"]
    },
    {
        texto: "Qual foi o nome da corrida espacial entre EUA e URSS durante a Guerra Fria?",
        correta: "Corrida Espacial",
        alternativas: ["Projeto Manhattan", "Operação Barbarossa", "Plano Marshall"]
    },
    {
        texto: "Qual líder sul-africano lutou contra o Apartheid e se tornou presidente após décadas de prisão?",
        correta: "Nelson Mandela",
        alternativas: ["Desmond Tutu", "Steve Biko", "Thabo Mbeki"]
    },
    {
        texto: "Qual presidente dos EUA é famoso por seu discurso 'Eu Tenho um Sonho' e por sua luta pelos direitos civis?",
        correta: "Martin Luther King Jr.",
        alternativas: ["John F. Kennedy", "Abraham Lincoln", "Barack Obama"]
    },
    {
        texto: "Qual teoria científica, proposta por Albert Einstein, revolucionou a física no início do século XX?",
        correta: "Teoria da Relatividade",
        alternativas: ["Teoria da Evolução", "Teoria do Big Bang", "Teoria Quântica"]
    },
    {
        texto: "Qual evento em 1989 simbolizou o fim da Guerra Fria e a reunificação da Alemanha?",
        correta: "Queda do Muro de Berlim",
        alternativas: ["Desintegração da URSS", "Cúpula de Genebra", "Tratado START"]
    }
    // Adicione mais perguntas aqui para Séculos XX e XXI
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

    greetingElement.innerText = `Saudações, ${playerName}... Você chegou aos Séculos XX e XXI!`;
    descriptionElement.innerText = "Guerras mundiais, avanços tecnológicos e a era digital. O mundo moderno aguarda sua compreensão. Prepare-se para o desafio final!";

    startPhaseBtn.addEventListener("click", () => {
        startQuizPhase();
    });
});

function startQuizPhase() {
    storyIntroContainer.classList.add("hidden");
    questionArea.classList.remove("hidden");

    currentQuestionIndex = 0;
    phaseScore = 0;
    currentQuestionsForPhase = selectRandomQuestions(allPhase6Questions, QUESTIONS_PER_PHASE); 
    
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
    
    // Na última pergunta da última fase (fase6.js), vai para a tela final
    if (currentQuestionIndex === currentQuestionsForPhase.length - 1) {
        nextActionButton.textContent = "Ver Resultados Finais";
        nextActionButton.onclick = finishGame;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestionsForPhase.length) {
        displayQuestion();
    } else {
        // Se todas as perguntas foram respondidas, vai para a tela final
        finishGame();
    }
}

// Esta função é chamada SOMENTE na última fase (fase6.js) para encerrar o jogo
function finishGame() {
    totalPoints += phaseScore;
    localStorage.setItem("totalPoints", totalPoints);
    localStorage.setItem("currentPhase", "final"); // Marca que o jogo terminou

    // --- IMPORTANTE: NAVEGAÇÃO AJUSTADA PARA IFRAME ---
    // Diz ao pai (main.html) para carregar a tela final no iframe
    if (window.parent && window.parent.document.getElementById('gameFrame')) {
        window.parent.document.getElementById('gameFrame').src = "fase-final.html";
    } else {
        // Fallback para caso não esteja em um iframe
        window.location.href = "fase-final.html";
    }
}
