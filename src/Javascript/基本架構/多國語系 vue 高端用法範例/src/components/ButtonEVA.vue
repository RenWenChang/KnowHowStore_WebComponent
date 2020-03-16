<template>
    <div class="buttonEVA">
        <ButtonWFP>{{$t('buttonEVA_Entry')}}</ButtonWFP>
        <ButtonWFP>{{$t('buttonEVA_Entry_Verify')}}</ButtonWFP>
        <ButtonWFP>{{$t('buttonEVA_Entry_Approve')}}</ButtonWFP>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.buttonEVA {
    > * {
        margin-right: 16px;
    }
}
</style>