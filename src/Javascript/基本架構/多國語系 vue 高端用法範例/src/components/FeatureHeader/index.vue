<template>
    <div class="frameTabs__menuItem">
        <img class="frameTabs__icon" src="./favorite-client.svg" />
        <span class="menuItem__name">
            <slot></slot>
        </span>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.frameTabs__menuItem {
    color: #ffffff;
    height: 24px;
    display: flex;
    padding: 16px 30px;
    > * {
        align-self: center;
    }
    .frameTabs__icon {
        width: 19px;
        height: 19px;
    }
    .menuItem__name {
        margin-left: 8px;
    }
}
</style>