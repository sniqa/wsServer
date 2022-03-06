import { ObjectId, WithId } from 'mongodb';
import { faildRes, successRes } from '../../errorHandler';
import { ACCOUNT_OR_PASSWORD_ERROR, INVALID_JWT, MISSING_PARAMS, NO_PROMISSION, USER_ALREADY_EXIST, USER_NOT_EXIST } from '../../errorTypes';
import db from '../../mongodb';
import { deepMergeObject, hasKeys } from '../../share';
import { LoginProps, ResponseSlice, UserAuthentication, UserInfo } from '../../types';
import { jwtSign, jwtVerify } from './jwt';

const USERS_COLLECTION = 'users'

const usersModel = db.collection<UserInfo>(USERS_COLLECTION)

// 用户存在则登陆，不存在则创建
// export const loginOrCreate = async (data: LoginProps) => {
//   if (!hasKeys(data, 'account', 'password')) {
//     return faildRes(MISSING_PARAMS)
//   }

//   const { account, password } = data

//   const hasUser = await usersModel.findOne({ account })

//   return hasUser ? await login(data, hasUser) : await createUser(data)
// }

// 登陆
export const login = async (loginInfo: LoginProps) => {
  if (!hasKeys(loginInfo, 'account', 'password')) {
    return faildRes(MISSING_PARAMS)
  }

  const { account, password } = loginInfo

  const hasUser = await usersModel.findOne({ account })

  if (!hasUser) {
    return faildRes(USER_NOT_EXIST)
  }

  if (password != hasUser?.password) {
    return faildRes(ACCOUNT_OR_PASSWORD_ERROR)
  }

  const token = jwtSign({ account: hasUser.account })

  return successRes({ token, _id: hasUser._id })
}

// 创建用户
export const createUser = async (data: LoginProps) => {
  if (!hasKeys(data, 'account', 'password')) {
    return faildRes(MISSING_PARAMS)
  }

  const { account, password } = data

  const hasUser = await usersModel.findOne({ account })

  if (hasUser) {
    return faildRes(USER_ALREADY_EXIST)
  }

  const { insertedId: _id } = await usersModel.insertOne(data)

  const token = jwtSign({ account: data.account })

  return successRes({ token, _id })
}

// 查找用户
export const findUser = async (data: object & ResponseSlice) => {
  const { _limit = 30, _skip, _page = 0 } = data
  
  return await usersModel.find().project({'password': 0}).limit(_limit).skip(_page * _limit).toArray()
}

// 删除用户
export const deleteUser = async (data: { target: UserInfo } & UserAuthentication ) => {
  if (!hasKeys(data, 'token', 'target')) {
    return faildRes(MISSING_PARAMS)
  }

  const { token, target } = data
  
  try {
    const { account } = jwtVerify(token)

    if (!account) {

      return faildRes(NO_PROMISSION)
    }
    
  } catch (res) {
    
    return faildRes(INVALID_JWT)
  }

  
  // 鉴权模块
  // some code

  const res = await usersModel.findOneAndDelete(target)

  return res ? successRes(res) : faildRes(res) 
}


//用户信息修改

export const modifyUserInfo = async (data: WithId<UserInfo> & UserAuthentication) => {
  if (!hasKeys(data, 'token', '_id')) {
    return faildRes(MISSING_PARAMS)
  }

  const { token, _id, ...update } = data

  try {
    const { account } = jwtVerify(token)

    if (!account) {

      return faildRes(NO_PROMISSION)
    }
    
  } catch (res) {
    
    return faildRes(INVALID_JWT)
  }

  // 鉴权模块
  // some code

  const userInfo = await usersModel.findOne({_id: new ObjectId(_id)})  

  if (!userInfo) {
    return faildRes(USER_NOT_EXIST)
  }

  const {_id: id, ...info} = userInfo


  const res = await usersModel.updateOne({_id: new ObjectId(_id)}, { $set: deepMergeObject(info, update) })

  return res ? successRes(res) : faildRes(res)
}

