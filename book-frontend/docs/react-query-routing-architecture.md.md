# 🧠 Frontend Architecture Guide (E-commerce Application)

---

## 📌 Overview

This project follows a **modern, scalable frontend architecture** using:

* **React (Vite)**
* **React Router (Data Mode)** → Routing only
* **React Query (@tanstack/react-query)** → Server state management
* **OpenAPI Generated Client** → API layer
* **MobX** → Client-side state (auth, UI)

---

## 🎯 Core Goals

* Clean separation of concerns
* Scalable architecture for large applications
* Avoid redundant API calls
* Enable caching & performance optimization
* AI-agent friendly structure

---

## 🏗️ Architecture Layers

```
UI (Pages / Components)
        ↓
React Query (Query Layer)
        ↓
OpenAPI Client (API Layer)
        ↓
Backend (NestJS)
```

---

## 🧱 Folder Structure

```
src/
 ├── api/generated/         # OpenAPI auto-generated client
 │
 ├── queries/               # 🔥 CORE: Query Layer
 │    ├── product/
 │    │    └── product.query.ts
 │    ├── cart/
 │    ├── user/
 │
 ├── hooks/                 # Optional reusable hooks
 │
 ├── routes/
 │    ├── public.routes.ts
 │    ├── admin.routes.ts
 │    ├── ProtectedRoute.tsx
 │
 ├── layouts/
 │    ├── MainLayout.tsx
 │    ├── AdminLayout.tsx
 │
 ├── pages/
 │
 ├── store/                 # MobX (auth, UI state)
 │
 ├── app/
 │    ├── router.tsx
 │    ├── providers.tsx
```

---

## 🚦 Routing Strategy

### ✅ Responsibilities

* Page navigation
* Layout management
* Role-based protection
* Code splitting

### ❌ Avoid

* API calls inside loaders

---

## 🔐 Role-Based Routing

```
<ProtectedRoute role="admin">
  <AdminLayout />
</ProtectedRoute>
```

### Behavior:

* Not logged in → redirect to `/login`
* Unauthorized role → redirect to `/`

---

## 📡 API Layer (OpenAPI)

* All API calls come from generated client

Example:

```
ProductService.getProducts()
ProductService.getProductById(id)
```

### Rules:

* ❌ Do NOT create custom axios services
* ❌ Do NOT call APIs directly everywhere

---

## ⚡ Query Layer (MOST IMPORTANT)

### Purpose:

* Centralize API usage
* Define query keys
* Enable caching & invalidation
* Keep components clean

---

## 🧩 Creating Queries (Step-by-Step)

### 📄 File:

`src/queries/product/product.query.ts`

```ts
import { ProductService } from "@/api/generated";

export const productQueries = {
  // 🔹 Fetch all products
  all: () => ({
    queryKey: ["products"],
    queryFn: () => ProductService.getProducts(),
  }),

  // 🔹 Fetch single product
  detail: (id: string) => ({
    queryKey: ["product", id],
    queryFn: () => ProductService.getProductById(id),
  }),
};
```

---

## 🧠 How Queries Work

Example:

```
productQueries.detail("123")
```

Returns:

```
{
  queryKey: ["product", "123"],
  queryFn: () => ProductService.getProductById("123")
}
```

React Query uses:

* `queryKey` → caching
* `queryFn` → API call

---

---

## ⚡ API States Handling (React Query)

Handling API states is **mandatory for good UX and stability**.

React Query provides built-in states:

* `isLoading` → initial loading
* `isError` → request failed
* `error` → error details
* `isSuccess` → data fetched
* `isFetching` → background refetching

---

## 🧩 Basic Usage

```tsx
const {
  data,
  isLoading,
  isError,
  error,
} = useQuery(productQueries.all());
```

---

## ✅ Standard UI Handling Pattern

```tsx
if (isLoading) {
  return <div>Loading...</div>; // or Skeleton
}

if (isError) {
  return <div>Error: {error.message}</div>;
}

return (
  <div>
    {data?.map((item) => (
      <div key={item.id}>{item.productName}</div>
    ))}
  </div>
);
```

---

## 🎯 Recommended UX Improvements

### 1. Use Skeleton Loaders (Better than "Loading...")

```tsx
if (isLoading) return <ProductSkeleton />;
```

---

### 2. Friendly Error UI

```tsx
if (isError) {
  return (
    <ErrorState
      message="Failed to load products"
      retry={refetch}
    />
  );
}
```

---

## 🔁 Background Fetching State

```tsx
const { isFetching } = useQuery(productQueries.all());
```

### Use case:

* Show small loader while refreshing

```tsx
{isFetching && <span>Refreshing...</span>}
```

---

## ⚡ Combined Pattern (Best Practice)

```tsx
const {
  data,
  isLoading,
  isError,
  error,
  refetch,
  isFetching,
} = useQuery(productQueries.all());

if (isLoading) return <Skeleton />;

if (isError) {
  return <ErrorState retry={refetch} />;
}

return (
  <div>
    {isFetching && <SmallLoader />}
    
    {data?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
```

---

## 🧠 State Meanings (IMPORTANT)

| State      | Meaning               |
| ---------- | --------------------- |
| isLoading  | First time loading    |
| isError    | API failed            |
| error      | Error object          |
| isFetching | Refetch in background |
| isSuccess  | Data available        |

---

## 🚨 Error Handling Best Practices

* Show user-friendly messages
* Avoid exposing raw backend errors
* Always provide retry option
* Log errors for debugging

---

## ⚡ Global Error Handling (Optional Advanced)

Use interceptors (OpenAPI / axios):

* Handle `401 Unauthorized` → redirect to login
* Handle `500` → show global error toast

---

## ❌ Anti-Patterns

* ❌ Ignoring error state
* ❌ Showing blank screen
* ❌ Using only console.log for errors
* ❌ Blocking UI during background refetch

---

## 🏁 Final Rule

> Every API call MUST handle:
>
> * Loading
> * Error
> * Success

---


## 🧩 Using Queries in Components

### 📄 Product List Page

```tsx
import { useQuery } from "@tanstack/react-query";
import { productQueries } from "@/queries/product/product.query";

export default function ProductPage() {
  const { data, isLoading } = useQuery(productQueries.all());

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map((product) => (
        <div key={product.id}>{product.productName}</div>
      ))}
    </div>
  );
}
```

---

### 📄 Product Details Page

```tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productQueries } from "@/queries/product/product.query";

export default function ProductDetails() {
  const { id } = useParams();

  if (!id) return null;

  const { data, isLoading } = useQuery(
    productQueries.detail(id)
  );

  if (isLoading) return <div>Loading...</div>;

  return <div>{data?.productName}</div>;
}
```

---

## 🔁 Data Fetching Lifecycle

```
User navigates to page
        ↓
Component renders
        ↓
useQuery runs
        ↓
Check cache
   ↓        ↓
Hit       Found
API       Cache
   ↓        ↓
Store     Return
   ↓
Re-render UI
```

---

## ⚡ Caching Behavior

```ts
useQuery({
  ...productQueries.all(),
  staleTime: 5 * 60 * 1000,
});
```

### Result:

* Within 5 minutes → no API call
* After → background refetch

---

## 🔁 Mutations (Write Operations)

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: ProductService.createProduct,
  onSuccess: () => {
    queryClient.invalidateQueries(["products"]);
  },
});
```

---

## ⚡ Optional: Custom Hooks

```ts
export const useProducts = () =>
  useQuery(productQueries.all());

export const useProduct = (id: string) =>
  useQuery(productQueries.detail(id));
```

---

## 🚀 Performance Optimization

### Prefetching

```ts
queryClient.prefetchQuery(productQueries.detail(id));
```

---

## ❌ Anti-Patterns

* ❌ Using `useEffect` for API calls
* ❌ Using React Router loaders for fetching
* ❌ Calling OpenAPI directly inside components everywhere
* ❌ No query key structure

---

## 🧠 Mental Models

### Old Approach

```
useEffect → fetch data
```

### New Approach

```
useQuery → declare data dependency
```

---

## 🏁 Final Rules

* React Router → routing only
* React Query → all server data
* OpenAPI → API source
* Query Layer → REQUIRED abstraction

---

## 🤖 Instructions for AI IDE Agents

* Always fetch data using query layer
* Never call API directly in components
* Maintain consistent query keys
* Use mutations for all write operations
* Keep components free of business logic
* Follow module-based query structure

---

## ✅ Summary

This architecture ensures:

* High performance (caching)
* Clean codebase
* Easy scalability
* Predictable data flow
* AI-friendly structure
