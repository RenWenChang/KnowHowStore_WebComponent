<template>
    <svg
        :fill="color"
        class="st0"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 8 16"
        style="enable-background:new 0 0 8 16;"
        xml:space="preserve"
    >
        <path
            id="Path"
            d="M0.2,0.2c-0.2,0.3-0.2,0.7,0,1l6,6.5C6.3,7.8,6.3,7.9,6.3,8l0,0c0,0.1-0.1,0.3-0.1,0.3l-6,6.5
	C0.1,15,0,15.1,0,15.3c0,0.2,0.1,0.3,0.2,0.5c0.2,0.3,0.6,0.3,0.9,0l6.7-7.3C7.9,8.3,8,8.2,8,8c0-0.2-0.1-0.3-0.2-0.5c0,0,0,0,0,0
	L1.1,0.2C0.8-0.1,0.4-0.1,0.2,0.2z"
        />
    </svg>
</template>
<script>

export default {
    props: {
        color: {
            type: String,
            default: "#808080"
        }
    },



}
</script>
<style lang="scss" scoped>
.st0 {
    transform: rotate(180deg);
    width: 18px;
    height: 18px;
    cursor: pointer;
    margin-right:5px;
}
</style>