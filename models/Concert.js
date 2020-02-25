class Concert {
    constructor(id, name, imgUrl, date, time, price, rank, concertPlace) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
        this.date = date;
        this.time = time;
        this.price = price;
        this.rank = rank;
        this.concertPlace = concertPlace;
    }
}

module.exports = {
    Concert,
};