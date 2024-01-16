<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MAIL</title>
</head>

<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .ticket {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        width: 300px;
        text-align: center;
        border: 2px dashed #999;
        /* Thêm đường viền nét đứt màu xám */
    }

    .movie-title {
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .details {
        font-size: 0.9em;
        color: #555;
        margin-bottom: 15px;
    }

    .barcode {
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 15px;
    }

    .seat-info {
        font-size: 0.8em;
        color: #777;
    }

    .footer {
        margin-top: 15px;
        color: #555;
    }
</style>

<body
    style="font-family: Arial, sans-serif;
background-color: #f0f0f0;
margin: 0;
padding: 0;
display: flex;
justify-content: center;
align-items: center;">
    <center>
        <h2>Thông Tin Chi Tiết Đơn Hàng</h2><br>
    </center>

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
            ADUAUDAUDUH</div>
        <div class="details" style="font-size: 0.9em;
        color: #555;
        margin-bottom: 15px;">
            <div class="info">Mã đơn hàng: ABCABCCBA</div>
            <div class="info">Ngày chiếu: {{ \Carbon\Carbon::parse('2024-01-16')->format('d/m/Y') }}
            </div>
            <div class="info">Giờ chiếu: {{ \Carbon\Carbon::parse('2024-01-16')->format('H:i') }}
            </div>
            <div class="info">Rạp chiếu: PolyCinema</div>
        </div>
        <div class="barcode" style="border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 15px;">
            <img src="http://localhost:8000/{{ DNS1D::getBarcodePNGPath('4445645656', 'PHARMA2T',3,33,array(0,0,0)) }}"
                alt="barcode" />
        </div>
        <div class="seat-info" style="font-size: 0.8em;
        color: #777;">Phòng chiếu:
            ẠASJNJADNDND</div>
        <div class="seat-info" style="font-size: 0.8em;
        color: #777;">Ghế: ẠDIADJIAJIDAIJ
        </div>
        <div class="footer" style="margin-top: 15px;
        color: #555;">Vui lòng giữ vé này để xác nhận quyền vào
            rạp.</div>
    </div>
</body>

</html>
