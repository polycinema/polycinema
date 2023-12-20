import React, { useEffect } from 'react'
import BannerMovie from '../../components/banner/BannerMovie'
import ListMovie from '../../components/Listmovie/ListMovie'
import { useAppDispatch } from '../../store/hook'
import { deleteValueProduct, deleteTotalPrice } from '../../redux/slices/valueCheckoutSlice'
const HomePage = () => {
        const dispatch = useAppDispatch()
        useEffect(()=>{
                dispatch(deleteValueProduct())
                dispatch(deleteTotalPrice());
        })
        return (
                <>
                        <BannerMovie />
                        <ListMovie />
                </>

        )
}

export default HomePage