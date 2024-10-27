import { useEffect, useState } from 'react';
import { reviewData } from './data';
import { quoteIcon, nextIcon, prevIcon } from './Icons';

function App() {
  const [peoples, setPeoples] = useState(reviewData);
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    index === 0 ? setIndex(peoples.length - 1) : setIndex((p) => p - 1)
  }
  const handleNext = () => {
    index === peoples.length - 1 ? setIndex(0) : setIndex((n) => n + 1)
  }

  useEffect(() => {
    let slider = setInterval(() => {
      index === peoples.length - 1 ? setIndex(0) : setIndex(index + 1)
    }, 2000)
    return () => clearInterval(slider)
  }, [index])

  return (
    <section className="section">
      <div className='title'>
        <h2><span>{index + 1}/</span>Reviews</h2>
      </div>
      <div className='section-center'>
        {peoples.map((people, peopleIndex) => {
          const { id, title, image, name, quote } = people;
          let position = 'nextSlide';
          if (peopleIndex === index) {
            position = "activeSlide"
          }
          if (peopleIndex === index - 1 || (index === 0 && peopleIndex === people.length - 1)) {
            position = "lastSlide"
          }
          return <article key={id} className={position}>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <h4>{title}</h4>
            <p>{quote}</p>
            {quoteIcon}
          </article>
        })}
      </div>
      <div className='button-control'>
        <button onClick={handlePrev} className='handle-btn'>{prevIcon}</button>
        <button onClick={handleNext} className='handle-btn'>{nextIcon}</button>
      </div>
    </section>
  );
}

export default App;
