<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chào mừng   đến với hệ thống</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        .container {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 600px;
            width: 100%;
            text-align: left;
        }

        h2 {
            color: #333;
        }

        p {
            color: #666;
        }

        a {
            color: #007BFF;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .btn-home {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

        .btn-home:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif;

margin: 0;
padding: 0;
text-align: center;
display: flex;
align-items: center;
justify-content: center; 
border-radius: 5px;

text-align: center;
">
    <div class="container"style="background-color: #fff;
    border-radius: 8px;
    padding: 50px;
    max-width: 592px;
    width: 100%;
    text-align: left;
    border: 1px solid #cdcdcd;
    margin: 0 auto;
    ">
        <h2>Chào mừng {{$user->name}} đến với Polycinema!</h2>
        <p>Cảm ơn bạn đã đăng ký tài khoản. Bây giờ bạn có thể bắt đầu sử dụng dịch vụ của chúng tôi.</p>
        <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua <a href="mailto:upport.polycinema@gmail.com">support.polycinema@gmail.com</a>.</p>
        <p>Xin cảm ơn!</p>
        <a style="
        text-decoration: none;
        display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;" href="http://localhost:3000" target="_blank" class="btn-home">Trở về trang chủ</a>
    </div>
</html>
