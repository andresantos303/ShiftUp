<template>
    <RouterLink :to="to" :class="buttonClasses" class="inline-flex items-center justify-center rounded-full px-8 py-3">
        <span :class="textClasses">{{ label }}</span>
    </RouterLink>
</template>

<script>
export default {
    name: "Button",
    props: {
        label: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        bgColor: {
            type: String,
            default: "bg-custom-gradient",
        },
        textColor: {
            type: String,
            default: "text-white",
        },
        // Permite ajustar o tamanho do texto
        textSize: {
            type: String,
            default: "text-base",
        },
        // Permite a personalização do texto de forma mais específica
        additionalClasses: {
            type: String,
            default: "",
        },
    },
    computed: {
        buttonClasses() {
            return `${this.bgColor} ${this.additionalClasses}`;
        },
        textClasses() {
            return `${this.textColor} ${this.textSize}`;
        },
    },
};
</script>

<style scoped>
</style>