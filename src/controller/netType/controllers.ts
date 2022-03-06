import { ObjectId, WithId } from 'mongodb';
import { faildRes, successRes } from '../../errorHandler';
import { MISSING_PARAMS, NET_TYPE_NOT_EXIST, NET_TYPE_REPEAT } from '../../errorTypes';
import db from '../../mongodb';
import { deepMergeObject, hasKeys } from '../../share';
import { NetType, UserAuthentication } from '../../types';
import { jwtVerify } from '../user/jwt';

const NET_TYPES_COLLECTION = 'netTypes'

const netTypesModel = db.collection<NetType>(NET_TYPES_COLLECTION)

// 创建网络类型
export const createNetType = async (data: NetType & UserAuthentication) => {
  if (!hasKeys(data, 'token', 'name', 'ipStartAddr', 'ipEndAddr', 'subnetMask', 'gateway')) {
    return faildRes(MISSING_PARAMS)
  }

  const { token, ...newNetType } = data

  const { account } = jwtVerify(token)

  // 用户鉴权

  const hasNetType = await netTypesModel.findOne({ name: newNetType.name })
  
  if (hasNetType) {
    return faildRes(NET_TYPE_REPEAT)
  }

  const res = await netTypesModel.insertOne(newNetType)

  return res ? successRes(res) : faildRes(res)
}

// 删除网络类型
export const deleteNetType = async (data: { _id: string } & UserAuthentication) => {
  if (!hasKeys(data, '_id', 'token')) {
    return faildRes(MISSING_PARAMS)
  }

  const { account } = jwtVerify(data.token)

  // 用户鉴权

  const res = await netTypesModel.deleteOne({ _id: new ObjectId(data._id) })

  return res ? successRes(res) : faildRes(res)
}

// 变更网络类型
export const modifyNetType = async (data: WithId<NetType> & UserAuthentication) => {
  if (!hasKeys(data, '_id', 'token')) {
    return faildRes(MISSING_PARAMS)
  }

  const { _id, token, ...newNetTypeWhoutId } = data
  
  const { account } = jwtVerify(token)

  // 用户鉴权


  const oldNetType = await netTypesModel.findOne({ _id: new ObjectId(_id) })

  if (!oldNetType) {
    return faildRes(NET_TYPE_NOT_EXIST)
  }

  const {_id: id, ...oldNetTypeWhoutId} = oldNetType


  const newNetType = await netTypesModel.updateOne({ _id: new ObjectId(_id) }, { $set: deepMergeObject(oldNetTypeWhoutId, newNetTypeWhoutId) })

  return newNetType ? successRes(newNetType) : faildRes(newNetType) 
}