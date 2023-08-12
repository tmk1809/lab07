var mongoose = require('mongoose');

//schema: khai báo, định nghĩa cấu trúc của bảng (tên các cột & kiểu dữ liệu tương ứng)
var MobileSchema = mongoose.Schema(
   {
      //bắt buộc phải gõ đúng tên của cột ở trong DB
      brandName  : String,
      phoneModel : String,
      quantity   : Number,
      price      : Number,
      date       : Date,
      image      : String,
      bestSeller : Boolean
   }
);

/* 'mobile' là tên của bảng (collection) => bắt buộc phải gõ đúng
   'dien thoai' là description cho bảng => có thể gõ giống hoặc khác tên bảng */

const MobileModel = mongoose.model('dien thoai', MobileSchema, 'mobile');
module.exports = MobileModel;