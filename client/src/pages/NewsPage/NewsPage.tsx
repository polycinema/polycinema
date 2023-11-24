import React, { useEffect, useState } from 'react'
import { INews, getAllNews } from '../../api/News'
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const NewsPage = () => {
    const [loadNews, setloadNews] = useState<INews[]>()

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await getAllNews()
                    setloadNews(data.data);
  
                } catch (error) {
                    console.log(error);
  
                }
            }
        )()
  
    }, [])
  return (
         
    <div className='md:my-[3rem] my-[0.5rem] md:w-[80%] mx-auto'>
    <div className='md:grid grid-cols-3'>
        
    {loadNews?.map((items,index) => {
                return(
                  <div className='md:w-[100%] p-4'>
            <img className='w-full' src={`${items.image}`} alt="" />
            <div>
                <h2 className='font-bold text-[15px] my-2'>{items.title}</h2>
                <p className='text-justify'>{items.description}</p>

               <Link to={`${items.id}`} className='hover:text-[#397EBA]'>Xem thêm... </Link>

            </div>
        </div>
                )
              })}

        
    </div>
    
    </div>

            
        
  );
};

export default NewsPage;