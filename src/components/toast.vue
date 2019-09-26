<template>
<div style="z-index=1002" >
     <img class="toast" style="z-index=1002" v-show="show" src="../assets/qianloading.png">
    <img class="toast" style="z-index=1002" v-show="!show" src="../assets/houloading.png" >
</div>
</template>

<script>
export default {
    name:"mytoast",
    data(){
        return{
            show:true
        }
    },
    created(){
        setInterval(()=>{
            this.show=!this.show
        },200)
    }

}
</script>

<style scoped>
   
   .toast{
        width:40%;
        position: fixed;
        top:40%;
        left: 50%;
        z-index: 2000;
        transform: translateX(-50%) translateY(-50%)
    }
</style>
