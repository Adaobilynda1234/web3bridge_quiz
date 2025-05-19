import { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle, XCircle, Timer, Award } from 'lucide-react';

// Sample quiz data (would typically come from API or JSON file)
const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    category: "Geography"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    category: "Science" 
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
    category: "Art"
  },
  {
    id: 4,
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctAnswer: "JavaScript",
    category: "Technology"
  },
  {
    id: 5,
    question: "What year was the first iPhone released?",
    options: ["2005", "2007", "2009", "2010"],
    correctAnswer: "2007",
    category: "Technology"
  }
];

// Main App Component
export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameState, setGameState] = useState('start'); // start, playing, result
  const [timeLeft, setTimeLeft] = useState(30);
  const [leaderboard, setLeaderboard] = useState([
    { name: "Alex", score: 4 },
    { name: "Sam", score: 3 },
    { name: "Taylor", score: 5 }
  ]);
  const [playerName, setPlayerName] = useState("");

  // Fetch questions (simulated)
  useEffect(() => {
    // In a real app, this would be an API call
    setQuestions(quizData);
  }, []);

  // Timer logic
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      // End of quiz
      setGameState('result');
      
      // Update leaderboard if score is good enough
      if (playerName && score > 0) {
        const newLeaderboard = [...leaderboard, { name: playerName, score }];
        newLeaderboard.sort((a, b) => b.score - a.score);
        setLeaderboard(newLeaderboard.slice(0, 10)); // Keep top 10
      }
    }
  };

  const saveScore = () => {
    if (playerName.trim() !== "") {
      const newLeaderboard = [...leaderboard, { name: playerName, score }];
      newLeaderboard.sort((a, b) => b.score - a.score);
      setLeaderboard(newLeaderboard.slice(0, 10)); // Keep top 10
    }
  };

  // Loading state
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-bold text-blue-600">Loading questions...</div>
      </div>
    );
  }

  // Start screen
  if (gameState === 'start') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
        <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Quiz Master</h1>
          <p className="text-gray-600 mb-6 text-center">Test your knowledge with our quiz game! Answer questions from various categories and see how high you can score.</p>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Enter your name:</label>
            <input 
              type="text" 
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>
          
          <button 
            onClick={startGame}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Start Quiz
          </button>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">How to Play:</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>You'll be presented with {questions.length} multiple-choice questions</li>
              <li>Each question has a 30-second time limit</li>
              <li>Select the answer you think is correct</li>
              <li>Your final score will be shown at the end</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (gameState === 'result') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
        <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Quiz Complete!</h1>
          
          <div className="text-center mb-6">
            <p className="text-xl text-gray-800">Your Score:</p>
            <p className="text-4xl font-bold text-blue-600">{score} / {questions.length}</p>
            <p className="text-gray-600 mt-2">
              {score === questions.length ? "Perfect score! Amazing job!" : 
              score >= questions.length * 0.7 ? "Great job!" : 
              score >= questions.length * 0.5 ? "Good effort!" : 
              "Better luck next time!"}
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <Award className="mr-2 text-yellow-500" size={24} />
              Leaderboard
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              {leaderboard.slice(0, 5).map((entry, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                  <span className="font-medium">{index + 1}. {entry.name}</span>
                  <span className="text-blue-600 font-semibold">{entry.score}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={startGame}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing state
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with progress */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Question {currentQuestionIndex + 1}/{questions.length}</span>
            <div className="flex items-center">
              <Timer size={18} className="mr-1" />
              <span>{timeLeft}s</span>
            </div>
          </div>
          <div className="w-full bg-blue-800 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full" 
              style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Question and answers */}
        <div className="p-6">
          <div className="mb-1 text-sm font-medium text-blue-500">
            {currentQuestion.category}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex justify-between items-center
                  ${selectedAnswer === null 
                    ? 'border-gray-300 hover:border-blue-500 hover:bg-blue-50' 
                    : selectedAnswer === option
                      ? option === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-red-500 bg-red-50 text-red-700'
                      : option === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 bg-gray-100 text-gray-500'
                  }`}
              >
                <span>{option}</span>
                {selectedAnswer && (
                  option === currentQuestion.correctAnswer 
                    ? <CheckCircle size={20} className="text-green-600" />
                    : selectedAnswer === option 
                      ? <XCircle size={20} className="text-red-600" />
                      : null
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <div>
            <span className="font-medium">Score: </span>
            <span className="text-blue-600 font-bold">{score}</span>
          </div>
          
          {selectedAnswer && (
            <button 
              onClick={handleNextQuestion}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300 flex items-center"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
