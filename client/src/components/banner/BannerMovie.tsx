import "./BannerMovie.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    return (
    <div className="box-all">
         <Slider {...settings} className="w-full">
        <div className="slider">
            <img src="https://files.betacorp.vn/files/ecm/2023/09/25/vani-bc-1702x621-copy-133653-250923-54.jpg"  alt=""/>
        </div>
        <div >
           <img src="https://files.betacorp.vn/files/ecm/2023/04/21/mer-resize-1702-x-621-140337-210423-86.png"  alt=""/>
        </div>
        <div >
           <img src="https://files.betacorp.vn/files/ecm/2023/04/21/mer-resize-1702-x-621-140337-210423-86.png"  alt=""/>
        </div>
        <div >
            <img src="https://files.betacorp.vn/files/ecm/2023/09/29/combo-combo-1702-x-621-shrink-100351-290923-10.jpg"  alt=""/>
        </div>
        <div >
            <img src="https://files.betacorp.vn/files/ecm/2023/10/03/kumanthong-1702x621-102427-031023-47.jpg"  alt=""/>
        </div>
        <div >
            <img src="https://files.betacorp.vn/files/ecm/2023/10/02/sleep-1702x621-172735-021023-80.jpg"  alt=""/>
        </div>
        </Slider>
    </div>
    )
}
export default BannerMovie;
