<template>
  <div>
    <a-card>
      <div slot="title">
        <a-input-search placeholder="商户名" v-model="search"  style="width:400px" />
        <a-button type="primary" @click="add" class="pull-right">添加商户</a-button>
      </div>
      <a-table :columns="columns" size="middle" :dataSource="data" :pagination="false" :loading="loading" @change="handleTableChange" :scroll="{ x: scrollX }">
        <template slot="name" slot-scope="text,record">
          <a>{{record.mobile |telFormat()}}</a> -
          <a>{{record.name}}</a>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a @click="edit(record)">编辑</a>
        </template>
      </a-table>
      <a-pagination :defaultCurrent="1" v-if="last_page>1" :total="total" @change="onChange" style="margin-top:6px" />
    </a-card>
    <!-- edit -->
    <a-modal :title="title" v-model="visible" :footer="null">
      <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item label='商户名称' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入商户名'}],initialValue:row.name}">
          <a-input />
        </a-form-item>
        <a-form-item required label='电话' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="mobile" :fieldDecoratorOptions="{rules: [{ required: true,len:11, message: '请输入手机号'}],initialValue:row.mobile}">
          <a-input type="number" />
        </a-form-item>
        <a-form-item label='密码' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="password" :fieldDecoratorOptions="{rules: [{message: '请输入商户密码'}],initialValue:row.password}">
          <a-input />
        </a-form-item>
        <a-form-item required label='地址' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="address" :fieldDecoratorOptions="{rules: [{ required: true,message: '请输入商户地址'}],initialValue:row.address}">
          <a-input v-model="row.address" />
        </a-form-item>
        <a-form-item label='经度' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="lat" :fieldDecoratorOptions="{initialValue:row.lat}">
          <a-input v-model="row.lat" type="number" />
        </a-form-item>
        <a-form-item label='纬度' :labelCol="labelCol" :wrapperCol="wrapperCol" fieldDecoratorId="lng" :fieldDecoratorOptions="{initialValue:row.lng}">
          <a-input v-model="row.lng" type="number" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='状态' fieldDecoratorId="status">
          <a-switch checkedChildren="启用" unCheckedChildren="停用" v-model="status" />
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
    title: '商户信息',
    key: 'name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    fixed: 'left'
  },
  {
    key: 'created_at',
    title: '入住时间',
    dataIndex: 'created_at',
    width: 150
  },
  {
    key: 'address',
    title: '商户地址',
    dataIndex: 'address'
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
      status: true
    }
  },
  watch: {
    row: {
      handler(val) {
        this.status = val === 1
      },
      deep: true
    }
  },
  methods: {
    fetch() {
      return 'STORE_LIST'
    },
    editFetch() {
      return 'ORDER_PUT_POST'
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        let data = {
          id: this.row.id,
          ...values,
          status: this.status
        }
        if (!err) {
          this.save(data)
        }
      })
    }
  }
}
</script>
