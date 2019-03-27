<template>
  <div class="allGame">
    <basic-content :gameType="1" v-if="showComponent"/>
    <Spin size="large" fix v-if="spinShow">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import BasicContent from '@/components/BasicContent'
import {httpRequest} from '@/service/index'
export default {
  name:'allGame',
  components:{BasicContent},
  data(){
    return{
      showComponent:false,//存入state再渲染组件
      spinShow:false,
      timer:null
    }
  },
  computed:{

  },
  created(){
    this.spinShow=true;
    httpRequest('post','/main',{
      timeRange:this.getDefaultTime()
    })
    .then(res=>{
      this.$store.commit('login',{params:res.login})
      this.$store.commit('saveGameDetail',{params:res.game})
      this.showComponent=true
    }).finally(()=>{
      this.spinShow=false
    })
    this.timer = setInterval(()=>{
      location.reload()
    },60000)
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },
  methods:{
    getDefaultTime(){
      let now=new Date().getTime()
      let start=now-90*24*60*60*1000;
      return [start,now]
    }
  }
}
</script>
<style lang="less" scoped>
  .allGame{
    min-height: 89vh;
  }
</style>
