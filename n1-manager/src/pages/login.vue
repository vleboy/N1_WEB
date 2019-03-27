<template>
  <div class="login">
    <div class="login-left">
      <p class="title-big">NA线路商后台管理系统</p>
    </div>
    <div class="login-center"></div>
    <div class="login-right">
      <Form label-position="left" :label-width="80">
        <FormItem label="账号">
          <Row>
            <Col span="8">
            <Input v-model.trim="username" :maxlength='16'></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="密码">
          <Row>
            <Col span="8">
            <Input v-model.trim="password" type="password" :maxlength='16'></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="前缀">
          <Row>
            <Col span="8">
            <Input v-model.trim="suffix"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="验证">
          <Row>
            <Col span="8">
            <Input v-model="validate" style="width: 80px" :maxlength='4'></Input>
              <span class="getCode" v-if='showCode' @click="getCode">点击显示验证码</span>
              <img class="validateImg" v-else :src="codeSrc" @click="getCode" alt="oo">
               <Spin fix v-if='loadImg'>
             </Spin>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="8">
            <Button class="loginbtn" :loading="$store.state.login.loading" type="ghost" @click="login">
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
      username: "", // 用户名
      password: "", // 密码
      suffix:'',
       validate:'',
      showCode:true,
      codeSrc:'',
      loadImg:false
    };
  },
  watch: {},
  computed: {
    loading() {
      return this.$store.state.login.loading;
    }
  },
  created() {
  },
  mounted(){
    let suffix=this.$route.query.suffix
    let uname=this.$route.query.uname
    this.username=uname;
    this.suffix=suffix;
  },
  methods: {
    getCode(){
      if(!this.username){
        return this.$Message.warning('请填写账号')
      }
      if(!this.suffix){
        return this.$Message.warning('请填写前缀')
      }
      this.loadImg=true;
      httpRequest('post','/captcha',{
        relKey:`${this.suffix}_${this.username}`
      }).then(res=>{
        if(res.code==0){
          this.showCode=false;
          this.codeSrc='data:image/png;base64,'+res.payload
        }
      }).finally(()=>{
        this.loadImg=false
      })
    },
    login() {
      // let passReg = /^[a-zA-Z0-9@_#$%^&*!~-]{7,16}$/
      let nameReg = /^[a-zA-Z0-9@_-]{5,16}$/;
      if (!nameReg.test(this.username)) {
        this.$Message.warning({
          content: "用户名为5-16位的（英文、数字、@、_、-）"
        });
        return;
      }
      // if (!passReg.test(this.password)) {
      //   this.$Message.warning({ 
      //     content: "密码为8-16位的(英文、数字、符号)"
      //   });
      //   return;
      // }
      this.$store.commit("updateLoading", { params: true });
      let password = bcrypt.hashSync(this.password, 10);
      this.$store.dispatch("userlogin", {
        role: "10",
        username: this.username,
        password: password,
        suffix:this.suffix,
        captcha:this.validate,
        cb: () => {
          this.$store.commit("updateLoading", { params: false });
          this.$router.push({ name: "home" });
        },
        err: () => {
            this.showCode=true;
            this.validate=''
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
.validateImg{
   vertical-align: middle;
   padding-left: 10px
  }
.getCode {
 padding-left: 15px;
 cursor: pointer;
}
.loginbtn {
  width: 100%;
}
// .code-img {
//   width: 7.2rem;
//   height: 32px;
//   border: 1px solid #eee;
//   border-radius: 2px;
// }
// #vaptcha_container {
//   width: 100%;
//   .vaptcha-init-main {
//     display: table;
//     width: 100%;
//     height: 100%;
//     background-color: #eee;
//     .vaptcha-init-loading {
//       text-align: center;
//       display: table-cell;
//       vertical-align: middle;
//       img {
//         vertical-align: middle;
//       }
//     }
//   }
// }
</style>
