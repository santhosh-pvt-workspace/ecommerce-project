# 📦 Product Module Documentation

## 📌 Overview

The Product Module manages all product-related operations in the e-commerce system. It follows a structured hierarchy:

* **Master Category**

  * Example: Natural Products
* **Category**

  * Example: Shampoo, Perfume
* **Product**

  * Actual item displayed to users

---

## 🧱 Database Schema

### Table: `products`

| Field           | Type          | Description                 |
| --------------- | ------------- | --------------------------- |
| id              | UUID          | Primary Key                 |
| productName     | varchar(255)  | Product name                |
| description     | text          | Product description         |
| imageUrl        | varchar       | Cloudinary image URL        |
| price           | numeric(10,2) | Product price               |
| stock           | integer       | Available stock             |
| offerPercentage | integer       | Discount percentage         |
| isActive        | boolean       | Product visibility          |
| soldBy          | varchar(255)  | Seller name                 |
| promotionLabel  | varchar(255)  | Marketing label             |
| brand           | varchar(255)  | Brand name                  |
| ingredients     | text          | Ingredients (if applicable) |
| rating          | numeric(2,1)  | Product rating              |
| tags            | text[]        | Search tags                 |
| specialFor      | text          | Target audience             |
| categoryId      | UUID          | Foreign key (category)      |
| createdAt       | timestamp     | Created time                |
| updatedAt       | timestamp     | Updated time                |

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
├── schema/
```

---

## ⚙️ Responsibilities

### 🗂️ Controller

* Handle HTTP requests
* Provide clean Swagger documentation
* Delegate logic to service layer

### 🧠 Service

* Contains business logic
* Validations (stock, price, active status)
* Handles DTO transformations
* Throws meaningful business errors

### 🗃️ Repository

* Direct DB interaction
* Always use `try-catch`
* Return structured DB errors

### 📦 DTO

* Request & Response models
* Clean Swagger decorators
* Separate DTOs if response is large

---

## 🔥 Features

### 1. Product CRUD

* Create product
* Update product
* Delete product
* Get product by ID

### 2. Product Listing

* Get all products
* Filter by:

  * Category
  * Tags
  * Brand
  * Price range
  * Rating

### 3. Search & Filtering

* Keyword search (productName, tags)
* Category-based filtering
* Active products only

export class QueryProductDto {
  search?: string;
  category?: string;
  skinType?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'createdAt';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

### 4. Inventory Management

* Stock update
* Prevent purchase when stock = 0

---

## 🖼️ Image Upload Strategy

* Use **Cloudinary**
* Steps:

  1. Upload image from frontend
  2. Backend sends to Cloudinary
  3. Receive image URL
  4. Store URL in `imageUrl`

---

## 🧼 Code Quality Rules

### Repository Layer

* Always use `try-catch`
* Return clean DB errors
* No business logic

### Service Layer

* Only business logic
* Use DTOs strictly
* Validate:

  * Price > 0
  * Stock ≥ 0
  * Category exists
* Return meaningful error messages

### Controller Layer

* Clean Swagger docs
* No business logic
* Proper status codes

### DTO Layer

* Separate:

  * Create DTO
  * Update DTO
  * Response DTO
* Use validation decorators

---

## ⚠️ Edge Cases

* Product without category → reject
* Negative price or stock → reject
* Inactive product should not be visible
* Large response → use pagination
* Missing image → allow but optional fallback

---

## 🚀 Future Enhancements

* Pagination & infinite scroll
* Product reviews system
* Wishlist integration
* Recommendation engine
* Elastic search for fast querying

---

## 🔗 API Design (Sample)

### Create Product

```
POST /products
```

### Get All Products

```
GET /products
```

### Filter Products

```
GET /products?categoryId=&minPrice=&maxPrice=
```

### Get Product by ID

```
GET /products/:id
```

### Update Product

```
PATCH /products/:id
```

### Delete Product

```
DELETE /products/:id
```

---

## ✅ Summary

This module ensures:

* Clean architecture (Controller → Service → Repository)
* Scalable product handling
* Efficient filtering and querying
* Maintainable and AI-agent-friendly structure
