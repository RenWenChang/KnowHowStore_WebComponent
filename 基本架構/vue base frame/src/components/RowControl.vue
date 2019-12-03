<template>
    <div class="rowControl">
        <div>
            <slot name="left"></slot>
        </div>
        <div class="rowControl__right">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.rowControl {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    .rowControl__right {
        display: flex;
        justify-content: flex-end;
        > :not(:last-child) {
            margin-right: 24px;
        }
    }
}
</style>