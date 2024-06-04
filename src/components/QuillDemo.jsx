import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit, setValue: setFormValue } = useForm();
  const [questions, setQuestion] = useState([]);

  const handleChange = (content) => {
    setValue(content);
    setFormValue('question', content); // Update the form value
  };

  const getQuestion = async () => {
    try {
      const res = await axios.get("http://localhost:3001/question/get");
      console.log(res)
      
      setQuestion(res.data);
        // setValue(res.data.question);
        // setFormValue('question', res.data.question);
      
    } catch (error) {
      console.error("Error getting the question:", error);
    }
  };

  


  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3001/question/create", data);
      console.log(res);
    } catch (error) {
      console.error("Error submitting the question:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ReactQuill 
          value={value} 
          onChange={handleChange} 
          modules={modules}
          formats={formats}
        />
        <input type="hidden" {...register('question')} value={value} />
        <div style={{ marginTop: '20px' }}>
          <button type="submit">Submit Question</button>
        </div>
      </form>

      <button onClick={()=>{getQuestion()}}>Display Question</button>
      <div style={{ marginTop: '20px' }}>
        <h3>Output:</h3>
        {
          questions?.map((question, index) => (
            <div key={index}>
              <h4>Question {index + 1}:</h4>
              <pre style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: question.question }}></pre>
            </div>
          ))
        
        }
        {/* <pre style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: value }}></pre> */}
      </div>
    </div>
  );
};

export default QuillDemo;
