import React from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';

import theme from '@theme';

interface TypographyProps extends TextProps {
  variant?: 'default' | 'caption' | 'header' | 'buttonLabel';
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'default',
  style,
  ...props
}) => {
  return <Text style={[styles[variant], style]} {...props} />;
};

const styles = StyleSheet.create({
  default: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.polar_7,
  },
  buttonLabel: {
    fontFamily: theme.fonts.medium,
    fontSize: 15,
    color: theme.colors.polar_7,
  },
  caption: {
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: theme.colors.polar_6,
  },
  header: {
    fontFamily: theme.fonts.bold,
    fontSize: 15,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: theme.colors.polar_7,
  },
});

export default Typography;
