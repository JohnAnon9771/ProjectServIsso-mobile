import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity
} from 'react-native';

import api from './src/services/api';

import { createDrawerNavigator, DrawerItems } from 'react-navigation';

// screens
import { Block, Icon, Text } from 'galio-framework';
import Profile from './src/screens/Profile/index';
import Posts from './src/screens/Posts/index';
import Login from './src/screens/SignIn/index';
import About from './src/screens/News';

function GalioDrawer(props) {
  const [user, setUser] = useState('');
  useEffect(() => {
    async function getUserToken() {
      const user = await api.get('/home');
      setUser(user.data);
    }
    getUserToken();
  }, []);

  console.log(user);
  return (
    <SafeAreaView
      style={styles.drawer}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <TouchableOpacity onPress={() => props.navigation.push('Profile')}>
        <Block space="between" row style={styles.header}>
          <Block flex={0.3}>
            <Image source={{ uri: user.photo_url }} style={styles.avatar} />
          </Block>
          <Block flex style={styles.middle}>
            <Text size={16 * 0.875}>{user.name}</Text>
            <Text muted size={16 * 0.875}>
              {user.email}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16 * 0.6875,
    paddingBottom: 16 * 1.6875,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 0.5,
    marginTop: Platform.OS === 'android' ? 16 * 2 : null
  },
  avatar: {
    width: 16 * 2.5,
    height: 16 * 2.5,
    borderRadius: 16 * 1.25
  },
  middle: {
    justifyContent: 'center'
  }
});

const MenuIcon = ({ name, family, focused }) => (
  <Icon
    name={name}
    family={family}
    size={16}
    color={focused ? '#fff' : '#5D5D5D'}
  />
);

MenuIcon.defaultProps = {
  name: null,
  family: null,
  focused: false
};

MenuIcon.propTypes = {
  name: PropTypes.string,
  family: PropTypes.string,
  focused: PropTypes.bool
};

const screens = {
  Home: {
    screen: Posts,
    navigationOptions: {
      drawerLabel: 'Lista',
      drawerIcon: props => (
        <MenuIcon name="home" family="font-awesome" focused={props.focused} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerLabel: 'Perfil',
      drawerIcon: props => (
        <MenuIcon
          name="user-circle"
          family="font-awesome"
          focused={props.focused}
        />
      )
    }
  },

  About: {
    screen: About,
    navigationOptions: {
      drawerLabel: 'Sobre',
      drawerIcon: props => (
        <MenuIcon
          name="info-circle"
          family="font-awesome"
          focused={props.focused}
        />
      )
    }
  },

  Login: {
    screen: Login,
    navigationOptions: {
      drawerLabel: 'Entrar',
      drawerIcon: props => (
        <MenuIcon
          name="sign-in"
          family="font-awesome"
          focused={props.focused}
        />
      )
    }
  }
};

const options = {
  contentComponent: props => <GalioDrawer {...props} />,
  contentOptions: {
    labelStyle: {
      fontWeight: '500',
      color: '#898989',
      fontSize: 16 * 0.875,
      marginLeft: 16 * 0.75
    },
    activeLabelStyle: {
      color: '#fff'
    },
    activeBackgroundColor: '#B23AFC',
    itemsContainerStyle: {
      paddingVertical: 0
    },
    iconContainerStyle: {
      marginHorizontal: 0,
      marginLeft: 16 * 1.65,
      marginRight: 16 * 0.76
    }
  }
};

const GalioApp = createDrawerNavigator(screens, options);

export default GalioApp;
