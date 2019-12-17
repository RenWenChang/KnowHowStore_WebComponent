<template>
    <svg
        class="accordionItem_expand"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 16 8"
        style="enable-background:new 0 0 16 8;"
        xml:space="preserve"
    >
        <title>Accordion/ accordionItem_expand</title>
        <desc>Created with Sketch.</desc>
        <path
            id="Path"
            d="M15.8,0.2c-0.3-0.2-0.7-0.2-1,0l-6.5,6C8.2,6.3,8.1,6.3,8,6.3l0,0c-0.1,0-0.3-0.1-0.3-0.1l-6.5-6
	C1,0.1,0.9,0,0.7,0S0.3,0.1,0.2,0.2c-0.3,0.2-0.3,0.6,0,0.9l7.3,6.7C7.7,7.9,7.8,8,8,8c0.2,0,0.3-0.1,0.5-0.2c0,0,0,0,0,0l7.3-6.7
	C16.1,0.8,16.1,0.4,15.8,0.2z"
        />
    </svg>
</template>
<style lang="scss" scoped>
.accordionItem_expand {
    width: 16px;
    height: 9px;
    fill: #1f2532;
    transition-property: transform,fill;
    transition: 0.3s ease;
}
.accordionItem_collapse {
    width: 16px;
    height: 9px;
    // transform: rotate(180deg);
    transform:scaleY(-1);
    fill: #24a854;
}
</style>