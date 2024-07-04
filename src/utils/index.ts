import md5 from "md5";

export function generateLightColor(value?: any, index?: any) {
  if (value) {
    const hash = md5(value + index);
    // Extract parts of the hash to generate RGB values
    const red = parseInt(hash.substring(0, 2), 16) % 156 + 100; // Ensure a light color by starting from 100 to 255
    const green = parseInt(hash.substring(3, 5), 16) % 156 + 100;
    const blue = parseInt(hash.substring(8, 10), 16) % 156 + 100;

    // Convert the RGB values to hexadecimal format
    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");

    // Concatenate the hexadecimal values to form the color code
    const colorCode = `#${redHex}${greenHex}${blueHex}`;
    return colorCode;
  }
  // Generate random values for the red, green, and blue components
  const red = Math.floor(Math.random() * 156) + 100; // Ensure a light color by starting from 100 to 255
  const green = Math.floor(Math.random() * 156) + 100;
  const blue = Math.floor(Math.random() * 156) + 100;

  // Convert the RGB values to hexadecimal format
  const redHex = red.toString(16).padStart(2, "0");
  const greenHex = green.toString(16).padStart(2, "0");
  const blueHex = blue.toString(16).padStart(2, "0");

  // Concatenate the hexadecimal values to form the color code
  const colorCode = `#${redHex}${greenHex}${blueHex}`;

  return colorCode;
}

export function generateRandomColor(value?: any) {
  if (value) {
    const hash = md5(value);

    // Extract parts of the hash to generate RGB values
    const red = parseInt(hash.substring(0, 2), 16);
    const green = parseInt(hash.substring(2, 4), 16);
    const blue = parseInt(hash.substring(4, 6), 16);

    // Convert the RGB values to hexadecimal format
    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");

    // Concatenate the hexadecimal values to form the color code
    const colorCode = `#${redHex}${greenHex}${blueHex}`;

    return colorCode;
  }
  // Generate random values for the red, green, and blue components
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Convert the RGB values to hexadecimal format
  const redHex = red.toString(16).padStart(2, "0");
  const greenHex = green.toString(16).padStart(2, "0");
  const blueHex = blue.toString(16).padStart(2, "0");

  // Concatenate the hexadecimal values to form the color code
  const colorCode = `#${redHex}${greenHex}${blueHex}`;

  return colorCode;
}

export function darkenColor(color: string, percentage: number) {
  // Ensure the percentage is between 0 and 100
  percentage = Math.max(0, Math.min(percentage, 100));

  // Convert the hexadecimal color to RGB
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);

  // Calculate the darkened color components
  const darkenedR = Math.floor((r * (100 - percentage)) / 100);
  const darkenedG = Math.floor((g * (100 - percentage)) / 100);
  const darkenedB = Math.floor((b * (100 - percentage)) / 100);

  // Convert the darkened RGB values to hexadecimal format
  const darkenedHex =
    "#" +
    ((1 << 24) + (darkenedR << 16) + (darkenedG << 8) + darkenedB)
      .toString(16)
      .slice(1);

  return darkenedHex;
}

export function generateRandomDarkColor() {
  // Generate random values for the red, green, and blue components
  const red = Math.floor(Math.random() * 128);
  const green = Math.floor(Math.random() * 128);
  const blue = Math.floor(Math.random() * 128);

  // Convert the RGB values to hexadecimal format
  const redHex = red.toString(16).padStart(2, "0");
  const greenHex = green.toString(16).padStart(2, "0");
  const blueHex = blue.toString(16).padStart(2, "0");

  // Concatenate the hexadecimal values to form the color code
  const colorCode = `#${redHex}${greenHex}${blueHex}`;

  return colorCode;
}

export function getRandomArrIndex(list: any[]) {
  return Math.floor(Math.random() * list.length);
}
