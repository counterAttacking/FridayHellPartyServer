class SeatInfo {
    constructor(id, concertplaceid, Col, Row, TF) {
        this.id = id;
        this.concertplaceid = concertplaceid;
        this.Col = Col;
        this.Row = Row;
        this.TF = TF;
    }
}

module.exports = {
    SeatInfo,
};