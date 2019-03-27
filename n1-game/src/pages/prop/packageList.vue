<template>
  <div>
    <div class="p-packageList">
      <Row>
        <Col :span="11">
        <Button type="primary" @click="openModal()">创建新礼包</Button>
        </Col>
        <Col :span="13" class="g-text-right">
        <Input placeholder="请输入礼包名称" class="input" v-model="searchInfo.packageName"></Input>
        <Button style="margin-left: 10px" type="primary" @click="getPackageList">搜索</Button>
        </Col>
      </Row>

      <Table :columns="columns" :data="getItems" style="margin-top: 16px"></Table>

      <Spin size="large" fix v-if="isFetching">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>加载中...</div>
      </Spin>

      <div style="text-align: right;margin:2rem 0">
        <Page :total="packageList.length" show-elevator :page-size="50" :current.sync="currentPage" @on-change="getNowpage"></Page>
      </div>
    </div>

    <Modal title="添加礼包" v-model="isAddProp">
      <Form :model="packageInfo" :label-width="100">
        <FormItem label="礼包名称"  class="ivu-form-item-required">
          <Input v-model="packageInfo.packageName" placeholder="请输入礼包名称" :maxlength='20' :disabled="editStatus"></Input>
        </FormItem>
        <FormItem label="礼包图标"  class="ivu-form-item-required">
          <Select v-model="packageInfo.icon" placeholder="请选择礼包图标" clearable style="width: 100%">
            <Option v-for="item in numberOptions" :key="item.name" :value="item.name" :label="item.code"></Option>
          </Select>
        </FormItem>
        <FormItem label="持续时间（天）" >
          <Input v-model="packageInfo.duration"   placeholder="请输入持续时间"></Input>
        </FormItem>
        <FormItem label="添加道具">
          <Row>
            <Col :span="12">
              <Col :span="4">类别</Col>
              <Col :span="18">
                <Select v-model="addToolInfo.toolName" placeholder="请选择" filterable clearable style="width: 100%">
                  <Option v-for="item in propList" :key="item.toolName" :label="item.toolName" :value="item.toolName"></Option>
                </Select>
              </Col>
            </Col>
            <Col :span="12">
              <Col :span="4">数量</Col>
              <Col :span="18">
                <Input v-model="addToolInfo.toolNum" placeholder="请输入数量" :maxlength='10'></Input>
              </Col>
            </Col>
          </Row>
          <div style="margin-top: 2rem">
            <Row class="-package-add">
              <Table :columns="columnsAdd" :data="addToolList" style="margin-top: 16px"></Table>
            </Row>
            <Row style="text-align: right;margin-top: 2rem">
              <Button @click="addProp">{{isEditPackage ? '修改' : '添加'}}</Button>
            </Row>
          </div>
        </FormItem>
        <FormItem label="备注" >
          <Input v-model="packageInfo.remark" type="textarea" :rows="4" auto-complete="off" placeholder="请输入备注"
                 :maxlength="200"></Input>
        </FormItem>
      </Form>
      <div slot="footer" class="dialog-footer">
        <Button @click="isAddProp = false">取 消</Button>
        <Button type="primary" :load="isSending" @click="submitProp(packageInfo.packageId)">{{isSending ? '提交中' : '确 定'}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import { httpRequest } from "@/service/index";
  import dayjs from "dayjs";
  import detailModal from '@/components/packageTable'

export default {
  name: 'packageList',
  components: { detailModal },
  created () {
    this.getPackageList()
    this.getPropList()
  },
  data () {
    return {
      nowSize: 50,
      nowPage: 1,
      currentPage: 1,
      isAddProp: false,
      isSending: false,
      editStatus: false,
      isFetching: false,
      isEditPackage: false, // 新增礼包道具编辑状态控制
      packageStatus: ['已锁定', '正常'],
      packageList: [],
      packageInfo: {
        packageName: '',
        duration: '0',
        remark: '',
        content: [],
        icon: ''
      },
      searchInfo: {
        packageName: ''
      },
      numberOptions: this.getNumber(),
      addToolInfo: {
        toolName: '',
        toolNum: ''
      }, // 暂存新增的道具
      propList: [], // 获取道具列表
      addToolList: [], // 添加新增道具列表（本地暂存）
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(detailModal, {
              props: {
                row: params.row.content
              }
            })
          }
        },
        {
          title: '礼包名称',
          key: 'packageName'
        },
        {
          title: '图标',
          key: 'icon'
        },
        {
          title: '持续时间',
          key: '',
          width:180,
          render: (h, params) => {
            return h("span", params.row.duration == 0 ? '永久' : (params.row.duration + '天'));
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
                  color: params.row.packageStatus ? "green" : "red"
                }
              }, this.packageStatus[params.row.packageStatus])
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
              }, params.row.packageStatus ? '锁定' : '解锁'),
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
                    this.delPackage(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      columnsAdd: [
        {
          title: '道具',
          key: 'toolName'
        },
        {
          title: '数量',
          key: 'toolNum'
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
                  color:'#20a0ff'
                },
                on: {
                  click: () => {
                    this.updatePackage(params.row)
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
                    this.delAddPackage(params.$index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.packageList.slice(0, this.nowSize)
      } else {
        return this.packageList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    getPackageList () {
      if(this.searchInfo.packageName == ''){
        delete this.searchInfo.packageName
      }
      this.isFetching = true
      httpRequest('post', '/packageList', {
        query: this.searchInfo
      },'game')
        .then(result => {
          this.packageList = result.payload
          }
        ).finally(()=>{
          this.isFetching = false
        })
    },
    submitProp (id) {
      let reg = new RegExp(/^[0-9]*[1-9][0-9]*$/)
      this.packageInfo.content = this.addToolList
      if (!this.packageInfo.packageName) {
        return this.$Message.error('请输入礼包名称')
      } else if (!this.packageInfo.icon) {
        return this.$Message.error('请选择礼包图标')
      } else if (!this.packageInfo.duration) {
        this.packageInfo.duration = 0
      } else if (!this.packageInfo.content.length) {
        return this.$Message.error('请添加礼包道具')
      } else if (this.packageInfo.duration < 0) {
        return this.$Message.error('时间不能为负')
      } else if (!reg.exec(this.packageInfo.duration)) {
        return this.$Message.error('持续时间为正整数')
      }

      if (this.isSending) return // 防止重复提交
      this.isSending = true

      httpRequest("post", !id ? '/packageNew' : '/packageUpdate', this.packageInfo,
        'game').then(
        result => {
          this.$Message.success('提交成功')
          this.addToolList = []
          this.isAddProp = false
          this.getPackageList()
        }
      ).finally(()=>{
        this.isSending = false
      })
    },
    changeStatus (row) {
      httpRequest("post", "/packageChangeStatus", {
        packageName: row.packageName,
        packageId: row.packageId,
        status: row.packageStatus ? 0 : 1
      },'game').then(
        result => {
          this.$Message.success('状态改变成功')
          this.getPackageList()
        }
      )
    }, // 更改礼包状态
    openModal (row = {}) {
      this.isAddProp = true
      this.isEditPackage = false
      this.addToolInfo = {
        toolName: '',
        toolNum: ''
      }
      if (JSON.stringify(row) !== '{}') {
        this.editStatus = true
        this.packageInfo = JSON.parse(JSON.stringify(row))
        this.addToolList = this.packageInfo.content
        this.packageInfo.remark = this.packageInfo.remark === 'NULL!' ? '' : this.packageInfo.remark
      } else {
        this.packageInfo = {
          packageName: '',
          duration: '0',
          remark: '',
          content: [],
          icon: ''
        }
        this.addToolList = []
        this.editStatus = false
      }
    },
    delPackage (row) {
      this.$Modal.confirm({
        title: `确定删除礼包${row.packageName}吗？`,
        content: '删除后该礼包无法恢复，你还要继续吗？',
        onOk: () => {
          httpRequest("post", "/packageDelete", {
            packageId: row.packageId,
            packageName: row.packageName
          },'game').then(res => {
            this.$Message.success("删除成功");
            this.isAddProp = false
            this.getPackageList()
          });
        }
      });
    }, // 删除
    getNowpage (page) {
      this.nowPage = page
      console.log('当前是第:' + page + '页')
    },
    getNumber () {
      const numberArray = []
      for (var i = 1; i < 33; i++) {
        numberArray.push({
          name: `${i}`,
          code: `${i}`
        })
      }
      return numberArray
    },
    getPropList () {
      httpRequest('post', '/toolList', {},'game')
      .then(
        result => {
          for (let item of result.payload) {
            if (item.toolStatus) {
              this.propList.push(item)
            }
          }
        }
      )
    }, // 新增礼包获取道具列表
    addProp () {
      let reg = new RegExp(/^[0-9]*[1-9][0-9]*$/)
      if (!this.addToolInfo.toolName) {
        return this.$Message.error('请选择道具')
      } else if (!this.addToolInfo.toolNum) {
        return this.$Message.error('请选择数量')
      } else if (!reg.exec(this.addToolInfo.toolNum)) {
        return this.$Message.error('道具数量范围为1-1000,000,00的正整数')
      }
      if (this.isEditPackage) {
        let updateTool = {}
        this.propList.forEach(item => {
          if (item.toolName === this.addToolInfo.toolName) {
            updateTool = JSON.parse(JSON.stringify(Object.assign(this.addToolInfo, item)))
          }
        })
        this.addToolList.forEach((item, index, array) => {
          if (item.id === updateTool.id) {
            array.splice(index, 1, updateTool)
          }
        })
        this.isEditPackage = false
      } else {
        let toolObj = {}
        this.propList.forEach(item => {
          if (item.toolName === this.addToolInfo.toolName) {
            this.addToolInfo.id = this.addToolList.length + 1
            toolObj = JSON.parse(JSON.stringify(Object.assign(this.addToolInfo, item)))
            this.addToolList.push(toolObj)
          }
        })
      }
    }, // 新增道具
    delAddPackage (index) {
      this.addToolList.splice(index, 1)
    }, // 删除新增的道具
    updatePackage (row) {
      this.isEditPackage = true
      this.addToolInfo = JSON.parse(JSON.stringify(row))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
  .p-packageList{
    min-height: 86vh;
    .input{
      width: 40%;
    }
    .g-text-right{
      text-align: right;
    }
    .-package-add{
      max-height: 161px;
      overflow: auto;
    }
    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
  }
</style>
