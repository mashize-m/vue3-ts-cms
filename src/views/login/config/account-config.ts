// 编写规则
export const rules = {
  // name:[{验证规则1},{验证规则2}]
  // password：[{验证规则1},{验证规则2}]
  name: [
    {
      // 是否必填
      required: true,
      // 不符合条件时，页面显示
      message: '用户名是必需提供的内容',
      // 触发时机，blur失去焦点时，change只要有改变时
      trigger: 'blur'
    },
    {
      // 正则规则
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名不符合规则，需要5-10位数',
      trigger: 'blur'
    }
  ],
  password: [
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
      pattern: /^[a-z0-9]{3,}$/,
      message: '用户名不符合规则，需要3位以上的数字或字母',
      trigger: 'blur'
    }
  ]
}
