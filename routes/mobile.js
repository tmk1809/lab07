var express = require ('express');
const MobileModel = require('../models/MobileModel');
var router = express.Router();

router.get('/', async(req, res) => {
  //SQL: SELECT * FROM mobile
  var mobiles = await MobileModel.find();
  
  //render ra file view "index.hbs" nằm trong thư mục "views/mobile"
  res.render('mobile/index', { mobiles : mobiles});
});

router.get('/delete/:id', async (req, res) => {
  var id = req.params.id;
  //SQL: DELETE FROM mobile WHERE id = '_id'

  await MobileModel.findByIdAndDelete(id)
  .then(() => console.log ('delete succeed !'))
  .catch((error) => console.log ('delete failed'));

  //redirect về trang mobile index sau khi xóa
  res.redirect('/mobile');
})

router.get('/deleteall', async (req, res) => {
  await MobileModel.deleteMany()
    .then(() => console.log('delete succeed !'))
    .catch((error) => console.log('delete failed'));
  res.redirect('/mobile');
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   var mobile = await MobileModel.findById(id);
   //render ra file "views/mobile/detail.hbs"
   res.render('mobile/detail', { mobile : mobile});
})

router.post('/order', async (req, res) => {
   var data = req.body;
   var id = data.id;
   var mobile = await MobileModel.findById(id);
   var price = data.price;
   var quantity = data.quantity;
   var total = price * quantity;
  //  var text = "You have ordered a product with id " + id + " and quantity is " + quantity;
  //  console.log(text);
   res.render('mobile/order', { mobile: mobile, quantity : quantity, price : price , total: total });
})

module.exports = router;