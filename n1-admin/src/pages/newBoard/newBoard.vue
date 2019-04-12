<template>
<div class="newBoard">    
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
      <RadioGroup v-model="dateType" size="small" @on-change="changeDateType" type="button">
        <Radio label="1">近一周</Radio>
        <Radio label="2">近一个月</Radio>
        <Radio label="3">近三个月</Radio>
      </RadioGroup>
      <DatePicker type="datetimerange" :options="options" :editable='false' v-model="defaultTime" placeholder="选择日期时间范围(默认最近一周)" style="width: 300px;margin-left:1rem" @on-ok="confirm"></DatePicker>
      <Button type="primary" @click="search">搜索</Button>
      <Button type="ghost" @click="reset">重置</Button>
    </div>    
  </div>
  <div class="echarts">
    <div :style="{height:'600px',width:'100%'}" ref="chinaEchart"></div>
    <div :style="{height:'600px',width:'100%'}" ref="worldEchart"></div>
  </div>
  <Spin size="large" fix v-if="spinShow">
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
  </Spin>
</div>  
</template>

<script>
import "echarts/map/js/china.js"; // 引入中国地图数据
import chinaJson from "echarts/map/json/china.json";
import "echarts/map/js/world.js"; // 引入世界地图数据
import worldJson from "echarts/map/json/world.json";

import { httpRequest } from "@/service/index";
import { getDefaultTime } from "@/config/getDefaultTime";
import _ from "lodash";
import dayjs from "dayjs";

export default {
  data() {
    return {
      options: {
        shortcuts: [
          {
            text: "本周",
            value() {
              return [new Date(dayjs().startOf('week').valueOf() + 24 * 60 * 60 * 1000), new Date(dayjs().endOf('second').valueOf())]
            }
          },
          {
            text: "本月",
            value() {
              return [new Date(dayjs().startOf('month').valueOf()), new Date(dayjs().endOf('second').valueOf())]
            }
          },
          {
            text: "上周",
            value() {
              return [new Date(dayjs().add(-1, 'week').startOf('week').valueOf() + 24 * 60 * 60 * 1000), new Date(dayjs().startOf('week').valueOf() + 24 * 60 * 60 * 1000 - 1)]
            }
          },
          {
            text: "上月",
            value() {
              //-1 上月
              return [new Date(dayjs().add(-1, 'month').startOf('month').valueOf()), new Date(dayjs().startOf('month').valueOf() - 1)]
            }
          }
        ]
      }, 
      GameListEnum: [
        { company: "全部", code: "", name: "全部" },
        /*  { company: "NA", code: "10000", name: "NA棋牌游戏" },
        { company: "NA", code: "30000", name: "NA真人视讯" },
        { company: "NA", code: "40000", name: "NA电子游戏" },
        { company: "NA", code: "50000", name: "NA街机游戏" },
        { company: "NA", code: "60000", name: "NA捕鱼游戏" },
        { company: "NA", code: "80000", name: "H5真人视讯" }, */
        { company: "NA", code: "70000", name: "H5电子游戏" },
        { company: "NA", code: "90000", name: "H5电子游戏-无神秘奖" },
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
      defaultTime: getDefaultTime(),
      gameType: [],
      chinaData: [],
      chinaSplitList: [],
      worldData: [],
      spinShow: false,
      model1: '',
      gameCode: '',
      dateType: '1',
    };
  },
  mounted() {
    this.getGameList();
    this.worldConfigure();
    this.init()
  },
  methods: {
    getGameList() {
      this.gameType = this.GameListEnum  
    },
    selGame(code) {
      this.gameCode = code
      this.init()
    },
    changeDateType (val) {
      let nowDate = new Date()
      this.defaultTime = []
      switch (val) {
        case '1':
          this.defaultTime.push(new Date(nowDate.getTime()-24*3600*1000).setHours(0, 0, 0, 0) - 6*24*3600*1000)
          this.defaultTime.push(new Date(nowDate.getTime()-24*3600*1000).setHours(0, 0, 0, 0) + 24*3600*1000-1)
          break
        case '2':
          this.defaultTime.push(new Date(nowDate.getTime()-24*3600*1000).setHours(0, 0, 0, 0) - 29*24*3600*1000)
          this.defaultTime.push(new Date(nowDate.getTime()-24*3600*1000).setHours(0, 0, 0, 0) + 24*3600*1000-1)
          break
        case '3':
          this.defaultTime.push(new Date(nowDate.getTime()-24*3600*1000).setHours(0, 0, 0, 0) - 89*24*3600*1000)
          this.defaultTime.push(new Date(nowDate.getTime()-24*3600*1000).setHours(0, 0, 0, 0) + 24*3600*1000-1)
          break
      }
      this.init()       
    },
    confirm() {
      this.defaultTime = this.changedTime
      this.init()
    },
    search() {
      this.init()
    },
    reset() {
      this.defaultTime = getDefaultTime()
      this.gameCode = ''
      this.$refs.resetSelect.clearSingleSelect()
      this.init()
    },
    chinaConfigure() {
      this.$echarts.registerMap("china", chinaJson);
      let myChart = this.$echarts.init(this.$refs.chinaEchart); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      myChart.setOption({
        backgroundColor: "#FFFFFF",
        title: {
          text: "全国地图大数据",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item"
        },

        //左侧小导航图标
        visualMap: {
          show: true,
          x: "left",
          y: "center",
          splitList: this.chinaSplitList,
          color: [
            "#E3170D",
            "#FF8000",
            "#FFD700",
            "#FFFFCD",
            "#ccc",
            "#fff"
          ]
        },
        /* legend: {
            orient: 'vertical',
            x:'center',
            data:['重庆市区县']
        }, */
        //配置属性
        series: [
          {
            name: "数据",
            type: "map",
            mapType: "china",
            roam: false,
            label: {
              normal: {
                show: true //省份名称
              },
              emphasis: {
                show: false
              }
            },
            data: this.chinaData //数据
          }
        ]
      });
    },
    worldConfigure() {
      this.$echarts.registerMap("world", worldJson);
      let myChart = this.$echarts.init(this.$refs.worldEchart); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      myChart.setOption({
        title: {
          text: '世界地图大数据',
          left: "center",
          x: "center"
        },
        tooltip: {
          trigger: "item"
        },
         visualMap: {
          show: true,
          x: "left",
          y: "center",
          splitList: [
            { start: 601, end: 700 },
            { start: 501, end: 600 },
            { start: 401, end: 500 },
            { start: 301, end: 400 },
            { start: 201, end: 300 },
            { start: 101, end: 200 },
            { start: 0, end: 100 }
          ],
          color: [
            "red",
            "#5475f5",
            "#9feaa5",
            "#85daef",
            "#74e2ca",
            "#e6ac53",
            "#9fb5ea"
          ]
        },
        series: [
          {
            name: "数据",
            type: "map",
            mapType: "world",
            roam: false,
            itemStyle: {
              emphasis: { label: { show: true } }
            },
            nameMap:{
              'Afghanistan':'阿富汗',
              'Angola':'安哥拉',
              'Albania':'阿尔巴尼亚',
              'United Arab Emirates':'阿拉伯联合酋长国',
              'Argentina':'阿根廷',
              'Armenia':'亚美尼亚',
              'French Southern and Antarctic Lands':'法属南部领地',
              'Australia':'澳大利亚',
              'Austria':'奥地利',
              'Azerbaijan':'阿塞拜疆',
              'Burundi':'布隆迪',
              'Belgium':'比利时',
              'Benin':'贝宁',
              'Burkina Faso':'布基纳法索',
              'Bangladesh':'孟加拉国',
              'Bulgaria':'保加利亚',
              'The Bahamas':'巴哈马',
              'Bosnia and Herzegovina':'波斯尼亚和黑塞哥维那',
              'Belarus':'白俄罗斯',
              'Belize':'伯利兹',
              'Bermuda':'百慕大群岛',
              'Bolivia':'玻利维亚',
              'Brazil':'巴西',
              'Brunei':'文莱',
              'Bhutan':'不丹',
              'Botswana':'博茨瓦纳',
              'Central African Republic':'中非共和国',
              'Canada':'加拿大',
              'Switzerland':'瑞士',
              'Chile':'智利',
              'China':'中国',
              'Ivory Coast':'象牙海岸',
              'Cameroon':'喀麦隆',
              'Democratic Republic of the Congo':'民主刚果',
              'Republic of the Congo':'刚果',
              'Colombia':'哥伦比亚',
              'Costa Rica':'哥斯达黎加',
              'Cuba':'古巴',
              'Northern Cyprus':'北塞浦路斯',
              'Cyprus':'塞浦路斯',
              'Czech Republic':'捷克共和国',
              'Germany':'德国',
              'Djibouti':'吉布提',
              'Denmark':'丹麦',
              'Dominican Republic':'多米尼加共和国',
              'Algeria':'阿尔及利亚',
              'Ecuador':'厄瓜多尔',
              'Egypt':'埃及',
              'Eritrea':'厄立特里亚',
              'Spain':'西班牙',
              'Estonia':'爱沙尼亚',
              'Ethiopia':'埃塞俄比亚',
              'Finland':'芬兰',
              'Fiji':'斐济',
              'Falkland Islands':'福克兰群岛',
              'France':'法国',
              'Gabon':'加蓬',
              'United Kingdom':'英国',
              'Georgia':'佐治亚州',
              'Ghana':'迦纳',
              'Guinea':'几内亚',
              'Gambia':'冈比亚',
              'Guinea Bissau':'几内亚比绍',
              'Equatorial Guinea':'赤道几内亚',
              'Greece':'希腊',
              'Greenland':'格陵兰',
              'Guatemala':'危地马拉',
              'French Guiana':'法属圭亚那',
              'Guyana':'圭亚那',
              'Honduras':'洪都拉斯',
              'Croatia':'克罗地亚',
              'Haiti':'海地',
              'Hungary':'匈牙利',
              'Indonesia':'印度尼西亚',
              'India':'印度',
              'Ireland':'爱尔兰',
              'Iran':'伊朗',
              'Iraq':'伊拉克',
              'Iceland':'冰岛',
              'Israel':'以色列',
              'Italy':'意大利',
              'Jamaica':'牙买加',
              'Jordan':'约旦',
              'Japan':'日本',
              'Kazakhstan':'哈萨克斯坦',
              'Kenya':'肯尼亚',
              'Kyrgyzstan':'吉尔吉斯斯坦',
              'Cambodia':'柬埔寨',
              'South Korea':'韩国',
              'Kosovo':'科索沃',
              'Kuwait':'科威特',
              'Laos':'老挝',
              'Lebanon':'黎巴嫩',
              'Liberia':'利比里亚',
              'Libya':'利比亚',
              'Sri Lanka':'斯里兰卡',
              'Lesotho':'莱索托',
              'Lithuania':'立陶宛',
              'Luxembourg':'卢森堡',
              'Latvia':'拉脱维亚',
              'Morocco':'摩洛哥',
              'Moldova':'摩尔多瓦',
              'Madagascar':'马达加斯加',
              'Mexico':'墨西哥',
              'Macedonia':'马其顿',
              'Mali':'马里',
              'Myanmar':'缅甸',
              'Montenegro':'黑山',
              'Mongolia':'蒙古',
              'Mozambique':'莫桑比克',
              'Mauritania':'毛里塔尼亚',
              'Malawi':'马拉维',
              'Malaysia':'马来西亚',
              'Namibia':'纳米比亚',
              'New Caledonia':'新喀里多尼亚',
              'Niger':'尼日尔',
              "Nigeria": '尼日利亚',
              'Nicaragua':'尼加拉瓜',
              'Netherlands':'荷兰',
              'Norway':'挪威',
              'Nepal':'尼泊尔',
              'New Zealand':'新西兰',
              'Oman':'阿曼',
              'Pakistan':'巴基斯坦',
              'Panama':'巴拿马',
              'Peru':'秘鲁',
              'Philippines':'菲律宾',
              'Papua New Guinea':'巴布亚新几内亚',
              'Poland':'波兰',
              'Puerto Rico':'波多黎各',
              'North Korea':'朝鲜',
              'Portugal':'葡萄牙',
              'Paraguay':'巴拉圭',
              'Qatar':'卡塔尔',
              'Romania':'罗马尼亚',
              'Russia':'俄罗斯',
              'Rwanda':'卢旺达',
              'Western Sahara':'西撒哈拉',
              'Saudi Arabia':'沙特阿拉伯',
              'Sudan':'苏丹',
              'South Sudan':'南苏丹',
              'Senegal':'塞内加尔',
              'Solomon Islands':'所罗门群岛',
              'Sierra Leone':'塞拉利昂',
              'El Salvador':'萨尔瓦多',
              'Somaliland':'索马里兰',
              'Somalia':'索马利亚',
              'Republic of Serbia':'塞尔维亚共和国',
              'Suriname':'苏里南',
              'Slovakia':'斯洛伐克',
              'Slovenia':'斯洛文尼亚',
              'Sweden':'瑞典',
              'Swaziland':'斯威士兰',
              'Syria':'叙利亚',
              'Chad':'乍得',
              'Togo':'多哥',
              'Thailand':'泰国',
              'Tajikistan':'塔吉克斯坦',
              'Turkmenistan':'土库曼斯坦',
              'East Timor':'东帝汶',
              'Trinidad and Tobago':'特立尼达和多巴哥',
              'Tunisia':'突尼斯',
              'Turkey':'土耳其',
              'United Republic of Tanzania':'坦桑尼亚联合共和国',
              'Uganda':'乌干达',
              'Ukraine':'乌克兰',
              'Uruguay':'乌拉圭',
              'United States':'美国',
              'Uzbekistan':'乌兹别克斯坦',
              'Venezuela':'委内瑞拉',
              'Vietnam':'越南',
              'Vanuatu':'瓦努阿图',
              'West Bank':'约旦河西岸',
              'Yemen':'也门',
              'South Africa':'南非',
              'Zambia':'赞比亚',
              'Zimbabwe':'津巴布韦',
            },
            data: [
              { name: "阿富汗", value: 28397.812 },
              { name: "安哥拉", value: 19549.124 },
              { name: "阿尔巴尼亚", value: 3150.143 },
              { name: "阿拉伯联合酋长国", value: 8441.537 },
              { name: "阿根廷", value: 40374.224 },
              { name: "亚美尼亚", value: 2963.496 },
              { name: "法属南部领地", value: 268.065 },
              { name: "澳大利亚", value: 22404.488 },
              { name: "奥地利", value: 8401.924 },
              { name: "阿塞拜疆", value: 9094.718 },
              { name: "布隆迪", value: 9232.753 },
              { name: "比利时", value: 10941.288 },
              { name: "贝宁", value: 9509.798 },
              { name: "布基纳法索", value: 15540.284 },
              { name: "孟加拉国", value: 151125.475 },
              { name: "保加利亚", value: 7389.175 },
              { name: "巴哈马", value: 66402.316 },
              { name: "波斯尼亚和黑塞哥维那", value: 3845.929 },
              { name: "白俄罗斯", value: 9491.07 },
              { name: "伯利兹", value: 308.595 },
              { name: "百慕大群岛", value: 64.951 },
              { name: "玻利维亚", value: 716.939 },
              { name: "巴西", value: 195210.154 },
              { name: "文莱", value: 27.223 },
              { name: "不丹", value: 716.939 },
              { name: "博茨瓦纳", value: 1969.341 },
              { name: "中非共和国", value: 4349.921 },
              { name: "加拿大", value: 34126.24 },
              { name: "瑞士", value: 7830.534 },
              { name: "智利", value: 17150.76 },
              { name: "中国", value: 1359821.465 },
              { name: "象牙海岸", value: 60508.978 },
              { name: "喀麦隆", value: 20624.343 },
              { name: "民主刚果", value: 62191.161 },
              { name: "刚果", value: 3573.024 },
              { name: "哥伦比亚", value: 46444.798 },
              { name: "哥斯达黎加", value: 4669.685 },
              { name: "古巴", value: 11281.768 },
              { name: "北塞浦路斯", value: 1.468 },
              { name: "塞浦路斯", value: 1103.685 },
              { name: "捷克共和国", value: 10553.701 },
              { name: "德国", value: 83017.404 },
              { name: "吉布提", value: 834.036 },
              { name: "丹麦", value: 5550.959 },
              { name: "多米尼加共和国", value: 10016.797 },
              { name: "阿尔及利亚", value: 37062.82 },
              { name: "厄瓜多尔", value: 15001.072 },
              { name: "埃及", value: 78075.705 },
              { name: "厄立特里亚", value: 5741.159 },
              { name: "西班牙", value: 46182.038 },
              { name: "爱沙尼亚", value: 1298.533 },
              { name: "埃塞俄比亚", value: 87095.281 },
              { name: "芬兰", value: 5367.693 },
              { name: "斐济", value: 860.559 },
              { name: "福克兰群岛", value: 49.581 },
              { name: "法国", value: 63230.866 },
              { name: "加蓬", value: 1556.222 },
              { name: "英国", value: 62066.35 },
              { name: "佐治亚州", value: 4388.674 },
              { name: "迦纳", value: 24262.901 },
              { name: "几内亚", value: 10876.033 },
              { name: "冈比亚", value: 1680.64 },
              { name: "几内亚比绍", value: 10876.033 },
              { name: "赤道几内亚", value: 696.167 },
              { name: "希腊", value: 11109.999 },
              { name: "格陵兰", value: 56.546 },
              { name: "危地马拉", value: 14341.576 },
              { name: "法属圭亚那", value: 231.169 },
              { name: "圭亚那", value: 786.126 },
              { name: "洪都拉斯", value: 7621.204 },
              { name: "克罗地亚", value: 4338.027 },
              { name: "海地", value: 9896.4 },
              { name: "匈牙利", value: 10014.633 },
              { name: "印度尼西亚", value: 240676.485 },
              { name: "印度", value: 1205624.648 },
              { name: "爱尔兰", value: 4467.561 },
              { name: "伊朗", value: 240676.485 },
              { name: "伊拉克", value: 30962.38 },
              { name: "冰岛", value: 318.042 },
              { name: "以色列", value: 7420.368 },
              { name: "意大利", value: 60508.978 },
              { name: "牙买加", value: 2741.485 },
              { name: "约旦", value: 6454.554 },
              { name: "日本", value: 127352.833 },
              { name: "哈萨克斯坦", value: 15921.127 },
              { name: "肯尼亚", value: 40909.194 },
              { name: "吉尔吉斯斯坦", value: 5334.223 },
              { name: "柬埔寨", value: 14364.931 },
              { name: "韩国", value: 51452.352 },
              { name: "科索沃", value: 97.743 },
              { name: "科威特", value: 2991.58 },
              { name: "老挝", value: 6395.713 },
              { name: "黎巴嫩", value: 4341.092 },
              { name: "利比里亚", value: 3957.99 },
              { name: "利比亚", value: 6040.612 },
              { name: "斯里兰卡", value: 20758.779 },
              { name: "莱索托", value: 2008.921 },
              { name: "立陶宛", value: 3068.457 },
              { name: "卢森堡", value: 507.885 },
              { name: "拉脱维亚", value: 2090.519 },
              { name: "摩洛哥", value: 31642.36 },
              { name: "摩尔多瓦", value: 103.619 },
              { name: "马达加斯加", value: 21079.532 },
              { name: "墨西哥", value: 117886.404 },
              { name: "马其顿", value: 507.885 },
              { name: "马里", value: 13985.961 },
              { name: "缅甸", value: 51931.231 },
              { name: "黑山", value: 620.078 },
              { name: "蒙古", value: 2712.738 },
              { name: "莫桑比克", value: 23967.265 },
              { name: "毛里塔尼亚", value: 3609.42 },
              { name: "马拉维", value: 15013.694 },
              { name: "马来西亚", value: 28275.835 },
              { name: "纳米比亚", value: 2178.967 },
              { name: "新喀里多尼亚", value: 246.379 },
              { name: "尼日尔", value: 15893.746 },
              { name: "尼日利亚", value: 159707.78 },
              { name: "尼加拉瓜", value: 5822.209 },
              { name: "荷兰", value: 16615.243 },
              { name: "挪威", value: 4891.251 },
              { name: "尼泊尔", value: 26846.016 },
              { name: "新西兰", value: 4368.136 },
              { name: "阿曼", value: 2802.768 },
              { name: "巴基斯坦", value: 173149.306 },
              { name: "巴拿马", value: 3678.128 },
              { name: "秘鲁", value: 29262.83 },
              { name: "菲律宾", value: 93444.322 },
              { name: "巴布亚新几内亚", value: 6858.945 },
              { name: "波兰", value: 38198.754 },
              { name: "波多黎各", value: 3709.671 },
              { name: "朝鲜", value: 1.468 },
              { name: "葡萄牙", value: 10589.792 },
              { name: "巴拉圭", value: 6459.721 },
              { name: "卡塔尔", value: 1749.713 },
              { name: "罗马尼亚", value: 21861.476 },
              { name: "俄罗斯", value: 21861.476 },
              { name: "卢旺达", value: 10836.732 },
              { name: "西撒哈拉", value: 514.648 },
              { name: "沙特阿拉伯", value: 27258.387 },
              { name: "苏丹", value: 35652.002 },
              { name: "南苏丹", value: 9940.929 },
              { name: "塞内加尔", value: 12950.564 },
              { name: "所罗门群岛", value: 526.447 },
              { name: "塞拉利昂", value: 5751.976 },
              { name: "萨尔瓦多", value: 6218.195 },
              { name: "索马里兰", value: 9636.173 },
              { name: "索马利亚", value: 9636.173 },
              { name: "塞尔维亚共和国", value: 3573.024 },
              { name: "苏里南", value: 524.96 },
              { name: "斯洛伐克", value: 5433.437 },
              { name: "斯洛文尼亚", value: 2054.232 },
              { name: "瑞典", value: 9382.297 },
              { name: "斯威士兰", value: 1193.148 },
              { name: "叙利亚", value: 7830.534 },
              { name: "乍得", value: 11720.781 },
              { name: "多哥", value: 6306.014 },
              { name: "泰国", value: 66402.316 },
              { name: "塔吉克斯坦", value: 7627.326 },
              { name: "土库曼斯坦", value: 5041.995 },
              { name: "东帝汶", value: 10016.797 },
              { name: "特立尼达和多巴哥", value: 1328.095 },
              { name: "突尼斯", value: 10631.83 },
              { name: "土耳其", value: 72137.546 },
              { name: "坦桑尼亚联合共和国", value: 44973.33 },
              { name: "乌干达", value: 33987.213 },
              { name: "乌克兰", value: 46050.22 },
              { name: "乌拉圭", value: 3371.982 },
              { name: "美国", value: 312247.116 },
              { name: "乌兹别克斯坦", value: 27769.27 },
              { name: "委内瑞拉", value: 236.299 },
              { name: "越南", value: 89047.397 },
              { name: "瓦努阿图", value: 236.299 },
              { name: "约旦河西岸", value: 13.565 },
              { name: "也门", value: 22763.008 },
              { name: "南非", value: 51452.352 },
              { name: "赞比亚", value: 13216.985 },
              { name: "津巴布韦", value: 13076.978 }
            ]
          }
        ]
      });
    },
    async init() {
      this.spinShow = true
      let params = {}
      if (this.gameCode == '') {
        params = {
        startTime: new Date(this.defaultTime[0]).getTime(),
        endTime: new Date(this.defaultTime[1]).getTime(),
        }
      } else {
        params = {
        startTime: new Date(this.defaultTime[0]).getTime(),
        endTime: new Date(this.defaultTime[1]).getTime(),
        gameTypeL: this.gameCode
        }
      }
      await httpRequest("get", "/visual/map/china", params, "map").then(
        result => {
          this.chinaData = result.mapData
          this.chinaSplitList = result.splitList
        }
      )
      this.chinaConfigure();
      this.spinShow = false
    }
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
    },
  }
};
</script>

<style lang="less" scoped>
.newBoard {
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
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
}
</style>
