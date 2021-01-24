

INSERT INTO salon.klienci VALUES (1, 'Jan', 'Kowalski', NULL, NULL, 'Krakowska', '11', '11-234', 'Kraków', 123456789, 'kowalski@mail.com', 'qwerty');
INSERT INTO salon.klienci VALUES (2, 'Adam', 'Nowak', 'Komp-serwis', 32124214, 'Warszawska', '14', '00-003', 'Warszawa', 987654321, 'nowak@mail.com', 'asdf');
INSERT INTO salon.klienci VALUES (4, 'Michał ', 'Kacprzak', 'Michał Kacprzak', 1234, 'Perseusza', '13', '71-781', 'Szczecin', 509805029, 'michal.kacprzak999@gmail.com', 'test1');
INSERT INTO salon.klienci VALUES (7, 'Dariusz', 'Cacacki', 'cds', 334, 'dwd', 'dewd', 'dewd', 'dewdw', 323, 'asdad', 'qwe');
INSERT INTO salon.klienci VALUES (3, 'Jan', 'Babacki', 'samozatrudnienie', 123457123, 'Klonowa', '23', '22-222', 'Kraków', 123987489, 'abacki@mail.com', 'qwerty');



INSERT INTO salon.kolory VALUES (1, 'bialy', 'akrylowy', 0);
INSERT INTO salon.kolory VALUES (2, 'niebieski', 'akrylowy', 0);
INSERT INTO salon.kolory VALUES (3, 'czerwony', 'metalic', 300);
INSERT INTO salon.kolory VALUES (4, 'fioletowy', 'metalic', 500);
INSERT INTO salon.kolory VALUES (5, 'srebrny', 'perlowy', 0);




INSERT INTO salon.modele VALUES (1, 'Model A', 'Hatchback', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 4440, 1879, 1400, 330, 55000);
INSERT INTO salon.modele VALUES (2, 'Model A', 'Sedan', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 4570, 1879, 1400, 400, 60000);
INSERT INTO salon.modele VALUES (3, 'Model A', 'Kombi', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 4600, 1879, 1400, 550, 65000);
INSERT INTO salon.modele VALUES (4, 'Model B', 'Hatchback', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 4200, 1900, 1350, 300, 85000);
INSERT INTO salon.modele VALUES (5, 'Model B', 'Sedan', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 4300, 1900, 1350, 350, 90000);
INSERT INTO salon.modele VALUES (6, 'Model C', 'Coupe', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 4500, 1950, 1250, 320, 111000);
INSERT INTO salon.modele VALUES (7, 'Model C', 'Kabriolet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 3400, 1950, 1250, 250, 125000);




INSERT INTO salon.silnik VALUES (1, 'c1100zx', 115, 3, 115, 1098, 'benzyna', 0);
INSERT INTO salon.silnik VALUES (2, 'sr2200lx', 130, 4, 145, 2188, 'benzyna', 3500);
INSERT INTO salon.silnik VALUES (3, 'a1700wr', 215, 4, 180, 1703, 'benzyna', 5000);
INSERT INTO salon.silnik VALUES (4, 'pr3000s', 180, 4, 130, 3012, 'diesel', 2800);
INSERT INTO salon.silnik VALUES (5, 'hb2400', 234, 3, 90, 2399, 'hybryda', 7500);




INSERT INTO salon.wersje_wyposazenia VALUES (1, 'Standard', 6200, 1);
INSERT INTO salon.wersje_wyposazenia VALUES (2, 'Komfort', 16800, 1);
INSERT INTO salon.wersje_wyposazenia VALUES (3, 'Sport', 33750, 1);




INSERT INTO salon.samochody VALUES (3, 3, 1, 4, 2021, 96200, 1);
INSERT INTO salon.samochody VALUES (4, 5, 3, 6, 2021, 152250, 1);
INSERT INTO salon.samochody VALUES (1, 1, 1, 1, 2020, 61200, 1);
INSERT INTO salon.samochody VALUES (2, 1, 2, 3, 2020, 81800, 1);
INSERT INTO salon.samochody VALUES (6, 1, 3, 7, 2021, 158750, 1);




INSERT INTO salon.egzemplarz VALUES (5, 2, 3, 1, 'skladnik zamowienia', 81800);
INSERT INTO salon.egzemplarz VALUES (2, 2, 2, 3, 'transakcja zakonczona', 82100);
INSERT INTO salon.egzemplarz VALUES (9, 3, 4, 2, 'transakcja zakonczona', 96200);
INSERT INTO salon.egzemplarz VALUES (4, 2, 3, 1, 'transakcja zakonczona', 81800);
INSERT INTO salon.egzemplarz VALUES (1, 1, 1, 1, 'skladnik zamowienia', 61200);
INSERT INTO salon.egzemplarz VALUES (10, 4, 3, 4, 'skladnik zamowienia', 152750);
INSERT INTO salon.egzemplarz VALUES (3, 3, 3, 3, 'skladnik zamowienia', 96500);
INSERT INTO salon.egzemplarz VALUES (6, 2, NULL, 1, 'skonfigurowano', 81800);
INSERT INTO salon.egzemplarz VALUES (8, 2, NULL, 1, 'skonfigurowano', 81800);




INSERT INTO salon.pracownicy VALUES (1, 'Adam', 'Abacki', 'kierownik', 'abacki@mail.com', 'qwerty');
INSERT INTO salon.pracownicy VALUES (2, 'Jan', 'Babacki', 'sprzedawca', 'babacki@mail.com', 'abc');
INSERT INTO salon.pracownicy VALUES (3, 'Tomasz', 'Cacacki', 'sprzedawca', 'cacacki@mail.com', 'cde');
INSERT INTO salon.pracownicy VALUES (4, 'Andrzej', 'Dadacki', 'sprzedawca', 'dadacki@mail.com', 'zaq');
INSERT INTO salon.pracownicy VALUES (6, 'Lorem', 'Ipsum', 'sprzedawca', 'abacki@ail.com', 'qwerty');
INSERT INTO salon.pracownicy VALUES (7, 'Z', 'Z', 'sprzedawca', 'abc', 'qwerty');




INSERT INTO salon.jazda_probna VALUES (1, 2, 3, 6, '2021-01-01 14:30:00');
INSERT INTO salon.jazda_probna VALUES (2, 2, 4, 6, '2021-01-29 10:00:00');
INSERT INTO salon.jazda_probna VALUES (3, 2, 3, 6, '2021-01-25 15:30:00');
INSERT INTO salon.jazda_probna VALUES (4, 2, 1, 6, '2021-01-01 12:00:00');
INSERT INTO salon.jazda_probna VALUES (5, 4, 1, 8, '2021-01-01 12:00:00');
INSERT INTO salon.jazda_probna VALUES (6, 7, 7, 6, '2021-01-01 10:00:00');
INSERT INTO salon.jazda_probna VALUES (8, 6, 2, 8, '2021-01-01 10:00:00');
INSERT INTO salon.jazda_probna VALUES (10, 2, 1, 6, '2021-01-11 10:00:00');
INSERT INTO salon.jazda_probna VALUES (14, 2, 3, 6, '2021-01-31 10:00:00');




INSERT INTO salon.zamowienia VALUES (1, 1, 2, 'transakcja zakonczona', 0, 82100);
INSERT INTO salon.zamowienia VALUES (5, 3, 9, 'transakcja zakonczona', 0, 96200);
INSERT INTO salon.zamowienia VALUES (4, 2, 5, 'zamowienie zlozone', 0, 81800);
INSERT INTO salon.zamowienia VALUES (3, 2, 4, 'transakcja zakonczona', 0, 81800);
INSERT INTO salon.zamowienia VALUES (7, 4, 10, 'gotowe do odbioru', 20000, 132750);
INSERT INTO salon.zamowienia VALUES (8, 3, 3, 'utworzono', 0, 96500);
INSERT INTO salon.zamowienia VALUES (6, 2, 1, 'gotowe do odbioru', 0, 61200);




INSERT INTO salon.pokoj_wydan VALUES (1, 2, 3, '2021-01-30 10:00:00');
INSERT INTO salon.pokoj_wydan VALUES (3, 3, 7, '2021-01-29 14:00:00');
INSERT INTO salon.pokoj_wydan VALUES (4, 2, 6, '2021-01-01 10:00:00');




INSERT INTO salon.typ_wyposazenia VALUES (1, 'Audio');
INSERT INTO salon.typ_wyposazenia VALUES (2, 'Opony');
INSERT INTO salon.typ_wyposazenia VALUES (3, 'Felgi');
INSERT INTO salon.typ_wyposazenia VALUES (4, 'Klimatyzacja');
INSERT INTO salon.typ_wyposazenia VALUES (5, 'Tapicerka');
INSERT INTO salon.typ_wyposazenia VALUES (6, 'Fotele');
INSERT INTO salon.typ_wyposazenia VALUES (7, 'Zawieszenie');
INSERT INTO salon.typ_wyposazenia VALUES (8, 'Uklad wydechowy');
INSERT INTO salon.typ_wyposazenia VALUES (9, 'Komfort');
INSERT INTO salon.typ_wyposazenia VALUES (10, 'Poduszki powietrzne');
INSERT INTO salon.typ_wyposazenia VALUES (11, 'Skrzynia biegow');
INSERT INTO salon.typ_wyposazenia VALUES (12, 'Reflektory przod');
INSERT INTO salon.typ_wyposazenia VALUES (13, 'Reflektory tyl');
INSERT INTO salon.typ_wyposazenia VALUES (14, 'Pakiet zewnetrzny');
INSERT INTO salon.typ_wyposazenia VALUES (15, 'Kierownica');
INSERT INTO salon.typ_wyposazenia VALUES (16, 'Lusterka');
INSERT INTO salon.typ_wyposazenia VALUES (17, 'Oswietlenie dodatkowe');
INSERT INTO salon.typ_wyposazenia VALUES (18, 'Czujniki parkowania');
INSERT INTO salon.typ_wyposazenia VALUES (19, 'Bezpieczenstwo');



INSERT INTO salon.wyposazenie VALUES (1, 1, 'Radio Basic', 'Standardowe radio 1 DIN', 1500);
INSERT INTO salon.wyposazenie VALUES (2, 1, 'Radio Comfort', 'Radio 2 DIN + 8 głośników', 2500);
INSERT INTO salon.wyposazenie VALUES (3, 1, 'Radio Business', 'Radio z ekranem 10 cali + 12 glosników', 4000);
INSERT INTO salon.wyposazenie VALUES (4, 2, 'Opony Zimowe', 'Opony Zimowe', 1200);
INSERT INTO salon.wyposazenie VALUES (5, 2, 'Opony letnie', 'Opony letnie', 1200);
INSERT INTO salon.wyposazenie VALUES (6, 2, 'Opony całoroczne', 'Opony całoroczne', 2400);
INSERT INTO salon.wyposazenie VALUES (7, 3, 'Felgi stalowe 15"', 'Stadard', 0);
INSERT INTO salon.wyposazenie VALUES (8, 3, 'Felgi stalowe 16"', 'Standard', 200);
INSERT INTO salon.wyposazenie VALUES (9, 3, 'Styling 1', 'Felgi ze stopów lekkich 15"', 1000);
INSERT INTO salon.wyposazenie VALUES (10, 3, 'Styling 2', 'Felgi ze stopów lekkich 16"', 1500);
INSERT INTO salon.wyposazenie VALUES (11, 3, 'Styling 3', 'Felgi ze stopów lekkich 17"', 2000);
INSERT INTO salon.wyposazenie VALUES (12, 3, 'Styling 4', 'Felgi ze stopów lekkich 18"', 3000);
INSERT INTO salon.wyposazenie VALUES (13, 3, 'Styling 5', 'Felgi ze stopów lekkich 19"', 4000);
INSERT INTO salon.wyposazenie VALUES (14, 4, 'Klimatyzacja manualna', 'Jednostrefowa', 300);
INSERT INTO salon.wyposazenie VALUES (15, 4, 'Klimatyzacja automatyczna 2S', 'Dwustrefowa', 1200);
INSERT INTO salon.wyposazenie VALUES (16, 4, 'Klimatyzacja automatyczna 4S', 'Czterostrefowa', 2400);
INSERT INTO salon.wyposazenie VALUES (17, 5, 'Tapicerka Standard', 'Materiał ekologiczny', 0);
INSERT INTO salon.wyposazenie VALUES (18, 5, 'Tapicerka Welur', 'Kolor czarny', 700);
INSERT INTO salon.wyposazenie VALUES (19, 5, 'Tapicerka Business', 'Skóra ekologiczna', 2400);
INSERT INTO salon.wyposazenie VALUES (20, 5, 'Tapicerka Prestige', 'Skóra Nappa', 3000);
INSERT INTO salon.wyposazenie VALUES (21, 6, 'Fotele Standard', 'Regulacja manualna w 3 płaszczyznach', 0);
INSERT INTO salon.wyposazenie VALUES (22, 6, 'Fotele Comfort', 'Regulacja elektryczna w 4 płaszczyznach, zwiększone podparcie boczne', 1500);
INSERT INTO salon.wyposazenie VALUES (23, 6, 'Fotele Sport', 'Elektryczna regulacja w 4 płaszczyznach, wydłużone siedzisko, maksymalne podparcie boczne', 2400);
INSERT INTO salon.wyposazenie VALUES (24, 7, 'Zawieszenie Standard', 'Standardowe wielowahaczowe zawieszenie', 0);
INSERT INTO salon.wyposazenie VALUES (25, 7, 'Zawieszenie Comfort', 'Zawieszenie pneumatyczne o zwiększonym komforcie', 2500);
INSERT INTO salon.wyposazenie VALUES (26, 7, 'Zawieszenie Sport', 'Zawieszenie sportowe z regulacją twardości i tłumienia', 3750);
INSERT INTO salon.wyposazenie VALUES (27, 8, 'Wydech Standard', '', 0);
INSERT INTO salon.wyposazenie VALUES (28, 8, 'Wydech Sport', 'Sportowy układ wydechowy z regulacją głośności', 1700);
INSERT INTO salon.wyposazenie VALUES (29, 9, 'Komfort 1', '', 0);
INSERT INTO salon.wyposazenie VALUES (30, 9, 'Komfort2', '', 0);
INSERT INTO salon.wyposazenie VALUES (31, 10, '8 poduszek powietrznych', 'Zawiera kurtyny powietrzne', 0);
INSERT INTO salon.wyposazenie VALUES (32, 10, '10 poduszek powietrznych', 'Dodatkowo poduszka kolanowa kierowcy i poduszka pomiędzy pasażerami z przodu', 300);
INSERT INTO salon.wyposazenie VALUES (33, 10, '15 poduszek powietrzych', 'Dodatkowe poduszki na drzwiach ', 500);
INSERT INTO salon.wyposazenie VALUES (34, 11, 'Manualna 6 biegowa', 'Standardowa skrzynia biegów z sześcioma biegami', 0);
INSERT INTO salon.wyposazenie VALUES (35, 11, 'Automatyczna 7 biegowa', 'Dwusprzęgłowa skrzynia biegów', 1300);
INSERT INTO salon.wyposazenie VALUES (36, 11, 'Automatyczna 8 biegowa', 'Dwusprzęgłowa skrzynia ze zmianą trybów jazdy', 2300);
INSERT INTO salon.wyposazenie VALUES (37, 12, 'Reflektory soczewkowe', 'Podwójne soczewkowe reflektory ze światłami dziennymi LED', 0);
INSERT INTO salon.wyposazenie VALUES (38, 12, 'Reflektory biksenonowe', 'Skrętne reflektory ze światłami dziennymi LED', 800);
INSERT INTO salon.wyposazenie VALUES (39, 12, 'Reflektory Matrix-LED', 'Reflektory w technologii Full-LED z aktywnym doświetlaniem zakrętów', 4000);
INSERT INTO salon.wyposazenie VALUES (40, 13, 'Reflektory standard', 'Reflektory z podwójnym światłem przeciwmgielnym', 0);
INSERT INTO salon.wyposazenie VALUES (41, 13, 'Reflektory w technologii Full-LED', 'Reflektory w technologii zwiększającej widoczność w trudnych warunkach', 800);
INSERT INTO salon.wyposazenie VALUES (42, 14, 'Pakiet standard', 'Zderzaki w kolorze nadwozia', 0);
INSERT INTO salon.wyposazenie VALUES (43, 14, 'Pakiet Elegance', 'Pakiet z dodatkowymi chromowanymi listwami i inaczej wystylizowanymi przetłoczeniami', 1900);
INSERT INTO salon.wyposazenie VALUES (44, 14, 'Pakiet Sport', 'Pakiet ze sportowymi dodadkami w postaci obniżających dokładek', 3000);
INSERT INTO salon.wyposazenie VALUES (45, 15, 'Kierownica 3 ramienna', 'Standardowa kierownica obszyta materiałem', 0);
INSERT INTO salon.wyposazenie VALUES (46, 15, 'Kierownica 3 ramienna Komfort', 'Kierownica z przyciskami do sterowania multimediami obszyta ekologiczną skórą', 500);
INSERT INTO salon.wyposazenie VALUES (47, 15, 'Kierownica Sport', 'Sportowa kierownica obszyta alcantarą o zmniejszonym wieńcu', 1100);
INSERT INTO salon.wyposazenie VALUES (48, 16, 'Lusterka Standard', 'Lusterka z podgrzewaniem', 0);
INSERT INTO salon.wyposazenie VALUES (49, 16, 'Lusterka fotochromatycze', 'Lusterka fotochromatyczne z podgrzewaniem', 500);
INSERT INTO salon.wyposazenie VALUES (50, 17, 'Halogeny przeciwmgielne', 'Halogeny przeciwmgielne w technologii LED', 700);
INSERT INTO salon.wyposazenie VALUES (51, 18, 'Czujniki parkowania', 'Czujniki parkowania z przodu i z tyłu', 700);
INSERT INTO salon.wyposazenie VALUES (52, 18, 'Kamera cofania z tyłu i czujniki parkowania z przodu', 'Zestaw z ekranem w lusterku wstecznym', 1400);
INSERT INTO salon.wyposazenie VALUES (53, 18, 'Kamera 360 stopni', 'Kamera wspomagająca parkowanie automatycznie generowanymi liniami', 2000);
INSERT INTO salon.wyposazenie VALUES (54, 19, 'Pakiet Safety', 'Asystent hamowania awaryjnego, asystent pasa ruchu, asystent zjazdu ze wzniesienia', 3000);
INSERT INTO salon.wyposazenie VALUES (55, 19, 'Pakiet Safety Plus', 'Asystent hamowania awaryjnego, asystent pasa ruchu, asystent zjazdu ze wzniesienia, aktywny tempomat, asystent parkowania', 4400);




INSERT INTO salon.wyposazenie_w_wersji VALUES (1, 1, 1);
INSERT INTO salon.wyposazenie_w_wersji VALUES (2, 1, 5);
INSERT INTO salon.wyposazenie_w_wersji VALUES (3, 1, 7);
INSERT INTO salon.wyposazenie_w_wersji VALUES (4, 1, 14);
INSERT INTO salon.wyposazenie_w_wersji VALUES (5, 1, 17);
INSERT INTO salon.wyposazenie_w_wersji VALUES (6, 1, 21);
INSERT INTO salon.wyposazenie_w_wersji VALUES (7, 1, 24);
INSERT INTO salon.wyposazenie_w_wersji VALUES (8, 1, 27);
INSERT INTO salon.wyposazenie_w_wersji VALUES (9, 1, 31);
INSERT INTO salon.wyposazenie_w_wersji VALUES (10, 1, 34);
INSERT INTO salon.wyposazenie_w_wersji VALUES (11, 1, 37);
INSERT INTO salon.wyposazenie_w_wersji VALUES (12, 1, 38);
INSERT INTO salon.wyposazenie_w_wersji VALUES (13, 1, 40);
INSERT INTO salon.wyposazenie_w_wersji VALUES (14, 1, 43);
INSERT INTO salon.wyposazenie_w_wersji VALUES (15, 1, 46);
INSERT INTO salon.wyposazenie_w_wersji VALUES (16, 2, 2);
INSERT INTO salon.wyposazenie_w_wersji VALUES (17, 2, 5);
INSERT INTO salon.wyposazenie_w_wersji VALUES (18, 2, 9);
INSERT INTO salon.wyposazenie_w_wersji VALUES (19, 2, 15);
INSERT INTO salon.wyposazenie_w_wersji VALUES (20, 2, 18);
INSERT INTO salon.wyposazenie_w_wersji VALUES (21, 2, 22);
INSERT INTO salon.wyposazenie_w_wersji VALUES (22, 2, 25);
INSERT INTO salon.wyposazenie_w_wersji VALUES (23, 2, 27);
INSERT INTO salon.wyposazenie_w_wersji VALUES (24, 2, 32);
INSERT INTO salon.wyposazenie_w_wersji VALUES (25, 2, 35);
INSERT INTO salon.wyposazenie_w_wersji VALUES (26, 2, 38);
INSERT INTO salon.wyposazenie_w_wersji VALUES (27, 2, 40);
INSERT INTO salon.wyposazenie_w_wersji VALUES (28, 2, 43);
INSERT INTO salon.wyposazenie_w_wersji VALUES (29, 2, 46);
INSERT INTO salon.wyposazenie_w_wersji VALUES (30, 2, 48);
INSERT INTO salon.wyposazenie_w_wersji VALUES (31, 2, 50);
INSERT INTO salon.wyposazenie_w_wersji VALUES (32, 2, 51);
INSERT INTO salon.wyposazenie_w_wersji VALUES (33, 3, 3);
INSERT INTO salon.wyposazenie_w_wersji VALUES (34, 3, 5);
INSERT INTO salon.wyposazenie_w_wersji VALUES (35, 3, 10);
INSERT INTO salon.wyposazenie_w_wersji VALUES (36, 3, 15);
INSERT INTO salon.wyposazenie_w_wersji VALUES (37, 3, 19);
INSERT INTO salon.wyposazenie_w_wersji VALUES (38, 3, 23);
INSERT INTO salon.wyposazenie_w_wersji VALUES (39, 3, 26);
INSERT INTO salon.wyposazenie_w_wersji VALUES (40, 3, 28);
INSERT INTO salon.wyposazenie_w_wersji VALUES (41, 3, 33);
INSERT INTO salon.wyposazenie_w_wersji VALUES (42, 3, 35);
INSERT INTO salon.wyposazenie_w_wersji VALUES (43, 3, 39);
INSERT INTO salon.wyposazenie_w_wersji VALUES (44, 3, 41);
INSERT INTO salon.wyposazenie_w_wersji VALUES (45, 3, 44);
INSERT INTO salon.wyposazenie_w_wersji VALUES (46, 3, 47);
INSERT INTO salon.wyposazenie_w_wersji VALUES (47, 3, 49);
INSERT INTO salon.wyposazenie_w_wersji VALUES (48, 3, 52);
INSERT INTO salon.wyposazenie_w_wersji VALUES (49, 3, 54);