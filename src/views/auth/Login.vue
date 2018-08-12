<template>
  <div class="v-bg">
    <a-modal title="登录" v-model="centerDialogVisible" width="400px" style="width:300px!important" :maskClosable="false" center :show-close="false" :modal="false" :closable="false" class="login-modal">
      <a-form :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" label='邮箱' fieldDecoratorId="email" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入邮箱地址'}],initialValue:email}">
          <a-input placeholder='请输入邮箱地址' />
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol" label='密码' fieldDecoratorId="password" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }],initialValue:password}">
          <a-input placeholder='请输入密码' type="password" />
        </a-form-item>
        <a-form-item :labelCol="formTailLayout.labelCol" :wrapperCol="formTailLayout.wrapperCol" style="margin-bottom:0">
          <a-checkbox v-model="memory" @change="memory!=memory">
            记住密码
          </a-checkbox>
        </a-form-item>
      </a-form>
      <div slot="footer">
        <a-button type='primary' @click="check" style="width:100%" size="large" :loading="loading">登录</a-button>
      </div>
    </a-modal>
    <div id="particles-js"></div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}
const formTailLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18, offset: 6 }
}
export default {
  data() {
    return {
      memory: true,
      formItemLayout,
      formTailLayout,
      centerDialogVisible: true,
      loading: false,
      email: 'admin@admin.com',
      password: 'admin'
    }
  },
  computed: {
    menu() {
      return this.$store.state.sys.menu
    }
  },
  methods: {
    check() {
      this.form.validateFields(async(err, vals) => {
        if (!err) {
          this.loading = true
          let res = await this.$api.LOGIN(vals)
          if (res.status !== 'error') {
            Cookies.set('access_token', res.access_token)
            this.$router.replace('/store_list')
            let userInfo = await this.$api.USER_INFO()
            console.log('userinfo', userInfo)
            this.$store.commit('USER_INFO', userInfo)
          }
          this.loading = false
        }
      })
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      console.log('关闭loading')
      this.loading = false
    },
    _animateBg() {
      /* global particlesJS */
      particlesJS('particles-js', {
        particles: {
          number: { value: 400, density: { enable: true, value_area: 800 } },
          color: { value: '#fff' },
          shape: {
            type: 'circle',
            stroke: { width: 0, color: '#000000' },
            polygon: { nb_sides: 5 },
            image: { src: 'img/github.svg', width: 100, height: 100 }
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 10,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: false,
            distance: 500,
            color: '#ffffff',
            opacity: 0.4,
            width: 2
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'bottom',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'repulse' },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 0.5 } },
            bubble: {
              distance: 400,
              size: 4,
              duration: 0.3,
              opacity: 1,
              speed: 3
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      })
    }
  },
  mounted() {
    this._animateBg()
  }
}
</script>
<style lang="less">
.v-bg {
  height: 100%;
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url('../../assets/fullstack.jpg');
}
.login-modal {
  .ant-modal-body {
    padding-bottom: 0 !important;
  }
}
canvas {
  display: block;
  /* vertical-align: bottom; */
} /* ---- particles.js container ---- */
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: none;
  background-image: url('');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
} /* ---- stats.js ---- */
.count-particles {
  background: #000022;
  position: absolute;
  top: 48px;
  left: 0;
  width: 80px;
  color: #13e8e9;
  font-size: 0.8em;
  text-align: left;
  text-indent: 4px;
  line-height: 14px;
  padding-bottom: 2px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
}
.js-count-particles {
  font-size: 1.1em;
}
#stats,
.count-particles {
  -webkit-user-select: none;
  margin-top: 5px;
  margin-left: 5px;
}
#stats {
  border-radius: 3px 3px 0 0;
  overflow: hidden;
}
.count-particles {
  border-radius: 0 0 3px 3px;
}
</style>
