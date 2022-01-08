<template>
  <div class="user">
    <div class="search">
      <msz-form
        :formItems="formItems"
        :labelWidth="labelWidth"
        :itemStyle="itemStyle"
      ></msz-form>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MszForm, { IFormItem } from '@/base-ui/form'

export default defineComponent({
  name: 'user',
  components: {
    MszForm
  },
  setup() {
    const formItems: IFormItem[] = [
      {
        type: 'input',
        label: 'id',
        placeholder: '请输入id'
      },
      {
        type: 'input',
        label: '用户名',
        placeholder: '请输入用户名'
      },
      {
        type: 'password',
        label: '密码',
        placeholder: '请输入密码'
      },
      {
        type: 'select',
        label: '分类',
        placeholder: '请选择分类',
        options: [
          { title: '超级管理员', value: 'rootadmin' },
          { title: '管理员', value: 'admin' }
        ]
      },
      {
        type: 'datepicker',
        label: '创建时间',
        otherOptions: {
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          type: 'daterange'
        }
      }
    ]

    const labelWidth = '100px'

    const itemStyle = {
      padding: '10px 40px'
    }

    return {
      formItems,
      labelWidth,
      itemStyle
    }
  }
})
</script>

<style scoped></style>
