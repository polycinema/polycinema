
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MAIL</title>
</head>

<body style="font-family: Arial, sans-serif;  margin: 0; padding: 0; text-align: center;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%">
        <tr >
            <td style="padding: 20px; text-align: center;">
                <h1>Thông Tin Chi Tiết Đơn Hàng</h1>               
            </td>
        </tr>
    </table>
    <div class="ticket"
        style="background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    text-align: center;
    border: 2px dashed #999;
    margin: 0 auto;">
      <!-- <h1>Thông Tin Chi Tiết Đơn Hàng</h1> -->
        <div class="movie-title" style="font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 10px;">
            {{ $booking->showtime->movie->name }}
        </div>
        <div class="details" style="font-size: 0.9em;
        color: #555;
        margin-bottom: 15px;">
            <div class="info">Mã đơn hàng {{ $booking->booking_id }}</div>
            <div class="info">Ngày chiếu: {{ \Carbon\Carbon::parse($booking->showtime->show_date)->format('d/m/Y') }}
            </div>
            <div class="info">Giờ chiếu: {{ \Carbon\Carbon::parse($booking->showtime->start_time)->format('H:i') }}
            </div>
            <div class="info">Rạp chiếu: PolyCinema</div>
        </div>
        <div class="barcode" style="border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 15px;">
            <img src="http://localhost:8000/{{ DNS1D::getBarcodePNGPath($booking->booking_id, 'PHARMA2T',3,33,array(0,0,0)) }}"
                alt="barcode" />
                
        </div>
        <div class="seat-info" style="font-size: 0.8em;
        color: #777;">Phòng chiếu:
            {{ $booking->showtime->room->room_name }}
        </div>
        <div class="seat-info" style="font-size: 0.8em;
        color: #777;">Ghế: @foreach ($booking->seats as $seat)
                {{ $seat->seat_name . ', ' }}
            @endforeach
        </div>
        <h1>Tổng Tiền: {{ $booking->total_price }}</h1>
        <div class="footer" style="margin-top: 15px;
        color: #555;">Vui lòng giữ vé này để xác nhận quyền vào
            rạp.
        </div>
    </div>

</body>

</html>

