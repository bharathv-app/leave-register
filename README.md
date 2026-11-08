# Leave Register

A personal leave register for Tamil Nadu Government servants. It runs in the browser, installs on
Android like an app, works offline, and keeps data on your own device — with optional sync through
your own Google Drive.

- Earned Leave worked out from your joining date and service category
- Casual Leave (12 a year), Restricted Holidays (3 a year, checked against the RH list)
- Compensatory leave from holiday turn duty, lapsing after 6 months
- Checks every entry: overlaps, yearly limits, EL at credit, the 10-day rule, half days
- Backup and restore as a JSON file, export to Excel, sync between devices with Google Drive

---

## Part 1 — Put the app online with GitHub Pages (free)

1. **Create a GitHub account** at https://github.com/signup (skip if you have one).
2. **Create a repository.** Click **+** (top right) → **New repository**. Name: `leave-register`.
   Choose **Public**. Tick nothing else. Click **Create repository**.
3. **Upload the files.** On the new repository page click **uploading an existing file**.
   Unzip `leave-register-github.zip` on your computer, open the `leave-register` folder, select
   all the files inside it (not the folder itself) and drag them onto the page. Click **Commit changes**.
4. **Switch on Pages.** **Settings** → **Pages** (left menu). Under *Build and deployment*,
   Source: **Deploy from a branch**; Branch: **main**, folder **/ (root)** → **Save**.
5. **Wait 1–2 minutes**, refresh the Pages settings page and copy the address shown, e.g.
   `https://your-username.github.io/leave-register/`.
6. **Install on your phone.** Open the address in Chrome on Android. Tap **Restore from backup**
   to load your data. Then ⋮ menu → **Add to Home screen** (or **Install app**).

**Changing the app later:** open `index.html` on GitHub, click the pencil icon, edit, and commit.
Also open `sw.js` and change `VERSION` (for example `v2` → `v3`), otherwise installed phones keep
the old copy.

---

## Part 2 — Google Drive sync (optional, free)

Sync keeps your register the same on your phone and computer. Each person's data is stored in a
hidden app folder in **their own** Google Drive; only this app can see it.
Menu names in Google Cloud change from time to time — look for the closest match.

1. **Open Google Cloud.** Go to https://console.cloud.google.com and sign in with your Gmail.
   Accept the terms if asked. No payment details are needed.
2. **Create a project.** Project picker (top left) → **New project** → name `Leave Register` → **Create**.
   Make sure the new project is selected.
3. **Turn on the Drive API.** Search bar → **Google Drive API** → **Enable**.
4. **Set up the sign-in screen.** Menu → **Google Auth Platform** (older name: *OAuth consent screen*)
   → **Get started**. App name `Leave Register`, your email as support email → **Audience: External**
   → contact email → agree → **Create**.
5. **Add the people who will use it.** **Audience** → **Test users** → **Add users** → your Gmail and
   your friend's Gmail → **Save**. (While the app is in *Testing*, only these accounts can connect.)
6. **Allow the Drive app folder.** **Data access** → **Add or remove scopes** → find
   `.../auth/drive.appdata` (or paste `https://www.googleapis.com/auth/drive.appdata` in
   *Manually add scopes*) → **Update** → **Save**.
7. **Create the Client ID.** **Clients** → **Create client** → Application type **Web application**,
   name `Leave Register web`. Under **Authorized JavaScript origins** add
   `https://your-username.github.io` (no `/leave-register`, no slash at the end) → **Create**.
   Copy the **Client ID** (ends with `.apps.googleusercontent.com`).
8. **Put the Client ID in the app.** On GitHub open `index.html` → pencil icon → near the top find
   `const GOOGLE_CLIENT_ID = '';` and paste the ID between the quotes. Commit. Then change
   `VERSION` in `sw.js` and commit.
9. **Connect.** Open the app → **More** → **Google Drive sync** → **Connect Google Drive**.
   Google shows *"Google hasn't verified this app"* because it is in testing — tap **Continue**,
   then allow access. On your second device, tap **Get my data from Google Drive** on the first screen
   (or Connect in More).

**Everyday use:** Google sign-in lasts about an hour. When you open the app, tap the **Tap to sync**
button at the top once; after that your changes sync by themselves. If two devices are changed at
the same time, both changes are kept the next time each one syncs.

The Client ID is not a secret and is safe in a public repository.

---

## Your data

Data is saved in the browser on your phone and, if you connect it, in your own Google Drive.
Nothing is sent anywhere else. Clearing Chrome's site data or uninstalling the app deletes the copy
on that phone, so keep sync on or download a backup now and then.

## Rules

The rules are in the `RULES` block at the top of the script in `index.html`, based on the summary
*Various kinds of leave admissible to Tamil Nadu Government servants*. Holiday lists live in
`SEED_HOLIDAYS` and can also be edited inside the app. Rules change by Government Order:
**this is not an official tool, and your service register is the final word.**

Please do not commit personal backup files (`*-backup-*.json`) to the repository.

## Licence

MIT. See `LICENSE`.
