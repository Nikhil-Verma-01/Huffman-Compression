import React, { useState, useMemo } from "react";

class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

//Function to build frequency table from text
const buildFrequencyTable = (text) => {
  const freqTable = new Map();
  for(const char of text) {
    freqTable.set(char, (freqTable.get(char) || 0) + 1);
  }
  return freqTable;
};

const buildHuffmanTree = (freqTable) => {
  let nodes = Array.from(freqTable.entries()).map(([char, freq]) => new HuffmanNode(char, freq));
  
  nodes.sort((a, b) => a.freq - b.freq);

  while(nodes.length > 1){
    const left = nodes.shift(); //Smallest frequency
    const right = nodes.shift();

    const parent = new HuffmanNode(null, left.freq + right.freq, left, right);

    //** Insert the new parent node back into the array, maintaining sorted order
    let inserted = false;
    for(let i = 0; i < nodes.length; i++){
      if(parent.freq < nodes[i].freq){
        nodes.splice(i, 0, parent);
        inserted = true;
        break;
      }
    }
    if(!inserted){
      nodes.push(parent);
    }
  }

  return nodes[0];
}

const buildHuffmanCodes = (node, currentCode = '', codes = {}) => {
  //! Base case : if it's a leaf node, assign the code
  if(node.char !== null){
    codes[node.char] = currentCode;
    return codes;
  }

  //Recursive calls for left and right children
  if(node.left){
    buildHuffmanCodes(node.left, currentCode + '0', codes);
  }
  if(node.right){
    buildHuffmanCodes(node.right, currentCode + '1', codes);
  }
  return codes;

};


//? Encoder functions: functions to encodes text using Huffman codes
const encodeText = (text, codes) => {
  if(!text) return '';
  let encoded = '';
  for(const char of text){
    if(codes[char] === undefined){
      console.warn(`Character ${char} not found in Huffman codes. This should not happen with valid input. `);
      return null;
    }
    encoded += codes[char];

  }
  return encoded;
};

const decodedText = (encodeText, huffmanTreeRoot) => {
  if(!encodeText || !huffmanTreeRoot) return '';
  let decoded = '';
  let currentNode = huffmanTreeRoot;
  
  for(const bit of encodeText){
    if(bit === '0'){
      currentNode = currentNode.left;
    } else if (bit === '1'){
      currentNode = currentNode.right;
    }

    if(currentNode && currentNode.char !== null){
      decoded += currentNode.char;
      currentNode = huffmanTreeRoot;
    } else if(!currentNode){
      console.error("Invalid path in Huffman tree during decoding, Malformed input or tree.");
      return null; //Indicate decoding failure
    }
  }
  //** Final Check: ensure we ended on a leaf for complete decoding
  if(currentNode.char === null && encodeText.length > 0){
    console.warn("Decoding ended prematurely, last bits did not form a complete character.");
  }
  return decoded;

}
  const HuffmanForm = ({inputText, setInputText, handleCompress, handleDecompress}) => {
    return(
      <>
        <div className="mb-6">
          <label htmlFor="inputText" className="block text-gray-700 text-sm font-bold mb-2">
            Enter Text to Compress
          </label>
          <textarea
            id="inputText"
            className="shadow appearance-none border rounded-md w-full px-3 py-2 text-gray-700"
            placeholder="Type or paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <button onClick={handleCompress}
          className="border bg-purple-500 hover:bg-purple-700 text-white rounded-md object-contain py-1 px-2">
            Compress Text
          </button>
          <button onClick={handleDecompress}
            className="border bg-teal-500 hover:bg-teal-700 text-white rounded-md object-contain py-1 px-2"
          >
            Decompress Text
          </button>
        </div>
      </>
    );
  };

  const CodeTable = ({huffmanCodesTable}) => {
    return(
      <>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Huffman Code Table</h2>
      <div className="bg-gray-100 p-3 rounded-md shadow-inner overflow-y-auto max-h-40">
        {huffmanCodesTable && huffmanCodesTable.length > 0 ? (
          <table className="min-w-full text-sm font-mono">
            <thead>
              <tr>
                <th className="py-1 px-2 text-left">Char</th>
                <th className="py-1 px-2 text-left">Code</th>
              </tr>
            </thead>
            <tbody>
              {huffmanCodesTable.map((entry, index) => (
                <tr>
                  <td className="py-1 px-2">
                    {entry.char === '\n' ? '\\n' :  entry.char === ' ' ? '[space]' : entry.char }
                  </td>
                  <td className="py-1 px-2">{entry.code || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ): (
          <p className="text-gray-500">No Code generated yet.</p>
        )}
      </div>

      </>
    );
  };

  const ResultDisplay = ({compressedBits, originalSizeBits, compressedSizeBits, compressionRatio, huffmanCodesTable}) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Compressed Output (Bits):</h2>
          <div className="bg-gray-100 p-3 rounded-md shadow-inner overflow-x-auto text-sm font-mono break-all max-h-40">
            {compressedBits}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Original Size: **{originalSizeBits} bits**
          </p>
          <p className="text-sm text-gray-600">
            Compressed Size: **{compressedSizeBits} bits**
          </p>
          <p className="text-lg font-bold text-teal-600 mt-2">
            Compression Ratio: **{compressionRatio.toFixed(2)}%**
          </p>

        </div>
        <div>
          <CodeTable huffmanCodesTable={huffmanCodesTable}/>
        </div>
      </div>
    );
  };

  const DecompressedOutput = ({decompressedText}) => {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Decompressed Output:</h2>
        <div className="bg-blue-50 p-3 rounded-md shadow-inner overflow-y-auto max-h-48 text-gray-800 whitespace-pre-wrap">
          {decompressedText}
        </div>
      </div>
    )
  }

const App = () => {
  const [inputText, setInputText] = useState('');
  const [compressedBits, setCompressedBits] = useState('');
  const [decompressedText, setDecompressedText] = useState('');
  const [huffmanCodesTable, setHuffmanCodesTable] = useState(null);
  const [error, setError] = useState('');
  const [originalSizeBits, setOriginalSizeBits] = useState(0);
  const [compressedSizeBits, setCompressedSizeBits] = useState(0);
  const [huffmanTreeRoot, setHuffmanTreeRoot] = useState(null);

  const compressionRatio = useMemo(() => {
    if(originalSizeBits === 0 || compressedSizeBits === 0){
      return 0;
    }
    return (1 - (compressedSizeBits / originalSizeBits)) * 100;
  }, [originalSizeBits, compressedSizeBits]);

  const handleCompress = () => {
    setError('');
    setCompressedBits('');
    setDecompressedText('');
    setHuffmanCodesTable(null);
    setOriginalSizeBits(0);
    setCompressedSizeBits(0);
    setHuffmanTreeRoot(null);

    if(!inputText.trim()){
      setError('Please enter some text to compress.');
      return;
    }

    try {
      const freqTable = buildFrequencyTable(inputText);
      if(freqTable.size === 0){
        setError('Cannot compress empty or whitespace-only text.');
        return;
      }

      let currentHuffmanTreeRoot;
      let currentCodes;
      let encoded;

      //Special case for single character input
      if(freqTable.size === 1){
        const char = freqTable.keys().next().value;
        currentCodes = { [char]: '0'};
        encoded = '0'.repeat(inputText.length);
        currentHuffmanTreeRoot = new HuffmanNode(char, freqTable.get(char));

      } else {
        currentHuffmanTreeRoot = buildHuffmanTree(freqTable);
        currentCodes = buildHuffmanCodes(currentHuffmanTreeRoot);
        encoded = encodeText(inputText, currentCodes);
      }

      if(encoded === null){
        setError("Error during encoding. Check console for details.");
        return;
      }

      setHuffmanCodesTable(Object.entries(currentCodes).map(([char, code]) => ({char, code})));
      setCompressedBits(encoded);
      setOriginalSizeBits(inputText.length * 8);
      setCompressedSizeBits(encoded.length);
      setHuffmanTreeRoot(currentHuffmanTreeRoot);

    } catch (error) {
      setError(`Decompression failed: ${error.message}`);
      console.error("Decompression error:", error);
    }
  };

  const handleDecompress = () => {
    setError('');
    setDecompressedText('');

    if(!compressedBits.trim()){
      setError('No compressed data to decompress. Please compress text first.');
      return;
    }

    if(!huffmanTreeRoot){
      setError('Huffman tree not found. Please compress text first to generate the tree.');
      return;
    }

    try {
      const decoded = decodedText(compressedBits, huffmanTreeRoot);

      if(decoded === null){
        setError("Error during decoding. Check console for details.");
        return;
      }

      setDecompressedText(decoded);

    } catch (error) {
      setError(`Decompression failed: ${error.message}`);
      console.error("Decompresssion error:", error);
    } 

  };
  
  return (
    <div className="p-4 md:p-8 flex flex-col items-center min-h-screen bg-gray-100 font-inter">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Huffman Text Compressor</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
            <p className="font-bold">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <HuffmanForm
          inputText={inputText}
          setInputText={setInputText}
          handleCompress={handleCompress}
          handleDecompress={handleDecompress}
        />

        {compressedBits && (
          <ResultDisplay
            compressedBits={compressedBits}
            originalSizeBits={originalSizeBits}
            compressedSizeBits={compressedSizeBits}
            compressionRatio={compressionRatio}
            huffmanCodesTable={huffmanCodesTable}
          />
        )}

        {decompressedText && (
          <DecompressedOutput
            decompressedText={decompressedText}
          />
        )}
      </div>
    </div>
  )
}

export default App;