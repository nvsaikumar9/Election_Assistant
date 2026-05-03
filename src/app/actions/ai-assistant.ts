'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '@/lib/logger';

// Offline Knowledge Base
const offlineExpert: Record<string, { en: string; hi: string }> = {
  'dashboard': { 
    en: "This dashboard is your guide to Indian democracy. You can track live ongoing elections on the interactive map, see upcoming timelines, and explore a detailed 5-step guide for General, State, and Local elections.",
    hi: "यह डैशबोर्ड भारतीय लोकतंत्र के लिए आपका मार्गदर्शक है। आप इंटरैक्टिव मानचित्र पर लाइव चल रहे चुनावों को ट्रैक कर सकते हैं, आगामी समयरेखा देख सकते हैं, और आम, राज्य और स्थानीय चुनावों के लिए विस्तृत 5-चरणीय मार्गदर्शिका देख सकते हैं।"
  },
  'process': {
    en: "The election process in India has 5 main stages: 1. Voter Registration, 2. Notification & Nomination, 3. Campaigning, 4. Polling Day, and 5. Counting & Results.",
    hi: "भारत में चुनाव प्रक्रिया के 5 मुख्य चरण हैं: 1. मतदाता पंजीकरण, 2. अधिसूचना और नामांकन, 3. प्रचार, 4. मतदान का दिन, और 5. गिनती और परिणाम।"
  },
  'mp': {
    en: "An MP (Member of Parliament) represents a constituency in the Lok Sabha at the national level. There are 543 elected MP seats in India.",
    hi: "एक सांसद (MP) राष्ट्रीय स्तर पर लोकसभा में एक निर्वाचन क्षेत्र का प्रतिनिधित्व करता है। भारत में 543 निर्वाचित सांसद सीटें हैं।"
  },
  'mla': {
    en: "An MLA (Member of Legislative Assembly) represents a constituency in the state's Vidhan Sabha. They focus on state-level laws and governance.",
    hi: "एक विधायक (MLA) राज्य की विधानसभा में एक निर्वाचन क्षेत्र का प्रतिनिधित्व करता है। वे राज्य स्तर के कानूनों और शासन पर ध्यान केंद्रित करते हैं।"
  },
  'local': {
    en: "Local elections are for Panchayats (villages) and Municipalities (cities). They are managed by the State Election Commission and focus on grassroots issues like water, roads, and sanitation.",
    hi: "स्थानीय चुनाव पंचायतों (गांवों) और नगर पालिकाओं (शहरों) के लिए होते हैं। वे राज्य चुनाव आयोग द्वारा प्रबंधित किए जाते हैं और पानी, सड़कों और स्वच्छता जैसे जमीनी मुद्दों पर ध्यान केंद्रित करते हैं।"
  }
};

export async function askChunavGuru(question: string, language: 'en' | 'hi') {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const lowerQ = question.toLowerCase();

  // CHECK FOR OFFLINE KNOWLEDGE FIRST (to be fast and reliable)
  let offlineResponse = '';
  if (lowerQ.includes('dashboard') || lowerQ.includes('about this') || lowerQ.includes('डैशबोर्ड')) 
    offlineResponse = offlineExpert['dashboard'][language];
  else if (lowerQ.includes('process') || lowerQ.includes('how it works') || lowerQ.includes('प्रक्रिया')) 
    offlineResponse = offlineExpert['process'][language];
  else if (lowerQ.includes('mp') || lowerQ.includes('parliament') || lowerQ.includes('सांसद')) 
    offlineResponse = offlineExpert['mp'][language];
  else if (lowerQ.includes('mla') || lowerQ.includes('assembly') || lowerQ.includes('विधायक')) 
    offlineResponse = offlineExpert['mla'][language];
  else if (lowerQ.includes('local') || lowerQ.includes('panchayat') || lowerQ.includes('स्थानीय') || lowerQ.includes('पंचायत')) 
    offlineResponse = offlineExpert['local'][language];

  if (offlineResponse) {
    return { text: offlineResponse };
  }

  // If no offline match and no API key
  if (!apiKey) {
    return { text: language === 'en' ? "Please set your API key to ask complex questions!" : "जटिल प्रश्न पूछने के लिए कृपया अपनी API की सेट करें!" };
  }

  // ATTEMPT AI RESPONSE
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are "Chunav Guru", an Indian election mentor. Respond in ${language === 'en' ? 'English' : 'Hindi'}. Question: ${question}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    await logger.info('Gemini AI response success', { question, language });
    return { text };
  } catch (error: any) {
    await logger.error('Gemini AI error', error, { question, language });
    
    // Final Fallback if API fails (even with key)
    return { 
      text: language === 'en' 
        ? "I am currently answering using my built-in expert knowledge while the AI brain is being configured. This dashboard tracks India's General, State, and Local elections with interactive maps and a 5-step process guide." 
        : "AI ब्रेन को कॉन्फ़िगर किए जाने के दौरान मैं वर्तमान में अपने अंतर्निहित विशेषज्ञ ज्ञान का उपयोग करके उत्तर दे रहा हूँ। यह डैशबोर्ड इंटरैक्टिव मानचित्रों और 5-चरणीय प्रक्रिया गाइड के साथ भारत के आम, राज्य और स्थानीय चुनावों को ट्रैक करता है।" 
    };
  }
}
