import { Logging } from '@google-cloud/logging';

// This utility demonstrates adoption of Google Cloud services for production monitoring.
// In a real environment, it would automatically authenticate using GCP Service Account.
const logging = new Logging({
  projectId: process.env.NEXT_PUBLIC_GCP_PROJECT_ID || 'election-assistant-494719',
});

const logName = 'election-assistant-app';
const log = logging.log(logName);

export const logger = {
  info: async (message: string, metadata: object = {}) => {
    const entry = log.entry({ resource: { type: 'global' } }, {
      severity: 'INFO',
      message,
      ...metadata,
      timestamp: new Date(),
    });
    
    // In dev, we also log to console for visibility
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, metadata);
    }
    
    // We attempt to write to GCP, but don't block the UI
    try {
      await log.write(entry);
    } catch (err) {
      console.warn('Failed to write to GCP Logging:', err);
    }
  },
  
  error: async (message: string, error: any, metadata: object = {}) => {
    const entry = log.entry({ resource: { type: 'global' } }, {
      severity: 'ERROR',
      message,
      error: error?.message || error,
      stack: error?.stack,
      ...metadata,
      timestamp: new Date(),
    });

    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${message}`, error, metadata);
    }

    try {
      await log.write(entry);
    } catch (err) {
      console.warn('Failed to write to GCP Logging:', err);
    }
  }
};
