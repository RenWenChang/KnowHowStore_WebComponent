<template>
    <Container>
        <Row>
            <TableWFP></TableWFP>
        </Row>
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
        ]
    })
}
</script>
