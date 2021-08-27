import { lightTheme, darkTheme, blueTheme } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'wexond-light') return lightTheme;
  else if (name === 'wexond-dark') return darkTheme;
  else if (name === 'wexond-blue') return blueTheme;
  return lightTheme;
};
