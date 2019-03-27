<template>
    <div class="killprofit">
        <kill-profit-item
         range="历史"
         chartId="1"
         :profit="profitCountHistory" 
         :killRate="killRateHistory"
         :profitArr="profitTotalArr"
         :killRateArr="killTotalArr"
         :killXaxis="killXaxisHistory"  
         :profitxAxis="profitXaxisHistory"       
          />
        <kill-profit-item 
        range="今日" 
        chartId="2"
        :profit="profitCountToday" 
        :killRate="killRateToday"
        :profitArr="profitTodayArr"
        :killRateArr="killTodayArr" 
        :killXaxis="killXaxisToday"  
        :profitxAxis="profitXaxisToday"       
         />
        <div class="btn">
            <Button type="primary" class="morebtn" v-if='!showHour' @click="seeHourChart">点击查看每小时盈利曲线</Button>
        </div>
        <hour-chart title="每小时盈利"
         hourId="1"
         :legend="['今日盈利', '7日平均盈利']"
         :todayArr="profitHourTodayArr"
         :avarageArr="profitHourAvArr"
          v-if="showHour" />
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
import KillProfitItem from "@/components/KillProfitItem";
import HourChart from "@/components/HourChart";
import { mapState } from "vuex";
import {GAME_LIST} from '@/config/gameList'
export default {
  name: "",
  components: { KillProfitItem, HourChart },
  filters: {},
  props: {},
  data() {
    return {
      showHour: false,
      //kill
      profitCountHistory: 0,
      profitCountToday:0,
      killRateHistory: {},
      killRateToday:{},
      //chartdata
      killTotalArr:[],
      profitTotalArr:[],
      profitTodayArr:[],
      killTodayArr:[],
      //axias
      killXaxisHistory:[],
      profitXaxisHistory:[],
      killXaxisToday:[],
      profitXaxisToday:[]
    };
  },
  computed: {
    ...mapState(["gameDetail","profitHourTodayArr","profitHourAvArr","currentGameId"])
  },
  watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init(){
      let game = this.gameDetail; 
      let today=game.killRateAndEarn_today
      let total=game.killRateAndEarn_total
      this.profitCountHistory=total.earn.total.total;
      this.killRateHistory=total.killRate.total
      this.profitCountToday=today.earn.total.total;
      this.killRateToday=today.killRate.total
      //历史
      for(let [key,val] of Object.entries(total.earn.games)){
        if(key==this.currentGameId){
          this.profitXaxisHistory.unshift(this.gameName(key))
          this.profitTotalArr.unshift({
            value:val.total,
            '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
        }else{
          this.profitXaxisHistory.push(this.gameName(key))
          this.profitTotalArr.push({
            value:val.total,
            '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
        }
      }
      for(let [key,val] of Object.entries(total.killRate.games)){
        if(key==this.currentGameId){
          this.killXaxisHistory.unshift(this.gameName(key))
          this.killTotalArr.unshift({
            value:val.total,
            '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
        }else{
          this.killXaxisHistory.push(this.gameName(key))
          this.killTotalArr.push({
            value:val.total,
            '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
        }
      }
      //今日
      for(let [key,val] of Object.entries(today.earn.games)){
        if(key==this.currentGameId){
          this.profitXaxisToday.unshift(this.gameName(key))//x轴
          this.profitTodayArr.unshift({
            value:val.total,
          '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
        }else{
          this.profitXaxisToday.push(this.gameName(key))//x轴
          this.profitTodayArr.push({
            value:val.total,
          '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
        }
      }
      for(let [key,val] of Object.entries(today.killRate.games)){
        if(key==this.currentGameId){
          this.killXaxisToday.unshift(this.gameName(key))//x轴
          this.killTodayArr.unshift({
            value:val.total,
            '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
        }else{
          this.killXaxisToday.push(this.gameName(key))//x轴
          this.killTodayArr.push({
            value:val.total,
            '0.25-2.5':val.level_1,
            '5-50':val.level_2,
            '125-500':val.level_3
          })
        }
      }
    },
    gameName(key){
        //gametype 获取名字
        return GAME_LIST[key]
    },
    seeHourChart() {
      this.showHour = true;
    }
  }
};
</script>
<style lang="less" scoped>
.killprofit {
  background-color: #fff;
  margin-top: 15px;
  .search {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .btn {
    text-align: center;
    .morebtn {
      width: 250px;
      margin-top: 10px;
      margin-bottom: 15px;
    }
  }
}
</style>
