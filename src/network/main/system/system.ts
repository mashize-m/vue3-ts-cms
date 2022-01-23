import mszRequest from '../../index'

export function getPageListData(url: string, queryInfo: any) {
  return mszRequest.post({
    url: url,
    data: queryInfo
  })
}
