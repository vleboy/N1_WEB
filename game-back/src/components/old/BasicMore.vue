<template>
    <div class="more">
       <login-count :style="{'cursor':'pointer'}"/>
        <hit-rate title="游戏命中率" @click.native="goRateDetail" :style="{'cursor':'pointer'}"/>
        <div class="free" @click="goFreeDetail" :style="{'cursor':'pointer'}">
            <p class="secTitle">免费模式次数与赔付</p>
            <div class="freeContent">
                <div class="left">
                    <div class="amount">
                        <p><span class="bigFont">历史次数</span><span class="datas"><Icon type="pricetag"></Icon> 5,451</span></p>
                        <p><span class="bigFont">今日次数</span><span class="datas"><Icon type="pricetag"></Icon> 5,451</span></p>
                    </div>
                    <div class="circle">
                        <i-circle :percent="80" :size=100 stroke-color="#54DA54">
                        <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                        </i-circle>
                        <p>占比</p>
                    </div>
                </div>
                <div class="right">
                    <div class="amount">
                        <p><span class="bigFont">赔付额度</span><span class="datas"><Icon type="social-yen"></Icon> 5,451</span></p>
                        <p><span class="bigFont">赔付额度</span><span class="datas"><Icon type="social-yen"></Icon> 5,451</span></p>
                    </div>
                    <div class="circle">
                        <i-circle :percent="80" :size=100 stroke-color="#54DA54">
                        <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                        </i-circle>
                        <p>占比</p>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <price-count title="免费模式下大奖次数" num=1 @click.native="goPriceDetail('priceFreeDetail')" :style="{'cursor':'pointer'}"/>
        <price-count title="普通模式下大奖次数" num=2 @click.native="goPriceDetail('priceNormalDetail')" :style="{'cursor':'pointer'}"/>
        <free-count title="免费模式次数选择" @click.native="goCountDetail" :style="{'cursor':'pointer'}"/>
    </div>
</template>
<script>
import HitRate from '@/components/HitRate'
import PriceCount from '@/components/PriceCount'
import FreeCount from '@/components/FreeCount'
import LoginCount from '@/components/LoginCount'
import { thousandFormatter } from "@/config/format";
export default {
  data() {
    return {

    };
  },
  mounted(){
     
  },
  components:{HitRate,PriceCount,FreeCount,LoginCount},
  methods:{
      goLogin(){
          this.$router.push({name:'loginDetail'})
      },
      goPriceDetail(name){
          this.$router.push({name:name})
      },
      goRateDetail(){
          this.$router.push({name:'rateDetail'})
      },
      goFreeDetail(){
          this.$router.push({name:'freeDetail'})
      },
      goCountDetail(){
          this.$router.push({name:'countDetail'})
      }
  },
  
};
</script>
<style lang="less" scoped>
.more {
  .secTitle {
    line-height: 36px;
    font-weight: bold;
  }
  .free{
      .freeContent{
          background-color: #fff;
          .left{
              width: 50%;
              border-right: 1px solid #000;
              float: left;
          }
          .right{
              float: left;
              width: 49%;
          }
          .clear{
              clear: both;
          }
          .amount{
              float: left;
              p{
                  text-indent: 2em;
                  line-height: 70px;
              }
              .bigFont{
                  font-size: 18px;
                  font-weight: bold;
              }
              .datas{
                  border-bottom: 1px solid #3366FF;
                  margin-left: 20px;
              }
          }
          .circle{
              float: right;
              padding-right: 50px;
              padding-top: 10px;
              p{
                  text-align: center;
              }
          }
      }
  }
  
}
</style>

