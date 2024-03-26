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

export function updatePaybackSessionStorage<T>(key: string, data: T): void {
  try {
    let sessionData = getPaybackDataFromSessionStorage(key);
    if (sessionData) {
      sessionData = { ...sessionData, ...data };
    } else {
      sessionData = { ...data };
    }

    savePaybackDataToSessionStorage(key, sessionData);
  } catch (error) {
    console.error('Error updating sessionStorage:', error);
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

export const POWER_PRICES: any = {
  '2.0TD': {
    P1: 25.383055,
    P2: 1.342713,
    P3: 0.0,
    P4: 0.0,
    P5: 0.0,
    P6: 0.0
  },
  '3.0TD': {
    P1: 13.982509,
    P2: 11.899074,
    P3: 4.002045,
    P4: 3.653973,
    P5: 2.732707,
    P6: 2.001136
  },
  '6.1TD': {
    P1: 13.982509,
    P2: 11.899074,
    P3: 4.002045,
    P4: 3.653973,
    P5: 2.732707,
    P6: 2.001136
  },
  '6.2TD': {
    P1: 15.826387,
    P2: 14.660345,
    P3: 6.24435,
    P4: 4.918409,
    P5: 1.197731,
    P6: 0.751653
  },
  '6.3TD': {
    P1: 11.693507,
    P2: 10.378653,
    P3: 5.456201,
    P4: 4.251289,
    P5: 1.146336,
    P6: 0.789272
  },
  '6.4TD': {
    P1: 9.330085,
    P2: 7.722984,
    P3: 3.913267,
    P4: 3.073874,
    P5: 0.67228,
    P6: 0.497567
  },
  '3.0TDVE': {
    P1: 2.558984,
    P2: 2.503926,
    P3: 0.66441,
    P4: 0.573622,
    P5: 0.338303,
    P6: 0.338303
  },
  '6.1TDVE': {
    P1: 4.269983,
    P2: 4.002324,
    P3: 1.994267,
    P4: 1.599721,
    P5: 0.113126,
    P6: 0.113126
  }
};
