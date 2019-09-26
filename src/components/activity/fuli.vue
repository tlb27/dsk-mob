<template>
  <div id="active" v-cloak>
    <img src="@/assets/xrfl.jpg" />
  </div>
</template>

<script >
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$route.name)
    if (this.$route.name=="welfare") {
      window.document.title = "新人攻略";
    }
  },
  methods: {}
};
</script>

<style scoped>
#active{
  width: 100%;
  height: 100%;
  background: #6c41ac;
}
img {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
