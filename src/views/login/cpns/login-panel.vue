<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs
      type="border-card"
      stretch
      v-model="currentTab"
      @click="changeKeepPassword()"
    >
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon style="vertical-align: middle">
              <avatar />
            </el-icon>
            账号登录
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon style="vertical-align: middle">
              <iphone />
            </el-icon>
            手机登录
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Avatar, Iphone } from '@element-plus/icons-vue'
import LoginPhone from './login-phone.vue'
import LoginAccount from './login-account-test.vue'

export default defineComponent({
  components: {
    Avatar,
    Iphone,
    LoginPhone,
    LoginAccount
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account')

    // 2.定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        console.log('立即登录')
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('phoneRef调用loginAction')
        phoneRef.value?.loginAction()
      }
    }
    const changeKeepPassword = () => {
      if (currentTab.value === 'phone') {
        isKeepPassword.value = false
      } else {
        isKeepPassword.value = true
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick,
      changeKeepPassword
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 120px;
  width: 320px;

  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 1px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 1px;
  }
}
</style>
