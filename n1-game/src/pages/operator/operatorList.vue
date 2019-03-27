<template>
  <div class="p-operator">
    <Row>
      <Col :span="11">
      <Button type="primary" @click="goCreate()">创建新供应商</Button>
      </Col>
      <Col :span="13" class="g-text-right">
      <Input placeholder="请输入供应商标识" class="input" v-model="searchInfo.companyIden"></Input>
      <Button style="margin-left: 10px" type="primary" @click="getOperatorList">搜索</Button>
      </Col>
    </Row>

    <Table :columns="columns" :data="companyList" style="margin-top: 16px"></Table>

    <div style="text-align: right;margin:2rem 0">
      <Page :total="operatorList.length" show-elevator :page-size="50" :current.sync="currentPage" @on-change="getNowpage"></Page>
    </div>

    <Spin size="large" fix v-if="isFetching">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>

    <Modal title='供应商详情' v-model="isShowDetail" class="g-text-center"  width="800"  cancel-text="">
      <detailModal ref="childMethod" :dataProp="propChild"></detailModal>
    </Modal>
  </div>
</template>

<script>
  import { httpRequest } from "@/service/index";
  import detailModal from '@/components/detailOperatorModal'
export default {
  name: 'operatorList',
  components:{ detailModal },
  data () {
    return {
      nowSize: 50,
      nowPage: 1,
      currentPage: 1,
      isFetching: false,
      isShowDetail: false,
      companyTypeArray: ['A类','B类'],
      status: ['锁定', '正常'],
      columns: [
        {
          title: '供应商名称',
          key: 'companyName',
          align: 'center',
        },
        {
          title: '供应商标识',
          key: 'companyIden',
          align: 'center',
        },
        {
          title: '接入类型',
          align: 'center',
          render: (h, params) => {
            return h('span', `${this.companyTypeArray[params.row.companyType-1]}`)
          }
        },
        {
          title: '状态',
          align: 'center',
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  type: "border",
                  color: params.row.companyStatus ? "green" : "red"
                }
              }, this.status[params.row.companyStatus])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color:'#20a0ff',
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.goDetail(params.row)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color:'#20a0ff'
                },
                on: {
                  click: () => {
                    this.editOperator(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color:'#20a0ff'
                },
                on: {
                  click: () => {
                    this.gameOperation(params.row)
                  }
                }
              }, `${params.row.companyStatus ? '停用':'启用'}`)
            ])
          }
        }
      ],
      operatorList: [],
      propChild: [],
      searchInfo: {}
    }
  },
  computed: {
    companyList () {
      if (this.nowPage === 1) {
        return this.operatorList.slice(0, this.nowSize)
      } else {
        return this.operatorList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  mounted () {
    this.getOperatorList()
  },
  methods: {
    getNowpage (page) {
      this.nowPage = page
      console.log('当前是第:' + page + '页')
    },
    goCreate () {
      this.$store.commit('closeEditState')
      this.$router.push({
        name: "addOperator"
      });
    },
    getOperatorList () {
      if(this.isFetching) return
      this.isFetching = true

      if(this.searchInfo.companyIden == ''){
        delete this.searchInfo.companyIden
      }

      httpRequest("post", "/companyList", {
        query: this.searchInfo
      },'game').then(
        result => {
          this.operatorList = result.payload.Items
        }
      ).finally(()=>{
        this.isFetching = false
      })
    }, // 获取游戏商列表
    gameOperation (data) {
      this.$Modal.confirm({
        title: "提示!",
        content: `${data.companyStatus ? '此操作将停用该供应商下的所有游戏， 是否继续？' : '此操作将启用该供应商，旗下所有游戏将生效，是否继续？'}`,
        onOk: () => {
          httpRequest("post", "/companyChangeStatus", {
            companyName: data.companyName,
            companyId: data.companyId,
            status: data.companyStatus ? 0 : 1
          },'game').then(res => {
            this.$Message.success("状态改变成功");
            this.getOperatorList()
          });
        }
      });
    },
    editOperator (row) {
      this.$store.commit('openEditState')
      this.$store.commit({
        type: 'storageGameOneItem',
        data: row
      })
      this.$router.push({
        name: "addOperator",
        query: {
          name: row.companyName
        }
      });
    },
    goDetail (row) {
      this.propChild  = ''
      httpRequest('get',`/companyOne/${row.companyName}/${row.companyId}`,{},'game').then((data) => {
        this.propChild = data.payload
      })
      this.isShowDetail = !this.isShowDetail
    } // 查看用户
  },
  watch: {
    '$route': function (_new, _old) {
      if((_new.name == 'operatorList') && this.$store.state.add.isRefresh) {
        this.getOperatorList()
        this.$store.state.add.isRefresh = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .p-operator {
    min-height: 86vh;
    .input{
      width: 40%;
    }
    .g-text-right{
      text-align: right;
    }
    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
  }
</style>
