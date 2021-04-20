import AsyncStorage from '@react-native-community/async-storage'
import "react-native-get-random-values";
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react'


const updateCurrentList = (list) => {
    AsyncStorage.setItem("@@GrocerList/currentList", JSON.stringify(list))
}
const updateToCurrentCart = (cart) => {
    AsyncStorage.setItem("@@GrocerList/currentCart", JSON.stringify(cart))
}

const updateToFavouriteList = (favourites) => {
    AsyncStorage.setItem("@@GrocerList/currentFavourites" , JSON.stringify(favourites))
}


export const useCurrentList = () => {

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [cart , setCart] = useState([])
    const [favourites , setFavourites] = useState([])

    const addItem = (text) => {
        const newList = [{ id: uuid(), name: text , isFavourited : false }, ...list]
        setList(newList)
        updateCurrentList(newList)

    }
    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
        updateCurrentList(newList)
    }
    const addToCart = (item) => {
        const newCart = [item, ...cart]
        setCart(newCart)
        removeItem(item.id)
        updateToCurrentCart(newCart)
    }
    const addToFavourites = (item) => { 
        const mapList = list.map( favourite => {
            
            if(item.id === favourite.id) {
                return {
                    ...favourite ,
                   isFavourited : !favourite.isFavourited ,
                }
            }
            return favourite
        })
        setFavourites(mapList)
        updateToFavouriteList(mapList)
    }

    console.log(list);
//    AsyncStorage.clear();
    useEffect(() => {

        setTimeout(() => {
            Promise.all([
            AsyncStorage.getItem('@@GrocerList/currentList'),
            AsyncStorage.getItem('@@GrocerList/currentCart'), 
            AsyncStorage.getItem('@@GrocerList/currentFavourites')])
            .then(([list , cart , favourites]) => [JSON.parse(list) , JSON.parse(cart), JSON.parse(favourites)])
            .then(([list , cart , favourites]) =>  {
                    if (list) {
                        setList(list)
                    }
                    if (cart) {
                        setCart(cart)
                    }
                    if (favourites) {
                        setFavourites(favourites)
                    }
                    setLoading(false)
                })
        }, 2000)
    }, [])


    return {
        list,
        loading,
        addItem,
        removeItem,
        cart ,
        addToCart ,
        favourites ,
        setFavourites ,
        addToFavourites
    }
}