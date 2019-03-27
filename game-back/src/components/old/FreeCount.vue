<template>
    <div class="freeCount">
            <p class="secTitle">{{title}}</p>
            <div class="freeCountContent">
                <div class="item">
                     <Timeline>
                        <TimelineItem color="blue"><span>占比：<span>20.14%</span></span></TimelineItem>
                        <TimelineItem color="green"><span>选择  <span>257840</span>次</span></TimelineItem>
                        <TimelineItem color="red">5次</TimelineItem>
                        <TimelineItem color="brown"><span>赔付奖金  <span>5784</span></span></TimelineItem>
                        <TimelineItem color="orange"><span>占比：<span>20.14%</span></span></TimelineItem>
                    </Timeline>
                </div>
                <div class="item">
                     <Timeline>
                        <TimelineItem color="blue"><span>占比：<span>20.14%</span></span></TimelineItem>
                        <TimelineItem color="green"><span>选择  <span>257840</span>次</span></TimelineItem>
                        <TimelineItem color="red">8次</TimelineItem>
                        <TimelineItem color="brown"><span>赔付奖金  <span>5784</span></span></TimelineItem>
                        <TimelineItem color="orange"><span>占比：<span>20.14%</span></span></TimelineItem>
                    </Timeline>
                </div>
                <div class="item">
                     <Timeline>
                        <TimelineItem color="blue"><span>占比：<span>20.14%</span></span></TimelineItem>
                        <TimelineItem color="green"><span>选择 <span>257840</span>次</span></TimelineItem>
                        <TimelineItem color="red">10次</TimelineItem>
                        <TimelineItem color="brown"><span>赔付奖金  <span>5784</span></span></TimelineItem>
                        <TimelineItem color="orange"><span>占比：<span>20.14%</span></span></TimelineItem>
                    </Timeline>
                </div>
                <div class="item">
                     <Timeline>
                        <TimelineItem color="blue"><span>占比：<span>20.14%</span></span></TimelineItem>
                        <TimelineItem color="green"><span>选择  <span>257840</span>次</span></TimelineItem>
                        <TimelineItem color="red">15次</TimelineItem>
                        <TimelineItem color="brown"><span>赔付奖金  <span>5784</span></span></TimelineItem>
                        <TimelineItem color="orange"><span>占比：<span>20.14%</span></span></TimelineItem>
                    </Timeline>
                </div>
                <div class="item">
                     <Timeline>
                        <TimelineItem color="blue"><span>占比：<span>20.14%</span></span></TimelineItem>
                        <TimelineItem color="green"><span>选择  <span>257840</span>次</span></TimelineItem>
                        <TimelineItem color="red">20次</TimelineItem>
                        <TimelineItem color="brown"><span>赔付奖金  <span>5784</span></span></TimelineItem>
                        <TimelineItem color="orange"><span>占比：<span>20.14%</span></span></TimelineItem>
                    </Timeline>
                </div>
            </div>
        </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
    data(){
        return{

        }
    },
    props:['title']
}
</script>
<style lang="less" scoped>
 .freeCount{
      .secTitle {
            line-height: 36px;
            font-weight: bold;
        }
      .freeCountContent{
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          .item{
              width: 18%;
              padding: 15px;
              font-size: 18px;
              font-weight: bold;
          }
      }
  }
</style>


