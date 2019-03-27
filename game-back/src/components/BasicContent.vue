<template>
  <div class="basic">
    <div class="search clear">
      <div class="left">
        <!-- <Input v-model="acount" placeholder="输入账号" style="width: 200px"></Input>
        <Input v-model="id" placeholder="输入ID" style="width: 200px"></Input>
        <Button type="primary" @click="search">搜索</Button> -->
      </div>
       <div class="right">
            <RadioGroup v-model="source" type="button" @on-change='changeSource'>
                <Radio label="0">1月</Radio>
                <Radio label="1">7天</Radio>
                <Radio label="2">3天</Radio>
                <Radio label="3">昨天</Radio>
            </RadioGroup>
            <DatePicker type="daterange" v-model="dateRange" :editable='false' @on-change="changeRange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
        </div>
    </div>
    <on-line 
    :sum="sum"
    :OnlineList="OnlineList"
    />
    <kill-profit/>
    <game-summary/>
    <on-line-hour/>
    <hit-rate 
    :hitRateCount="hitRateCount" 
    :gameCount="gameCount" 
    :xAxis="hitXaxis" 
    :data="hitRateData" />
    <price-mix/>
    <Spin size="large" fix v-if="spinShow">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>
<script>
import HitRate from "@/components/HitRate";
import OnLineHour from "@/components/OnlineHour";
import KillProfit from "@/components/KillProfit";
import OnLine from "@/components/Online";
import GameSummary from "@/components/GameSummary";
import PriceMix from "@/components/PriceMix";
import { mapState } from "vuex";
import {httpRequest} from '@/service/index'
import {GAME_LIST} from '@/config/gameList'
export default {
  name: "basicContent",
  components: {
    GameSummary,
    OnLine,
    KillProfit,
    OnLineHour,
    HitRate,
    PriceMix
  },
  props: {
    gameType: Number
  },
  data() {
    return {
      acount: "",
      id: "",
      source: "",
      dateRange: "",
      spinShow:false,
      hitRateCount: 0,
      gameCount: 0,
      hitXaxis: [],
      hitRateData: [],
      //online
      OnlineList:[],
      sum:0,
    };
  },
  computed: {
    ...mapState(["gameDetail","login"]),
  },
  created() {
    // console.log(this.gameType);
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      //hitrate
      let loginOnline=this.login.realTimeOnline
      this.$store.commit('currentGameId',{params:this.gameType})
      let hitRate = this.gameDetail.hitDetail;
      let hitGames=hitRate.games;
      //winkind
      let winKindDetail=this.gameDetail.winKindDetail
      let winGames=winKindDetail.games;
      // freeSelect
      let freeSelect=this.gameDetail.freeModeSelectDetail;
      let freeSelectGames=freeSelect.games
      //hourChart
      let hourChart=this.gameDetail.todayDetail
      let hourGames=hourChart.games
      //online hour
      let login=this.login.loginCountDetail;
      let loginGames=login.games
      let detail,killItem,winItem,freeSelectItem,hourItem,onLineItem
      switch (this.gameType) {
        //全部游戏
        case 1:
          //kill
          killItem = hitRate.total;
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          //win
          winItem=winKindDetail.total
          this.getWinKind(winItem)
          //select
          freeSelectItem=freeSelect.total
          this.getFreeSelect(freeSelectItem)
          //hourChart
          hourItem=hourChart.total
          this.getHourChart(hourItem)
          //online
          onLineItem=login.total
          this.getOnlineArr(onLineItem)
          break;
        case 41001:
          killItem=hitGames['41001']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['41001']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['41001']
          this.getFreeSelect(freeSelectItem)
          hourItem=hourGames['41001']
          this.getHourChart(hourItem)
          onLineItem=loginGames['41001']
          this.getOnlineArr(onLineItem)
          break;
         case 41002:
          killItem=hitGames['41002']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['41002']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['41002']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['41002']
          this.getHourChart(hourItem)
          onLineItem=loginGames['41002']
          this.getOnlineArr(onLineItem)
          break;
        case 41003:
          killItem=hitGames['41003']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
           winItem=winGames['41003']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['41003']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['41003']
          this.getHourChart(hourItem)
          onLineItem=loginGames['41003']
          this.getOnlineArr(onLineItem)
          break;
        case 42001:
          killItem=hitGames['42001']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42001']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42001']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42001']
          this.getHourChart(hourItem)
          onLineItem=loginGames['42001']
          this.getOnlineArr(onLineItem)
          break;
        case 42002:
          killItem=hitGames['42002']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42002']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42002']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42002']
          this.getHourChart(hourItem)
          onLineItem=loginGames['42002']
          this.getOnlineArr(onLineItem)
          break;
        case 42003:
          killItem=hitGames['42003']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42003']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42003']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42003']
          this.getHourChart(hourItem)
          onLineItem=loginGames['42003']
          this.getOnlineArr(onLineItem)
          break;
        case 42004:
          killItem=hitGames['42004']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42004']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42004']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42004']
          this.getHourChart(hourItem)
          onLineItem=loginGames['42004']
          this.getOnlineArr(onLineItem)
          break;
        case 42005:
          killItem=hitGames['42005']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42005']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42005']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42005']
          this.getHourChart(hourItem)
          onLineItem=loginGames['42005']
          this.getOnlineArr(onLineItem)
          break;
        case 42006:
          killItem=hitGames['42006']
          this.hitRateCount = killItem.hitRate;
          this.gameCount = killItem.roundCountTotal;
          detail = killItem.detail;
          this.getKillRate(detail)
          winItem=winGames['42006']
          this.getWinKind(winItem)
          freeSelectItem=freeSelectGames['42006']
          this.getFreeSelect(freeSelectItem)
           hourItem=hourGames['42006']
          this.getHourChart(hourItem)
          onLineItem=loginGames['42006']
          this.getOnlineArr(onLineItem)
          break;
      }
      //当前在线
      this.sum=loginOnline.total
      let loginGameItems=loginOnline.games
      for(const key in loginGameItems){
          let item=loginGameItems[key]
          let name=this.gameName(key);
          this.OnlineList.push({
              name,
              count:item||0
          })
      }
    },
    changeRange(){
      let range = this.dateRange.map(item => {
            return item.getTime();
            });
      this.getTimeRangeData(range)

    },
    changeSource() {
      let start
      const now=new Date().getTime()
      let range=[]
      switch (+this.source) {
        case 0:
          start = now - 30 * 24 * 60 * 60 * 1000;
          range=[start,now]
          break;
        case 1:
          start = now - 7 * 24 * 60 * 60 * 1000;
          range=[start,now]
          break;
        case 2:
          start = now - 3 * 24 * 60 * 60 * 1000;
          range=[start,now]
          break;
        case 3:
          let zero = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
          start = zero - 86400000;
          range=[start,zero]
          break;
      }
      this.getTimeRangeData(range)
    },
    getTimeRangeData(range){
      this.spinShow=true;
      httpRequest('post','/main',{
        timeRange:range
      })
      .then(res=>{
        this.$store.commit('login',{params:res.login})
        this.$store.commit('saveGameDetail',{params:res.game})
        this.showComponent=true
      }).finally(()=>{
        this.spinShow=false
      })
    },
    getKillRate(detail){
      for (let [key, val] of Object.entries(detail)) {
            this.hitXaxis.push(val.name);
            this.hitRateData.push({
              name: val.name,
              value: val.hitRate,
              '命中局数': val.hitCount,
              '赔付': val.hitPay.toFixed(2),
              "0.25-2.5": val.level_1,
              "5-50": val.level_2,
              "125-500": val.level_3
            });
          }
    },
    getWinKind(item){
      let free=item.free
      let normal=item.normal
      let freeData=[]
      let normalData=[]
      for(let[key,val] of Object.entries(free)){
            if(key!='totalPay'){
              freeData.push({
                name:val.name,
                value:val.pay,
                '比率':val.rate+'%',
                '总次数':val.count,
                '0.25-2.5':val.level_1,
                '5-50':val.level_2,
                '125-500':val.level_3
              })
            }
          }
          for(let[key,val] of Object.entries(normal)){
            if(key!='totalPay'){
              normalData.push({
                name:val.name,
                value:val.pay,
                '比率':val.rate+'%',
                '总次数':val.count,
                '0.25-2.5':val.level_1,
                '5-50':val.level_2,
                '125-500':val.level_3
              })
            }
          }
          this.$store.commit('savePriceNormalData',{params:normalData})
          this.$store.commit('savePriceFreeData',{params:freeData})
          this.$store.commit('savePriceFreeCount',{params:free.totalPay})
          this.$store.commit('savePriceNormalCount',{params:normal.totalPay})
    },
    getFreeSelect(item){
      let freeSelectData=[]
      for(let[key,val] of Object.entries(item)){
              freeSelectData.push({
                name:val.name,
                value:val.count,
                '比率':val.rate+'%',
                '0.25-2.5':val.level_1,
                '5-50':val.level_2,
                '125-500':val.level_3
              })
          }
      this.$store.commit('saveFreeChooseData',{params:freeSelectData})
      this.$store.commit('saveFreeSelectCount',{params:item.selectCount})
    },
    getHourChart(item){
      this.$store.commit('saveProfitHourTodayArr',{params:item.today.earn})
      this.$store.commit('saveProfitHourAvArr',{params:item.lastWeekArg.earn})
      this.$store.commit('saveBetHourTodayArr',{params:item.today.bet})
      this.$store.commit('saveBetHourAvArr',{params:item.lastWeekArg.bet})
      this.$store.commit('saveCountHourTodayArr',{params:item.today.betCount})
      this.$store.commit('saveCountHourAvArr',{params:item.lastWeekArg.betCount})
    },
    getOnlineArr(item){
      this.$store.commit('saveOnlineToday',{params:item.today})
      this.$store.commit('saveOnlineSeven',{params:item.last7dayAvg})
    },
    gameName(key){
            //gametype 获取名字
            return GAME_LIST[key] 
        },
    search() {
      console.log("id==>", this.id);
      console.log("acount==>", this.acount);
    }
  }
};
</script>
<style lang="less" scoped>
.basic {
  min-height: 91vh;
  .search {
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    padding-bottom: 15px;
  }
}
</style>

