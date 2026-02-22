// ElevenLabs Voice Models
export const ELEVENLABS_MODELS = {
  V3: "eleven_multilingual_v2", // emotionally rich, best for content creation (default)
  TURBO_V2_5: "eleven_turbo_v2_5", // high quality + low latency, multilingual
  FLASH_V2_5: "eleven_flash_v2_5", // fastest (<75ms), multilingual, 0.5x cost
  FLASH_V2: "eleven_flash_v2", // fast, good quality
} as const;

// ElevenLabs Voice IDs
export const ELEVENLABS_VOICES = {
  // ── Female ────────────────────────────────────────────
  ALICE: "Xb7hH8MSUJpSbSDYk0k2", // british, middle aged, confident — news
  CHARLOTTE: "XB0fDUnXU5powFXDhCwa", // english-swedish, middle aged, seductive — video games
  DOMI: "AZnzlk1XvdvUeBnXmlld", // american, young, strong — narration
  DOROTHY: "ThT5KcBeYPX3keUQqHPh", // british, young, pleasant — children's stories
  EMILY: "LcfcDJNUP1GQjkzn1xUU", // american, young, calm — meditation
  FREYA: "jsCqWAovK2LkecY7zXl4", // american, young
  GIGI: "jBpfuIE2acCO8z3wKNLl", // american, young, childlike — animation
  GLINDA: "z9fAnlkpzviPz146aGWa", // american, middle aged, witch — video games
  GRACE: "oWAxZDx7w5VEj9dCyTzz", // american-southern, young — audiobook
  MATILDA: "XrExE9yKIg1WjnnlVkGX", // american, middle aged, warm — narration
  RACHEL: "21m00Tcm4TlvDq8ikWAM", // american, young, calm — narration (most popular)
  SARAH: "EXAVITQu4vr4xnSDxMaL", // american, young, confident & warm
  SERENA: "pMsXgVXv3BLzUgSXRplE", // american, middle aged, pleasant — narration

  // ── Male ─────────────────────────────────────────────
  ADAM: "pNInz6obpgDQGcFmaJgB", // american, middle aged, deep — narration
  ANTONI: "ErXwobaYiN019PkySvjV", // american, young, well-rounded — narration
  ARNOLD: "VR6AewLTigWG4xSOukaG", // american, middle aged, crisp — narration
  BILL: "pqHfZKP75CvOlQylNhV4", // american, middle aged, strong — documentary
  BRIAN: "nPczCjzI2devNBz1zQrb", // american, middle aged, deep — narration
  CALLUM: "N2lVS1w4EtoT3dr4eOWO", // american, middle aged, hoarse — video games
  CHARLIE: "IKne3meq5aSn9XLyUdCD", // australian, middle aged, casual — conversational
  CHRIS: "iP95p4xoKVk53GoZ742B", // american, middle aged, casual — conversational
  CLYDE: "2EiwWnXFnvU5JabPnv8n", // american, middle aged, war veteran — video games
  DANIEL: "onwK4e9ZLuTAKqWW03F9", // british, middle aged, deep — news presenter
  DAVE: "CYw3kZ02Hs0563khs1Fj", // british-essex, young, conversational — video games
  DREW: "29vD33N1CtxCmqQRPOHJ", // american, middle aged, well-rounded — news
  ETHAN: "g5CIjZEefAph4nQFvHAz", // american, young — ASMR
  FIN: "D38z5RcWu1voky8WS1ja", // irish, old, sailor — video games
  GEORGE: "JBFqnCBsd6RMkjVDRZzb", // british, middle aged, raspy — narration (default)
  GIOVANNI: "zcAOhNBS3c14rBihAFp1", // english-italian, young — audiobook
  HARRY: "SOYHLrjzK2X1ezoPC6cr", // american, young, anxious — video games
} as const;

// Voice descriptions for CLI selection
export const VOICE_DESCRIPTIONS = {
  // Female
  ALICE: "Alice - British, confident (news style)",
  CHARLOTTE: "Charlotte - English-Swedish, seductive",
  DOMI: "Domi - American, strong (narration)",
  DOROTHY: "Dorothy - British, pleasant",
  EMILY: "Emily - American, calm (meditation)",
  FREYA: "Freya - American, young",
  GIGI: "Gigi - American, childlike",
  GLINDA: "Glinda - American, witch-like",
  GRACE: "Grace - American Southern, warm",
  MATILDA: "Matilda - American, warm narration",
  RACHEL: "Rachel - American, calm (most popular)",
  SARAH: "Sarah - American, confident",
  SERENA: "Serena - American, pleasant",

  // Male
  ADAM: "Adam - American, deep narration",
  ANTONI: "Antoni - American, well-rounded",
  ARNOLD: "Arnold - American, crisp",
  BILL: "Bill - American, strong documentary",
  BRIAN: "Brian - American, deep",
  CALLUM: "Callum - American, hoarse",
  CHARLIE: "Charlie - Australian, casual",
  CHRIS: "Chris - American, conversational",
  CLYDE: "Clyde - American, veteran",
  DANIEL: "Daniel - British, news presenter",
  DAVE: "Dave - British Essex, conversational",
  DREW: "Drew - American, news style",
  ETHAN: "Ethan - American, ASMR",
  FIN: "Fin - Irish, sailor",
  GEORGE: "George - British, raspy (recommended)",
  GIOVANNI: "Giovanni - Italian-English, audiobook",
  HARRY: "Harry - American, young",
} as const;

// Recommended voices for different use cases
export const RECOMMENDED_VOICES = {
  ALERTS: ELEVENLABS_VOICES.GEORGE, // Clear, authoritative
  NARRATION: ELEVENLABS_VOICES.BRIAN, // Deep, professional
  CONVERSATIONAL: ELEVENLABS_VOICES.CHARLIE, // Casual, friendly
  CALM: ELEVENLABS_VOICES.EMILY, // Soothing for long sessions
  ENERGETIC: ELEVENLABS_VOICES.ALICE, // Confident, engaging
} as const;

// Default configuration
export const DEFAULT_VOICE_CONFIG = {
  model: ELEVENLABS_MODELS.V3,
  voiceId: ELEVENLABS_VOICES.GEORGE,
  stability: 0.5,
  similarityBoost: 0.75,
  style: 0.0,
  useSpeakerBoost: true,
} as const;
