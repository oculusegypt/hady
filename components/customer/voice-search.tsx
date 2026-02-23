'use client';

type Props = { onResult: (text: string) => void };

export function VoiceSearch({ onResult }: Props) {
  const handleVoice = () => {
    const recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!recognition) {
      onResult("المتصفح مش داعم البحث الصوتي دلوقتي يا معلم");
      return;
    }
    const recog = new recognition();
    recog.lang = "ar-EG";
    recog.onresult = (event: any) => onResult(event.results[0][0].transcript);
    recog.start();
  };

  return (
    <button onClick={handleVoice} className="mt-3 rounded-xl border border-brand px-4 py-2 text-brand">
      🎤 بحث صوتي بالمصري
    </button>
  );
}
