import React from 'react'
import CurrentList from '../screens/CurrentList'
import {Text} from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ItemDetails from '../screens/ItemDetails';

const Stack = createStackNavigator();

const CurrentListStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CurrentList" component={CurrentList} />
                <Stack.Screen name="ItemDetails" component={ItemDetails}  options={({route}) => {
                    return {
                        headerTitle :() => {
                            return <Text>{route.params.item.name}</Text>
                        }
                    }
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default CurrentListStack

// yarn add @react-navigation/native