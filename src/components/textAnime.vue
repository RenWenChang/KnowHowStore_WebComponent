<template>
    <div>
        <span :class="[single.isActive? animateType:'letterDefault' , 'letter'+index]" :style="{color : index ==0?firstColor:textColor }" v-for="(single,index) in textArr" :key="index">{{single.text}}</span>
    </div>
</template>
<script>

export default {
    props:{
        text:{
            type:String,
            default:''

        },
        delay:{
            type:Number,
            default:0
        },
        speed:{
            type:Number,
            default:200,
        },
        wait:{
            type:Number,
            default:0,
        },
        animateType:{
            type:String,
            default:'letterAnimate'
        },
        firstColor:{
            type:String,
            default:'#FFF'
        },
        textColor:{
            type:String,
            default:'#FFF'
        }
    },
    data (){
        return{
            textSpread:[...this.text],
            textArr:[],

        }
    },
    methods:{
        letterSpread:function(){
            this.textSpread.forEach((item)=>{
                if(item == ' ') item = "\u00A0";

                let textItem = {
                    text:item,
                    isActive:false
                }
                this.textArr.push(textItem);
                
            })
        },
        letterAnimation:function(){
            this.textArr.forEach((item,i)=>{
                setTimeout(() => {
                    item.isActive = true
                }, this.speed*i);
            })
        }
    },
    mounted: function() {
        this.letterSpread();
        setTimeout(() => {
            this.letterAnimation();
        }, this.delay);
        
      
    //綁定 DOM 之後
    },

    
}
</script>
<style>
.letterDefault{
    /* display: none; */
    display:inline-block;
    opacity: 0;
}
.letterAnimate{
    opacity: 1;
    display:inline-block;
    transform: scale(1);
    animation: textAnimate 0.3s forwards;
    border-right: 2px solid #FFF;
}

@keyframes textAnimate{
    0%{
        transform: scale(1.1);
        border-right: 2px solid #FFF;
    }
    20%{
        border-right: 0px solid #FFF;
    }
    100%{
        transform: scale(1);
        border-right: 0px solid #FFF;
    }
}
.letterAnimate2{
    opacity: 1;
    display:inline-block;
    transform: scale(1);
    animation: textAnimate2 0.3s;
}
@keyframes textAnimate2{
    0%{
        transform: scale(1.5);
    }
    100%{
        transform: scale(1);
    }
}
</style>