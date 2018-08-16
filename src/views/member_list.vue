<template>
  <div>
    <a-card>
      <div slot="title">
        <!-- search -->
        <a-input-search placeholder="用户名/手机号" v-model="search"  style="width:400px" />
        <a-range-picker @change="timeChange" format="YYYY-MM-DD" class="pull-right" />
      </div>
      <a-table :columns="columns" size="middle" :dataSource="data" :pagination="false" :loading="loading" @change="handleTableChange" :scroll="{ x: scrollX }">
        <template slot="mobile" slot-scope="text,record">
          <a href="#">{{record.mobile}} - {{record.name}}</a>
        </template>
        <template slot="from" slot-scope="text,record">
          <span v-if="record.from=='wechat'">
            <a-icon type="wechat" style="color:#52c41a;font-size:18px" />微信</span>
        </template>
        <template slot="deposit.money" slot-scope="text,record">
          <a-tag color="green" v-if="record.deposit.money==1">是</a-tag>
          <a-tag color="red" v-else>否</a-tag>
        </template>
        <template slot="lat" slot-scope="text,record">
          <a href="#">{{record.lat}} - {{record.lng}}</a>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a @click="history(record)">使用记录</a>
        </template>
      </a-table>
      <a-pagination :defaultCurrent="1" v-if="last_page>1" :total="total" @change="onChange" style="margin-top:6px" />
    </a-card>
    <!-- record -->
    <record-list v-model="recordVisible" :memberId="row.id"></record-list>
  </div>
</template>
<script>
import tableMixins from '../mixins/table.js'
import recordList from './record_list'
const columns = [
  {
    title: '用户信息',
    key: 'mobile',
    dataIndex: 'mobile',
    scopedSlots: { customRender: 'mobile' },
    width: 150,
    fixed: 'left'
  },
  {
    key: 'created_at',
    title: '注册时间',
    dataIndex: 'created_at'
  },
  {
    key: 'from',
    title: '客户来源',
    dataIndex: 'from',
    scopedSlots: { customRender: 'from' }
  },
  {
    key: 'deposit.money',
    title: '有效押金',
    dataIndex: 'deposit.money',
    scopedSlots: { customRender: 'deposit.money' }
  },
  {
    key: 'lat',
    title: '最后位置信息',
    scopedSlots: { customRender: 'lat' },
    dataIndex: 'lat'
  },
  {
    key: 'use_time',
    title: '累计使用(次)',
    dataIndex: 'use_time'
  },
  {
    key: 'use_money',
    title: '累计消费(元)',
    dataIndex: 'use_money'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 100,
    fixed: 'right'
  }
]

export default {
  mixins: [tableMixins],
  components: {
    recordList
  },
  data() {
    return {
      columns,
      recordVisible: false
    }
  },
  methods: {
    fetch() {
      return 'MEMBER_LIST'
    },
    history(row) {
      this.row = row
      this.recordVisible = true
    }
  }
}
</script>
