export function saveDataToSessionStorage<T>(key: string, data: T): void {
  try {
    const jsonData = JSON.stringify(data);
    sessionStorage.setItem(key, jsonData);
  } catch (error) {
    console.error("Error saving data to sessionStorage:", error);
  }
}

export function getDataFromSessionStorage<T>(key: string): T | null {
  try {
    const jsonData = sessionStorage.getItem(key);
    if (jsonData === null) {
      return null;
    }
    const data = JSON.parse(jsonData);
    return data;
  } catch (error) {
    return null;
  }
}
