import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {

  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`)
      .then(response => {
        if (!response)
          throw new Error('Error in fetch: ' + response.statusText);
        return response.json();
      })
      .then(data => {
        setRecipes(data.meals);
        console.log("joujee fetchi jepa")
        console.log(search)

      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginTop: 100 }}>
        <TextInput
          placeholder='Type an ingredient'
          value={search}
          onChangeText={text => setSearch(text)}
        />
        <Button
          title="Find"
          onPress={fetchRecipes}
        />
      </View>

      <View style={{ flex: 6 }}>
        <FlatList
          data={recipes}
          renderItem={({ item }) =>
            <View style={{ margin: 10 }}>
              <Text>{item.strMeal}</Text>

            </View>
          }
        />
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
