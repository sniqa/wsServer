import { Permission } from "../../types";

interface AdminPermission {
  systemManage: boolean,
}

export const adminPermission: Permission = {
  name: 'admin',
  systemManage: true,
  view: {
    home: true,
    chat: true,
    category: true,
    manage: {
      netManage: true,
      ipManage: true,
      userManage: true,
    }
  },
  action: {
    user: {
      login: true,
      createUser: true,
      findUser: true,
      deleteUser: true,
      modifyUserInfo: true,
    },
    netType: {
      createNetType: true,
      deleteNetType: true,
      modifyNetType: true,
    }
    
  }
}


// 普通用户的权限
export const defaultPermission: Permission = {
  name: 'default',
  systemManage: false,
  view: {
    home: true,
    chat: true,
    category: true,
    manage: {
       netManage: false,
      ipManage: false,
      userManage: false,
    }
  },
  action: {
    user: {
      login: true,
      createUser: false,
      findUser: true,
      deleteUser: false,
      modifyUserInfo: true,
    },
    netType: {
      createNetType: false,
      deleteNetType: false,
      modifyNetType: false,
    }
    
  }
}