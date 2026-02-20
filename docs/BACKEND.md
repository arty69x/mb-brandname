# MB BRANDNAME — Backend Infrastructure & Data Governance

## I. Overview

The MB BRANDNAME "Backend" is a high-fidelity simulated architecture designed for seamless prototyping and real-time data persistence within the Next.js runtime. It utilizes a centralized `MockDB` pattern to manage the boutique's digital bounty and customer transactions.

## II. Data Models

### 1. `Product` Archive
Representing an authenticated luxury item.
- **Attributes**: `id`, `name`, `brand`, `category`, `price`, `image`, `description` (EN/TH), `stock`, `featured`, `newArrival`.
- **Metadata**: `condition` (Japanese Grade), `dimensions`, `period`.

### 2. `Order` Records
Managing customer acquisition and fulfillment.
- **Attributes**: `id`, `userId`/`guestId`, `items` (OrderItem[]), `total`, `status` (`pending`, `shipped`, `delivered`, `cancelled`), `createdAt`.
- **Shipping**: Structured object containing name, street, city, postal code, and country.

### 3. `HeroSlide` Cinematic State
Governs landing page storytelling.
- **Assets**: 1920x1080 Images and 4K Video background URLs.

## III. Data Governance (`MockDB`)

The `MockDB` class acts as the single source of truth:
- **Relational Simulation**: Links orders to products and users.
- **Advanced Querying**: Implements multi-parameter filtering for the frontend search engine (brand, keyword, status).
- **In-Memory Persistence**: Maintains state across page transitions during the browser session.

## IV. Administrative Suite: "The Vault Control"

Accessed via `/backend`, this management layer allows boutique administrators to govern all aspects of the platform.

### 1. Catalog Management
- **Audit**: CRUD operations for the entire product and category library.
- **Metadata Control**: Real-time toggling of `Featured` and `New Arrival` spotlights.

### 2. Marketplace Operations
- **Order Processing**: Visibility into all customer orders with the ability to update shipping status.
- **Status Workflow**: Tracks the lifecycle of a purchase from "Pending" to "Delivered".

### 3. Hero Visuals
- Editable homepage carousel configuration (images/videos/titles).

## V. Security & Authentication

- **Admin Access**: Protected via `AuthContext`. Default credentials: `admin` / `admin`.
- **API Protection**: Backend API routes verify administrative privilege before allowing data mutation.
- **SEO/Robots**: `robots.txt` ensures private dashboards are excluded from search engine indices.

---

_MB BRANDNAME — Powered by Precision._
