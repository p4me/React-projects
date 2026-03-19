// CONCEPT: createContext + useContext
// createContext creates a "global store" any component in the tree can read.
// No need to pass props through every component — that problem is called "prop drilling".

import { createContext, useContext, useState } from 'react'

// Step 1: create the context (just an empty box for now)
const ThemeContext = createContext()

// Step 2: create a Provider component that holds the actual state
// Wrap your app with this so every child can access the theme
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    // Step 3: pass the value you want to share via the Provider
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Step 4: custom hook so consumers don't import ThemeContext directly
// Usage in any component: const { theme, toggleTheme } = useTheme()
export function useTheme() {
  return useContext(ThemeContext)
}
