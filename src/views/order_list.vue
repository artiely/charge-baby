<template>
  <div>
    <a-card :loading="preLoading">
      <template slot="title">
        <a-input-search placeholder="商户名/用户名/手机号/机柜id/充电宝id" v-model="search" enterButton style="width:400px" />
        <a-range-picker @change="timeChange" format="YYYY-MM-DD" class="pull-right" />
      </template>

      <!-- table  -->
      <a-table :columns="columns" size="middle" :dataSource="data" :pagination="false" :loading="loading" @change="handleTableChange" :scroll="{ x: 1300 }">
        <template slot="member_id" slot-scope="text,record">
          <a href="#">{{record.member.mobile}} - {{record.member.name}}</a>
        </template>
        <template slot="status_cn" slot-scope="text,record">
          <a-tag color="cyan" v-if="text=='已借出'">已借出</a-tag>
          <a-tag color="blue" v-if="text=='已归还'">已归还</a-tag>
          <a-tag color="green" v-if="text=='已支付'">已支付</a-tag>
          <a-tag color="red" v-if="text=='已丢失'">已丢失</a-tag>
          <!-- <a href="#">{{record.member.mobile}} - {{record.member.name}}</a> -->
        </template>
        <template slot="operation" slot-scope="text, record">
          <!-- <a @click="edit(record)">编辑</a> -->
          <a @click="detail(record)">详情</a>
        </template>
      </a-table>
      <a-pagination :defaultCurrent="1" v-if="last_page>1" :total="total" @change="onChange" style="margin-top:6px" />
    </a-card>

    <!-- detail -->
    <a-modal v-if="row" :title="`${row.member.mobile}-${row.member.name}`" style="top: 20px" :visible="detailVisible" :width="768" @ok="() => detailVisible = false" @cancel="() => detailVisible = false">
      <template>
        <a-steps :current="currentStatus" status="process">
          <a-step title="租出" :description="row.start_time" />
          <a-step title="归还" :description="row.end_time" />
          <a-step title="支付" :description="row.pay_time" />
        </a-steps>
      </template>
      {{row.duration}}
    </a-modal>

  </div>
</template>
<script>
import tableMixins from '../mixins/table.js'
const columns = [
  {
    title: '用户信息',
    key: 'member_id',
    dataIndex: 'member_id',
    scopedSlots: { customRender: 'member_id' },
    width: 150,
    fixed: 'left'
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

  {
    key: 'box.code',
    title: '机柜id',
    width: 150,
    dataIndex: 'box.code'
  },
  {
    key: 'charger.code',
    title: '充电宝id',
    width: 150,
    dataIndex: 'charger.code'
  },
  {
    key: 'duration',
    title: '使用时长',
    width: 150,
    dataIndex: 'duration'
  },
  {
    key: 'status_cn',
    title: '订单状态',
    width: 100,
    dataIndex: 'status_cn',
    scopedSlots: { customRender: 'status_cn' }
  },
  {
    key: 'pay_amount',
    title: '支付金额(元)',
    width: 100,
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
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 150,
    fixed: 'right'
  }
]

export default {
  mixins: [tableMixins],
  data() {
    return {
      columns,
      detailVisible: false
    }
  },
  computed: {
    currentStatus() {
      if (this.row.pay_time && this.row.start_time && this.row.end_time) {
        return 2
      } else if (this.row.start_time && this.row.end_time) {
        return 1
      } else if (this.row.start_time) {
        return 0
      }
    }
  },
  methods: {
    fetch() {
      return 'ORDER_LIST'
    },
    detail(row) {
      this.detailVisible = true
      this.row = row
    }
  }
}
</script>
