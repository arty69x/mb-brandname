# MB BRANDNAME — API Communication Layer

## I. Communication Protocol

The API client (`api-client.ts`) acts as the high-fidelity bridge between the Next.js frontend and the `MockDB`. It implements a robust `fetch`-based interface that mimics professional asynchronous service layers.

## II. Service Methodology

All API calls are wrapped in `async/await` blocks with built-in error handling and status logging.

### Base Configuration

- **Base URL**: `/api` (Proxied to MockDB)
- **Content Type**: `application/json`

## III. Endpoint Specification

### 1. Products Archive

- `GET /products`: Retrieves the full collection or a filtered subset.
  - **Parameters**: `category`, `featured`, `newArrival`.
- `GET /products/:id`: Retrieves a specific archive item by its unique nomenclature ID.
- `POST /products`: Registers a new item in the Vault.
- `PUT /products/:id`: Amends metadata for an existing item.
- `DELETE /products/:id`: Purges an item from the digital gallery.

### 2. Category Taxonomy

- `GET /categories`: Retrieves all available collection headers.

### 3. Cinematic Hero Slides

- `GET /hero-slides`: Retrieves the current storytelling sequences for the homepage.
- `PUT /hero-slides/:id`: Updates the cinematic configuration (Admin only).

## IV. Usage Example

```typescript
import { api } from "@/lib/api-client";

// Fetching curated bags for the collection display
const archiveItems = await api.getProducts({
  category: "bags",
  newArrival: true,
});

// Syncing an amendment to the Vault
await api.updateProduct("h1", {
  price: "695,000",
  featured: true,
});
```

## V. Future Scalability

The `api-client.ts` layer is architected for easy migration to a live Node.js or Serverless backend. By substituting the `BASE_URL`, the entire frontend can be repointed to a production database without modifying component logic.

---

_MB BRANDNAME — Connecting Archive to Access._
