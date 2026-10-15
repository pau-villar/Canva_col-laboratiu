# Cursors en temps real

Aplicació feta amb Node.js, Express i Socket.IO que mostra, sobre un canvas, els cursors de totes les persones connectades movent-se en temps real.

Cada usuari es representa amb un cercle (el cursor) i un quadrat amb el seu nom. El color és aleatori i el mateix per a tothom.

## Requisits

- Node.js (versió 18 o superior recomanada)
- npm

## Instal·lació

1. Clona o descarrega el projecte.
2. Entra a la carpeta del projecte.
3. Instal·la les dependències:

   npm install

## Execució

   node app.js

Per defecte el servidor escolta al port 3006. Obre al navegador:

   http://localhost:3006

Per veure el funcionament, obre l'adreça en dues pestanyes (o dues finestres una al costat de l'altra), entra amb noms diferents i mou el ratolí.

## Com funciona

1. En obrir l'aplicació es demana el nom (no pot estar buit ni tenir només espais, màxim 20 caràcters).
2. Després apareix un canvas a pantalla completa.
3. Cada vegada que mous el ratolí, el client envia la posició al servidor.
4. El servidor desa la posició de tots els usuaris i la reenvia a tots els clients.
5. Cada client dibuixa un cercle i un quadrat amb el nom per cada usuari.
6. Quan algú tanca la pestanya, el seu cursor desapareix.

## Esdeveniments de Socket.IO

| Esdeveniment | Direcció | Descripció |
|---|---|---|
| `user:join` | client → servidor | Envia el nom en entrar |
| `cursor:move` | client → servidor | Envia la posició `{x, y}` del ratolí |
| `cursors:update` | servidor → tots | Envia la llista d'usuaris amb nom, posició i color |

## Validació

El servidor comprova que el nom sigui un text no buit de com a màxim 20 caràcters, i que la posició siguin números. Les comprovacions del navegador només ajuden l'usuari.

## Estructura del projecte

   app.js            Servidor (Express + Socket.IO)
   package.json      Dependències i configuració
   package-lock.json Versions exactes de les dependències
   public/
     index.html      Pàgina amb el login i el canvas
     client.js       Lògica del client
     style.css       Estils

## Tecnologies

- Node.js
- Express
- Socket.IO
- HTML, CSS i JavaScript (canvas)
