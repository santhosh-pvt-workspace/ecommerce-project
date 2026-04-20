# CartResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**sessionId** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [default to undefined]
**items** | [**Array&lt;CartItemResponseDto&gt;**](CartItemResponseDto.md) |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]

## Example

```typescript
import { CartResponseDto } from './api';

const instance: CartResponseDto = {
    id,
    userId,
    sessionId,
    status,
    items,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
