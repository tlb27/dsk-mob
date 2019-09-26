<template>
  <div id="active" v-cloak>
    <img src="@/assets/fxyl.jpg" />
  </div>
</template>

<script >
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$route.name)
    if (this.$route.name=="activity") {
      window.document.title = "分享有礼";
    }
  },
  methods: {}
};
</script>

<style scoped>
#active{
  width: 100%;
  height: 100%;
  background: #f9f7fc;
}
img {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
