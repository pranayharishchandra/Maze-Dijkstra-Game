# Maze Solver

Maze Solver is a ReactJS application that generates a customizable `m x n` size maze. Users can either input specific problems or click to randomly generate blockages within the maze. The application then utilizes the Breadth-First Search (BFS) algorithm to find and display the shortest path from the start to the finish.

## Features

- **Maze Generation**: Create a maze of any size by specifying the dimensions `m x n`.
- **Customizable Blockages**: Users can manually place blockages within the maze or use the random blockage generator for a new challenge.
- **Shortest Path Solution**: Employs the BFS algorithm to calculate and visualize the shortest path from the start to the end of the maze.
- **Interactive Interface**: Intuitive user interface for maze interaction, blockage placement, and pathfinding.

## Technologies Used

- **ReactJS**: The core framework used for building the user interface.
- **JavaScript (ES6+)**: Language used for implementing the BFS algorithm and handling maze logic.
- **CSS (TailwindCSS)**: For styling and responsive design.

## How to Use

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/pranayharishchandra/Maze-Dijkstra-Game
   cd maze-solver
   ```

2. **Install Dependencies**:  
   ```bash
   npm install
   ```

3. **Start the Application**:  
   ```bash
   npm start
   ```

4. **Generate a Maze**:  
   - Specify the size `m x n` for your maze.
   - Place blockages manually by clicking on cells or use the "Random Generate" button to auto-generate blockages.

5. **Solve the Maze**:  
   - Click the "Find Shortest Path" button to see the BFS algorithm in action.
   - The shortest path will be highlighted within the maze.

## Example Use Case

- **Educational Tool**: Great for teaching and visualizing the BFS algorithm.
- **Puzzle Games**: Can be extended to create custom maze-based puzzle games.

## Future Enhancements
- **Algorithm Options**: Add support for different pathfinding algorithms (e.g., DFS, A*).
- **User-Defined Start/End Points**: Allow users to set custom start and end points.
- **Multiple Solutions**: Show alternative paths if multiple shortest paths exist.
