# MB BRANDNAME — Backend Infrastructure & Data Governance

## I. Overview

The MB BRANDNAME "Backend" is a high-fidelity simulated architecture designed for seamless prototyping and real-time data persistence within the Next.js runtime. It utilizes a centralized `MockDB` pattern to manage the boutique's digital bounty.

## II. Data Models

### 1. `Product` Archive

The core entity representing a luxury item.

- **Attributes**: `id`, `name`, `brand`, `category`, `price` (THB), `image`, `description` (EN/TH), `stock`, `featured`, `newArrival`.
- **Metadata**: `condition` (Japanese Grade Scale), `dimensions`, `period`.

### 2. `Category` Taxonomy

Governs the organization of the collection.

- **Structure**: `id`, `slug`, `name` (EN/TH), `image`.
- **Current Verticals**: `bags`, `accessories`.

### 3. `HeroSlide` Cinematic State

Governs the landing page storytelling.

- **Attributes**: `id`, `image`, `video` (4K asset), `title`, `subtitle`.

## III. Data Governance (`MockDB`)

The `MockDB` class provides static methods for state manipulation, simulating RESTful operations with in-memory persistence.

- **Filtering Intelligence**: Case-insensitive category matching and ID-prefix detection (e.g., `h` for Hermès artifacts).
- **Automatic Normalization**: Handles internal state synchronization during creation and amendment.

## IV. Administrative Suite: "The Vault Control"

A dedicated backend interface (`/backend/products`) for boutique managers to audit and amend the archive.

### 1. Inventory Audit

- Real-time status tracking (Live/Draft/Purged).
- Stock level indicators with visual heatmaps (Red for low stock artifacts).
- Global search across name, brand, and class.

### 2. Metadata Amendment (`EditArchive`)

- Synchronous narrative editing (EN/TH).
- Deployment directives: Control over `Featured` and `New Arrival` status.
- Visual asset preview and stage management.

## V. Security Integrity

- **Robots Policy**: Restricted crawling of administrative and API routes through `robots.txt`.
- **Auth Gate**: Backend routes are protected via the `AuthContext` to ensure only authorized boutique personnel can access the inventory meta-layer.

---

_MB BRANDNAME — Powered by Precision._
