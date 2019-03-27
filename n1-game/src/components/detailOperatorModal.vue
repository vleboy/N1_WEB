<template>
  <div class="realLife_modal">
    <Row class="record-row">
      <Col :span="24" class="-row-title">供应商名称：{{detailInfo.companyName}}</Col>
    </Row>
    <Row class="record-row">
      <Col :span="8">供应商标识：{{detailInfo.companyIden}}</Col>
      <Col :span="16" class="-row-left">供应商ID：{{detailInfo.companyId}}</Col>
    </Row>
    <Row class="record-row">
      <Col :span="8">供应商描述：{{detailInfo.companyDesc == 'NULL!' ? '暂无' : detailInfo.companyDesc}}</Col>
      <Col :span="16" class="-row-left">供应商接入类型：{{companyTypeArray[detailInfo.companyType-1]}}</Col>
    </Row>
    <Row class="record-row">
      <Col :span="8">接入分成比：{{detailInfo.companyRatio || 0}}%</Col>
      <Col :span="16" class="-row-left">供应商密钥：{{isShow ? detailInfo.companyKey : '*********'}}
      <Button @click="isShow=!isShow" type="text" style="color:#2d8cf0">{{isShow ? '关闭' : '显示'}}</Button>
      </Col>
    </Row>
    <Row class="record-row">
      <Col :span="24">备注：{{detailInfo.remark == 'NULL!' ? '暂无' : detailInfo.remark}}</Col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
  import dayjs from "dayjs";

export default {
  name: 'detailModal',
  props:['dataProp'],
  data () {
    return {
      isShow: false,
      companyTypeArray:['A类（接入公司的游戏供应商）','B类（公司接入的游戏供应商）']
    }
  },
  computed: {
    detailInfo () {
      return this.dataProp
    }
  },
  methods:{
    formatterTime (row) {
      return dayjs(row).format("YYYY-MM-DD HH:mm:ss")
    } // 格式化创建时间
  }
}
</script>

<style scoped lang="less" type="text/less">

  .realLife_modal{

    .-row-title {
      font-size: 18px;
      font-weight: bold;
    }
    .record-row {
      padding: 20px;
      padding-left: 50px;
      text-align: left;
    }
    .-row-left {
      white-space: normal;
      word-wrap: break-word;
      word-break: break-all;
      padding-left: 100px;
    }
  }
</style>
