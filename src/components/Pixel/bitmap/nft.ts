import { emptyArray } from "../PixelEditor";
import {
  generateLightColor,
  generateRandomColor,
  // generateRandomDarkColor,
} from "../../../utils";

export type BitmapMethod = (color: string) => {
  grid: (string | number)[][];
  startAt: {
    row: number;
    col: number;
  };
};

export const TINY_CAT_NFT_SIZE = { rows: 14, cols: 14 };
export const TINY_CAT_NFT_COLOR_KIT: Record<string, string | (() => string)> = {
  generateBackground: generateLightColor,
  generateBodyBase: generateLightColor,
  generateBodyAccessories: generateLightColor,
  generateEyes: generateRandomColor,
  generateMouth: generateLightColor,
  generateShirt: generateRandomColor,
  generateHandAccessories: generateRandomColor,
  generateHand: "generateBodyBase",
};

export const NFT_BITMAP: Record<string, BitmapMethod[]> = {
  generateBackground: [
    (x: string) => ({
      grid: emptyArray(
        TINY_CAT_NFT_SIZE.rows,
        emptyArray(TINY_CAT_NFT_SIZE.cols, x)
      ),
      startAt: {
        row: 0,
        col: 0,
      },
    }),
  ],
  generateBodyBase: [
    (x: string) => ({
      grid: [
        [0, 0, 0, 0],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, 0, 0, x],
      ],
      startAt: {
        row: 3,
        col: 5,
      },
    }),
    (x: string) => ({
      grid: [
        [0, x, 0, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, 0, 0, x],
      ],
      startAt: {
        row: 3,
        col: 5,
      },
    }),
    (x: string) => ({
      grid: [
        [x, 0, 0, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, 0, 0, x],
      ],
      startAt: {
        row: 3,
        col: 5,
      },
    }),
    (x: string) => ({
      grid: [
        [0, x, x, 0],
        [0, 0, x, 0],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [x, 0, 0, x],
      ],
      startAt: {
        row: 2,
        col: 5,
      },
    }),
    (x: string) => ({
      grid: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, x, x, x, x, 0],
        [x, x, x, x, x, x],
        [0, x, x, x, x, 0],
        [0, x, x, x, x, 0],
        [0, x, x, x, x, 0],
        [0, x, x, x, x, 0],
        [0, x, 0, 0, x, 0],
      ],
      startAt: {
        row: 2,
        col: 4,
      },
    }),
  ],
  generateEyes: [
    (x: string) => ({
      grid: [
        [0, 0, 0, 0],
        [x, 0, x, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      startAt: {
        row: 4,
        col: 5,
      },
    }),
    (x: string) => ({
      grid: [
        [0, 0, 0, 0],
        [x, x, x, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      startAt: {
        row: 4,
        col: 5,
      },
    }),
  ],
  generateMouth: [
    () => ({
      grid: [[0]],
      startAt: {
        row: 0,
        col: 0,
      },
    }),
    (x: string) => ({
      grid: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, x, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      startAt: {
        row: 4,
        col: 5,
      },
    }),
  ],
  generateShirt: [
    () => ({
      grid: [[0]],
      startAt: {
        row: 0,
        col: 0,
      },
    }),
    (x: string) => ({
      grid: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [x, x, x, x],
        [x, x, x, x],
        [x, x, x, x],
        [0, 0, 0, 0],
      ],
      startAt: {
        row: 4,
        col: 5,
      },
    }),
    (x: string) => ({
      grid: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, x, x],
        [0, x, x, x],
        [x, x, x, x],
        [0, 0, 0, 0],
      ],
      startAt: {
        row: 4,
        col: 5,
      },
    }),
    (x: string) => ({
      grid: [
        [0, x, x, x, x, 0],
        [x, 0, 0, 0, 0, x],
        [x, 0, 0, 0, 0, x],
        [x, 0, 0, 0, 0, x],
        [0, x, x, x, x, 0],
        [0, x, x, x, x],
        [0, x, x, x, x],
        [0, x, 0, 0, x],
      ],
      startAt: {
        row: 3,
        col: 4,
      },
    }),
  ],
  generateBodyAccessories: [
    () => ({
      grid: [[0]],
      startAt: {
        row: 0,
        col: 0,
      },
    }),
    (x: string) => ({
      grid: [[x, x, x, x]],
      startAt: {
        row: 7,
        col: 5,
      },
    }),
    (x: string) => ({
      grid: [
        [x, 0, 0],
        [x, x, 0],
        [x, x, 0],
      ],
      startAt: {
        row: 7,
        col: 9,
      },
    }),
  ],
  generateHand: [
    (x: string) => ({
      grid: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [x, 0, 0, 0, x],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      startAt: {
        row: 4,
        col: 4,
      },
    }),
    (x: string) => ({
      grid: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [x, 0, 0, 0, 0, x],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
      startAt: {
        row: 4,
        col: 4,
      },
    }),
  ],
  generateHandAccessories: [
    () => ({
      grid: [[0]],
      startAt: {
        row: 0,
        col: 0,
      },
    }),
    (x: string) => ({
      grid: [[x], [x], [x], [x], [x]],
      startAt: {
        row: 5,
        col: 3,
      },
    }),
    (x: string) => ({
      grid: [
        [x, x, x],
        [0, 0, x],
      ],
      startAt: {
        row: 7,
        col: 2,
      },
    }),
  ],
};
