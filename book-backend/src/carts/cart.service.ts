import { CartItemsRepository } from "./cart-item.repository";
import { CartRepository } from "./cart.repository";


export class CartService{

    constructor(
        private readonly cartRepo : CartRepository,
        private readonly cartItemsRepo : CartItemsRepository
    ){}

    async getCart(data : { userId? : string, sessionId? : string}){
        return await this.cartRepo.findOrCreateOne({
            userId : data.userId,
            sessionId : data.sessionId
        });
    }

    async addCartItems({userId, sessionId, productId, quantity, price}: {
        userId? : string;
        sessionId? : string;
        productId : string;
        quantity : number;
        price : string;
    }){

        // get cart
        const cart = await this.getCart({ userId, sessionId});

        // check existing item
        const existingItem = await this.cartItemsRepo.findByCartIdAndProductId(cart.id, productId);

        // if exist update quantity
        if(existingItem){
            return this.cartItemsRepo.updateQuantity(
                existingItem.id,
                existingItem.quantity + quantity,
            )
        }

        return this.cartItemsRepo.addItem({
            cartId : cart.id,
            productId : productId,
            quantity : quantity,
            priceSnapshot : price,
        })
    }

    async updateCartItemsQuantity(cartItemId : string, quantity : number){
        if(quantity <= 0){
            throw new Error('Quantity must be greater than 0');
        }

        return this.cartItemsRepo.updateQuantity(cartItemId, quantity);
    }
    

    async removeFromCart(cartItemId: string){
        return this.cartItemsRepo.removeItem(cartItemId);
    }


}