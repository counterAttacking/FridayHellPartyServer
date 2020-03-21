class Reservation {
    constructor(reservationId, reservationDate, reservationPersonCnt,  userId, concertId, concertName, concertPlace, concertDate, payType, price) {
        this.reservationId = reservationId;
        this.reservationDate = reservationDate;
        this.reservationPersonCnt = reservationPersonCnt;
        this.userId = userId;
        this.concertId = concertId;
        this.concertName = concertName;
        this.concertPlace = concertPlace;
        this.concertDate = concertDate;
        this.payType = payType;
        this.price = price;
    }
}

module.exports = {
    Reservation,
};