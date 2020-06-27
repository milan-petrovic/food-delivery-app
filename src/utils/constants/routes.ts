export enum BaseRoutes {
    BaseUrl = 'http://localhost:3000',
    ApiUrl = 'http://ec2-52-59-235-7.eu-central-1.compute.amazonaws.com:8080',
    RestoranImageUrl = 'http://s3.eu-central-1.amazonaws.com/donesi.projekat/restorani/',
    KategorijaImageUrl = 'http://s3.eu-central-1.amazonaws.com/donesi.projekat/kategorije/',
    JeloImageUrl = 'http://s3.eu-central-1.amazonaws.com/donesi.projekat/jela/',
}

export enum AppRoutes {
    Login = '/login',
    Admini = '/admini',
    Business = '/business',
    Feed = '/feed',
    FeedKategorije = '/feed/kategorije',
    AdminKategorije = '/admin/kategorije',
    AdminKategorijeNewImage = '/admin/kategorije/image/:id?',
    Korisnici = '/admin/korisnici',
    Restorani = '/admin/restorani',
    RestoranKorisniciNew = '/admin/restorani/korisnik-new',
    RestoranNew = '/admin/restorani/new',
    RestoranNewImage = '/admin/restorani/image/:id?',
    Narudzbe = '/admin/narudzbe',
    Jela = '/business/jela',
    JelaNewImage = '/admin/jela/image/:id?',
    JelaNew = '/business/jela/new',
    BusinessNarudzbe = '/business/narudzbe',
    KategorijaNew = '/admin/kategorije/new',
    AdminNew = '/admini/new',
}
