// fase4.js - Lógica da Fase 4: Renascimento e Grandes Navegações

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


// --- Banco de Perguntas da Fase 4 (Renascimento e Grandes Navegações) ---
const allPhase4Questions = [
    {
        texto: "Qual artista do Renascimento é famoso pelas obras 'Mona Lisa' e 'A Última Ceia'?",
        correta: "Leonardo da Vinci",
        alternativas: ["Michelangelo", "Rafael", "Donatello"]
    },
    {
        texto: "Qual navegador português foi o primeiro a circum-navegar o Cabo da Boa Esperança?",
        correta: "Bartolomeu Dias",
        alternativas: ["Vasco da Gama", "Pedro Álvares Cabral", "Fernão de Magalhães"]
    },
    {
        texto: "Em que cidade italiana o Renascimento teve seu maior florescimento, com artistas como os Medici?",
        correta: "Florença",
        alternativas: ["Roma", "Veneza", "Milão"]
    },
    {
        texto: "Qual navegador, a serviço da Coroa Espanhola, é creditado com a chegada à América em 1492?",
        correta: "Cristóvão Colombo",
        alternativas: ["Américo Vespúcio", "Vasco Núñez de Balboa", "Hernán Cortés"]
    },
    {
        texto: "Quem escreveu 'O Príncipe', uma obra seminal sobre teoria política durante o Renascimento?",
        correta: "Nicolau Maquiavel",
        alternativas: ["Erasmo de Roterdã", "Thomas More", "Montaigne"]
    },
    {
        texto: "Qual tratado dividiu as terras recém-descobertas entre Portugal e Espanha em 1494?",
        correta: "Tratado de Tordesilhas",
        alternativas: ["Tratado de Madri", "Tratado de Saragoça", "Paz de Vestfália"]
    },
    {
        texto: "Qual inovação tecnológica do século XV foi crucial para a disseminação das ideias renascentistas e reformistas?",
        correta: "Imprensa de tipos móveis",
        alternativas: ["Pólvora", "Bússola", "Caravela"]
    },
    {
        texto: "Qual navegante português comandou a primeira viagem de circum-navegação da Terra, embora não a tenha completado?",
        correta: "Fernão de Magalhães",
        alternativas: ["Bartolomeu Dias", "Vasco da Gama", "Cristóvão Colombo"]
    },
    {
        texto: "Quem é considerado o 'Pai do Humanismo' no Renascimento?",
        correta: "Francesco Petrarca",
        alternativas: ["Dante Alighieri", "Giovanni Boccaccio", "Erasmo de Roterdã"]
    },
    {
        texto: "Qual foi o principal objetivo das Grandes Navegações para as potências europeias?",
        correta: "Encontrar novas rotas comerciais para as Índias",
        alternativas: ["Conquistar novas terras para a agricultura", "Disseminar o cristianismo", "Estabelecer colônias penais"]
    }
    // Adicione mais perguntas aqui para Renascimento e Grandes Navegações
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

    greetingElement.innerText = `Saudações, ${playerName}... Você chegou ao Renascimento e Grandes Navegações!`;
    descriptionElement.innerText = "Uma era de redescobertas, expansão e ousadia! Navegue pelos mares do conhecimento e desvende os segredos que moldaram o mundo moderno.";

    startPhaseBtn.addEventListener("click", () => {
        startQuizPhase();
    });
});

function startQuizPhase() {
    storyIntroContainer.classList.add("hidden");
    questionArea.classList.remove("hidden");

    currentQuestionIndex = 0;
    phaseScore = 0;
    currentQuestionsForPhase = selectRandomQuestions(allPhase4Questions, QUESTIONS_PER_PHASE); 
    
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
// precisamos extrair o número da fase do nome do arquivo (ex: fase4.js -> 4)
const pathParts = window.location.pathname.split('/');
const currentFileName = pathParts[pathParts.length - 1]; // ex: "fase4.html"
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
