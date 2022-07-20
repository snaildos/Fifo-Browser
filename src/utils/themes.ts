/* Copyright (c) 2021-2022 SnailDOS */

import { lightTheme, darkTheme, blueTheme, lavTheme } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'wexond-light') return lightTheme;
  else if (name === 'wexond-dark') return darkTheme;
  else if (name === 'fifo-blue') return blueTheme;
  else if (name === 'fifo-lavender') return lavTheme;
  return darkTheme;
};
