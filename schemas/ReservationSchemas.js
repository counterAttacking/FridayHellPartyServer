const EntitySchema = require('typeorm').EntitySchema;
const Reservation = require('../models/Reservation').Reservation;

module.exports = new EntitySchema({
    name: 'reservation',
    target: Reservation,
    columns: {
        reservationId: {
            primary:true,
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        reservationDate: {
            type: 'datetime',
            nullable: false,
        },
        reservationPersonCnt: {
            type: 'bigint',
            nullable: false,
        },
        reservationSeatRow: {
            type: 'varchar',
            length: 1,
            nullable: false,
        },
        reservationSeatCol: {
            type: 'bigint',
            nullable: false,
        },
        userId: {
            type: 'varchar',
            length: 20,
            nullable: false,
        },
        concertId: {
            type: 'bigint',
            nullable: false,
        },
        payType: {
            type: 'varchar',
            length: 50,
            nullable: false,
        }
    }
});