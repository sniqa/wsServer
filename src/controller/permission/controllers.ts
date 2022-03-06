import db from '../../mongodb';
import { Permission, UserAuthentication } from '../../types';
import { faildRes, successRes } from './../../errorHandler';
import { INVALID_JWT, MISSING_PARAMS, PERMISSION_REPEAT } from './../../errorTypes';
import { deepMergeObject, hasKeys } from './../../share';
import { jwtVerify } from './../user/jwt';
import { defaultPermission } from './permissionTemplate';

const PERMISSIONS_COLLECTION = 'permission'


const permissionsModel = db.collection<Permission>(PERMISSIONS_COLLECTION)


// 创建权限模板
export const createPermissionTemplate = async (data: Permission) => {
  if (hasKeys(data, 'name')) {
    return faildRes(MISSING_PARAMS)
  }

  const { name, ...permissionSlice } = data

  const hasPermission = await permissionsModel.findOne({ name })

  if (hasPermission) {
    return faildRes(PERMISSION_REPEAT)
  }

  const newPermission = await permissionsModel.insertOne(data)


  return newPermission ? successRes(newPermission) : faildRes(newPermission)
}

// 合并用户权限 
export const mergeUserPermission = async (data: UserAuthentication & Permission) => {
  if (!hasKeys(data, 'token')) {
    return faildRes(MISSING_PARAMS)
  }

  const { token, name, ...permissionWithAccount } = data

  try {
    const { account } = jwtVerify(token)

    const hasPermission = await permissionsModel.findOne({ account })

    if (hasPermission) {
      
      const res = await permissionsModel.findOneAndUpdate({account}, {$set: deepMergeObject(hasPermission, permissionWithAccount)})

      return res ? successRes(res) : faildRes(res)      
    } else {
      
      const res = await permissionsModel.insertOne(Object.assign(permissionWithAccount, {account}))

      return res ? successRes(res) : faildRes(res)
    }

  } catch {
    return faildRes(INVALID_JWT)
  }



}

// 获取用户权限
export const getUserPermission = async (data: UserAuthentication) => {
  if (!hasKeys(data, 'token')) {
    return faildRes(MISSING_PARAMS)
  }

  try {
    const { account } = jwtVerify(data.token)

    const hasPermission = await permissionsModel.findOne({ account })

    return hasPermission ? successRes(hasPermission) : successRes(defaultPermission) 
    

  } catch {
    return faildRes(INVALID_JWT)
  }

}

