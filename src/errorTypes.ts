import { ErrInfo } from './types'

// 缺失参数
export const MISSING_PARAMS: ErrInfo = {
  errcode: 1101,
  errmsg: 'MISSING_PARAMS',
}

// 已存在该用户
export const USER_ALREADY_EXIST: ErrInfo = {
  errcode: 1201,
  errmsg: 'USER_ALREADY_EXIST',
}

// 用户不存在
export const USER_NOT_EXIST: ErrInfo = {
  errcode: 1202,
  errmsg: 'USER_NOT_EXIST',
}

// 账号或密码错误
export const ACCOUNT_OR_PASSWORD_ERROR: ErrInfo = {
  errcode: 1203,
  errmsg: 'ACCOUNT_OR_PASSWORD_ERROR',
}

// 要求必须是对象
export const REQUIRED_JSON: ErrInfo = {
  errcode: 1001,
  errmsg: 'REQUIRED_JSON',
}

// 不存在的控制器
export const CONTROLLER_NOT_EXIST: ErrInfo = {
  errcode: 1002,
  errmsg: 'CONTROLLER_NOT_EXIST',
}


// 无效的许可
export const NO_PROMISSION : ErrInfo= {
  errcode: 1008,
  errmsg: 'NO_PROMISSION'
}

// 无效的jwt Invalid 
export const INVALID_JWT: ErrInfo= {
  errcode: 1009,
  errmsg: 'INVALID_JWT'
}

export const NET_TYPE_REPEAT: ErrInfo= {
  errcode: 1309,
  errmsg: 'NET_TYPE_REPEAT'
}

export const NET_TYPE_NOT_EXIST: ErrInfo= {
  errcode: 1310,
  errmsg: 'NET_TYPE_NOT_EXIST'
}


// 权限
export const PERMISSION_REPEAT: ErrInfo = {
  errcode: 1408,
  errmsg: 'PERMISSION_REPEAT'
}

// 未找到
export const NOT_FOUND: ErrInfo = {
  errcode: 1105,
  errmsg: 'NOT_FOUND'
}