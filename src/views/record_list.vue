<template>
  <a-modal style="top:10px" title="使用记录" v-model="visible" @ok="visible=false" :maskClosable="false" :width="768">
    <a-table :columns="columns" :dataSource="data" bordered :pagination="false" size="small" :loading="loading">
      <template slot="member_id" slot-scope="text,record">
        <a href="#">{{record.member.mobile}}-{{record.member.name}}</a>
      </template>
      <template slot="status_cn" slot-scope="text,record">
        <a-popover title="流程时间" placement="rightTop">
          <template slot="content">
            <a-timeline>
              <a-timeline-item color="green" v-if="record.start_time">
                <a-icon slot="dot" type="clock-circle-o" />借出 {{record.start_time}}</a-timeline-item>
              <a-timeline-item color="green" v-if="record.end_time">
                <a-icon slot="dot" type="clock-circle-o" />归还 {{record.end_time}}</a-timeline-item>
              <a-timeline-item color="green" v-if="record.pay_time">
                <a-icon slot="dot" type="clock-circle-o" />支付 {{record.pay_time}}</a-timeline-item>
            </a-timeline>
          </template>
          <a-tag color="cyan" v-if="text=='已借出'">已借出</a-tag>
          <a-tag color="blue" v-if="text=='已归还'">已归还</a-tag>
          <a-tag color="green" v-if="text=='已支付'">已支付</a-tag>
          <a-tag color="red" v-if="text=='已丢失'">已丢失</a-tag>
        </a-popover>
      </template>
    </a-table>
    <a-pagination :defaultCurrent="1" v-if="last_page>1" :total="total" @change="onChangePage" style="margin-top:6px" />
  </a-modal>
</template>

<script>
const columns = [
  {
    title: '用户信息',
    key: 'member.mobile',
    dataIndex: 'member.mobile',
    scopedSlots: { customRender: 'member_id' }
  },

  // {
  //   key: 'start_time',
  //   title: '租出时间',
  //   width: 150,
  //   dataIndex: 'start_time'
  // },
  // {
  //   key: 'end_time',
  //   title: '结束时间',
  //   width: 150,
  //   dataIndex: 'end_time'
  // },
  // {
  //   key: 'pay_time',
  //   title: '支付时间',
  //   width: 150,
  //   dataIndex: 'pay_time'
  // },

  // {
  //   key: 'box.code',
  //   title: '机柜id',
  //   width: 150,
  //   dataIndex: 'box.code'
  // },
  // {
  //   key: 'charge.code',
  //   title: '充电宝id',
  //   width: 150,
  //   dataIndex: 'charge.code'
  // },
  {
    key: 'duration',
    title: '使用时长',
    dataIndex: 'duration'
  },
  {
    key: 'status_cn',
    title: '订单状态',
    dataIndex: 'status_cn',
    scopedSlots: { customRender: 'status_cn' }
  },
  {
    key: 'pay_amount',
    title: '支付金额',
    dataIndex: 'pay_amount'
  },
  // {
  //   key: '',
  //   title: '用户第几次租借',
  //   width: 150,
  //   dataIndex: ''
  // },
  {
    key: 'store.name',
    title: '商户',
    dataIndex: 'store.name'
  },
  {
    key: 'back_store.name',
    title: '归还商户',
    dataIndex: 'back_store.name'
  }
]

export default {
  name: 'record-list',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    chargeId: [String, Number],
    memberId: [String, Number],
    boxId: [String, Number]
  },
  data() {
    return {
      data: [],
      visible: false,
      columns,
      query: {
        page: 1,
        limit: 10
      },
      loading: false,
      total: 10,
      last_page: 0
    }
  },
  watch: {
    value: {
      handler(val) {
        this.visible = val
      },
      immediate: true
    },
    query: {
      handler() {
        this.getHistory()
      },
      deep: true,
      immediate: true
    },
    chargeId: {
      handler() {
        this.getHistory()
      },
      immediate: true
    },
    memberId: {
      handler() {
        this.getHistory()
      },
      immediate: true
    },
    boxId: {
      handler() {
        this.getHistory()
      },
      immediate: true
    },
    visible: {
      handler(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    async getHistory() {
      this.loading = true
      this.data = []
      let res = await this.$api.ORDER_LIST({
        ...this.query,
        charger_id: this.chargeId,
        member_id: this.memberId,
        box_id: this.boxId
      })
      this.loading = false
      this.data = res.data
      this.total = res.total
      this.last_page = res.last_page
    },
    onChangePage(page) {
      this.query.page = page
    }
  }
}
</script>

<style>
</style>
