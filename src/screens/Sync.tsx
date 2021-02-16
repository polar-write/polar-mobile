import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';
import {
  RefreshCw,
  LogIn,
  ChevronLeft,
  LogOut,
  Copy,
  Camera,
  X,
} from 'react-native-feather';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';

import theme from '@theme';
import Typography from '@components/Typography';
import IconButton from '@components/IconButton';
import Layout from '@components/Layout';
import Button from '@components/Button';
import {useStore} from '@store';
import {updateSyncCode} from '@firebase/firestore';
import toast from '@utils/toast';

const Sync = ({navigation}: {navigation: any}) => {
  const {auth, lastSync, syncCode, setSyncCode} = useStore();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  async function handleStartSync() {
    await updateSyncCode(auth?.uid);
    setSyncCode(auth?.uid);
  }

  async function handleEnterSyncCode() {
    if (inputValue.trim().length < 28) {
      toast.error('Invalid sync code!');
      return;
    }
    await updateSyncCode(auth?.uid, inputValue.trim());
    setSyncCode(inputValue.trim());
    setInputValue('');
    setShowInput(false);
  }

  async function handleCopyCode() {
    if (syncCode) {
      Clipboard.setString(syncCode);
      toast.success('Sync code copied to clipboard!');
    }
  }

  async function handleStopSync() {
    try {
      await updateSyncCode(auth?.uid, null);
      setSyncCode(null);
      toast.success('Logout success!');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Layout>
      <View style={styles.header}>
        <IconButton
          icon={<ChevronLeft color={theme.colors.polar_7} />}
          onPress={navigation.goBack}
        />
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding">
        <ScrollView contentContainerStyle={styles.container}>
          {!syncCode ? (
            <>
              <Image
                source={require('../../assets/images/polar.png')}
                style={styles.logoImage}
              />
              {!showInput ? (
                <View style={styles.row}>
                  <Button
                    onPress={handleStartSync}
                    style={styles.logoutButton}
                    icon={
                      <RefreshCw
                        color={theme.colors.polar_7}
                        width={20}
                        height={20}
                        style={styles.loginIcon}
                      />
                    }
                    label="Start sync"
                  />
                  <Button
                    onPress={() => setShowInput(true)}
                    style={styles.logoutButton}
                    icon={
                      <LogIn
                        color={theme.colors.polar_7}
                        width={20}
                        height={20}
                        style={styles.loginIcon}
                      />
                    }
                    label="Enter sync code"
                  />
                </View>
              ) : (
                <View style={styles.row}>
                  <View style={styles.syncCodeInputWrapper}>
                    <TextInput
                      style={styles.syncCodeInput}
                      value={inputValue}
                      onChangeText={setInputValue}
                      placeholder="Sync code"
                      autoFocus
                      selectionColor={theme.colors.polar_6}
                      placeholderTextColor={theme.colors.polar_4}
                    />
                    <IconButton
                      style={styles.scanButton}
                      onPress={() =>
                        navigation.push('ScanCode', {
                          callback: (code: string) => setInputValue(code),
                        })
                      }
                      icon={
                        <Camera
                          color={theme.colors.polar_7}
                          width={20}
                          height={20}
                        />
                      }
                    />
                    <IconButton
                      style={styles.clearButton}
                      onPress={() => {
                        setInputValue('');
                        setShowInput(false);
                      }}
                      icon={
                        <X
                          color={theme.colors.polar_7}
                          width={20}
                          height={20}
                        />
                      }
                    />
                  </View>
                  <IconButton
                    style={styles.logoutButton}
                    onPress={handleEnterSyncCode}
                    icon={
                      <LogIn
                        color={theme.colors.polar_7}
                        width={20}
                        height={20}
                        style={styles.loginIcon}
                      />
                    }
                  />
                </View>
              )}
            </>
          ) : (
            <View>
              <View style={styles.logoImage}>
                <Typography variant="caption" style={styles.scanToSync}>
                  Scan to sync
                </Typography>
                <QRCode
                  value={syncCode}
                  size={200}
                  backgroundColor={theme.colors.polar_2}
                  logo={require('../../assets/images/polar.png')}
                  logoSize={25}
                  logoBackgroundColor={theme.colors.polar_2}
                />
              </View>
              {lastSync && (
                <Typography style={styles.lastSync}>
                  Last sync: {moment(lastSync).calendar()}
                </Typography>
              )}
              <View style={styles.row}>
                <Button
                  onPress={handleCopyCode}
                  style={styles.logoutButton}
                  icon={
                    <Copy
                      color={theme.colors.polar_7}
                      width={20}
                      height={20}
                      style={styles.loginIcon}
                    />
                  }
                  label="Copy sync code"
                />
                <Button
                  onPress={handleStopSync}
                  style={styles.logoutButton}
                  icon={
                    <LogOut
                      color={theme.colors.polar_7}
                      width={20}
                      height={20}
                      style={styles.loginIcon}
                    />
                  }
                  label="Stop sync"
                />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 34,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logoutButton: {
    marginHorizontal: 5,
  },
  loginIcon: {
    marginRight: 6,
  },
  logoImage: {
    width: 200,
    height: 200,
    marginTop: -60,
    marginBottom: 30,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncCodeInputWrapper: {
    width: 250,
    height: 40,
  },
  syncCodeInput: {
    borderWidth: 1,
    borderColor: theme.colors.polar_3,
    borderRadius: 4,
    backgroundColor: theme.colors.polar_1,
    fontFamily: theme.fonts.medium,
    fontSize: 15,
    height: 40,
    color: theme.colors.polar_7,
    paddingHorizontal: 50,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scanButton: {
    position: 'absolute',
    top: -5,
  },
  clearButton: {
    position: 'absolute',
    top: -5,
    right: 0,
  },
  lastSync: {
    marginBottom: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },
  scanToSync: {
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default Sync;
