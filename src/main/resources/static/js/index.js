document.addEventListener("DOMContentLoaded", function () {
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = "🤹🏻 기대하시라 🤹🏻";
});

document.getElementById("drawButton").addEventListener("click", function () {
    const button = document.getElementById("drawButton");
    const resultContainer = document.getElementById("result");

    button.disabled = true;
    button.style.backgroundColor = "#ccc";
    button.textContent = "번호 추첨 중...";

    resultContainer.textContent = "번호 추첨 중...";

    fetchLottoNumbers();

    setTimeout(function () {
        button.disabled = false;
        button.style.backgroundColor = "#4CAF50";
        button.textContent = "추첨하기";
    }, 3000);
});

function fetchLottoNumbers() {
    fetch("http://localhost:8080/lotto")
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.getElementById("result");
            resultContainer.innerHTML = "";

            data.forEach((number, index) => {
                setTimeout(() => {
                    const ball = document.createElement("div");
                    ball.classList.add("ball");

                    const numberSpan = document.createElement("span");
                    numberSpan.textContent = number;
                    ball.appendChild(numberSpan);

                    if (number <= 10) {
                        ball.style.background = "#fbc400";
                    } else if (number <= 20) {
                        ball.style.background = "#69c8f2";
                    } else if (number <= 30) {
                        ball.style.background = "#ff7272";
                    } else if (number <= 40) {
                        ball.style.background = "#aaa";
                    } else {
                        ball.style.background = "#b0d840";
                    }

                    ball.style.opacity = "0";
                    ball.style.transform = "scale(0.5)";
                    resultContainer.appendChild(ball);

                    setTimeout(() => {
                        ball.style.opacity = "1";
                        ball.style.transform = "translateX(0) scale(1)";
                        ball.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
                    }, 50);
                }, index * 500);
            });
        })
        .catch(error => console.error("에러 발생:", error));
}