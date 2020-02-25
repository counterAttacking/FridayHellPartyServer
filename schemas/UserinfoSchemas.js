const EntitySchema = require('typeorm').EntitySchema;
const UserInfo = require('../models/UserInfo').UserInfo;

module.exports = new EntitySchema({
    name: 'user_info',
    target: UserInfo,
    columns: {
        id: { // DB 컬럼 이름
            primary: true,  // 이 데이터의 key인지 여부
            type: 'bigint', // 데이터의 타입
            generated: true // 값을 자동 생성함(Auto Increment)
        },
        username: {
            type: 'varchar',
            length: 10,
            nullable: false,
        },
        userid: {
            type: 'varchar',
            length: 20,
            nullable: false,
            unique: true
        },
        password: {
            type: 'varchar',
            length: 200, // 문자열의 최대 길이
            nullable: false // 값이 없는 것을 허용하는지 여부
        },
        usertel: {
            type: 'varchar',
            length: 15,
            nullable: false,
        },
        userbirthday: {
            type: 'varchar',
            length: 20,
            nullable: false,
        },
        useremail: {
            type: 'varchar',
            length: 40,
            nullable: false,
        }
    },
});