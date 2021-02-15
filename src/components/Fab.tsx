import React from 'react';
import {Pressable, StyleSheet, PressableProps} from 'react-native';
import {Edit} from 'react-native-feather';

import theme from '@theme';

interface FabProps extends PressableProps {}

const Fab: React.FC<FabProps> = ({style, ...props}) => {
  return (
    <Pressable
      style={
        style
          ? style
          : ({pressed}) => [styles.wrapper, pressed && styles.pressed]
      }
      {...props}>
      <Edit color={theme.colors.polar_7} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.polar_2,
    position: 'absolute',
    right: 20,
    bottom: 20,
    shadowColor: theme.colors.polar_7,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    elevation: 2,
  },
  pressed: {
    backgroundColor: theme.colors.polar_1,
  },
});

export default Fab;
