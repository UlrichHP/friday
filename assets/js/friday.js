import { init, name, unknown, greetings } from "./replies.js";

const lang = "fr-FR";
const voiceIndex = 1;

// Retrieve voices available
const getVoices = () => {
    return new Promise((resolve) => {
        let voices = speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices);
            return;
        }
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
            resolve(voices);
        };
    });
};

const chooseVoice = async () => {
    const voices = (await getVoices()).filter((voice) => voice.lang == "fr-FR");

    return new Promise((resolve) => {
        resolve(voices[voiceIndex]);
    });
};

// F.R.I.D.A.Y. answer the user
export async function friday(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = unknown[Math.floor(Math.random() * unknown.length)];

    if (message.includes("init")) {
        speech.text = init[Math.floor(Math.random() * init.length)];
    }

    if (
        message.includes("ton nom") ||
        message.includes("comment t'appelles tu")
    ) {
        speech.text = name[Math.floor(Math.random() * name.length)];
    }

    if (
        message.includes("comment vas tu") ||
        message.includes("ça va") ||
        message.includes("comment ça va")
    ) {
        speech.text = greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (message.includes("temps") || message.includes("météo")) {
        // TODO => Call Weather API
        //speech.text = "Les prévisions pour aujourd'hui sont ".weather;
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = lang;
    speech.voice = await chooseVoice();

    window.speechSynthesis.speak(speech);
}
