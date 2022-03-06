import { ErrInfo } from './types'

// 执行成功时的返回结果
export const successRes = <T>(data: T) => ({
  success: true,
  data,
})

// 执行失败时的返回结果
export const faildRes = (data: ErrInfo) => ({
  success: false,
  ...data,
})
