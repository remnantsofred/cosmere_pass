export const getItemByID = (itemId, items) =>{
  for (const item of items){
    if (item.id === itemId) {
      return item
    } 
  }
}

export const getParams = (params) => {
  const paramsString = params.slice(1)
  const paramsArray = paramsString.split('&')
  const paramsMap = {};
  for (const param of paramsArray){
    const [key, value] = param.split('=')
    paramsMap[key] = value
  } 
  return paramsMap;
}


