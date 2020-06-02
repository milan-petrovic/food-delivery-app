export interface Korisnik {
    id?: number;
    username: string;
    password: string;
    admin: boolean;
}

export interface Restoran {
    id?: number;
    naziv: string;
    adresa: string;
    telefon: string;
    email: string;
    opis: string;
    korisnik: Korisnik;
}

export interface Kategorija {
    id?: number;
    ime: string;
    opis: string;
}

export interface Jelo {
    id?: number;
    restoran: Restoran;
    kategorija: Kategorija;
    ime: string;
    opis: string;
    sastav: string;
    cijena: number;
}

export interface Narudzba {
    id?: number;
    ime: string;
    telefon: string;
    adresa: string;
    email: string;
    napomena: string;
    restoran: Restoran;
}

export interface Stavka {
    narudzba: Narudzba;
    jelo: Jelo;
    kolicina: number;
}
