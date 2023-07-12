export const sortByMostRecentlyUpdated = (items)=>{
  let sortedItems = items.sort((item1, item2) => {
    if (item1.updated_at < item2.updated_at) {
      return 1
    } else if (item1.updated_at > item2.updated_at) {
      return -1
    } else if (item1.created_at < item2.created_at){
      return 1
    } else if (item1.created_at > item2.created_at) {
      return -1
    } else {
      return 0
    }
  })
  return sortedItems;
}

export const sortByEarliestToLatestStartTime = (items) => {
  let sortedItems = items.sort((item1, item2) => {
    if (item1.startTime > item2.startTime) {
      return 1
    } else if (item1.startTime < item2.startTime){
      return -1
    } else {
      return 0
    }
  })

  return sortedItems;
}

export const sortByMostRecentStartTime = (items) => {
  let sortedItems = items.sort((item1, item2) => {
    if (item1.startTime < item2.startTime) {
      return 1
    } else if (item1.startTime > item2.startTime){
      return -1
    } else {
      return 0
    }
  })

  return sortedItems;
}