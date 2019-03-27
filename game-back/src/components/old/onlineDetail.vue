<template>
    <div class="onlineDetail">
        <div class="hour">
            <p class="secTitle">每小时在线人数</p>
            <div class="content">
                <div id="barChart1" class="charts"></div>
            </div>
        </div>
        <div class="average">
            <p class="secTitle">玩家平均在线时长</p>
            <div class="content">
                <p>
                    <span class="sumItem"><Icon type="ios-clock-outline" size="18" color="#6699FF"></Icon>  7日: {{hour1}}小时</span>
                    <span class="sumItem">昨日: {{hour2}}小时</span>
                </p>
                <div id="barChart2" class="charts"></div>
            </div>
        </div>
        <div class="everytime">
            <p class="secTitle">玩家每次登陆平均在线时长</p>
            <div class="content">
                <p>
                    <span class="sumItem"><Icon type="ios-clock-outline" size="18" color="#6699FF"></Icon>  7日: {{hour1}}小时</span>
                    <span class="sumItem">昨日: {{hour2}}小时</span>
                </p>
                <div id="barChart3" class="charts"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        hour1:234,
        hour2:125
    };
  },
  mounted(){
      this.drawBar()
      this.drawGameBar()
      this.drawLoginBar()
  },
  methods:{
      drawBar() {
      let option = {
        xAxis: {
          type: "category",
          data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        },
        yAxis: {
          type: "value"
        },
        legend: {
          data: ["7日每小时平均人数", "今日每小时在线人数"]
        },
        series: [
          {
            name: "7日每小时平均人数",
            data: [  120,   150,    120,  200,  150,  120,  200,  150, 120,   200,   150, 120,  200, 150,120, 200,  150, 120,  200,  150,120,200,  150 ].reverse(),
            type: "bar"
          },
          {
            name: "今日每小时在线人数",
            data: [  120,   150,    120,  200,  150,  120,  200,  150, 120,   200,   150, 120,  200,  150,120,200,  150 ],
            type: "bar"
          }
        ],
        tooltip: {
          show: true,
          trigger:'axis',
          axisPointer: {
              type: 'shadow'
            }
        }
      };
      const chart = document.getElementById('barChart1');
      let myChart = this.$echarts.init(chart);
      myChart.setOption(option);
    },
    drawGameBar(){
         let option = {
        xAxis: {
          type: "category",
          data: ['塔罗之谜','小厨娘','祥龙献瑞','四方神兽','财神进宝','福运亨通','熊猫传奇','幸运足球'],
        },
        yAxis: {
          type: "value"
        },
        legend: {
          data: ["7日平均在线", "昨日平均在线"]
        },
        series: [
          {
            name: "7日平均在线",
            data: [  120,   150,    120,  200,  150,  120, 150,  120,   ],
            type: "bar"
          },
          {
            name: "昨日平均在线",
            data: [  120,   150,    120,  200,  150,  120,150,  120,  ].reverse(),
            type: "bar"
          }
        ],
        tooltip: {
          show: true,
          trigger:'axis',
          axisPointer: {
              type: 'shadow'
            }
        }
      };
      const chart = document.getElementById('barChart2');
      let myChart = this.$echarts.init(chart);
      myChart.setOption(option);
    },
    drawLoginBar(){
         let option = {
        xAxis: {
          type: "category",
          data: ['塔罗之谜','小厨娘','祥龙献瑞','四方神兽','财神进宝','福运亨通','熊猫传奇','幸运足球'],
        },
        yAxis: {
          type: "value"
        },
        legend: {
          data: ["7日平均每次登陆在线", "昨日每次登陆平均在线"]
        },
        series: [
          {
            name: "7日平均每次登陆在线",
            data: [  120,   150,    120,  200,  150,  120, 150,  120,   ],
            type: "bar"
          },
          {
            name: "昨日每次登陆平均在线",
            data: [  120,   150,    120,  200,  150,  120,150,  120,  ],
            type: "bar"
          }
        ],
        tooltip: {
          show: true,
          trigger:'axis',
          axisPointer: {
              type: 'shadow'
            }
        }
      };
      const chart = document.getElementById('barChart3');
      let myChart = this.$echarts.init(chart);
      myChart.setOption(option);
      myChart.on('legendselectchanged', function (params) {
    // 获取点击图例的选中状态
            console.log(params);
            let isSelected = params.selected[params.name];
            // 在控制台中打印
            console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
            // 打印所有图例的状态
            console.log(params.selected);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.onlineDetail {
  .secTitle {
    line-height: 36px;
    font-size: 14px;
    font-weight: bold;
  }
  .content {
    background-color: #fff;
    p{
        padding: 15px;
    }
    .sumItem {
      border: 2px solid #2db7f5;
      text-indent: 1em;
      width: 200px;
      height: 40px;
      line-height: 36px;
      display: inline-block;
      background-color: #fff;
    }
  }
  .charts {
    width: 100%;
    height: 400px;
  }
}
</style>

