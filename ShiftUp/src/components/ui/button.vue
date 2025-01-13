<template>
    <button :class="buttonClasses" class="inline-flex items-center justify-center rounded-full px-8 py-3" @click="handleClick">
        <span :class="textClasses">{{ label }}</span>
    </button>
</template>

<script>
export default {
    name: "Button",
    props: {
        label: {
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
        textSize: {
            type: String,
            default: "text-base",
        },
        additionalClasses: {
            type: String,
            default: "",
        },
        onClick: {
            type: Function,
            default: null,
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
    methods: {
        handleClick() {
            if (this.onClick) this.onClick();
        },
    },
};
</script>
