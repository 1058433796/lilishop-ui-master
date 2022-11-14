<template>
  <div class="login">
    <Row type="flex" @keydown.enter.native="submitLogin">
      <Col style="width: 368px">
        <Header />
        <Col offset="20" style="color: red">
          <div @click="$router.push('register')">立即注册</div>
        </Col>
        <Row style="flex-direction: column">
          <Form
            ref="usernameLoginForm"
            :model="form"
            :rules="rules"
            class="form"
          >
            <FormItem prop="username" label="采购方账号">
              <Input
                v-model="form.username"
                prefix="ios-contact"
                size="large"
                clearable
                placeholder="请输入用户名"
                autocomplete="off"
              />
            </FormItem>
            <FormItem prop="password" label="采购方密码">
              <Input
                type="password"
                v-model="form.password"
                prefix="ios-lock"
                size="large"
                password
                placeholder="请输入密码"
                autocomplete="off"
              />
            </FormItem>
          </Form>
          <Row>
            <div
              class="login-btn"
              type="primary"
              size="large"
              :loading="loading"
              @click="submitLogin"
              long
            >
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
import { login, userMsg } from "@/api/index";
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
          this.$store.commit("setAvatarPath", res.result.face);
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
          this.$router.push("register");
          break;
      }
    },
    submitLogin() {
      // 登录提交
      this.$refs.usernameLoginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.handleLogin(this.form.username, this.form.password);
        }
      });
    },
    // 登录
    handleLogin(username, password) {
      let fd = new FormData();
      fd.append("username", username);
      fd.append("password", this.md5(password));
      login(fd)
        .then((res) => {
          this.loading = false;
          console.log(res);
          if (!res) {
            // this.goToLoginPage("服务器繁忙");
            return;
          }
          if (res.success) {
            this.afterLogin(res);
          } else {
            this.handleErrCode(res.code);
            // this.goToLoginPage(res.message);
          }
        })
        .catch(() => {
          // this.goToLoginPage("服务器繁忙");
          this.loading = false;
        });
    },
    goToLoginPage(message) {
      window.location.href = BASE.WEB_URL.seller + `/login?message=${message}`;
    },
  },
  created() {
    const query = this.$route.query;
    if (query && query.username && query.password) {
      this.handleLogin(query.username, query.password);
    } 
    // else {
    //   this.goToLoginPage();
    // }
  },

  mounted() {},
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
    opacity: 0.9;
    border-radius: 10px;
  }
}
</style>
