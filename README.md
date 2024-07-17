# Frame Magic 🪄

## Projekt – Web Technologien – Sommersemester 2024
Dieses Projekt wird im Rahmen des Moduls „Web Technologien“ im Master-Studium der Medieninformatik an der TH-Köln im Sommersemester 2024 durchgeführt.

## Ziel
Ziel dieses Projekts ist es, eine Client-Server-Anwendung zu entwickeln, mit der ein Bild mit [Langzeitbelichtung](https://de.wikipedia.org/wiki/Langzeitbelichtung) auf einfache Art und Weise nachgestellt bzw. generiert werden kann.

Warum ist das cool?\
Bilder mit Langzeitbelichtung sind gar nicht so einfach zu erstellen, vor allem, wenn man möglichst viel Kontrolle über das Endergebnis haben möchte.\

Als Ausgangspunkt für die Erstellung des Bildes dient ein Video, welches zunächst in Einzelbilder zerlegt wird. Die einzelnen Bilder werden anschließend mit verschiedenen Blendmodes so übereinander gelegt, dass ein Bild mit Langzeitbelichtungseffekt entsteht.

## Team
Autor: [Jona Dielmann](https://github.com/jona-d01)\
Reviewer: [Lioba Brandhoff](https://github.com/Liobabrandhoff)


## Dokumentation
Die Anforderungen an dieses Projekt wurden in einzelnen Issues festgehalten und in folgender Datei dokumentiert:

- [Issues & Zeitaufwand](docs/issues.md)

Die Entscheidungen für die Verwendung der Technologien innerhalb dieses Projekts, sind in Form von [Architectural Decision Records (ADR's)](https://adr.github.io) unter folgenden Links einzusehen:

- [Backend](docs/decisions/backend.md)
- [Frontend](docs/decisions/frontend.md)
- [Bildbearbeitung](docs/decisions/imageEditingTools.md)
- [Videobearbeitung](docs/decisions/videoEditingTools.md)


## Verwendung
> Die lokale Ausführung dieses Projekts setzt die Installation von [Node.js](https://nodejs.org/en/download/prebuilt-installer) oder [Docker](https://www.docker.com/) voraus!
### Docker:

#### Installation
```shell
 docker build -t frame-magic .
```

#### Ausführung
```shell
docker run --name frame-magic -p 8000:8000 -d frame-magic
```

### Node.js:

#### Installation
```shell
npm install
```

#### Ausführung
```shell
npm start
```

Die Anwendung kann nach erfolgreicher Ausführung unter http://localhost:8000 im Browser aufgerufen werden.
