document.addEventListener("DOMContentLoaded", () => {
    setInitialResultText();
    setDrawButtonEvent();
});

function setInitialResultText() {
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = "🤹🏻 기대하시라 🤹🏻";
}

function setDrawButtonEvent() {
    const button = document.getElementById("drawButton");
    button.addEventListener("click", handleDrawClick);
}

function handleDrawClick() {
    const button = document.getElementById("drawButton");
    const resultContainer = document.getElementById("result");

    disableButton(button, "번호 추첨 중...");
    resultContainer.textContent = "번호 추첨 중...";

    fetchLottoNumbers()
        .then(numbers => displayLottoBalls(numbers))
        .catch(error => console.error("에러 발생:", error))
        .finally(() => {
            setTimeout(() => enableButton(button, "추첨하기"), 3000);
        });
}

function disableButton(button, text) {
    button.disabled = true;
    button.style.backgroundColor = "#ccc";
    button.textContent = text;
}

function enableButton(button, text) {
    button.disabled = false;
    button.style.backgroundColor = "#4CAF50";
    button.textContent = text;
}

function fetchLottoNumbers() {
    return fetch("http://localhost:8080/lotto")
        .then(response => {
            if (!response.ok) throw new Error("서버 응답 오류");
            return response.json();
        });
}

function displayLottoBalls(numbers) {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = "";

    numbers.forEach((number, index) => {
        setTimeout(() => {
            const ball = createLottoBall(number);
            resultContainer.appendChild(ball);

            setTimeout(() => {
                ball.style.opacity = "1";
                ball.style.transform = "translateX(0) scale(1)";
                ball.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
            }, 10);
        }, index * 500);
    });
}

function createLottoBall(number) {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.opacity = "0";
    ball.style.transform = "scale(0.5)";
    ball.style.background = getBallColor(number);

    const numberSpan = document.createElement("span");
    numberSpan.textContent = number;
    ball.appendChild(numberSpan);

    return ball;
}

function getBallColor(number) {
    if (number <= 10) return "#fbc400"; // 노랑
    if (number <= 20) return "#69c8f2"; // 파랑
    if (number <= 30) return "#ff7272"; // 빨강
    if (number <= 40) return "#aaa";    // 회색
    return "#b0d840";                   // 초록
}