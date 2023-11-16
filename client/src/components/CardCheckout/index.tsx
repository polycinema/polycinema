import React from 'react'
import { FaTag } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaLandmark } from "react-icons/fa6";
import { FaGrip } from "react-icons/fa6";
import Button from '../Button';
const CardCheckout = () => {
        return (
                <div>
                        <div className='border-b-4 pb-8 border-dashed'>
                                <div className='flex justify-between px-4'>
                                        <img className='w-[150px]' src="https://files.betacorp.vn/files/media%2fimages%2f2023%2f10%2f03%2fkumanthong-400x633-101044-031023-29.jpg" alt="" />
                                        <h1 className='text-[#03599d] text-2xl font-bold pl-2'>Qủy Linh Nhi</h1>
                                </div>
                                <div className='grid grid-cols-2 items-center ml-12  gap-14 mt-8'>
                                        <p className='flex items-center text-[14px]'><FaTag /> <span>Thể loại</span></p>
                                        <p className='font-bold text-[14px]'>Kinh dị</p>
                                </div>
                                <div className='grid grid-cols-2 ml-12 items-center  gap-14 mt-6'>
                                        <p className='flex items-center text-[14px]'><FaHistory /> <span>Thời lượng</span></p>
                                        <p className='font-bold text-[14px]'>90 phút</p>
                                </div>
                        </div>
                        <div >
                                <div className='grid grid-cols-2 items-center ml-12  gap-14 mt-8'>
                                        <p className='flex items-center text-[14px]'><FaCalendarDays /> <span>Ngày chiếu</span>
                                        </p>
                                        <p className='font-bold text-[14px]'>15/11</p>
                                </div>

                                <div className='grid grid-cols-2 items-center ml-12  gap-14 mt-8'>
                                        <p className='flex items-center text-[14px]'><FaHistory /> <span>Giờ chiếu</span></p>
                                        <p className='font-bold text-[14px]'>10:00</p>
                                </div>
                                <div className='grid grid-cols-2 items-center ml-12  gap-14 mt-8'>
                                        <p className='flex items-center text-[14px]'><FaDesktop /> <span>Phòng chiếu</span></p>
                                        <p className='font-bold text-[14px]'>A1</p>
                                </div>

                        </div>
                        <div className='flex justify-center'>
                                <Button width='100px'>
                                        Tiếp tục
                                </Button>
                        </div>
                </div>

        )
}

export default CardCheckout