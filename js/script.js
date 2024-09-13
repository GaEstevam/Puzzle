// Variáveis globais
let timeLeft = 60;  // 60 segundos para resolver o puzzle
let countdownInterval;  // Variável para armazenar o intervalo do cronômetro
const timerElement = document.getElementById("time");
const result = document.getElementById("result");
const downloadLink = document.getElementById("download-link");
const submitButton = document.querySelector("button");  // Seleciona o botão "Enviar Respostas"

// Função para o cronômetro
function startCountdown() {
    countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            result.textContent = "Tempo esgotado! Tente novamente.";
            result.style.color = "red";
            downloadLink.style.display = "none";  // Esconder o link se o tempo esgotar
            submitButton.style.display = "none";  // Esconder o botão de envio
        } else {
            timerElement.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);
}

// Iniciar o cronômetro assim que a página for carregada
window.onload = function() {
    startCountdown();  // O cronômetro começa assim que a página carrega
};

// Função para verificar as respostas do puzzle
function checkAnswers() {
    const word1 = document.getElementById("word1").value.toLowerCase();
    const word2 = document.getElementById("word2").value.toLowerCase();
    const word3 = document.getElementById("word3").value.toLowerCase();

    // Respostas corretas dos anagramas
    if (word1 === "allen iverson" && word2 === "golden state warriors" && word3 === "2022") {
        clearInterval(countdownInterval);  // Parar o cronômetro
        result.textContent = "Parabéns! Você resolveu todos os anagramas!";
        result.style.color = "green";
        downloadLink.style.display = "inline";  // Mostrar o link de download
        submitButton.style.display = "none";  // Esconder o botão após sucesso
    } else {
        result.textContent = "Resposta incorreta! Tente novamente.";
        result.style.color = "red";
    }
}
