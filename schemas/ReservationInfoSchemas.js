const EntitySchema = require('typeorm').EntitySchema;
const ReservationInfo = require('../models/ReservationInfo').ReservationInfo;

module.exports = new EntitySchema({
    name: 'reservation_info',
    target: ReservationInfo,
    columns: {
        id: {
            primary: true,
            type: 'bigint',
            generated: true
        },
        userid: {

            type: 'varchar',
            length: 50,
            nullable: false
        },
        concertname: {
            type: 'varchar',
            length:50,
            nullable:false,
        },
        row:{
            type:'bigint',
            nullable:false,
        },
        col:{
            type:'bigint',
            primary:true,
            nullable:false,
        },
    }
       
});