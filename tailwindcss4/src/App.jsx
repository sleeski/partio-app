import { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import './index.css';
import questions from './data/questions';
import { calculateResults } from './data/results';

function App() {
  const [currentCategory, setCurrentCategory] = useState(-1); // Tracks current category index (-1 for landing page)
  const [currentQuestion, setCurrentQuestion] = useState(-1); // Tracks question index within category
  const [displayCategory, setDisplayCategory] = useState(-1); // Tracks displayed category
  const [displayQuestion, setDisplayQuestion] = useState(-1); // Tracks displayed question or category intro
  const [isFading, setIsFading] = useState(false); // Tracks fade state
  const [answers, setAnswers] = useState({});

  // Flatten questions for results calculation
  const flatQuestions = questions.flatMap((category, catIndex) =>
    category.questions.map((question, qIndex) => ({
      ...question,
      id: `category${catIndex}_question${qIndex}`
    }))
  );

  // Ordinal prefixes for category titles
  const ordinalPrefixes = ['Ensimmäinen', 'Toinen', 'Kolmas', 'Neljäs', 'Viides', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setIsFading(true);
    // Move to next question or category
    const currentCategoryQuestions = questions[currentCategory].questions;
    if (currentQuestion + 1 < currentCategoryQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentCategory + 1 < questions.length) {
      setCurrentCategory(prev => prev + 1);
      setCurrentQuestion(-1); // Start with category intro
    } else {
      setCurrentCategory(questions.length); // Move to results
      setCurrentQuestion(-1);
    }
  };

  const startTest = () => {
    setIsFading(true);
    setCurrentCategory(0);
    setCurrentQuestion(-1); // Start with first category intro
  };

  const goBack = () => {
    setIsFading(true);
    if (currentQuestion > -1) {
      setCurrentQuestion(prev => prev - 1); // Go back to previous question or category intro
    } else if (currentCategory > 0) {
      setCurrentCategory(prev => prev - 1);
      setCurrentQuestion(questions[prev - 1].questions.length - 1); // Last question of previous category
    } else {
      setCurrentCategory(-1); // Back to landing page
      setCurrentQuestion(-1);
    }
  };

  const continueToQuestions = () => {
    setIsFading(true);
    setCurrentQuestion(0); // Start first question of current category
  };

  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => {
        setDisplayCategory(currentCategory);
        setDisplayQuestion(currentQuestion);
        setIsFading(false);
      }, 500); // Match transition duration in CSS
      return () => clearTimeout(timer);
    } else {
      setDisplayCategory(currentCategory);
      setDisplayQuestion(currentQuestion);
    }
  }, [currentCategory, currentQuestion, isFading]);

  // Scroll to top when reaching the results page
  useEffect(() => {
    if (displayCategory >= questions.length) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [displayCategory]);

  // Prepare data for Nivo bar chart
  const getChartData = () => {
    const result = calculateResults(answers, flatQuestions);
    return Object.entries(result.stats)
      .filter(([stat, value]) => result.maxPoints[stat] > 0)
      .map(([stat, value]) => ({
        stat: stat.charAt(0).toUpperCase() + stat.slice(1),
        value
      }));
  };

  return (
    <div className={displayCategory >= questions.length ? "min-h-screen bg-base-200 flex justify-center p-4" : "h-screen w-screen bg-base-200 flex items-center justify-center p-4"}>
      <div className={
        displayCategory >= questions.length || displayCategory === -1 ? "bg-base-100 rounded-box p-6 max-w-md w-full border-3" :
        "bg-base-100 rounded-box p-6 max-w-lg w-full min-h-[500px] border-3"
      }>
        <div className={`transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'} ${displayCategory < questions.length ? 'min-h-[500px] flex flex-col' : 'flex-1 flex flex-col'}`}>
          {displayCategory === -1 ? (
            <div className="text-center flex-1 flex flex-col justify-center">
              <svg
                viewBox="0 0 3275.59 3275.59"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-20 h-20 text-primary mx-auto mb-4"
              >
                <rect
                  width="1156.34"
                  height="1156.34"
                  fill="currentColor"
                  transform="matrix(1.41636 1.41636 -1.41636 1.41636 1637.79 -0.0012774)"
                />
                <path
                  fill="#FEFEFE"
                  fillRule="nonzero"
                  d="M1864.79 1914.34l-185.73 185.73 472.04 472.04 934.31 -934.32 -185.72 -185.72 -748.61 748.61 -286.3 -286.34zm-276.27 -276.24l-185.72 -185.72 -185.73 185.73 185.73 185.72 185.72 -185.72zm279.4 -186.03l-748.6 748.61 -743.43 -748.6 -185.72 185.72 929.15 934.32 934.33 -934.33 -185.72 -185.72z"
                />
              </svg>
              <p className="text-xl font-bold text-neutral mb-4">ViVeStart 2025</p>
              <h1 className="text-3xl font-bold mb-4 text-neutral">
                Minkälainen partiolainen olet?
              </h1>
              <p className="text-neutral mb-6">
                Viikin Vesikoiden kysely auttaa sinua löytämään juuri sinulle sopivan tien partiossa. Vastaa kysymyksiin ja selvitä oma partioprofiilisi!
              </p>
              <button
                onClick={startTest}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-neutral-content hover:text-neutral transition-colors text-lg font-semibold border-2 border-neutral"
              >
                Aloita
              </button>
            </div>
          ) : displayCategory < questions.length && displayQuestion === -1 ? (
            <div className="relative flex flex-col grow">
              <button onClick={goBack} className="btn btn-ghost mb-4 absolute top-0 left-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                Takaisin
              </button>
              <div className="flex-1 flex flex-col justify-center text-center">
                <h2 className="text-2xl font-bold text-neutral">
                  {ordinalPrefixes[displayCategory]} osa:
                </h2>
                <h2 className="text-2xl font-bold mb-4 text-neutral">
                  {questions[displayCategory].category}
                </h2>
                <p className="text-neutral mb-6">
                  {questions[displayCategory].subtitle}
                </p>
              </div>
              <div className="mt-auto">
                <button
                  onClick={continueToQuestions}
                  className="btn btn-neutral w-full border-2 border-black"
                >
                  Jatka 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          ) : displayCategory < questions.length ? (
            <div className="flex flex-col grow">
              <div className="grow">
                <button onClick={goBack} className="btn btn-ghost mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                  Takaisin
                </button>
                <h2 className="text-lg font-semibold mb-4 text-neutral">
                  {questions[displayCategory].category}: {displayQuestion + 1}/{questions[displayCategory].questions.length}
                </h2>
                <p className="text-neutral mb-6">{questions[displayCategory].questions[displayQuestion].text}</p>
              </div>
              <div className="mt-auto space-y-3">
                {questions[displayCategory].questions[displayQuestion].options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(`category${displayCategory}_question${displayQuestion}`, option.value)}
                    className="btn btn-neutral w-full p-3 border-2 border-black"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold mb-4 text-neutral">
                Sinä olet...
              </h1>
              <img
                src={calculateResults(answers, flatQuestions).image}
                alt={calculateResults(answers, flatQuestions).title}
                className="mx-auto mb-6 max-w-full h-auto rounded-md"
                style={{ maxHeight: '200px' }}
              />
              <h2 className="text-xl font-semibold mb-4 text-neutral">
                {calculateResults(answers, flatQuestions).title}
              </h2>
              <p className="text-neutral mb-6">
                {calculateResults(answers, flatQuestions).description}
              </p>
              <div className="text-neutral mb-6">
                <h3 className="text-lg font-semibold mb-2">Sinun pisteesi:</h3>
                {Object.entries(calculateResults(answers, flatQuestions).stats)
                  .filter(([stat, value]) => calculateResults(answers, flatQuestions).maxPoints[stat] > 0)
                  .map(([stat, value]) => (
                    <p key={stat}>{stat.charAt(0).toUpperCase() + stat.slice(1)}: {value}%</p>
                  ))
                }
                <div className="h-64 mt-4">
                  <ResponsiveBar
                    data={getChartData()}
                    keys={['value']}
                    indexBy="stat"
                    isInteractive={false}
                    margin={{ top: 20, right: 30, bottom: 50, left: 30 }}
                    padding={0.3}
                    enableGridY={false}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legendPosition: 'middle',
                      legendOffset: 32
                    }}
                    axisLeft={false}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor="currentColor"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  window.location.reload(); // Reload the page to reset to landing page
                }}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-neutral-content hover:text-neutral transition-colors text-lg font-semibold border-2 border-neutral"
              >
                Takaisin alkuun
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;