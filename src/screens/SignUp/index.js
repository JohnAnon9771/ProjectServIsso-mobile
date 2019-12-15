import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import api from '../../services/api';
import { onSignIn } from '../../services/auth';
// galio component
import { Block, Button, Input, Text, NavBar } from 'galio-framework';
import { Container, Content } from './styles';

const { height, width } = Dimensions.get('window');

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [profession, setProfession] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [permission, setPermission] = useState(null);
  const [photo, setImage] = useState(null);

  async function handleSignUp() {
    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('pwd', pwd);
    data.append('profession', profession);
    data.append('description', description);
    data.append('city', city);
    data.append('phoneNumber', phoneNumber);

    const response = await api.post('/', data);

    if (!name || !email || !pwd || !profession || !phoneNumber || !city) {
      setError('Preencha todos os campos');
    } else {
      try {
        onSignIn(response.data.token);
        if (response.data.token) {
          navigation.navigate('Home');
        }
      } catch (err) {
        console.log(err);
        setError('Aconteceu um erro');
      }
    }
  }
  async function selectImage() {
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    setPermission(permission);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9]
    });

    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    if (!result.cancelled) {
      setImage({ originalname: filename, mimetype: type });
      data.append('photo', { originalname: filename, mimetype: type });
    }
  }

  return (
    <Block safe flex style={{ backgroundColor: '#fff' }}>
      <Container>
        <NavBar
          title="Cadastrar"
          onLeftPress={() => navigation.openDrawer()}
          style={Platform.OS === 'android' ? { marginTop: 16 } : null}
        />
        <Block flex={2} center space="between">
          <Content>
            <Input
              rounded
              placeholder="Nome"
              style={{ width: width * 0.9 }}
              onChangeText={name => setName(name)}
            />
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
              onChangeText={pwd => setPwd(pwd)}
            />
            <Input
              rounded
              placeholder="Sua profissão"
              onChangeText={profession => setProfession(profession)}
            />
            <Input
              rounded
              multiline
              numberOflines={2}
              placeholder="Descrição do seu trabalho..."
              onChangeText={description => setDescription(description)}
            />
            <Input
              rounded
              placeholder="Numero de contato..."
              autoCapitalize="none"
              onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />
            <Input
              rounded
              placeholder="Cidade em que atua..."
              onChangeText={city => setCity(city)}
            />
            <Button onPress={() => selectImage()}>
              {photo ? photo.originalname : 'Imagem de perfil'}
            </Button>
          </Content>
          <Button round onPress={() => handleSignUp()}>
            <Text center color={'#fff'}>
              Cadastre-se
            </Text>
          </Button>
          <Button
            color="transparent"
            shadowless
            onPress={() => navigation.navigate('Login')}
          >
            <Text center size={16 * 0.75}>
              Já tem uma conta? Entre
            </Text>
          </Button>
        </Block>
      </Container>
    </Block>
  );
}
