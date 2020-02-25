const EntitySchema = require('typeorm').EntitySchema;
const Concert = require('../models/Concert').Concert;

module.exports = new EntitySchema({
    name: 'concert',
    target: Concert,
    columns: {
        id: {
            primary: true,
            type: 'bigint',
            generated: true
        },
        name: {
            primary: true,
            type: 'varchar',
            length: 30,
            nullable: false
        },
        imgUrl: {
            type: 'varchar',
            length: 200,
            nullable: false
        },
        date: {
            type: 'date'
        },
        time: {
            type: 'bigint'
        },
        price: {
            type: 'bigint'
        },
        rank: {
            type: 'varchar',
            length: 15,
            default: '��ü �̿밡'
        },
        concertPlace: {
            type: 'varchar',
            length: 50
        }
    }
});