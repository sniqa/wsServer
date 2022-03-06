import { faildRes } from './errorHandler'
import { CONTROLLER_NOT_EXIST, REQUIRED_JSON } from './errorTypes'
import { isObject } from './share'

const controllerMap = new Map<string, Function>()

export const register = (target: object) => {
  Object.entries(target).forEach(([key, val]) => controllerMap.set(key, val))
}

export const dispatch = async (target: object) => {
  
  if (!isObject(target)) {
    return faildRes(REQUIRED_JSON)
  }

  const result = {}

  const requestArr = Object.entries(target)

  await Promise.all(
    requestArr.map(async ([controller, query]) => {
      if (controllerMap.has(controller)) {
        const ctl = controllerMap.get(controller) as Function

        return Reflect.set(result, controller, await ctl(query))
      } else {
        return Reflect.set(result, controller, faildRes(CONTROLLER_NOT_EXIST))
      }
    })
  )

  return result
}
