# React Recipe Book

React frontend for the AppsDev API Tutorial. Authentication and recipe operations are kept in `src/services`, using the shared Axios client in `src/lib/axios.ts`; pages and components call those services instead of making requests directly.

## Student guide

Read the [Frontend Structure and API Guide](docs/frontend-structure-and-api-guide.md) for folder responsibilities, component organization, service functions, authentication, and API connections.

## Run locally

1. Start the API from `appsdev-api-tutorial` with its database configured and available:

   ```bash
   npm run dev
   ```

2. In this folder, copy `.env.example` to `.env`. Set `VITE_API_BASE_URL` to the API base URL, including `/api` (for example `http://localhost:7000/api`).
3. Start the frontend:

   ```bash
   npm install
   npm run dev
   ```

The API's `FRONTEND_URL` must match the Vite origin, normally `http://localhost:5173`, because browser authentication uses credentialed requests and HttpOnly cookies.

## Authentication and token rotation

The frontend signs in or signs up through `/auth/v1`, then reads the current user from `/auth/v1/session`. Access and refresh tokens stay in the API's HttpOnly cookies; the frontend does not store tokens in local storage. It fetches an in-memory CSRF token for unsafe requests and refreshes that token after authentication changes.

On startup, the app attempts to refresh the cookie session. When an API request returns 401, the HTTP client performs one refresh request, receives the API's rotated token cookies, fetches a new CSRF token, and retries the original request once. The API consumes each refresh token during rotation, so clients must use the newly set cookie pair.

The browser must be able to reach the API origin. In production, configure HTTPS, a stable `CSRF_SECRET`, and an exact `FRONTEND_URL` origin in the API.

## Pages and access

- `/auth/login` and `/auth/signup`: guest forms under `src/pages/auth`, sharing `src/pages/auth/layout.tsx`.
- `/user`: USER recipe collection; screens live under `src/pages/user`.
- `/recipe/:id`: USER recipe details.
- `/admin`: ADMIN table backed by `getAllRecipesService` and the API's `/recipes/v1/get-all-recipes` endpoint.

The root URL redirects based on the authenticated user's role. Frontend route guards control navigation; the API authentication and role middleware enforce access. Public signup creates USER accounts. ADMIN roles must be assigned through your trusted database/admin workflow; sign in again after changing a role.
