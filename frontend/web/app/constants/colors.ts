// Paleta de cores do projeto

// Cores Base
export const BASE_COLORS = {
  beige: '#FDE5DA',
  teal: '#4EF7D2',
  mintGreen: '#A8F1DD',
  darkGreen: '#1B8850',
} as const;

// Cores Neutras
export const NEUTRAL_COLORS = {
  white: '#FFFFFF',
  gray100: '#bebebd',
  gray200: '#9e9e9d',
  gray300: '#888',
  gray400: '#333',
  gray500: '#1B1B1B',
  black: '#000000',
} as const;

// Cores Materiais (Componentes)
export const MATERIAL_COLORS = {
  brown: '#6E3233',
  pink: '#39a43',
  tan: '#c6c29c',
  purple: '#67a067',
  darkBlue: '#3f5b04',
  blue: '#619f3',
  lightBlue: '#c1ef4f',
  cyan: '#00e008',
  aqua: '#fec514',
  green: '#fec516',
  lightGreen: '#ff5a3b',
  lime: '#ffd107',
  yellow: '#ee3b35',
  gold: '#ff8c01',
  orange: '#ff7721',
  darkBrown: '#7f3d4a',
  mediumGray: '#9d9e9d',
  slate: '#6d7d88',
} as const;

// Cores combinadas para fácil acesso
export const COLORS = {
  ...BASE_COLORS,
  ...NEUTRAL_COLORS,
  ...MATERIAL_COLORS,
} as const;

