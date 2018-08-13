<template>
  <div>
    <a-card>
      <div slot="title">
        <a-input-search placeholder="商户名/设备类型" v-model="search" enterButton style="width:400px" />
        <a-range-picker @change="timeChange" format="YYYY-MM-DD" class="pull-right" />
      </div>
      <!-- table -->
      <a-table :columns="columns" size="middle" :dataSource="data" :pagination="false" :loading="loading" @change="handleTableChange" :scroll="{ x: 1400 }">
        <template slot="created_at" slot-scope="text,record">
          <a href="#">{{record.mobile}} - {{record.name}}</a>
        </template>
        <template slot="status" slot-scope="text,record">
          <a-tag color="#87d068" v-if="text==1">启用</a-tag>
          <a-tag color="#f50" v-if="text==0">停用</a-tag>
        </template>
        <template slot="box_status_cn" slot-scope="text,record">
          <span v-for="(item,i) in record.box_status_cn" :key="i">
            <a-tag color="green" v-if="item=='正常'">正常</a-tag>
            <a-tag color="pink" v-if="item=='机柜已空'">机柜已空</a-tag>
            <a-tag color="pink" v-if="item=='充电宝弹出卡死'">充电宝弹出卡死</a-tag>
            <a-tag color="orange" v-if="item=='充电宝电量低于标准值'">充电宝电量低于标准值</a-tag>
            <a-tag color="green" v-if="item=='充电宝损坏'">充电宝损坏</a-tag>
            <a-tag color="cyan" v-if="item=='充电宝丢失'">充电宝丢失</a-tag>
            <a-tag color="blue" v-if="item=='系统复位'">系统复位</a-tag>
            <a-tag color="purple" v-if="item=='新插入充电宝'">新插入充电宝</a-tag>
          </span>
        </template>
        <template slot="qrcode" slot-scope="text, record">
          <span >
            <span  @click="getQrcode(record)">
              <a-icon type="qrcode" /> 点击生成
            </span>
            <a v-if="record.qrcode" :href="record.qrcode" :download="record.code">下载</a>
          </span>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a @click="edit(record)">编辑</a>
          <a @click="info(record)">详情</a>
        </template>
      </a-table>
      <a-pagination :defaultCurrent="1" v-if="last_page>1" :total="total" @change="onChange" style="margin-top:6px" />
    </a-card>
    <!-- edit -->
    <a-modal :title="title" v-model="visible" :footer="null">
      <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item required label='设备类型' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="type_id" :fieldDecoratorOptions="{initialValue:row.type_id}">
          <a-select>
            <a-select-option :value="item.id" v-for="item in boxtype" :key="item.id">{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label='单价/小时(元)' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="unit_price" :fieldDecoratorOptions="{rules: [{ required: true,message: '请输入商户密码'}],initialValue:row.unit_price}">
          <a-input type="number" />
        </a-form-item>
        <a-form-item required label='24h最高收费(元)' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="upper_price" :fieldDecoratorOptions="{rules: [{ required: true,message: '请输入商户地址'}],initialValue:row.upper_price}">
          <a-input type="number" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='机柜状态' fieldDecoratorId="status">
          <a-switch checkedChildren="已启用" unCheckedChildren="已停用" v-model="status" />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 19, offset: 5 }">
          <a-button type='dashed' size="large" style="width:120px;margin-right:10px" @click="visible=false">
            取消
          </a-button>
          <a-button type='primary' htmlType='submit' size="large" style="width:120px">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import tableMixins from '../mixins/table.js'
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
    key: 'type.name',
    title: '设备类型',
    dataIndex: 'type.name',
     width: 150
  },
  {
    key: 'box_status_cn',
    title: '运行状态',
    dataIndex: 'box_status_cn[0]',
    scopedSlots: { customRender: 'box_status_cn' },
    width: 100
  },
  {
    key: 'status',
    title: '机柜状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    width: 100
  },
  {
    key: 'unit_price',
    title: '单价/小时(元)',
    dataIndex: 'unit_price',
    width: 100
  },
  {
    key: 'upper_price',
    title: '24h最高收费(元)',
    dataIndex: 'upper_price',
    width: 150
  },
  {
    key: 'store.name',
    title: '所属商户',
    dataIndex: 'store.name',
     width: 150
  },
  {
    key: 'qrcode',
    title: '二维码',
    dataIndex: 'qrcode',
    scopedSlots: { customRender: 'qrcode' },
     width: 150
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
      boxtype: null,
      status: true,
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    }
  },
  watch: {
    row: {
      handler(val) {
        if (val) {
          this.status = val.status === 1
        }
      },
      deep: true
    }
  },
  methods: {
    fetch() {
      return 'BOX_LIST'
    },
    info() {},
    async getQrcode(row) {
      let res = await this.$api.BOX_QRCODE({code:row.code})
      const newData = [...this.data]
      const target = newData.filter(item => row.key === item.key)[0]
      if (target) {
        target.qrcode = res.url
        this.data = newData
      }
    },
    editFetch() {
      return 'BOX_PUT_POST'
    },
    async boxtypeList() {
      let res = await this.$api.BOXTYPE_LIST({ page: 1, limit: 100 })
      this.boxtype = res.data
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        let data = {
          id: this.row.id,
          ...values,
          status: this.status ? 1 : 0
        }
        if (!err) {
          this.save(data)
        }
      })
    }
  },
  created() {
    this.boxtypeList()
  }
}
</script>
