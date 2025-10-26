# BrauComputer

Eine moderne Brausoftware für macOS mit umfassenden Funktionen für das professionelle Bierbrauen.

## Features

### 🍺 Rezeptverwaltung
- Erstelle und verwalte deine Bierrezepte
- Detaillierte Zutatenverwaltung (Malz, Hopfen, Hefe)
- Automatische Berechnung von ABV, IBU, SRM
- Rezeptsuche und Filterung

### 📊 Maische-Kurven
- Plane und überwache deine Maische-Temperaturen
- Visuelle Darstellung der Temperaturverläufe
- Echtzeit-Aufzeichnung während des Brauprozesses
- Speichere und vergleiche verschiedene Kurven

### 🌡️ Gärkurven
- Überwache Temperatur, Stammwürze und pH-Wert
- Analysiere den Gärverlauf für optimale Ergebnisse
- Dokumentiere Gärnotizen und Beobachtungen
- Verfolge den Fortschritt der Gärung

### 🌾 Malz-Datenbank
- Umfassende Datenbank mit Malzsorten
- Technische Daten (Farbe, Extrakt, Protein, etc.)
- Farbvorschau für bessere Rezeptplanung
- EBC/SRM Umrechnung

### 📝 Brautagebuch
- Dokumentiere alle deine Brausitzungen
- Verfolge den Status von geplanten bis fertigen Bieren
- Detaillierte Aufzeichnung aller Brauparameter
- Statistiken und Übersichten

### 🔗 Brewbrain Float Integration
- Verbinde deinen Brewbrain Float
- Echtzeit-Überwachung von Temperatur und Stammwürze
- Automatische Datenaufzeichnung
- Bluetooth-Verbindung für drahtlose Messungen

## Installation

### Voraussetzungen
- macOS 10.15 oder höher
- Node.js 16 oder höher
- npm oder yarn

### Setup
```bash
# Repository klonen
git clone <repository-url>
cd BrauComputer

# Dependencies installieren
npm install

# Entwicklung starten
npm run dev

# App bauen
npm run build

# Electron App erstellen
npm run dist
```

## Technologie-Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Desktop**: Electron
- **Charts**: Recharts, Chart.js
- **Icons**: Heroicons
- **Build**: Electron Builder

## Entwicklung

### Verfügbare Scripts

- `npm start` - Startet die Electron App
- `npm run dev` - Startet React Dev Server + Electron
- `npm run build` - Baut die React App
- `npm run dist` - Erstellt eine verteilbare macOS App

### Projektstruktur

```
src/
├── components/          # Wiederverwendbare Komponenten
├── pages/              # Hauptseiten der Anwendung
├── types/              # TypeScript Typdefinitionen
└── App.tsx             # Hauptkomponente
```

## Features im Detail

### Rezeptverwaltung
- Vollständige Rezeptdatenbank
- Zutatenverwaltung mit Mengen und Einheiten
- Automatische Berechnungen
- Export/Import Funktionen

### Maische-Kurven
- Interaktive Temperaturplanung
- Echtzeit-Aufzeichnung
- Schritt-für-Schritt Anleitungen
- Vergleich verschiedener Kurven

### Gärkurven
- Multi-Parameter Überwachung
- Automatische Datenaufzeichnung
- Trend-Analyse
- Gärnotizen und Dokumentation

### Malz-Datenbank
- Über 100 vordefinierte Malzsorten
- Technische Spezifikationen
- Farbberechnung und Vorschau
- Benutzerdefinierte Malze

### Brautagebuch
- Vollständige Braudokumentation
- Status-Tracking
- Statistiken und Analysen
- Export-Funktionen

### Brewbrain Integration
- Bluetooth-Verbindung
- Echtzeit-Datenübertragung
- Automatische Synchronisation
- Offline-Funktionalität

## Lizenz

MIT License - siehe LICENSE Datei für Details.

## Support

Bei Fragen oder Problemen erstelle bitte ein Issue im GitHub Repository.

## Changelog

### Version 1.0.0
- Initiale Version mit allen Grundfunktionen
- Rezeptverwaltung
- Maische- und Gärkurven
- Malz-Datenbank
- Brautagebuch
- Brewbrain Float Integration
