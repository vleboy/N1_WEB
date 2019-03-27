<template>
  <div class="realLife_modal">
    <span v-for="item in row" :key="item.id" style="padding: 10px">
      <span>{{item.toolName}} x {{item.toolNum}}</span>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'packageTable',
  props:['row'],
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less" type="text/less">

</style>
