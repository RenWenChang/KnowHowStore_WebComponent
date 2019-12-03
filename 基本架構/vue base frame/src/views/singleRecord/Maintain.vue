<template>
    <Container v-model="pageId">
        <Row>
            <InputText name="我是標籤"></InputText>
            <InputText name="我是標籤"></InputText>
            <InputText name="我是標籤"></InputText>
            <InputText name="我是標籤"></InputText>
        </Row>
        <Nav :buttons="['基本資料', '申購', '贖回交易相關', '基金銷售機構' , '基金帳號' ,'經理費設定']"></Nav>
        <NavContainer name="基本資料">
            <Row>
                <Dropdown name="基金狀態"></Dropdown>
                <InputText name="我是標籤"></InputText>
                <InputText name="基金狀態"></InputText>
                <InputText name="募集起始日"></InputText>
                <InputText name="我是標籤"></InputText>
                <InputText name="我是標籤"></InputText>
                <InputText name="成立日"></InputText>
                <InputText name="開始買回日"></InputText>
            </Row>
            <Row>
                <CheckboxSingle name="基金型態"></CheckboxSingle>
                <InputText name="投資區域"></InputText>
                <InputText name="基金風險等級"></InputText>
                <InputText name="我是標籤"></InputText>
                <Radio name="基金選項(可複選)"></Radio>
            </Row>
            <Row>
                <InputText name="我是標籤"></InputText>
                <InputText name="基金狀態"></InputText>
                <InputText name="募集起始日"></InputText>
                <InputText name="我是標籤"></InputText>
                <InputText name="我是標籤" width="2"></InputText>
            </Row>
        </NavContainer>
        <NavContainer name="交易相關">
            <span>交易相關</span>
        </NavContainer>
        <NavContainer name="基金群駔">
            <span>基金群駔</span>
        </NavContainer>
        <NavContainer name="短線交易">
            <span>短線交易</span>
        </NavContainer>
        <NavContainer name="基金帳號">
            <span>基金帳號</span>
        </NavContainer>
        <NavContainer name="經理費">
            <span>經理費</span>
        </NavContainer>
        <RowControl>
            <AUDI></AUDI>
        </RowControl>
    </Container>
</template>
<script>
export default {
    data: () => ({
        pageId: '',
        currentContainer: '基本資料'
    }),
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            console.log(this.pageId)
        }
    }
}
</script>
