import React, { useState, useEffect } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Block, NavBar } from 'galio-framework';

import api from '../../services/api';

//Style
import {
  Description,
  Listining,
  CardList,
  Avatar,
  Title,
  Info,
  Category,
  City
} from './styles';

export default function Cards({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPost() {
      const response = await api.get('/posts/index');
      setPosts(response.data);
    }
    getPost();
  }, []);

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
      <Listining
        data={posts}
        keyExtractor={keyPost => String(keyPost._id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', { itemId: item._id })}
          >
            <CardList>
              <Avatar source={{ url: item.thumbnail_url }} />
              <Info>
                <Title>{item.company}</Title>
                <Description>{item.description}</Description>
                <Category>{item.category}</Category>
                <Icon name="map-marker" size={13} color={'#666'}>
                  <City>{item.city}</City>
                </Icon>
              </Info>
            </CardList>
          </TouchableOpacity>
        )}
      />
    </Block>
  );
}
