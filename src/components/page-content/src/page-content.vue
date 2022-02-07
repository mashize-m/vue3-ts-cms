<template>
  <div class="page-content">
    <!-- v-model:page="pageInfo"  自定义名称page  默认是modelValue update:modelValue  现在是page,update:page -->
    <msz-table
      :listData="dateList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick">
          <el-icon><user-filled /></el-icon>
          新建数据
        </el-button>
        <!-- <el-button>
          <el-icon><refresh /></el-icon>
        </el-button> -->
      </template>
      <!-- 列中的插槽 -->
      <template #enable="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.status ? 'success' : 'danger'"
        >
          {{ scope.row.status ? '上架' : '下架' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>
          {{ $filters.formatTime(scope.row.createAt) }}
        </span>
      </template>
      <template #updateAt="scope">
        <span>
          {{ $filters.formatTime(scope.row.updateAt) }}
        </span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
          >
            <el-icon><edit /></el-icon>
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            size="mini"
            type="text"
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon><delete /></el-icon>
            删除
          </el-button>
        </div>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </msz-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

import MszTable from '@/base-ui/table'

import { Edit, Delete, Refresh, UserFilled } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    MszTable,
    Edit,
    Delete,
    // Refresh,
    UserFilled
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      // 发送网络前，判断是否有对应权限
      // 没有权限
      if (!isQuery) return
      // 有权限
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从Vuex中获取数据
    const dateList = computed(() => {
      return store.getters[`system/pageListDate`](props.pageName)
    })
    // const userList = computed(() => {
    //   return store.state.system.userList
    // })
    const dataCount = computed(() => {
      return store.getters[`system/pageListCount`](props.pageName)
    })

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'enable') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 5.删除、编辑、新建操作
    const handleDeleteClick = (item: any) => {
      // console.log(item)
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      Edit,
      Delete,
      Refresh,
      UserFilled,
      dateList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
