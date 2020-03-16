<template>
    <Container>
        <RowControl>
            <template slot="left">
                <TableQuery :name="'功能名稱查詢'" :width="'2'"></TableQuery>
            </template>
            <template slot="right">
                <Dropdown :name="'排序方式'" :placeholder="'依送件時間'"></Dropdown>
                <Dropdown :name="'分類方式'" :placeholder="'依功能分類'"></Dropdown>
            </template>
        </RowControl>
        <kendo-grid :data-source="localDataSource">
            <kendo-grid-column :selectable="true" :width="60"></kendo-grid-column>
            <kendo-grid-column :field="'ProductID'" :title="'ID'" :width="40"></kendo-grid-column>
            <kendo-grid-column :field="'ProductName'"></kendo-grid-column>
            <kendo-grid-column
                :field="'UnitPrice'"
                :title="'Unit Price'"
                :width="120"
                :format="'{0:c}'"
            ></kendo-grid-column>
            <kendo-grid-column :field="'UnitsInStock'" :title="'Units In Stock'" :width="120"></kendo-grid-column>
            <kendo-grid-column :field="'Discontinued'" :width="120"></kendo-grid-column>
        </kendo-grid>
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