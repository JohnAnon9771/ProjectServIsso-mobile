import { Dimensions, StyleSheet } from 'react-native';

import styled from 'styled-components/native';

import theme from '../../theme';
import Constants from 'expo-constants';

const { statusBarHeight } = Constants;
const { width, height } = Dimensions.get('screen');

export const DescriptionProfile = styled.Text`
  margin: 10px;
  font-size: 16px;
  color: #000;
`;

export const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: 'absolute'
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875
  },
  title: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 2
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25
  },
  middle: {
    justifyContent: 'center'
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25
  }
});
