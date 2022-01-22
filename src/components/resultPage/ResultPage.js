import { useParams } from "react-router";
import { useState, useEffect } from "react";
import useWordService from "../../services/WordService";
import Spinner from "../spinner/Spinner";
import Page404 from '../404/404';

import './resultPage.scss';

const ResultPage = () => {
    const {wordKey} = useParams();
    const [word, setWord] = useState(null);
    const {getWord, clearError, process, setProcess} = useWordService();
    console.log('f')
    useEffect(() => {
        console.log('fe')
        updateData()
    }, [wordKey])

    const updateData =  () => {
        clearError();
        getWord(wordKey).then(onDataLoaded);
    }
        
    const onDataLoaded = (data) => {
        setWord(data);
        setProcess('confirmed');
    }

    return (
        <>
          {setContent(process, Content, word)}
        </>
    )
}

const Content = ({data}) => {
    const {word, phonetics, meanings} = data[0];

    const contentPhonetics = phonetics.map(({text, audio}, i) => {
    return (<div key={i}><p>{++i}.{text}</p>
        {audio ? <audio src={audio} controls></audio>: null}</div>)});

    const contentMeanings = meanings.map(({partOfSpeech, definitions}, i) => {
        const {definition, example, synonyms, antonyms} = definitions[0];
        
        return (<div key={i} className="meanings-wrapper-definitions"><h4>PartOfSpeech: <span> {partOfSpeech}</span></h4>
            <h4>Definitions:</h4> 
            {definition ? <div><h5>definition: </h5><p>{definition}</p></div>  : null}
            {example ? <div><h5>example:</h5><p>{example}</p></div> : null}
            {synonyms.length>0 ? <div><h5>synonyms:</h5> <ul>{synonyms.map((elem, i) => <li key={i}>{elem}</li>)}</ul></div> : null}
            {antonyms.length>0 ? <div><h5>antonyms:</h5> <ul>{antonyms.map((elem, i) => <li key={i}>{elem}</li>)}</ul></div> : null}
            </div>)

    });

    return (
           <div>
               <h2>{word}</h2>
               <hr></hr>
               <div className="phonetics">
                    <h3>Phonetics:</h3>
                    {contentPhonetics}
               </div>
               <hr></hr>
               <div className="meanings">
                   <h3>Meanings:</h3>
                   <div className="meanings-wrapper">{contentMeanings}</div> 
               </div>
               
            </div>
    )
}

const setContent = (process, Component, data) => {
    switch (process) {
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component data={data}/>
        case "error":
            return <Page404/>
        default:
            return <Spinner/>
    }
}

export default ResultPage;