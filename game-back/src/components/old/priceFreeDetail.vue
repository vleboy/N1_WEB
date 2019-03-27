<template>
    <div class="priceDetail">
        <price-count title="免费模式下大奖次数" num=1 />
        <price-count title="额度0.25—2.5" num=2 />
        <price-count title="额度5—50" num=3 />
        <price-count title="额度125—500" num=4 />
    </div>
</template>
<script>
import PriceCount from '@/components/PriceCount'
export default {
    data(){
        return{
            
        }
    },
    components:{PriceCount}
}
</script>
<style lang="less" scoped>

</style>
