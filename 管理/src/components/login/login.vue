<template>
  <div class="login">
    <el-form
      :label-position="labelPosition"
      :model="logininfo"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <div class="img"><img src="../../assets/logo.png" alt="" /></div>
      <el-form-item prop="name">
        <el-input
          v-model="logininfo.name"
          prefix-icon="el-icon-user"
          placeholder="请输入手机号 / 邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          v-model="logininfo.pwd"
          show-password
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button class="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from "../../repuire/index.js";
export default {
  data() {
    return {
      labelPosition: "right",
      logininfo: {
        name: "admin",
        pwd: "123456",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.logininfo.name, this.logininfo.pwd);
        if (valid) {
          this.axios
            .post("api/login", {
              username: this.logininfo.name,
              password: this.logininfo.pwd,
            })
            .then((res) => {
              console.log(res);
              window.sessionStorage.setItem("token", res.data.token);
              window.sessionStorage.setItem("user", res.data.username);
              if (res.data.token === undefined) {
                this.$message({
                  message: "帐号密码错误",
                  type: "error",
                  duration: 1000,
                  customClass: "msg",
                });
                setTimeout(() => {
                  sessionStorage.clear();
                });
              } else {
                this.$message({
                  message: "恭喜你，登录成功",
                  type: "success",
                  duration: 1000,
                  customClass: "msg",
                  onClose: () => {
                    this.$router.push("/index");
                  },
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    zc() {
      this.$router.push("/register");
    },
  },
};
</script>
<style lang="less" scoped>
html,
body {
  background-color: rgb(43, 75, 107);
}
.login {
  // width: 100vh;
  height: 100vh;
  background-color: rgb(43, 75, 107);
}
.demo-ruleForm {
  width: 450px;
  background-color: #fff;
  padding: 150px 50px 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.demo-ruleForm > .img {
  background-color: rgb(238, 238, 238);
  border-radius: 50%;
  width: 180px;
  height: 180px;
  position: absolute;
  top: -90px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 1px 15px rgba(255, 255, 255, 1) inset;
}
.demo-ruleForm > .img > img {
  width: 120px;
}
.btn {
  position: absolute;
  right: 0;
  .reset {
    background-color: #999;
    color: white;
  }
}
</style>
