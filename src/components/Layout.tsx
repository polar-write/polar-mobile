import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ViewProps,
  ViewStyle,
  Platform,
} from 'react-native';

import theme from '@theme';

interface LayoutProps extends ViewProps {
  style?: ViewStyle;
}

const Layout: React.FC<LayoutProps> = ({style, ...props}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={[style, styles.wrapper]} {...props} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.polar_2,
    paddingTop: Platform.OS === 'android' ? 40 : undefined,
  },
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.polar_2,
  },
});

export default Layout;
