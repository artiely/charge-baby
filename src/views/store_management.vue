<template>
  <div>
    <a-table :columns="columns" size="middle" :dataSource="data" :pagination="false" :loading="loading" @change="handleTableChange" :scroll="{ x: 1000 }">
      <template slot="created_at" slot-scope="text,record">
        <a href="#">{{record.member.mobile}} - {{record.member.name}}</a>
      </template>
      <template slot="operation" slot-scope="text, record">
        <!-- <a-popconfirm
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)">
          <a href="#">Delete</a>
        </a-popconfirm>-->
        <a href="#">编辑</a>
      </template>
    </a-table>
    <a-pagination  :defaultCurrent="1" :total="total" @change="onChange" style="margin-top:6px"/>
  </div>
</template>
<script>
const columns = [
  {
    title: '商户信息',
    // customRender: (text, row, index) => {
    //   return {
    //     children: `${row.member.mobile}-${row.member.name}`
    //   }
    // },
    key: 'member',
    dataIndex: 'member',
    // slots: { title: '商户信息' },
    scopedSlots: { customRender: 'created_at' },
    width: 150,
    fixed: 'left'
  },
  {
    key: 'created_at',
    title: '入住时间',
    dataIndex: 'created_at'
  },
  {
    key: 'address',
    title: '商户地址',
    dataIndex: 'box.address'
  },
  {
    key: 'duration',
    title: '时长',
    dataIndex: 'duration'
  },
  {
    key: 'status_cn',
    title: '状态',
    dataIndex: 'status_cn'
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
  mounted() {
    this.getData()
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      total: 10,
      columns,
      query: {
        page: 1,
        limit: 10
      }
    }
  },
  watch: {
    query: {
      handler() {
        this.getData()
      },
      deep: true
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      this.getData()
    },
    async getData() {
      this.loading = true
      let res = await this.$api.ORDER_LIST(this.query)
      if (res.data) {
        this.loading = false
        this.data = res.data.map(v => {
          v.key = v.id
          return v
        })
        this.total = res.total
      }
    },
    onChange(pageNumber) {
      this.query.page = pageNumber
    }
  }
}
</script>
