// should be found in utils/petalUtils.ts
export function computePetalGeometry(angle: number, daisySize: number) {
    const PETAL_WIDTH = daisySize * 0.12;
    const PETAL_HEIGHT = daisySize * 0.2;
    const RADIUS = daisySize * 0.35;
  
    const radian = (angle * Math.PI) / 180;
    const petalX = Math.cos(radian) * RADIUS;
    const petalY = Math.sin(radian) * RADIUS;
    const petalRotation = angle + 90;
  
    return {
      PETAL_WIDTH,
      PETAL_HEIGHT,
      petalX,
      petalY,
      petalRotation,
    };
  }

// This function calculates the geometry of a petal based on its angle and the size of the daisy.
// It returns an object containing the width, height, x and y coordinates, and rotation angle of the petal.
