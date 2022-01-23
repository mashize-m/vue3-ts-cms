<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick()">
      <template v-if="isFold">
        <expand />
      </template>
      <template v-else>
        <fold />
      </template>
    </el-icon>
    <div class="content">
      <msz-breadcrumb :breadcrumbs="breadcrumbs"></msz-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import UserInfo from './user-info.vue'
import MszBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  emits: ['foldChange'],
  components: {
    Fold,
    Expand,
    UserInfo,
    MszBreadcrumb
  },
  setup(psops, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑数据  [{name: ,path: },{}]
    const store = useStore()

    const breadcrumbs = computed(() => {
      // 无论路径或者路由发生变化时，都需要重新计算下
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
