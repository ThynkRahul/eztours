export function getLocalStorage(key: string, defaultValue: any) {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage key “${key}”:`, error);
    return defaultValue;
  }
}

export function setLocalStorage(key: string, value: any) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key “${key}”:`, error);
  }
}
