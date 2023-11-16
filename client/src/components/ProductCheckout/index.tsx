import React from 'react'
import imgUser from '../../../public/img/ic-inforpayment.png'
import imgProduct from '../../../public/img/ic-combo.png'
import imgCombo1 from "../../../public/img/sweet-combo-154545-150623-48.png"
import imgCombo2 from "../../../public/img/beta-combo-154428-150623-83.png"
import {  InputNumber } from 'antd'
const ProductCheckout = () => {
  
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
              <td className='text-center'>Mô Tả</td>
              <td className='text-center'>Số Lượng</td>
            </tr>
            <tr>
              <td className='text-center p-2'><img className='w-28' src={imgCombo1} alt="" /></td>
              <td className='text-center p-2'>Poly Combo 203</td>
              <td className='text-center p-2'>Tiết kiệm 23k Gồm : 1 Bắp + 1 nước</td>
              <td className='text-center p-2 ' >
                <InputNumber/>
              </td>
            </tr>
            
          </table>
          

          </div>
        </div>
  )
}

export default ProductCheckout

