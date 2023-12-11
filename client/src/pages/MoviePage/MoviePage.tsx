import React from 'react'
import { Link } from 'react-router-dom'

const MoviePage = () => {

  // const {data} = useGetShowTimesMovieQuery()
  // console.log(data?.data);
  
  return (
    <div className='moviepage__container'>
      <div className="moviepage-date max-w-[1150px] mx-auto  border-b border-gray-400 p-4">
        <ul className='flex md:space-x-7 py-4 flex-wrap'>
          <li className='px-4 py-2 text-center  active:text-[#03599d] active:border-b-4 border-b-[#03599d]'>
            <Link to={""}>
              <span className='text-5xl mr-3'>11</span>/10
            </Link>
          </li>

          <li className='px-4 py-2 text-center  active:text-[#03599d] active:border-b-4 border-b-[#03599d]'>
            <Link to={""}>
              <span className='text-5xl mr-3'>12</span>/10
            </Link>
          </li>


          <li className='px-4 py-2 text-center active:text-[#03599d] active:border-b-4 border-b-[#03599d]'>
            <Link to={""}>
              <span className='text-5xl mr-3'>13</span>/10
            </Link>
          </li>
          <li className='px-4 py-2 text-center active:text-[#03599d] active:border-b-4 border-b-[#03599d]'>
            <Link to={""}>
              <span className='text-5xl mr-3'>14</span>/10
            </Link>
          </li>
          <li className='px-4 py-2 text-center active:text-[#03599d] active:border-b-4 border-b-[#03599d]'>
            <Link to={""}>
              <span className='text-5xl mr-3'>15</span>/10
            </Link>
          </li>
          <li className='px-4 py-2 text-center active:text-[#03599d] active:border-b-4 border-b-[#03599d]'>
            <Link to={""}>
              <span className='text-5xl mr-3'>16</span>/10
            </Link>
          </li>
          <li className='px-4 py-2 text-center active:text-[#03599d] active:border-b-4 border-b-[#03599d]'>
            <Link to={""}>
              <span className='text-5xl mr-3'>17</span>/10
            </Link>
          </li>




        </ul>

      </div>
      {/* <ListMovie /> */}
      <div className='bg-black px-4'>
        <div className='max-w-[1150px] mx-auto py-10 overflow-hidden'>
          <h4 className='mx-auto text-white md:text-4xl font-bold border-b-4 border-b-[#03599d] w-fit p-4 '>Phim Sắp Chiếu</h4>
          <div className='flex gap-1 md:translate-x-[400px] py-20'>
            <div>
              <Link to={""}>
                <img className='w-48' src="https://files.betacorp.vn/files/media/images/2023/10/09/cw-400x633-162007-091023-43.jpg" alt="" />
              </Link>
            </div>

            <div>
              <Link to={""}>
                <img className='w-40' src="https://files.betacorp.vn/files/media/images/2023/10/03/th-nh-ph-ng-g-t-payoff-poster-kh-i-chi-u-13-10-2023-1-113244-031023-35.png" alt="" />
              </Link>
            </div>

            <div>
              <Link to={""}>
                <img className='w-40' src="	https://files.betacorp.vn/files/media/images/2023/09/27/700x1000-vtm-1-153242-270923-76.png" alt="" />
              </Link>
            </div>
            <div>
              <Link to={""}>
                <img className='w-40' src="https://files.betacorp.vn/files/media/images/2023/10/03/700x1000-5demkinhhoang-115804-031023-17.png" alt="" />
              </Link>
            </div>
            <div>
              <Link to={""}>
                <img className='w-48' src="https://files.betacorp.vn/files/media/images/2023/10/10/384512522-860973838723843-7797595519513200784-n-copy-103620-101023-46.jpg" alt="" />
              </Link>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviePage