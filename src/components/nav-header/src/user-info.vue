<template>
  <div class="user-info">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="circleUrl"></el-avatar>
        <span class="avatar-user-name">{{ name }}</span>
        <!-- <el-icon class="el-icon--right">
          <arrow-down-bold />
        </el-icon> -->
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <!-- <el-icon color="#409EFC">
              <circle-close />
            </el-icon> -->
            退出登录
          </el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
// import { ArrowDownBold, CircleClose } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    // ArrowDownBold
    // CircleClose
  },
  setup() {
    const store = useStore()
    const circleUrl =
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    const name = computed(() => {
      return store.state.login.userInfo.name
    })

    return {
      name,
      circleUrl
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;

  .avatar-user-name {
    margin: 0 0 0 8px;
    font-size: 1.1em;
  }
}
</style>
