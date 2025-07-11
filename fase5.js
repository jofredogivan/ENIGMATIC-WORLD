// fase5.js - Lógica da Fase 5: Revoluções e Iluminismo

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


// --- Banco de Perguntas da Fase 5 (Revoluções e Iluminismo) ---
const allPhase5Questions = [
    {
        texto: "Qual movimento intelectual dos séculos XVII e XVIII defendia o uso da razão e da ciência, criticando o absolutismo?",
        correta: "Iluminismo",
        alternativas: ["Romantismo", "Mercantilismo", "Feudalismo"]
    },
    {
        texto: "Qual evento marcou o fim da monarquia e o início de uma república na França em 1789?",
        correta: "Revolução Francesa",
        alternativas: ["Revolução Gloriosa", "Revolução Russa", "Guerra Civil Americana"]
    },
    {
        texto: "Quem foi o principal autor da Declaração de Independência dos Estados Unidos?",
        correta: "Thomas Jefferson",
        alternativas: ["George Washington", "Benjamin Franklin", "John Adams"]
    },
    {
        texto: "Qual foi a principal invenção da Primeira Revolução Industrial?",
        correta: "Máquina a vapor",
        alternativas: ["Automóvel", "Telefone", "Computador"]
    },
    {
        texto: "Qual filósofo iluminista defendeu a separaçã o dos poderes (legislativo, executivo e judiciário)?",
        correta: "Montesquieu",
        alternativas: ["Voltaire", "Rousseau", "Diderot"]
    },
    {
        texto: "Onde começou a Revolução Industrial no século XVIII?",
        correta: "Grã-Bretanha",
        alternativas: ["França", "Alemanha", "Estados Unidos"]
    },
    {
        texto: "Qual foi o lema da Revolução Francesa?",
        correta: "Liberdade, Igualdade e Fraternidade",
        alternativas: ["Paz, Pão e Terra", "Ordem e Progresso", "Vida, Liberdade e Propriedade"]
    },
    {
        texto: "Qual pensador iluminista defendeu a soberania popular e o 'contrato social'?",
        correta: "Jean-Jacques Rousseau",
        alternativas: ["John Locke", "Voltaire", "Adam Smith"]
    },
    {
        texto: "Qual foi o principal motivo para a Revolução Americana?",
        correta: "Impostos e falta de representação no Parlamento Britânico",
        alternativas: ["Conflitos religiosos", "Busca por novas terras", "Disputas dinásticas"]
    },
    {
        texto: "Qual evento marcou o início da Era Napoleônica?",
        correta: "Golpe de 18 Brumário",
        alternativas: ["Batalha de Waterloo", "Tomada da Bastilha", "Congresso de Viena"]
    }
    // Adicione mais perguntas aqui para Revoluções e Iluminismo
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

    greetingElement.innerText = `Saudações, ${playerName}... Você está nas Revoluções e no Iluminismo!`;
    descriptionElement.innerText = "Uma era de ideias que transformaram impérios e mudaram o curso da humanidade. A razão é sua guia neste tempo de profundas mudanças.";

    startPhaseBtn.addEventListener("click", () => {
        startQuizPhase();
    });
});

function startQuizPhase() {
    storyIntroContainer.classList.add("hidden");
    questionArea.classList.remove("hidden");

    currentQuestionIndex = 0;
    phaseScore = 0;
    currentQuestionsForPhase = selectRandomQuestions(allPhase5Questions, QUESTIONS_PER_PHASE); 
    
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
// precisamos extrair o número da fase do nome do arquivo (ex: fase5.js -> 5)
const pathParts = window.location.pathname.split('/');
const currentFileName = pathParts[pathParts.length - 1]; // ex: "fase5.html"
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
