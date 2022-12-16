/* Copyright (c) 2021-2022 SnailDOS */

import {
  lightTheme,
  darkTheme,
  amoledTheme,
  blueTheme,
  lavTheme,
} from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'wexond-light') return lightTheme;
  else if (name === 'wexond-dark') return darkTheme;
  else if (name === 'fifo-blue') return blueTheme;
  else if (name === 'fifo-lavender') return lavTheme;
  else if (name === 'fifo-amoled') return amoledTheme;
  return darkTheme;
};
