<template>
    <Container>
        <Row>
            <InputText v-model="testA" :name="'基金代碼'" :required="true"></InputText>
            <InputText v-model="testA" :name="'基金統編'" :required="true"></InputText>
        </Row>
        <Row>
            <InputText v-model="testA" :name="'基金全稱'" :required="true" :width="3"></InputText>
            <InputText v-model="testA" :name="'基金簡稱'" :required="true" :width="2"></InputText>
        </Row>
        <Row>
            <Nav
                v-model="currentContainer"
                :buttons="['基本資料', '申購', '贖回交易相關', '基金銷售機構' , '基金帳號' ,'經理費設定']"
            ></Nav>
        </Row>
        <div v-if="currentContainer==='基本資料'">
            <Row>
                <Dropdown :name="'基金狀態'"></Dropdown>
                <InputText :name="'幣別'" :required="true"></InputText>
                <InputText :name="'募集起始日'" :required="true"></InputText>
                <InputText :name="'發行上限/單位數'"></InputText>
                <InputText :name="'發行下限/單位數'" :required="true"></InputText>
                <InputText :name="'成立日'"></InputText>
                <InputText :name="'開始買回日'" :required="true"></InputText>
                <CheckboxSingle :name="'基金型態'" :required="true"></CheckboxSingle>
                <Dropdown :name="'投資區域'"></Dropdown>
                <Dropdown :name="'基金風險等級'"></Dropdown>
                <InputText :name="'集保代碼'"></InputText>
                <InputText :name="'公會代碼'"></InputText>
                <InputText :name="'基金經理人'"></InputText>
                <InputText :name="'GIIN Code'"></InputText>
                <InputText :name="'ISIN Code'"></InputText>
                <InputText :name="'單位面額'"></InputText>
                <InputText :name="'我是標籤'"></InputText>
                <InputText :name="'我是標籤'"></InputText>
                <InputText :name="'我是標籤'"></InputText>
                <InputText :name="'我是標籤'" :width="2"></InputText>
                <InputText :name="'我是標籤'" :width="1"></InputText>
            </Row>
            <RowControl>
                <template slot="right">
                    <ButtonWFP :name="'儲存'"></ButtonWFP>
                    <ButtonWFP :name="'儲存送核'"></ButtonWFP>
                    <ButtonWFP :name="'清除'" :type="'danger'"></ButtonWFP>
                </template>
            </RowControl>
        </div>
        <div v-if="currentContainer==='交易相關'">
            <span>交易相關</span>
        </div>
        <div v-if="currentContainer==='基金群組'">
            <span>基金群組</span>
        </div>
        <div v-if="currentContainer==='短線交易'">
            <span>短線交易</span>
        </div>
        <div v-if="currentContainer==='基金帳號'">
            <span>基金帳號</span>
        </div>
        <div v-if="currentContainer==='經理費'">
            <span>經理費</span>
        </div>
        <RowControl>
            <AUDI @click="handleLCIk"></AUDI>
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
