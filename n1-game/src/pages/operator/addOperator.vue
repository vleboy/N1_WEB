<template>
  <div class="p-addOperator">
    <h2 class="title">供应商信息<span style="font-size: 14px"> (<span style="color: #ff4949"> * </span>为必填项)</span> </h2>
    <Form :model="managerInfo" :rules="rules" ref="managerInfo" class="createform" :label-width="120">
      <FormItem label="供应商名称" prop="companyName">
        <Input v-model="managerInfo.companyName" class="input" :disabled="this.$store.state.add.isEdit" placeholder="请输入供应商名称" :maxlength='20'></Input>
      </FormItem>
      <FormItem label="供应商标识" prop="companyIden">
        <Input v-model="managerInfo.companyIden" class="input" :disabled="this.$store.state.add.isEdit" placeholder="请输入供应商标识（必须首字母开头并且大写的非中文）" :maxlength='20'></Input>
      </FormItem>
      <FormItem label="供应商描述" prop="companyDesc">
        <Input v-model="managerInfo.companyDesc" class="input" type="textarea" placeholder="请输入供应商描述" :maxlength='200'></Input>
      </FormItem>
      <FormItem label="游戏类别（可多选）" prop="gameTypeList" class="is-required">
        <Select v-model="managerInfo.gameTypeList" allow-create filterable multiple placeholder="请选择游戏类别（可多选）" clearable class="input">
          <Option v-for="item in optionsList" :key="item.code" :label="item.name" :value="item.code"></Option>
        </Select>
      </FormItem>
    </Form>
    <h2 class="title">合同信息</h2>
    <Form :model="managerInfo" :rules="rules" ref="managerInfo" class="createform" :label-width="120">
      <FormItem label="供应商接入类型" prop="companyType" class="is-required">
        <Select v-model="managerInfo.companyType" placeholder="请选择" clearable class="input" :disabled="this.$store.state.add.isEdit">
          <Option v-for="item in companyTypeArray" :key="item.id" :label="item.value" :value="item.id"></Option>
        </Select>
      </FormItem>
      <FormItem label="接入分成比(%)" prop="companyRatio" v-if='managerInfo.companyType==2' class="is-required">
        <Input v-model="managerInfo.companyRatio" class="input" placeholder="请输入接入分成比(范围0.00-100.00)" :maxlength='16'></Input>
      </FormItem>
      <FormItem label="合同备注" prop="remark">
        <Input v-model="managerInfo.remark" class="input" placeholder="请输入合同备注" type="textarea" :maxlength='200'></Input>
      </FormItem>
    </Form>
    <div class="footer-btn createform">
      <Button type="primary"  @click="postCreateform" size="large">
        {{isSending ? '提交中...' : '确认'}}
      </Button>
    </div>
  </div>
</template>
<script>
  import { pattern } from '@/config/regexp'
  import { httpRequest } from "@/service/index";
export default {
  data () {
    var validateCompanyName = (rule, value, callback) => {
      var regName = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/)
      if (value === '') {
        this.isfinish.companyName = false
        callback(new Error('请输入供应商名称'))
      } else if (!regName.exec(value)) {
        this.isfinish.companyName = false
        callback(new Error('请输入中英文或者数字'))
      } else if (value.length < 2) {
        this.isfinish.companyName = false
        callback(new Error('必须为两位数'))
      } else {
        callback()
        this.isfinish.companyName = true
      }
    } // 供应商名称
    var validateCompanyIden = (rule, value, callback) => {
      let reg = new RegExp(/^[0-9]*$/)
      if (value === '') {
        callback(new Error('请输入供应商标识'))
        this.isfinish.companyIden = false
      } else if (reg.exec(value) || (value.substring(0,1) != value.substring(0,1).toUpperCase())) {
        callback(new Error('请输入字母或者数字（首位必须是大写字母）'))
        this.isfinish.companyIden = false
      } else if (value.length > 10) {
        callback(new Error('标识长度最多为10位'))
        this.isfinish.companyIden = false
      } else {
        callback()
        this.isfinish.companyIden = true
      }
    } // 供应商标识
    var validateCompanyDesc = (rule, value, callback) => {
      if (value && value.length < 2) {
        callback(new Error('必须为两位数'))
        this.isfinish.companyDesc = false
      } else if (value === '') {
        callback(new Error('请输入供应商描述'))
        this.isfinish.companyDesc = false
      } else {
        callback()
        this.isfinish.companyDesc = true
      }
    } // 供应商描述
    var validateCompanyRatio = (rule, value, callback) => {
      if(this.managerInfo.companyType == 2) {
        if (value === '') {
          callback(new Error('请输入成数'))
          this.isfinish.companyRatio = false
        } else if (!pattern.digitalRange.exec(value)) {
          callback(new Error('成数范围在0.00-100之间'))
          this.isfinish.companyRatio = false
        } else {
          callback()
          this.isfinish.companyRatio = true
        }
      }
    } // 成数
    var validateCompanyType = (rule, value, callback) => {
      if (value === '') {
        this.isfinish.companyType = false
        callback(new Error('请选择接入类型'))
      } else {
        callback()
        this.isfinish.companyType = true
      }
    } // 接入类型
    var validateRemark = (rule, value, callback) => {
      if (value && value.length < 2) {
        callback(new Error('必须为两位数'))
        this.isfinish.remark = false
      } else {
        callback()
        this.isfinish.remark = true
      }
    } // 类型
    var validateGameTypeList = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请选择游戏类别'))
        this.isfinish.gameTypeList = false
      } else {
        callback()
        this.isfinish.gameTypeList = true
      }
    } // 类型
    return {
      isfinish: {
        companyName: false,
        companyIden: false,
        companyDesc: true, // 不是必填  所以默认为true
        companyType: false,
        companyRatio: false,
        remark: true, // 不是必填  所以默认为true
        gameTypeList: false
      },
      managerInfo: {
        companyName: '', // 供应商名称
        companyDesc: '', // 供应商描述
        remark: '', // 类型
        companyKey: '', // key（B类才有）
        companyRatio: '', // 成数 （B类才有）
        companyType: '', // 供应商类别
        companyIden: '', // 供应商标识
        gameTypeList : [] // 游戏类别
      }, // 创建列表
      rules: {
        companyName: [
          {validator: validateCompanyName, trigger: 'blur',required: true}
        ],
        companyIden: [
          {validator: validateCompanyIden, trigger: 'blur',required: true}
        ],
        companyDesc: [
          {validator: validateCompanyDesc, trigger: 'blur',required: true}
        ],
        companyRatio: [
          {validator: validateCompanyRatio, trigger: 'blur'}
        ],
        companyType: [
          {validator: validateCompanyType, trigger: 'blur'}
        ],
        remark: [
          {validator: validateRemark, trigger: 'blur'}
        ],
        gameTypeList: [
          {validator: validateGameTypeList, trigger: 'blur'}
        ]
      }, // 列表验证规则
      uploadAction: '',
      imgFile:{},
      form: {
        key: '',
        token: ''
      },
      arrayList: [],
      fileList: [],
      fileSuffix: ['zip'],
      dialogLoading: false,
      isSending: false,
      companyTypeArray:[
        {
          id: 1,
          value: 'A类（接入公司的游戏供应商）'
        },{
          id: 2,
          value: 'B类（公司接入的游戏供应商）'
        }],
      optionsList: []
    }
  },
  created () {
   this.init()
  },
  methods: {
    init () {
      this.getGameTypeList()
      const storeInfo = this.$store.state.add.gameOneItem
      if (this.$store.state.add.isEdit) {
        this.managerInfo = {
          companyId: storeInfo.companyId,
          companyName: storeInfo.companyName, // 供应商名称
          companyIden: storeInfo.companyIden.toUpperCase(), // 供应商名标识
          companyDesc: storeInfo.companyDesc == 'NULL!' ? '' : storeInfo.companyDesc, // 供应商描述
          companyType: storeInfo.companyType, // 类型
          companyKey: storeInfo.companyKey, // key
          companyRatio: storeInfo.companyRatio, // 成数
          gameTypeList: storeInfo.gameTypeList, // 游戏类别
          remark: storeInfo.remark == 'NULL!' ? '' : storeInfo.remark// 备注
        }

        this.isfinish = {
          companyName: true,
          companyIden: true,
          companyRatio: true,
          gameTypeList : true
        }
      }
    },
    getGameTypeList () {
      httpRequest("post", "/gameType", {},'game')
        .then(res => {
          this.optionsList = res.payload
        })
    },
    postCreateform () {
      if(this.isSending) return
      if (!this.isfinish.companyName || this.isfinish.companyDesc == false || this.isfinish.remark == false ||
        !this.isfinish.companyIden || !this.managerInfo.companyType || (!this.isfinish.companyRatio && (this.managerInfo.companyType==2))||
        !this.managerInfo.gameTypeList.length) {
        this.$Message.error('请完善创建信息')
      } else {
        this.managerInfo.companyRatio = +this.managerInfo.companyRatio
        this.isSending = true
        httpRequest("post",
          `${!this.$store.state.add.isEdit ? '/companyNew' : '/companyUpdate'}`,
          this.managerInfo,
          'game').then(() => {
          this.$store.commit('closeEditState')
          this.$router.push({
            name: "operatorList"
          });
          this.$store.commit({
            type: 'changeRefresh',
            data: true
          })
        }).finally(()=>{
          this.isSending = false
        })
      }
    },
    refresh () {
      this.managerInfo = {
        companyName: '', // 供应商名称
        companyIden: '', // 供应商标识
        companyDesc: '', // 供应商描述
        companyType: '', // 类型
        companyKey: '', // key
        companyRatio: '', // 成数
        remark: '', // 类型
        gameTypeList : [] // 游戏类别
      }
    }
  },
  watch: {
    '$route': function (_new, _old) {
      this.refresh()
      if((_new.name == 'addOperator') && this.$store.state.add.isEdit) {
        this.init()
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" type="text/less">
.p-addOperator{
  min-height: 88vh;
  .createform{
    width:30rem;
    margin: 0 auto;
  }
  .footer-btn{
    text-align: center;
  }
  .input{width: 100%;}
  .title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;}

}
</style>
