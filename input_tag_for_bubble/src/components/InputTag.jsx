import { useState, useRef } from "react";

const InputTag = () => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [suggestions] = useState([
    "React",
    "Next.js",
    "Tailwind",
    "JavaScript",
    "CSS",
  ]);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();

      addTag(inputValue);
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && tags.length) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const insertTag = (tag) => {
    addTag(tag);
    setInputValue("");
    inputRef.current.focus();
  };

  return (
    <div className="border border-gray-300 rounded-md p-2 max-w-xl mx-auto shadow-md">
      <div className="flex flex-wrap">
        {tags.map((tag, index) =>
          suggestions.includes(tag) ? (
            <span
              key={index}
              className="bg-indigo-200 text-indigo-800 rounded-full px-2 py-1 mr-2 flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 text-indigo-600 hover:text-indigo-800"
              >
                x
              </button>
            </span>
          ) : (
            <span key={index} className="mr-2 flex items-center">
              {tag}
            </span>
          )
        )}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type or select a tag..."
          className="border-none flex-grow outline-none"
        />
      </div>
      {inputValue && (
        <div className="border border-gray-300 mt-2 rounded-md bg-white">
          {suggestions
            .filter((suggestion) =>
              suggestion.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((suggestion, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => insertTag(suggestion)}
              >
                {suggestion}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default InputTag;
