<template>
    <div class="login">
        <p class="secTitle">玩家登陆次数</p>
        <div class="content">
            <p class="logincount">目前登陆次数：{{loginCount}}次</p>
            <ul>
                <li>
                    <span class="word">昨日登陆</span>
                    <span class="circle1">5875次</span>
                    <span class="line"></span>
                    <span class="circle2">68.7%</span>
                    <span class="stay">留存</span>
                </li>
                <li>
                    <span class="word">3日登陆</span>
                    &nbsp;&nbsp;
                    <span class="circle1">5875次</span>
                    <span class="line"></span>
                    <span class="circle2">68.7%</span>
                    <span class="stay">留存</span>
                </li>
                <li>
                    <span class="word">7日登陆</span>
                    <span class="circle1">5875次</span>
                    <span class="line"></span>
                    <span class="circle2">68.7%</span>
                    <span class="stay">留存</span>
                </li>
                <li>
                    <span class="word">30日登陆</span>
                    <span class="circle1">5875次</span>
                    <span class="line"></span>
                    <span class="circle2">68.7%</span>
                    <span class="stay">留存</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      loginCount: 22
    };
  }
};
</script>
<style lang="less" scoped>
.login {
  .content {
    background-color: #fff;
    min-height: 90vh;
    .logincount {
      font-size: 16px;
      font-weight: bold;
      color: red;
      text-align: center;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 48%;
        margin: 10px;
        list-style: none;
      }
    }
    .word {
      margin-left: 20px;
    }
    .circle1 {
      border: 2px solid #ff9900;
      display: inline-block;
      background-color: #fff;
      width: 120px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 50%;
    }
    .line {
      display: inline-block;
      width: 50px;
      height: 2px;
      position: relative;
      top: -5px;
      background-color: #6699ff;
    }
    .circle2 {
      border: 2px solid #ff9900;
      display: inline-block;
      background-color: #fff;
      width: 80px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 50%;
    }
    .stay {
      color: #66ccff;
    }
  }
}
</style>


