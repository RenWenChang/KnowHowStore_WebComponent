<template>
    <div :class="`dd-w-${width}`" class="loginMainDropdown">
        <kendo-dropdownlist
            :data-source="dataSourceArray"
            :data-text-field="'text'"
            :data-value-field="'value'"
            :options-label="'Select a country...'"
            @change="onChange($event)"
            @close="onClose($event)"
            @open="onOpen($event)"
            @select="onSelect($event)"
        >></kendo-dropdownlist>
    </div>
</template>
<script>
export default {
    data: () => ({
        select: ''
    }),
    props: {
        dataSourceArray: {
            type: Array,
            default: () => {
                return []
            }
        },
        name: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '1'
        }
    },
    methods: {
        onChange: function () {
            console.log("Event :: change");
        },
        onClose: function () {
            console.log("Event :: close");
        },
        onDataBound: function () {
            console.log("Event :: dataBound");
        },
        onFiltering: function () {
            console.log("Event :: filtering");
        },
        onOpen: function () {
            console.log("Event :: open");
        },
        onSelect: function (e) {
            console.log("Event :: select", e.dataItem.text);
            this.select = e.dataItem.text;

        },
        onCascade: function () {
            console.log("Event :: cascade")
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.select = this.dataSourceArray[0]
        })
    }

}
</script>
<style lang="scss">
.loginMainDropdown {
    .k-dropdown .k-dropdown-wrap,
    .k-dropdowntree .k-dropdown-wrap {
        border: solid 1px #d0d0d0;
        border-radius:4px; 
    }
    .k-dropdown .k-dropdown-wrap,
    .k-dropdowntree .k-dropdown-wrap {
        background-image: linear-gradient(#ffffff, #ffffff);
    }
    .k-dropdown .k-dropdown-wrap:hover,
    .k-dropdowntree .k-dropdown-wrap:hover,
    .k-dropdown .k-dropdown-wrap.k-state-hover,
    .k-dropdowntree .k-dropdown-wrap.k-state-hover {
        background-image: linear-gradient(#f9f9f9, #f9f9f9);
    }
}
    .dd-w-50 .k-dropdown,
    .dd-w-50 .k-dropdowntree {
        width: 50%;
    }
    .dd-w-100 .k-dropdown,
    .dd-w-100 .k-dropdowntree {
        width: 100%;
    }

    .dd-w-1 .k-dropdown,
    .dd-w-1 .k-dropdowntree {
        width: 80px;
    }
    .dd-w-2 .k-dropdown,
    .dd-w-2 .k-dropdowntree {
        width: 184px;
    }
    .dd-w-3 .k-dropdown,
    .dd-w-3 .k-dropdowntree {
        width: 392px;
    }
    .dd-w-4 .k-dropdown,
    .dd-w-4 .k-dropdowntree {
        width: 600px;
    }
    .dd-w-5 .k-dropdown,
    .dd-w-5 .k-dropdowntree {
        width: 1224px;
    }

    .k-dropdown .k-dropdown-wrap .k-input,
    .k-dropdowntree .k-dropdown-wrap .k-input {
        height: 38px;
    }

</style>

