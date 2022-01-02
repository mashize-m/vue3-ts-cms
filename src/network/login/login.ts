import mszRequest from '../index'

import {
  IAccount,
  ILoginResult,
  IDataType,
  UserInfo,
  Department,
  Role
} from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法：users/id
  UserMenus = '/role/' // 用法：role/id/menu
}

export function accountLoginRequest(account: IAccount) {
  return mszRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
    // showLoading: false
  })
}

export function requestUserInfoById(id: number) {
  return mszRequest.get<IDataType<UserInfo>>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return mszRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
