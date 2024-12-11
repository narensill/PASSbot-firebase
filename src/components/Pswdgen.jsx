import React, { useState } from "react";

const RandomPasswordGenerator = ({ onGenerate }) => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = () => {
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characterPool = "";
    if (includeUppercase) characterPool += upperCase;
    if (includeLowercase) characterPool += lowerCase;
    if (includeNumbers) characterPool += numbers;
    if (includeSymbols) characterPool += symbols;

    if (characterPool === "") {
      alert("Please select at least one character type.");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }

    setGeneratedPassword(password);
    if (onGenerate) {
      onGenerate(password); // Callback for parent component
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg bg-sky-100">
      <h2 className="text-xl font-bold text-blue-700 mb-2">Generate Password</h2>
      <div className="flex flex-col gap-2 w-full">
        <div>
          <label className="text-sm text-blue-900">Password Length:</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="rounded-lg border border-sky-700 w-full text-black p-2"
            min="4"
            max="64"
          />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Include Uppercase Letters
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            Include Lowercase Letters
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Include Numbers
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Include Symbols
          </label>
        </div>
      </div>
      <button
        onClick={generatePassword}
        className="text-black bg-sky-200 mt-4 px-4 py-2 rounded-lg hover:bg-blue-300 transition-transform transform hover:scale-105"
      >
        Generate Password
      </button>
      {generatedPassword && (
        <div className="mt-4">
          <label className="text-sm text-blue-900">Generated Password:</label>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={generatedPassword}
              readOnly
              className="rounded-lg border border-sky-700 w-full text-black p-2"
            />
            <button
              onClick={() => navigator.clipboard.writeText(generatedPassword)}
              className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomPasswordGenerator;
