const EntitySchema = require('typeorm').EntitySchema;
const ReservationInfo = require('../models/ReservationInfo').ReservationInfo;

module.exports = new EntitySchema({
    name: 'reservation_info',
    target: ReservationInfo,
    columns: {
        id: { // DB 컬럼 이름
            primary: true,  // 이 데이터의 key인지 여부
            type: 'bigint', // 데이터의 타입
            generated: true // 값을 자동 생성함(Auto Increment)
        },
        reservationId: {
            
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        userid: {
            type: 'varchar',
            length: 50,
            nullable: false
        },
        concertid: {
            
            type: 'bigint',
            nullable: false,
        },
        concertplaceid:{
            type: 'bigint',
            nullable: false
        },
        row: {
            type: 'varchar',
            length: 1,
            nullable: false,
        },
        col: {
            type: 'bigint',
            
            nullable: false,
        },
    }

});