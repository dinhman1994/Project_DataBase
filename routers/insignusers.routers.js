var express = require('express');
var multer  = require('multer');

var controller=require('../controller/users.controller.js');
var validate = require('../validate/users.validate.js');
var frValidate = require('../validate/friends.validate.js');
var postsValidate = require('../validate/posts.validate.js');

var upload = multer({ dest: './public/postsImage/' });

var router = express.Router();

router.get('/',validate.authLogin,controller.user);
router.get('/history',validate.findHistory,controller.history);
router.get('/friends',validate.findFriends,controller.friends);
router.get('/friends/search',validate.filterFriends,controller.searchFr);
router.get('/rank',validate.rank,controller.rank);
router.get('/post',postsValidate.filterPosts,controller.bPost);
router.get('/myPosts',postsValidate.myPosts,controller.bPost);


router.post('/friends/unfriend',frValidate.unfriend,controller.bFriends);
router.post('/friends/accepted',frValidate.accepted,controller.bFriends);
router.post('/friends/stop',frValidate.stop,controller.bFriends);
router.post('/friends/requested',frValidate.requested,controller.bFriends);

router.post('/post',
	upload.single('image'),
	postsValidate.createPost,
	controller.Buser);
router.post('/post/liked',postsValidate.likePost,controller.backPost);
router.post('/post/unliked',postsValidate.unlikePost,controller.backPost);

router.post('/',controller.logout);
module.exports = router;