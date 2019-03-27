<template>
    <div class="rank">
        <profit-rank :profitRank="profitRank" @click.native="toDetail" :style="{'cursor':'pointer'}"/>
        <bet-amount :amoutRank="amoutRank" @click.native="toDetail" :style="{'cursor':'pointer'}"/>
        <game-count :countRank="countRank"  @click.native="toDetail" :style="{'cursor':'pointer'}"/>
    </div>
</template>
<script>
import ProfitRank from "@/components/rank/ProfitRank";
import GameCount from "@/components/rank/GameCount";
import BetAmount from "@/components/rank/BetAmount";
export default {
  components: { ProfitRank, BetAmount, GameCount },
  data() {
    return {
      amoutRank: [
        {
          name: "熊猫传奇",
          profit: 4356465
        },
        {
          name: "熊猫传奇",
          profit: 4356465
        },
        {
          name: "熊猫传奇",
          profit: 4356465
        },
      ],
      countRank: [
        {
          name: "熊猫传奇",
          profit: 4356465
        },
        {
          name: "熊猫传奇",
          profit: 4356465
        },
        {
          name: "熊猫传奇",
          profit: 4356465
        }
      ],
      profitRank:[
        {
          name: "熊猫传奇",
          profit: 4356465
        },
        {
          name: "熊猫传奇",
          profit: 4356465
        },
        {
          name: "熊猫传奇",
          profit: 4356465
        }
      ],
    };
  },
  methods:{
      toDetail(){
          this.$router.push({name:'rankDetail'})
      }
  },
};
</script>
<style lang="less" scoped>
.rank {
  width: 300px;
  min-width: 200px;
  max-width: 300px;
  flex: 0 0 300px;
  position: fixed;
  height: 100vh;
  right: 0px;
  top: 40px;
  overflow: auto;
}
</style>
