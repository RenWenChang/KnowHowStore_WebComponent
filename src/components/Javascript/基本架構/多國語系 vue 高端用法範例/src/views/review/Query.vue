<template>
    <Container>
        <Row>
            <InputText :name="'我是標籤'"></InputText>
            <InputText :name="'我是標籤'" :width="'2'"></InputText>
            <InputText :name="'我是標籤'"></InputText>
            <ButtonWFP :name="'查詢'"></ButtonWFP>
            <ButtonWFP :name="'進階篩選'"></ButtonWFP>
            <ButtonWFP :name="'清空條件'" :type="'danger'"></ButtonWFP>
        </Row>
        <TableContainer>
            <Row>
                <ButtonSimple :name="'覆核'"></ButtonSimple>
                <ButtonSimple :name="'退回'"></ButtonSimple>
            </Row>

            <kendo-grid :height="600" :data-source="localDataSource" :pageable="true">
                <kendo-grid-column :field="'ProductID'" :width="180"></kendo-grid-column>
                <kendo-grid-column :field="'ProductName'" :width="240"></kendo-grid-column>
                <kendo-grid-column :field="'UnitPrice'" :width="180"></kendo-grid-column>
                <kendo-grid-column :field="'UnitsInStock'" :width="180"></kendo-grid-column>
                <kendo-grid-column :field="'Discontinued'" :width="180"></kendo-grid-column>
            </kendo-grid>
        </TableContainer>
    </Container>
</template>

<script>
export default {
    data: () => ({
        localDataSource: [
            {
                "ProductID": 1,
                "ProductName": "Chai",
                "UnitPrice": 18,
                "UnitsInStock": 39,
                "Discontinued": false,
            },
            {
                "ProductID": 2,
                "ProductName": "Chang",
                "UnitPrice": 17,
                "UnitsInStock": 40,
                "Discontinued": false,
            },
            {
                "ProductID": 3,
                "ProductName": "Aniseed Syrup",
                "UnitPrice": 10,
                "UnitsInStock": 13,
                "Discontinued": false,
            },
            {
                "ProductID": 4,
                "ProductName": "Chef Anton's Cajun Seasoning",
                "UnitPrice": 22,
                "UnitsInStock": 53,
                "Discontinued": false,
            },
            {
                "ProductID": 5,
                "ProductName": "Chef Anton's Gumbo Mix",
                "UnitPrice": 21.35,
                "UnitsInStock": 0,
                "Discontinued": true,
            },
            {
                "ProductID": 6,
                "ProductName": "Grandma's Boysenberry Spread",
                "UnitPrice": 25,
                "UnitsInStock": 120,
                "Discontinued": false,
            }
        ]
    })
}
</script>