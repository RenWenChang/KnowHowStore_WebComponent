<template>
    <div class="container">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        field: {
            type: String,
            default: ''
        }
    },
    created() {
        this.getQueryId()
    },
    methods: {
        getQueryId() {
            const id = this.$route.query.id
            if (id !== null || id !== undefined) {
                this.$emit('input', id)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    padding: 24px;
    color: #414042;
}
</style>