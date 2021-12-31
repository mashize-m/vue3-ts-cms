// 编写规则
export const rules = {
  // name:[{验证规则1},{验证规则2}]
  // password：[{验证规则1},{验证规则2}]
  num: [
    {
      // 是否必填
      required: true,
      // 不符合条件时，页面显示
      message: '手机号码是必需提供的内容',
      // 触发时机，blur失去焦点时，change只要有改变时
      trigger: 'blur'
    },
    {
      // 正则规则
      pattern: /^[0-9]{11}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  verificationcode: [
    {
      // 是否必填
      required: true,
      // 不符合条件时，页面显示
      message: '密码是必需提供的内容',
      // 触发时机，blur失去焦点时，change只要有改变时
      trigger: 'blur'
    },
    {
      // 正则规则
      pattern: /^[0-9]{6}$/,
      message: '请输入正确的验证码',
      trigger: 'blur'
    }
  ]
}
