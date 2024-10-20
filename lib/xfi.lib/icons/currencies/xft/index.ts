import type { ThemeIcon } from '../../types';
import { default as XftDarkIcon } from './xft.dark.svg';
import { default as XftLightIcon } from './xft.light.svg';

const XftIcon: ThemeIcon = {
  dark: XftDarkIcon,
  light: XftLightIcon,
} as const;

export default XftIcon;
