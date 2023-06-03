import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import db from './firebase'; // Path to your firebase.js file
import { ref, set, onValue, push, remove, update } from "firebase/database";

// Component for rendering each item in the list
const RenderListItem = ({ item, handleUpdateItem, handleDeleteItem }) => {
  const [editableText, setEditableText] = useState(item.Name);

  const handleTextChange = (text) => {
    setEditableText(text);
  };

  return (
    <View key={item.id}>
      <TextInput
        value={editableText}
        onChangeText={handleTextChange}
        placeholder="Enter text"
      />
      <View style={{ flexDirection: 'row' }}>
        <Button title="Update" onPress={() => handleUpdateItem(item.id, editableText)} />
        <Button title="Delete" onPress={() => handleDeleteItem(item.id)} />
      </View>
    </View>
  );
};


const App = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from Firebase on initial app load and whenever there's a change in the data
  const fetchData = () => {
    const dataRef = ref(db, 'items');
    onValue(dataRef, (snapshot) => {
      const items = snapshot.val();
      if (items) {
        // Convert the retrieved object into an array of items with IDs
        const data = Object.entries(items).map(([key, value]) => ({ ...value, id: key }));
        console.log(data, 'data')
        setData(data);
      } else {
        setData();
      }
    });
  };

  // Add a new item to Firebase database
  const handleAddItem = async () => {
    try {
      const dataRef = ref(db, 'items');
      const newDataRef = push(dataRef);
      const newId = newDataRef.key;

      await set(ref(db, 'items/' + newId), {
        Name: text,
      });

      console.log('Data saved with ID:', newId);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Update an existing item in Firebase database
  const handleUpdateItem = (id, newText) => {
    update(ref(db, `items/${id}`), {
      Name: newText,
    })
  };

  // Delete an item from Firebase database
  const handleDeleteItem = (id) => {
    const tasksRef = ref(db, (`items/${id}`));

    remove(tasksRef).then(() => {
      console.log("location removed");
    });
  };

  const renderListItem = ({ item }) => {
    return (
      <RenderListItem
        item={item}
        handleUpdateItem={handleUpdateItem}
        handleDeleteItem={handleDeleteItem}
      />
    );
  };

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter text"
      />
      <Button title="Add" onPress={handleAddItem} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
      />

    </View>
  );
};

export default App;
