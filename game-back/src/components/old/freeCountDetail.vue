<template>
    <div class="freeDetail">
        <div class="sumary">
            <p class="secTitle">免费模式次数与赔付</p>
            <div class="freeContent">
                <div class="left">
                    <div class="amount">
                        <p>
                            <span class="bigFont">历史次数</span>
                            <span class="datas">
                                <Icon type="pricetag"></Icon> 5,451</span>
                        </p>
                        <p>
                            <span class="bigFont">今日次数</span>
                            <span class="datas">
                                <Icon type="pricetag"></Icon> 5,451</span>
                        </p>
                    </div>
                    <div class="circle">
                        <i-circle :percent="80" :size=100 stroke-color="#54DA54" class="circles">
                            <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                        </i-circle>
                        <p>占比</p>
                    </div>
                </div>
                <div class="right">
                    <div class="amount">
                        <p>
                            <span class="bigFont">赔付额度</span>
                            <span class="datas">
                                <Icon type="social-yen"></Icon> 5,451</span>
                        </p>
                        <p>
                            <span class="bigFont">赔付额度</span>
                            <span class="datas">
                                <Icon type="social-yen"></Icon> 5,451</span>
                        </p>
                    </div>
                    <div class="circle">
                        <i-circle :percent="80" :size=100 stroke-color="#54DA54" class="circles">
                            <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                        </i-circle>
                        <p>占比</p>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
       <count-pay title="额度0.25-2.5" :num="[1,2]"/>
       <count-pay title="额度5-50" :num="[3,4]"/>
       <count-pay title="额度125-500" :num="[5,6]"/>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
import CountPay from '@/components/CountPay'
export default {
  data() {
    return {};
  },
  components:{CountPay}
};
</script>
<style lang="less" scoped>
.freeDetail {
    .secTitle{
        line-height: 36px;
        font-size: 14px;
        font-weight: bold;
    }
  .freeContent {
    background-color: #fff;
    .left {
      width: 50%;
      border-right: 1px solid #000;
      float: left;
    }
    .right {
      float: left;
      width: 49%;
    }
    .clear {
      clear: both;
    }
    .amount {
      float: left;
      p {
        text-indent: 2em;
        line-height: 70px;
      }
      .bigFont {
        font-size: 18px;
        font-weight: bold;
      }
      .datas {
        border-bottom: 1px solid #3366ff;
        margin-left: 20px;
      }
    }
    .circle {
      float: right;
      padding-right: 50px;
      .circles {
        padding-top: 10px;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>

