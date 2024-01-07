<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $index = 0;

        DB::table('movies')->insert([
            'id' => 1,
            'name' => 'Aquaman và Vương Quốc Thất Lạc',
            'title' => 'Aquaman và Vương Quốc Thất Lạc',
            'image' => 'http://res.cloudinary.com/dbktpvcfz/image/upload/v1703692845/images/qdpm3yf3xpo8zmraoeuq.jpg',
            'trailer' => '-2AmjXnrfp4',
            'description' => 'Aquaman Và Vương Quốc Thất Lạc là phần hậu truyện của Aquaman năm 2018 khi Arthur lên ngôi vua của Atlantis. Giờ đây, Arthur Curry ngày nào đã trở thành ông bố bỉm sữa ngày ngày chăm con kiêm cai quản cả vùng Atlantis rộng lớn. Thế nhưng, kẻ thù cũ đời nào để cho nhà vua biển cả yên ổn. Nhờ sự trợ giúp của công nghệ, Black Manta lần nữa trỗi dậy với sức mạnh kinh khủng hơn xưa. Không thể chiến đấu một mình, Arthur đành phải nhờ sự trợ giúp của một kẻ thù khác - đứa em cùng mẹ khác cha Orm. Cùng chống lại kẻ thù chung, liệu cặp anh em chẳng đội chung trời này có thể hàn gắn tình cảm?',
            'release_date' => '2023-12-28 23:00:28',
            'duration' => 124,
            'director_id' => 2,
            'status' => 'screening'
        ]);

        DB::table('movies')->insert([
            'id' => 2,
            'name' => 'Kẻ Ăn Hồn',
            'title' => 'Kẻ Ăn Hồn',
            'image' => 'http://res.cloudinary.com/dbktpvcfz/image/upload/v1703692947/images/cxlsi27q5bmded63qz0u.jpg',
            'trailer' => 'MLn7HiJ8TWs',
            'description' => 'Phim về hàng loạt cái chết bí ẩn ở Làng Địa Ngục, nơi có ma thuật cổ xưa: 5 mạng đổi bình Rượu Sọ Người. Thập Nương - cô gái áo đỏ là kẻ nắm giữ bí thuật luyện nên loại rượu mạnh nhất!',
            'release_date' => '2023-12-25 23:02:13',
            'duration' => 110,
            'director_id' => 2,
            'status' => 'screening'
        ]);

        DB::table('movies')->insert([
            'id' => 3,
            'name' => 'Nhà Vịt Di Cư',
            'title' => 'Nhà Vịt Di Cư',
            'image' => 'http://res.cloudinary.com/dbktpvcfz/image/upload/v1703693095/images/xqy2otymcr7yrssce383.jpg',
            'trailer' => '865RCGVYcSc',
            'description' => 'Nhà Vịt Di Cư theo chân một gia đình vịt trời gồm vịt bố, vịt mẹ, cậu con trai tuổi teen Dax và vịt út Gwen, trong lần đầu tiên trải nghiệm chuyến di cư tiến về phía nam để trú đông. Thế nhưng, niềm vui vẻ sự háo hức kéo dài không bao lâu, gia đình vịt nhận ra, họ đang bay ngược chiều với tất cả các đàn vịt khác. Không kịp quay đầu, họ bất ngờ gặp phải loạt “chướng ngại vật” là những tòa nhà cao tầng của thành phố hiện đại. Liên tiếp sau đó là những thước phim đầy kịch tính nhưng vô cùng hài hước của nhà vịt trong quá trình khám phá đô thị mới.',
            'release_date' => '2023-12-30 23:04:42',
            'duration' => 83,
            'director_id' => 2,
            'status' => 'upcoming'
        ]);

    }
}
