 <template>
  <div class="merchantBoothList">

    <div class="-p-m-header">
      <Col :span="11">
       <Button type="primary" @click="openModal()">物品上架</Button>
      </Col>
      <Col :span="13" class="g-text-right">
      <Input placeholder="请输入物品名称" class="input" v-model="searchInfo.toolName"></Input>
      <Button style="margin-left: 10px" type="primary" @click="startSearch">搜索</Button>
      <Button @click="resetSearch">重置</Button>
      </Col>
    </div>

    <div>
      <Table :columns="columns" :data="getItems"></Table>
      <div class="page">
        <Page :total="boothList.length"
              show-elevator
              :page-size="20"
              :current.sync="currentPage"
              @on-change="getNowpage"></Page>
      </div>
    </div>

    <Modal title="商户物品上架" v-model="isAddProp" width="630" class="-modal">
      <Form :model="boothInfo" :label-width="110">
        <FormItem label="展位编号"  >
          <div class="g-text-left" v-if="!isNewProp">{{boothInfo.order}}</div>
          <div class="g-text-left" v-else>
            <RadioGroup v-model="replaceType" type="button">
              <Radio v-for="(item, index) in boothPositionList"  :key="index" :label="item.value" :disabled="item.disabled">
                {{item.name}}
              </Radio>
            </RadioGroup>
          </div>
        </FormItem>
        <FormItem label="物品类型">
          <Select v-model="boothInfo.contentType" placeholder="请选择物品类型" clearable style="width: 100%"
                     @on-change="changeGoods()">
            <Option v-for="(item, index) in goodsType" :key="index" :label="item.name" :value="item.code"></Option>
          </Select>
        </FormItem>
        <FormItem label="选择物品">
          <Select v-model="boothInfo.prop" placeholder="请选择上架物品" filterable clearable :disabled="!isCheckGoods" style="width: 100%">
            <Option v-for="(item, index) in oldPropList" :key="index" :label="item.toolName"
                       :value="item.toolName" v-if="boothInfo.contentType==1">
            </Option>
            <Option v-for="(item, index) in packageList" :key="index" :label="item.packageName"
                       :value="item.packageName" v-if="boothInfo.contentType==2">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="物品数量" >
          <Input  v-model="boothInfo.sum" placeholder="请输入物品数量" :maxlength=100000000 ></Input>
        </FormItem>
        <FormItem label="物品总价" >
          <Tooltip effect="dark" :content="tipsRatio" placement="right">
            <Input  v-model="boothInfo.price" placeholder="请输入物品售价"  :maxlength=100000000></Input>
          </Tooltip>
        </FormItem>
        <FormItem label="是否促销" style="text-align: left">
          <Checkbox v-model="isChecked"></Checkbox>
        </FormItem>
        <FormItem label="自定义图标" style="text-align: left">
          <Checkbox v-model="isShowIcon"></Checkbox>
        </FormItem>
        <FormItem label="图标名称" v-if="isShowIcon">
          <Col :span="8" v-for="(item,index) of iconImg" :key="index"  >
            <div class="-icon">
              <img :src="item.img" class="-icon-img">
              <Button :class="{'active':item.isIconChecked}" @click="checkIcon(item)">{{item.value}}</Button>
            </div>
          </Col>
        </FormItem>
        <FormItem label="备注" >
          <Input v-model="boothInfo.remark" type="textarea" :rows="4" auto-complete="off" placeholder="请输入备注"
                    :maxlength="200"></Input>
        </FormItem>
      </Form>
      <div slot="footer" class="dialog-footer">
        <Button @click="isAddProp = false">取 消</Button>
        <Button type="primary" :load="isSending" @click="submitProp(boothInfo.seatId)">{{isSending ? '提交中' : '确 定'}}</Button>
      </div>
    </Modal>

    <Modal title="展位替换" v-model="isBoothReplace">
      <Form :model="replaceInfo" :label-width="110">
        <FormItem label="当前展位" >
          <div style="text-align: left">{{replaceInfo.order}}</div>
        </FormItem>
        <FormItem label="需要替换的展位"  class="g-text-left">
          <RadioGroup v-model="replaceType" @on-change="changeTypeReplace()" type="button">
            <Radio v-for="(item, index) in boothReplaceList" :key="index" :label="item.value" :disabled="item.disabled">
              {{item.name}}
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer" class="dialog-footer">
        <Button @click="isBoothReplace = false">取 消</Button>
        <Button type="primary" :load="isSending" @click="boothReplace()">{{isSending ? '提交中' : '确 定'}}</Button>
      </div>
    </Modal>

    <Spin size="large" fix v-if="isFetching">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
  </div>
</template>

<script type="text/ecmascript-6">
  import { httpRequest } from '@/service/index'
  import dayjs from "dayjs";
  import { pattern } from '@/config/regexp'
export default {
  created () {
    this.getPropList()
    this.getBoothList()
    this.getPackageList()
  },
  data () {
    return {
      nowSize: 20,
      nowPage: 1,
      currentPage: 1,
      isAddProp: false,
      isBoothReplace: false,// 展位替换modal
      isSending: false,
      isFetching: false,
      isChecked: false, // 是否促销
      isShowIcon: false, // 自定义图标
      isCheckGoods: false,
      isNewProp: false, // 是否是从新增里点击进入
      radioInfo: '1',
      goodsType: [
        {
          code: 1,
          name: '道具列表'
        },
        {
          code: 2,
          name: '礼包列表'
        }
      ],
      boothClassStatus: ['gray', 'success', 'danger'],
      boothStatus: ['已停用', '正常', '促销'],
      boothList: [],
      oldPropList: [],
      propList: [],
      packageList: [],
      boothInfo: {
        seatType: 2,
        remark: '',
        order: '',
        sum: '',
        price: '',
        prop: '',
        seatStatus: '',
        contentType: '',
        icon: '',
        content: ''
      },
      replaceInfo:{},
      searchInfo: {
        toolName: '',
        toolId: ''
      },
      searchArray: [], // 暂时加储
      replaceType: '', // 展位编号替换位置
      replaceStorage: '', // 展位替换暂存数据
      afterReplaceSeatId: '', // 展位替换后的ID
      allPriceUp: '', // 上浮最高总价
      allPriceLow: '', // 下浮最低总价
      iconImg:[
        {
          id: 1,
          value: 'RoomCard1',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard1.png',
          isIconChecked: false
        },
        {
          id: 2,
          value: 'RoomCard2',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard2.png',
          isIconChecked: false
        },
        {
          id: 3,
          value: 'RoomCard3',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard3.png',
          isIconChecked: false
        },
        {
          id: 4,
          value: 'RoomCard4',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard4.png',
          isIconChecked: false
        },
        {
          id: 5,
          value: 'RoomCard5',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard5.png',
          isIconChecked: false
        },
        {
          id: 6,
          value: 'RoomCard6',
          img: 'https://d38xgux2jezyfx.cloudfront.net/RoomCard6.png',
          isIconChecked: false
        }
      ], // 自定义图标路径
      boothPositionList: [
        {
          value: 1,
          name: '1号展位',
          disabled: false
        },{
          value: 2,
          name: '2号展位',
          disabled: false
        },{
          value: 3,
          name: '3号展位',
          disabled: false
        },{
          value: 4,
          name: '4号展位',
          disabled: false
        },{
          value: 5,
          name: '5号展位',
          disabled: false
        },{
          value: 6,
          name: '6号展位',
          disabled: false
        }
      ], //展位
      boothReplaceList: [], //展位
      columns: [
        {
          title: '展位',
          key: 'order'
        },
        {
          title: '物品名称',
          key: '',
          render: (h,params) => {
            return h('span',params.row.content.toolName || params.row.content.packageName)
          }
        },
        {
          title: '物品类型',
          key: '',
          render: (h,params) => {
            return h('span',params.row.contentType==1?'道具':'礼包')
          }
        },
        {
          title: '道具售价',
          key: 'price'
        },
        {
          title: '数量',
          key: 'sum'
        },
        {
          title: '创建时间',
          key: '',
          render: (h, params) => {
            return h("span", dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"));
          }
        },
        {
          title: "状态",
          key: "state",
          sortable: true,
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  type: "border",
                  color: params.row.seatStatus == 1 ? "green" : "red"
                }
              },
              this.boothStatus[params.row.seatStatus]
            );
          }
        },
        {
          title: '备注',
          key: 'count',
          render: (h,params)=> {
            let remark = params.row.remark;
            if (remark != "NULL!") {
              return h(
                "Tooltip",
                {
                  props: {
                    content: remark
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "search",
                      color: "#20a0ff"
                    }
                  })
                ]
              );
            } else {
              return h("span", "暂无");
            }
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#20a0ff"
                  },
                  on: {
                    click: () => {
                      this.openModalReplace(params.row);
                    }
                  }
                },
                "展位替换"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#20a0ff"
                  },
                  on: {
                    click: () => {
                      this.openModal(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#20a0ff"
                  },
                  on: {
                    click: () => {
                      this.delProp(params.row);
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ]
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.boothList.slice(0, this.nowSize)
      } else {
        return this.boothList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    },
    tipsRatio () {
      let toolLow, toolUp, price, status= ''
      let packageStatus = []
      if (this.boothInfo.contentType ===1) {
        this.oldPropList.forEach(item => {
          if (item.toolName === this.boothInfo.prop) {
            toolLow = item.lowerRatio*0.01
            toolUp = item.comeUpRatio*0.01
            price = item.toolPrice
            status = item.status
            this.allPriceLow = (1-toolLow) > 0 ? (this.boothInfo.sum!='' ? (1-toolLow)*price*this.boothInfo.sum : (1-toolLow)*price) : 0
            this.allPriceUp = this.boothInfo.sum!='' ? toolUp*price*this.boothInfo.sum : toolUp*price
          }
        })
      } else if (this.boothInfo.contentType ===2){
        this.allPriceLow = 0
        this.allPriceUp = 0
        this.packageList.forEach(item => {
          if (item.packageName === this.boothInfo.prop) {
            for (let data of item.content){
              toolLow = data.lowerRatio*0.01
              toolUp = data.comeUpRatio*0.01
              price = data.toolPrice
              packageStatus.push(data.status)
              this.allPriceLow = ((1-toolLow) > 0 ? (this.boothInfo.sum!='' ? (1-toolLow)*price*this.boothInfo.sum : (1-toolLow)*price) : 0) + this.allPriceLow
              this.allPriceUp = (this.boothInfo.sum!='' ? toolUp*price*this.boothInfo.sum : toolUp*price) + this.allPriceUp
            }
          }
        })
//        主要处理道具礼包里道具是否有无限制的上浮率
        for (let item of packageStatus) {
          if(item=='1') {
            status = item
            break
          }
        }
      }

      return `物品总价的最低价格为：${this.allPriceLow||0},最高价格为：${status=='1' ? '无限制' : (this.allPriceUp||0)}`
    }
  },
  methods: {
    getBoothList (type) {
      if(this.isFetching) return
      this.isFetching = true
      httpRequest('post','/seatList', {
        seatType: type || '2'
      },'game').then(
        result => {
          this.boothList = result.payload
          this.resultData()
          for (let item of this.boothList) {
            for (let item1 of this.boothPositionList){
              if (item.order == item1.value){
                item1.disabled = true
              }
            }
          }
          this.searchArray = result.payload
        }
      ).finally(()=>{
        this.isFetching = false
      })
    },
    submitProp (id) {
      this.boothInfo.seatStatus = this.isChecked ? '2' : '1'
      this.boothInfo.icon = this.isShowIcon ? this.boothInfo.icon : ''
      this.boothInfo.order = this.replaceType || this.boothInfo.order
      if (this.boothInfo.contentType === 1) {
        this.oldPropList.forEach(item => {
          if (item.toolName === this.boothInfo.prop) {
            this.boothInfo.content = item
          }
        })
      } else if (this.boothInfo.contentType === 2) {
        this.packageList.forEach(item => {
          if (item.packageName === this.boothInfo.prop) {
            this.boothInfo.content = item
          }
        })
      }
      if (!this.boothInfo.seatType) {
        return this.$Message.error('请选择展位')
      } else if (!this.boothInfo.order) {
        return this.$Message.error('请输入展位编号')
      } else if (!this.boothInfo.content) {
        return this.$Message.error('请选择物品')
      } else if (this.boothInfo.price!='0'&&!this.boothInfo.price) {
        return this.$Message.error('请输入物品总价')
      } else if (this.boothInfo.price>this.allPriceUp || this.boothInfo.price<this.allPriceLow) {
        return this.$Message.error('请输入在物品范围总价之内的价格')
      } else if (!this.boothInfo.sum) {
        return this.$Message.error('请输入物品数量')
      } else if (!pattern.positiveInteger.exec(this.boothInfo.sum) || this.boothInfo.sum > 100000000) {
        return this.$Message.error('物品数量范围为1-1000,000,00的正整数')
      } else if (this.isShowIcon && (!this.boothInfo.icon || this.boothInfo.icon=='NULL!')) {
        return this.$Message.error('请选择自定义图标')
      }
      if (this.isSending) return // 防止重复提交
      this.isSending = true
      httpRequest('post',`${id ? '/seatUpdate' : '/seatNew' }`,this.boothInfo, 'game').then(
        result => {
          this.$Message.success('提交成功')
          this.isAddProp = false
          this.getBoothList()
          this.isSending = false
        }
      )
    },
    delProp (row) {
      this.$Modal.confirm({
        title: '提示',
        content: `确定将${row.order}号展位中的物品下架吗？`,
        okText: '确定',
        cancelText: '取消',
        onOk: ()=>{
          httpRequest('post','/seatDelete', {
            seatId: row.seatId
          }, 'game').then(
            result => {
              this.$Message.success('删除成功')
              this.isAddProp = false
              this.getBoothList()
            }
          )
        },
        onCancel: () => {
          this.$Message.info('已取消删除')
        }
      })
    }, // 删除
    openModal (row = {}) {
      this.replaceType = ''
      this.isAddProp = true
      this.boothInfo = JSON.parse(JSON.stringify(row))
      if (JSON.stringify(row) !== '{}') {
        this.boothInfo.remark = this.boothInfo.remark === 'NULL!' ? '' : this.boothInfo.remark
        this.isChecked = this.boothInfo.seatStatus === 2
        this.isShowIcon = this.boothInfo.icon != "NULL!" // 看是否设定了自定义图标
        this.boothInfo.prop = (this.boothInfo.content.toolName || this.boothInfo.content.packageName)
        this.isCheckGoods = true
        this.isNewProp = false
      } else {
        this.boothInfo = {
          seatType: 2,
          remark: '',
          order: '',
          sum: '',
          price: '',
          prop: '',
          seatStatus: '',
          contentType: '',
          content: ''
        }
        this.isShowIcon = false
        this.isChecked = false
        this.isNewProp = true
      }

      // 根据是否有自定义图标初始化icon图标的选择情况
      if (!this.isShowIcon){
        for (let item of this.iconImg) {
          item.isIconChecked = false
        }
      } else {
        for (let item of this.iconImg) {
          if(this.boothInfo.icon == item.value){
            item.isIconChecked = true
          } else {
            item.isIconChecked = false
          }
        }
      }
    },
    startSearch () {
      let {toolId, toolName} = this.searchInfo
      this.arrayLocal = JSON.parse(JSON.stringify(this.searchArray))
      // console.log(this.arrayLocal, 111)
      if ((!toolId && !toolName)) {
        this.searchArray = []
        this.getBoothList()
      } else if (toolName && toolId) {
        this.boothList = this.arrayLocal.filter(item => {
          return ((item.content.toolName ? item.content.toolName : item.content.packageName) === this.searchInfo.toolName &&
          (item.content.toolId ? item.content.toolId : item.content.packageId) === this.searchInfo.toolId)
        })
      } else {
        if (toolName) {
          this.boothList = this.arrayLocal.filter(item => {
            return (item.content.toolName ? item.content.toolName : item.content.packageName) === this.searchInfo.toolName
          })
        } else if (toolId) {
          this.boothList = this.arrayLocal.filter(item => {
            return (item.content.toolId ? item.content.toolId : item.content.packageId) === this.searchInfo.toolId
          })
        }
      }
    }, // 控制搜索条件
    resetSearch () {
      this.searchInfo = {}
      this.searchArray = []
      this.getBoothList()
    },
    getNowpage (page) {
      this.nowPage = page
      // console.log('当前是第:' + page + '页')
    },
    getPropList () {
      httpRequest('post','/toolList',{},'game')
      .then(
        result => {
          for (let item of result.payload) {
            if (item.toolStatus) {
              this.oldPropList.push(item)
            }
          }
        }
      )
    }, // 新增礼包获取道具列表
    getPackageList () {
      httpRequest('post','/packageList',{},'game')
        .then(
          result => {
            for (let item of result.payload) {
              if (item.packageStatus) {
                this.packageList.push(item)
              }
            }
          }
        )
    }, // 新增礼包获取道具列表
    changeGoods () {
      if (this.boothInfo.contentType === 1) {
        this.boothInfo.prop = this.boothInfo.content.toolName
        this.isCheckGoods = true
      } else if (this.boothInfo.contentType === 2) {
        this.boothInfo.prop = this.boothInfo.content.packageName
        this.isCheckGoods = true
      } else {
        this.isCheckGoods = false
      }
    }, // 改变物品类型
    changeType () {
      if (this.boothInfo.seatType === '1') {
        this.propList = this.oldPropList.filter(item => {
          return (item.toolId === '100000')
        })
      } else {
        this.propList = this.oldPropList
      }
    }, // 改变展品类型
    openModalReplace (row) {
      this.replaceType = ''
      this.isBoothReplace = true
      this.replaceInfo = JSON.parse(JSON.stringify(row))
      this.resultData()
      this.boothReplaceList = JSON.parse(JSON.stringify(this.boothPositionList))
      for (let item4 of this.boothReplaceList){
        if(item4.value == this.replaceInfo.order){
          item4.disabled = true
        } else {
          item4.disabled = false
        }
      }
    }, //打开展位替换窗口
    changeTypeReplace () {
      for (let item of this.boothList) {
        if (item.order == this.replaceType){
          this.afterReplaceSeatId = item.seatId
        }
      }
    }, // 根据选中的展位找出替换后的id
    checkIcon (item) {
      for(let data of this.iconImg) {
         if(item.id == data.id){
           item.isIconChecked = !item.isChecked
         } else {
           data.isIconChecked = false
         }
      }
      this.boothInfo.icon = item.isIconChecked ? item.value : ''
    }, // 选中icon
    boothReplace () {
      httpRequest('post','/seatTigger',{
        beforeSeatId: this.replaceInfo.seatId,
        beforeOrder: this.replaceInfo.order,
        afterSeatId: this.afterReplaceSeatId,
        afterOrder: this.replaceType
      },'game')
        .then(result => {
          this.$Message.success('展位替换成功')
          this.getBoothList()
          this.isBoothReplace = false
        }
      )
    }, //  展位替换提交
    resultData () {
      for (let item4 of this.boothPositionList){
        item4.disabled = false
      }
    } // 初始化boothPositionList的数据
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .merchantBoothList{
    min-height: 89vh;
    .-p-m-header{
      overflow: hidden;
      padding-bottom: 16px;
      .g-text-right{
        text-align: right;
      }
    }

    .input{
      width: 60%
    }

    .page {
      padding-bottom: 2rem;
      text-align: right;
      margin-right: 1%;
      margin-top: 2rem
    }

    .active{
      color: #fff;
      background-color: #13ce66;
      border-color: #13ce66;
    }
    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
  }
  .-modal{
    .-icon{
      display: inline-block;
      overflow: hidden;
      width: 120px;

      .-icon-img{
        width: 60%;
      }
    }
  }
</style>
