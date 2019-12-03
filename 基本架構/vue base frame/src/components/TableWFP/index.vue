<template>
    <table>
        <thead>
            <tr>
                <th v-for="(th, index) in headers" :key="`th${index}`">{{th.name}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in table" :key="`tr${index}`" @click="gotoDetails(row)">
                <td v-for="(cell, index) in row" :key="`td${index}`">{{cell}}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props: {
        table: {
            type: Array,
            default: () => {
                return [
                    {
                        A: 'QQ01',
                        B: 'data data',
                        C: 'data data data data',
                    },
                    {
                        A: 'QQ02',
                        B: 'data data',
                        C: 'data data data data',
                    },
                    {
                        A: 'QQ03',
                        B: 'data data',
                        C: 'data data data data',
                    },
                ]
            }
        },
        headers: {
            type: Array,
            default: () => {
                return [
                    {
                        name: '標頭A',
                        filter: {
                            type: 'default'
                        }
                    },
                    {
                        name: '標頭B',
                        filter: {
                            type: 'default'
                        }
                    },
                    {
                        name: '標頭C',
                        filter: {
                            type: 'default'
                        }
                    }
                ]
            }
        },
    },
    methods: {
        gotoDetails(record) {
            // Store value to session storage
            // {
            //     path: 'maintain',
            //     label: '資料維護',
            // }
            this.createTabs({
                id: record.A,
                path: 'maintain',
                label: '資料維護',
            })
            // Route to maintain
            this.$router.push({
                path: 'maintain',
                query: {
                    id: record.A
                }
            })
        },
        ...mapActions(["createTabs"])
    },
}
</script>