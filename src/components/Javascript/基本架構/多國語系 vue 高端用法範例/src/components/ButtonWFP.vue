<template>
    <button @click="$emit('click')" class="button" :class="`button--${type}`">
        <slot></slot>
    </button>
</template>
<script>
export default {
    props: {
        type: {
            type: String, // 借用bootstrap顏色設定
            default: 'success'
        }
    },
}
</script>
<style lang="scss" scoped>
.button {
    border: none;
    color: white;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    padding: 0 32px;
    height: 40px;
    cursor: pointer;
}
.button--success {
    background-color: #00b85a;
    &:hover {
        background-color: #1ae57d;
    }
}
.button--danger {
    background-color: #d54a5b;
    &:hover {
        background-color: #ff485f;
    }
}
</style>