class Reservation {
    constructor(reservationId, reservationDate, reservationPersonCnt, reservationSeatRow, reservationSeatCol, userId, concertId, concertName, concertDate, payType) {
        this.reservationId = reservationId;
        this.reservationDate = reservationDate;
        this.reservationPersonCnt = reservationPersonCnt;
        this.reservationSeatRow = reservationSeatRow;
        this.reservationSeatCol = reservationSeatCol;
        this.userId = userId;
        this.concertId = concertId;
        this.concertName = concertName;
        this.concertDate = concertDate;
        this.payType = payType;
    }
}

module.exports = {
    Reservation,
};