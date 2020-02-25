const EntitySchema = require('typeorm').EntitySchema;
const SiteSeat = require('../models/SiteSeat').SiteSeat;

module.exports = new EntitySchema({
    name: 'site_seat',
    target: SiteSeat,
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
        totCol: {
            primary: true,
            type: 'bigint',
            default: 20
        },
        totRow: {
            primary: true,
            type: 'bigint',
            default: 10
        }
    }
});