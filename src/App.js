import React, { useState, useEffect } from 'react';

function App() {
  // Define Nomi features, categorized and sorted alphabetically for consistent display.
  const nomiFeatures = {
    "Hair Color": [
      "ash blonde hair", "auburn hair", "black hair", "blond hair", "brown hair", "grey hair", "light blue eyes", "platinum hair", "red hair", "strawberry blonde hair", "white hair"
    ].sort(),
    "Hair Style": [
      "afro hair", "braid hair", "bun hair", "curly hair", "double braids", "long hair", "medium hair", "messy hair", "pixie cut hair", "short hair", "undercut hair"
    ].sort(),
    "Bangs": [
      "angled bangs", "asymmetrical bangs", "blunt bangs", "curtain bangs", "fringe bangs", "micro bangs", "side-swept bangs", "sweeping bangs", "textured bangs", "wispy bangs"
    ].sort(),
    "Eye Color": [
      "amber eyes", "blue eyes", "brown eyes", "dark brown eyes", "green eyes", "green-blue eyes", "grey eyes", "hazel eyes", "light blue eyes", "violet eyes"
    ].sort(),
    "Eye Shape": [
      "almond-shaped eyes", "close-set eyes", "deep-set eyes", "downturned eyes", "hooded eyes", "monolid eyes", "protruding eyes", "round eyes", "upturned eyes", "wide-set eyes"
    ].sort(),
    "Skin Color": [
      "alabaster skin", "black skin", "bronze skin", "ebony skin", "fair skin", "medium skin", "olive skin", "pale skin", "porcelain skin", "tan skin"
    ].sort(),
    "Nose": [
      "aquiline nose", "bulbous nose", "button nose", "delicate nose", "greek nose", "hooked nose", "roman nose", "small nose", "snub nose", "straight nose", "upturned nose"
    ].sort(),
    "Lips": [
      "bow-shaped lips", "cupid's bow lips", "full lips", "full lower lip", "heart-shaped lips", "narrow lips", "tapered lips", "thin lips", "thin upper lip", "wide lips"
    ].sort(),
    "Jaw": [
      "chiseled jaw", "pointed jaw", "prominent jaw", "rectangular jaw", "receding jaw", "rounded jaw", "soft jaw", "square jaw", "triangular jaw", "weak jaw"
    ].sort(),
    "Cheekbones": [
      "angular cheekbones", "broad cheekbones", "chubby cheeks", "defined cheekbones", "flat cheekbones", "high cheekbones", "low cheekbones", "rounded cheeks", "soft cheekbones", "subtle cheekbones"
    ].sort(),
    "Body": [
      "athletic body", "chubby body", "curvy body", "mom body", "muscular body", "obese body", "overweight body", "plump body", "skinny body", "slender body", "toned body"
    ].sort(),
    "Makeup": [
      "bold makeup", "dewy makeup", "dramatic makeup", "ethereal makeup", "futuristic makeup", "goth makeup", "minimalist makeup", "natural makeup", "neon makeup", "no makeup look", "vintage glamour makeup"
    ].sort(),
    "Piercings": [
      "daith piercing", "ear piercing", "eyebrow piercing", "helix piercing", "lip piercing", "navel piercing", "nose piercing", "septum piercing", "tongue piercing", "tragus piercing"
    ].sort(),
    "Aesthetic": [
      "bohemian aesthetic", "cottagecore aesthetic", "diva aesthetic", "edgy aesthetic", "elegant aesthetic", "goth aesthetic", "librarian aesthetic", "minimalist aesthetic", "outdoor aesthetic", "punk aesthetic", "sensual aesthetic"
    ].sort()
  };

  // State hook for managing dark mode preference.
  const [isDarkMode, setIsDarkMode] = useState(false);
  // State hook for storing the Nomi's custom name.
  const [nomiName, setNomiName] = useState('');
  // State hook for storing selected features, initialized with empty arrays for each category.
  const [selectedFeatures, setSelectedFeatures] = useState(() => {
    const initialSelections = {};
    Object.keys(nomiFeatures).forEach(category => {
      initialSelections[category] = []; // Each category can have multiple selections
    });
    return initialSelections;
  });

  // State hook for the generated Nomi description.
  const [nomiDescription, setNomiDescription] = useState('');
  // State hook for providing feedback on copy actions.
  const [copyFeedback, setCopyFeedback] = useState('');

  // Toggles the dark mode state.
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Handles changes to feature checkboxes, adding or removing features from the selected list.
  const handleFeatureChange = (category, feature) => {
    setSelectedFeatures(prev => {
      const currentSelections = prev[category];
      if (currentSelections.includes(feature)) {
        // If the feature is already selected, remove it.
        return {
          ...prev,
          [category]: currentSelections.filter(item => item !== feature)
        };
      } else {
        // If the feature is not selected, add it.
        return {
          ...prev,
          [category]: [...currentSelections, feature]
        };
      }
    });
  };

  // Clears all selected features, Nomi name, and generated description.
  const clearSelections = () => {
    const clearedSelections = {};
    Object.keys(nomiFeatures).forEach(category => {
      clearedSelections[category] = [];
    });
    setSelectedFeatures(clearedSelections);
    setNomiName('');
    setNomiDescription('');
    setCopyFeedback(''); // Also clear any copy feedback message.
  };

  // Generates a descriptive string based on the Nomi's name and selected features.
  const generateDescription = () => {
    let allSelectedValues = [];
    // Concatenate all selected features from different categories into a single array.
    Object.values(selectedFeatures).forEach(featuresArray => {
      allSelectedValues = allSelectedValues.concat(featuresArray);
    });

    // Provide a message if no name is entered and no features are selected.
    if (allSelectedValues.length === 0 && nomiName.trim() === '') {
      setNomiDescription("Please enter a Nomi name or select at least one feature.");
      return;
    }

    let description = '';
    // Start the description with the Nomi's name if provided, otherwise a generic phrase.
    if (nomiName.trim() !== '') {
      description += `${nomiName.trim()} has `;
    } else {
      description += `Your Nomi has `;
    }

    // Append the selected features, or indicate if none were selected.
    if (allSelectedValues.length > 0) {
      description += allSelectedValues.join(', ');
    } else {
      description += 'no features selected.';
    }

    setNomiDescription(description + '.');
    setCopyFeedback(''); // Clear copy feedback when a new description is generated.
  };

  // Copies the generated description to the user's clipboard.
  const copyDescriptionToClipboard = () => {
    if (nomiDescription) {
      // Create a temporary textarea element to programmatically copy text.
      const textarea = document.createElement('textarea');
      textarea.value = nomiDescription;
      document.body.appendChild(textarea);
      textarea.select(); // Select the text in the textarea.
      try {
        // Execute the copy command.
        document.execCommand('copy');
        setCopyFeedback('Copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text: ', err);
        setCopyFeedback('Failed to copy.');
      }
      document.body.removeChild(textarea); // Clean up the temporary textarea.

      // Clear the feedback message after 3 seconds.
      setTimeout(() => {
        setCopyFeedback('');
      }, 3000);
    } else {
      setCopyFeedback('No description to copy!');
      // Clear the feedback message after 3 seconds even if nothing was copied.
      setTimeout(() => {
        setCopyFeedback('');
      }, 3000);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 sm:p-6 font-inter transition-colors duration-300
      ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black text-gray-100' : 'bg-gradient-to-br from-purple-50 to-pink-100 text-gray-800'}`}>
      {/* External script for Tailwind CSS and Google Fonts for 'Inter' font. */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

      <div className={`w-full max-w-3xl rounded-2xl shadow-xl p-6 sm:p-8 transition-colors duration-300
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-8">
          {/* Application Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-600">
            Nomi.ai Appearance Shared Note Tool
          </h1>
          <div className="flex items-center space-x-4">
            {/* "Made by spacegoblins" Button (Envelope Emoji) */}
            <a
              href="https://discordapp.com/users/119304362580377601"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full shadow-md transition duration-200 ease-in-out text-2xl
                ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
              title="Made by spacegoblins" // Tooltip for accessibility and clarity
            >
              ✉️
            </a>
            {/* Dark/Light Mode Toggle Switch */}
            <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="theme-toggle"
                  className="sr-only" /* Visually hides the checkbox, but keeps it accessible */
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                {/* Visual track for the toggle switch */}
                <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
                {/* Visual thumb/dot for the toggle switch */}
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow-md transition-transform duration-300
                  ${isDarkMode ? 'translate-x-full' : ''}`}></div>
              </div>
              {/* Text label for the toggle switch */}
              <div className={`ml-3 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </div>
            </label>
          </div>
        </div>

        {/* Introductory paragraph */}
        <p className={`text-center mb-8 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Name your Nomi and select multiple features to generate a descriptive tag list!
        </p>

        {/* Nomi Name Input Section */}
        <div className={`mb-8 p-6 rounded-xl shadow-inner transition-colors duration-300
          ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>Nomi Name</h2>
          <input
            type="text"
            className={`w-full p-3.5 border-2 rounded-lg focus:ring-4 focus:ring-purple-400 focus:border-purple-500 outline-none transition duration-200 text-lg
              ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
            placeholder="Enter Nomi's name (e.g., 'Bob')"
            value={nomiName}
            onChange={(e) => setNomiName(e.target.value)}
          />
        </div>

        {/* Nomi Features Selection Sections */}
        <div className="space-y-8 mb-8">
          {/* Iterate over each category of Nomi features */}
          {Object.entries(nomiFeatures).map(([category, features]) => (
            <div key={category} className={`p-6 rounded-xl shadow-inner transition-colors duration-300
              ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>{category}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Render checkboxes for each feature within the current category */}
                {features.map(feature => (
                  <label key={feature} className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg transition-colors duration-150 ease-in-out
                    ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-purple-50'}`}>
                    <input
                      type="checkbox"
                      name={category}
                      value={feature}
                      checked={selectedFeatures[category].includes(feature)}
                      onChange={() => handleFeatureChange(category, feature)}
                      className={`form-checkbox h-5 w-5 text-purple-600 focus:ring-purple-500 rounded transition-colors duration-150
                        ${isDarkMode ? 'bg-gray-500 border-gray-400 checked:bg-purple-500' : 'bg-white border-gray-300 checked:bg-purple-600'}`}
                    />
                    {/* Display the feature name, capitalizing each word for better readability */}
                    <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-base font-medium`}>
                      {feature.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Generate Description Button */}
        <div className="text-center mb-8">
          <button
            onClick={generateDescription}
            className="px-10 py-4 bg-purple-600 text-white font-extrabold rounded-xl shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105 text-xl tracking-wide"
          >
            Generate Nomi Description
          </button>
        </div>

        {/* Action Buttons - Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          {/* Copy Description Button */}
          <button
            onClick={copyDescriptionToClipboard}
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            Copy Description
          </button>
          {/* Clear All Selections Button */}
          <button
            onClick={clearSelections}
            className={`px-8 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out
              ${isDarkMode ? 'bg-gray-600 text-gray-100 hover:bg-gray-500 focus:ring-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400'}`}
          >
            Clear All Selections
          </button>
        </div>

        {/* Display Generated Description and Copy Feedback */}
        {nomiDescription && (
          <div className={`mt-8 p-6 rounded-xl shadow-lg transition-colors duration-300
            ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-purple-50 border border-purple-200'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-purple-700'}`}>Generated Description:</h2>
            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {nomiDescription}
            </p>
            {copyFeedback && (
              <p className={`mt-2 text-sm font-medium ${copyFeedback.includes('Copied') ? 'text-green-500' : 'text-red-500'}`}>
                {copyFeedback}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
