import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [
      {
        id: 1,
        name: "Tshirt Shift Up - Blue",
        price: 25,
        description:
          "A high-quality t-shirt featuring the Shift Up logo. Perfect for event attendees and fans to wear and showcase their support.",
        category: "clothes",
        purchased: 0,
        image: '/public/images/blueTshirt.png',
      },
      {
        id: 1,
        name: "Tshirt Shift Up - White",
        price: 25,
        description:
          "A high-quality t-shirt featuring the Shift Up logo. Perfect for event attendees and fans to wear and showcase their support.",
        category: "clothes",
        purchased: 0,
        image: '/public/images/whiteTshirt.png',
      },
      {
        id: 1,
        name: "Hoodie Shift Up - Blue",
        price: 50,
        description:
          "A high-quality hoodie featuring the Shift Up logo. Perfect for event attendees and fans to wear and showcase their support.",
        category: "clothes",
        purchased: 0,
        image: '/public/images/blueHoodie.png',
      },
      {
        id: 1,
        name: "Hoodie Shift Up - White",
        price: 50,
        description:
          "A high-quality Hoodie featuring the Shift Up logo. Perfect for event attendees and fans to wear and showcase their support.",
        category: "clothes",
        purchased: 0,
        image: '/public/images/whiteHoodie.png',
      },
      {
        id: 1,
        name: "Notebook Shift Up",
        price: 10,
        description:
          "A high-quality notebook featuring the Shift Up logo. Perfect for event attendees and fans to wear and showcase their support.",
        category: "acessorios",
        purchased: 0,
        image: '/public/images/notebook.png',
      },
      {
        id: 1,
        name: "Pin Shift Up",
        price: 5,
        description:
          "A high-quality pin featuring the Shift Up logo. Perfect for event attendees and fans to wear and showcase their support.",
        category: "acessorios",
        purchased: 0,
        image: '/public/images/pin.png',
      },
    ],
  }),
  actions: {
    addProduct(product) {
      try {
        const newProduct = {
          id: Date.now(),
          name: product.name,
          price: product.price,
          description: product.description || "",
          category: product.category,
          purchased: product.purchased,
          image: product.image,
        };
        this.products.push(newProduct);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
    removeProduct(id) {
      try {
        this.products = this.products.filter((product) => product.id !== id);
      } catch (error) {
        console.error("Error removing product:", error);
      }
    },
    updateProduct(updatedProduct) {
      try {
        const index = this.products.findIndex(
          (product) => product.id === updatedProduct.id
        );
        if (index !== -1) {
          this.products[index] = { ...this.products[index], ...updatedProduct };
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
    incrementPurchased(id) {
      try {
        const product = this.products.find((product) => product.id === id);
        if (product) {
          product.purchased += 1;
        }
      } catch (error) {
        console.error("Error incrementing purchased count:", error);
      }
    },
  },
  getters: {
    totalPurchased: (state) => {
      return state.products.reduce(
        (total, product) => total + product.purchased,
        0
      );
    },
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
    getProductSales: (state) => (id) => {
      const product = state.products.find((product) => product.id === id);
      return product ? product.purchased : 0;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "products",
        storage: localStorage,
      },
    ],
  },
});
