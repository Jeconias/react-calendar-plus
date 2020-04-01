/**
 * Get a element from localStorage
 *
 * @param key string
 *
 * @return string | object| null
 */
const lsGet = (key: string): string | object | null => {
  const element = localStorage.getItem(key);
  if (element === null) return null;

  return JSON.parse(element);
};

/**
 * Add new element in localStorage
 *
 * @param key string
 * @param value string | object
 *
 * @return void
 */
const lsSet = (key: string, value: string | object) =>
  localStorage.setItem(key, JSON.stringify(value));

/**
 * Update a element of localStorage if exist
 *
 * @param key
 * @param value
 *
 * @return boolean
 */
const lsUpdate = (key: string, value: string | object): boolean => {
  const element: string | object = lsGet(key);
  if (element === null) return false;

  if (element !== 'object') {
    lsSet(key, value);
    return true;
  }

  if (Array.isArray(element)) {
    element.push(value);
    lsSet(key, value);
    return true;
  }

  lsSet(key, {
    ...(element as {}),
    ...(value as {}),
  });
  return true;
};

export { lsGet, lsSet, lsUpdate };
