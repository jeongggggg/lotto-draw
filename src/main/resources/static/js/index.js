document.addEventListener("DOMContentLoaded", function () {
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = "🤹🏻 기대하시라 🤹🏻";
});

document.getElementById("drawButton").addEventListener("click", function () {
    const button = document.getElementById("drawButton");
    const resultContainer = document.getElementById("result");

    // 버튼 비활성화
    button.disabled = true;
    button.style.backgroundColor = "#ccc";  // 비활성화된 버튼 색 변경
    button.textContent = "번호 추첨 중...";  // 버튼 텍스트 변경

    // 번호 추첨 중이라는 문구를 보여줌
    resultContainer.textContent = "번호 추첨 중...";

    // 로또 번호 추첨 시작
    fetchLottoNumbers();

    // 3초 후 버튼 활성화
    setTimeout(function () {
        button.disabled = false;
        button.style.backgroundColor = "#4CAF50";  // 버튼 색 복원
        button.textContent = "추첨하기";  // 버튼 텍스트 복원
    }, 3000);  // 3초 후 활성화
});

function fetchLottoNumbers() {
    fetch("http://localhost:8080/lotto")
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.getElementById("result");
            resultContainer.innerHTML = "";  // 기존 결과 지우기

            // 번호를 하나씩 화면에 출력
            data.forEach((number, index) => {
                setTimeout(() => {
                    const ball = document.createElement("div");
                    ball.classList.add("ball");

                    const numberSpan = document.createElement("span");
                    numberSpan.textContent = number;
                    ball.appendChild(numberSpan);

                    // 번호에 따라 색상 설정
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

                    // 애니메이션 효과
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