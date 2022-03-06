export const isObject = (target: any) => typeof target === "object"
export const isArray = (target: any) => Array.isArray(target)
export const hasKeys = (target: object, ...keys: string[]) => keys.every((key) => Reflect.has(target, key))
export const deepMergeObject = (target: object, update: object) => {

  Object.entries(update).forEach(([key, val]) => {
    if (isObject(val)) {
      const subKey = Reflect.get(target, key)


      return subKey && isObject(subKey) ? deepMergeObject(subKey, val) : Reflect.set(target, key, val)
    } else {
     return Reflect.set(target, key, val)
    }
  })
  
  return target
}