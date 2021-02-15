import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Pressable, TextInput} from 'react-native';
import {CloudOff, Cloud, Search, X} from 'react-native-feather';
import moment from 'moment';

import Layout from '@components/Layout';
import Fab from '@components/Fab';
import IconButton from '@components/IconButton';
import Typography from '@components/Typography';
import theme from '@theme';
import {useStore, INote} from '@store';
import {getMarkdownExcerpt} from '@utils/mixed';

const NoteList = ({navigation}: {navigation: any}) => {
  const {notes, syncCode, newNote} = useStore();
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  function handleNewNote() {
    setSearchValue('');
    const id = newNote();
    navigation.push('Editor', {id});
  }

  function handleSearch(value: string) {
    setSearchValue(value);
  }

  const filteredNotes = notes
    .filter((note) => !note.removedAt)
    .sort(
      (a, b) => (new Date(b.updatedAt) as any) - (new Date(a.updatedAt) as any),
    );

  const searchNotes = searchValue?.length
    ? filteredNotes.filter((note: INote) =>
        note.content.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : filteredNotes;

  function renderNoteItem({item}: {item: INote}) {
    return (
      <Pressable
        onPress={() => navigation.push('Editor', {id: item.id})}
        style={({pressed}) => [
          styles.noteItem,
          pressed && styles.noteItemPressed,
        ]}>
        <Typography style={styles.noteItemDate} variant="caption">
          {moment(item.updatedAt).calendar()}
        </Typography>
        <Typography>
          {getMarkdownExcerpt(item.content) || 'A wonderful new note'}
        </Typography>
      </Pressable>
    );
  }

  return (
    <Layout>
      <View style={styles.header}>
        {!showSearch ? (
          <>
            <IconButton
              icon={
                !syncCode ? (
                  <CloudOff
                    color={theme.colors.polar_7}
                    width={20}
                    height={20}
                  />
                ) : (
                  <Cloud color={theme.colors.polar_7} width={20} height={20} />
                )
              }
              onPress={() => navigation.navigate('Sync')}
            />
            <Typography variant="header">Polar</Typography>
            <IconButton
              icon={
                <Search color={theme.colors.polar_7} width={20} height={20} />
              }
              onPress={() => setShowSearch(true)}
            />
          </>
        ) : (
          <>
            <View style={styles.searchWrapper}>
              <Search
                color={theme.colors.polar_7}
                width={20}
                height={20}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Polar Search"
                style={styles.searchInput}
                autoFocus
                selectionColor={theme.colors.polar_6}
                onChangeText={handleSearch}
                value={searchValue}
              />
            </View>
            <IconButton
              icon={<X color={theme.colors.polar_7} width={20} height={20} />}
              onPress={() => setShowSearch(false)}
            />
          </>
        )}
      </View>
      <FlatList
        data={searchNotes}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteItem}
        showsVerticalScrollIndicator={false}
      />
      <Fab onPress={handleNewNote} />
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
  noteItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.polar_3,
  },
  noteItemPressed: {
    backgroundColor: theme.colors.polar_1,
  },
  noteItemDate: {
    marginBottom: 8,
  },
  searchWrapper: {
    flex: 1,
    flexGrow: 1,
    marginRight: 10,
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 15,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 45,
    borderWidth: 1,
    borderColor: theme.colors.polar_3,
    borderRadius: 4,
    backgroundColor: theme.colors.polar_1,
    fontFamily: theme.fonts.medium,
    fontSize: 15,
    height: 40,
    color: theme.colors.polar_7,
  },
});

export default NoteList;
