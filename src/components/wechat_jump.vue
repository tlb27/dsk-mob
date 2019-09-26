<template>
    <div class="main">
        <div class="small">
            <a href="weixin://">
                <img v-show="number==1" src="../assets/add/01.jpg" />
                <img v-show="number==2" src="../assets/add/02.jpg" />
                <img v-show="number==3" src="../assets/add/03.jpg" />
                <img v-show="number==4" src="../assets/add/04.jpg" />
            </a>
        </div>
        
    </div>
</template>
<script>
export default {
 data(){
     console.log(this)
     return{
         number:1,
     }
 },
 created(){
        setInterval(()=>{
         if(this.number==4){
             this.number=1
         }else{
            this.number++
         }
     },2000)
 }
}
</script>

<style scoped>

.main{
    width: 100%;
    background: linear-gradient(left ,#ef8ce6,#b57beb);
    height: 100%;
    min-height: 667px;
}
a{
    width: 100%;

}
.small{
    width: 100%;
    margin: 0 auto;
}
.main a img{
    width: 100%;
    margin: 0;
    padding: 0;
}

</style>
