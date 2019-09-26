<template>
  <div>
    <recommend1 v-if="$route.query.theme_type==0"></recommend1>
    <recommend2 v-if="$route.query.theme_type==1"></recommend2>
    <recommend3 v-if="$route.query.theme_type==2"></recommend3>
  </div>
</template>

<script>
import recommend1 from "./recommend";
import recommend2 from "./recommend2";
import recommend3 from "./recommend3";

export default {
  name: 'Index',
  components: { recommend1,recommend2,recommend3 },
  data(){
    return{
    }
  }
}
</script>

<style scoped>

</style>
