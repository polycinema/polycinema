import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from "../../public/img/logo.jpg"
type Props = {}

const LayoutWebsite = (props: Props) => {
  return (
    <div className='m-auto'>
    <div className='bg-black'>
      <div className='text-white flex flex-row-reverse md:mx-40 md:-px-2'>
        <Link to={""} className='hover:text-[#397EBA] mx-1'>Đăng ký</Link> |
        <Link to={""} className='hover:text-[#397EBA] mx-1'>Đăng nhập</Link>
      </div>
    </div>
    <div className='sticky top-0 z-50'>
      <header className='border-b-[1px] border-[#E7E7E7] bg-white'>
        <div className='md:max-w-6xl md:flex md:mx-auto md:justify-between md:py-4'>
          <div>
            <a href=''><img src={logo} alt='' /></a>
          </div>
          <div>
            <ul className='flex md:space-x-6 space-x-5 md:py-4 font-bold md:text-lg sm:text-base justify-center my-2'>
              <li><Link to={''} className='hover:text-[#397EBA]'>PHIM</Link></li>
              <li><Link to={''} className='hover:text-[#397EBA]'>GIÁ VÉ</Link></li>
              <li><Link to={''} className='hover:text-[#397EBA]'>TIN MỚI VÀ ƯU ĐÃI</Link></li>
              <li><Link to={''} className='hover:text-[#397EBA]'>THÀNH VIÊN</Link></li>
            </ul>
          </div>
        </div>
      </header>
    </div>

        <main >
      < Outlet />
        </main>

        <hr/>

        <footer>
    <div className='md:m-auto md:max-w-6xl md:py-4'>
      <div className='md:grid md:grid-cols-3 md:gap-8'>
        <div className='text-center md:text-left text-xs md:text-base'>
          <a href=""><img src={logo} alt="" className='h-12' /></a>
          <h2 className='md:px-4 md:pt-2 hover:text-[#397EBA]'><a href="">Tuyển dụng</a></h2>
          <h2 className='md:px-4 md:pt-2 hover:text-[#397EBA]'><a href="">Giới thiệu</a></h2>
          <h2 className='md:px-4 md:pt-2 hover:text-[#397EBA]'><a href="">Liên hệ</a></h2>
          <h2 className='md:px-4 md:pt-2 hover:text-[#397EBA]'><a href="">Liên hệ quảng cáo</a></h2>
          <h2 className='md:px-4 md:pt-2 hover:text-[#397EBA]'><a href="">Hướng dẫn đặt vé online</a></h2>
        </div>
        <div className='text-center md:text-left font-semibold text-lg text-[#333333] pt-4 md:pt-0'>
          <h1>KẾT NỐI VỚI CHÚNG TÔI</h1>
        </div>
        <div className='text-center md:text-left'>
          <h1 className='md:text-lg md:font-semibold text-[#333333]'>LIÊN HỆ</h1>
          <h2 className='text-sm  text-[#333333] pt-2'>CÔNG TY CỔ PHẦN BETA MEDIA</h2>
          <p className='text-[10px] pt-2'>Giấy chứng nhận ĐKKD số: 0106633482 - Đăng ký lần đầu ngày 08/09/2014 tại Sở Kế hoạch và Đầu tư Thành phố Hà Nội</p>
          <p className='text-[10px] pt-2'>Địa chỉ trụ sở: Tầng 3, số 595, đường Giải Phóng, phường Giáp Bát, quận Hoàng Mai, thành phố Hà Nội</p>
          <p className='text-[10px] pt-2'>Hotline: 1900 636807</p>
          <p className='text-[10px] pt-2'>Email: cskh@betacorp.vn</p>
          <p className='font-semibold text-[#333333]  pt-2'>Liên hệ hợp tác kinh doanh:</p>
          <p className=' pt-2 text-[13px]'>Email: phuongdh@betagroup.vn</p>
          <p className=' pt-2 text-[13px]'>Phone: +8490 666 9169</p>
      </div>
    </div>
  </div>
</footer>
    </div>

  )
}

export default LayoutWebsite
