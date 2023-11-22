import React ,{useState} from 'react'
import imgUser from '../../../public/img/ic-inforpayment.png'
import imgProduct from '../../../public/img/ic-combo.png'
import {  InputNumber } from 'antd'
import { useGetAllProductsQuery } from '../../redux/api/checkoutApi'
import IsLoading from '../../utils/IsLoading'
import { useAppDispatch } from '../../store/hook'
const ProductCheckout = () => {
  const {data:products,isLoading} = useGetAllProductsQuery()
  const [valueProduct,setValueProduct] = useState()
  const dispacth  = useAppDispatch()
  const onChange = (value) => {
    console.log({...valueProduct, quantity:value});
    

  }
  return (
    <div>
        <div className='flex items-center gap-4'>
          <img className='w-10' src={imgUser} alt="" />
          <div className='text-xl'>THÔNG TIN THANH TOÁN</div>
        </div>
          <table className='w-full mt-4'>
            <tr>
              <td className='font-bold'>Họ Tên :</td>
              <td className='font-bold'>Số Điện Thoại:</td>
              <td className='font-bold'>Email:</td>
            </tr>
            <tr>
              <td>Nguyễn Nho Giang</td>
              <td>0979048136</td>
              <td>nhogiang03tg@gmial.com</td>
            </tr>
          </table>
          <div className='table-product mt-20'>
          <div className='flex items-center gap-4'>
          <img className='w-10' src={imgProduct} alt="" />
          <div className='text-xl'>COMBO ƯU ĐÃI</div>
          </div>
          <table className='w-full mt-8'>
            <tr>
              <td></td>
              <td className='text-center'>Tên Combo</td>
              <td className='text-center'>Giá</td>
              <td className='text-center'>Mô Tả</td>
              <td className='text-center'>Số Lượng</td>
            </tr>
            {isLoading?<IsLoading/>  : products?.data?.map((item)=>(
                <tr key={item.id}>
                <td className='text-center p-2'><img className='w-28' src={item?.image} alt="" /></td>
                <td className='text-center p-2'>{item?.name}</td>
                <td className='text-center p-2'>{item?.price}</td>
                <td className='text-center p-2'>{item?.description}</td>
                <td className='text-center p-2 ' >
                  <InputNumber onClick={()=>console.log(1)} onChange={()=>onChange} min={1}  />
                </td>
              </tr>
              ))
              }
              
              
            
            
            
          </table>
          

          </div>
        </div>
  )
}

export default ProductCheckout

