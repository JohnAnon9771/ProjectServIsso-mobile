import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage
} from 'react-native';
// import { Common } from "react-navigation";
import api from '../../services/api';

// galio component
import { Block, Button, Input, NavBar, Text } from 'galio-framework';
const { height, width } = Dimensions.get('window');

import { styles } from './styles';
import { onSignIn } from '../../services/auth';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!email || !pwd) {
      setError({ error: 'Preencha os campos corretamente' });
    } else {
      try {
        const response = await api.post('/authenticate', { email, pwd });
        onSignIn(response.data.token);
        navigation.navigate('Home');
      } catch (error) {
        setError({
          error: 'Houve um problema com o login, verifique suas credenciais!'
        });
      }
    }
  }

  return (
    <Block safe flex style={{ backgroundColor: '#fff' }}>
      <NavBar
        title="Entrar"
        onLeftPress={() => navigation.openDrawer()}
        style={Platform.OS === 'android' ? { marginTop: 16 } : null}
      />
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <Block
          flex
          center
          style={{
            marginTop: 16 * 1.875
          }}
        >
          <Text
            muted
            center
            size={16 * 0.875}
            style={{ paddingHorizontal: 16 * 2.3 }}
          >
            This is the perfect place to write a short description of this step
            and even the next steps ahead
          </Text>

          <Text muted center size={16 * 0.875}>
            or be classical
          </Text>
        </Block>

        <Block flex={2} center space="evenly">
          <Block flex={2}>
            <Input
              rounded
              type="email-address"
              placeholder="Email"
              autoCapitalize="none"
              style={{ width: width * 0.9 }}
              onChangeText={email => setEmail(email)}
            />
            <Input
              rounded
              password
              viewPass
              placeholder="Senha"
              style={{ width: width * 0.9 }}
              onChangeText={password => setPwd(password)}
            />
            <Text
              size={16 * 0.75}
              onPress={() => Alert.alert('Not implemented')}
              style={{
                alignSelf: 'flex-end',
                lineHeight: 16 * 2
              }}
            >
              Esqueceu a senha?
            </Text>
          </Block>
          <Block flex middle>
            <Button round onPress={() => handleLogin()}>
              Entrar
            </Button>
            <Button
              color="transparent"
              shadowless
              onPress={() => navigation.navigate('Register')}
            >
              <Text center size={16 * 0.75}>
                {'Não tem uma conta? Cadastre-se'}
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    </Block>
  );
}
