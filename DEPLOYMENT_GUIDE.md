# Deployment Guide: Election Assistant to GCP Cloud Run

I have set up a GitHub Actions workflow to automatically deploy your dashboard to Google Cloud Run whenever you push to the `main` branch.

## Prerequisites
1.  **GCP Project**: Ensure you have a Google Cloud Project created.
2.  **APIs Enabled**: In the GCP Console, enable the following APIs:
    *   Cloud Run API
    *   Artifact Registry API
    *   Cloud Build API
    *   Generative Language API (for Chunav Guru)

## GitHub Secrets Setup
To allow GitHub to deploy to your GCP project, you need to add the following secrets in your GitHub repository (**Settings > Secrets and variables > Actions > New repository secret**):

1.  `GCP_PROJECT_ID`: Your Google Cloud Project ID.
2.  `GCP_SA_KEY`: The JSON key for a Service Account with **Cloud Run Admin**, **Storage Admin**, and **Service Account User** roles.
3.  `GOOGLE_GENERATIVE_AI_API_KEY`: Your Gemini API key.

## Manual Deployment (Optional)
If you install the `gcloud` CLI locally, you can also deploy manually with:
```bash
gcloud run deploy election-assistant --source .
```

## How it works
1.  **Dockerfile**: Uses Next.js `standalone` mode to create a lightweight (~100MB) container image.
2.  **GitHub Actions**: Builds the container, pushes it to Google Container Registry (GCR), and deploys it to Cloud Run.
3.  **Automatic Scaling**: Cloud Run will scale to zero when not in use (saving you money!) and scale up instantly when users visit.

**Your changes have been committed. Once you push to GitHub and set up the secrets, your site will be live!**
