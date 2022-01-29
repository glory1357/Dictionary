import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {fetchWord, wordClear} from '../../actions/index';
import Spinner from "../spinner/Spinner";
import Page404 from '../404/404';

import './resultPage.scss';

const ResultPage = () => {
    const {wordKey} = useParams();
    const dispatch = useDispatch();
    const {word, wordLoadingStatus, fetchingError} = useSelector(state => state);

    useEffect(() => {
        if(!word.word){
            dispatch(fetchWord(wordKey));
        }
    }, [wordKey]);

    if (wordLoadingStatus ) {
        return <Spinner/>;
    } 
    if (fetchingError) {
        return <Page404/>
    }
    return (
        <>
          {word.word ? <Content data={word} dispatch={dispatch}/> : null}
        </>
    )
}

const Content = ({data, dispatch}) => {
    const {word, phonetics, meanings} = data;

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
               <Link to={`/`} onClick={() => dispatch(wordClear())} className='button button__secondary_result'>
                            <div className="inner">На главную</div>
                        </Link>
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

// const setContent = (process, Component, data) => {
//     switch (process) {
//         case 'loading':
//             return <Spinner/>
//         case 'confirmed':
//             return <Component data={data}/>
//         case "error":
//             return <Page404/>
//         default:
//             return <Spinner/>
//     }
// }

export default ResultPage;