const EntitySchema = require('typeorm').EntitySchema;
const SeatInfo = require('../models/SeatInfo').SeatInfo;

module.exports = new EntitySchema({
    name: 'seat_info',
    target: SeatInfo,
    columns: {
        id: {
            primary: true,
            type: 'bigint',
            generated: true
        },
        concertplaceid: {
            primary: true,
            type: 'bigint',
            nullable: false
        },
        Col: {
            primary: true,
            type: 'bigint',
            nullable:false,
        },
        Row: {
            primary: true,
            type: 'varchar',
            length:10,
            nullable:false,
        },
        TF:{
            primary:true,
            type: 'int',
            default:1,
            nullable:false,
        }
         
    }
});