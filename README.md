# Sahayak — AI Student Help Desk (Docker)

A static site (`index.html` + `styles.css` + `app.js`) served by nginx inside
a small Alpine-based image.

## Build the image

```bash
docker build -t sahayak-helpdesk:latest .
```

## Run the container

```bash
docker run -d --name sahayak-helpdesk -p 8080:80 sahayak-helpdesk:latest
```

Then open **http://localhost:8080** in your browser.

## Or, one command with Compose

```bash
docker compose up -d --build
```

This builds the image and starts the container on port 8080 (mapped to
container port 80), same as above.

## Verify it's running

```bash
docker ps                                   # container should show "healthy" after ~10s
curl http://localhost:8080/healthz          # -> "ok"
```

## Useful commands

```bash
docker logs -f sahayak-helpdesk             # tail nginx access/error logs
docker stop sahayak-helpdesk                # stop
docker rm sahayak-helpdesk                  # remove the stopped container
docker compose down                         # stop + remove (if using Compose)
```

## Notes

- The app's data layer (`window.storage`) is an API provided by the Claude.ai
  artifact runtime. Running it in this container — or any plain browser
  outside Claude.ai — the app **still works fully**, it just can't persist
  data: every `window.storage` call fails silently and falls back to fresh
  seed data, so tickets/chats/accounts reset on every page reload instead of
  surviving across sessions. For a real standalone deployment, replace the
  `loadData()` / `saveData()` calls in `app.js` with calls to your own
  backend/database (see the **Database Design** and **Cloud Architecture**
  tabs inside the app for the schema and AWS mapping to build that against).
- The image is ~40MB (nginx:alpine + ~100KB of site files).
- To deploy to AWS per the Cloud Architecture page: push this image to
  Amazon ECR, run it on ECS Fargate or EC2, put CloudFront in front of it,
  and swap the storage layer for Amazon RDS as described in-app.
