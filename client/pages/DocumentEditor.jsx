import React, { useState } from "react";

const DocumentEditor = () => {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col h-full space-y-4">
      <h1 className="text-2xl font-bold">Document Editor</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-4 border rounded-lg resize-none bg-white shadow"
        placeholder="Start typing your document..."
      />
    </div>
  );
};

export default DocumentEditor;
