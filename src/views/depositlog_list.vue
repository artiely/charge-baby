<template>
  <div>
    <a-tabs @change="handleTab">
      <a-tab-pane :tab="item.title" v-for="item in tabs" :key="item.key">
      </a-tab-pane>
    </a-tabs>
    <a-table :columns="columns" size="middle" :dataSource="data" :pagination="false" :loading="loading" @change="handleTableChange" :scroll="{ x: scrollX }">
      <template slot="member_id" slot-scope="text,record">
        <a href="#">{{record.member.mobile}} - {{record.member.name}}</a>
      </template>
    </a-table>
    <a-pagination v-if="last_page>1" :defaultCurrent="1" :total="total" @change="onChange" style="margin-top:6px" />
  </div>
</template>
<script>
import tableMixins from '../mixins/table.js'
const tabs = [
  {
    title: '充值记录',
    key: '1'
  },
  {
    title: '退款记录',
    key: '2'
  },
  {
    title: '扣除记录',
    key: '3'
  }
]
const columns = [
  {
    title: '用户信息',
    key: 'member_id',
    dataIndex: 'member_id',
    scopedSlots: { customRender: 'member_id' },
    width: 150,
    fixed: 'left'
  },
  {
    key: 'order_no',
    title: '充值押金流水号',
    dataIndex: 'order_no'
  },
  {
    key: 'money',
    title: '充值金额(元)',
    dataIndex: 'money'
  },
  {
    key: 'created_at',
    title: '充值时间',
    dataIndex: 'created_at'
  }
]

export default {
  mixins: [tableMixins],
  data() {
    return {
      columns,
      tabs,
      query: {
        page: 1,
        limit: 10,
        type: '1'
      }
    }
  },
  methods: {
    fetch() {
      return 'DEPOSITLOG_LIST'
    },
    edit(row) {
      this.row = row
      this.visible = true
    },
    handleTab(key) {
      this.query.type = key
    }
  }
}
</script>
