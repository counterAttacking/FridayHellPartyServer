var express = require('express');
var router = express.Router();
const { getConnection } = require('typeorm');
const UserInfo = require('../schemas/UserinfoSchemas');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).json();
});

router.post('/userinfo', function(req, res, next){
    const newinfo = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(UserInfo.options.name);
    repository.insert({
        userid: newinfo.id,
        username: newinfo.name,
        password: newinfo.password,
        usertel: newinfo.tel,
        userbirthday:newinfo.birthday,
        useremail:newinfo.email,
    });
    res.status(201).json("success User registration ");
});

router.get('/userinfo/:userid', function(req,res,next){
    const userid = req.params.userid;
    const connection = getConnection();
    const repository = connection.getRepository(UserInfo.options.name);
    repository.findOne({where: {userid}}).then((result)=>{
        res.status(200).json(result);
    });
});

router.put('/userinfo/:userid', function(req,res,next){
    const userid = req.params.userid;
    const newinfo = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(UserInfo.options.name);
    repository.update({where:{userid}}, {
        userid: newinfo.id,
        username: newinfo.name,
        password: newinfo.password,
        usertel: newinfo.tel,
    })
});

router.post('/forlogin/:userid', function(req,res,next){
    const userid = req.params.userid;
    const logininfo = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(UserInfo.options.name);
    repository.findOne({where: {userid}}).then((result)=>{
        if(result.userid === logininfo.id && result.password === logininfo.password){
            res.status(200).json(result.userid);
        }
        else{
            res.status(200).json("-fail-");
        }
    });
});
module.exports = router;
