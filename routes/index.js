var express = require('express');
var router = express.Router();
var moment = require('moment');
const { getConnection } = require('typeorm');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const UserInfo = require('../schemas/UserinfoSchemas');
const Concert = require('../schemas/ConcertSchemas');
const ConcertSite = require('../schemas/ConcertSiteSchemas');
const SiteSeat = require('../schemas/SiteSeatSchemas');
const SeatInfo = require('../schemas/SeatInfoSchemas');
const ReservationInfo = require('../schemas/ReservationInfoSchemas');
const Reservation = require('../schemas/ReservationSchemas');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.status(200).json();
});

router.post('/userinfo', function (req, res, next) {
    const { username, password, userid, usertel, userbirthday, useremail } = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(UserInfo.options.name);
    repository.findOne({ // 등록 하려는 사용자 아이디 검색
        where: {
            userid,
        }
    }).then((user) => {
        if (user != null) { // 사용자가 존재하면 conflict 에러
            return res.status(409).json({ message: 'username already exists' });
        }
        const newUser = {
            username,
            userid,
            usertel,
            userbirthday,
            useremail,
            password,
        }; // 신규 사용자 기본 정보

        return bcrypt.genSalt(10, (err, salt) => { // salt값 생성
            return bcrypt.hash(password, salt, function (err, hash) {
                newUser.password = hash; // bcrypt로 암호화 된 값을 비밀번호로 설정
                repository.insert(newUser) // 데이터 저장
                    .then(() => {
                        res.status(201).json();
                    });
            });
        });
    }).catch((err) => { // 앞에 과정에서 에러가 날 경우 처리
        console.log(err);
        res.status(403).json({ message: 'Something wrong' });
    });
    res.status(201).json("success User registration ");
});

router.get('/userinfo/:userid', function (req, res, next) {
    const userid = req.params.userid;
    const connection = getConnection();
    const repository = connection.getRepository(UserInfo.options.name);
    repository.findOne({ where: { userid } }).then((result) => {
        res.status(200).json(result);
    });
});

router.put('/userinfo/:userid', function (req, res, next) {
    const userid = req.params.userid;
    const newinfo = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(UserInfo.options.name);
    repository.update({ where: { userid } }, {
        userid: newinfo.id,
        username: newinfo.name,
        password: newinfo.password,
        usertel: newinfo.tel,
    })
});

router.post('/forlogin/:userid', function (req, res, next) {
    const { userid, password } = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(UserInfo.options.name);
    repository.findOne({ // 로그인 하려는 사용자를 불러옴
        where: {
            userid,
        }
    }).then((user) => {
        if (user == null) { // 사용자가 존재하지 않은 경우 에러처리
            return res.status(400).json({ message: 'Please check your account and password' });
        }
        // bcrypt 함수로 저장된 값과 사용자가 로그인 하려는 비밀번홀를 비교
        return bcrypt.compare(password, user.password)
            .then((isMatch) => {
                if (!isMatch) { // 비밀번호가 틀린 경우
                    return res.status(400).json({ message: 'Please check your account and password' });
                }
                const secret = config.get('secret');
                const payload = {
                    userId: user.id,
                }; // 토큰에 저장할 값
                jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
                    if (err) { // 인증 토큰 생성에 실패한 경우
                        res.status(403).json({ message: 'Something wrong' });
                    }
                    res.status(200).json({ token, }); // 토큰 전달
                });
            })
    }).catch((err) => {
        console.log(err);
        res.status(403).json({ message: 'Something wrong' });
    });
});

router.post('/checkid/:userid', function (req, res) {
    const userid = req.params.userid;
    const CheckID = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(UserInfo.options.name);
    repository.findOne({ where: { userid } }).then((result) => {
        if (result.userid === CheckID.id) {
            res.status(200).json(result.userid);
        }
        else {
            res.status(200).json("-fail-");
        }
    });
});

/* Insert Concert Information using Insomnia */
router.post('/registerConcert', function (req, res, next) {
    const concert = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(Concert.options.name);
    repository.insert({
        name: concert.name,
        imgUrl: concert.imgUrl,
        date: concert.date,
        time: concert.time,
        price: concert.price,
        rank: concert.rank,
        concertPlace: concert.concertPlace
    });
    res.status(201).json();
});

/* Insert ConcertSite Information using Insomnia */
router.post('/registerConcertSite', function (req, res, next) {
    const concertSite = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(ConcertSite.options.name);
    repository.insert({
        name: concertSite.name,
        seat: concertSite.seat
    });
    res.status(201).json();
});

/* Insert SiteSeat Information using Insomnia */
router.post('/registerSiteSeat', function (req, res, next) {
    const concertSite = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(SiteSeat.options.name);
    repository.insert({
        name: concertSite.name,
    });
    res.status(201).json();
});
/*좌석 정보 예약 유무  */
router.post('/defineSeat', function (req, res, next) {
    const concertSite = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(SeatInfo.options.name);
    repository.insert({
        concertplaceid: concertSite.concertplaceid,
        Row: concertSite.Row,
        Col: concertSite.Col,

    });
    res.status(201).json("ss");
});
router.get('/defineSeat/:id', function (req, res, next) {
    const concertSite = req.body;
    const concertplaceid = req.params.id;
    const connection = getConnection();
    const repository = connection.getRepository(SeatInfo.options.name);
    repository.find({ where: { concertplaceid } }).then((result) => {
        res.status(200).json(result);
    });

});

/* Get Concert Information */
router.get('/getConcert/:concertId', function (req, res, next) {
    const id = req.params.concertId;
    const connection = getConnection();
    const repository = connection.getRepository(Concert.options.name);
    repository.findOne({ where: { id } }).then((result) => {
        res.status(200).json(result);
    });
})

router.post('/reservation/:concertname/:row/:col', function (req, res, next) {
    const concertname = req.params.concertname
    const row = req.params.row
    const col = req.params.col
    const concertSite = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(ReservationInfo.options.name);
    repository.findOne({ where: { concertname, row, col } }).then((result) => {
        if (result != null) {
            return res.status(401).json();
        }
        else {
            repository.insert({
                concertname: concertSite.concertname,
                userid: concertSite.userid,
                row: concertSite.row,
                col: concertSite.col,
            });
            return res.status(201).json("ss");
        }
    })
});

router.get('/reservation/:concertid', function (req, res, next) {
    const userid = req.params.userid;
    const concertId = req.params.concertid
    const connection = getConnection();
    const repository = connection.getRepository(Reservation.options.name);
    repository.find({ where: { concertId } }).then((result) => {
        res.status(200).json(result);
    });
});
router.get('/reservationid/:id', function (req, res, next) {
    const id = req.params.id;
    const connection = getConnection();
    const repository = connection.getRepository(ReservationInfo.options.name);
    repository.find({ where: { id } }).then((result) => {
        res.status(200).json(result);
    });
});

router.post('/registerReservation', function (req, res, next) {
    const { reservationId, reservationDate, reservationPersonCnt, reservationSeatRow, reservationSeatCol, userId, concertId, concertName, concertPlace, concertDate, payType, price } = req.body;
    const connection = getConnection();
    const repository = connection.getRepository(Reservation.options.name);
    repository.insert({
        reservationId: reservationId,
        reservationDate: reservationDate,
        reservationPersonCnt: reservationPersonCnt,
        reservationSeatRow: reservationSeatRow,
        reservationSeatCol: reservationSeatCol,
        userId: userId,
        concertId: concertId,
        concertName: concertName,
        concertPlace: concertPlace,
        concertDate: concertDate,
        payType: payType,
        price: price,
    });
    res.status(201).json();
});

router.put('/defineSeat/:id/:Row/:Col', function (req, res) {
    const { TF } = req.body;
    const Row = req.params.Row;
    const Col = req.params.Col
    const concertplaceid = req.params.id;
    const connection = getConnection();
    const repository = connection.getRepository(SeatInfo.options.name);
    repository.update({ concertplaceid, Row, Col }, {

        TF: 0
    });
    res.status(201).json();

});

/* Get user's reservation Information */
router.get('/getMyReservation/:id', function (req, res, next) {
    const id = req.params.id;
    const connection = getConnection();
    const repository = connection.getRepository(Reservation.options.name);
    repository.find({ where: { userId: id } }).then((result) => {
        res.status(200).json(result);
    });
});

router.get('/getMyDetailReservation/:id', function (req, res, next) {
    const id = req.params.id;
    const connection = getConnection();
    const repository = connection.getRepository(Reservation.options.name);
    repository.find({ where: { reservationId: id } }).then((result) => {
        res.status(200).json(result);
    });
});


module.exports = router;