<template>
    <div class="rateDetail">
        <hit-rate title="游戏命中率" />
        <hit-rate title="额度0.25-2.5" />
        <hit-rate title="额度5-50" />
        <hit-rate title="额度125-500" />
    </div>
</template>
<script>
import HitRate from '@/components/HitRate'
export default {
    name:'rateDetail',
    components:{HitRate},
    data(){
        return{

        }
    },
    computed:{

    },
    watch:{

    },
    created(){

    },
    methods:{

    }
}
</script>
<style lang="less" scoped>

</style>

