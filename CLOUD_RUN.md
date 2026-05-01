# GCP Cloud Run Deployment Guide

This guide explains how to deploy the **Election Assistant Dashboard** to Google Cloud Platform using Cloud Run.

## Prerequisites
1.  **Google Cloud SDK** (`gcloud`) installed and authenticated.
2.  **Billing enabled** for your GCP project.
3.  **Docker** installed (if building locally) or use **Cloud Build**.

## Deployment Steps

### 1. Build and Push to Artifact Registry
Replace `PROJECT_ID` with your actual GCP project ID and `REGION` with your preferred region (e.g., `us-central1`).

```bash
# Enable required services
gcloud services enable artifactregistry.googleapis.com run.googleapis.com cloudbuild.googleapis.com

# Create a repository (if not already exists)
gcloud artifacts repositories create election-assistant-repo \
    --repository-format=docker \
    --location=REGION

# Build and push using Cloud Build (No local Docker needed!)
gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT_ID/election-assistant-repo/dashboard:latest
```

### 2. Deploy to Cloud Run
When deploying, make sure to provide your Google AI API key as an environment variable.

```bash
gcloud run deploy election-assistant \
    --image REGION-docker.pkg.dev/PROJECT_ID/election-assistant-repo/dashboard:latest \
    --platform managed \
    --region REGION \
    --allow-unauthenticated \
    --set-env-vars="GOOGLE_GENERATIVE_AI_API_KEY=your_key_here"
```

## Tips
*   **Secrets**: For production, it's safer to use **Secret Manager** for your API key instead of `--set-env-vars`.
*   **Custom Domain**: You can map a custom domain to your Cloud Run service via the GCP Console.
*   **Updates**: To update the app, simply run the build and deploy commands again.
