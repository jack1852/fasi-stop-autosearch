# FASI Tariffario - Stop Auto Search

This userscript disables the **automatic search on keypress** in the [FASI tariffario page](https://www.fasi.it/tariffario/).  
With this script, the search is only executed when you **press Enter** or click on the **"Cerca"** button.

---

## 🔧 Features
- Prevents live/instant search while typing in the input box  
- Search triggers only on:
  - **Enter key** inside the input  
  - **Click** on the "Cerca" button  
- If the website replaces the search box dynamically (SPA behavior), the script automatically re-attaches  
- Lightweight and works seamlessly with Tampermonkey  

---

## 📦 Installation

1. Install a userscript manager:
   - [Tampermonkey for Chrome](https://tampermonkey.net/?ext=dhdg&browser=chrome)  
   - or [Tampermonkey for Firefox](https://tampermonkey.net/?ext=dhdg&browser=firefox)

2. Install this script by clicking:  
   👉 [**Install fasi-stop-autosearch.user.js**](https://raw.githubusercontent.com/jack1852/fasi-stop-autosearch/main/fasi-stop-autosearch.user.js)

3. Once installed, the script will run automatically on:  
   - `https://www.fasi.it/tariffario/`  
   - `https://www.fasi.it/tariffario/*`

---

## 📜 Metadata
The script includes auto-update support:

```js
// @updateURL    https://raw.githubusercontent.com/jack1852/fasi-stop-autosearch/main/fasi-stop-autosearch.user.js
// @downloadURL  https://raw.githubusercontent.com/jack1852/fasi-stop-autosearch/main/fasi-stop-autosearch.user.js
