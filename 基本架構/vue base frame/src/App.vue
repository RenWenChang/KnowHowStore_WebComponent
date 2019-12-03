<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
// 自定義reset
ol,
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
@import url("./scss/grid.scss");
/******************************************************* baseGuideLine ******************************************************/

body {
    font-family: "Noto Sans CJK TC", "PingFang TC", "Microsoft JhengHei", "Muli",
        "Roboto", "Helvetica Neue", "Arial";
}
svg {
    width: 32px;
    height: 32px;
    fill: #ffffff;
}
#app * {
    box-sizing: border-box;
}
</style>
