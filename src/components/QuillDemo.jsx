import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['code-block']
  ],
};

const formats = [
  'header', 'font',
  'list', 'bullet',
  'bold', 'italic', 'underline',
  'color', 'background',
  'align',
  'code-block'
];

export const QuillDemo = () => {
  const [value, setValue] = useState('');

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
  };

  return (
    <div>
      <ReactQuill 
        value={value} 
        onChange={handleChange} 
        modules={modules}
        formats={formats}
      />
      <div style={{ marginTop: '20px' }}>
        <h3>Output:</h3>
        <pre style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: value }}></pre>
      </div>
    </div>
  );
}
