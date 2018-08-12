// scroll mixins
// import moment from 'moment'
export default {
  data() {
    return {
      scrollX: 1000,
      data: [],
      pagination: {},
      loading: false,
      preLoading: true,
      total: 10,
      last_page: 1,
      query: {
        page: 1,
        limit: 10
      },
      search: '',
      timer: null,
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
      visible: false,
      row: '',
      form: null,
      title: '',
      start_time: '',
      end_time: ''
    }
  },
  watch: {
    query: {
      handler() {
        this.getData()
      },
      deep: true
    },
    search: {
      handler() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getData()
        }, 500)
      }
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      this.getData()
    },
    async getData() {
      this.loading = true
      let res = await this.$api[this.fetch()]({
        start_time: this.start_time,
        end_time: this.end_time,
        search: this.search,
        ...this.query
      })
      if (res.data) {
        this.loading = false
        this.data = res.data.map((v, i) => {
          v.key = i
          return v
        })
        this.total = res.total
        this.last_page = res.last_page
      }
    },
    onChange(pageNumber) {
      this.query.page = pageNumber
    },
    timeChange(moment, data) {
      this.start_time = data[0] ? `${data[0]} 00:00:00` : ''
      this.end_time = data[1] ? `${data[1]} 23:59:59` : ''
      this.getData()
    },
    edit(row) {
      this.title = '编辑'
      this.row = row
      console.log('row当前编辑的行', row)
      this.visible = true
    },
    async save(data) {
      await this.$api[this.editFetch()](data)
      this.visible = false
      this.form.resetFields()
      this.getData()
    },
    add() {
      this.title = '新增'
      this.row = {}
      this.visible = true
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.preLoading = false
  }
}
