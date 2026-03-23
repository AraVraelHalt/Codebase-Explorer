# 💻 Codebase Explorer

Visualize your JavaScript and TypeScript codebases as interactive graphs, showing file dependencies, functions, and imports.

[![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 🚀 Features

- Visualize files as **draggable nodes** in a graph  
- Color-coded **imports and dependencies** with glowing directional edges
- **Sidebar file panel** with functions and imports details  
- Click sidebar file → highlights edges and expands info  
- Click graph node → highlights edges only  
- Supports `.js`, `.jsx`, `.ts`, `.tsx`, and `.zip` uploads  
- **Hierarchical layout** (top-to-bottom) via Dagre

---

## 🛠 Tech Stack

**Frontend:**  
- React + TypeScript  
- React Flow (graph rendering)  
- Dagre (automatic hierarchical layout)  

**File Handling:**  
- JSZip (ZIP extraction)  
- Custom parsing logic for functions and imports  

**Styling & UX:**  
- Dark theme with edge highlights
- Directional arrows between nodes
- Sidebar file expansion and toggles  
- Edge glow using dynamic styles and color-code 

---

## 📝 Usage

1. **Clone the repository**
```bash
git clone https://github.com/AraVraelHalt/Codebase-Explorer.git
cd codebase-explorer
```
2. **Install dependencies**
```bash
npm install
```
3. **Run the app**
```bash
npm start
```
4. **Open** *`http://localhost:3000`* in your browser.

---

## 📝 Upload and Explore

- Upload a `.zip` of your project or a single `.js` / `.ts` / `.jsx` / `.tsx` file.  
- Drag nodes in the graph to explore file dependencies visually.  
- **Sidebar file panel:**  
  - Click a file to expand its details (functions and imports)  
  - Highlights connected edges in the graph  
- **Graph nodes:**  
  - Click a node to highlight edges (to and from the node) 
  - Does **not** expand sidebar info, keeping exploration and inspection separate
  - Directional edges to better differentiate between imports and dependencies

---

## 🐛 Bugs & Issues

If you encounter bugs or unexpected behavior:

1. **Check existing issues** – see if your bug has already been reported in the [Issues](https://github.com/AraVraelHalt/Codebase-Explorer/issues) section.  
2. **Provide detailed information** – include:
   - Steps to reproduce the bug  
   - Expected behavior vs actual behavior  
   - Screenshots or console logs, if applicable  
   - Your environment (OS, Node.js version, dependencies)  
3. **Report a new issue** – if not already reported, create a new issue with all relevant details.  

We appreciate your help in improving this project! 🚀

