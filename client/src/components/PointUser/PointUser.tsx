
const PointUser = () => {
  return (
    <div className=" max-w-6xl m-auto pt-5">
      <div className="bg-[#FFFFFF]">
        <hr />
        <h1 className="mx-4 pt-2 text-[#0D5D9F]">TỔNG QUAN</h1>
          <div className="mx-8 pt-4">
             <div className="flex"><p className="text-sm">Điểm đã tích lũy</p> <span className="mx-9 text-sm">00điểm</span> </div>
             <div className="flex"><p className="text-sm">Điểm đã sử dụng</p> <span className="mx-9 text-sm">00điểm</span> </div>
             <div className="flex"><p className="text-sm">Điểm hiện có</p> <span className="mx-14 text-sm">00điểm</span> </div>
             <div className="flex"><p className="text-sm">Điểm sắp hết hạn</p> <span className="mx-9 text-sm">00điểm</span> </div>

          </div>
       <h1 className="mx-4 pt-5 text-[#0D5D9F]"> LỊCH SỬ ĐIỂM </h1>
       <div className="flex space-x-60 mx-8 pt-2">
          <p>Thời gian</p>
          <p>Số điểm</p>
          <p>Nội dung sử dụng</p>
       </div>
      </div>
      <br />
    </div>

  )
}

export default PointUser
