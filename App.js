import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Linking, Alert } from 'react-native';

const FactApp = () => {
  const [fact, setFact] = useState('');
  const [url, setUrl] = useState('');
  const [facts, setFacts] = useState([]);

  const addFact = () => {
    if (fact.trim() === '' || url.trim() === '') {
      Alert.alert('필수', '모든 필드를 입력해주세요.');
      return;
    }
    setFacts([...facts, { key: Math.random().toString(), value: fact, link: url }]);
    setFact('');
    setUrl('');
  };

  const deleteFact = (key) => {
    const updatedFacts = facts.filter(item => item.key !== key);
    setFacts(updatedFacts);
  };

  const openUrl = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("오류", "URL을 열 수 없습니다: " + url);
    }
  };

  return (
    <View style={{ marginTop: 20, padding: 50 }}>
      <Text style={{margin: 20,fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>자료수집</Text>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        <TextInput
          placeholder="자료명을 입력하세요."
          style={{ width: '100%', borderColor: 'black', borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 10 }}
          onChangeText={setFact}
          value={fact}
        />
        <TextInput
          placeholder="관련 URL을 입력하세요."
          style={{ width: '100%', borderColor: 'black', borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 10 }}
          onChangeText={setUrl}
          value={url}
        />
        <TouchableOpacity style={{ width: '100%', backgroundColor: '#007BFF', padding: 5, borderRadius: 5 }} onPress={addFact}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>추가</Text>
        </TouchableOpacity>
      </View>
      <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>자료</Text>
      <FlatList
        data={facts}
        renderItem={itemData => (
          <View style={{ padding: 10, marginTop: 20, backgroundColor: '#ffffff', borderColor: 'black', borderWidth: 1, borderRadius: 10 }}>
            <Text>{itemData.item.value}</Text>
            <TouchableOpacity onPress={() => openUrl(itemData.item.link)}>
              <Text style={{color: 'blue'}}>{itemData.item.link}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteFact(itemData.item.key)}>
              <Text style={{color: 'red', marginLeft: '85%', fontSize: 16, fontWeight: 'bold'}}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={{ color: 'grey', fontSize: 27, marginTop: '45%' }}>텅 비었습니다.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FactApp;
