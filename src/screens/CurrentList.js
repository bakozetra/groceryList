import React, { useEffect, useState } from 'react'

import { SectionList, View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'

import ListItem, {SectionHeader, Separator } from '../components/ListItem'
import AddItem from '../components/AddItem'
import { useCurrentList } from '../util/ListManager';



// const updateCurrentList = (list) => {
//     AsyncStorage.setItem("@@GrocerList/currentList", JSON.stringify(list))
// }

export default ({ navigation }) => {
    const { 
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart ,
        favourites ,
        addToFavourites
        } = useCurrentList()


    if (loading) {
        return (<SafeAreaView>
            <Text>Loading...</Text>
        </SafeAreaView>)
    }
    console.log(cart);
    // console.log(favourites);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <SectionList
                    sections={[
                        { title : 'list', data : list },
                        { title : 'cart', data : cart },
                    ]}
                    renderSectionHeader={({ section }) => (
                        <SectionHeader title={section.title} />
                    )}
                   
                    renderItem={({ item, index }) => (
                      
                        <ListItem name={item.name}
                            onFavouritePress={() => addToFavourites(item)}
                            isFavourite={item.isFavourited}
                            onAddedSwipe={() => addToCart(item)}
                            onDeleteSwipe={() => removeItem(item.id)}
                            onRowPress={() => {
                                navigation.navigate("ItemDetails", {
                                    item
                                }) 
                            }}
                        />

                    )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator></Separator>}
                    ListHeaderComponent={() => <AddItem onSubmitEditing={({ nativeEvent: { text } }) => addItem(text)} />}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>)

};