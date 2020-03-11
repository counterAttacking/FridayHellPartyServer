class UserInfo {
  constructor(id, userid, password, username, usertel, userbirthday, useremail) {
    this.id = id;
    this.userid = userid;
    this.username = username;
    this.password = password;
    this.usertel = usertel;
    this.userbirthday = userbirthday;
    this.useremail = useremail;
  }
}

module.exports = {
  UserInfo,
};