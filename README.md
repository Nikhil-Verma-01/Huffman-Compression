# Huffman Text Compressor 

This is a web-based **Huffman Text Compressor** built using **React**. It demonstrates the **Huffman Coding** algorithm for **lossless data compression**, allowing users to:
- Compress & decompress text
- Visualize generated Huffman codes
- Analyze compression efficiency

---

## ✨ Features
- **Text Compression:** Compress text using Huffman coding.
- **Text Decompression:** Decode Huffman-encoded bitstrings back to the original text.
- **Compression Metrics:** Displays original & compressed size (in bits) with compression ratio.
- **Huffman Codes Visualization:** Shows unique codes generated for each character.
- **Interactive UI:** Built with React + styled with Tailwind CSS.
- **DSA Demonstration:** Great showcase of Huffman Algorithm from Data Structures & Algorithms.

---

## ⚙️ How It Works (Huffman Algorithm)
1. **Frequency Analysis:** Calculate character frequencies.
2. **Build Huffman Tree:**  
   - Each character becomes a node weighted by frequency.  
   - Use a min-priority queue to merge the two least-frequent nodes until one remains.
3. **Generate Codes:** Traverse tree, assigning `'0'` for left and `'1'` for right to create codes.
4. **Encoding:** Replace characters with their Huffman codes.
5. **Decoding:** Traverse tree based on bits to retrieve original text.

---

## 🛠️ Technologies Used
- **React:** UI Framework
- **JavaScript (ES6+):** Algorithm & app logic
- **Tailwind CSS:** UI Styling (via CDN)

---

## 📺 Live Demo
```html
<video controls autoplay loop muted width="100%">
  <source src="https://drive.google.com/file/d/1qsGryRH_pDgMMQYiX5KNJhH1p7OUXQq5/view" type="video/mp4">
  Your browser does not support the video tag. See the [live demo here]https://huffman-compression-ten.vercel.app
</video>
```



## Get Started
To run this project locally, follow these steps:

### Prerequities
- Node.js (LTS version recommended)
- npm or Yarn

### Installation
1. **Clone the respository:**
```bash
git clone https://github.com/Nikhil-Verma-01/Huffman-Compression.git
cd huffman-compression-app
```

2. **Install dependenices:**
```bash
npm install react react-dom # If you're building from scratch and didn't use create-react-app
# If using create-react-app, these are included.
```
Note: Tailwind CSS is included via CDN in ``html public/index.html`` for simplicity in this demo, so no separate npm ``html install tailwindcss`` is required for basic functionality.

3. **Place the code:**
The entire application's React code is consolidated into a single ``html App.js `` file for ease of demonstration in environments that struggle with module imports.

- Create a standard Create React App project:
```bash
npx create-react-app huffman-compressor-react
cd huffman-compressor-react
```

- Replace the content of ``html src/App.js `` with the provided consolidated ``html App.js`` code.

- Ensure your ``html public/index.html`` has the Tailwind CSS CDN link in its <head> section:
```bash
<!-- In public/index.html <head> tag -->
<script src="https://cdn.tailwindcss.com"></script>
```

## Running the Application
1. **Start the development server:**
```bash
npm start
```
2. Open your web browser and navigate to ``html http://localhost:3000`` (or the port indicated in your terminal).

## Usage
1. **Enter Text**: Type or paste any text into the large text area.
2. **Compress:** Click the "Compress Text" button.
    - The "Compressed Output (Bits)" will appear, showing the binary representation.
    - "Original Size" and "Compressed Size" (in bits) will be displayed, along with the "Compression Ratio".
    - The "Huffman Codes Table" will show the unique binary code generated for each character.
3. **Decompress:** Click the "Decompress Text" button.
    - The "Decompressed Output" area will display the original text, verifying the lossless compression.


## Project Sturcture(Conceputal for larger apps)
While this demo consolidates code into ``html App.js`` for ease of use in certain environments, a larger, production-ready application would typically follow a modular structure like:

```bash
huffman-compressor/
├── public/
│   └── index.html
├── src/
│   ├── components/         # Reusable UI components (e.g., HuffmanForm.jsx, ResultDisplay.jsx)
│   ├── lib/                # Core algorithm logic (e.g., huffman.js)
│   ├── App.js              # Main application orchestrator
│   └── index.js            # React app entry point
└── package.json
└── README.md
```

This project effectively demonstrates strong Data Structures and Algorithms skills, particularly in tree traversal and priority queues, combined with practical web development for an interactive showcase.