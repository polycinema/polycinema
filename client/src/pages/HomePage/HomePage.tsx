import React, { useEffect } from 'react'
import BannerMovie from '../../components/banner/BannerMovie'
import ListMovie from '../../components/Listmovie/ListMovie'
import { useAppDispatch } from '../../store/hook'
import { deleteValueCheckoutSeat, deleteValueProduct, deleteActionTogle, deleteTotalPrice } from '../../redux/slices/valueCheckoutSlice'



const HomePage = () => {
        const dispatch = useAppDispatch()
        useEffect(()=>{
                dispatch(deleteValueCheckoutSeat())
                dispatch(deleteValueProduct())
                dispatch(deleteActionTogle())
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