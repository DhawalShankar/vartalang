/*
 * The script each candidate reads, per language. Add more entries to any
 * array to get randomised variants — the start page already picks one at
 * random per attempt. Languages with no entry fall back to English.
 */

export interface ScriptVariant {
  id: string;
  text: string;
}

export const SCRIPTS: Record<string, ScriptVariant[]> = {
  English: [
    {
      id: 'en-v1',
      text: `The morning market was full of colour — vendors calling out prices, the smell of fresh spices in the air, and children running between the stalls.

Please note today's date is the fifteenth of September, two thousand twenty-six. Our contact number is nine, eight, seven, six, five, four, three, two, one, zero.

Good morning! Thank you for calling — how may I help you today? I'd be happy to check that for you right away.

I can't believe we won the match — this is the best day ever! On a calmer note, please take a seat, and I'll be with you shortly.

Sixty slippery seashells stood silently on the sandy shore.`,
    },
  ],
  Hindi: [
    {
      id: 'hi-v1',
      text: `सुबह का बाज़ार रंगों से भरा हुआ था — दुकानदार दाम पुकार रहे थे, हवा में ताज़े मसालों की खुशबू थी, और बच्चे दुकानों के बीच दौड़ रहे थे।

कृपया ध्यान दें, आज की तारीख़ है पंद्रह सितंबर, दो हज़ार छब्बीस। हमारा संपर्क नंबर है नौ, आठ, सात, छह, पाँच, चार, तीन, दो, एक, शून्य।

नमस्ते! फ़ोन करने के लिए धन्यवाद — मैं आपकी किस तरह मदद कर सकता हूँ? मैं अभी आपके लिए यह देख लेता हूँ।

यक़ीन नहीं हो रहा कि हम मैच जीत गए — आज का दिन सबसे शानदार है! अब शांति से, आप बैठिए, मैं थोड़ी देर में आपके पास आता हूँ।

कच्चा पापड़, पक्का पापड़ — साठ सीपियाँ समंदर के किनारे शांत खड़ी थीं।`,
    },
  ],
};

export const LANGUAGES = [
  'Hindi', 'English', 'Assamese', 'Bengali', 'Bodo', 'Dogri', 'Gujarati',
  'Kannada', 'Kashmiri', 'Konkani', 'Maithili', 'Malayalam', 'Manipuri (Meitei)',
  'Marathi', 'Nepali', 'Odia', 'Punjabi', 'Sanskrit', 'Santali', 'Sindhi',
  'Tamil', 'Telugu', 'Urdu',
];

export const CONSENT_TEXT =
  "I confirm I am 18 or older and that this recording is my own voice. I understand VartaLang will evaluate this recording for quality and language proficiency, and may allow verified companies to listen to it once, without revealing my name or contact details, so they can evaluate it for hiring purposes. If a company is interested after listening, VartaLang will contact me and I can choose whether or not to connect with them. This does not guarantee I will be hired. Recordings are processed using third-party AI transcription tools for quality scoring.";

export function pickScript(language: string): ScriptVariant {
  const pool = SCRIPTS[language] || SCRIPTS.English;
  return pool[Math.floor(Math.random() * pool.length)];
}