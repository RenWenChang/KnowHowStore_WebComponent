<template>
    <div class="tableContainer">
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
.tableContainer {
    padding: 24px;
    border-radius: 4px;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.04);
    background-color: #ffffff;
}
</style>