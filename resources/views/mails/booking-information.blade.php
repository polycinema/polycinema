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
        <tr>
            <td style="padding: 20px; text-align: center;">
                <h2>Chào {{ $booking->user->name }} Dưới Đây Thông Tin Chi Tiết Đơn Hàng </h2>
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
            <div class="info">Mã đơn hàng: {{ $booking->booking_id }}</div>
            <div class="info">Ngày chiếu: {{ \Carbon\Carbon::parse($booking->showtime->show_date)->format('d/m/Y') }}
            </div>
            <div class="info">Giờ chiếu: {{ \Carbon\Carbon::parse($booking->showtime->start_time)->format('H:i') }}
            </div>
            <div class="info">Rạp chiếu: PolyCinema</div>
        </div>
        <div class="barcode" style="border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 15px;">
        @php
            $width = 5; // Adjust this value as needed
            // $code = DNS1D::getBarcodePNGPath($booking->booking_id, 'PHARMA2T', $width, 33, [0, 0, 0]);
            $code = DNS1D::getBarcodePNGPath($booking->booking_id, 'PHARMA2T', 3, 33, [0, 0, 0])
        @endphp
            <img src="{{ $message->embed($code) }}"
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
        <h4>Tổng Tiền: {{ number_format($booking->total_price) . 'đ' }}</h4>
        <div class="footer" style="margin-top: 15px;
        color: red;">*Vui lòng giữ vé này để xác nhận quyền vào
            rạp.
        </div>
    </div>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%">
        <tr>
            <td style="padding: 20px; text-align: center;">
                <span style="color: #333">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.!</span>
            </td>
        </tr>
    </table>

</body>

</html>
