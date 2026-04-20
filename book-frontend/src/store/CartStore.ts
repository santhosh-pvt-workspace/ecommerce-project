import { makeAutoObservable } from "mobx";

class CartStore {
  isOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  openCart() {
    this.isOpen = true;
  }

  closeCart() {
    this.isOpen = false;
  }

  toggleCart() {
    this.isOpen = !this.isOpen;
  }
}

export const cartStore = new CartStore();
