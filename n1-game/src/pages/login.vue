<template>
  <div class="login">
    <div class="login-left">
      <p class="title-big">NA游戏管理系统</p>
    </div>
    <div class="login-center"></div>
    <div class="login-right">
      <Form label-position="left" :label-width="80">
        <FormItem label="账号">
          <Row>
            <Col span="8">
            <Input v-model="username" :maxlength='16'></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="密码">
          <Row>
            <Col span="8">
            <Input v-model="password" type="password" :maxlength='16'></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="验证">
          <Row>
            <Col span="8">
             <Input v-model="validate" style="width: 80px" :maxlength='4'></Input>
              <span class="getCode" v-if='showCode' @click="getCode">点击显示验证码</span>
              <img class="validateImg" v-else :src="codeSrc" alt="oo" @click="getCode">
              <Spin fix v-if='loadImg'>
             </Spin>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="8">
            <Button class="loginbtn" :loading="$store.state.loading" type="default" @click="login">
              <span v-if="!loading">登录</span>
              <span v-else>Loading...</span>
            </Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";
import { httpRequest } from "@/service/index";
export default {
  data() {
    return {
      role: "1",
      username: "", // 用户名
      password: "", // 密码
      validate:'',
      showCode:true,
      codeSrc:'',
      loadImg:false
    };
  },
  watch: {},
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  created() {
    // this.initVaptcha();
  },
  methods: {
       getCode(){
      if(!this.username){
        return this.$Message.warning('请填写账号')
      }
      this.loadImg=true;
      httpRequest('post','/captcha',{
        relKey:`PLAT_${this.username}`
      },'admin').then(res=>{
        if(res.code==0){
          this.showCode=false;
          this.codeSrc='data:image/png;base64,'+res.payload
        }
      }).finally(()=>{
        this.loadImg=false;
      })
    },
    login() {
      // let passReg = /^[a-zA-Z0-9@_#$%^&*!~-]{8,16}$/;
      let nameReg = /^[a-zA-Z0-9@_-]{5,16}$/;
      let self = this;
      if (!nameReg.test(this.username)) {
        this.$Message.warning({
          content: "用户名为5-16位的（英文、数字、@、_、-）"
        });
        return;
      }
      if (!this.validate) {
        return this.$Message.warning('请填写验证码');
        ;
      }
      // if (!passReg.test(this.password)) {
      //   this.$Message.warning({
      //     content: "密码为8-16位的(英文、数字、符号)"
      //   }); 
      //   return;
      // }
      this.$store.commit("globalLoading", { params: true });
      let password = bcrypt.hashSync(this.password, 10);
      this.$store.dispatch("userlogin", {
        role: "1",
        username: this.username,
        password: password,
        captcha:this.validate,
        cb: () => {
          this.$store.commit("globalLoading", { params: false });
          this.$router.push({ name: "home" });
        },
        err: () => {
         this.validate=''
         this.showCode=true;
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .login-left {
    flex: 0.45;
    text-align: right;
  }
  .validateImg{
   vertical-align: middle;
   padding-left: 10px
  }
  .login-center {
    flex: 0.1;
    text-align: center;
  }
  .login-right {
    flex: 0.45;
    text-align: left;
  }
}
/**/
.title-big {
  font-size: 3rem;
}
.getCode {
 padding-left: 15px;
 cursor: pointer;
}
.loginbtn {
  width: 100%;
}
</style>
