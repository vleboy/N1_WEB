<template>
  <div class="p-propList">
    <Row>
      <Col :span="11">
      <Button type="primary" @click="openModal()">创建新道具</Button>
      </Col>
      <Col :span="13" class="g-text-right">
      <Input placeholder="请输入道具名称" class="input" v-model="searchInfo.toolName"></Input>
      <Button style="margin-left: 10px" type="primary" @click="getPropList">搜索</Button>
      </Col>
    </Row>

    <Table :columns="columns" :data="getItems" style="margin-top: 16px"></Table>

    <Spin size="large" fix v-if="isFetching">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>

    <div style="text-align: right;margin:2rem 0">
      <Page :total="propList.length" show-elevator :page-size="50" :current.sync="currentPage" @on-change="getNowpage"></Page>
    </div>

    <Modal title="添加道具" v-model="isAddProp">
      <Form :model="propInfo" :label-width="100">
        <FormItem label="道具名称"  class="ivu-form-item-required">
          <Input v-model="propInfo.toolName" placeholder="请输入道具名称" :maxlength='20' :disabled="editStatus"></Input>
        </FormItem>
        <FormItem label="道具图标"  class="ivu-form-item-required">
          <Input v-model="propInfo.icon" placeholder="请输入道具图标" :maxlength='20'></Input>
        </FormItem>
        <FormItem label="描述"  class="ivu-form-item-required">
          <Input v-model="propInfo.desc" type="textarea" :rows="4" auto-complete="off"  placeholder="请输入描述"
                    :maxlength='200'></Input>
        </FormItem>

        <FormItem label="备注" >
          <Input v-model="propInfo.remark" type="textarea" :rows="4" auto-complete="off" placeholder="请输入备注"
                 :maxlength="200"></Input>
        </FormItem>
      </Form>
      <div slot="footer" class="dialog-footer">
        <Button @click="isAddProp = false">取 消</Button>
        <Button type="primary" :load="isSending" @click="submitProp(propInfo.toolId)">{{isSending ? '提交中' : '确 定'}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import { httpRequest } from "@/service/index";
  import dayjs from "dayjs";
export default {
  name: 'propList',

  created () {
    this.getPropList()
  },
  data () {
    return {
      nowSize: 50,
      nowPage: 1,
      currentPage: 1,
      isAddProp: false,
      isSending: false,
      isFetching: false,
      editStatus: false,
      propStatus: ['已锁定', '正常'],
      propList: [],
      propInfo: {
        toolName: '',
        remark: '',
        desc: '',
        icon: ''
      },
      searchInfo: {
        toolName: ''
      },
      columns: [
        {
          title: '道具id',
          key: 'toolId'
        },
        {
          title: '道具名称',
          key: 'toolName'
        },
        {
          title: '图标',
          key: 'icon'
        },
        {
          title: '描述',
          render: (h, params) => {
            return h('span', params.row.desc == 'NULL!' ? '-' : params.row.desc)
          }
        },
        {
          title: '创建时间',
          key: '',
          width:180,
          render: (h, params) => {
            return h("span", dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"));
          }
        },
        {
          title: '状态',
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  type: "border",
                  color: params.row.toolStatus ? "green" : "red"
                }
              }, this.propStatus[params.row.toolStatus])
          }
        },
        {
          title: '备注',
          render: (h,params)=> {
            let remark = params.row.remark;
            if (remark != "NULL!") {
              return h("span",params.row.remark);
            } else {
              return h("span", "暂无");
            }
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
                    this.changeStatus(params.row)
                  }
                }
              }, params.row.toolStatus ? '锁定' : '解锁'),
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
                    this.openModal(params.row)
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
                    this.delProp(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.propList.slice(0, this.nowSize)
      } else {
        return this.propList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    getPropList () {
      if(this.searchInfo.toolName == ''){
        delete this.searchInfo.toolName
      }
      this.isFetching = true
      httpRequest('post', '/toolList', {
        query: this.searchInfo
      },'game')
        .then(result => {
          this.propList = result.payload
          }
        ).finally(()=>{
          this.isFetching = false
        })
    },
    submitProp (id) {
      if (!this.propInfo.toolName) {
        return this.$message({
          message: '请输入道具名称',
          type: 'error'
        })
      } else if (!this.propInfo.icon) {
        return this.$message.error('请输入道具图标')
      }
      if (this.isSending) return // 防止重复提交
      this.isSending = true

      httpRequest("post", !id ? '/toolNew' : '/toolUpdate', this.propInfo,
        'game').then(result => {
          this.$Message.success('提交成功')
          this.isAddProp = false
          this.getPropList()
        }
      ).finally(()=>{
        this.isSending = false
      })
    },
    changeStatus (row) {
      httpRequest("post", "/toolChangeStatus", {
        toolName: row.toolName,
        toolId: row.toolId,
        status: row.toolStatus ? 0 : 1
      },'game').then(result => {
          this.getPropList()
        }
      )
    }, // 更改道具状态
    delProp (row) {
      this.$Modal.confirm({
        title: `确定删除道具${row.toolName}吗？`,
        content: '删除后该道具无法恢复，你还要继续吗？',
        onOk: () => {
          httpRequest("post", "/toolDelete", {
            toolId: row.toolId,
            toolName: row.toolName
          },'game').then(res => {
            this.isAddProp = false
            this.getPropList()
          });
        }
      });
    }, // 删除
    openModal (row = {}) {
      this.isAddProp = true
      this.propInfo = JSON.parse(JSON.stringify(row))
      if (JSON.stringify(row) !== '{}') {
        this.editStatus = true
        this.propInfo.desc = this.propInfo.desc === 'NULL!' ? '' : this.propInfo.desc
        this.propInfo.remark = this.propInfo.remark === 'NULL!' ? '' : this.propInfo.remark
      } else {
        this.editStatus = false
      }
    },
    getNowpage (page) {
      this.nowPage = page
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/less" lang="less">
  .p-propList{
    min-height: 86vh;
    .input{
      width: 40%;
    }
    .g-text-right{
      text-align: right;
    }
    .remarkBox{
      word-wrap: break-word;
      word-break: normal;
      width: 250px
    }
    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
  }


</style>
