import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Keyboard} from 'react-native';
import {
  ChevronLeft,
  MoreHorizontal,
  X,
  Trash2,
  Copy,
  Share,
} from 'react-native-feather';

import Layout from '@components/Layout';
import IconButton from '@components/IconButton';
import Button from '@components/Button';
import theme from '@theme';
import {INote, useStore} from '@store';
import PolarMarkdown from '@components/PolarMarkdown';
import toast from '@utils/toast';

const Editor = ({navigation, route}: {navigation: any; route: any}) => {
  const [showMenu, setShowMenu] = useState(false);
  const {
    notes,
    editNote,
    deleteNote,
    duplicateNote,
    removeJustSynced,
  } = useStore();
  const {id} = route.params;

  const note = notes.find((n: INote) => n.id === id && !n.removedAt);

  useEffect(() => {
    setShowMenu(false);
    // (editorRef.current as any)?.getInstance().focus();
    // (editorRef.current as any)?.getInstance().setMarkdown(note?.content);
  }, [id]);

  useEffect(() => {
    if (note?.justSynced) {
      // (editorRef.current as any)?.getInstance().setMarkdown(note?.content);
      removeJustSynced(note.id);
    }
  }, [note?.justSynced]);

  function handleChange(value: string) {
    // const value = (editorRef.current as any).getInstance().getMarkdown();
    editNote(id, value);
  }

  function handleDelete() {
    Keyboard.dismiss();
    if (note) {
      deleteNote(note.id);
      navigation.goBack();
      toast.success('Note deleted!');
    }
    setShowMenu(false);
  }

  function handleDuplicate() {
    Keyboard.dismiss();
    if (note) {
      duplicateNote(note.content);
      // const newNoteId = duplicateNote(note.content);
      // navigation.navigate('Editor', {id: newNoteId});
      navigation.goBack();
      toast.success('Note duplicated!');
    }
    setShowMenu(false);
  }

  function handleExport() {
    Keyboard.dismiss();
    toast.error('Sorry, we are working on it!');
    setShowMenu(false);
  }

  return (
    <Layout>
      <View style={styles.header}>
        <IconButton
          icon={<ChevronLeft color={theme.colors.polar_7} />}
          onPress={navigation.goBack}
        />
        {!showMenu ? (
          <IconButton
            icon={<MoreHorizontal color={theme.colors.polar_7} />}
            onPress={() => setShowMenu(true)}
          />
        ) : (
          <View style={styles.menuWrapper}>
            <Button
              label="Delete"
              icon={
                <Trash2
                  color={theme.colors.polar_7}
                  width={16}
                  height={16}
                  style={styles.menuIcon}
                />
              }
              small
              style={styles.menuItem}
              onPress={handleDelete}
            />
            <Button
              label="Duplicate"
              icon={
                <Copy
                  color={theme.colors.polar_7}
                  width={16}
                  height={16}
                  style={styles.menuIcon}
                />
              }
              small
              style={styles.menuItem}
              onPress={handleDuplicate}
            />
            <Button
              label="Export"
              icon={
                <Share
                  color={theme.colors.polar_7}
                  width={16}
                  height={16}
                  style={styles.menuIcon}
                />
              }
              small
              style={styles.menuItem}
              onPress={handleExport}
            />
            <IconButton
              icon={<X color={theme.colors.polar_7} />}
              onPress={() => setShowMenu(false)}
            />
          </View>
        )}
      </View>
      <PolarMarkdown
        value={note?.content}
        onChangeText={handleChange}
        wrapperStyle={styles.editor}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.polar_2,
  },
  header: {
    height: 34,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1,
  },
  menuWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    marginHorizontal: 3,
  },
  menuIcon: {
    marginRight: 5,
  },
  editor: {
    marginTop: 10,
  },
});

export default Editor;
