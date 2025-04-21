import React, { useEffect, useState } from "react";
import Editor from 'react-simple-wysiwyg';

// const sizeValues = ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"];
// const fontValues = ["Arial", "Georgia", "Tahoma", "Times New Roman", "Verdana", "Roboto", "Inter"];
// const headerValues = [false, 1, 2, 3, 4, 5];

const EditComponent = ({setHtmlData, value} : any) => {
    const [html, setHtml] = useState(value);
    useEffect(() => {
        setHtml(value);
    }, [value]);

    const onChange = (e: any) => {
        setHtml(e.target.value);
        setHtmlData(e.target.value);
    }

      return (
        <Editor value={html} onChange={onChange} />
    );
};
export default EditComponent;