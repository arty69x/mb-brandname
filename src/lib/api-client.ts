import { Product, Category, HeroSlide } from "@/types/api";

const BASE_URL = "/api";

/**
 * Robust API Client for MB Brandname
 * Refined for high-fidelity CRUD and structural state synchronization
 */
export const api = {
  // PRODUCTS
  async getProducts(filter?: {
    category?: string;
    featured?: boolean;
    newArrival?: boolean;
    search?: string;
    brand?: string;
    sort?: "price_asc" | "price_desc" | "newest";
  }): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      if (filter?.category) params.append("category", filter.category);
      if (filter?.featured) params.append("featured", "true");
      if (filter?.newArrival) params.append("newArrival", "true");
      if (filter?.search) params.append("search", filter.search);
      if (filter?.brand) params.append("brand", filter.brand);
      if (filter?.sort) params.append("sort", filter.sort);

      const res = await fetch(`${BASE_URL}/products?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const json = await res.json();
      return Array.isArray(json.data) ? json.data : [];
    } catch (error) {
      console.error("API Error [getProducts]:", error);
      return [];
    }
  },

  async getProductById(id: string | null | undefined): Promise<Product | null> {
    if (!id) return null;
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      return json.data ?? null;
    } catch (error) {
      console.error(`API Error [getProductById] for ID ${id}:`, error);
      return null;
    }
  },

  async createProduct(product: Partial<Product>): Promise<Product | null> {
    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (error) {
      console.error("API Error [createProduct]:", error);
      return null;
    }
  },

  async updateProduct(
    id: string,
    updates: Partial<Product>,
  ): Promise<Product | null> {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (error) {
      console.error("API Error [updateProduct]:", error);
      return null;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      return json.success;
    } catch (error) {
      console.error("API Error [deleteProduct]:", error);
      return false;
    }
  },

  // CATEGORIES
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${BASE_URL}/categories`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const json = await res.json();
      return Array.isArray(json.data) ? json.data : [];
    } catch (error) {
      console.error("API Error [getCategories]:", error);
      return [];
    }
  },

  async createCategory(category: Partial<Category>): Promise<Category | null> {
    try {
      const res = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (_error) {
      return null;
    }
  },

  async updateCategory(
    id: string,
    updates: Partial<Category>,
  ): Promise<Category | null> {
    try {
      const res = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (_error) {
      return null;
    }
  },

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      return json.success;
    } catch (_error) {
      return false;
    }
  },

  // HERO SLIDES
  async getHeroSlides(): Promise<HeroSlide[]> {
    try {
      const res = await fetch(`${BASE_URL}/hero-slides`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const json = await res.json();
      return Array.isArray(json.data) ? json.data : [];
    } catch (error) {
      console.error("API Error [getHeroSlides]:", error);
      return [];
    }
  },

  async updateHeroSlide(
    id: number,
    updates: Partial<HeroSlide>,
  ): Promise<HeroSlide | null> {
    try {
      const res = await fetch(`${BASE_URL}/hero-slides/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (_error) {
      return null;
    }
  },

  // ORDERS
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createOrder(orderData: any) {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (error) {
      console.error("API Error [createOrder]:", error);
      return null;
    }
  },

  async getOrders(userId?: string) {
    try {
      const url = userId
        ? `${BASE_URL}/orders?userId=${userId}`
        : `${BASE_URL}/orders`;
      const res = await fetch(url);
      const json = await res.json();
      return json.success ? json.data : [];
    } catch (error) {
      console.error("API Error [getOrders]:", error);
      return [];
    }
  },

  async updateOrderStatus(id: string, status: string) {
    try {
      const res = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (error) {
      console.error("API Error [updateOrderStatus]:", error);
      return null;
    }
  },
};
