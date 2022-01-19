import axios from "axios";
import { useHttp } from "../hooks/http.hook";


const useWordService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'http://api.dictionaryapi.dev/api/v2/entries/en/';

    const getWord = async (name) => {
        setProcess('loading');
        const res = await request(`${_apiBase}${name}`);
        return res;
    }

    return {getWord,  
            process,
            setProcess,
            clearError }
}


export default useWordService;