document.getElementById("drawButton").addEventListener("click", function () {
    fetch("http://localhost:8080/lotto")
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").innerText = "당첨 번호: " + data.join(", ");
        })
        .catch(error => console.error("에러 발생:", error));
});