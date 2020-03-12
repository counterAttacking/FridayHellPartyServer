class Reservation {
    constructor(reservationId, reservationDate, reservationPersonCnt, reservationSeatRow,reservationSeatCol, userId, concertId, payType) {
        this.reservationId = reservationId;
        this.reservationDate = reservationDate;
        this.reservationPersonCnt = reservationPersonCnt;
        this.reservationSeatRow = reservationSeatRow;
        this.reservationSeatCol = reservationSeatCol;
        this.userId = userId;
        this.concertId = concertId;
        this.payType = payType;
    }
}

module.exports = {
    Reservation,
};