import { createContext, useState } from "react"


const DarkModeContext = createContext({})

function DarkModeProvider(props) {

  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <>
      <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
          {props.children}
      </DarkModeContext.Provider>
    </>
  )
}

export { DarkModeProvider, DarkModeContext } 
