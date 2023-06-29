import React, { useState } from 'react';
const { Configuration, OpenAIApi } = require("openai");

export default function TextBox() {
    // State for input text
    const [text, setText] = useState("");
    const [rep, setRep] = useState("Simplified text...");
    const [terms, setTerms] = useState([])
    const [grade, setSelectedOption] = useState('1');


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
                    { role: "user", content: `Please change the following text into a version that a ${grade}th grader can understand and put them in bullet points by topics that have proper newline for each bullet points:\n ${text} \n` },
                ],
            });
            setRep(chatCompletion.data.choices[0].message.content);
            const termDefiniton = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: `${chatCompletion.data.choices[0].message.content} \n Can you also list the terms (along with their definitions) from the above excerpt that might be hard to understand for grade ${grade} students in a JSON-formatted response so that I can parse this response and put it in a JSON object in Javascript with the key of each entry being the term and the value being its definition? ` }
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

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);

    }


    return (
        <div className='grid grid-cols-2 gap-4 p-8'>
            <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                rows={15}
                cols={50}
                className='bg-gray-200 p-8 rounded-md'
            />


            <textarea
                className='bg-gray-200 p-8 rounded-md'
                style={{ whiteSpace: 'pre-line' }}
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
            <textarea
                className='bg-gray-200 p-8 rounded-md'
                
                readOnly
                value={terms.map((entry) => {
                    return `- ${entry[0]}: ${entry[1]}\n`
                })}
            />
            


        </div>

    )
}