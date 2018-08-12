<template>
  <div>
    <a-table :columns="columns" size="middle" :dataSource="data" :pagination="false" :loading="loading" @change="handleTableChange" :scroll="{ x: scrollX }">
      <template slot="operation" slot-scope="text, record">
        <a @click="() => edit(record)">编辑</a>
      </template>
    </a-table>
    <a-pagination :defaultCurrent="1" v-if="last_page>1" :total="total" @change="onChange" style="margin-top:6px" />
    <!-- edit -->
    <a-modal :title="title" v-model="visible" :footer="null" :width="600">
      <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item label='设备类型' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入设备类型'}],initialValue:row.name}">
          <a-input />
        </a-form-item>
        <a-form-item label='含充电宝数量(台)' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="upper" :fieldDecoratorOptions="{initialValue:row.upper}">
          <a-input v-model="row.upper" type="number" />
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
    title: '设备类型',
    key: 'name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    width: 150,
    fixed: 'left'
  },
  {
    key: 'box_num',
    title: '该设备数量(台)',
    dataIndex: 'box_num',
    scopedSlots: { customRender: 'box_num' }
  },
  {
    key: 'upper',
    title: '含充电宝数量(台)',
    dataIndex: 'upper',
    scopedSlots: { customRender: 'upper' }
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
      return 'BOXTYPE_LIST'
    },
    editFetch() {
      return 'BOXTYPE_PUT_POST'
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        let data = {
          id: this.row.id,
          ...values
        }
        if (!err) {
          this.save(data)
        }
      })
    }
  }
}
</script>
