import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 16 * 0.3,
    paddingHorizontal: 16,
    backgroundColor: '#fff'
  },
  social: {
    width: 16 * 3.5,
    height: 16 * 3.5,
    borderRadius: 16 * 1.75,
    justifyContent: 'center'
  }
});

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 10, paddingBottom: 25 },
  showsVerticalScrollIndicator: false
})`
  margin-right: 3px;
`;
