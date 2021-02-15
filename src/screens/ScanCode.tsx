import React from 'react';
import {StyleSheet} from 'react-native';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';
import {BarcodeMask} from '@nartc/react-native-barcode-mask';
import {ChevronLeft} from 'react-native-feather';

import Layout from '@components/Layout';
import IconButton from '@components/IconButton';
import theme from '@theme';
import toast from '@utils/toast';

const ScanCode = ({navigation, route}: {navigation: any; route: any}) => {
  const {callback} = route.params;

  function handleCodeDetect(event: BarCodeReadEvent) {
    if (event.data.trim().length < 28) {
      toast.error('Invalid sync code!');
      return;
    }
    callback?.(event.data);
    navigation.navigate('Sync');
    toast.success('Sync code detected!');
  }

  return (
    <Layout>
      <IconButton
        icon={<ChevronLeft color={theme.colors.polar_1} />}
        onPress={navigation.goBack}
        style={styles.backButton}
      />
      <RNCamera
        captureAudio={false}
        style={styles.wrapper}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onBarCodeRead={handleCodeDetect}>
        <BarcodeMask
          width={280}
          height={280}
          edgeColor={theme.colors.polar_2}
          backgroundColor={theme.colors.polar_7}
          maskOpacity={0.6}
          edgeBorderWidth={3}
        />
      </RNCamera>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.polar_2,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
});

export default ScanCode;
