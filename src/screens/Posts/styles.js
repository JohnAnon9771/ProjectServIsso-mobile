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
  font-style: italic;
`;

export const City = styled.Text`
  font-size: 12px;
  color: #666;
  align-self: flex-end;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1
})`
  font-size: 12px;
  color: #666;
`;
export const Title = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 2px;
`;

export const SearchInput = styled.TextInput`
  padding: 7px;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 23px;
  margin: 7px;
  align-items: center;
`;
