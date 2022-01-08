// 将el-icon的组件名称AbbbCddd转化为i-abbb-cddd形式
// 此前用switch做组件名时因关键字重复报错，所以格式统一加了前缀
// 例：Switch转换为i-switch，ArrowDownBold转换为i-arrow-down-bold
export function transElIconName(iconName: any) {
  return (
    'el-icon-' +
    iconName.replace(/[A-Z]/g, (match: any) => '-' + match.toLowerCase())
  )
}
