<template>
  <div>
    <a-card>
      222222222222222222222222
      <!-- cardlist -->
      <!-- <div v-for="item in data">
        <a-row>
          <a-col :xs="24" :sm="12" :md="6" :lg="6" :xl="4">
            <div class="user-info">
              <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> {{item.member.name}} {{item.member.mobile}}
            </div>
          </a-col>
          <a-col :xs="24" :sm="12" :md="6" :lg="6" :xl="4">
            <div>
              <div>
                <a-icon type="database" /> {{item.box.code}}
              </div>
              <div>
                <a-icon type="hdd" />{{item.charger.code}}
              </div>
            </div>
          </a-col>
          <a-col :xs="24" :sm="12" :md="6" :lg="6" :xl="4">
            <a-timeline pending="等待支付..." v-if="!item.pay_time">
              <a-timeline-item v-if="item.start_time">借出 {{item.start_time}}</a-timeline-item>
              <a-timeline-item v-if="item.end_time">归还 {{item.end_time}}</a-timeline-item>
              <a-timeline-item v-if="item.pay_time">支付 {{item.pay_time}}</a-timeline-item>
            </a-timeline>
          </a-col>

        </a-row>
        <a-divider />
      </div> -->
    </a-card>

  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {},
  created() {
    let path = this.$route.path
    console.log(path.split('/'))
  }
}
</script>
