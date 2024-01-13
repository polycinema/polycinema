<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MAIL</title>
</head>

<body
    style="font-family: Arial, sans-serif;
background-color: #f0f0f0;
margin: 0;
padding: 0;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
text-align: center">
    <h2>Thông Tin Chi Tiết Đơn Hàng</h2>

    <div class="ticket"
        style="background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    text-align: center;
    border: 2px dashed #999;">
        <div class="movie-title" style="font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 10px;">
            {{ $booking->showtime->movie->name }}</div>
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
            <img src="data:image/png;base64,{{ DNS1D::getBarcodePNG('4', 'C39+', 3, 33, [1, 1, 1], true) }}"
                alt="barcode" />
        </div>
        <div class="seat-info" style="font-size: 0.8em;
        color: #777;">Phòng chiếu:
            {{ $booking->showtime->room->room_name }}</div>
        <div class="seat-info" style="font-size: 0.8em;
        color: #777;">Ghế: @foreach ($booking->seats as $seat)
                {{ $seat->seatType->name . ', ' }}
            @endforeach
        </div>
        <div class="footer" style="margin-top: 15px;
        color: #555;">Vui lòng giữ vé này để xác nhận quyền vào
            rạp.</div>
    </div>
</body>

</html>
