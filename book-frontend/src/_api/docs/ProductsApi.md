# ProductsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**productControllerCreateProduct**](#productcontrollercreateproduct) | **POST** /api/products | |
|[**productControllerGetAdminProducts**](#productcontrollergetadminproducts) | **GET** /api/products/admin/list | [Admin] Get all products including inactive|
|[**productControllerGetAllProducts**](#productcontrollergetallproducts) | **GET** /api/products | Get all active products|
|[**productControllerGetProductById**](#productcontrollergetproductbyid) | **GET** /api/products/{id} | Get product by ID|
|[**productControllerSoftDelete**](#productcontrollersoftdelete) | **DELETE** /api/products/{id} | [Admin] Soft delete a product|
|[**productControllerUpdateProduct**](#productcontrollerupdateproduct) | **PATCH** /api/products/{id} | [Admin] Update a product|
|[**productControllerUpdateStatus**](#productcontrollerupdatestatus) | **PATCH** /api/products/{id}/status | [Admin] Toggle product active/inactive status|
|[**productControllerUpdateStock**](#productcontrollerupdatestock) | **PATCH** /api/products/{id}/stock | [Admin] Update product stock|

# **productControllerCreateProduct**
> productControllerCreateProduct()


### Example

```typescript
import {
    ProductsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductsApi(configuration);

let productName: string; // (default to undefined)
let description: string; // (default to undefined)
let price: number; // (default to undefined)
let stock: number; // (default to undefined)
let categoryId: string; // (default to undefined)
let image: File; //Product image file (optional) (optional) (default to undefined)
let brand: string; // (optional) (default to undefined)
let promotionLabel: string; // (optional) (default to undefined)
let soldBy: string; // (optional) (default to undefined)
let ingredients: string; // (optional) (default to undefined)
let specialFor: string; // (optional) (default to undefined)
let offerPercentage: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.productControllerCreateProduct(
    productName,
    description,
    price,
    stock,
    categoryId,
    image,
    brand,
    promotionLabel,
    soldBy,
    ingredients,
    specialFor,
    offerPercentage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productName** | [**string**] |  | defaults to undefined|
| **description** | [**string**] |  | defaults to undefined|
| **price** | [**number**] |  | defaults to undefined|
| **stock** | [**number**] |  | defaults to undefined|
| **categoryId** | [**string**] |  | defaults to undefined|
| **image** | [**File**] | Product image file (optional) | (optional) defaults to undefined|
| **brand** | [**string**] |  | (optional) defaults to undefined|
| **promotionLabel** | [**string**]**Array<&#39;New Arrival&#39; &#124; &#39;Best Seller&#39; &#124; &#39;Clearance&#39; &#124; &#39;Hot Deal&#39; &#124; &#39;Limited Edition&#39;>** |  | (optional) defaults to undefined|
| **soldBy** | [**string**] |  | (optional) defaults to undefined|
| **ingredients** | [**string**] |  | (optional) defaults to undefined|
| **specialFor** | [**string**] |  | (optional) defaults to undefined|
| **offerPercentage** | [**number**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **productControllerGetAdminProducts**
> PaginatedProductResponseDto productControllerGetAdminProducts()

Admin endpoint: returns all products regardless of active status

### Example

```typescript
import {
    ProductsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductsApi(configuration);

let search: string; //Search by product name (ILIKE) (optional) (default to undefined)
let categoryId: string; //Filter by category UUID (optional) (default to undefined)
let minPrice: number; //Minimum price filter (optional) (default to undefined)
let maxPrice: number; //Maximum price filter (optional) (default to undefined)
let sortBy: 'price' | 'rating' | 'createdAt'; // (optional) (default to undefined)
let order: 'asc' | 'desc'; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.productControllerGetAdminProducts(
    search,
    categoryId,
    minPrice,
    maxPrice,
    sortBy,
    order,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **search** | [**string**] | Search by product name (ILIKE) | (optional) defaults to undefined|
| **categoryId** | [**string**] | Filter by category UUID | (optional) defaults to undefined|
| **minPrice** | [**number**] | Minimum price filter | (optional) defaults to undefined|
| **maxPrice** | [**number**] | Maximum price filter | (optional) defaults to undefined|
| **sortBy** | [**&#39;price&#39; | &#39;rating&#39; | &#39;createdAt&#39;**]**Array<&#39;price&#39; &#124; &#39;rating&#39; &#124; &#39;createdAt&#39;>** |  | (optional) defaults to undefined|
| **order** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|


### Return type

**PaginatedProductResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **productControllerGetAllProducts**
> PaginatedProductResponseDto productControllerGetAllProducts()

Returns paginated active products with optional filters (search, category, price range, sorting)

### Example

```typescript
import {
    ProductsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductsApi(configuration);

let search: string; //Search by product name (ILIKE) (optional) (default to undefined)
let categoryId: string; //Filter by category UUID (optional) (default to undefined)
let minPrice: number; //Minimum price filter (optional) (default to undefined)
let maxPrice: number; //Maximum price filter (optional) (default to undefined)
let sortBy: 'price' | 'rating' | 'createdAt'; // (optional) (default to undefined)
let order: 'asc' | 'desc'; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.productControllerGetAllProducts(
    search,
    categoryId,
    minPrice,
    maxPrice,
    sortBy,
    order,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **search** | [**string**] | Search by product name (ILIKE) | (optional) defaults to undefined|
| **categoryId** | [**string**] | Filter by category UUID | (optional) defaults to undefined|
| **minPrice** | [**number**] | Minimum price filter | (optional) defaults to undefined|
| **maxPrice** | [**number**] | Maximum price filter | (optional) defaults to undefined|
| **sortBy** | [**&#39;price&#39; | &#39;rating&#39; | &#39;createdAt&#39;**]**Array<&#39;price&#39; &#124; &#39;rating&#39; &#124; &#39;createdAt&#39;>** |  | (optional) defaults to undefined|
| **order** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|


### Return type

**PaginatedProductResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **productControllerGetProductById**
> ProductResponseDto productControllerGetProductById()

Returns a single active product by its UUID

### Example

```typescript
import {
    ProductsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.productControllerGetProductById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ProductResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **productControllerSoftDelete**
> productControllerSoftDelete()

Sets isActive = false. Product is hidden from public listings but not removed from DB.

### Example

```typescript
import {
    ProductsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.productControllerSoftDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **productControllerUpdateProduct**
> ProductResponseDto productControllerUpdateProduct(updateProductDto)

Partial update of any product field

### Example

```typescript
import {
    ProductsApi,
    Configuration,
    UpdateProductDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductsApi(configuration);

let id: string; // (default to undefined)
let updateProductDto: UpdateProductDto; //

const { status, data } = await apiInstance.productControllerUpdateProduct(
    id,
    updateProductDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateProductDto** | **UpdateProductDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ProductResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **productControllerUpdateStatus**
> ProductResponseDto productControllerUpdateStatus(updateStatusDto)

Activate or deactivate a product without deleting it

### Example

```typescript
import {
    ProductsApi,
    Configuration,
    UpdateStatusDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductsApi(configuration);

let id: string; // (default to undefined)
let updateStatusDto: UpdateStatusDto; //

const { status, data } = await apiInstance.productControllerUpdateStatus(
    id,
    updateStatusDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateStatusDto** | **UpdateStatusDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ProductResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **productControllerUpdateStock**
> ProductResponseDto productControllerUpdateStock(updateStockDto)

Directly set the stock quantity for a product

### Example

```typescript
import {
    ProductsApi,
    Configuration,
    UpdateStockDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductsApi(configuration);

let id: string; // (default to undefined)
let updateStockDto: UpdateStockDto; //

const { status, data } = await apiInstance.productControllerUpdateStock(
    id,
    updateStockDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateStockDto** | **UpdateStockDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ProductResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

