import { friday } from "./friday.js";

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);
const btn = document.querySelector(".initFriday");

const SpeechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

// Speech to text
recognition.onresult = function (e) {
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;
    p.textContent = transcript;

    if (e.results[0].isFinal) {
        p = document.createElement("p");
        words.appendChild(p);
        friday(transcript);
    }
};

recognition.onend = recognition.start;

// On load
recognition.start();
friday("init");

// If doesn't start on load, start when click on the button
btn.addEventListener("click", () => {
    friday("init");
});
