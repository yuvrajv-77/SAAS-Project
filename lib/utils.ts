import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices  } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getSubjectColor = (subject?: string) => {
  if (!subject) {
    // fallback to a default color or first defined color
    return (subjectsColors as Record<string, string>)["default"] ?? Object.values(subjectsColors)[0] ?? "#000";
  }
  const color = (subjectsColors as Record<string, string>)[subject];
  if (!color) {
    console.warn(`getSubjectColor: unknown subject "${subject}", falling back to default color.`);
    return (subjectsColors as Record<string, string>)["default"] ?? Object.values(subjectsColors)[0] ?? "#000";
  }
  return color;
};
 
export const configureAssistant = (voice?: string, style?: string) => {
  // pick voice map (fallback to first available)
  const voiceKey = voice ?? Object.keys(voices)[0];
  const voiceMap = (voices as Record<string, Record<string, string>>)[voiceKey] ?? Object.values(voices)[0];
  
  if (!voiceMap) {
    console.warn("configureAssistant: voices map is empty, using hardcoded fallback 'sarah'.");
  }
  
  // pick style-specific voice id (fallback to first available or 'sarah')
  const styleKey = style ?? Object.keys(voiceMap ?? {})[0];
  const voiceId =
    (voiceMap && (voiceMap[styleKey] ?? voiceMap[Object.keys(voiceMap)[0]])) ||
    "sarah";
 
  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
      "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 0.9,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.
  
                    Tutor Guidelines:
                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation {{ style }}.
                    Keep your responses short, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.
              `,
        },
      ],
    },
    // clientMessages: [],
    // serverMessages: [],
  };
  return vapiAssistant;
};
