import { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import './index.css';
import questions from './data/questions';
import { calculateResults } from './data/results';

function App() {
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [displayCategory, setDisplayCategory] = useState(-1);
  const [displayQuestion, setDisplayQuestion] = useState(-1);
  const [isFading, setIsFading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [userId, setUserId] = useState(null);
  const [results, setResults] = useState(null);

  const flatQuestions = questions.flatMap((category, catIndex) =>
    category.questions.map((question, qIndex) => ({
      ...question,
      id: `category${catIndex}_question${qIndex}`,
    }))
  );

  const ordinalPrefixes = ['Ensimmäinen', 'Toinen'];

  const handleAnswer = async (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setIsFading(true);

    try {
      await fetch('/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          categoryIndex: currentCategory,
          questionIndex: currentQuestion,
          questionId,
          value,
        }),
      });
    } catch (error) {
      console.error('Error saving answer:', error);
    }

    const currentCategoryQuestions = questions[currentCategory].questions;
    if (currentQuestion + 1 < currentCategoryQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentCategory + 1 < questions.length) {
      setCurrentCategory((prev) => prev + 1);
      setCurrentQuestion(-1);
    } else {
      setCurrentCategory(questions.length);
      setCurrentQuestion(-1);
      try {
        const res = await fetch('/api/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
        const updatedAnswers = { ...answers, [questionId]: value };
        setResults({ profile: calculateResults(updatedAnswers, flatQuestions) });
      }
    }
  };

  const startTest = async () => {
    setIsFading(true);
    setCurrentCategory(0);
    setCurrentQuestion(-1);
    try {
      const res = await fetch('/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const { userId } = await res.json();
      setUserId(userId);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const goBack = () => {
    setIsFading(true);
    if (currentQuestion > -1) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (currentCategory > 0) {
      setCurrentCategory((prev) => prev - 1);
      setCurrentQuestion(questions[prev - 1].questions.length - 1);
    } else {
      setCurrentCategory(-1);
      setCurrentQuestion(-1);
    }
  };

  const continueToQuestions = () => {
    setIsFading(true);
    setCurrentQuestion(0);
  };

  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => {
        setDisplayCategory(currentCategory);
        setDisplayQuestion(currentQuestion);
        setIsFading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setDisplayCategory(currentCategory);
      setDisplayQuestion(currentQuestion);
    }
  }, [currentCategory, currentQuestion, isFading]);

  useEffect(() => {
    if (displayCategory >= questions.length) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [displayCategory]);

  const getChartData = () => {
    const profile = results?.profile || calculateResults(answers, flatQuestions);
    console.log('profile.stats:', profile.stats, 'avgStats:', results?.avgStats); // Debug values
    const chartData = Object.entries(profile.stats)
      .filter(([stat]) => profile.maxPoints?.[stat] > 0)
      .map(([stat, value]) => ({
        stat: stat.charAt(0).toUpperCase() + stat.slice(1),
        'Sinun pisteesi': value,
        'Vastaajien keskiarvo': results?.avgStats?.[stat] || 0,
      }));
    return chartData;
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
                {questions[displayCategory].questions[displayQuestion].options.map((option) => (
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
                src={(results?.profile || calculateResults(answers, flatQuestions)).image}
                alt={(results?.profile || calculateResults(answers, flatQuestions)).title}
                className="mx-auto mb-6 max-w-full h-auto rounded-md"
                style={{ maxHeight: '200px' }}
              />
              <h2 className="text-xl font-semibold mb-4 text-neutral">
                {(results?.profile || calculateResults(answers, flatQuestions)).title}
              </h2>
              <p className="text-neutral mb-6">
                {(results?.profile || calculateResults(answers, flatQuestions)).description}
              </p>
              <div className="text-neutral mb-6">
                <h3 className="text-lg font-semibold mb-2">Sinun pisteesi:</h3>
                <div className="h-64 mt-4 relative mx-auto">
                  <style jsx>{`
                    .nivo-bar-sinun-pisteesi, .nivo-bar-vastaajien-keskiarvo {
                      opacity: 1; /* Full opacity for both bars */
                    }
                    .nivo-bar-label {
                      fill: black; /* Black labels for contrast */
                      text-shadow: 0 0 2px rgba(255, 255, 255, 0.7); /* White shadow for readability */
                      font-size: 12px;
                    }
                  `}</style>
                  <ResponsiveBar
                    data={getChartData()}
                    keys={['Sinun pisteesi', 'Vastaajien keskiarvo']}
                    indexBy="stat"
                    isInteractive={false}
                    margin={{ top: 40, right: 30, bottom: 130, left: 30 }} // Increased top for labels
                    padding={0.4} // Space between stat groups
                    innerPadding={2} // Tight spacing for side-by-side bars
                    groupMode="grouped" // Side-by-side bars
                    colors={['#1A511F', '#1A711F']} // Green tones for bars
                    borderRadius={4} // Rounded corners
                    borderWidth={2}
                    borderColor={'#333F'}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legendPosition: 'middle',
                      legendOffset: 32,
                    }}
                    axisLeft={false}
                    enableGridY={false}
                    enableLabel={true}
                    label={(d) => `${Math.round(d.value)}%`} // Display percentage
                    labelSkipWidth={0} // Show labels regardless of bar width
                    labelSkipHeight={0} // Show labels regardless of bar height
                    labelTextColor="black" // Black labels for contrast
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={[
                      {
                        dataFrom: 'keys',
                        anchor: 'bottom', // Place below chart
                        direction: 'row', // Horizontal legend
                        justify: true, // Center items
                        translateX: 0, // Center horizontally
                        translateY: 75, // Move below chart
                        itemsSpacing: 30, // Spacing between items
                        itemWidth: 160, // Width for longer labels
                        itemHeight: 35,
                        itemDirection: 'top-to-bottom',
                        itemOpacity: 1,
                        symbolSize: 16, // Symbol size
                        symbolSpacing: 2, // Tighter gap between symbol and text
                        effects: [
                          {
                            on: 'hover',
                            style: { itemOpacity: 1 },
                          },
                        ],
                      },
                    ]}
                    theme={{
                      axis: {
                        ticks: {
                          text: { fontSize: 12, fill: '#333' },
                        },
                        legend: {
                          text: { fontSize: 14, fill: '#333' },
                        },
                      },
                      legends: {
                        text: { fontSize: 14, fill: '#333' },
                      },
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  window.location.reload();
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