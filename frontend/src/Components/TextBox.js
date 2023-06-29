import React, { useRef, useState, useEffect, useContext } from 'react';
const { Configuration, OpenAIApi } = require("openai");

export default function TextBox() {
    // State for input text
    const [text, setText] = useState("1");
    const [rep, setRep] = useState("This is line 1.\nThis is line 2.");
    const [grade, setSelectedOption] = useState('');


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
                    { role: "user", content: `Please change the following text into a version that a ${grade}th grader can understand and put them in bullet points by topics that have proper newline for each bullet points:\n ${text} \n Can you also list the terms from your previous response that might be hard to understand for grade ${grade} students and give those terms their definitions?` }
                ],
            });
            console.log(chatCompletion)
            setRep(chatCompletion.data.choices[0].message.content);
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
    const options = renderOptions();

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
                className='bg-gray-200 p-8'
            />


            <textarea
                className='bg-gray-200 p-8 container mx-auto h-150 overflow-y-scroll'
                style={{ whiteSpace: 'pre-line' }}
                readOnly
                value={rep}
            />
            <select value={grade} onChange={handleOptionChange}>
                {renderOptions()}
            </select>

            <button onClick={handleConfirm}>Confirm</button>

        </div>

    )
}