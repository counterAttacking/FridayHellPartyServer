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
            
            type: 'bigint',
            nullable: false
        },
        Col: {
            
            type: 'bigint',
            nullable:false,
        },
        Row: {
            
            type: 'varchar',
            length:10,
            nullable:false,
        },
        TF:{
            
            type: 'int',
            default:1,
            nullable:false,
        }
         
    }
});