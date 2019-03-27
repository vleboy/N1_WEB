<template>
  <div class="piechart">
    <Row>
      <Col span="12">
      <Row>
        <Col span="18">
        <div class="singlePie">
          <p class="pieTitle">下注总和-今日 <span class="count">¥ {{format(betCountToday)}}</span></p>
          <div id="pie1" class="pie"></div>
        </div>
        </Col>
        <Col span="5">
        <rank-item range="今日" :rankList='betTodayRank' />
        </Col>
      </Row>
      </Col>
      <Col span="12">
      <Row>
        <Col span="18">
        <div class="singlePie">
          <p class="pieTitle">下注总和-历史 <span class="count">¥ {{format(betCountHistory)}}</span></p>
          <div id="pie2" class="pie"></div>
        </div>
        </Col>
        <Col span="5">
        <rank-item range="历史" :rankList='betHistoryRank' />
        </Col>
      </Row>
      </Col>
    </Row>
     <div class="btn">
            <Button type="primary" class="morebtn" v-if='!showHourBet' @click="seeHourBet">点击查看每小时下注金额</Button>
        </div>
      <hour-chart title="每小时下注" hourId="2" 
        :legend='["今日下注", "7日平均下注"]' 
        :todayArr="betHourTodayArr"
        :avarageArr="betHourAvArr"
      v-if="showHourBet"/>
    <Row>
      <Col span="12">
      <Row>
        <Col span="18">
        <div class="singlePie">
          <p class="pieTitle">游戏局数-今日 <span class="count">{{gameCountToday}}</span></p>
          <div id="pie3" class="pie"></div>
        </div>
        </Col>
        <Col span="5">
        <rank-item range="今日" :rankList='countTodayRank' />
        </Col>
      </Row>
      </Col>
      <Col span="12">
      <Row>
        <Col span="18">
        <div class="singlePie">
          <p class="pieTitle">游戏局数-历史 <span class="count">{{gameCountHistory}}</span></p>
          <div id="pie4" class="pie"></div>
        </div>
        </Col>
        <Col span="5">
        <rank-item range="历史" :rankList='countHistoryRank' />
        </Col>
      </Row>
      </Col>
    </Row>
    <div class="btn">
            <Button type="primary" class="morebtn" v-if='!showHourCount' @click="seeHourCount">点击查看每小时下注局数</Button>
        </div>
      <hour-chart title="每小时局数" hourId="3"
        :legend='["今日局数", "7日平均局数"]' 
        :todayArr="countHourTodayArr"
        :avarageArr="countHourAvArr"
       v-if="showHourCount"/>
  </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
import RankItem from "@/components/RankItem";
import HourChart from '@/components/HourChart'
import { mapState } from "vuex";
export default {
  name: "gameSummary",
  components: { RankItem,HourChart},
  props: {},
  data() {
    return {
      format:thousandFormatter,
      showHourBet:false,
      showHourCount:false,
      //count
      betCountToday:0,
      betCountHistory:0,
      gameCountToday:0,
      gameCountHistory:0,
      //rank
      betTodayRank:[],
      betHistoryRank:[],
      countTodayRank:[],
      countHistoryRank:[]
    };
  },
  computed:{
    ...mapState(["gameDetail","betHourTodayArr","betHourAvArr","countHourTodayArr","countHourAvArr"])
  },
  created(){
    
  },
  mounted() {
    let game=this.gameDetail;
    let betToday=[];
    let betHistory=[];
    let countToday=[]
    let countHistory=[]
    let betDetail=game.betDetail;
    let countDetail=game.roundCountDetail;
    for (let item of betDetail.betOrderd_today){
      this.betCountToday+=item.betTotal
      betToday.push({
        name:item.name,
        value:item.betTotal,
        '占比':item.ratio+'%',
        '排名':item.order,
        '0.25-2.5':item.betLevel_1,
        '5-50':item.betLevel_2,
        '125-500':item.betLevel_3
      })
      this.betTodayRank.push({
        name:item.name
      })
    }
    for (let item of betDetail.betOrderd_total){
      this.betCountHistory+=item.betTotal
      betHistory.push({
        name:item.name,
        value:item.betTotal,
        '占比':item.ratio+'%',
        '排名':item.order,
        '0.25-2.5':item.betLevel_1,
        '5-50':item.betLevel_2,
        '125-500':item.betLevel_3
      })
      this.betHistoryRank.push({
        name:item.name
      })
    }
    for (let item of countDetail.roundCountOrderd_today){
      this.gameCountToday+=item.roundCountTotal
       countToday.push({
        name:item.name,
        value:item.roundCountTotal,
        '占比':item.ratio+'%',
        '排名':item.order,
        '0.25-2.5':item.roundCountLevel_1,
        '5-50':item.roundCountLevel_2,
        '125-500':item.roundCountLevel_3
      })
      this.countTodayRank.push({
        name:item.name
      })
    }
    for (let item of countDetail.roundCountOrderd_total){
      this.gameCountHistory+=item.roundCountTotal
       countHistory.push({
        name:item.name,
        value:item.roundCountTotal,
        '占比':item.ratio+'%',
        '排名':item.order,
        '0.25-2.5':item.roundCountLevel_1,
        '5-50':item.roundCountLevel_2,
        '125-500':item.roundCountLevel_3
      })
      this.countHistoryRank.push({
        name:item.name
      })
    }
    this.drawPie("pie1", betToday);
    this.drawPie("pie2", betHistory);
    this.drawPie("pie3", countToday);
    this.drawPie("pie4", countHistory);
  },
  methods: {
    goDetail(name) {
      this.$router.push({ name });
    },
    seeHourBet(){
      this.showHourBet=true;
    },
    seeHourCount(){
      this.showHourCount=true
    },
    drawPie(id, data) {
      let option = {
        tooltip: {
          trigger: "item",
          formatter(params){
            let data=params.data;
            let res=''
            for (let [key,val] of Object.entries(data)){
                res+=key+' : '+val+'<br/>'
            }
            return res
          }
        },
        calculable: true,
        series: [
          {
            type: "pie",
            radius: [30, 110],
            roseType: "area",
            data: data
          }
        ]
      };
      const pie1 = document.getElementById(id);
      let myChart = this.$echarts.init(pie1);
      myChart.showLoading({
        text: "图表加载中...",
        color: "#20a0ff",
        textColor: "#000",
        zlevel: 0
      });
      myChart.setOption(option);
      myChart.hideLoading();
    }
  }
};
</script>
<style lang="less" scoped>
.piechart {
  background-color: #fff;
  margin-top: 15px;
  .singlePie {
    width: 100%;
    padding-left: 10px;
  }
  .singleBar {
    width: 100%;
  }
  .search{
            padding-top: 10px;
            padding-bottom: 10px;
        }
  .pieTitle {
    background-color: #fff;
    line-height: 32px;
    font-size: 16px;
    text-indent: 1em;
    font-weight: bold;
    .count{
      font-weight: bold;
      font-size: 14px;
      padding-left: 15px;
    }
  }
  .btn{
            text-align: center;
            .morebtn{
                width: 250px;
                margin-top: 10px;
                margin-bottom: 15px;
            }
        }
}
.pie {
  width: 100%;
  height: 300px;
  background-color: #fff;
}
</style>
