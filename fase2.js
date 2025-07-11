// fase2.js - Lógica da Fase 2: Antiguidade Clássica (Grécia e Roma)

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


// --- Banco de Perguntas da Fase 2 (Antiguidade Clássica: Grécia e Roma) ---
const allPhase2Questions = [
    {
        texto: "Qual cidade-estado grega é conhecida como o berço da democracia?",
        correta: "Atenas",
        alternativas: ["Esparta", "Corinto", "Tebas"]
    },
    {
        texto: "Quem foi o filósofo grego, mestre de Platão, que foi condenado à morte por impiedade e corrupção da juventude?",
        correta: "Sócrates",
        alternativas: ["Aristóteles", "Pitágoras", "Heráclito"]
    },
    {
        texto: "Qual império antigo foi governado por imperadores como Júlio César e Augusto?",
        correta: "Império Romano",
        alternativas: ["Império Persa", "Império Macedônico", "Império Egípcio"]
    },
    {
        texto: "Qual estrutura romana monumental era usada para combates de gladiadores e espetáculos públicos?",
        correta: "Coliseu",
        alternativas: ["Panteão", "Fórum Romano", "Arco do Triunfo"]
    },
    {
        texto: "Quem foi o principal deus do Olimpo na mitologia grega, senhor dos deuses e dos homens?",
        correta: "Zeus",
        alternativas: ["Poseidon", "Hades", "Apolo"]
    },
    {
        texto: "Qual obra épica, atribuída a Homero, narra a Guerra de Troia?",
        correta: "Ilíada",
        alternativas: ["Odisseia", "Eneida", "Teogonia"]
    },
    {
        texto: "Qual grande general cartaginês liderou um exército com elefantes através dos Alpes para atacar Roma?",
        correta: "Aníbal Barca",
        alternativas: ["Alexandre, o Grande", "Ciro, o Grande", "Júlio César"]
    },
    {
        texto: "O que era a Acrópole de Atenas?",
        correta: "A parte mais alta e fortificada da cidade, com templos",
        alternativas: ["O principal porto de Atenas", "Um mercado central", "Uma escola de filosofia"]
    },
    {
        texto: "Qual foi o nome do primeiro imperador romano?",
        correta: "Augusto",
        alternativas: ["Júlio César", "Nero", "Tibério"]
    },
    {
        texto: "Quem foi a figura histórica que, segundo a lenda, cruzou o Rubicão, um ponto sem retorno?",
        correta: "Júlio César",
        alternativas: ["Alexandre, o Grande", "Marco Antônio", "Bruto"]
    },
    {
        texto: "Qual era o nome da assembleia popular na Roma Antiga onde os cidadãos votavam?",
        correta: "Comícios",
        alternativas: ["Senado", "Conselho da Plebe", "Assembleia dos Centuriões"]
    },
    {
        texto: "Qual matemático grego é conhecido por seus elementos, que formam a base da geometria?",
        correta: "Euclides",
        alternativas: ["Pitágoras", "Arquimedes", "Tales"]
    }
    // Adicione mais perguntas aqui para enriquecer a fase!
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
    greetingElement.innerText = `Saudações, ${playerName}... Você chegou à Antiguidade Clássica!`;
    descriptionElement.innerText = "Deixando as areias do Egito, você adentra os reinos da Grécia e Roma. Filosofia, impérios e batalhas épicas aguardam seus conhecimentos. Desvende os segredos para prosseguir!";

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
        // Ajuste este bloco para a fase 2 (vai para a fase 3)
        // Este if/else só é realmente necessário na fase6.js
        // Mas o mantemos para consistência se você quiser expandir a lógica.
        if (window.location.pathname.includes('fase6.html')) { // Esta parte NÃO será verdadeira para fase2.js
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
        // Ajuste para a fase 2 (vai para a fase 3)
        if (window.location.pathname.includes('fase6.html')) { // Esta parte NÃO será verdadeira para fase2.js
            finishGame();
        } else {
            advanceToNextPhase();
        }
    }
}

function advanceToNextPhase() {
    totalPoints += phaseScore;
    localStorage.setItem("totalPoints", totalPoints);
    localStorage.setItem("currentPhase", 3); // Para fase2.js, a próxima é 3
    window.location.href = `fase3.html`; // Para fase2.js, vai para fase3.html
}

// A função finishGame só deve ser chamada na última fase (fase6.js)
// Por isso, ela não está definida aqui em fase2.js
