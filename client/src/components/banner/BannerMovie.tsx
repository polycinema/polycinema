import "./BannerMovie.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { IBanner, getAllBanner } from "../../api/Banner";

const BannerMovie: React.FC = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        prevArrow: false,
        nextArrow: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    };

    const [banner, setBanner] = useState<IBanner[]>()
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await getAllBanner()
                    setBanner(data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        )()
    }, [])
    return (
        <div className="box-all">
            <Slider {...settings} className="w-full">
                {banner?.filter((item)=>item?.status == "active")?.map((banner: IBanner, index) => (
                    <div className="slider" key={index + 1}>
                        <img src={banner.name} alt="" />
                    </div>
                ))
                }

            </Slider>
        </div>
    )
}
export default BannerMovie;
