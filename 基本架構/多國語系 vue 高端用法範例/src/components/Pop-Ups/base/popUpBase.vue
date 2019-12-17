<template>
    <div id="pop">
        <div class="col__container" v-if="type==='col'">
            <div class="title" v-if="showTitle">
                <div class="text">
                    <span>{{title}}</span>
                </div>
                <div class="close" @click="$emit('click')">
                    <span>X</span>
                </div>
            </div>
            <Row>
                <slot name="colum"></slot>
            </Row>

            <RowControl>
                <template slot="right">
                    <slot name="buttom"></slot>
                </template>
            </RowControl>
        </div>
        <div class="comfirm__container" v-if="type==='confirm'">
            <span>
                <slot></slot>
            </span>
            <div class="confirm">
                <div class="exc" @click="exacute">{{$t('confirm')}}</div>
                <div class="cancel" @click="$emit('click')">{{$t('cancel')}}</div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        title: {
            type: String,
            default: '這是標題'
        },
        showTitle: {
            type: Boolean,
            default: false
        },
        exacute: {
            type: Function,
            default: () => {
                return
            }
        },
        type: {
            type: String,
            default: 'confirm'
        }
    },
    computed: {
    },
    methods: {}

}
</script>
<style lang="scss" scoped>
#pop {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .col__container {
        padding: 24px 24px;
        margin: auto;
        width: 856px;
        min-height: 334px;
        border-radius: 4px;
        border: solid 1px #d0d0d0;
        background-color: #ffffff;
    }
    .title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
        .close {
            width: 24px;
            height: 24px;
            border-radius: 12px;
            background-color: #ebebeb;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .close:hover {
            background-color: #a3a3a3;
            color: white;
        }
        .text {
            font-size: 16px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.23;
            letter-spacing: 1px;
            text-align: center;
            color: #2f3bf5;
        }
    }
    .comfirm__container {
        padding: 0;
        margin: auto;
        width: 300px;
        min-height: 200px;
        border-radius: 4px;
        border: solid 1px #d0d0d0;
        background-color: #ffffff;
        span {
            padding: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            text-align: center;
            height: 150px;
        }
        .confirm {
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: 60px;
            div {
                width: 50%;
                justify-content: center;
                display: flex;
                align-items: center;
                padding: 24px;
                cursor: pointer;
            }
            .exc {
                background-color: #d54a5b;
                color: #ffffff;
            }
            .cancel {
                background-color: #00b85a;
                color: #ffffff;
            }
            .cancel:hover {
                background-color: #1ae57d;
            }
            .exc:hover {
                background-color: #ff485f;
            }
        }
    }
}
</style>