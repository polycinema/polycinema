import "./MovieDetail.css"
const MovieDetail = () => {
  return (
    <>
      <div className="container">
        <h3 className="title">Trang chủ <span className="nameMovie">Biệt Đội Đánh Thuê
          4</span></h3>
        <div className="title1">
          <div className="title1-img">
            <img className="img" src="https://files.betacorp.vn/files/media%2fimages%2f2023%2f10%2f03%2fkumanthong-400x633-101044-031023-29.jpg" alt="" />
          </div>
          <div className="title1-text">
            <h1>Cú máy ăn liền</h1>
            <p>Cú Máy Ăn Tiền lấy bối cảnh thực tế và câu chuyện làm phim những năm 1970 ở Hàn Quốc. Kim Yeol (Song Kang Ho thủ vai) - một đạo diễn điện ảnh có bộ phim đầu tay được giới phê bình khen ngợi, nhưng sự nghiệp của ông tuột dốc không phanh khi liên tiếp ra đời những tác phẩm bị coi là “phim rác”. Sau khi hoàn thành xong bộ phim mới nhất là Cobweb, đạo diễn Kim cảm thấy cần quay lại cái kết để có thể tạo ra một kiệt tác. Tuy nhiên, kịch bản mới không vượt qua được khâu kiểm duyệt và các diễn viên cũng không thể hiểu được cái kết mới của ông. Giữa lịch trình rối rắm, sự phản đối từ nhà sản xuất, sự can thiệp của cơ quan kiểm duyệt và những mâu thuẫn đang xung đột trước mắt khiến đạo diễn Kim như muốn phát điên, nhưng ông vẫn tiếp tục một cách bất chấp: “Nếu tôi có thể thay đổi cái kết, một kiệt tác sẽ xuất hiện. Tất cả những gì tôi cần là 2 ngày”.</p>

            <div className="text1">
              <div className="text-director">
                <span className="director"> ĐẠO DIỄN : </span>
              </div>
              <div className="text1-1">Scott Waugh</div>
            </div>

            <div className="text1">
              <div className="text-director">
                <span className="director"> DIỄN VIÊN : </span>
              </div>
              <div className="text1-1">Um Tae-goo</div>
            </div>

            <div className="text1">
              <div className="text-director">
                <span className="director"> THỂ LOẠI : </span>
              </div>
              <div className="text1-1">Tâm lý</div>
            </div>

            <div className="text1">
              <div className="text-director">
                <span className="director"> THỜI LƯỢNG : </span>
              </div>
              <div className="text1-1">206 phút</div>
            </div>

            <div className="text1">
              <div className="text-director">
                <span className="director"> NGÀY CHIẾU : </span>
              </div>
              <div className="text1-1">20/10/2023</div>
            </div>

          </div>
        </div>
      </div>
      
      <div className="title2">
        <h1>TRAILER</h1>
        <div className="title2-video">
          <iframe width="760" height="415" src="https://www.youtube.com/embed/9s3klPW3KGc?si=KD8ynNLeTLCH8jJw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </div>

    </>
  )
}

export default MovieDetail