// storageService.js
export const storageService = {
    query,
    get,
    post,
    put,
    remove
  };
  
  function query(key) {
    return new Promise((resolve, reject) => {
      try {
        const data = JSON.parse(localStorage.getItem(key)) || [];
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  
  function get(key, entityId) {
    return query(key).then(entities =>
      entities.find(entity => entity._id === entityId)
    );
  }
  
  function post(key, newItem) {
    return query(key).then(entities => {
      newItem._id = Date.now().toString(); // Replace with your ID generation logic
      entities.push(newItem);
      localStorage.setItem(key, JSON.stringify(entities));
      return newItem;
    });
  }
  
  function put(key, updatedItem) {
    return query(key).then(entities => {
      const index = entities.findIndex(entity => entity._id === updatedItem._id);
      if (index !== -1) {
        entities[index] = updatedItem;
        localStorage.setItem(key, JSON.stringify(entities));
        return updatedItem;
      } else {
        throw new Error(`Item with ID ${updatedItem._id} not found.`);
      }
    });
  }
  
  function remove(key, entityId) {
    return query(key).then(entities => {
      const updatedEntities = entities.filter(entity => entity._id !== entityId);
      localStorage.setItem(key, JSON.stringify(updatedEntities));
    });
  }
  