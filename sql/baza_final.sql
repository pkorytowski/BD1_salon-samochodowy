create table if not exists salon.kolory
(
    id_koloru serial  not null,
    nazwa     varchar not null,
    typ       varchar not null,
    cena      real    not null,
    constraint id_koloru
        primary key (id_koloru)
);

alter table salon.kolory
    add constraint positive_value_kol
        check (cena >= (0)::double precision);

create table if not exists salon.modele
(
    id_modelu           serial  not null,
    nazwa               varchar not null,
    typ_nadwozia        varchar not null,
    opis                varchar,
    dlugosc             integer not null,
    szerokosc           integer not null,
    wysokosc            integer not null,
    pojemnosc_bagaznika integer not null,
    cena_bazowa         real    not null,
    constraint id_modelu
        primary key (id_modelu)
);

alter table salon.modele
    add constraint positive_value_model
        check (cena_bazowa >= (0)::double precision);

create table if not exists salon.silnik
(
    id_silnik         serial  not null,
    nazwa             varchar not null,
    moc               real    not null,
    liczba_cylindrow  integer not null,
    emisja_co2        real    not null,
    pojemnosc_skokowa real    not null,
    rodzaj_paliwa     varchar not null,
    cena              real    not null,
    constraint id_silnik
        primary key (id_silnik)
);

alter table salon.silnik
    add constraint positive_value_sil
        check (cena >= (0)::double precision);

create table if not exists salon.wersje_wyposazenia
(
    id_wersje_wyposazenia serial  not null,
    nazwa                 varchar not null,
    cena                  real    not null,
    aktywna               integer not null,
    constraint id_wersje_wyposazenia
        primary key (id_wersje_wyposazenia),
    constraint uniq_nazwa
        unique (nazwa)
);

alter table salon.wersje_wyposazenia
    add constraint positive_value_wer
        check (cena >= (0)::double precision);

create table if not exists salon.samochody
(
    id_samochodu          serial  not null,
    id_silnik             integer not null,
    id_wersje_wyposazenia integer not null,
    id_modelu             integer not null,
    rok_modelowy          integer not null,
    cena                  real    not null,
    aktywny               integer not null,
    constraint id_samochodu
        primary key (id_samochodu),
    constraint modele_samochody_fk
        foreign key (id_modelu) references salon.modele,
    constraint silnik_samochody_fk
        foreign key (id_silnik) references salon.silnik,
    constraint wersje_wyposazenia_samochody_fk
        foreign key (id_wersje_wyposazenia) references salon.wersje_wyposazenia
);

alter table salon.samochody
    add constraint positive_value_sam
        check (cena >= (0)::double precision);

create table if not exists salon.typ_wyposazenia
(
    id_typ_wyposazenia serial  not null,
    typ                varchar not null,
    constraint id_typ_wyposazenia
        primary key (id_typ_wyposazenia)
);

create table if not exists salon.wyposazenie
(
    id_wyposazenia     serial  not null,
    id_typ_wyposazenia integer not null,
    nazwa              varchar not null,
    opis               varchar not null,
    cena               real    not null,
    constraint id_wyposazenia
        primary key (id_wyposazenia),
    constraint typ_wyposazenia_wyposazenie_fk
        foreign key (id_typ_wyposazenia) references salon.typ_wyposazenia
);

alter table salon.wyposazenie
    add constraint positive_value_wyp
        check (cena >= (0)::double precision);

create table if not exists salon.wyposazenie_w_wersji
(
    id_wyp_w_wersji       serial  not null,
    id_wersje_wyposazenia integer not null,
    id_wyposazenia        integer not null,
    constraint id_wyp_w_wersji
        primary key (id_wyp_w_wersji),
    constraint wersje_wyposazenia_wyposazenie_w_wersji_fk
        foreign key (id_wersje_wyposazenia) references salon.wersje_wyposazenia,
    constraint wyposazenie_wyposazenie_w_wersji_fk
        foreign key (id_wyposazenia) references salon.wyposazenie
);

create table if not exists salon.pracownicy
(
    id_pracownika serial  not null,
    imie          varchar not null,
    nazwisko      varchar not null,
    stanowisko    varchar not null,
    email         varchar not null,
    haslo         varchar not null,
    constraint id_pracownika
        primary key (id_pracownika),
    constraint uniq_email_prac
        unique (email)
);

create table if not exists salon.klienci
(
    id_klienta   serial     not null,
    imie         varchar,
    nazwisko     varchar,
    nazwa        varchar,
    nip          integer,
    ulica        varchar    not null,
    nr_domu      varchar    not null,
    kod_pocztowy varchar(6) not null,
    miejscowosc  varchar    not null,
    telefon      integer    not null,
    email        varchar    not null,
    haslo        varchar    not null,
    constraint id_klienta
        primary key (id_klienta),
    constraint uniq_email_kl
        unique (email)
);

create table if not exists salon.egzemplarz
(
    id_egzemplarza serial  not null,
    id_samochodu   integer not null,
    id_klienta     integer,
    id_koloru      integer not null,
    status         varchar not null,
    cena_wyjsciowa real    not null,
    constraint id_egzemplarza
        primary key (id_egzemplarza),
    constraint kolory_egzemplarz_fk
        foreign key (id_koloru) references salon.kolory,
    constraint samochody_egzemplarz_fk
        foreign key (id_samochodu) references salon.samochody,
    constraint klienci_zamowienia_fk
        foreign key (id_klienta) references salon.klienci
);

alter table salon.egzemplarz
    add constraint positive_value_egz
        check (cena_wyjsciowa >= (0)::double precision);

create table if not exists salon.jazda_probna
(
    id_jazda_probna serial    not null,
    id_pracownika   integer   not null,
    id_klienta      integer   not null,
    id_egzemplarza  integer   not null,
    data            timestamp not null,
    constraint id_jazda_probna
        primary key (id_jazda_probna),
    constraint egzemplarz_jazda_probna_fk
        foreign key (id_egzemplarza) references salon.egzemplarz,
    constraint pracownicy_jazda_probna_fk
        foreign key (id_pracownika) references salon.pracownicy,
    constraint klienci_jazda_probna_fk
        foreign key (id_klienta) references salon.klienci
);

create table if not exists salon.zamowienia
(
    id_zamowienia  serial         not null,
    id_pracownika  integer        not null,
    id_egzemplarza integer        not null,
    status         varchar        not null,
    rabat          real default 0 not null,
    cena_koncowa   real           not null,
    constraint id_zamowienia
        primary key (id_zamowienia),
    constraint uniq_egz
        unique (id_egzemplarza),
    constraint egzemplarz_zamowienia_fk
        foreign key (id_egzemplarza) references salon.egzemplarz,
    constraint pracownicy_zamowienia_fk
        foreign key (id_pracownika) references salon.pracownicy
);

alter table salon.zamowienia
    add constraint positive_value_zamowienia
        check (rabat >= (0)::double precision);

alter table salon.zamowienia
    add constraint positive_value_zamow
        check (cena_koncowa >= (0)::double precision);

create table if not exists salon.pokoj_wydan
(
    id_pokoj_wydan serial    not null,
    id_pracownika  integer   not null,
    id_zamowienia  integer   not null,
    data           timestamp not null,
    constraint id_pokoj_wydan
        primary key (id_pokoj_wydan),
    constraint pracownicy_pokoj_wydan_fk
        foreign key (id_pracownika) references salon.pracownicy,
    constraint zamowienia_pokoj_wydan_fk
        foreign key (id_zamowienia) references salon.zamowienia
);

/* widoki ułatwiające wyciąganie danych z bazy na serwer */

create or replace view salon.wyposazenie_widok(id_wyposazenia, typ_wyposazenia, nazwa, opis, cena) as
SELECT w.id_wyposazenia,
       t.id_typ_wyposazenia AS typ_wyposazenia,
       w.nazwa,
       w.opis,
       w.cena
FROM salon.wyposazenie w
         JOIN salon.typ_wyposazenia t USING (id_typ_wyposazenia);

create or replace view salon.samochody_widok
            (id_samochodu, id_silnik, silnik, id_wersje_wyposazenia, wersja, id_modelu, model, rok_modelowy, cena,
             aktywny) as
SELECT s.id_samochodu,
       s.id_silnik,
       si.nazwa AS silnik,
       s.id_wersje_wyposazenia,
       w.nazwa  AS wersja,
       s.id_modelu,
       m.nazwa  AS model,
       s.rok_modelowy,
       s.cena,
       s.aktywny
FROM salon.samochody s,
     salon.silnik si,
     salon.wersje_wyposazenia w,
     salon.modele m
WHERE s.id_silnik = si.id_silnik
  AND s.id_wersje_wyposazenia = w.id_wersje_wyposazenia
  AND s.id_modelu = m.id_modelu;

create or replace view salon.egzemplarze_widok
            (id_egzemplarza, id_koloru, id_klienta, imie_k, nazwisko_k, telefon_k, email_k, kolor, id_samochodu,
             id_silnik, silnik, id_wersje_wyposazenia, wersja, id_modelu, model, rok_modelowy, cena, aktywny,
             status_egz, cena_wyjsciowa)
as
SELECT e.id_egzemplarza,
       e.id_koloru,
       k.id_klienta,
       k.imie     AS imie_k,
       k.nazwisko AS nazwisko_k,
       k.telefon  AS telefon_k,
       k.email    AS email_k,
       kol.nazwa  AS kolor,
       s.id_samochodu,
       s.id_silnik,
       s.silnik,
       s.id_wersje_wyposazenia,
       s.wersja,
       s.id_modelu,
       s.model,
       s.rok_modelowy,
       s.cena,
       s.aktywny,
       e.status   AS status_egz,
       e.cena_wyjsciowa
FROM salon.egzemplarz e
         LEFT JOIN salon.klienci k ON e.id_klienta = k.id_klienta
         JOIN salon.samochody_widok s ON e.id_samochodu = s.id_samochodu
         JOIN salon.kolory kol ON e.id_koloru = kol.id_koloru
ORDER BY e.status, k.nazwisko;

create or replace view salon.zamowienia_widok
            (id_zamowienia, id_pracownika, imie, nazwisko, stanowisko, email, id_egzemplarza, id_koloru, id_klienta,
             imie_k, nazwisko_k, telefon_k, email_k, kolor, id_samochodu, id_silnik, silnik, id_wersje_wyposazenia,
             wersja, id_modelu, model, rok_modelowy, cena, aktywny, status_egz, cena_wyjsciowa, status, rabat,
             cena_koncowa)
as
SELECT z.id_zamowienia,
       p.id_pracownika,
       p.imie,
       p.nazwisko,
       p.stanowisko,
       p.email,
       e.id_egzemplarza,
       e.id_koloru,
       e.id_klienta,
       e.imie_k,
       e.nazwisko_k,
       e.telefon_k,
       e.email_k,
       e.kolor,
       e.id_samochodu,
       e.id_silnik,
       e.silnik,
       e.id_wersje_wyposazenia,
       e.wersja,
       e.id_modelu,
       e.model,
       e.rok_modelowy,
       e.cena,
       e.aktywny,
       e.status_egz,
       e.cena_wyjsciowa,
       z.status,
       z.rabat,
       z.cena_koncowa
FROM salon.zamowienia z,
     salon.pracownicy p,
     salon.egzemplarze_widok e
WHERE z.id_pracownika = p.id_pracownika
  AND z.id_egzemplarza = e.id_egzemplarza
ORDER BY z.status, e.nazwisko_k;

create or replace view salon.pokoj_wydan_widok
            (id_pokoj_wydan, id_pracownika, nazwisko, imie, id_zamowienia, data, id_klienta, nazwisko_k, imie_k) as
SELECT p.id_pokoj_wydan,
       p.id_pracownika,
       pr.nazwisko,
       pr.imie,
       p.id_zamowienia,
       p.data,
       k.id_klienta,
       k.nazwisko AS nazwisko_k,
       k.imie     AS imie_k
FROM salon.pokoj_wydan p
         JOIN salon.pracownicy pr ON p.id_pracownika = pr.id_pracownika
         JOIN salon.zamowienia z ON z.id_zamowienia = p.id_zamowienia
         JOIN salon.egzemplarz e ON z.id_egzemplarza = e.id_egzemplarza
         JOIN salon.klienci k ON e.id_klienta = k.id_klienta;

create or replace view salon.jazda_probna_widok
            (id_jazda_probna, id_pracownika, nazwisko_p, imie_p, id_klienta, nazwisko_k, imie_k, id_egzemplarza,
             data) as
SELECT j.id_jazda_probna,
       p.id_pracownika,
       p.nazwisko AS nazwisko_p,
       p.imie     AS imie_p,
       k.id_klienta,
       k.nazwisko AS nazwisko_k,
       k.imie     AS imie_k,
       j.id_egzemplarza,
       j.data
FROM salon.jazda_probna j
         JOIN salon.pracownicy p ON j.id_pracownika = p.id_pracownika
         JOIN salon.klienci k ON j.id_klienta = k.id_klienta;

/* funkcja sumująca ceny elementow wyposazenia i obliczajaca cene wersji wyposazenia */

create or replace function salon.policz_cene_wersji() returns trigger
    language plpgsql
as
$$
declare
    s numeric;
begin
    if TG_OP = 'INSERT' then
        select sum(wyp.cena)
        into s
        from salon.wyposazenie as wyp,
             salon.wyposazenie_w_wersji as wypwer
        where wypwer.id_wersje_wyposazenia = NEW.id_wersje_wyposazenia
          and wypwer.id_wyposazenia = wyp.id_wyposazenia;
        update salon.wersje_wyposazenia set cena=s where id_wersje_wyposazenia = NEW.id_wersje_wyposazenia;
    else
        select sum(wyp.cena)
        into s
        from salon.wyposazenie as wyp,
             salon.wyposazenie_w_wersji as wypwer
        where wypwer.id_wersje_wyposazenia = OLD.id_wersje_wyposazenia
          and wypwer.id_wyposazenia = wyp.id_wyposazenia;
        update salon.wersje_wyposazenia set cena=s where id_wersje_wyposazenia = OLD.id_wersje_wyposazenia;
    end if;
    return null;
end;
$$;

create trigger cena_wersji_wyposazenia
    after insert or update
    on salon.wyposazenie_w_wersji
    for each row
execute procedure salon.policz_cene_wersji();

/* funkcja obliczająca cene pojazdu jako suma wartosci wyposazenia, modelu, silnika */

create or replace function salon.policz_cene_samochodu() returns trigger
    language plpgsql
as
$$
declare
    s1 real;
    s2 real;
    s3 real;
    s4 real;
begin
    select werwyp.cena
    into s1
    from salon.wersje_wyposazenia as werwyp
    where NEW.id_wersje_wyposazenia = werwyp.id_wersje_wyposazenia;
    select m.cena_bazowa into s2 from salon.modele as m where NEW.id_modelu = m.id_modelu;
    select s.cena into s3 from salon.silnik as s where NEW.id_silnik = s.id_silnik;
    s4 := s1 + s2 + s3;
    NEW.cena = s4;
    return NEW;
end;
$$;

create trigger cena_samochodu
    before insert or update
    on salon.samochody
    for each row
execute procedure salon.policz_cene_samochodu();

/* funkcja obliczajaca cene samochodu, gdy tabela silnik zostanie zmodyfikowana */

create or replace function salon.policz_zmiane_ceny_samochodu_s() returns trigger
    language plpgsql
as
$$
declare
    row record;
    s1  real;
    s2  real;
    s3  real;
    s4  real;
begin
    for row in select sam.id_samochodu, sam.id_silnik, sam.id_wersje_wyposazenia, sam.id_modelu
               from salon.samochody as sam
               where sam.id_silnik = NEW.id_silnik
        loop
            select s.cena into s1 from salon.silnik s where s.id_silnik = row.id_silnik;
            select m.cena_bazowa into s2 from salon.modele m where m.id_modelu = row.id_modelu;
            select w.cena
            into s3
            from salon.wersje_wyposazenia w
            where w.id_wersje_wyposazenia = row.id_wersje_wyposazenia;
            s4 := s1 + s2 + s3;
            update salon.samochody set cena=s4 where id_samochodu = row.id_samochodu;
        end loop;
    return NEW;
end;
$$;

create trigger cena_samochodu_mod_s
    after update
    on salon.silnik
    for each row
execute procedure salon.policz_zmiane_ceny_samochodu_s();

/* funkcja obliczajaca cene samochodu, gdy tabela modele zostanie zmodyfikowana */

create or replace function salon.policz_zmiane_ceny_samochodu_m() returns trigger
    language plpgsql
as
$$
declare
    row record;
    s1  real;
    s2  real;
    s3  real;
    s4  real;
begin
    for row in select sam.id_samochodu, sam.id_silnik, sam.id_wersje_wyposazenia, sam.id_modelu
               from salon.samochody as sam
               where sam.id_modelu = NEW.id_modelu
        loop
            select s.cena into s1 from salon.silnik s where s.id_silnik = row.id_silnik;
            select m.cena_bazowa into s2 from salon.modele m where m.id_modelu = row.id_modelu;
            select w.cena
            into s3
            from salon.wersje_wyposazenia w
            where w.id_wersje_wyposazenia = row.id_wersje_wyposazenia;
            s4 := s1 + s2 + s3;
            update salon.samochody set cena=s4 where id_samochodu = row.id_samochodu;
        end loop;
    return NEW;
end;
$$;

create trigger cena_samochodu_mod_m
    after update
    on salon.modele
    for each row
execute procedure salon.policz_zmiane_ceny_samochodu_m();

/* funkcja obliczajaca cene samochodu, gdy tabela wersje_wyposazenia zostanie zmodyfikowana */

create or replace function salon.policz_zmiane_ceny_samochodu_w() returns trigger
    language plpgsql
as
$$
declare
    row record;
    s1  real;
    s2  real;
    s3  real;
    s4  real;
begin
    for row in select sam.id_samochodu, sam.id_silnik, sam.id_wersje_wyposazenia, sam.id_modelu
               from salon.samochody as sam
               where sam.id_wersje_wyposazenia = NEW.id_wersje_wyposazenia
        loop
            select s.cena into s1 from salon.silnik s where s.id_silnik = row.id_silnik;
            select m.cena_bazowa into s2 from salon.modele m where m.id_modelu = row.id_modelu;
            select w.cena
            into s3
            from salon.wersje_wyposazenia w
            where w.id_wersje_wyposazenia = row.id_wersje_wyposazenia;
            s4 := s1 + s2 + s3;
            update salon.samochody set cena=s4 where id_samochodu = row.id_samochodu;
        end loop;
    return NEW;
end;
$$;

create trigger cena_samochodu_mod_w
    after update
    on salon.wersje_wyposazenia
    for each row
execute procedure salon.policz_zmiane_ceny_samochodu_w();

/* funkcja liczaca cene egzemplarza jako suma ceny samochodu i koloru */

create or replace function salon.policz_cene_egzemplarza() returns trigger
    language plpgsql
as
$$
declare
    s1 real;
    s2 real;
    s3 real;
begin
    select k.cena into s1 from salon.kolory k where k.id_koloru = NEW.id_koloru;
    select s.cena into s2 from salon.samochody s where s.id_samochodu = NEW.id_samochodu;
    s3 := s1 + s2;
    NEW.cena_wyjsciowa = s3;
    return NEW;
end;
$$;

create trigger cena_egzemplarza
    before insert or update
    on salon.egzemplarz
    for each row
execute procedure salon.policz_cene_egzemplarza();

/* funkcja sprawdzajaca czy mozna usunac egzemplarz (mozna tylko przy statusie skonfigurowano lub utworzono) */

create or replace function salon.sprawdz_przy_usuwaniu_egzemplarza() returns trigger
    language plpgsql
as
$$
BEGIN
    IF OLD.status = 'skonfigurowano' OR OLD.status = 'utworzono' THEN
        RETURN OLD;
    ELSE
        RETURN NULL;
    END IF;
end;
$$;

create trigger usun_egzemplarz
    before delete
    on salon.egzemplarz
    for each row
execute procedure salon.sprawdz_przy_usuwaniu_egzemplarza();

/* funkcja liczaca cene egzemplarza (cena samochodu-rabat) */

create or replace function salon.policz_cene_zamowienia() returns trigger
    language plpgsql
as
$$
declare
    s1 real;
    s2 real;
begin
    if (TG_OP = 'INSERT') THEN
        select e.cena_wyjsciowa into s1 from salon.egzemplarz e where e.id_egzemplarza = NEW.id_egzemplarza;
        s2 := s1 - NEW.rabat;
        if s2 > 0 then
            NEW.cena_koncowa = s2;
        else
            NEW.cena_koncowa = 0;
        end if;
        return NEW;
    else
        if OLD.status <> 'utworzono' then
            NEW.cena_koncowa = OLD.cena_koncowa;
            RETURN NEW;
        else
            select e.cena_wyjsciowa into s1 from salon.egzemplarz e where e.id_egzemplarza = NEW.id_egzemplarza;
            s2 := s1 - NEW.rabat;
            if s2 > 0 then
                NEW.cena_koncowa = s2;
            else
                NEW.cena_koncowa = 0;
            end if;
            return NEW;
        end if;
    end if;
end;
$$;

create trigger cena_zamowienia
    before insert or update
    on salon.zamowienia
    for each row
execute procedure salon.policz_cene_zamowienia();

/* funkcja usuwajaca zamowienie i przywracajaca odpowiedni status egzemplarza */

create or replace function salon.sprawdz_przy_usuwaniu_zamowienia() returns trigger
    language plpgsql
as
$$
BEGIN
    IF OLD.status = 'utworzono' THEN
        update salon.egzemplarz set status='skonfigurowano' where id_egzemplarza = old.id_egzemplarza;
        RETURN OLD;
    ELSE
        RETURN NULL;
    END IF;
end;
$$;

create trigger usun_zamowienie
    before delete
    on salon.zamowienia
    for each row
execute procedure salon.sprawdz_przy_usuwaniu_zamowienia();

/* modyfikacja statusu egzemplarza po utworzeniu zamowienia */

create or replace function salon.zmien_status_egzemplarza() returns trigger
    language plpgsql
as
$$
begin
    update salon.egzemplarz set status='skladnik zamowienia' where id_egzemplarza = new.id_egzemplarza;
    return new;
end;

$$;

create trigger dodaj_zmien_status_podczas_dodawania
    before insert
    on salon.zamowienia
    for each row
execute procedure salon.zmien_status_egzemplarza();

/* obsluga zajetosci pracownika w pokoju wydan */

create or replace function salon.sprawdz_czy_mozesz_dodac_pracownika_pok_wyd() returns trigger
    language plpgsql
as
$$
declare
    id_pracownika1 integer;
    id_pracownika2 integer;
    stat           text;
begin
    select p.id_pracownika
    into id_pracownika1
    from salon.pokoj_wydan p
    where p.id_pracownika = NEW.id_pracownika
      and p.data = NEW.data
    LIMIT 1;
    select j.id_pracownika
    into id_pracownika2
    from salon.jazda_probna j
    where j.id_pracownika = NEW.id_pracownika
      and j.data = NEW.data
    LIMIT 1;
    select z.status into stat from salon.zamowienia z where z.id_zamowienia = NEW.id_zamowienia;
    if (id_pracownika1 IS NOT NULL OR id_pracownika2 IS NOT NULL OR stat <> 'gotowe do odbioru') then
        return NULL;
    else
        return NEW;
    end if;
end;
$$;

create trigger dodawanie_wydania
    before insert or update
    on salon.pokoj_wydan
    for each row
execute procedure salon.sprawdz_czy_mozesz_dodac_pracownika_pok_wyd();

/* obsluga zajetosci pracownika i pojazdu jazda probna */

create or replace function salon.sprawdz_czy_mozesz_dodac_pracownika_jazd_prob() returns trigger
    language plpgsql
as
$$
declare
    id_pracownika1 integer default null;
    id_pracownika2 integer;
    id_egzemplarza integer;
    stat           text;
begin
    select p.id_pracownika
    into id_pracownika1
    from salon.pokoj_wydan p
    where p.id_pracownika = NEW.id_pracownika
      and p.data = NEW.data
    LIMIT 1;
    select j.id_pracownika
    into id_pracownika2
    from salon.jazda_probna j
    where j.id_pracownika = NEW.id_pracownika
      and j.data = NEW.data
    LIMIT 1;
    select j.id_egzemplarza
    into id_egzemplarza
    from salon.jazda_probna j
    where j.id_egzemplarza = NEW.id_egzemplarza
      and j.data = NEW.data
    LIMIT 1;
    select e.status into stat from salon.egzemplarz e where e.id_egzemplarza = NEW.id_egzemplarza;
    if id_pracownika1 IS NOT NULL OR id_pracownika2 IS NOT NULL OR id_egzemplarza IS NOT NULL OR stat <> 'na placu' then
        return NULL;
    else
        return NEW;
    end if;
end;
$$;

create trigger dodawanie_jazdy_probnej
    before insert or update
    on salon.jazda_probna
    for each row
execute procedure salon.sprawdz_czy_mozesz_dodac_pracownika_jazd_prob();

/* aktualizacja statusu egzemplarza po zakonczeniu trnasakcji */

create or replace function salon.zmien_status_egzemplarza2() returns trigger
    language plpgsql
as
$$
begin
    if (new.status = 'transakcja zakonczona') then
        update salon.egzemplarz set status='transakcja zakonczona' where id_egzemplarza = new.id_egzemplarza;
    end if;
    return new;
end;
$$;

create trigger zmien_status_przy_finalizacji_zamowienia
    before update
    on salon.zamowienia
    for each row
execute procedure salon.zmien_status_egzemplarza2();


