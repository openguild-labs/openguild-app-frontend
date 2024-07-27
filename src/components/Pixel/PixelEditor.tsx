import { useAccount } from "@particle-network/connect-react-ui";
import React, { useEffect, useRef, useState } from "react";
import Pixel from "./Pixel";
import { BitmapMethod, NFT_BITMAP, TINY_CAT_NFT_COLOR_KIT } from "./bitmap/nft";

type Props = {
  rows: number;
  cols: number;
};

export const emptyArray = (size: number, defaultValue?: any) => new Array(size).fill(defaultValue !== undefined ? defaultValue : undefined);

const PixelEditor = ({ cols }: Props) => {
  const [nfts, setNfts] = useState<React.ReactNode[]>([]);
  const buildGridFromMethod = (layerMethod: string, generatedLayer: Record<string, any>, index: any) => {
    const methods = (NFT_BITMAP as any)[layerMethod] as BitmapMethod[];
    const method = methods[index > methods.length - 1 ? methods.length - 1 : index] as BitmapMethod;
    const layerColorKit = (TINY_CAT_NFT_COLOR_KIT as any)(account as any)[layerMethod];
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
    return Object.keys(NFT_BITMAP).map((layerMethod, index) => {
      const { trackedCells } = buildGridFromMethod(
        layerMethod,
        generatedLayers,
        +"0x6A882122e955c689cD21F3447E208615b6faE005".replace(/\D/g, "").charAt(index)
      );
      return (
        <div key={index} style={{ position: "relative" }}>
          <div key={index} style={{ position: "absolute", top: 0 }}>
            {[1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7].map((_, rowIndex) => (
              <div key={rowIndex} className="flex">
                {emptyArray(cols).map((_, colIndex) => {
                  return (
                    <div key={colIndex}>
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
    setNfts([
      ...nfts,
      <div key={nfts.length} style={{ width: cols * 12, height: cols * 12 }}>
        {component}
      </div>,
    ]);
  };

  // const intervalRef = useInterval(() => {
  //   if (nfts.length < 0) {
  //     handleGenerate();
  //   } else {
  //     window.clearInterval(intervalRef.current);
  //   }
  // }, 600);
  const account = useAccount();
  useEffect(() => {
    if (account) handleGenerate();
  }, [account]);
  const printRef = useRef(null);

  return <div ref={printRef}>{nfts}</div>;
};

export default PixelEditor;
