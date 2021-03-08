// From hivelings-ts
interface Config {
  j: number;
  k: number;
  m: number;
  defaultSeed: string;
}

export interface RngState {
  config: Config;
  sequence: number[];
}

export interface Rng {
  getState: () => RngState;
  getNext: () => number;
}

export const loadLaggedFibo = (state: RngState): Rng => {
  const { config } = state;
  let { sequence } = state;
  const { j, k, m } = config;

  return {
    getState: () => ({ sequence, config }),
    getNext: () => {
      const next = (sequence[j - 1] + sequence[k - 1]) % m;
      sequence = [next, ...sequence].slice(0, k);
      return next;
    }
  };
};

export const makeLaggedFibo = (config: Config) => (
  seed: string | number
): Rng => {
  const { defaultSeed, k } = config;
  const initialState = {
    sequence: [...seed.toString(), ...defaultSeed]
      .slice(0, k)
      .map((c) => c.charCodeAt(0)),
    config
  };

  const rng = loadLaggedFibo(initialState);
  // Discard the first couple random numbers
  for (let i = 0; i < 5000; ++i) {
    rng.getNext();
  }

  return rng;
};
export const makeStdLaggedFibo = makeLaggedFibo({
  j: 24,
  k: 55,
  defaultSeed: '!"j%BfBWsq&<c$_4)m78%qZw,y`x\\G79sJA;8"}|~zUETg|5v?^%0-/',
  m: Math.pow(2, 32)
});
export const int32 = (rng: Rng, lowerIncl: number, upperExcl: number) =>
  lowerIncl + (rng.getNext() % (upperExcl - lowerIncl));

export const pickRandom = <T>(rng: Rng, xs: T[]): T | null =>
  xs.length === 0 ? null : xs[int32(rng, 0, xs.length)];

export const sortBy = <T>(value: (x: T) => number, xs: T[]): T[] =>
  xs
    .map((x) => [x, value(x)] as [T, number])
    .sort((a, b) => a[1] - b[1])
    .map(([x]) => x);

export const takeWhile = <T>(pred: (x: T) => boolean, xs: T[]): T[] => {
  const i = xs.findIndex((x) => !pred(x));
  if (i === -1) {
    return xs;
  }
  return xs.slice(0, i);
};

export const range = (lower: number, upper: number) =>
  Array.from({ length: upper - lower }, (_, i) => i + lower);

export const toDeg = (radians: number): number =>
  (radians >= 0 ? (radians / Math.PI) * 180 : 360 - toDeg(-radians)) % 360;
