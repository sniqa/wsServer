import { ObjectId, WithId } from 'mongodb';
import db from '../../mongodb';
import { IpAddressInfo, UserAuthentication } from '../../types';
import { faildRes, successRes } from './../../errorHandler';
import { INVALID_JWT, MISSING_PARAMS, NOT_FOUND } from './../../errorTypes';
import { deepMergeObject, hasKeys } from './../../share';
import { jwtVerify } from './../user/jwt';

const IP_ADDRESS_COLLECTION = 'ipAddress'

const ipAddressModel = db.collection<IpAddressInfo>(IP_ADDRESS_COLLECTION)

// 创建ip地址
export const createIpAddress = async (data: UserAuthentication & IpAddressInfo) => {
  if (!hasKeys(data, 'token', 'account', 'ipAddress', 'netType')) {
    return faildRes(MISSING_PARAMS)
  }

  const { token, ...ipAddress } = data

  try {
    const { account } = jwtVerify(token)
    
    const res = await ipAddressModel.insertOne(ipAddress)

    return res ? successRes(res) : faildRes(res)

  } catch {
    return faildRes(INVALID_JWT)
  }

}

// 删除ip地址
export const deleteIpAddress = async (data: UserAuthentication & WithId<IpAddressInfo>) => {
  if (!hasKeys(data, 'token', '_id')) {
    return faildRes(MISSING_PARAMS)
  }

  const { token, _id } = data

  try {
    const { account } = jwtVerify(token)
    
    const res = await ipAddressModel.deleteOne({ _id: new ObjectId(_id) })

    return res ? successRes(res) : faildRes(res)

  } catch {
    return faildRes(INVALID_JWT)
  }

}

// 变更ip地址
export const modifyIpAddress = async (data: UserAuthentication & WithId<IpAddressInfo>) => {
  if (!hasKeys(data, 'token', '_id')) {
    return faildRes(MISSING_PARAMS)
  }

  const { token, _id, ...ipAddressSlice } = data

  try {
    const { account } = jwtVerify(token)
    
    const oldIpAddress = await ipAddressModel.findOne({ _id: new ObjectId(_id) })

    if (oldIpAddress) {
      
      const newIpAddress = await ipAddressModel.updateOne({ _id: new ObjectId(_id) }, {$set: deepMergeObject(oldIpAddress, ipAddressSlice)})

      return successRes(newIpAddress)
    } else {
      return faildRes(NOT_FOUND)
    }


  } catch {
    return faildRes(INVALID_JWT)
  }

}


// 查找ip地址
export const findIpAddress = async () => {
  const res = await ipAddressModel.find().toArray()

  return successRes(res)
}