// Variáveis globais
let timeLeft = 60;  // 60 segundos para resolver o puzzle
const timerElement = document.getElementById("time");
const result = document.getElementById("result");
const downloadLink = document.getElementById("download-link");

// Iniciar o cronômetro assim que a página for carregada
window.onload = function() {
    countdown();
};

// Função para o cronômetro
function countdown() {
    const countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            result.textContent = "Tempo esgotado! Tente novamente.";
            result.style.color = "red";
            downloadLink.style.display = "none";  // Esconder o link se o tempo esgotar
        } else {
            timerElement.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);
}

// Função para verificar as respostas do puzzle
function checkAnswers() {
    const word1 = document.getElementById("word1").value.toLowerCase();
    const word2 = document.getElementById("word2").value.toLowerCase();
    const word3 = document.getElementById("word3").value.toLowerCase();

    // Respostas corretas dos anagramas
    if (word1 === "allen iverson" && word2 === "golden state warriors" && word3 === "2022") {
        clearInterval(countdown);  // Parar o cronômetro
        result.textContent = "Parabéns! Você resolveu todos os anagramas!";
        result.style.color = "green";
        downloadLink.style.display = "inline";  // Mostrar o link de download
    } else {
        result.textContent = "Resposta incorreta! Tente novamente.";
        result.style.color = "red";
    }
}
