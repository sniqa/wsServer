import { WebSocketServer } from 'ws';
import * as IpAddressControllers from './controller/ipAddress';
import * as netTypeControllers from './controller/netType';
import * as permissionControllers from './controller/permission';
import * as userCotrollers from './controller/user';
import { faildRes } from './errorHandler';
import { dispatch, register } from './jsonRouter';

register(userCotrollers)
register(netTypeControllers)
register(permissionControllers)
register(IpAddressControllers)

const wss = new WebSocketServer({
  port: 8888,
  path: '/ws',
  
})

wss.on('connection', async (ws, _req) => {

  
  ws.on('message', async (data) => {
    
    try {
      const res = await dispatch(JSON.parse(data.toString())).catch(res => faildRes({
        errcode: 1007,
        errmsg: res
      }))

      ws.send(JSON.stringify(res))
    } catch {
      
    }
  })
})

console.log('hello')

