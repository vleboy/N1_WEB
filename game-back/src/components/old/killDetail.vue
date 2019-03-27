<template>
    <div class="killDetail">
        <game-kills title='游戏杀数' date="历史" num=1 />
        <game-kills title='游戏杀数—本月' date="本月" num=2 />
        <game-kills title='游戏杀数—上月' date="上月" num=3 />
    </div>
</template>
<script>
import GameKills from '@/components/GameKills'
export default {
    data(){
        return{

        }
    },
    components:{GameKills},

}
</script>
<style lang="less" scoped>
.killDetail{
    min-height: 91vh;
}
</style>
