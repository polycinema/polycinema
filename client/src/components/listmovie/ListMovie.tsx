import "./ListMovie.css"
import { Link } from 'react-router-dom'
import { AiFillPlayCircle } from "react-icons/ai";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { Button, Modal } from 'antd';
import {  useState } from "react";
import YouTube from "react-youtube";
const ListMovie = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => {
                setIsModalOpen(true);
                };
        const handleCancel = () => {
                        setIsModalOpen(false);
                        
                };
                
                
                
        return (
        <div className='listmovie__container '>
        <div className="tab-listmovie ">
                <ul className='list-tab'>
                        <li className='item-tab'>
                                <a href="#tab_1" data-toggle="tab" className=''>
                                        Phim sắp chiếu
                                </a>
                        </li>
                        
                        <li className='item-tab'>
                                <a href="#tab_2" data-toggle="tab" className=''>
                                        Phim đang chiếu
                                </a>
                        </li>
                        <li className='item-tab'>
                                <a href="#tab_3" data-toggle="tab" className=''>
                                Suất chiếu đặc biệt
                                </a>
                        </li>
                </ul>
        </div>
        <div className="product__movies">
        
                
                <div className="product__movies-item">
                <Modal title="Trailer : Qủy Linh Nhi"  
                open={isModalOpen}
                width={700}
                onCancel={handleCancel}>
                        <YouTube videoId="Wkdv3tUfs2k?si=jleY-5DkdxR0396Q" 
                        />
                </Modal> 
                <div className='movie-img'>
                <div className="bg-movie">

                </div>

                <img className='movie-img-item'  src="https://files.betacorp.vn/files/media%2fimages%2f2023%2f10%2f03%2fkumanthong-400x633-101044-031023-29.jpg" alt="" />
                        
                        <div className='movie-play'>
                        <Button onClick={showModal}>
                        <AiFillPlayCircle/>
                        </Button>

                        </div>
                        <div className='movie-icon-tag'>
                        <img src="https://www.betacinemas.vn/Assets/Common/icons/films/c-18.png" alt="" />
                        </div>
                <div className='movie-icon-sale' style={{backgroundImage:"url(https://www.betacinemas.vn/assets/frontend/layout/img/hot.png)"}}>
                </div>
                </div>
                        
                        

                
                
                <div className="movie-item-description">
                        <h4 className="movie-name">
                                <Link to={""}>
                                Kumanthong:Qủy linh nhi
                                </Link>
                                
                        </h4>
                        <div className="movie-des">
                                <p className='movie-des-1'>
                                        Thể loại:
                                </p>
                                <p className='movie-des-2'>
                                        Kinh dị
                                </p>
                        </div>
                        <div className="movie-des">
                                <p className='movie-des-1'>
                                        Thời lượng:
                                </p>
                                <p className='movie-des-2'>
                                        87 phút
                                </p>
                        </div>
                        <button className='btn-movie'>
                        <span className='btn-movie-icon'>
                        <BsFillTicketPerforatedFill/>
                        </span>
                        Mua vé
                </button>
                </div>
                

                </div>
                

        
        </div>
        </div>
  )
  }


export default ListMovie