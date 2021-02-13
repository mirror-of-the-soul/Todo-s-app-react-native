import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';
import {THEME} from '../theme';
import {TodoContext} from '../context/todo/todoContext';
import {ScreenContext} from '../context/screen/screenContext';

export const MainScreen = () => {
  const {addTodo, todos, removeTodo} = useContext(TodoContext)
  const {changeScreen} = useContext(ScreenContext)
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  useEffect(() => {
    const update = () => {
     const width =
       Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
     setDeviceWidth(width)
    }

    Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.removeEventListener('change', update)
    }
  })

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({item}) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>
        )}
      />
    </View>
  )
  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        {/*Для картинок с локальным местопложением*/}
        <Image
          style={styles.image}
          source={require('../../assets/no-items.png')}
        />
        {/*Для картинок с удаленным местопложением, ссфлка на изодбражение вствляетс я впарметр uri*/}
        {/*<Image*/}
        {/*  style={styles.image}*/}
        {/*  source={{*/}
        {/*    uri:*/}
        {/*      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'*/}
        {/*  }}*/}
        {/*/>*/}
      </View>
    )
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo}/>

      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})
