<template>
    <div class="login">
        <Row type="flex" @keydown.enter.native="submitRegister">
            <Col style="width: 368px">
            <Header />
            <!-- <Col offset="20" style="color:red;"><div @click="$router.push('signUp')">立即注册</div></Col> -->
            <Row style="flex-direction: column;">
                <Form ref="usernameLoginForm" :model="form" :rules="rules" class="form">
                    <FormItem prop="username" label="供应商账号">
                        <Input v-model="form.username" prefix="ios-contact" size="large" clearable placeholder="请输入用户名"
                            autocomplete="off" />
                    </FormItem>
                    <FormItem prop="password" label="供应商密码">
                        <Input type="password" v-model="form.password" prefix="ios-lock" size="large" password
                            placeholder="请输入密码" autocomplete="off" />
                    </FormItem>
                    <FormItem prop="repassword" label="确认密码">
                        <Input type="password" prefix="ios-lock" v-model="form.repassword" size="large" password
                            placeholder="请再次输入密码" autocomplete="off" />
                    </FormItem>
                    <!-- <FormItem prop="mobile" label="手机号">
                        <Input type="number" v-model="form.mobile" prefix="ios-lock" size="large" password
                            placeholder="请输入手机号" autocomplete="off" />
                    </FormItem> -->
                </Form>
                <Row>
                    <div class="login-btn" type="primary" size="large" :loading="loading" @click="submitRegister" long>
                        <span v-if="!loading">注册</span>
                        <span v-else>注册中</span>
                    </div>
                </Row>

            </Row>
            <Footer />
            </Col>
        </Row>


    </div>
</template>
  
<script>
import Header from "@/views/main-components/header";
import Footer from "@/views/main-components/footer";
import { userRegister } from "@/api/index";
import { Message } from "view-design";

export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            saveLogin: true, // 保存登录状态
            loading: false, // 加载状态
            // repassword: '',
            form: {
                // 表单数据
                username: "",
                password: "",
                repassword: "",
                // mobile: ""
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
                repassword: [
                    {required: true, trigger: 'blur', message: '确认密码不能为空'},
                    {validator:(rule, value, cb) => {
                        console.log(value, this.form.password);
                        if(value !== this.form.password){
                            cb(new Error('两次密码不一致'))
                        }else cb();
                    }, trigger: 'blur'}
                ],
                // mobile: [
                //     {
                //         required: true,
                //         message: "手机号不能为空",
                //         trigger: "blur"
                //     }
                // ]
            },
        };
    },
    methods: {
        submitRegister() {
            // 提交
            this.$refs.usernameLoginForm.validate((valid) => {
                if (valid) {
                    let fd = new FormData();
                    fd.append('username', this.form.username);
                    fd.append('password', this.md5(this.form.password));
                    fd.append("mobile", this.form.mobile);
                    userRegister(fd).then(e => {
                        if(e && e.success){
                            Message.success("注册成功");
                            this.$router.push('login');
                        }
                    })
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
  