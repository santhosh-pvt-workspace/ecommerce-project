import { makeAutoObservable } from "mobx";
import type { UserResponseDto } from "@/_api/api";

class AuthStore {
  user: UserResponseDto | null = null;
  role: string | null = null;
  isAuthenticated: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.hydrate();
  }

  // Example method to set user details after login
  setAuth(user: UserResponseDto, role: string) {
    this.user = user;
    this.role = role;
    this.isAuthenticated = true;
    localStorage.setItem("userRole", role);
  }

  // Example logout
  logout() {
    this.user = null;
    this.role = null;
    this.isAuthenticated = false;
    localStorage.removeItem("userRole");
  }

  // Reload role on refresh (example hydration)
  hydrate() {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      this.role = savedRole;
      this.isAuthenticated = true; // Temporary simplification
    }
  }
}

export const authStore = new AuthStore();
