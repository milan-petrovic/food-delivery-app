export interface User {
    id?: number;
    uname: string;
    passwd?: string;
    admin: boolean;
}

export interface Restoran {
    id?: number;
    ime: string;
    adresa: string;
    tel: string;
    email: string;
    opis: string;
    usertbl: User | null | undefined;
    cijenaDostave: number;
    radnoVrijeme: string;
}

export interface Kategorija {
    id?: number;
    ime: string;
    opis: string;
}

export interface Jelo {
    id?: number;
    restoranBean: Restoran | null | undefined;
    kategorijaBean: Kategorija | null | undefined;
    ime: string;
    opis: string;
    sastav: string;
    cijena: number;
}

export interface Narudzba {
    id?: number;
    ime?: string;
    tel?: string;
    adresa?: string;
    email?: string;
    napomena?: string;
    restoranBean?: Restoran | null;
    stavke?: Stavka[] | null;
}

export interface Stavka {
    id?: number;
    narudzbaBean?: Narudzba;
    jeloBean: Jelo;
    kolicina: number;
}

export interface LoginModel {
    username: string;
    password: string;
}

export interface AuthUser {
    accessToken?: string;
    id?: number;
    username?: string;
    role?: string;
    restoran?: number;
}

export interface DecodedToken {
    jti: number;
    username: string;
    type: string;
    restoran?: number;
}

export interface RestoranStavke {
    stavke: Stavka[];
    restoran: Restoran;
}
