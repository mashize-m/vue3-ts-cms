<template>
  <div class="login-phone">
    <el-form label-width="auto" :rules="rules" :model="phone" ref="formRef">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>

      <el-form-item label="验证码" prop="verificationcode">
        <div class="get-code">
          <el-input v-model="phone.verificationcode" />
          <el-button type="primary" class="code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
// 引入类型
import { ElForm } from 'element-plus'
import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      num: '',
      verificationcode: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = () => {
      console.log('phone正在登录~~')
      // ElementPlus的Form组件的方法 validate（验证）
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('真正的执行phone登录逻辑')
          // 2.开始进行登录验证
          store.dispatch('login/phoneLoginAction', { ...phone })
        }
      })
    }

    return {
      phone,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.code-btn {
  margin-left: 8px;
}
</style>
