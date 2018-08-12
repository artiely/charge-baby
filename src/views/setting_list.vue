<template>
  <div>
    <a-table :columns="columns" size="middle" :dataSource="data" :pagination="false" :loading="loading" @change="handleTableChange" :scroll="{ x: scrollX }">
      <template slot="operation" slot-scope="text, record">
        <!-- <a @click="edit(record)">编辑</a> -->
        <a-popconfirm
          v-if="data.length"
          title="您权限不足"
          @confirm="() => {}">
          <a >编辑</a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-pagination  v-if="last_page>1" :defaultCurrent="1" :total="total" @change="onChange" style="margin-top:6px" />
  </div>
</template>
<script>
import tableMixins from '../mixins/table.js'
const columns = [
  {
    key: 'key',
    title: 'key',
    dataIndex: 'key'
  },
  {
    key: 'object',
    title: 'object',
    dataIndex: 'object'
  },
  {
    key: 'value',
    title: 'value',
    dataIndex: 'value'
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
  data() {
    return {
      columns,
      visible: false,
      row: ''
    }
  },
  methods: {
    fetch() {
      return 'SETTING_LIST'
    },
    edit(row) {
      this.row = row
      this.visible = true
    }
  }
}
</script>
