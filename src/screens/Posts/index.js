import React, { useState, useEffect } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Block, NavBar } from 'galio-framework';
import api from '../../services/api';

// Style
import {
  Description,
  Listining,
  CardList,
  Avatar,
  Title,
  Info,
  Category,
  City,
  SearchInput
} from './styles';

export default function Cards({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    async function getUser() {
      const response = await api.get('/index');
      setPosts(response.data);
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getUserFiltered() {
      const response = await api.get(`/index/${search}`);
      setFilter(response.data);
    }
    getUserFiltered();
  }, [search]);

  return (
    <Block safe flex style={{ backgroundColor: '#fff' }}>
      <NavBar
        title="Listagem"
        left={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="navicon" size={16} color={'#666'} />
          </TouchableOpacity>
        }
        style={Platform.OS === 'android' ? { marginTop: 16 } : null}
      />
      <View>
        <SearchInput
          placeholder="Pesquise a categoria..."
          onChangeText={search => setSearch(search)}
          underlineColorAndroid="transparent"
        />
        <Icon name="search" size={16} color="#666" />
      </View>

      <Listining
        data={!search ? posts : filter}
        keyExtractor={keyPost => String(keyPost._id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', { itemId: item._id })}
          >
            <CardList>
              <Avatar
                source={{
                  uri: item.photo_url
                }}
              />
              <Info>
                <Title>{item.name}</Title>
                <Description>{item.description}</Description>
                <Category>{item.profession}</Category>
                <City>
                  <Icon name="map-marker" size={11} color="#666" />
                  {item.city}
                </City>
              </Info>
            </CardList>
          </TouchableOpacity>
        )}
      />
    </Block>
  );
}
