# CartApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**cartControllerAbandonCart**](#cartcontrollerabandoncart) | **PATCH** /api/carts/{id}/abandon | Mark cart as abandoned|
|[**cartControllerAddCart**](#cartcontrolleraddcart) | **POST** /api/carts/add | Add item to cart|
|[**cartControllerClearCart**](#cartcontrollerclearcart) | **DELETE** /api/carts/{id} | Clear entire cart|
|[**cartControllerGetCart**](#cartcontrollergetcart) | **GET** /api/carts | Get current cart session|
|[**cartControllerMarkAsOrdered**](#cartcontrollermarkasordered) | **PATCH** /api/carts/{id}/order | Mark cart as ordered|
|[**cartControllerRemoveItem**](#cartcontrollerremoveitem) | **DELETE** /api/carts/item/{id} | Remove item from cart|
|[**cartControllerUpdateCartItem**](#cartcontrollerupdatecartitem) | **PATCH** /api/carts/item/{id} | Update cart item quantity|

# **cartControllerAbandonCart**
> cartControllerAbandonCart()


### Example

```typescript
import {
    CartApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CartApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.cartControllerAbandonCart(
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

No authorization required

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

# **cartControllerAddCart**
> CartItemResponseDto cartControllerAddCart(addToCartDto)

Adds a product to the cart or updates quantity if it already exists

### Example

```typescript
import {
    CartApi,
    Configuration,
    AddToCartDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CartApi(configuration);

let addToCartDto: AddToCartDto; //

const { status, data } = await apiInstance.cartControllerAddCart(
    addToCartDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addToCartDto** | **AddToCartDto**|  | |


### Return type

**CartItemResponseDto**

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

# **cartControllerClearCart**
> cartControllerClearCart()

Removes all items and resets the cart

### Example

```typescript
import {
    CartApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CartApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.cartControllerClearCart(
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

No authorization required

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

# **cartControllerGetCart**
> CartResponseDto cartControllerGetCart()

Retrieves the current cart for the user or guest session

### Example

```typescript
import {
    CartApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CartApi(configuration);

const { status, data } = await apiInstance.cartControllerGetCart();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CartResponseDto**

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

# **cartControllerMarkAsOrdered**
> cartControllerMarkAsOrdered()


### Example

```typescript
import {
    CartApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CartApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.cartControllerMarkAsOrdered(
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

No authorization required

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

# **cartControllerRemoveItem**
> cartControllerRemoveItem()

Removes a specific cart item by its ID

### Example

```typescript
import {
    CartApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CartApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.cartControllerRemoveItem(
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

No authorization required

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

# **cartControllerUpdateCartItem**
> CartItemResponseDto cartControllerUpdateCartItem(updateCartItemDto)


### Example

```typescript
import {
    CartApi,
    Configuration,
    UpdateCartItemDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CartApi(configuration);

let id: string; // (default to undefined)
let updateCartItemDto: UpdateCartItemDto; //

const { status, data } = await apiInstance.cartControllerUpdateCartItem(
    id,
    updateCartItemDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCartItemDto** | **UpdateCartItemDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CartItemResponseDto**

### Authorization

No authorization required

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

