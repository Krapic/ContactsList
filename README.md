# Adresar

Potrebno je napraviti jednostavni adresar koristeći [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio-code) i [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) na backendu i [React](https://reactjs.org/) s [TypeScript](https://www.typescriptlang.org/)-om i [Fluent UI](https://developer.microsoft.com/en-us/fluentui#/) na frontendu.  

## Setup

Projekt je već postavljen i spreman za razvoj (dodane su sve biblioteke koje se koriste). Nakon što se repozitorij klonira, potrebno je pokrenuti naredbu `npm install` u folderu `ClientApp`. Nakon toga se projekt može pokrenuti kroz odgovarajući IDE. Dozvoljeno je koristiti bilo koje razvojno okruženje. Za ASP.NET Core se najčešće koriste Visual Studio, Rider ili Visual Studio Code (s ekstenzijom za C#), a za React Visual Studio Code.

Potrebno je koristiti SQLite bazu koja (datoteka `app.db`). Ako zatreba, postoji [program za vizualni pregled i manipuliranjem baze](https://sqlitebrowser.org/dl/). Entiy Framework Core kontekst za bazu je već dodan u projekt (`AppDbContext.cs`) i njega se treba konfigurirati.

## Opis zadatka

Zadatak je napraviti jednostavan adresar. Potrebno je moći dodati novi kontakt (osobu), urediti i obrisati postojeći. Svakom kontaktu je potrebno moći dodijeliti ime i prezime, više email adresa i više telefonskih brojeva. Svakoj email adresi i svakom telefonskom broju potrebno je moći dodijeliti kategoriju (npr. **Home**, **Work**, itd.). Ako nema željene kategorije, potrebno ju je moći dodati. U aplikaciji nije potrebno implementirati nikakav security, korisnike ili tome slično.

Na početnoj stranici se treba prikazati lista kontakata grupiranih po prvom slovu imena. Kada korisnik klikne na kontakta, njegovi detalji se trebaju prikazati na "side-panelu" (pogledaj *Fluent UI Panel* ispod). Ta funkcionalnost treba biti implementirana pomoću ruta (pogledaj *React Router* ispod). Dakle, kada korisnik navigira na `/`, vidi listu kontakata, a kada navigira na `/1`, vidi listu kontakata preko koje je "side-panel" gdje se vide detalji kontakta s ID-em 1.

## Korisni linkovi

- [EF Core - Defining and Configuring a Model](https://docs.microsoft.com/en-us/ef/core/modeling/)
- [EF Core - Loading Data](https://docs.microsoft.com/en-us/ef/core/querying/)
- [EF Core - Loading Related Data](https://docs.microsoft.com/en-us/ef/core/querying/related-data/eager)
- [EF Core - Saving Data](https://docs.microsoft.com/en-us/ef/core/saving/basic)
- [EF Core - Saving Related Data](https://docs.microsoft.com/en-us/ef/core/saving/related-data)
- [EF Core - Deleting Data](https://docs.microsoft.com/en-us/ef/core/saving/cascade-delete)
- [Fluent UI Grouped List](https://developer.microsoft.com/en-us/fluentui#/controls/web/groupedlist)
- [Fluent UI Panel](https://developer.microsoft.com/en-us/fluentui#/controls/web/panel)
- [React Router](https://reactrouter.com/web/guides/quick-start)

## Bitne napomene

- U frontend dijelu projekta pozive web servisa treba uputiti na `https://localhost:7037` URL.
- Sve putanje do API endpointova dodati u `ClientApp/src/setupProxy.js` datoteku u varijablu `context`.
