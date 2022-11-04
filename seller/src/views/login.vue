<template>
  <div class="login">
    <Row type="flex" @keydown.enter.native="submitLogin">
      <Col style="width: 368px">
      <Header />
      <Col offset="20" style="color:red;">
      <div @click="$router.push('register')">立即注册</div>
      </Col>
      <Row style="flex-direction: column;">
        <Form ref="usernameLoginForm" :model="form" :rules="rules" class="form">
          <FormItem prop="username" label="采购方账号">
            <Input v-model="form.username" prefix="ios-contact" size="large" clearable placeholder="请输入用户名"
              autocomplete="off" />
          </FormItem>
          <FormItem prop="password" label="采购方密码">
            <Input type="password" v-model="form.password" prefix="ios-lock" size="large" password placeholder="请输入密码"
              autocomplete="off" />
          </FormItem>
        </Form>
        <Row>
          <div class="login-btn" type="primary" size="large" :loading="loading" @click="submitLogin" long>
            <span v-if="!loading">登录</span>
            <span v-else>登录中</span>
          </div>
        </Row>
      </Row>
      <Footer />
      </Col>
    </Row>




  </div>
</template>

<script>
import { login, userMsg,testlogin} from "@/api/index";
import Cookies from "js-cookie";
import Header from "@/views/main-components/header";
import Footer from "@/views/main-components/footer";
import util from "@/libs/util.js";
import * as Code from "@/api/statusCode";
export default {
  components: {
    Header,
    Footer,


  },
  data() {
    return {
      newform:{
        username:'',
        password:''
      },
      saveLogin: true, // 保存登录状态
      loading: false, // 加载状态
      form: {
        // 表单数据
        username: "",
        password: "",
        mobile: "",
        code: "",
      },
      rules: {
        // 验证规则
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    afterLogin(res) {
      let accessToken = res.result.accessToken;
      this.setStore("accessToken", accessToken);
      this.setStore("refreshToken", res.result.refreshToken);
      console.log("access",accessToken)

      // 获取用户信息
      userMsg().then((res) => {
        if (res.success) {
          this.setStore("saveLogin", this.saveLogin);
          if (this.saveLogin) {
            // 保存7天
            Cookies.set("userInfoSeller", JSON.stringify(res.result), {
              expires: 7,
            });
          } else {
            Cookies.set("userInfoSeller", JSON.stringify(res.result));
          }
          this.$store.commit("setAvatarPath", res.result.storeLogo);
          // 加载菜单
          util.initRouter(this);
          this.$router.push({
            name: "home_index",
          });
        } else {
          this.loading = false;
        }
      });
    },
    handleErrCode(code) {
      switch (code) {
        case Code.USER_NOT_EXIST:
          this.$router.push('register');
          break;
        case Code.STORE_NOT_OPEN:
          // 跳转到店铺开通页面 signup
          this.setStore("username", this.form.username);
          this.setStore("password", this.form.password);
          this.$router.push("signUp");
          break;
        case Code.STORE_CLOSE_ERROR:
          break;
        case Code.STORE_FIRST_STEP:
          // 店铺正在审核
          this.setStore("username", this.form.username);
          this.setStore("password", this.form.password);
          // 跳转到signUp第一页
          this.$router.push({
            path: 'signUp',
            query: {
              current: 0
            }
          });
          break;
        case Code.STORE_SECOND_STEP:
          // 店铺正在审核
          this.setStore("username", this.form.username);
          this.setStore("password", this.form.password);
          // 跳转到signUp第二页
          this.$router.push({
            path: 'signUp',
            query: {
              current: 1
            }
          });
          break;
        case Code.STORE_ON_APPLYING:
          // 店铺正在审核
          this.setStore("username", this.form.username);
          this.setStore("password", this.form.password);
          // 跳转到signUp第三页
          this.$router.push({
            path: 'signUp',
            query: {
              current: 2
            }
          });
          break;
        case Code.STORE_REFUSED:
          // 店铺审核不通过
          this.setStore("username", this.form.username);
          this.setStore("password", this.form.password);
          // 跳转到店铺开通页面 signup
          this.$router.push("signUp");
          break;
      }
    },
    submitLogin() {
      // 登录提交
      this.$refs.usernameLoginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let fd = new FormData();
          fd.append('username', this.form.username);
          fd.append('password', this.md5(this.form.password));
          login(fd)
            .then((res) => {
              this.loading = false;
              console.log(res);
              if (!res) return;
              if (res.success) {
                this.afterLogin(res);
              }
              else this.handleErrCode(res.code);
              //  else if (res.code === Code.USER_NOT_EXIST) {
              //   this.$router.push('register');
              // } else if (res.code === Code.STORE_NOT_OPEN) {
              //   // 跳转到店铺开通页面 signup
              //   this.setStore("username", this.form.username);
              //   this.setStore("password", this.form.password);
              //   this.$router.push("signUp");

              // } else if (res.code === Code.STORE_CLOSE_ERROR) {
              //   // 店铺被关闭
              // } else if (res.code === Code.STORE_ON_APPLYING) {
              //   // 店铺正在审核
              //   this.setStore("username", this.form.username);
              //   this.setStore("password", this.form.password);
              //   // 跳转到signUp第三页
              //   this.$router.push({
              //     path: 'signUp',
              //     query: {
              //       current: 2
              //     }
              //   });
              // } else if (res.code === STORE_REFUSED) {
              //   // 店铺审核不通过
              //   this.setStore("username", this.form.username);
              //   this.setStore("password", this.form.password);
              //   // 跳转到店铺开通页面 signup
              //   this.$router.push("signUp");
              // }

            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  background: url("../assets/background.png") no-repeat;
  background-size: 100%;
  background-position-y: bottom;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;



  .verify-con {
    position: absolute;
    top: 126px;
    z-index: 10;
    left: 20px;
  }

  .form {
    padding-top: 1vh;
  }

  .login-btn {
    background: linear-gradient(135deg, $theme_color 0%, $warning_color 100%);
    height: 40px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;
    width: 100%;
    text-align: center;
    transition: 0.35s;
  }

  .login-btn:hover {
    opacity: .9;
    border-radius: 10px;
  }
}
</style>
