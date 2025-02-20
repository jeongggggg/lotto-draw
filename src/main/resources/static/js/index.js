document.addEventListener("DOMContentLoaded", function () {
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = "🤹🏻 기대하시라 🤹🏻";
});

document.getElementById("drawButton").addEventListener("click", function () {
    fetch("http://localhost:8080/lotto")
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.getElementById("result");
            resultContainer.innerHTML = "";

            data.forEach(number => {
                const ball = document.createElement("div");
                ball.classList.add("ball");

                const numberSpan = document.createElement("span");
                numberSpan.textContent = number;

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

                ball.appendChild(numberSpan);
                resultContainer.appendChild(ball);
            });
        })
        .catch(error => console.error("에러 발생:", error));
});