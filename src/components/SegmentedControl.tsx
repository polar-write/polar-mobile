import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
  ViewStyle,
  Keyboard,
} from 'react-native';

import theme from '@theme';
import Typography from '@components/Typography';

interface SegmentedControlProps {
  style?: ViewStyle;
  values: string[];
  selectedIndex: number;
  onChange: (selectedSegmentIndex: number) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  values,
  selectedIndex,
  onChange,
  style,
}) => {
  const [indicatorWidth, setIndicatorWidth] = useState<number | null>(null);
  const [animated] = useState(new Animated.Value(0));

  const height = 26;
  const borderRadius = 13;

  function handleSegmentLayout(event: LayoutChangeEvent) {
    setIndicatorWidth(event.nativeEvent.layout.width);
  }

  useEffect(() => {
    Keyboard.dismiss();
    typeof selectedIndex === 'number' &&
      Animated.spring(animated, {
        toValue: selectedIndex,
        useNativeDriver: true,
      }).start();
  }, [selectedIndex]);

  const translateX = animated.interpolate({
    inputRange: [0, values?.length - 1],
    outputRange: [0, (values?.length - 1) * (indicatorWidth || 0)],
  });

  return (
    <View style={[styles.wrapper, {height, borderRadius}, style]}>
      {indicatorWidth && (
        <Animated.View
          style={[
            styles.indicator,
            {
              width: indicatorWidth,
              height: height - 2,
              borderRadius,
              transform: [{translateX}],
            },
          ]}
        />
      )}
      {values?.map((value, index) => (
        <TouchableOpacity
          key={value}
          style={[styles.segment, {height, borderRadius}]}
          onLayout={handleSegmentLayout}
          onPress={() => onChange?.(index)}>
          <Typography
            variant="caption"
            style={[
              {
                color:
                  index === selectedIndex
                    ? theme.colors.polar_1
                    : theme.colors.polar_7,
              },
            ]}>
            {value}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: theme.colors.polar_7,
    flexDirection: 'row',
    overflow: 'visible',
  },
  segment: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  indicator: {
    position: 'absolute',
    backgroundColor: theme.colors.polar_7,
    zIndex: -1,
  },
});

export default SegmentedControl;
