import React from 'react';
import {Pressable, StyleSheet, PressableProps, ViewStyle} from 'react-native';

import theme from '@theme';

interface IconButtonProps extends PressableProps {
  icon: JSX.Element;
  style?: ViewStyle;
}

const IconButton: React.FC<IconButtonProps> = ({icon, style, ...props}) => {
  return (
    <Pressable
      style={({pressed}) => [styles.wrapper, style, pressed && styles.pressed]}
      {...props}>
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: theme.colors.polar_4,
  },
});

export default IconButton;
