import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img style={{display: 'block', width: '400px', height: "400px", objectFit: 'contain', margin: "0 auto"}} 
        src={img} alt="Error"/>
    )
}

export default ErrorMessage;