import React, { useState } from 'react';
import TermsPopUp from './TermsPopUp';
const { Configuration, OpenAIApi } = require("openai");


export default function TextBox() {
    // State for input text
    const [text, setText] = useState("");
    const [rep, setRep] = useState("Simplified text...");
    const [terms, setTerms] = useState([])
    const [grade, setSelectedOption] = useState('1');
    const [isTermsVisible, setVisibility] = useState(false);


    // OpenAI configuration and models

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    // Function to generate response on click
    const handleConfirm = async (e) => {
        e.preventDefault();
        console.log(grade);
        try {
            const chatCompletion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: `Please change the following text into a version that a ${grade}th grader can understand. Ensure the same formatting as the original input with proper newlines added:\n ${text} \n` },
                ],
            });
            setRep(chatCompletion.data.choices[0].message.content);
            const termDefiniton = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: `${chatCompletion.data.choices[0].message.content} \n Can you also list the terms (along with their definitions that a grade ${grade} student can understand) from the above excerpt that might be hard to understand for grade ${grade} students in a JSON-formatted response so that I can parse this response and put it in a JSON object in Javascript with the key of each entry being the term and the value being its definition? Make sure the definition is explained in terms that a ${grade}th grader would understand.` }
                ]
            })
            setTerms(Object.entries(JSON.parse(termDefiniton.data.choices[0].message.content)));
            console.log(Object.entries(JSON.parse(termDefiniton.data.choices[0].message.content)));
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
        }
    }

    // Drop down menu

    const renderOptions = () => {
        const options = [];

        for (let i = 1; i <= 12; i++) {
            options.push(
                <option key={i} value={i}>
                    {`Grade ${i}`}
                </option>
            );
        }

        return options;
    };

    // Toggle on
    const handleOpen = () => {
        setVisibility(true);
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);

    }


    return (
        <div className='grid grid-cols-2 gap-4 p-8 mt-2'>
            { isTermsVisible && <TermsPopUp handleClose={() => setVisibility(false)} terms={terms} />}
            <textarea
                value={text}
                onChange={(event) => setText((event.target.value))}
                rows={15}
                cols={50}
                className='bg-gray-200 p-8 rounded-md'
                style={{ resize: 'none' }}
            />


            <textarea
                className='bg-gray-200 p-8 rounded-md'
                style={{ whiteSpace: 'pre-line', resize: 'none' }}
                readOnly
                value={rep}
            />
            <div className='grid grid-cols-2 gap-4 p-8'>
                <select
                    value={grade}
                    onChange={handleOptionChange}
                    className='bg-gray-200 border rounded-sm'
                >
                    {renderOptions()}
                </select>

                <button
                    className='bg-gray-200 border rounded-sm'
                    onClick={handleConfirm}
                >
                    Confirm
                </button>
            </div>
            <button
                type='button'
                onClick={handleOpen}
            >
                Definitions    
            </button>
            


        </div>

    )
}