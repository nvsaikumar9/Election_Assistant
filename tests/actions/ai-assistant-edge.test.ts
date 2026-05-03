import { describe, it, expect, vi, beforeEach } from 'vitest';
import { askChunavGuru } from '@/app/actions/ai-assistant';
import { logger } from '@/lib/logger';

// Mock the logger to avoid real GCP calls during tests
vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe('askChunavGuru Edge Cases', () => {
  beforeEach(() => {
    vi.stubEnv('GOOGLE_GENERATIVE_AI_API_KEY', '');
    vi.clearAllMocks();
  });

  it('handles empty input gracefully', async () => {
    const result = await askChunavGuru('   ', 'en');
    expect(result.text).toBeDefined();
    // It should either return a prompt to ask a question or a default response
  });

  it('handles API key missing error with specific message', async () => {
    const result = await askChunavGuru('What is the capital of India?', 'en');
    expect(result.text).toContain('Please set your API key');
  });

  it('handles API key missing error in Hindi', async () => {
    const result = await askChunavGuru('भारत की राजधानी क्या है?', 'hi');
    expect(result.text).toContain('API की सेट करें');
  });

  it('logs errors when the AI model fails', async () => {
    vi.stubEnv('GOOGLE_GENERATIVE_AI_API_KEY', 'valid-looking-but-wrong-key');
    
    // We expect the fallback message to be returned
    const result = await askChunavGuru('Xyzzy', 'en');
    expect(result.text).toContain('AI brain is being configured');
    expect(logger.error).toHaveBeenCalled();
  });

  it('supports mixed language keyword matching for offline expert', async () => {
    // Testing the Hindi keyword "प्रक्रिया" (process)
    const result = await askChunavGuru('बताओ प्रक्रिया क्या है', 'hi');
    expect(result.text).toContain('चुनाव प्रक्रिया के 5 मुख्य चरण हैं');
    expect(logger.info).not.toHaveBeenCalled(); // Offline responses shouldn't log "Gemini response success"
  });
});
