# Loves Me, Loves Me Not

"Loves Me, Loves Me Not" is a charming and interactive mobile game based on the classic fortune-telling ritual of plucking petals from a daisy. Discover your romantic fate with a simple tap!

## Game Features

*   **Interactive Gameplay**: Tap on each petal to pluck it, alternating between "Loves Me" and "Loves Me Not".
*   **Dynamic Petal Count**: Each game features a randomized number of petals (8-16 petals) for varied gameplay.
*   **Smooth Animations**: Enjoy fluid petal-plucking animations powered by React Native Reanimated.
*   **Celebration Effects**: Experience delightful visual effects for "Loves Me" outcomes and subtle broken heart effects for "Loves Me Not".
*   **Haptic Feedback**: Feel the interaction with haptic feedback on supported mobile devices.
*   **Web Compatibility**: Play directly in your browser with a responsive design.
*   **Randomness**: The number of petals and whether the first pluck is 'Loves me?' is randomized, to keep them unpredictable.
*   ***Tally***: Displays: The number of games played in a session, as well as the Hits (Loves me) and the Misses (Loves me not!) 

## How to Play

1.  **Start the Game**: Tap on any petal of the daisy to begin.
2.  **Pluck Petals**: Continue tapping petals, and the game will alternate between "Loves Me" and "Loves Me Not" with each pluck.
3.  **Reveal Your Fate**: The phrase associated with the very last petal plucked will reveal the answer to your heart's question!
4.  **Play Again**: After the game concludes, a "Play Again" button will appear to start a new round.

## Technologies Used

This application is built using modern React Native and Expo technologies, ensuring a smooth and performant experience across multiple platforms.

*   **Expo Router**: For intuitive and efficient navigation within the application.
*   **React Native Reanimated**: Powers the smooth and engaging animations, including petal plucking and result effects.
*   **Expo Linear Gradient**: Used for creating beautiful and vibrant background gradients.
*   **Lucide React Native**: Provides a comprehensive set of crisp and scalable icons.
*   **TypeScript**: Ensures type safety and enhances code quality and maintainability.
*   **Expo Google Fonts**: Integrates custom typography for a visually appealing interface.
*   **Custom Petal Physics and Game Logic**: Implements the core mechanics of the "Loves Me, Loves Me Not" game.

## Project Structure

The project follows a standard Expo Router structure:
.
├── app/                  # Main application routes and screens
│   ├── _layout.tsx       # Root layout for the app
│   └── (tabs)/           # Tab-based navigation
│       ├── _layout.tsx   # Layout for the tab navigator
│       ├── index.tsx     # Main game screen
│       ├── about.tsx     # Information about the game
│       ├── exit.tsx      # Placeholder for exit action
│       └── reset.tsx     # Placeholder for reset action
├── components/           # Reusable UI components
│   ├── HeartEffect.tsx   # Animated heart effects for game results
│   └── Petal.tsx         # Individual petal component with animation logic
├── hooks/                # Custom React hooks
│   └── useFrameworkReady.ts # Essential framework initialization hook
├── assets/               # Static assets like images
├── scripts/              # Utility scripts
└── package.json          # Project dependencies and scripts

