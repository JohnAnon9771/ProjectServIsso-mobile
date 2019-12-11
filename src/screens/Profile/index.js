import React, { useEffect, useState } from 'react';
import {
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';

import { Linking } from 'expo';

import api from '../../services/api';
import { TOKEN_KEY } from '../../services/auth';

import Icon from 'react-native-vector-icons/FontAwesome';
// galio components
import { Block, Text, NavBar, Button } from 'galio-framework';
const { width, height } = Dimensions.get('screen');

import { styles, DescriptionProfile } from './styles';

export default function Profile({ navigation }) {
  const [user, setUser] = useState(false);
  const [professionals, setProfessionals] = useState('');
  useEffect(() => {
    async function getIdUser() {
      const response = await api.get(`/show/${navigation.getParam('itemId')}`);
      setProfessionals(response.data);
    }
    getIdUser();
  }, []);

  useEffect(() => {
    async function getUserToken() {
      const user = await api.get('/home');
      setUser(user.data);
    }
    getUserToken();
  }, [user]);
  const userId = navigation.getParam('itemId');
  function handleCall() {
    const number = Number(professionals.phoneNumber);
    Linking.openURL(`tel:${number}`);
  }
  return (
    <Block>
      <StatusBar barStyle="light-content" />
      <Block style={styles.navbar}>
        <NavBar
          transparent
          left={
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon name="navicon" size={16} color={'#666'} />
            </TouchableOpacity>
          }
        />
      </Block>

      <Image
        source={{
          uri: professionals.photo_url
        }}
        resizeMode="cover"
        style={{
          width,
          height: height * 0.55
        }}
      />

      <Block center style={{ marginTop: -16 * 2 }}>
        <Block flsex style={styles.header}>
          <Block>
            <Text size={16 * 1.875}>{professionals.name}</Text>
            <Text muted t size={13 * 0.875} style={{ fontWeight: '500' }}>
              {professionals.email}
            </Text>
            <Text
              muted
              t
              size={16 * 0.875}
              style={{ marginTop: 2, fontWeight: '500' }}
            >
              {professionals.city}
            </Text>
          </Block>
          <DescriptionProfile>{professionals.description}</DescriptionProfile>
          {userId !== user._id ? (
            <Button round color="success" onPress={() => handleCall()}>
              <Icon name="whatsapp" size={30} color={'#fff'} />
            </Button>
          ) : (
            <Button
              onPress={async () => {
                await AsyncStorage.removeItem(TOKEN_KEY);
                navigation.navigate('Home');
              }}
            >
              Sair
            </Button>
          )}
        </Block>
      </Block>
    </Block>
  );
}
