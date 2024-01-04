<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MAIL</title>
</head>
@php
    $dataBarcode = [
        'movie' => $booking->showtime->movie->name,
        'showtime' => $booking->showtime->start_time
    ]
@endphp
<body
    style="font-family: Arial, sans-serif;
background-color: #f0f0f0;
margin: 0;
padding: 0;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;">
    <h2>Thông Tin Vé</h2>

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
            <div class="info">Ngày chiếu: {{ $booking->showtime->show_date }}</div>
            <div class="info">Giờ chiếu: {{ $booking->showtime->start_time }}</div>
            <div class="info">Rạp chiếu: PolyCinema</div>
        </div>
        <div class="barcode" style="border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 15px;">
            <img src="data:image/png;base64,{{ DNS2D::getBarcodePNG($booking->booking_id, 'PDF417') }}" alt="">
        </div>
        <div class="seat-info" style="font-size: 0.8em;
        color: #777;">Phòng chiếu:
            {{ $booking->showtime->room->room_name }}</div>
        <div class="seat-info" style="font-size: 0.8em;
        color: #777;">Ghế: @foreach ($booking->seats as $seat)
                {{ $seat->seat_name . ', ' }}
            @endforeach
        </div>
        <div class="footer" style="margin-top: 15px;
        color: #555;">Vui lòng giữ vé này để xác nhận quyền vào
            rạp.</div>
    </div>
</body>

</html>
