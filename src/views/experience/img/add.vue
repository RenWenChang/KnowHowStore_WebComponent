<template>
    <svg
        width="24px"
        height="24px"
        ref="add"
        version="1.1"
        id="add"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 26 26"
        style="enable-background:new 0 0 26 26;"
        xml:space="preserve"
    >
        <path
            :style="{fill :!touching?color:touchedColor}"
            d="M13,1.8C6.8,1.8,1.8,6.8,1.8,13c0,6.2,5.1,11.2,11.3,11.2c6.2,0,11.2-5,11.2-11.2S19.2,1.8,13,1.8z M13,22.8
        c-5.4,0-9.8-4.4-9.8-9.8c0-5.4,4.4-9.7,9.7-9.8h0c5.4,0,9.8,4.4,9.8,9.8S18.4,22.8,13,22.8z"
        />
        <polygon points="13,4.2 13,4.2 13,4.2 " :style="{fill :!touching?color:touchedColor}" />
        <path
            :style="{fill :!touching?color:touchedColor}"
            d="M18.7,12.2h-4.2c-0.4,0-0.8-0.3-0.8-0.8V7.3c0-0.4-0.3-0.8-0.8-0.8s-0.8,0.3-0.8,0.8v4.2c0,0.4-0.3,0.8-0.8,0.8
	H7.3c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h4.2c0.4,0,0.8,0.3,0.8,0.8v4.2c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8v-4.2
	c0-0.4,0.3-0.8,0.8-0.8h4.2c0.4,0,0.8-0.3,0.8-0.8S19.1,12.2,18.7,12.2z"
        />
    </svg>
</template>
<script>
export default {

    data() {
        return {
            touching: false,
            color: '#808080',
            touchedColor: '#00c591',
        }
    },
    methods: {
        touch: function (e) {
            if (e.type === "mousedown" || e.type === "touchstart") {
                this.touching = true
            }
            if (e.type === "mouseup" || e.type === "touchend") {
                this.touching = false
            }
        }
    },
    mounted: function () {
        if (this.isMobile()) {
            this.$refs.add.addEventListener('touchstart', this.touch);
            this.$refs.add.addEventListener('touchend', this.touch);

        } else {
            this.$refs.add.addEventListener('mousedown', this.touch);
            this.$refs.add.addEventListener('mouseup', this.touch);
        }


    },



}
</script>
<style lang="scss" scoped>
#add{
    cursor: pointer;
}
</style>