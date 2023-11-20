import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
const MyCKEditor = ({ content, setContent, variant }) => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };
  useEffect(() => {
    if (content?.length === 0) setContent("");
  }, []);
  return (
    <div>
      <CKEditor editor={ClassicEditor} data={content} onChange={handleEditorChange} />
    </div>
  );
};

export default MyCKEditor;
