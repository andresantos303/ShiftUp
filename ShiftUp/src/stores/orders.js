import { defineStore } from 'pinia';
import { useProductsStore } from './products';

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [], // Lista de pedidos
  }),
  actions: {
    addOrder(order) {
      try {
        const productsStore = useProductsStore();

        // Verifica se o produto existe na Products Store
        const product = productsStore.getProductById(order.productId);

        if (product) {
          // Incrementa o nº de vezes que o produto foi comprado
          productsStore.incrementPurchased(order.productId);

          // Adiciona o pedido ao array de orders
          this.orders.push({
            id: Date.now(),
            productId: order.productId,
            userId: order.userId,
            quantity: order.quantity,
            totalPrice: product.price * order.quantity,
            date: new Date().toLocaleString(),
          });
        } else {
          console.error("Product not found!");
        }
      } catch (error) {
        console.error('Error adding order:', error);
      }
    },
    removeOrder(orderId) {
      try {
        this.orders = this.orders.filter(order => order.id !== orderId);
      } catch (error) {
        console.error('Error removing order:', error);
      }
    },
  },
  getters: {
    getOrdersByUser: (state) => (userId) => {
      return state.orders.filter(order => order.userId === userId);
    },
    getTotalRevenue: (state) => {
      return state.orders.reduce((total, order) => total + order.totalPrice, 0);
    },
    getOrderDetails: (state) => {
      try {
        const productsStore = useProductsStore();
        return state.orders.map(order => {
          const product = productsStore.getProductById(order.productId);
          return {
            ...order,
            productName: product ? product.name : "Unknown Product",
          };
        });
      } catch (error) {
        console.error('Error fetching order details:', error);
        return [];
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'orders',
        storage: localStorage,
      },
    ],
  },
});
