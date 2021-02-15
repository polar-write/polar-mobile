import React from 'react';
import {Pressable, StyleSheet, PressableProps, ViewStyle} from 'react-native';

import theme from '@theme';
import Typography from '@components/Typography';

interface ButtonProps extends PressableProps {
  label: string;
  icon?: JSX.Element;
  style?: ViewStyle;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  style,
  small,
  ...props
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.wrapper,
        small && styles.small,
        style,
        pressed && styles.pressed,
      ]}
      {...props}>
      {icon}
      <Typography variant="buttonLabel" style={small && styles.labelSmall}>
        {label}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.colors.polar_4,
  },
  small: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  labelSmall: {
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    textTransform: 'uppercase',
  },
  pressed: {
    backgroundColor: theme.colors.polar_5,
  },
});

export default Button;
