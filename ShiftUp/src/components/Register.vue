<template>
    <div class="w-full h-screen mx-auto flex flex-col lg:flex-row">
        <!-- Coluna Esquerda -->
        <div class="hidden lg:flex lg:w-1/2 bg-gray-100 justify-center items-center">
            <img src="/public/images/cracha.png" alt="Cracha" class="h-full object-contain">
        </div>

        <!-- Coluna Direita -->
        <div class="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 py-6">
            <div class="max-w-lg w-full">
                <!-- Título -->
                <h1 class="text-3xl md:text-4xl font-bold mb-6 text-center">Fill in your Details</h1>

                <!-- Formulário -->
                <form @submit.prevent="handleCreateAccount" class="space-y-4">
                    <!-- Seu Nome -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                        <input id="name" type="text" v-model="name" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your name">
                    </div>

                    <!-- Seu Email -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                        <input id="email" type="email" v-model="email" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email">
                    </div>

                    <!-- Sua Senha -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Your Password</label>
                        <input id="password" type="password" v-model="password" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password">
                    </div>

                    <!-- Confirmar Senha -->
                    <div>
                        <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-2">Confirm
                            Password</label>
                        <input id="confirm-password" type="password" v-model="confirmPassword" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Confirm your password">
                    </div>

                    <!-- Tipo -->
                    <div>
                        <span class="block text-sm font-medium text-gray-700 mb-2">Account Type</span>
                        <div class="flex space-x-4">
                            <label class="flex items-center">
                                <input type="radio" value="VIP" v-model="accountType" required
                                    class="focus:ring-indigo-500 focus:ring-2 text-indigo-600 border-gray-300">
                                <span class="ml-2 text-sm text-gray-700">VIP</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" value="Standard" v-model="accountType" required
                                    class="focus:ring-indigo-500 focus:ring-2 text-indigo-600 border-gray-300">
                                <span class="ml-2 text-sm text-gray-700">Standard</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" value="Student" v-model="accountType" required
                                    class="focus:ring-indigo-500 focus:ring-2 text-indigo-600 border-gray-300">
                                <span class="ml-2 text-sm text-gray-700">Student</span>
                            </label>
                        </div>
                    </div>

                    <!-- Botão Criar Conta -->
                    <div>
                        <Button :label="'Create Account'" bgColor="bg-custom-gradient" textColor="text-white"
                            textSize="text-lg" additionalClasses="w-full py-3" />
                    </div>
                    <!-- login  Link -->
                    <p class="text-sm text-gray-600 text-center">
                        If you already have an account
                        <router-link to="/login" class="text-indigo-600 cursor-pointer">
                            <b>Login</b>
                        </router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Button from './ui/button.vue';

export default {
    components: {
        Button
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: ''
        };
    },
    methods: {
        handleCreateAccount() {
            // Validação de senha
            if (this.password !== this.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            console.log({
                name: this.name,
                email: this.email,
                password: this.password,
                accountType: this.accountType
            });

            alert("Account created successfully!");
        }
    }
};
</script>

<style lang="scss" scoped></style>