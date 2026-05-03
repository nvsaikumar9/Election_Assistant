import { describe, it, expect, vi, beforeEach } from 'vitest';
import { askChunavGuru } from '@/app/actions/ai-assistant';

describe('askChunavGuru', () => {
  beforeEach(() => {
    vi.stubEnv('GOOGLE_GENERATIVE_AI_API_KEY', 'test-key');
  });

  it('returns offline response for dashboard queries', async () => {
    const result = await askChunavGuru('tell me about the dashboard', 'en');
    expect(result.text).toContain('guide to Indian democracy');
  });

  it('returns offline response for process queries', async () => {
    const result = await askChunavGuru('how does the election process work?', 'en');
    expect(result.text).toContain('5 main stages');
  });

  it('handles Hindi language queries', async () => {
    const result = await askChunavGuru('प्रक्रिया क्या है?', 'hi');
    expect(result.text).toContain('चुनाव प्रक्रिया');
  });
});
