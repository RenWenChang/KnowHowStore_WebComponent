<template>
    <Container>
        <Row>
            <InputText :name="'基金代碼'" :required="true"></InputText>
            <InputText :name="'基金統編'" :required="true"></InputText>
        </Row>
        <Row>
            <InputText :name="'基金代碼'" :required="true" :width="3"></InputText>
            <InputText :name="'基金簡稱'" :required="true" :width="2"></InputText>
            <InputText :name="'基金短稱'" :required="true"></InputText>
        </Row>
        <Row>
            <Nav
                v-model="currentContainer"
                :buttons="['基本資料', '申購', '贖回交易相關', '基金銷售機構' , '基金帳號' ,'經理費設定']"
            ></Nav>
        </Row>
        <template v-if="currentContainer==='基本資料'">
            <Row>
                <Dropdown :name="'基金狀態'"></Dropdown>
                <InputText :name="'幣別'" :required="true"></InputText>
                <InputText :name="'募集起始日'" :required="true"></InputText>
            </Row>
            <Row>
                <InputText :name="'發行上限/單位數'"></InputText>
                <InputText :name="'發行下限/單位數'" :required="true"></InputText>
                <InputText :name="'成立日'"></InputText>
            </Row>
            <Row>
                <InputText :name="'開始買回日'" :required="true"></InputText>
            </Row>
        </template>
        <template v-if="currentContainer==='申購'">
            <Row>
                <Dropdown :name="'基金狀態'"></Dropdown>
                <InputText :name="'幣別'" :required="true"></InputText>
                <InputText :name="'募集起始日'" :required="true"></InputText>
            </Row>
        </template>
        <template v-if="currentContainer==='贖回交易相關'">
            <Row>
                <Dropdown :name="'基金狀態'"></Dropdown>
                <InputText :name="'幣別'" :required="true"></InputText>
                <InputText :name="'募集起始日'" :required="true"></InputText>
            </Row>
        </template>
        <template v-if="currentContainer==='基金銷售機構'">
            <Row>
                <Dropdown :name="'基金狀態'"></Dropdown>
                <InputText :name="'幣別'" :required="true"></InputText>
                <InputText :name="'募集起始日'" :required="true"></InputText>
            </Row>
        </template>
        <template v-if="currentContainer==='基金帳號'">
            <Row>
                <Dropdown :name="'基金狀態'"></Dropdown>
                <InputText :name="'幣別'" :required="true"></InputText>
                <InputText :name="'募集起始日'" :required="true"></InputText>
            </Row>
        </template>
        <template v-if="currentContainer==='經理費設定'">
            <Row>
                <Dropdown :name="'基金狀態'"></Dropdown>
                <InputText :name="'幣別'" :required="true"></InputText>
                <InputText :name="'募集起始日'" :required="true"></InputText>
            </Row>
        </template>
        <RowControl>
            <AUDI></AUDI>
        </RowControl>
    </Container>
</template>
<script>
export default {
    data: () => ({
        currentContainer: '基本資料'
    }),
}
</script>
