import React, { useEffect, useState } from "react";
import { getRandomArrIndex } from "../../utils";
import Pixel from "./Pixel";
import { BitmapMethod, NFT_BITMAP, TINY_CAT_NFT_COLOR_KIT } from "./bitmap/nft";

type Props = {
  rows: number;
  cols: number;
};

function useInterval(callback: () => any, delay: number) {
  const intervalRef = React.useRef<any>();
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(() => callbackRef.current(), delay);

      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
}

export const emptyArray = (size: number, defaultValue?: any) => new Array(size).fill(defaultValue !== undefined ? defaultValue : undefined);

const PixelEditor = ({ cols }: Props) => {
  const [nfts, setNfts] = useState<React.ReactNode[]>([]);
  const buildGridFromMethod = (layerMethod: string, generatedLayer: Record<string, any>) => {
    const methods = (NFT_BITMAP as any)[layerMethod] as BitmapMethod[];
    console.log(getRandomArrIndex(methods));
    const method = methods[getRandomArrIndex(methods)] as BitmapMethod;
    const layerColorKit = (TINY_CAT_NFT_COLOR_KIT as any)[layerMethod];
    generatedLayer[layerMethod] = typeof layerColorKit === "string" ? generatedLayer[layerColorKit] : layerColorKit();
    const { grid, startAt } = method(generatedLayer[layerMethod]);

    const trackedCells: Record<string, string | number> = {};
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        trackedCells[`${r + startAt.row}:${c + startAt.col}`] = grid[r][c];
      }
    }

    return { trackedCells };
  };

  const renderOneNftLayers = () => {
    const generatedLayers = {};
    return Object.keys(NFT_BITMAP).map((layerMethod) => {
      const { trackedCells } = buildGridFromMethod(layerMethod, generatedLayers);
      return (
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 0 }}>
            {[1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7].map((_, rowIndex) => (
              <div className="flex">
                {emptyArray(cols).map((_, colIndex) => {
                  return (
                    <div>
                      <Pixel color={trackedCells[`${rowIndex}:${colIndex}`] as string} style={{ fontSize: "2px" }}></Pixel>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  const handleGenerate = () => {
    const component = renderOneNftLayers();
    setNfts([...nfts, <div style={{ width: cols * 12, height: cols * 12 }}>{component}</div>]);
  };

  const intervalRef = useInterval(() => {
    if (nfts.length < 0) {
      handleGenerate();
    } else {
      window.clearInterval(intervalRef.current);
    }
  }, 600);

  useEffect(() => {
    handleGenerate();
  }, []);

  return <div>{nfts}</div>;
};

export default PixelEditor;
