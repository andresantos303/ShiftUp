import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: "Tshirt Shift Up",
        price: 25,
        description: "A high-quality t-shirt featuring the Shift Up logo. Perfect for event attendees and fans to wear and showcase their support.",
        category: "clothes",
        purchased: 0
      }
    ],
  }),
  actions: {
    addProduct(product) {
      this.products.push(product);
    },
    removeProduct(id) {
      this.products = this.products.filter(product => product.id !== id);
    },
    updateProduct(updatedProduct) {
      const index = this.products.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
      }
    },
    incrementPurchased(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        product.purchased += 1;
      }
    },
  },
  getters: {
    totalPurchased: (state) => {
      return state.products.reduce((total, product) => total + product.purchased, 0);
    },
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id);
    },
    getProductSales: (state) => (id) => {
      const product = state.products.find(product => product.id === id);
      return product ? product.purchased : 0;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'products',
        storage: localStorage,
      },
    ],
  },
});
