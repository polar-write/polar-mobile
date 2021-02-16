import React from 'react';
import {ScrollView, StyleSheet, Platform} from 'react-native';
import Markdown, {MarkdownProps} from 'react-native-markdown-display';

import theme from '@theme';

interface MarkdownPreviewProps extends MarkdownProps {}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({...props}) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContainer}>
      <Markdown
        style={{
          body: styles.text,
          heading1: {
            fontFamily: theme.fonts.bold,
            marginBottom: 15,
          },
          heading2: {
            fontFamily: theme.fonts.bold,
            marginBottom: 14,
          },
          heading3: {
            fontFamily: theme.fonts.bold,
            marginBottom: 13,
          },
          heading4: {
            fontFamily: theme.fonts.bold,
            marginBottom: 12,
          },
          heading5: {
            fontFamily: theme.fonts.bold,
            marginBottom: 11,
          },
          heading6: {
            fontFamily: theme.fonts.bold,
            marginBottom: 10,
          },
          hr: {
            backgroundColor: theme.colors.polar_7,
            height: 1,
          },
          strong: {
            fontFamily: theme.fonts.bold,
            fontWeight: Platform.OS === 'android' ? 'normal' : '700',
          },
          em: {
            fontFamily: theme.fonts.italic,
            fontStyle: Platform.OS === 'android' ? 'normal' : 'italic',
          },
          blockquote: {
            backgroundColor: theme.colors.polar_3,
            borderColor: theme.colors.polar_6,
            borderLeftWidth: 4,
            marginLeft: 5,
            paddingHorizontal: 10,
            marginBottom: 10,
          },
        }}
        {...props}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    marginTop: 10,
  },
  scrollContainer: {
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  text: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.polar_7,
  },
});

export default MarkdownPreview;
