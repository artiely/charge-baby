<template>
  <div>
    <a-card>
      <div slot="title">
    <!-- search -->
    <a-input-search placeholder="商户名/设备类型" v-model="search"  style="width:400px" />
    <a-range-picker @change="timeChange" format="YYYY-MM-DD" class="pull-right"/>
    </div>
    <!-- table -->
    <a-table :columns="columns" size="middle" :dataSource="data" :width="600" :pagination="false" :loading="loading" @change="handleTableChange" :scroll="{ x: scrollX }">
      <template slot="created_at" slot-scope="text,record">
        <a href="#">{{record.mobile}} - {{record.name}}</a>
      </template>
      <template slot="power" slot-scope="text, record">
        <a-progress :percent="record.power" size="small" />
      </template>
      <template slot="status_cn" slot-scope="text, record">
        <a-badge status="error" v-if="record.status_cn=='丢失'" :text="record.status_cn" />
        <a-badge status="success" v-if="record.status_cn=='使用'" :text="record.status_cn" />
        <a-badge status="processing" v-if="record.status_cn=='充电'" :text="record.status_cn" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a @click="history(record)">使用记录</a>
      </template>
    </a-table>
    <a-pagination v-if="last_page>1" :defaultCurrent="1" :total="total" @change="onChange" style="margin-top:6px" />
    </a-card>
    <!-- record -->
    <record-list v-bind:recordVisible.sync="recordVisible" :chargeId="row.id"></record-list>
  </div>
</template>
<script>
import tableMixins from '../mixins/table.js'
import recordList from './record_list'

const columns = [
  {
    title: '设备id',
    key: 'code',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    width: 150,
    fixed: 'left'
  },
  {
    key: 'created_at',
    title: '入住时间',
    dataIndex: 'created_at',
    width: 150
  },
  {
    key: 'box.code',
    title: '所在机柜id',
    dataIndex: 'box.code',
    width: 150
  },
  {
    key: 'power',
    title: '剩余电量%',
    scopedSlots: { customRender: 'power' },
    dataIndex: 'power',
    width: 140
  },
  {
    key: 'status_cn',
    title: '状态',
    scopedSlots: { customRender: 'status_cn' },
    dataIndex: 'status_cn',
    width: 60
  },
  {
    key: 'store.name',
    title: '所属商户',
    dataIndex: 'store.name'
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
      return 'CHARGE_LIST'
    },
    history(row) {
      this.row = row
      this.recordVisible = true
    }
  }
}
</script>
