# Busco

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

# Proyecto --- Guía de Estructura y Estándares

Este documento resume cómo debe organizarse el proyecto, cómo
estructurar módulos y cómo usar tRPC, servicios y esquemas. Mantiene
todo simple, consistente y fácil de mantener.

------------------------------------------------------------------------

## 📂 Estructura del Proyecto

    src/
      modules/
        auth/
          auth.router.ts
          auth.schema.ts
          auth.service.ts
          index.ts

        user/
          user.router.ts
          user.schema.ts
          user.service.ts
          index.ts

      trpc/
        context.ts
        trpc.ts
        router.ts

      db/
        client.ts

      external/
        public/
        webhook/
        cron/

      utils/
        jwt.ts
        hash.ts

      server.ts

------------------------------------------------------------------------

## 🧱 Principios

### 1. Arquitectura por módulos

Cada carpeta en `modules/` es un dominio del sistema.\
Cada módulo siempre tiene:

-   `*.router.ts` → Endpoints tRPC\
-   `*.schema.ts` → Validación con Zod\
-   `*.service.ts` → Lógica de negocio\
-   `index.ts` → Export del módulo

### 2. tRPC

-   Los **routers no contienen lógica**.\
-   Solo validan inputs y llaman al service.\
-   Usar `publicProcedure` o `protectedProcedure`.

### 3. Services

-   Aquí va toda la lógica real.\
-   Acceden a la DB.\
-   No llaman routers.

### 4. Zod Schemas

-   Validan parámetros de entrada.\
-   Nada de lógica dentro del schema.

### 5. Cookies y Auth

Para auth se usa JWT en cookie HTTPOnly:

-   `ctx.res.cookie("token", token, ...)`\
-   Cookie segura en producción\
-   El service genera el token\
-   El router lo guarda en cookie

------------------------------------------------------------------------

## 🧪 Reglas de Código

-   TypeScript estricto\
-   ESLint + Prettier\
-   Imports absolutos (`@/modules/...`)\
-   Nada de lógica compleja en routers\
-   Validar todo con Zod

------------------------------------------------------------------------

## 🚀 Convenciones generales

-   Todo nuevo módulo debe seguir el mismo formato.\
-   Los routers deben ser cortos.\
-   Los services deben ser muy claros.\
-   Código legible antes que código "inteligente".\
-   No romper la estructura sin motivo.

# Project Roadmap

## 🎯 Objectives
- Build a minimal, launchable vehicle-listing MVP.
- Add user authentication so users can create vehicle listings.
- Create an admin verification workflow to approve/reject user-uploaded vehicles.
- Establish a scalable architecture for future features.
- Implement a full CI/CD workflow using Kubernetes.
- Configure reverse proxy and PR-based deployment previews.
- Enable automated builds, tests, and rollouts.

---

## 🛣️ Roadmap

### **Phase 0 — Project Setup**
- [ ] Initialize repository structure.
- [ ] Add README, LICENSE, `.gitignore`.
- [ ] Configure environment variables.
- [ ] Define workspace and monorepo structure (optional).

---

### **Phase 1 — MVP Core**
#### Backend
- [ ] Vehicle endpoints:
  - [ ] `GET /vehicles`
  - [ ] `GET /vehicles/:id`
- [ ] Basic user authentication:
  - [ ] Register
  - [ ] Login
  - [ ] JWT or session-based auth
  - [ ] Protected routes for vehicle creation
- [ ] Vehicle creation workflow:
  - [ ] `POST /vehicles` (user-created)
  - [ ] Vehicle status field: `pending`, `approved`, `rejected`
- [ ] Admin verification API:
  - [ ] `PUT /admin/vehicles/:id/approve`
  - [ ] `PUT /admin/vehicles/:id/reject`
- [ ] Admin-only access middleware

#### Frontend
- [ ] Vehicle listing page
- [ ] Vehicle detail page
- [ ] User dashboard:
  - [ ] Create vehicle
  - [ ] View status (pending/approved/rejected)
- [ ] Admin dashboard:
  - [ ] Review pending vehicles
  - [ ] Approve/reject UI

---

### **Phase 2 — Infrastructure Foundation**
- [ ] Kubernetes manifests:
  - [ ] App Deployment
  - [ ] Service
  - [ ] Ingress
  - [ ] ConfigMaps
  - [ ] Secrets
- [ ] Reverse proxy setup (Traefik/Nginx):
  - [ ] HTTPS (Let's Encrypt)
  - [ ] Route frontend + backend
  - [ ] Rewrite rules

---

### **Phase 3 — Authentication Architecture**
- [ ] Add refresh tokens / sessions
- [ ] Secure cookie-based auth (if needed)
- [ ] Role system:
  - [ ] `user`
  - [ ] `admin`
- [ ] Rate limiting for auth endpoints
- [ ] Email verification (optional)
- [ ] Password reset flow (optional)

---

### **Phase 4 — CI/CD Pipeline**
- [ ] GitHub Actions / GitLab CI:
  - [ ] Lint + unit tests
  - [ ] Build images
  - [ ] Push to registry
- [ ] Deploy to Kubernetes:
  - [ ] Apply manifests automatically
  - [ ] Rolling updates
  - [ ] Automatic rollback on crash
- [ ] Health checks & readiness/liveness probes

---

### **Phase 5 — PR Deployments**
- [ ] Ephemeral namespaces for PRs
- [ ] Automated DNS routing per environment
- [ ] Auto-comments on PRs with preview URLs
- [ ] Auto-destroy PR environments after merge/close

---

### **Phase 6 — Post-MVP Enhancements**
- [ ] Advanced search filters
- [ ] Full i18n support
- [ ] Dealer role & features
- [ ] Subscriptions + micropayments (Stripe)
- [ ] Admin analytics dashboard
- [ ] Vehicle reporting system

---

## 🚀 Deployment Architecture Overview
- **Reverse Proxy**: TLS termination, routing.
- **Frontend**: Static build or Node runtime container.
- **Backend**: API container with protected routes.
- **Database**: PostgreSQL/MySQL external managed DB.
- **Kubernetes Cluster**:
  - Deployments
  - Services
  - Ingress
  - Secrets / ConfigMaps
- **CI/CD Pipeline**:
  - Test → Build → Push → Deploy → Verify

---

## 📦 Tech Checklist
- [ ] Next.js / Vue / Svelte frontend
- [ ] Node / Laravel / Django backend
- [ ] Docker containers
- [ ] Kubernetes cluster
- [ ] Traefik or Nginx reverse proxy
- [ ] SSL certificates
- [ ] CI workflow
- [ ] Container registry configured

---

## 📘 Next Steps
1. Implement authentication + protected vehicle creation.
2. Add admin verification flow.
3. Containerize services.
4. Deploy MVP manually once.
5. Build CI/CD automation.
6. Add PR preview deployments.
