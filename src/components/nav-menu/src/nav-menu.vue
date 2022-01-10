<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>

    <el-menu
      :default-active="currentMenuId"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <!-- <template v-for="item in $store.state.login.userMenus"></template> -->
      <!-- 计算属性 -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <!-- 标题 -->
            <template #title>
              <!-- <i v-if="item.icon" :class="item.icon"></i> -->
              <!-- <template v-if="item.icon === 'el-icon-monitor'">
                <el-icon><monitor /></el-icon>
              </template>
              <template v-else-if="item.icon === 'el-icon-setting'">
                <el-icon><setting /></el-icon>
              </template>
              <template v-else-if="item.icon === 'el-icon-goods'">
                <el-icon><goods /></el-icon>
              </template>
              <template v-else-if="item.icon === 'el-icon-chat-line-round'">
                <el-icon><chat-line-round /></el-icon>
              </template> -->
              <!-- 动态组件 -->
              <el-icon>
                <component v-if="item.icon" :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 折叠的内容 -->
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import {
  Monitor as ElIconMonitor,
  Setting as ElIconSetting,
  Goods as ElIconGoods,
  ChatLineRound as ElIconChatLineRound
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

import { pathMapToMenu } from '@/utils/map-menus'
// vuex - typescript 兼容性比较差(缺少类型检测)  => 通过pinia库(第三方)使用

export default defineComponent({
  components: {
    ElIconMonitor,
    ElIconSetting,
    ElIconGoods,
    ElIconChatLineRound
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // store
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)

    // router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path

    // data，匹配页面刷新时，菜单项固定某一位置的bug
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const currentMenuId = ref(menu.id + '')

    // event handle 事件处理
    const handleMenuItemClick = (item: any) => {
      console.log(item)
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      userMenus,
      currentMenuId,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  // ::v-deep .child {...}使用方法已弃用，改用::v-deep(.child) {...}
  // ::v-deep .el-sub-menu__title {
  //   background-color: #001529 !important;
  // }
  ::v-deep(.el-sub-menu__title) {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
