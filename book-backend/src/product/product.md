# 📦 Product Module Documentation (Production Ready)

---

## 📌 Overview

The Product Module manages all product-related operations in the e-commerce system. It follows a structured hierarchy:

* **Master Category**

  * Stored in `cfg_master_category` table (to be newly created in `config.schema.ts`)
  * Example: Natural Products
* **Category**

  * Example: Shampoo, Perfume
* **Product**

  * Actual item displayed to users

Roles-Based:
Ensure that role guards are implemented so that only users with the admin role can perform product-related mutations.

---

## 🧱 Database Schema

### Table: `products`

| Field           | Type          | Description                      |
| --------------- | ------------- | -------------------------------- |
| id              | UUID          | Primary Key                      |
| productName     | varchar(255)  | Product name                     |
| description     | text          | Product description              |
| imageUrl        | varchar       | Cloudinary image URL             |
| imagePublicId   | varchar       | Cloudinary public ID             |
| price           | numeric(10,2) | Product price                    |
| stock           | integer       | Available stock                  |
| offerPercentage | integer       | Discount percentage (0–100)      |
| isActive        | boolean       | Product visibility (soft delete) |
| soldBy          | varchar(255)  | Seller name                      |
| promotionLabel  | varchar(255)  | Marketing label                  |
| brand           | varchar(255)  | Brand name                       |
| ingredients     | text          | Ingredients (if applicable)      |
| rating          | numeric(2,1)  | Product rating                   |
| tags            | text[]        | Search tags                      |
| specialFor      | text          | Target audience                  |
| categoryId      | UUID          | Foreign key (category)           |
| createdAt       | timestamp     | Created time                     |
| updatedAt       | timestamp     | Updated time                     |

### Index

* `idx_product_category_id` → Optimized category filtering

---

## 🏗️ Module Architecture

```
product/
│
├── controller/
├── service/
├── repository/
├── dto/
```

---

## ⚙️ Responsibilities

### 🗂️ Controller

* Handle HTTP requests
* Provide Swagger documentation
* Delegate logic to service layer
* Return proper status codes

### 🧠 Service

* Business logic
* Validations
* DTO transformations
* Throw meaningful errors

### 🗃️ Repository

* Direct DB interaction
* Use try-catch for DB errors
* No business logic

### 📦 DTO

* Request & Response models
* Validation decorators
* Separate DTOs for create/update/response

---

## 🔥 Features

### 1. Product CRUD

* Create product
* Update product
* Soft delete product
* Get product by ID

---

### 2. Product Listing

* Get all products
* Filter by:

  * Category
  * Tags
  * Brand
  * Price range
  * Rating

---

### 3. Search & Filtering

Search applies to:

* `productName` (ILIKE)
* `tags` (array search)

Example:

```
GET /products?search=shampoo
```

---

### 4. Query DTO

```ts
export class QueryProductDto {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'createdAt';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
```

### Default Behavior

* Default sorting → `createdAt DESC`
* Only `isActive = true` products shown to users

---

### 5. Pagination

#### Request

```
GET /products?page=1&limit=10
```

#### Response

```json
{
  "data": [],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

---

### 6. Inventory Management

* Stock update API
* Prevent purchase when `stock = 0`

---

## 📦 DTOs

### Create Product DTO

The earlier DTO was simplified for basic operations, but in a real production system you should include all fields that are required to create a complete product. Fields like description, brand, promotionLabel, tags, soldBy, ingredients, and specialFor are essential for frontend display and should be part of the DTO.

```ts
export class CreateProductDto {
  productName: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;

  imageUrl?: string;
  imagePublicId?: string;

  brand?: string;
  promotionLabel?: string;
  soldBy?: string;
  ingredients?: string;
  specialFor?: string;

  tags?: string[];
  offerPercentage?: number;
}
```

---

### Update Product DTO

Update DTO should allow partial updates for all editable fields.

```ts
export class UpdateProductDto {
  productName?: string;
  description?: string;
  price?: number;
  stock?: number;

  brand?: string;
  promotionLabel?: string;
  soldBy?: string;
  ingredients?: string;
  specialFor?: string;

  tags?: string[];
  offerPercentage?: number;

  imageUrl?: string;
  imagePublicId?: string;
}
```

---

### Response DTO

Response DTO must include all fields required by the frontend to render product details. You can also create multiple response DTOs (e.g., list view vs detail view), but below is a full version.

```ts
export class ProductResponseDto {
  id: string;
  productName: string;
  description: string;

  imageUrl: string;
  price: number;
  rating: number;
  isActive: boolean;

  brand?: string;
  promotionLabel?: string;
  soldBy?: string;
  ingredients?: string;
  specialFor?: string;

  tags?: string[];
  offerPercentage?: number;
}
```

---

### ✅ Key Explanation

* Those fields were not included earlier because the DTO was simplified for demonstration.
* In real-world applications, DTOs must reflect all data needed by the frontend.
* If you want better performance, you can create:

  * ProductListResponseDto → minimal fields for listing
  * ProductDetailResponseDto → full fields for product page

This ensures flexibility, scalability, and optimized API responses.

---

## 🖼️ Image Upload Strategy

We use Cloudinary via the Storage Module. already create file services on file.service.ts

### Flow:

1. Frontend uploads image → `/upload/image`
2. Backend uploads to Cloudinary
3. Receive:

   * `imageUrl`
   * `imagePublicId`
4. Pass both to Product API
5. Store in DB

---

## ✅ Validation Rules

* `productName` → required, min 3 chars
* `price` → must be > 0
* `stock` → must be ≥ 0
* `categoryId` → must exist
* `offerPercentage` → 0–100 only

---

## 🗑️ Deletion Strategy

* Use **soft delete** → `isActive = false`
* Hard delete only for admin/internal use

---

## 🔐 Authorization

### Admin Only:

* Create product
* Update product
* Delete product
* Update stock/status

### Users:

* View products only

---

## ⚠️ Edge Cases

* Product without category → reject
* Negative price or stock → reject
* Inactive product hidden from users
* Missing image → allow fallback
* Large data → enforce pagination

---

## 🔗 API Design

### Product APIs

```
POST   /products
GET    /products
GET    /products/:id
PATCH  /products/:id
DELETE /products/:id
```

---

### Advanced APIs (Production)

```
PATCH  /products/:id/status     → activate/deactivate
PATCH  /products/:id/stock      → update stock
GET    /products/admin          → include inactive products
```

---

### Filtering Example

```
GET /products?categoryId=&minPrice=&maxPrice=&search=
```

---

## 📘 OpenAPI Contract

* All APIs must be Swagger documented
* DTOs must be used for request/response
* Do NOT expose raw DB entities
* Use proper HTTP status codes

---

## 🧼 Code Quality Rules

### Repository

* Always use try-catch
* Return structured DB errors
* No business logic

### Service

* Business logic only
* Validate all inputs
* Throw meaningful errors

### Controller

* No business logic
* Clean Swagger docs
* Proper responses

### DTO

* Use validation decorators
* Separate request/response models

---

## 🚀 Future Enhancements

* Pagination with infinite scroll
* Product reviews system
* Wishlist integration
* Recommendation engine
* ElasticSearch integration

---

## ✅ Summary

This module ensures:

* Clean architecture (Controller → Service → Repository)
* Scalable and maintainable structure
* Efficient filtering and querying
* Production-ready API design
* AI-agent-friendly documentation

---
