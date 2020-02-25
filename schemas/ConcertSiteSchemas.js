const EntitySchema = require('typeorm').EntitySchema;
const ConcertSite = require('../models/ConcertSite').ConcertSite;

module.exports = new EntitySchema({
    name: 'concert_site',
    target: ConcertSite,
    columns: {
        id: {
            primary: true,
            type: 'bigint',
            generated: true
        },
        name: {
            primary: true,
            type: 'varchar',
            length: 50,
            nullable: false
        },
        seat: {
            primary: true,
            type: 'bigint',
        },
    }
});