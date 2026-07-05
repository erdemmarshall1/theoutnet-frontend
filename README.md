# THE OUTNET Wholesale

Luxury fashion wholesale marketplace frontend — Vue 3 + Vite + Element Plus + Pinia.

## 🚀 Deploy to Cloudflare Pages

### Prerequisites
- A [Cloudflare](https://dash.cloudflare.com) account
- Access to this GitHub repo

### 1. Connect to Cloudflare Pages
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Pages → Create a project → Connect to Git**
3. Select `erdemmarshall1/theoutnet-frontend`

### 2. Build Settings
| Setting | Value |
|---|---|
| **Build command** | `npm install && npm run build` |
| **Build output** | `dist` |
| **Root directory** | *(leave blank)* |

### 3. Environment Variables
| Variable | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://supportive-delight-production-b90c.up.railway.app` |
| `VITE_SOCKET_URL` | `https://supportive-delight-production-b90c.up.railway.app` |

### 4. Deploy
Click **Save and Deploy**. Cloudflare auto-builds and deploys on every push.

### 5. Custom Domain (optional)
- In **Pages → your project → Custom domains**
- Add your domain and update DNS

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://127.0.0.1:5174`.

## Tech Stack
- **Vue 3** (Composition API, `<script setup>`)
- **Vite 4** (build tool)
- **Element Plus** (UI components)
- **Pinia** (state management)
- **Vue Router 4** (routing)
- **Axios** (API client)
- **PWA** (service worker, offline support)

## API Backend
The app connects to a Node.js backend hosted on Railway at `https://supportive-delight-production-b90c.up.railway.app`.
