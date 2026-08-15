
// The three 90° rotation matrices, in CSS's coordinate system.
//
// These are NOT the textbook right-handed matrices: in CSS, +y points DOWN the
// screen, which flips the sense of the X and Z rotations. Using a textbook
// matrix here would leave the baked integer state disagreeing with the pixels
// the visitor just watched land, and the cube would visibly jump after a turn.
// Verified against the browser's own DOMMatrix for all three axes, both
// directions — see cubePermutation.test.js.
const ROTATION = {
  // rotateX(90deg): y → z, z → −y
  0: [
    [1, 0, 0],
    [0, 0, -1],
    [0, 1, 0],
  ],
  // rotateY(90deg): x → −z, z → x
  1: [
    [0, 0, 1],
    [0, 1, 0],
    [-1, 0, 0],
  ],
  // rotateZ(90deg): x → y, y → −x
  2: [
    [0, -1, 0],
    [1, 0, 0],
    [0, 0, 1],
  ],
};

export const IDENTITY = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

export const AXIS_FN = ['rotateX', 'rotateY', 'rotateZ'];

const transpose = m => m[0].map((_, i) => m.map(row => row[i]));

const multiply = (a, b) =>
  a.map(row => b[0].map((_, j) => row.reduce((sum, v, k) => sum + v * b[k][j], 0)));

const applyTo = (m, v) => m.map(row => row.reduce((sum, x, i) => sum + x * v[i], 0));

export const createCubies = () => {
  const cubies = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;
        // id is the *solved* position and never changes, so React keys stay
        // stable while pos moves. Keying by live position would make React
        // recycle DOM nodes between cubies mid-turn.
        cubies.push({ id: `${x},${y},${z}`, pos: [x, y, z], orient: IDENTITY });
      }
    }
  }
  return cubies;
};

export const layerMembers = (cubies, axis, slice) => cubies.filter(c => c.pos[axis] === slice);

export const applyTurn = (cubies, axis, slice, direction) => {
  const m = direction === 1 ? ROTATION[axis] : transpose(ROTATION[axis]);
  return cubies.map(c =>
    c.pos[axis] === slice ? { ...c, pos: applyTo(m, c.pos), orient: multiply(m, c.orient) } : c
  );
};


export const canTurnConcurrently = (a, b) => a.axis === b.axis && a.slice !== b.slice;
