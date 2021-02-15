import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

import theme from '@theme';

interface PolarMarkdownProps extends TextInputProps {
  style?: TextStyle;
  wrapperStyle?: ViewStyle;
}

const PolarMarkdown: React.FC<PolarMarkdownProps> = ({
  style,
  wrapperStyle,
  ...props
}) => {
  return (
    <InputScrollView topOffset={34} style={[styles.wrapper, wrapperStyle]}>
      <TextInput
        style={[styles.input, style]}
        multiline
        selectionColor={theme.colors.polar_6}
        placeholder="A wonderful new note"
        placeholderTextColor={theme.colors.polar_5}
        autoFocus
        {...props}
      />
    </InputScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.polar_2,
    flex: 1,
    flexGrow: 1,
  },
  input: {
    paddingHorizontal: 40,
    paddingTop: 25,
    paddingBottom: 60,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.polar_7,
    textAlignVertical: 'top',
  },
});

export default PolarMarkdown;
