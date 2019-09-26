<template>
    <div class="program">
        
        <div class="qrcode">
            <div class="mycolor">**长按识别下方二维码——进入小程序**</div>
            <img :src="$route.query.minipro_img" >
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>
<style scoped>
.program{
    width: 100%;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
}
.mycolor{
    color: white;
    position:absolute;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    top: 0;
    left: 50%;
    transform: translate(-50%,-200%);
    font-size: 4vw;
}
.qrcode{
    width: 280px;
    height:280px;
    position: fixed;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    background: white;

}
</style>