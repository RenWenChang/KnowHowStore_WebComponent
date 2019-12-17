<template>
    <button class="button">
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
    border-radius: 4px;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.12);
    border: solid 1px rgba(151, 151, 151, 0.4);
    background-color: #ffffff;
    padding: 10px 21px;
    cursor: pointer;
    font-size: 14px;
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