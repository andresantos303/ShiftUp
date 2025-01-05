<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg w-96">
            <h2 class="text-xl font-semibold mb-4">Add New Product</h2>
            <form @submit.prevent="submitForm">
                <!-- Nome do Produto -->
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input id="name" v-model="newProduct.name" type="text"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter product name" required />
                </div>

                <!-- Preço do Produto -->
                <div class="mb-4">
                    <label for="price" class="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <input id="price" v-model="newProduct.price" type="number"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter product price" required />
                </div>

                <!-- Categoria do Produto -->
                <div class="mb-4">
                    <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input id="category" v-model="newProduct.category" type="text"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter product category" required />
                </div>

                <!-- Quantidade Comprada -->
                <div class="mb-4">
                    <label for="purchased" class="block text-sm font-medium text-gray-700 mb-2">Purchased
                        Quantity</label>
                    <input id="purchased" v-model="newProduct.purchased" type="number"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter purchased quantity" required />
                </div>

                <!-- Imagem do Produto -->
                <div class="mb-4">
                    <label for="image" class="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                    <input id="image" type="file" @change="handleImageUpload" accept="image/*"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <!-- Exibe a imagem após o upload -->
                    <div v-if="imagePreview" class="mt-4">
                        <img :src="imagePreview" alt="Image Preview" class="w-32 h-32 object-cover rounded-md" />
                    </div>
                </div>

                <div class="flex justify-between">
                    <button type="button" @click="closeModal"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg text-sm px-4 py-2">
                        Cancel
                    </button>
                    <button type="submit"
                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm px-4 py-2">
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
        onClose: Function,
        onSave: Function,
    },
    data() {
        return {
            newProduct: {
                name: "",
                price: "",
                category: "",
                purchased: 0,
                image: null, 
            },
            imagePreview: null, 
        };
    },
    methods: {
        closeModal() {
            this.onClose();
        },
        submitForm() {
            if (
                this.newProduct.name &&
                this.newProduct.price &&
                this.newProduct.category &&
                this.newProduct.purchased &&
                this.newProduct.image
            ) {
                this.onSave(this.newProduct);
                this.newProduct = {
                    name: "",
                    price: "",
                    category: "",
                    purchased: 0,
                    image: null,
                };
                this.imagePreview = null;
                this.closeModal();
            }
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.newProduct.image = file; 
                this.imagePreview = URL.createObjectURL(file); 
            }
        },
    },
};
</script>

<style scoped>
/* Estilos do modal, se necessário */
</style>