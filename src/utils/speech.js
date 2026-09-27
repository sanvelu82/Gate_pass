/**
 * Voice announcement utility using Web Speech API.
 * Pre-warms synthesis and picks the best available English voice.
 */

let voicesLoaded = false;

export function warmUpSpeech() {
  const u = new SpeechSynthesisUtterance('');
  u.volume = 0;
  window.speechSynthesis.speak(u);

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {
      voicesLoaded = true;
    };
  }
}

export function speak(text) {
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  utterance.lang = 'en-IN';

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google'))) ||
    voices.find(v => v.lang.startsWith('en'));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  window.speechSynthesis.speak(utterance);
}
