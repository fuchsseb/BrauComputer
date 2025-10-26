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
git clone https://github.com/fuchsseb/BrauComputer.git
cd BrauComputer

# Dependencies installieren
npm install

# App starten (Production - empfohlen)
npm run build
npm start

# Entwicklung starten
npm run dev
```

### GitHub Repository
Das Projekt ist verfügbar unter: https://github.com/fuchsseb/BrauComputer

## Technologie-Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Desktop**: Electron
- **Charts**: Recharts, Chart.js
- **Icons**: Heroicons
- **Build**: Electron Builder

## Entwicklung

### Verfügbare Scripts

- `npm start` - Startet die Electron App (Production)
- `npm run dev` - Startet React Dev Server + Electron (Development)
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

### Troubleshooting

**App startet nicht:**
```bash
# Port 3000 freigeben
lsof -ti:3000 | xargs kill -9

# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install

# Production Version verwenden
npm run build
npm start
```

**Development Probleme:**
- React Dev Server braucht Zeit zum Starten
- Electron wartet automatisch auf React
- Bei Problemen: Production Version verwenden (`npm run build && npm start`)

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
