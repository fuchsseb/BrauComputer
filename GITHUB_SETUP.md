# GitHub Repository Setup für BrauComputer

## Schritt-für-Schritt Anleitung

### 1. GitHub Repository erstellen

1. **Gehen Sie zu GitHub.com** und loggen Sie sich ein
2. **Klicken Sie auf "New repository"** (grüner Button oben rechts)
3. **Repository Details ausfüllen:**
   - **Repository name:** `BrauComputer`
   - **Description:** `Moderne Brausoftware für macOS mit Rezeptverwaltung, Heizkurven und Brautagebuch`
   - **Visibility:** Wählen Sie "Public" oder "Private"
   - **WICHTIG:** Lassen Sie alle Checkboxen UNMARKIERT (kein README, .gitignore oder License)
4. **Klicken Sie auf "Create repository"**

### 2. Lokales Repository mit GitHub verbinden

Führen Sie diese Befehle im Terminal aus:

```bash
# In das Projektverzeichnis wechseln
cd /Users/sebastian/Desktop/BrauComputer

# GitHub Repository als Remote hinzufügen
# Ersetzen Sie USERNAME mit Ihrem GitHub Username
git remote add origin https://github.com/USERNAME/BrauComputer.git

# Branch auf main setzen
git branch -M main

# Code zu GitHub pushen
git push -u origin main
```

### 3. Repository-URLs

Nach der Erstellung finden Sie Ihr Repository unter:
- **HTTPS:** `https://github.com/USERNAME/BrauComputer`
- **SSH:** `git@github.com:USERNAME/BrauComputer.git`

### 4. Repository Features aktivieren

Nach dem ersten Push können Sie folgende Features aktivieren:

1. **Issues:** Für Bug-Reports und Feature-Requests
2. **Projects:** Für Projektmanagement
3. **Wiki:** Für Dokumentation
4. **Discussions:** Für Community-Diskussionen

### 5. Repository-Einstellungen

1. **Gehen Sie zu Settings** in Ihrem Repository
2. **General Settings:**
   - Repository name: `BrauComputer`
   - Description: `Moderne Brausoftware für macOS`
   - Website: (optional) Ihre Website
   - Topics: `brewing`, `beer`, `macos`, `electron`, `react`, `typescript`

3. **Features:**
   - ✅ Issues
   - ✅ Projects
   - ✅ Wiki
   - ✅ Discussions

### 6. README.md anpassen

Das Repository enthält bereits eine umfassende README.md mit:
- Projektbeschreibung
- Features-Übersicht
- Installation-Anleitung
- Technologie-Stack
- Lizenz-Informationen

### 7. Releases erstellen

Für Versionen können Sie Releases erstellen:

1. **Gehen Sie zu "Releases"** in Ihrem Repository
2. **Klicken Sie auf "Create a new release"**
3. **Tag version:** `v1.0.0`
4. **Release title:** `BrauComputer v1.0.0`
5. **Beschreibung:** Erste Version der Brausoftware

### 8. GitHub Pages (optional)

Für eine Projekt-Website:

1. **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** main
4. **Folder:** / (root)

## Nächste Schritte

Nach der Repository-Erstellung:

1. **Clone das Repository** auf anderen Geräten
2. **Collaborators hinzufügen** für Team-Entwicklung
3. **Issues erstellen** für geplante Features
4. **Branches erstellen** für neue Features
5. **Pull Requests** für Code-Reviews

## Repository-Struktur

```
BrauComputer/
├── .gitignore          # Git ignore rules
├── .github/            # GitHub workflows (optional)
├── README.md           # Projekt-Dokumentation
├── SETUP.md           # Setup-Anleitung
├── GITHUB_SETUP.md    # Diese Datei
├── package.json        # Dependencies
├── main.js            # Electron main process
├── preload.js         # Electron preload
├── src/               # React App
│   ├── components/    # UI Komponenten
│   ├── pages/        # Hauptseiten
│   └── types/        # TypeScript Definitionen
└── public/           # Statische Dateien
```

## Support

Bei Problemen mit der Repository-Erstellung:

1. **GitHub Docs:** https://docs.github.com
2. **Git Tutorial:** https://git-scm.com/docs
3. **Issues erstellen** in Ihrem Repository

---

**Viel Erfolg mit Ihrem BrauComputer Repository! 🍺**
