'use client'
import React, { useRef, useEffect, useState } from 'react';


interface TileImageProps {
  tileIndex: number; // Tile index passed in as a prop
}

const TileImage: React.FC<TileImageProps> = ({ tileIndex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tiles, setTiles] = useState<string[]>([]);

  const TILE_SIZE = 32; // Tile size in pixels (32x32)
  const SCALE_FACTOR = 1; // Scale the image by 4 times

  useEffect(() => {
    const img = new Image();
    img.src = '/creatures.png'; // Replace with your image path
    img.onload = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Calculate the scaled image dimensions
          const scaledWidth = img.width * SCALE_FACTOR;
          const scaledHeight = img.height * SCALE_FACTOR;

          // Resize canvas to match the scaled image dimensions
          canvas.width = scaledWidth;
          canvas.height = scaledHeight;

          // Draw the scaled image onto the canvas
          ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

          // Split the scaled image into tiles
          const tilesArray: string[] = [];
          for (let y = 0; y < scaledHeight; y += TILE_SIZE) {
            for (let x = 0; x < scaledWidth; x += TILE_SIZE) {
              // Create a canvas for each tile
              const tileCanvas = document.createElement('canvas');
              tileCanvas.width = TILE_SIZE;
              tileCanvas.height = TILE_SIZE;
              const tileCtx = tileCanvas.getContext('2d');

              if (tileCtx) {
                tileCtx.imageSmoothingEnabled = true;
                // Copy the tile area from the scaled canvas
                tileCtx.drawImage(
                  canvas,
                  x,
                  y,
                  TILE_SIZE,
                  TILE_SIZE,
                  0,
                  0,
                  TILE_SIZE,
                  TILE_SIZE
                );
                // Get base64 data URL of the tile and store it
                tilesArray.push(tileCanvas.toDataURL());
              }
            }
          }

          setTiles(tilesArray); // Store all tile images as base64 strings
        }
      }
    };
  }, []);


  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      <div style={{ marginTop: '20px' }}>
        {tileIndex !== null && tiles[tileIndex] ? (
          <img src={tiles[tileIndex * 2]} alt={`Tile ${tileIndex * 2}`} width={TILE_SIZE * SCALE_FACTOR} height={TILE_SIZE * SCALE_FACTOR} />
        ) : (
          <p>Please enter a valid tile index.</p>
        )}
      </div>
    </div>
  );
};

export default TileImage;
