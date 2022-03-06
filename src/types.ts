import { faildRes, successRes } from './errorHandler'

// 错误处理 的数据类型
export interface ErrInfo {
  errmsg: string
  errcode: number
}

// 控制器返回结果类型
export type SuccessRes = ReturnType<typeof successRes>
export type FaildRes = ReturnType<typeof faildRes>

//  响应结果切片
export type ResponseSlice = {
  _limit?: number
  _skip?: number
  _page?: number
  
}

// 用户的数据类型
export interface LoginProps {
  account: string
  password: string
}

export interface UserInfo extends LoginProps {
  name?: string
  nickname?: string
  gender?: string
  avatar?: string
}


// 用户鉴权
export interface UserAuthentication {
  token: string
}

// 网络类型
export interface NetType {
  name: string
  ipStartAddr: string
  ipEndAddr: string
  subnetMask: string
  gateway: string
  desc?: string 
}



// 网络管理权限
interface NetTypePermission {
  createNetType: boolean
  deleteNetType: boolean
  modifyNetType: boolean
}

// 视图权限
interface ViewPermission {
    home: boolean
    chat: boolean
    category: boolean
    manage: {
      netManage: boolean
      ipManage: boolean
      userManage: boolean
    }
}

// 全部权限
export interface Permission {
  account?: string
  name?: string
  systemManage: boolean
  view: ViewPermission // 视图
  action: {
    user: {
      login: boolean,
      createUser: boolean,
      findUser: boolean,
      deleteUser: boolean,
      modifyUserInfo: boolean,
    }
    netType: false | NetTypePermission
    
  }//操作
}


// ip地址信息
export interface IpAddressInfo {
  ipAddress: string
  name: string
  netType: string
  account?: string
  desc?: string
}