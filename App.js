// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import Task from "./components/Task";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InputTask from "./components/InputTask";

// Upgrade dependencies: npx expo install --fix

// TO RUN: NPX EXPO START

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.2:8080/todos/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // let titulo: string = todos[0].body;
  // let Cant: number = "";

  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          {/*EL  QUE FUNCIONÓ keyExtractor={(todo, index) => `${todo.id}-${index}`}*/}

          {/* <Text style={styles.text_sup}>{JSON.stringify(todos)}</Text> */}
          <FlatList
            data={todos}
            keyExtractor={(todo) => {
              //console.log(todos);
              return todo.id;
            }}
            ListHeaderComponent={() => <Text style={styles.title}>Hoy</Text>}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item }) => (
              <Task clearTodo={clearTodo} toggleTodo={toggleTodo} {...item} />
            )}
          />
          <InputTask todos={todos} setTodos={setTodos} />
        </SafeAreaView>
        <StatusBar style="auto"/>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

/* <Text>{JSON.stringify(todos[10], null, 2)}</Text> //para referencia, funcionamiento interesante */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    // alignItems: "center",
    // justifyContent: "flex-start",
  },

  text_sup: {
    fontSize: 40,
  },

  contentContainerStyle: {
    padding: 15,
  },

  title: {
    fontWeight: "800",
    color: "black",
    fontSize: 28,
    marginBottom: 15,
  },
});
