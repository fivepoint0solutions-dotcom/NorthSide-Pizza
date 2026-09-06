/**
 * Browser speech-to-text (Web Speech API). One shot: press, speak, get text.
 * Chrome/Edge/Safari support it; elsewhere `isSpeechSupported()` is false and
 * the UI should fall back to a typed name.
 */

interface SpeechAlternative {
  transcript: string;
  confidence: number;
}
interface SpeechResult {
  0: SpeechAlternative;
  isFinal: boolean;
  length: number;
}
interface SpeechEvent {
  results: { length: number; [index: number]: SpeechResult };
  resultIndex: number;
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function ctor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isSpeechSupported(): boolean {
  return ctor() !== null;
}

export interface ListenHandlers {
  onPartial?: (text: string) => void;
  onFinal: (text: string) => void;
  onError?: (error: string) => void;
  lang?: string;
}

/** Starts listening. Returns a stop function. */
export function listenOnce(handlers: ListenHandlers): () => void {
  const Recognition = ctor();
  if (!Recognition) {
    handlers.onError?.("unsupported");
    return () => {};
  }

  const recognition = new Recognition();
  recognition.lang = handlers.lang ?? "en-US";
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  let finalText = "";

  recognition.onresult = (event) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result) continue;
      const text = result[0].transcript;
      if (result.isFinal) finalText += text;
      else interim += text;
    }
    if (interim) handlers.onPartial?.(interim);
  };

  recognition.onerror = (event) => handlers.onError?.(event.error);
  recognition.onend = () => handlers.onFinal(finalText.trim());

  try {
    recognition.start();
  } catch {
    handlers.onError?.("start_failed");
  }

  return () => recognition.abort();
}
