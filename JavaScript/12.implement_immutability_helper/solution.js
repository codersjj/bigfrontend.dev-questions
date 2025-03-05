function isObject(val) {
  return typeof val === 'object' && val !== null
}

/**
 * @param {any} data
 * @param {Object} command
 */
function update(data, command) {
  // your code here
  if ('$push' in command) {
    // if (!Array.isArray(data)) {
    //   throw new Error('not array')
    // }
    return [...data, ...command['$push']]
  }

  if ('$set' in command) {
    return command['$set']
  }

  if ('$merge' in command) {
    if (!isObject(data)) {
      throw new Error('not object for $merge')
    }
    return { ...data, ...command['$merge'] }
  }

  if ('$apply' in command) {
    return command['$apply'](data)
  }

  // if (!isObject(data)) {
  //   throw new Error('not object')
  // }

  const newData = Array.isArray(data) ? [...data] : { ...data }
  for (const key of Object.keys(command)) {
    newData[key] = update(data[key], command[key])
  }

  return newData
}
