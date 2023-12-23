class TTS {
    #_speechSynthesis = window.speechSynthesis || null;
    #_speechSynthesisUtterance = new SpeechSynthesisUtterance();

    #_voiceId = -1;

    constructor() {
        this.#_speechSynthesisUtterance.volume = localStorage.getItem('tts-volume') || 1;
        this.#_speechSynthesisUtterance.pitch = localStorage.getItem('tts-pitch') || 1;
        this.#_speechSynthesisUtterance.rate = localStorage.getItem('tts-rate') || 1;
    }

    loadVoicesAsync() {
        return new Promise((resolve, reject) => {
            if (this.#_speechSynthesis) {
                let timerId, attempts = 0;
                timerId = setInterval(() => {
                    if (++attempts > 20) {
                        reject();
                        clearInterval(timerId);
                    } else {
                        if (this.#_speechSynthesis.getVoices().length !== 0) {
                            resolve();
                            clearInterval(timerId);
                        }
                    }
                }, 100);
            } else {
                reject('SpeechSynthesis is not supported!');
            }
        });
    }

    getVoiceId() {
        return this.#_voiceId;
    }

    setVoiceId(val) {
        this.#_voiceId = val;
    }

    getSpeechSynthesis() {
        return this.#_speechSynthesis;
    }

    getSpeechSynthesisUtterance() {
        return this.#_speechSynthesisUtterance;
    }

    setVolume(val) {
        localStorage.setItem('tts-volume', this.#_speechSynthesisUtterance.volume = val);
    }

    setPitch(val) {
        localStorage.setItem('tts-pitch', this.#_speechSynthesisUtterance.pitch = val);
    }

    setRate(val) {
        localStorage.setItem('tts-rate', this.#_speechSynthesisUtterance.rate = val);
    }

    setVoice(val) {
        this.#_speechSynthesisUtterance.voice = val;
    }

    setLang(val) {
        this.#_speechSynthesisUtterance.lang = val;
    }
}
