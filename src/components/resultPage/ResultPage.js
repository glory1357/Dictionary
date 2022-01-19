import { useParams } from "react-router";
import { useState, useEffect } from "react";
import useWordService from "../../services/WordService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const ResultPage = () => {
    const {wordKey} = useParams();
    const [word, setWord] = useState(null);
    const {getWord, clearError, process, setProcess} = useWordService();

    // updateData();

    useEffect(() => {
        updateData()
    }, [wordKey])

    const updateData =  () => {
        // clearError();
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
    return (
           <div className="single-comic">
               <h2>{data[0].word}</h2>
            </div>
    )
}

const setContent = (process,Component, data) => {
    switch (process) {
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component data={data}/>
        case "error":
            return <ErrorMessage/>
        default:
            return <ErrorMessage/>
    }
}

export default ResultPage;