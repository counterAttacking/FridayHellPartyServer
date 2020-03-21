class ReservationInfo {
    constructor(id, reservationId, userid, row, col, concertid, concertplaceid) {
        this.id= id,
        this.reservationId = reservationId;
        this.userid = userid;
        this.row =row;
        this.col = col;
        this.concertid = concertid;
        this.concertplaceid = concertplaceid;
        
    }
}

module.exports = {
    ReservationInfo,
};