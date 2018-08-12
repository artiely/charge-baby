<template>
  <a-modal style="top:10px" title="使用记录" v-model="recordVisible" @ok="recordVisible=false" :maskClosable="false" :width="768">
    <a-table :columns="columns" :dataSource="data" bordered :pagination="false" size="small" :loading="loading">
      <template slot="name" slot-scope="text">
        <a href="#">{{text}}</a>
      </template>
    </a-table>
    <a-pagination :defaultCurrent="1" v-if="last_page>1" :total="total" @change="onChangePage" style="margin-top:6px" />
  </a-modal>
</template>

<script>
const columns = [
  {
    title: '用户信息',
    key: 'member_id',
    dataIndex: 'member_id',
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
  }
]

export default {
  name: 'record-list',
  props: {
    recordVisible: {
      type: Boolean,
      default: false
    },
    chargeId: [String, Number],
    memberId: [String, Number]
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
      charge_id: this.chargeId,
      member_id: this.memberId,
      total: 10,
      last_page: 0
    }
  },
  watch: {
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
    recordVisible: {
      handler(val) {
        this.$emit('update:recordVisible', val)
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
        member_id: this.memberId
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
