import React from 'react';

function Content( data, dispatch) {
  const { word, phonetics, meanings } = data;

  const contentPhonetics = phonetics.map(({ text, audio }, i) => (
    <div key={nanoid()}>
      <p>
        {i + 1}
        .
        {text}
      </p>
      {audio ? <audio src={audio} controls><track kind="captions" /></audio> : null}
    </div>
  ));

  const contentMeanings = meanings.map(({ partOfSpeech, definitions }) => {
    const {
      definition, example, synonyms, antonyms,
    } = definitions[0];
    return (
      <div key={nanoid()} className="meanings-wrapper-definitions">
        <h4>
          PartOfSpeech:
          <span>
            {partOfSpeech}
          </span>
        </h4>
        <h4>Definitions:</h4>
        {definition ? (
          <div>
            <h5>definition: </h5>
            <p>{definition}</p>
          </div>
        ) : null}
        {example ? (
          <div>
            <h5>example:</h5>
            <p>{example}</p>
          </div>
        ) : null}
        {synonyms.length > 0 ? (
          <div>
            <h5>synonyms:</h5>
            <ul>{synonyms.map((elem) => <li key={nanoid()}>{elem}</li>)}</ul>
          </div>
        ) : null}
        {antonyms.length > 0 ? (
          <div>
            <h5>antonyms:</h5>
            <ul>{antonyms.map((elem) => <li key={nanoid()}>{elem}</li>)}</ul>
          </div>
        ) : null}
      </div>
    );
  });

  return (
    <div>
      <Link to="/" onClick={() => dispatch(wordClear())} className="button button__secondary_result">
        <div className="inner">На главную</div>
      </Link>
      <h2>{word}</h2>
      <hr />
      <div className="phonetics">
        <h3>Phonetics:</h3>
        {contentPhonetics}
      </div>
      <hr />
      <div className="meanings">
        <h3>Meanings:</h3>
        <div className="meanings-wrapper">{contentMeanings}</div>
      </div>
    </div>
  );
}

export default Content;
