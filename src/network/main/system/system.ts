import mszRequest from '../../index'

export function getPageListData(url: string, queryInfo: any) {
  return mszRequest.post({
    url: url,
    data: queryInfo
  })
}

// 发送删除请求
// url：/users/id
export function deletePageDataById(url: string) {
  return mszRequest.delete({
    url: url
  })
}

// 发送创建请求
export function createPageData(url: string, newData: any) {
  return mszRequest.post({
    url: url,
    data: newData
  })
}

// 发送编辑请求
export function editPageData(url: string, editData: any) {
  return mszRequest.patch({
    url: url,
    data: editData
  })
}
