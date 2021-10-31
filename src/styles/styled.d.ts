import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    bgs: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    border: {
      primary: string;
      secondary: string;
    };
    fonts: {
      primary: string;
      secondary: string;
    };
    gradients: {
      primary: string;
      secondary: string;
    };
  }
}
