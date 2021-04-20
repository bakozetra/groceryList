import React from 'react'
import CurrentList from '../screens/CurrentList'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Text, Image, Platform } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ItemDetails from '../screens/ItemDetails';
import FavoritesList from '../screens/FavoritesList';

const Stack = createStackNavigator();

const CurrentListStack = () => {
    return (

        <Stack.Navigator>
            <Stack.Screen name="CurrentList" component={CurrentList} />
            <Stack.Screen name="ItemDetails" component={ItemDetails}
                options={({ route }) => {
                    return {
                        headerTitle: () => {
                            return <Text>{route.params.item.name}</Text>
                        }
                    }
                }} />
        </Stack.Navigator>
    );
}
const FavouritesListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FavoutitesList" component={FavoritesList} />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
const Tabs = () => {
    return ( 
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, focused}) => {

                        let image ;
                        if (route.name === "Shopping list") {

                            image = Platform.select({
                                android: require("../assets/icons/md-list.png"),
                                ios: require("../assets/icons/ios-list.png")

                            })
                        } else if (route.name === "Favourites") {
                            image = Platform.select({
                                ios: focused
                                    ? require("../assets/icons/ios-star.png")
                                    : require("../assets/icons/ios-star-outline.png"),
                                android: focused
                                    ? require("../assets/icons/md-star.png")
                                    : require("../assets/icons/md-star-outline.png")
                            })
                        }

                        return <Image source={image}
                            resizeMode="contain"
                            style={{ width: 25, tintColor: color }} />
                    },
                })}>

                <Tab.Screen name="Shopping list" component={CurrentListStack} />
                <Tab.Screen name="Favourites" component={FavouritesListStack}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}


export default Tabs

// yarn add @react-navigation/native