<template>
  <div class="page-search">
    <msz-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
    </msz-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MszForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    MszForm
  },

  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一：formData中的属性应该动态来决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // const formData = ref({
    //   id: '',
    //   name: '',
    //   password: '',
    //   category: '',
    //   createTime: ''
    // })

    // 2.优化二：当用户点击重置，进行数据重置
    const handleResetClick = () => {
      // 方案一：不使用双向绑定
      formData.value = formOriginData
      // 方案二：使用双向绑定
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      // 重新发送查询请求
      emit('resetBtnClick')
    }

    // 3.优化三：当用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return { formData, handleResetClick, handleQueryClick }
  }
})
</script>

<style scoped>
.header {
  color: #409eff;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
