<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    }
}
</script>