import React from 'react'

const ContextForTheme = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
})

export default ContextForTheme
