export interface User {
    id?: number;
    uname: string;
    passwd: string;
    admin: boolean;
}

export interface Restoran {
    id?: number;
    ime: string;
    adresa: string;
    tel: string;
    email: string;
    opis: string;
    usertbl: User;
}

export interface Kategorija {
    id?: number;
    ime: string;
    opis: string;
}

export interface Jelo {
    id?: number;
    restoranBean: Restoran;
    kategorijaBean: Kategorija;
    ime: string;
    opis: string;
    sastav: string;
    cijena: number;
}

export interface Narudzba {
    id?: number;
    ime: string;
    tel: string;
    adresa: string;
    email: string;
    napomena: string;
    restoranBean: Restoran;
}

export interface Stavka {
    id?: number;
    narudzbaBean: Narudzba;
    jeloBean: Jelo;
    kolicina: number;
}

export interface LoginModel {
    username: string;
    password: string;
}

export interface AuthUser {
    authenticated: boolean;
    accessToken: string;
    id: number;
    username: number;
    role: string;
}
