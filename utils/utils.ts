export function saveDataToSessionStorage<T>(key: string, data: T): void {
  try {
    const jsonData = JSON.stringify(data);
    sessionStorage.setItem(key, jsonData);
  } catch (error) {
    console.error('Error saving data to sessionStorage:', error);
  }
}

export function updateSessionStorage<T>(key: string, data: T): void {
  try {
    let sessionData = getDataFromSessionStorage(key);
    if (sessionData) {
      sessionData = { ...sessionData, ...data };
    } else {
      sessionData = { ...data };
    }

    saveDataToSessionStorage(key, sessionData);
  } catch (error) {
    console.error('Error updating sessionStorage:', error);
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

export function savePaybackDataToSessionStorage<T>(key: string, data: T): void {
  try {
    const jsonData = JSON.stringify(data);
    sessionStorage.setItem(key, jsonData);
  } catch (error) {
    console.error('Error saving data to sessionStorage:', error);
  }
}

export function getPaybackDataFromSessionStorage<T>(key: string): T | null {
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
