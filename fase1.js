// fase1.js - Lógica da Fase 1: Egito Antigo (AGORA SEM MÚSICA ESPECÍFICA DA FASE)

// --- Variáveis Globais ---
let playerName = localStorage.getItem("playerName") || "Explorador";
let totalPoints = parseInt(localStorage.getItem("totalPoints") || "0");
// isMusicPlaying ainda é necessário para controlar os SONS DE FEEDBACK
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

// Remova: const phaseMusic = document.getElementById("phaseMusic"); 
const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");


// --- Banco de Perguntas da Fase 1 (Egito Antigo) ---
const allPhase1Questions = [
    {
        texto: "No Egito Antigo, eu media a vida e a morte, guiava plantações e controlava o Nilo. O que sou?",
        correta: "O tempo",
        alternativas: ["O ouro", "O sol", "A areia"]
    },
    {
        texto: "Sou um símbolo de poder eterno, abrigo os reis e conto histórias em pedra. O que sou?",
        correta: "A pirâmide",
        alternativas: ["O templo", "A esfinge", "O trono"]
    },
    {
        texto: "Numa vida após a morte, eu era pesado contra a pena da verdade. O que sou?",
        correta: "O coração",
        alternativas: ["A alma", "A mente", "O espírito"]
    },
    {
        texto: "Sou uma divindade solar, reverenciada como criador e mantenedor da vida no Egito.",
        correta: "Rá",
        alternativas: ["Osíris", "Hórus", "Anúbis"]
    },
    {
        texto: "Escrita sagrada egípcia usada em templos e túmulos.",
        correta: "Hieróglifos",
        alternativas: ["Cuneiforme", "Latim", "Runas"]
    },
    {
        texto: "Qual rio foi a espinha dorsal da civilização egípcia?",
        correta: "Nilo",
        alternativas: ["Tigre", "Eufrates", "Jordão"]
    },
    {
        texto: "Animal sagrado no Egito Antigo, frequentemente mumificado e adorado.",
        correta: "Gato",
        alternativas: ["Cachorro", "Serpente", "Macaco"]
    },
    {
        texto: "Objeto funerário que guardava os órgãos internos mumificados dos faraós.",
        correta: "Vaso Canópico",
        alternativas: ["Sarcófago", "Amuleto", "Papiro"]
    },
    {
        texto: "Qual faraó unificou o Alto e Baixo Egito, tornando-se o primeiro faraó?",
        correta: "Narmer",
        alternativas: ["Menés", "Djoser", "Quéops"]
    },
    {
        texto: "As tumbas dos faraós mais famosos no Vale dos Reis são um exemplo de qual arte funerária egípcia?",
        correta: "Hipogeus",
        alternativas: ["Mastabas", "Pirâmides", "Cenotáfios"] 
    },
    {
        texto: "Qual era o nome da rainha egípcia que governou como faraó e se vestia como homem?",
        correta: "Hatshepsut",
        alternativas: ["Cleópatra", "Nefertiti", "Ankhesenamun"]
    }
];

// --- Funções Auxiliares Comuns ---
function selectRandomQuestions(sourceArray, numQuestions) {
    const shuffled = [...sourceArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, Math.min(numQuestions, allPhase1Questions.length));
}

// Remova: Função para tocar música da fase

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
    greetingElement.innerText = `Saudações, ${playerName}...`;
    descriptionElement.innerText = "Você despertou nas areias eternas do Egito Antigo, sob o olhar vigilante dos faraós. Desvende os enigmas que guardam os segredos deste reino milenar para prosseguir em sua jornada.";

    startPhaseBtn.addEventListener("click", () => {
        // Remova: playPhaseMusic(); 
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
        // Ajuste este bloco para cada fase, pois cada uma aponta para a próxima
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
        if (window.location.pathname.includes('fase6.html')) {
            finishGame();
        } else {
            advanceToNextPhase();
        }
    }
}

function advanceToNextPhase() {
    // Remova: phaseMusic.pause(); 
    totalPoints += phaseScore;
    localStorage.setItem("totalPoints", totalPoints);
    localStorage.setItem("currentPhase", 2); // Para fase1.js, a próxima é 2
    window.location.href = `fase2.html`; // Para fase1.js, vai para fase2.html
}

// A função finishGame só deve ser chamada na última fase (fase6.js)
// function finishGame() { /* ... */ }
