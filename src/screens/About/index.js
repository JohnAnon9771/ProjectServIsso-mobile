import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';

import Constants from 'expo-constants';

// Galio components
import { Block, Text, Icon, NavBar } from 'galio-framework';

export default function About(props) {
  return (
    <Block safe flex>
      <NavBar
        title="Sobre"
        titleStyle={{ alignSelf: 'flex-start' }}
        leftIconColor={'#9FA5AA'}
        left={
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Icon name="menu" family="feather" size={16} color={'#000'} />
          </TouchableOpacity>
        }
        style={Platform.OS === 'android' ? { marginTop: 16 } : null}
      />

      <ScrollView style={{ flex: 1 }}>
        <Block flex style={styles.news}>
          <Block style={styles.article}>
            <Text h4>Quem somos? </Text>
            <Text muted style={[styles.text, { marginVertical: 16 * 1.3 }]}>
              O aplicativo é uma iniciativa dos alunos do terceiro ano de
              informática, da escola Plácido Aderaldo Castelo como forma de
              projeto social.
            </Text>
            <Text h4>E pra que serve este app? </Text>
            <Text muted style={[styles.text, { marginVertical: 16 * 1.3 }]}>
              Esta aplicação serve para aqueles que querem encontrar um
              funcionario de forma rápida, clara e objetiva onde pode se ter um
              contato mais próximo com aquele contratado.
            </Text>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  article: {
    marginTop: 2 * 1.75,
    textAlign: 'center'
  },
  articleImage: {
    borderRadius: 16 / 2,
    height: 16 * 13.75
  },
  news: {
    marginTop: 16 / 2,
    paddingBottom: 16 / 2,
    justifyContent: 'flex-start',
    paddingHorizontal: 16
  },
  button: {
    width: 16 * 2,
    borderColor: 'transparent'
  },
  author: {
    position: 'absolute',
    right: 16,
    left: 16,
    bottom: Constants.statusBarHeight,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 16 / 2
  },
  text: {
    fontWeight: '400',
    fontSize: 16 * 0.875,
    lineHeight: 16 * 1.25,
    letterSpacing: 0.3,
    marginBottom: 16
  }
});
