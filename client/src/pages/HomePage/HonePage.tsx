import React, { useEffect } from 'react'
import BannerMovie from '../../components/banner/BannerMovie'
import ListMovie from '../../components/Listmovie/ListMovie'
import { useAppDispatch } from '../../store/hook'
import { deleteValueCheckoutSeat } from '../../redux/slices/valueCheckoutSlice'



const HonePage = () => {
        const dispatch = useAppDispatch()
        useEffect(()=>{
                dispatch(deleteValueCheckoutSeat())
        })
        return (
                <>
                        <BannerMovie />
                        <ListMovie />
                </>

        )
}

export default HonePage