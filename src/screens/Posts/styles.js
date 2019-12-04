import styled from 'styled-components/native';

export const Listining = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false
})`
  margin-top: 5px;
`;

export const CardList = styled.View`
  background: #fff;
  border-radius: 10px;
  padding: 10px 15px;
  margin: 6px;
  flex-direction: row;
  align-items: center;
  border-color: #ddd;
  shadow-color: #000;
  shadow-opacity: 0.8;
  shadow-radius: 2;
  elevation: 1;
`;

export const Avatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: #eee;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Category = styled.Text`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1
})`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;
export const Title = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 2px;
`;
