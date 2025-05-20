# Quiz Master - Interactive Quiz Game

A dynamic, responsive quiz application built with **React.js** and **Tailwind CSS** that tests users' knowledge across various topics.



## Features

- **Interactive Quiz Interface**: Engage with multiple-choice questions.
- **Real-Time Feedback**: Instant feedback on answer correctness.
- **Score Tracking**: Monitor your performance throughout the quiz.
- **30-Second Timer**: Answer each question within a time limit.
- **Responsive Design**: Works seamlessly on all devices.
- **Leaderboard**: Track and compare high scores.
- **Modern UI**: Enjoy a sleek design with smooth transitions.

## Demo

You can view a live demo of the application [here](https://web3bridge-quiz.vercel.app/) 

## Technology Stack

- **React.js**: Frontend library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide React**: Icon library for interface elements.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Adaobilynda1234/web3bridge_quiz.git
   cd web3bridge_quiz   
   ```

2.**Install Dependencies**:
 ```bash
npm install  
   ```
3.**Start the Development Server**:
```bash
npm run dev 
   ```
4.**Open in Browser:Open http://localhost:5173 to view the app**:



## Usage

- **Start the Application**:Follow the installation instructions above.

- **Enter Your Name**:Provide your name on the welcome screen.

- **Start the Quiz**:Click "Start Quiz" to begin.

## Answer Questions:

- **You have 30 seconds to select an answer**.
- **Click your chosen answer to receive immediate feedback**.
- **Click "Next" to proceed to the next question**.


## View Results:After completing all questions, see your final score and leaderboard position.

## Play Again:Choose to restart the quiz or exit.


## Customization
Adding More Questions
To add new questions, modify the quizData array in the main component or use a separate JSON file (e.g., src/data/questions.json):
const quizData = [
  {
    id: 1,
    question: "Your question here?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: "Option 2",
    category: "Your Category"
  },
  // Add more questions...
];

## Styling
The app uses Tailwind CSS for styling. Customize the appearance by editing Tailwind classes in the component files (e.g., src/components/QuizGame.js).



## Future Enhancements

User Authentication: Enable user accounts for personalized experiences.
Multiple Categories: Introduce various quiz topics.
Difficulty Levels: Offer easy, medium, and hard modes.
Persistent Leaderboard: Store scores in a backend database.
Social Sharing: Allow users to share results on social media.
Dark Mode: Add a dark theme option.

## Contributing
Contributions are welcome! To contribute:

## Fork the Repository.
Create a Feature Branch:git checkout -b feature/amazing-feature


Commit Your Changes:git commit -m 'Add some amazing feature'


Push to the Branch:git push origin feature/amazing-feature


Open a Pull Request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
Acknowledgments

## Icon Library: Lucide React
UI Inspiration: Various quiz applications and modern web design trends

