<template>
  <div id="tel_phone">
    <table></table>
    <form>
      <div>
        <div :style="note+userinfo.avatar+note2"></div>
      </div>
      <van-cell-group>
        <van-field v-model="mobile" label="手机号" clearable placeholder="请输入手机号"/>
        <van-field
          v-model="code"
          center
          clearable
          @input="animateWidth"
          label="验证码"
          placeholder="请输入短信验证码"
        >
          <van-button
            slot="button"
            size="small"
            :disabled="dis"
            @click.stop.prevent="getcode($event)"
            type="warning"
          >发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <van-button
        type="warning"
        id="toastBtn"
        class="surebtn"
        :disabled="dis2"
        @click.stop.prevent="bingding"
      >完成绑定</van-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: "",
      code: "",
      dis: false,
      dis2: true,
      msg: 60,
      uid: "",
      token: "",
      note: "width: 30%;margin: 15vw auto;background: url(",
      note2:
        ") no-repeat;background-size: 100% 100%;border-radius: 10px;padding-bottom: 30%;height: 0;",
      userinfo: {}
    };
  },

  created() {
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
    }
    if (this.$route.query.uid) {
      this.uid = this.$route.query.uid;
    }
    this.getinfo();
  },
  methods: {
    getinfo() {
      if (this.$route.query.token) {
        this.$axios
          .get("/wechat/mobile/personal?token=" + this.token)
          .then(res => {
            this.userinfo = res.data;
          });
      }
      if (this.$route.query.uid) {
        this.$axios.get("/wechat/mobile/simple-personal?uid=" + this.uid).then(res => {
          this.userinfo = res.data;
        });
      }
    },
    getcode(e) {
      let reg = /^1(3|4|5|7|8)\d{9}$/;
      if (!reg.test(this.mobile)) {
        this.$toast("手机号为空或错误！");
        return;
      } else {
        var self = this;
        if (this.$route.query.token) {
          this.$axios
            .get(
              "/wechat/mobile/sms-verify-code?token=" +
                this.token +
                "&mobile=" +
                this.mobile
            )
            .then(res => {
              console.log(res)
              if (res.data.msg == "发送成功") {
                this.dis = true;
                var t = setInterval(function() {
                  self.msg -= 1;
                  e.target.innerText = self.msg + "s后在发送";
                  if (self.msg == 0) {
                    clearInterval(t);
                    self.dis = false;
                    self.msg = 60;
                    e.target.innerText = "发送验证码";
                    return;
                  }
                }, 1000);
              } else {
                this.$toast(res.data.msg);
              }
            });
        }
        if (this.$route.query.uid) {
          this.$axios
            .get(
              "/wechat/mobile/sms-verify-code?uid=" +
                this.uid +
                "&mobile=" +
                this.mobile
            )
            .then(res => {
              console.log(res)

              if (res.data.msg == "发送成功") {
                this.dis = true;
                var t = setInterval(function() {
                  self.msg -= 1;
                  e.target.innerText = self.msg + "s后在发送";
                  if (self.msg == 0) {
                    clearInterval(t);
                    self.dis = false;
                    self.msg = 60;
                    e.target.innerText = "发送验证码";
                    return;
                  }
                }, 1000);
              } else {
                this.$toast(res.data.msg);
              }
            });
        }
      }
    },
    bingding() {
      let self = this;
      let data = new FormData();
      data.append("mobile", this.mobile);
      data.append("code", this.code);
      if(this.$route.query.token){
        this.$axios
        .post("/wechat/mobile/sms-verify-code?token=" + this.token, data)
        .then(res => {
          this.$toast(res.data.msg);
          setTimeout(function() {
            window.history.back(-1);
          }, 1000);
        });
      }
      if(this.$route.query.uid){
        this.$axios
        .post("/wechat/mobile/sms-verify-code?uid="+this.uid , data)
        .then(res => {
          this.$toast(res.data.msg);
          setTimeout(function() {
            window.history.back(-1);
          }, 1000);
        });
      }
      
    },
    animateWidth() {
      if (this.code.length == 4) {
        this.dis2 = false;
      } else if (this.code.length < 4 || this.code.length > 4) {
        this.dis2 = true;
      }
    }
  }
};
</script>

<style>
body,
html {
  height: 100%;
}
form {
  width: 100%;
  display: block;
  margin: 0 auto;
}
#tel_phone {
  height: 100%;
  background: #fafafa;
}
form div.tel_coupon {
  width: 30%;
  margin: 15vw auto;
  background: url("../../assets/uniacs.jpg") no-repeat;
  background-size: 100% 100%;
  border-radius: 50%;
  padding-bottom: 30%;
  height: 0;
}

form div img {
  width: 100%;
}

[v-cloak] {
  display: none;
}

#tel_phone .surebtn {
  margin-top: 4vw;
  border-radius: 10px;
}
</style>
