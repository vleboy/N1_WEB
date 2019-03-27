<template>
<div class="countDetail">
    <free-count title="免费模式次数选择"/>
    <free-count title="额度0.25—2.5"/>
    <free-count title="额度5—50"/>
    <free-count title="额度125—500"/>
</div>
</template>
<script>
import FreeCount from '@/components/FreeCount'
export default {
    name:'countDetail',
    components:{FreeCount},
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
.countDetail{
    min-height: 91vh;
}
</style>
