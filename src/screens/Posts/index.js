import React, { useState, useEffect } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import { Block, NavBar, Icon } from 'galio-framework';

import api from '../../services/api';

//Style
import {
  Description,
  Listining,
  CardList,
  Avatar,
  Title,
  Info,
  Category
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
            <Icon name="menu" family="feather" size={16} color={'#000'} />
          </TouchableOpacity>
        }
        style={Platform.OS === 'android' ? { marginTop: 16 } : null}
      />
      <Listining
        data={posts}
        keyExtractor={keyPost => String(keyPost._id)}
        renderItem={({ item }) => (
          <CardList>
            <Avatar source={{ url: item.thumbnail_url }} />
            <Info>
              <Title>{item.company}</Title>
              <Description>{item.description}</Description>
              <Category>{item.category}</Category>
            </Info>
          </CardList>
        )}
      />
    </Block>
  );
}
