<template>
<div class="FQA__container" :style="{'background-color':backgroundColor ,'color':color}" >
    <div class="font">
        <slot slot name="FQA__index"></slot>
        <h3>
            <slot name="FQA__title"></slot>
        </h3>
        <!-- <h4 class="des">請點選 + 看詳細說明</h4> -->
        <!-- <h4></h4> -->
        <ul class="rows">
            <slot name="FQA__question"></slot>
        </ul>
    </div>
    <div class="back"></div>
</div>
</template>
<script>

export default {
    name: 'FQA__container',
    components: {
    },
    props: {
        backgroundColor: {
            type: String,
        },
        color: {
            type: String,
        }
    },
    data() {
        return {
            titleColor: '',
            questionColor: '',
            answerColor: '',
        }
    },
    methods: {

    },
    mounted: function() {
        //綁定 DOM 之後
    },


}
</script>
<style lang="scss" scoped>
.FQA__container {
    width: 100%;
    padding: 40px 16px 34px;
    position: relative;
    transition: 0.5s;
    transform-style: preserve-3d;
    transform: rotateY(0deg);
    opacity: 1;
    z-index: 2;
    .FQA__index{
        position: absolute;
        top: 0;
        right: 0;
        font-size: 120px;
        opacity: 0.45;
    }
    h3 {
        font-size: 24px;
        margin-bottom: 12px;
    }
    .des{
        margin-bottom: 34px;
        font-weight: normal;
    }
    .rows {
        li {
            width: 100%;
            font-size: 18px;
        }
        .questionRow {
            width: 100%;
            height: 100%;
            padding: 20px 0;
            cursor: pointer;
            position: relative;
            .text{
                width: 90%;
                line-height: 1.5;
                display: flex;
                span{
                    width: 20px;
                }
                p{
                    width: calc(100% - 20px);
                    margin: 0;
                }
            }
            .toggleIcon{
                width: 24px;
                height: 24px;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
            }
        }
    }
}
.answerRow {
        margin: -1px -16px 0px;
        background-color: #fff;
        height: 0;
        overflow: hidden;
        color: #000;
    }
    .answerRow--active {
        height: auto;
        overflow: inherit;
        background-color: #fff;
        color: #333;
        margin: 0 -16px;
    }
@media screen and (min-width: 1024px) {
    .containerSection{
        padding: 20px;
    }
    .FQA__container {
        margin: 16px;
        // margin:20px 30px;
        width: calc(49.999% - 32px);
        border-radius: 8px;
        padding-left: 40px;
        padding-right: 40px;
        h3{
            font-size: 30px;
            margin-top: 0;
            margin-bottom: 16px;
        }
    }
    .FQA__container--active{
        width: 100%;
        animation: cardRo 1.5s ease-in-out forwards; 
    }
    .answerRow--active{
        margin: 0 -40px;
    }
}

@keyframes cardRo{
    0%{
        width: calc(50% - 60px);
        transform: rotateY(0deg);
        opacity: 1;
    }
    50%{
        transform: rotateY(180deg);
        width: calc(50% - 60px);
        opacity: 0;
    }
    100%{
        opacity: 1;
        transform: rotateY(0deg);
        width: 100%;
    }
}
</style>