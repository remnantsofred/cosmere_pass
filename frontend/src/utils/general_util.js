export const getItemByID = (itemId, items) =>{
  for (const item of items){
    if (item.id === itemId) {
      return item
    } 
  }
}