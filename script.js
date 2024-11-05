// Correct answers for each question
const correctAnswers = {
    q1: 'A',
    q2: 'A',
    q3: 'A',
    q4: 'A',
    q5: 'A',
    q6: 'A',
    q7: 'A',
    q8: 'A',
    q9: 'A',
    q10: 'A',
};

function submitQuiz() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (!name || !phone) {
        alert('Please enter your full name and phone number.');
        return;
    }

    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    const results = [];

    // Check each question's answer
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedAnswer) {
            const questionResult = selectedAnswer.value === correctAnswers[`q${i}`] ? "Correct" : "Wrong";
            results.push(`Q${i}: ${questionResult}`);
            if (questionResult === "Correct") {
                score++;
            }
        } else {
            results.push(`Q${i}: No answer selected`);
        }
    }

    // Calculate percentage and determine pass/fail
    const percentage = (score / totalQuestions) * 100;
    const status = percentage >= 50 ? "PASS" : "FAIL";

    const message = `
        Name: ${name}
        Phone: ${phone}
        Score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)
        Status: ${status}
        Answers: ${results.join(", ")}
    `;

    // Send result to Telegram
    sendToTelegram(message);
}

function sendToTelegram(message) {
    const chatId = "7361816575";
    const botToken = "8174835485:AAF4vGGDqIqKQvVyNrS2EfpbSuo5yhcY2Yo";
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
    .then(response => {
        if (response.ok) {
            alert("Quiz submitted successfully!");
        } else {
            alert("Failed to submit quiz. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
}
