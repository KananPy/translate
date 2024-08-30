import React, { useEffect, useState } from 'react'
import LanguageSelector from './LanguageSelector'

function Translate() {
    const [inputText, setInputText] = useState('')
    const [fromLanguage, setFromLanguage] = useState('')
    const [toLanguage, setToLanguage] = useState('')
    const [translatedText, setTransLatedText] = useState('')


    const languages = [
        {code: 'en', name: 'English'},
        {code: 'az', name: 'Azerbaijani'},
        {code: 'ru', name: 'Russian'}
    ]

    useEffect(() => {
        const handleTranslateText = async () => {
            if (!inputText.trim()){
                setTransLatedText('')
                return
            }
            const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
            const options = {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': '41dbb30336msh2db66901b9b6cf7p18e44cjsnbe960d06d658',
                    'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: fromLanguage,
                    to: toLanguage,
                    text: inputText
                })
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok){
                    throw new Error('request olmur', response.status)
                }
                const result = await response.json();
                console.log('netice',result);
                setTransLatedText(result.trans)
            } catch (error) {
                console.error(error);
            }
        }
        handleTranslateText()
    }, [inputText,fromLanguage,toLanguage])


    console.log(translatedText);


  return (
    <div className='Translator'>
        <h1>Translate</h1>

        <textarea rows='4' cols='30' onChange={(e) => setInputText(e.target.value)}/>

        <LanguageSelector label='From' value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)} languages={languages}/>
        <LanguageSelector label='to' value={toLanguage} onChange={(e) => setToLanguage(e.target.value)} languages={languages}/>

        {translatedText && (

            <div>
                <h2>Translated text:</h2>
                <p>{translatedText}</p>
            </div>
        )}

    </div>
  )
}

export default Translate