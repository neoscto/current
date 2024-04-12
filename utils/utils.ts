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

export function removeDataFromSessionStorage(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data from sessionStorage:', error);
  }
}

export const validateCUPS = (cups: string): boolean | string => {
  const cupsArray = cups.toUpperCase().replace(/\s/g, '').split(',');

  for (const cup of cupsArray) {
    if (!cup.startsWith('ES')) {
      return cupsArray.length === 1
        ? 'You made a mistake in your CUPS, please enter a valid CUPS'
        : 'You made a mistake in at least one of your CUPS, please enter valid CUPS';
    }
    if (cup.length > 22) {
      return 'You’ve entered more than one CUPS, please separate your CUPS with commas';
    }

    // Check if the length is either 20 or 22 characters
    if (cup.length !== 20 && cup.length !== 22) {
      return cupsArray.length === 1
        ? 'You made a mistake in your CUPS, please enter a valid CUPS'
        : 'You made a mistake in at least one of your CUPS, please enter valid CUPS';
    }
  }
  return true;
};

export enum PLAN_TYPE {
  Neos = 'neos',
  Current = 'current'
}

export function addOneYearToDate(dateStr: string) {
  // Parse the input date string into a Date object
  const date = new Date(dateStr);
  date.setFullYear(date.getFullYear() + 1);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const newDateStr = `${year}-${month}-${day}`;
  return newDateStr;
}

export const validateIBAN = (iban: string): boolean | string => {
  if (iban.length !== 24) {
    return 'Invalid IBAN length';
  }
  const spainIbanRegex = /^ES\d{2}\d{20}$/;
  if (!spainIbanRegex.test(iban)) {
    return 'Invalid IBAN';
  }
  return true;
};

export const validateBIC = (bic: string): boolean | string => {
  if (bic.length < 8 || bic.length > 11) {
    return 'Invalid BIC length';
  }
  const bicRegex = /^[A-Za-z]{4}[A-Za-z]{2}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/;
  if (!bicRegex.test(bic)) {
    return 'Invalid BIC';
  }
  return true;
};
