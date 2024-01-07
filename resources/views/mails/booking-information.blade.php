<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MAIL</title>
</head>
<body>
    <h2>BOOKING INFORMATION MAIL</h2>
    
    {{ SimpleSoftwareIO\QrCode\Facades\QrCode::generate(utf8_decode("
        
        Tên khác hàng:Nguyen Nho Giang,
        Email:nhogiang03tg@gmail.com,
        Phòng:A-1,
        Ghế:A1,
        
        ")) }}
</body>
</html>
