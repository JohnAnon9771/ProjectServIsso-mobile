import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Card, Block, NavBar, Icon } from 'galio-framework';

import api from '../services/api';

// Galio components
import theme from '../theme';
import { hidden } from 'ansi-colors';
import { Ellipse } from 'react-native-svg';

const { width } = Dimensions.get('screen');

export default function Cards({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPost() {
      const response = await api.get('/posts/index');
      setPosts(response.data);
    }
    getPost();
  }, []);

  const cards = posts.map(post => ({
    id: post._id,
    image: post.thumbnail_url,
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: post.description,
    category: post.category,
    location: post.city
  }));
  return (
    <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
      <NavBar
        title="Postagens"
        left={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon
              name="menu"
              family="feather"
              size={theme.SIZES.BASE}
              color={theme.COLORS.ICON}
            />
          </TouchableOpacity>
        }
        style={
          Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null
        }
      />
      <ScrollView contentContainerStyle={styles.cards}>
        <Block flex space="between">
          {cards.map((card, id) => (
            <Card
              key={`card-${card.id}`}
              flex
              borderless
              shadowColor={theme.COLORS.BLACK}
              titleColor={card.full ? theme.COLORS.WHITE : null}
              style={styles.card}
              title={card.title}
              caption={card.caption}
              location={card.location}
              avatar={`${card.avatar}?${id}`}
              // image={card.image}
              // imageStyle={[card.padded ? styles.rounded : null]}
              // imageBlockStyle={[
              //   card.padded ? { padding: theme.SIZES.BASE / 2 } : null,
              //   card.full ? null : styles.noRadius
              // ]}
              footerStyle={card.full ? styles.full : null}
            >
              <TouchableOpacity>
                <Text style={styles.text}>Mais..</Text>
              </TouchableOpacity>
              {card.full ? (
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0, 0.8)']}
                  style={styles.gradient}
                />
              ) : null}
            </Card>
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2
  },
  full: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
    // overflow: hidden,
    // textOverflow: 'ellipsis'
    // display:
    // -webkit-line-clamp: 2; /* number of lines to show */
    // -webkit-box-orient: vertical;
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  rounded: {
    borderRadius: theme.SIZES.BASE * 0.1875
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5
  },
  text: {
    color: 'lightgray',
    textAlign: 
  }
});
