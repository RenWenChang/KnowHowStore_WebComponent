<template>
    <div></div>
</template>
<script>


export default {
    data (){
        return{

        }
    },
    methods:{
        
    },
    mounted: function() {
        setTimeout(() => {
            this.$router.push({
                        name: 'landingPage'
                    });
        }, 700);
    //綁定 DOM 之後
  },

    
}
</script>
<style>

</style>