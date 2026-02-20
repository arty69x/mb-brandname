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
  - **Query Parameters**: 
    - `category`: Filter by category slug (bags, accessories).
    - `featured`: Filter by featured status (`true`/`false`).
    - `newArrival`: Filter by new arrival status (`true`/`false`).
    - `search`: Global search string (matches name, brand, description).
    - `brand`: Filter by specific brand name (e.g., "Chanel").
    - `sort`: `price_asc`, `price_desc`, or `newest`.
- `GET /products/:id`: Retrieves a specific archive item.
- `POST /products`: Registers a new item (Admin only).
- `PUT /products/:id`: Amends metadata for an existing item (Admin only).
- `DELETE /products/:id`: Purges an item from the gallery (Admin only).

### 2. Category Taxonomy

- `GET /categories`: Retrieves all available collection headers.
- `POST /categories`: Creates a new category.
- `PUT /categories/:id`: Updates category metadata.

### 3. Cinematic Hero Slides

- `GET /hero-slides`: Retrieves the current storytelling sequences for the homepage.
- `PUT /hero-slides/:id`: Updates cinematic configuration.

### 4. Order Management

- `GET /orders`: Retrieves all orders (Admin) or user-specific orders.
- `POST /orders`: Submits a new order during checkout.
- `PUT /orders/:id`: Updates order status (Pending, Shipped, Delivered).

## IV. Usage Example

```typescript
import { api } from "@/lib/api-client";

// Searching for vintage Chanel bags sorted by price
const results = await api.getProducts({
  category: "bags",
  search: "vintage",
  brand: "Chanel",
  sort: "price_desc"
});

// Creating a new order
const order = await api.createOrder({
  items: cartItems,
  total: totalAmount,
  shippingAddress: customerData
});
```

## V. Future Scalability

The `api-client.ts` layer is architected for easy migration to a live backend. By substituting the `BASE_URL`, the entire frontend can be repointed to a production database (PostgreSQL/MongoDB) without modifying component logic.

---

_MB BRANDNAME — Connecting Archive to Access._
