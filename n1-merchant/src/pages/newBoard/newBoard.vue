<template>
  <div class="newBoard">
    <Spin size="large" fix v-show="spinShow" style="z-index:200;">
      <Icon type="load-c" size="100" class="demo-spin-icon-load" style></Icon>
      <div style>加载中...</div>
    </Spin>
    <div class="top">
      <Select style="width:200px;" ref="resetSelect" clearable v-model="model1">
        <Option
          v-for="(item, index) in gameType"
          :value="item.name"
          :key="item.name"
          @click.native="selGame(item.code)"
        >{{item.name}}</Option>
      </Select>
      <div class="right">
        <RadioGroup v-model="dateType" @on-change="changeDate" type="button">
          <Radio label="0">昨日</Radio>
          <Radio label="4">今日</Radio>
          <Radio label="1">近一周</Radio>
          <Radio label="2">近一个月</Radio>
          <Radio label="3">近三个月</Radio>
        </RadioGroup>
        <DatePicker
          type="datetimerange"
          :options="options"
          :editable="false"
          v-model="defaultTime"
          placeholder="选择日期时间范围(默认最近一周)"
          style="width: 300px;margin-left:1rem"
          @on-ok="confirm"
        ></DatePicker>
        <Button type="primary" @click="search">搜索</Button>
        <Button type="ghost" @click="reset">重置</Button>
      </div>
    </div>
    <Tabs type="card" @on-click="changeBoard">
      <TabPane label="趋势"></TabPane>
      <TabPane label="玩家榜单"></TabPane>
    </Tabs>
    <div class="echarts" v-if="initNum == 0">
      <Row>
        <Col span="12">
          <Card>
            <h3 slot="title">平台每日趋势</h3>
            <div :style="{height:'550px',width:'100%'}" ref="report"></div>
          </Card>
        </Col>
        <Col span="12">
          <Card style="position:relative">
            <h3 slot="title">玩家注册趋势</h3>
            <div :style="{height:'550px',width:'100%'}" ref="playerCount"></div>
          </Card>
        </Col>
      </Row>
    </div>
    <div v-else>
      <Row>
        <Col span="12">
          <Card style="position:relative">
            <h3 slot="title">玩家投注次数榜(TOP10)</h3>
            <div :style="{height:'550px',width:'100%'}" ref="playerBetCount"></div>
          </Card>
        </Col>
        <Col span="12">
          <Card style="position:relative">
            <h3 slot="title">玩家投注金额榜(TOP10)</h3>
            <div :style="{height:'550px',width:'100%'}" ref="playerBetAmount"></div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <Card style="position:relative">
            <h3 slot="title">玩家返还金额榜(TOP10)</h3>
            <div :style="{height:'550px',width:'100%'}" ref="playerRetAmount"></div>
          </Card>
        </Col>
        <Col span="12">
          <Card style="position:relative">
            <h3 slot="title">玩家输赢金额榜(TOP10 & LAST10)</h3>
            <div :style="{height:'550px',width:'100%'}" ref="playerWinloseAmount"></div>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import "echarts/map/js/china.js"; // 引入中国地图数据
import chinaJson from "echarts/map/json/china.json";
import "echarts/map/js/world.js"; // 引入世界地图数据
import worldJson from "echarts/map/json/world.json";
import { hourFormatBarData } from "@/config/format";
import { formatBarData } from "@/config/format";
import { formatMapData } from "@/config/format";
import { httpRequest } from "@/service/index";
import { getDefaultTime } from "@/config/getDefaultTime";
import _ from "lodash";
import dayjs from "dayjs";

export default {
  data() {
    return {
      source: "0",
      initNum: "0",
      rankCount: 0,
      options: {
        shortcuts: [
          {
            text: "本周",
            value() {
              return [
                new Date(
                  dayjs()
                    .startOf("week")
                    .valueOf() +
                    24 * 60 * 60 * 1000
                ),
                new Date(
                  dayjs()
                    .endOf("second")
                    .valueOf()
                )
              ];
            }
          },
          {
            text: "本月",
            value() {
              return [
                new Date(
                  dayjs()
                    .startOf("month")
                    .valueOf()
                ),
                new Date(
                  dayjs()
                    .endOf("second")
                    .valueOf()
                )
              ];
            }
          },
          {
            text: "上周",
            value() {
              return [
                new Date(
                  dayjs()
                    .add(-1, "week")
                    .startOf("week")
                    .valueOf() +
                    24 * 60 * 60 * 1000
                ),
                new Date(
                  dayjs()
                    .startOf("week")
                    .valueOf() +
                    24 * 60 * 60 * 1000 -
                    1
                )
              ];
            }
          },
          {
            text: "上月",
            value() {
              //-1 上月
              return [
                new Date(
                  dayjs()
                    .add(-1, "month")
                    .startOf("month")
                    .valueOf()
                ),
                new Date(
                  dayjs()
                    .startOf("month")
                    .valueOf() - 1
                )
              ];
            }
          }
        ]
      },
      GameListEnum: [
        { company: "全部", code: "", name: "全部游戏" },
        /*  { company: "NA", code: "10000", name: "NA棋牌游戏" },
        { company: "NA", code: "30000", name: "NA真人视讯" },
        { company: "NA", code: "40000", name: "NA电子游戏" },
        { company: "NA", code: "50000", name: "NA街机游戏" },
        { company: "NA", code: "60000", name: "NA捕鱼游戏" },
        { company: "NA", code: "80000", name: "H5真人视讯" }, */
        { company: "NA", code: "70000", name: "H5电子游戏" },
        { company: "NA", code: "90000", name: "H5电子游戏-无神秘奖" },
        { company: "KY", code: "1070000", name: "KY棋牌游戏" },
        { company: "TTG", code: "1010000", name: "TTG电子游戏" },
        { company: "PNG", code: "1020000", name: "PNG电子游戏" },
        { company: "MG", code: "10300000", name: "MG电子游戏" },
        { company: "HABA", code: "1040000", name: "HABA电子游戏" },
        { company: "AG", code: "1050000", name: "AG真人游戏" },
        { company: "SA", code: "1060000", name: "SA真人游戏" },
        { company: "SA", code: "1110000", name: "SA捕鱼游戏" },
        { company: "PG", code: "1090000", name: "PG电子游戏" },
        { company: "YSB", code: "1130000", name: "YSB体育游戏" },
        { company: "RTG", code: "1140000", name: "RTG电子游戏" },
        { company: "SB", code: "1080000", name: "SB电子游戏" },
        { company: "SB", code: "1120000", name: "SB真人游戏" },
        { company: "DT", code: "1150000", name: "DT电子游戏" },
        { company: "PP", code: "1160000", name: "PP电子游戏" }
      ],
      //defaultTime: getDefaultTime(),
      defaultTime: "",
      splitColor: [
        
      ],
      woSplitColor: [
        
      ],
    
      pyBetCountData: [],
      pyBetAmountData: [],
      pyRetAmountData: [],
      pyWinloseAmountData: [],
      gameType: [],
      chinaData: [],
      chinaAllData: "",
      worldAllData: "",
      chinaSplitList: [],
      worldSplitList: [],
      reportData: [],
      playerCountData: [],
      worldData: [],
      dynamicData: [],
      gameUnit: "",
      chinaMapUnit: "",
      worldMapUnit: "",
      spinShow: false,
      model1: "全部游戏",
      gameCode: "",
      dateType: "2",
      chinaDataType: "0",
      worldDataType: "0",
      gameDtributedDataType: "0",
      realData: [932, 901, 934, 1290, 1330, 1320, 145],
      xArr: [1, 2, 3, 4, 5, 6, 7],
      hander: null,
      houreMomentData: [],
      weekMomentData: [],
      monthMomentData: [],
      gameDtributedData: [],
      valueGD: [],
      valueTP: []
    };
  },
  mounted() {
    this.getGameList();
    this.changeDate();
  },
  methods: {
    changeBoard(val) {
      this.initNum = val;
      if (this.initNum == undefined) {
        this.initNum = "0";
      } else {
        this.initNum = val;
      }

      if (this.initNum == 0) {
        /* this.$nextTick(function() {
          }); */
        this.init();
      } else {
        this.pyRankInit();
      }
    },
    getGameList() {
      this.gameType = this.GameListEnum;
    },
    selGame(code) {
      this.gameCode = code;
      if (this.initNum == 0) {
        this.init();
      } else {
        this.pyRankInit();
      }
    },
    changeDate(val) {
      if (val == undefined) {
        val = this.dateType;
      }
      let nowDate = new Date();
      this.defaultTime = [];
      switch (val) {
        case "0":
          this.defaultTime.push(
            new Date(nowDate.getTime() - 24 * 3600 * 1000).setHours(0, 0, 0, 0)
          );
          this.defaultTime.push(
            new Date(nowDate.getTime() - 24 * 3600 * 1000).setHours(
              0,
              0,
              0,
              0
            ) +
              24 * 3600 * 1000 -
              1
          );
          break;
        case "4":
          this.defaultTime.push(
            new Date(nowDate.getTime()).setHours(0, 0, 0, 0)
          );
          this.defaultTime.push(new Date(nowDate.getTime() - 3 * 60 * 1000));
          break;
        case "1":
          this.defaultTime.push(
            new Date(nowDate.getTime() - 24 * 3600 * 1000).setHours(
              0,
              0,
              0,
              0
            ) -
              6 * 24 * 3600 * 1000
          );
          this.defaultTime.push(
            new Date(nowDate.getTime() - 24 * 3600 * 1000).setHours(
              0,
              0,
              0,
              0
            ) +
              24 * 3600 * 1000 -
              1
          );
          break;
        case "2":
          this.defaultTime.push(
            new Date(nowDate.getTime() - 24 * 3600 * 1000).setHours(
              0,
              0,
              0,
              0
            ) -
              29 * 24 * 3600 * 1000
          );
          this.defaultTime.push(
            new Date(nowDate.getTime() - 24 * 3600 * 1000).setHours(
              0,
              0,
              0,
              0
            ) +
              24 * 3600 * 1000 -
              1
          );
          break;
        case "3":
          this.defaultTime.push(
            new Date(nowDate.getTime() - 24 * 3600 * 1000).setHours(
              0,
              0,
              0,
              0
            ) -
              89 * 24 * 3600 * 1000
          );
          this.defaultTime.push(
            new Date(nowDate.getTime() - 24 * 3600 * 1000).setHours(
              0,
              0,
              0,
              0
            ) +
              24 * 3600 * 1000 -
              1
          );
          break;
      }

      if (this.initNum == 0) {
        this.changeBoard();
      } else {
        this.pyRankInit();
      }
      this.rankCount++;
    },
    
    changeGameDtributedDataType(val) {
      if (val == undefined) {
        val = this.gameDtributedDataType;
      }
      switch (val) {
        case "0":
          this.gameUnit = "玩家数量";
          this.valueGD = this.gameDtributedData.playerCount.map(item => {
            return item;
          });
          this.valueTP = this.gameDtributedData.playerCount.map(item => {
            return item.name;
          });
          break;
        case "1":
          this.gameUnit = "投注金额";
          this.valueGD = this.gameDtributedData.betAmount.map(item => {
            return {
              value: parseFloat((item.value / 10000).toFixed(2)),
              name: item.name
            };
          });
          this.valueTP = this.gameDtributedData.betAmount.map(item => {
            return item.name;
          });
          break;
        case "2":
          this.gameUnit = "投注次数";
          this.valueGD = this.gameDtributedData.betCount.map(item => {
            return {
              value: parseFloat((item.value / 10000).toFixed(2)),
              name: item.name
            };
          });
          this.valueTP = this.gameDtributedData.betCount.map(item => {
            return item.name;
          });
          break;
        case "3":
          this.gameUnit = "退款金额";
          this.valueGD = this.gameDtributedData.refundAmount.map(item => {
            return {
              value: parseFloat((item.value / 10000).toFixed(2)),
              name: item.name
            };
          });
          this.valueTP = this.gameDtributedData.refundAmount.map(item => {
            return item.name;
          });
          break;
        case "4":
          this.gameUnit = "返还金额";
          this.valueGD = this.gameDtributedData.retAmount.map(item => {
            return {
              value: parseFloat((item.value / 10000).toFixed(2)),
              name: item.name
            };
          });
          this.valueTP = this.gameDtributedData.retAmount.map(item => {
            return item.name;
          });
          break;
      }
      this.gameDtributedConfigure();
    },
    confirm() {
      this.defaultTime = this.changedTime;
      if (this.initNum == 0) {
        this.init();
      } else {
        this.pyRankInit();
      }
    },
    search() {
      if (this.initNum == 0) {
        this.init();
      } else {
        this.pyRankInit();
      }
    },
    reset() {
      let nowDate = new Date();
      this.defaultTime = [
        new Date(nowDate.getTime() - 24 * 3600 * 1000).setHours(0, 0, 0, 0) -
          89 * 24 * 3600 * 1000,
        new Date(nowDate.getTime() - 24 * 3600 * 1000).setHours(0, 0, 0, 0) +
          24 * 3600 * 1000 -
          1
      ];
      this.dateType = "2";
      this.gameCode = "";
      this.$refs.resetSelect.clearSingleSelect();
      this.model1 = "全部游戏";

      if (this.initNum == 0) {
        this.init();
      } else {
        this.pyRankInit();
      }
    },

    //趋势
    reportConfigure() {
      let betAmount = this.reportData.betAmount.map(item => {
        return (item.y / 10000).toFixed(2);
      });
      let betCount = this.reportData.betCount.map(item => {
        return (item.y / 10000).toFixed(2);
      });
      let playerCount = this.reportData.playerCount.map(item => {
        return item.y;
      });
      let refundAmount = this.reportData.refundAmount.map(item => {
        return (item.y / 10000).toFixed(2);
      });
      let retAmount = this.reportData.retAmount.map(item => {
        return (item.y / 10000).toFixed(2);
      });
      let winloseAmount = this.reportData.winloseAmount.map(item => {
        return (item.y / 10000).toFixed(2);
      });
      let reportArr = this.reportData.playerCount.map(item => {
        return item.x;
      });

      let myChart = this.$echarts.init(this.$refs.report);
      // 绘制图表
      myChart.setOption(
        {
          xAxis: {
            name: "单位\n日期",
            type: "category",
            data: reportArr
          },
          tooltip: {
            trigger: "axis",
            formatter: formatBarData
          },
          yAxis: {
            type: "value"
          },
          grid: {
            bottom: "6%"
          },
          legend: {
            data: [
              "玩家数量",
              "投注次数",
              "投注金额",
              "退款金额",
              "返回金额",
              "输赢金额"
            ],
            selectedMode: "single"
          },
          series: [
            {
              name: "玩家数量",
              type: "line",
              data: playerCount
            },
            {
              name: "投注次数",
              type: "line",
              data: betCount
            },
            {
              name: "投注金额",
              type: "line",
              data: betAmount
            },
            {
              name: "退款金额",
              type: "line",
              data: refundAmount
            },
            {
              name: "返回金额",
              type: "line",
              data: retAmount
            },
            {
              name: "输赢金额",
              type: "line",
              data: winloseAmount
            }
          ]
        },
        true
      );
    },
    playerCountConfigure() {
      let myChart = this.$echarts.init(this.$refs.playerCount);
      myChart.setOption(
        {
          tooltip: {
            trigger: "axis",

            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: "time",
            splitLine: {
              show: false
            },
            name: "单位\n日期"
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: false
            }
          },
          grid: {
            bottom: "6%"
          },
          legend: {
            //orient: 'vertical',
            top: "top",
            data: ["每日注册人数", "累计注册人数"],
            selectedMode: "single",
            padding: 10
          },
          series: [
            {
              name: "每日注册人数",
              type: "line",
              showSymbol: false,
              hoverAnimation: false,
              smooth: true,
              symbolSize: 3,
              data: this.playerCountData.everyDay
            },
            {
              name: "累计注册人数",
              type: "line",
              showSymbol: false,
              hoverAnimation: false,
              smooth: true,
              symbolSize: 3,
              data: this.playerCountData.sumDay
            }
          ]
        },
        true
      );
    },
   
    //玩家排行榜柱状图
    pyBetCount() {
      let myChart = this.$echarts.init(this.$refs.playerBetCount);
      let merchant = this.pyBetCountData.map(item => {
        return item.x;
      });
      let datas = this.pyBetCountData.map(item => {
        return item.y / 10000;
      });
      myChart.setOption(
        {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            formatter: "{b0}</br>{c0} 万次"
          },
          xAxis: {
            name: "单位\n万次",
            type: "value"
          },
          yAxis: {
            type: "category",
            data: merchant,
            nameGap: 60
          },
          grid: {
            left: "25%",
            right: "12%",
            top: "0",
            bottom: "5%"
          },
          series: [
            {
              type: "bar",
              data: datas
            }
          ]
        },
        true
      );
    },
    pyBetAmount() {
      let myChart = this.$echarts.init(this.$refs.playerBetAmount);
      let merchant = this.pyBetAmountData.map(item => {
        return item.x;
      });
      let datas = this.pyBetAmountData.map(item => {
        return (item.y / 10000).toFixed(2);
      });
      myChart.setOption(
        {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            formatter: "{b0}</br>{c0} 万元"
          },
          xAxis: {
            name: "单位\n万元",
            type: "value"
          },
          yAxis: {
            type: "category",
            data: merchant,
            nameGap: 60
          },
          grid: {
            left: "25%",
            right: "12%",
            top: "0",
            bottom: "5%"
          },
          series: [
            {
              type: "bar",
              data: datas
            }
          ]
        },
        true
      );
    },
    pyRetAmount() {
      let myChart = this.$echarts.init(this.$refs.playerRetAmount);
      let merchant = this.pyRetAmountData.map(item => {
        return item.x;
      });
      let datas = this.pyRetAmountData.map(item => {
        return (item.y / 10000).toFixed(2);
      });
      myChart.setOption(
        {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            formatter: "{b0}</br>{c0} 万元"
          },
          xAxis: {
            name: "单位\n万元",
            type: "value"
          },
          yAxis: {
            type: "category",
            data: merchant,
            nameGap: 60
          },
          grid: {
            left: "25%",
            right: "12%",
            top: "0",
            bottom: "5%"
          },
          series: [
            {
              type: "bar",
              data: datas
            }
          ]
        },
        true
      );
    },
    pyWinloseAmount() {
      let myChart = this.$echarts.init(this.$refs.playerWinloseAmount);
      let merchant = this.pyWinloseAmountData.map(item => {
        return item.x;
      });
      let datas = this.pyWinloseAmountData.map(item => {
        return (item.y / 10000).toFixed(2);
      });

      myChart.setOption(
        {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            formatter: "{b0}</br>{c0} 万元"
          },
          xAxis: {
            name: "单位\n万元",
            type: "value"
          },
          grid: {
            left: "25%",
            right: "12%",
            top: "0",
            bottom: "5%"
          },
          yAxis: {
            type: "category",
            data: merchant,
            nameGap: 60
          },
          series: [
            {
              type: "bar",
              data: datas
            }
          ]
        },
        true
      );
    },

    init() {
      this.spinShow = true;
      let params = {};
      if (this.gameCode == "") {
        params = {
          //parent: JSON.parse(localStorage.getItem('userInfo')).userId,
          startTime: new Date(this.defaultTime[0]).getTime(),
          endTime: new Date(this.defaultTime[1]).getTime()
        };
      } else {
        params = {
          //parent: JSON.parse(localStorage.getItem('userInfo')).userId,
          startTime: new Date(this.defaultTime[0]).getTime(),
          endTime: new Date(this.defaultTime[1]).getTime(),
          gameType: this.gameCode
        };
      }
      // 先请求2个
      
      httpRequest("get", "/visual/line/day", params, "map").then(res => {
        this.spinShow = false
        this.reportData = res.data;
        this.reportConfigure();
        // 再请求2个
      });
      httpRequest("get", "/visual/line/player", params, "map").then(res => {
        this.spinShow = false
        this.playerCountData = res.data;
        this.playerCountConfigure();
        // 最后请求1个
      });
    },
 
    pyRankInit() {
      let params = {};
      if (this.gameCode == "") {
        params = {
          //parent: JSON.parse(localStorage.getItem('userInfo')).userId,
          startTime: new Date(this.defaultTime[0]).getTime(),
          endTime: new Date(this.defaultTime[1]).getTime()
        };
      } else {
        params = {
          //parent: JSON.parse(localStorage.getItem('userInfo')).userId,
          startTime: new Date(this.defaultTime[0]).getTime(),
          endTime: new Date(this.defaultTime[1]).getTime(),
          gameType: this.gameCode
        };
      }
      this.spinShow = true;
      httpRequest("get", "/visual/rank/player", params, "map").then(res => {
        this.pyBetCountData = res.data.betCount.reverse();
        this.pyBetAmountData = res.data.betAmount.reverse();
        this.pyRetAmountData = res.data.retAmount.reverse();
        this.pyWinloseAmountData = res.data.winloseAmount.reverse();
        this.pyBetCount();
        this.pyBetAmount();
        this.pyRetAmount();
        this.pyWinloseAmount();
        this.spinShow = false;
      });
    },
  },
  computed: {
    changedTime() {
      let time = this.defaultTime;
      time = time.map((item, index) => {
        if (index == 1 && item.getTime() > Date.now() - 180000) {
          return Date.now() - 180000;
        }
        return item.getTime();
      });
      this.defaultTime = [new Date(time[0]), new Date(time[1])];
      return time;
    }
  }
 
};
</script>

<style lang="less" scoped>
.newBoard {
  position: relative;
  min-height: 90vh;
  .title {
    font-size: 1.2rem;
    margin: 0.5rem 0 0.5rem;
    font-weight: 600;
    display: inline-block;
  }
  .top {
    display: flex;
    margin-bottom: 1rem;
    .title {
      margin: 0;
    }
    .right {
      margin-left: 2rem;
    }
  }
  .worldEcharts {
    width: 100%;
    position: absolute;
    top: 80px;
    left: 4rem;
    z-index: 100;
  }
  .chinaEcharts {
    width: 100%;
    position: absolute;
    top: 80px;
    left: 4rem;
    z-index: 100;
  }
  .gameDtributedEcharts {
    width: 50%;
    position: absolute;
    top: 60px;
    left: 18rem;
    z-index: 100;
  }
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  .map {
    display: flex;
    // justify-content: space-around;
  }
  .distribution {
    position: relative;
    display: flex;
    margin-bottom: 100px;
    // justify-content: space-around;
  }

  /deep/ .ivu-tabs-bar {
    height: 2.25rem;
  }
  /deep/ .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-nav-container {
    height: 2.25rem;
  }
  /deep/ .ivu-tabs-nav {
    height: 2.25rem;
  }
  /deep/ .ivu-tabs-nav-scroll {
    height: 2.25rem;
  }
  /deep/ .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    width: 6rem;
    height: 2.25rem;
    font-size: 1rem;
    text-align: center;
  }
}
</style>
