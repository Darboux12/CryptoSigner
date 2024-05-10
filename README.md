# CryptoSigner - Aplikacja do Zarządzania Kluczami i Podpisami ECDSA

## Opis projektu
Projekt polega na stworzeniu bezpiecznej aplikacji webowej, która umożliwia użytkownikom generowanie kluczy, podpisywanie danych oraz weryfikację podpisów przy użyciu algorytmu ECDSA (Elliptic Curve Digital Signature Algorithm). Aplikacja oferuje łatwy w obsłudze interfejs użytkownika oraz zaawansowane mechanizmy zabezpieczeń.

## Funkcjonalności
- **Generowanie par kluczy**: Tworzenie par kluczy publicznych i prywatnych do użycia w cyfrowych podpisach.
- **Podpisywanie danych**: Możliwość podpisywania wybranych danych przy użyciu klucza prywatnego.
- **Weryfikacja podpisów**: Sprawdzanie autentyczności podpisu za pomocą odpowiedniego klucza publicznego.
- **Bezpieczne przechowywanie kluczy**: Klucze prywatne są przechowywane w bezpieczny sposób, zabezpieczone przed nieautoryzowanym dostępem.
- **Eksport i import kluczy**: Funkcjonalność umożliwiająca eksportowanie i importowanie kluczy w bezpiecznym formacie.

## O ECDSA
ECDSA, czyli Elliptic Curve Digital Signature Algorithm, to algorytm wykorzystujący krzywe eliptyczne do generowania podpisów cyfrowych. Jest ceniony za wydajność i bezpieczeństwo, stanowiąc standard w wielu nowoczesnych aplikacjach kryptograficznych, w tym w technologiach blockchain.

## Technologie
Projekt został zaimplementowany z użyciem następujących technologii:
- **Frontend**: React.js dla interaktywnego interfejsu użytkownika.
- **Backend**: Java z frameworkiem Spring Boot, zapewniający wsparcie dla tworzenia REST API.
- **Baza danych**: PostgreSQL, zapewniająca przechowywanie danych z transakcjami.

## Wdrażanie
Aplikacja może być wdrażana lokalnie lub na serwerach chmurowych z użyciem kontenerów Docker, co zapewnia łatwą skalowalność i zarządzanie środowiskiem.

## Licencja
Projekt jest udostępniony na licencji MIT.

