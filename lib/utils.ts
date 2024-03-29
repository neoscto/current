export const dataURLToUint8Array = (dataURL: string): Uint8Array => {
  const base64String = dataURL.replace(/^data:.+;base64,/, '');
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
};

export const formatNumber = (num: number) => {
  // Round the number to two decimal places
  let roundedNum = Math.round(num * 100) / 100;

  // Convert the number to a string and split it into whole and decimal parts
  let parts = roundedNum.toString().split('.');

  // Add the missing decimal zeros if necessary
  if (parts.length === 1) {
    parts.push('00');
  } else if (parts[1].length === 1) {
    parts[1] += '0';
  }

  // Replace the thousand separators in the whole part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Return the number with a comma as the decimal point
  return parts[0] + ',' + parts[1];
};

export const formatChartValue = (num: number) => {
  let parts = num.toString().split('.');

  // Replace the thousand separators in the whole part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // If there is a decimal part, join it back with a comma
  return parts.length > 1 ? parts[0] + ',' + parts[1] : parts[0];
};

export const spanishMonths = [
  { name: 'Enero', index: 1 },
  { name: 'Febrero', index: 2 },
  { name: 'Marzo', index: 3 },
  { name: 'Abril', index: 4 },
  { name: 'Mayo', index: 5 },
  { name: 'Junio', index: 6 },
  { name: 'Julio', index: 7 },
  { name: 'Agosto', index: 8 },
  { name: 'Septiembre', index: 9 },
  { name: 'Octubre', index: 10 },
  { name: 'Noviembre', index: 11 },
  { name: 'Diciembre', index: 12 }
];

export const chartPageVerticalPositions = (itemsPerLevel: number) => {
  const levels = [550, 400, 250, 100];
  const positions: number[] = [];

  levels.forEach((level) => {
    for (let i = 0; i < itemsPerLevel; i++) {
      positions.push(level);
    }
  });
  return positions;
};

export const chartPageHorizontalPositions = [50, 225, 400];
