export type GeoDto = {
    lat: string;
    lng: string;
}

export class Geo {
    private lat: number;
    private lng: number;
    constructor({lat, lng}:GeoDto) {
        if(isNaN(Number(lat)) || isNaN(Number(lng))) {
            throw new Error('Invalid Geo');
        }
        this.lat = Number(lat);
        this.lng = Number(lng);

    }
    get value() {
        return {
            lat: this.lat,
            lng: this.lng
        }
    }

    get toJSON() {
       return {
        lat: this.lat.toString(),
        lng: this.lng.toString()
       }
    }
}   