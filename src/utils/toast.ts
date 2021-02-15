import Snackbar from 'react-native-polar-snackbar';

import theme from '@theme';

const toast = {
  success: (text: string) =>
    Snackbar.show({
      text,
      backgroundColor: theme.colors.polar_7,
      textColor: theme.colors.polar_2,
      fontFamily: theme.fonts.medium,
    }),
  error: (text: string) =>
    Snackbar.show({
      text,
      backgroundColor: theme.colors.polar_7,
      textColor: theme.colors.polar_2,
      fontFamily: theme.fonts.medium,
    }),
};

export default toast;
