# BrauComputer Setup Anleitung

## GitHub Repository erstellen

Da GitHub CLI nicht installiert ist, folgen Sie diesen Schritten:

### 1. GitHub Repository manuell erstellen

1. Gehen Sie zu [GitHub.com](https://github.com)
2. Klicken Sie auf "New repository"
3. Repository Name: `BrauComputer`
4. Beschreibung: `Moderne Brausoftware für macOS mit Rezeptverwaltung, Heizkurven und Brautagebuch`
5. Wählen Sie "Public" oder "Private"
6. **NICHT** "Initialize with README" auswählen (da wir bereits Dateien haben)
7. Klicken Sie auf "Create repository"

### 2. Lokales Repository mit GitHub verbinden

Führen Sie diese Befehle im Terminal aus:

```bash
cd /Users/sebastian/Desktop/BrauComputer

# Remote Repository hinzufügen (ersetzen Sie USERNAME mit Ihrem GitHub Username)
git remote add origin https://github.com/USERNAME/BrauComputer.git

# Branch auf main setzen
git branch -M main

# Code zu GitHub pushen
git push -u origin main
```

### 3. Anwendung starten

```bash
# Dependencies installieren (falls noch nicht geschehen)
npm install

# Entwicklungsserver starten
npm run dev

# Oder die App direkt starten
npm start
```

### 4. App bauen und verteilen

```bash
# React App bauen
npm run build

# Electron App für macOS erstellen
npm run dist
```

## Features der Anwendung

✅ **Rezeptverwaltung**
- Erstelle und verwalte Bierrezepte
- Detaillierte Zutatenverwaltung
- Automatische Berechnungen (ABV, IBU, SRM)

✅ **Maische-Kurven**
- Temperaturplanung und -überwachung
- Visuelle Darstellung
- Echtzeit-Aufzeichnung

✅ **Gärkurven**
- Überwachung von Temperatur, Stammwürze, pH
- Gärverlauf-Analyse
- Dokumentation

✅ **Malz-Datenbank**
- Umfassende Malzsorten-Datenbank
- Technische Daten und Farbberechnung
- EBC/SRM Umrechnung

✅ **Brautagebuch**
- Vollständige Braudokumentation
- Status-Tracking
- Statistiken

✅ **Brewbrain Float Integration**
- Bluetooth-Verbindung
- Echtzeit-Datenübertragung
- Automatische Synchronisation

## Technologie-Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Desktop**: Electron
- **Charts**: Recharts, Chart.js
- **Icons**: Heroicons
- **Build**: Electron Builder

## Unterstützte Plattformen

- macOS 10.15+
- Node.js 16+
- Electron 27+

## Lizenz

MIT License
