import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  /*main state variables*/
  const [password, setPassword] = useState('');
  const [length, setLength] = useState('8');
  const [numberAllowed, setNumberAllowed] = useState('false');
  const [symbolsAllowed, setSymbolsAllowed] = useState('false');
  const [upperCaseAllowed, setUppercaseAllowed] = useState('false');
  const [loweCaseAllowed, setLowercaseAllowed] = useState('false');
  /*icon state change */
  const [copyIcon, setCopyIcon] = useState('./copy-icon.svg');
  /*ref hook */
  const passwordRef = useRef(null);
 

  /*password generator method*/
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";

    /*conditions for password*/
    if(numberAllowed) {
      str+= "0123456789";
    }

    if(upperCaseAllowed) {
      str+= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if(loweCaseAllowed) {
      str+= "abcdefghijklmnopqrstuvwxyz";
    }

    if(symbolsAllowed) {
      str+= "!@#$%^&*()-_=+[]{}|;:,.<>?/`~";
    }


    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); 
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, symbolsAllowed, upperCaseAllowed, loweCaseAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    /*selects the text*/
    passwordRef.current?.select();

    /* passwordRef.current?.setSelectionRange(0,length); */ /*testing - used for selection of range of text*/
    
    /*adding to clipboard */
    window.navigator.clipboard.writeText(password);
    
    /*setting copy icon to copied */
    setCopyIcon('/copied-icon.svg');
    
    /*resetting copy icon and text selection*/
    setTimeout(() => {
      passwordRef.current?.setSelectionRange(0,0);
      setCopyIcon('./copy-icon.svg');
    }, 1500);

  }, [password]);

  useEffect(() => {passwordGenerator()}, [length, numberAllowed, upperCaseAllowed, loweCaseAllowed, symbolsAllowed, passwordGenerator]);

  return (
    <>
      {/*main container */}
      <div className='main-container w-full h-screen flex flex-col  items-center '> 

        {/*heading text*/}
        <div className="heading  w-2/5 min-w-fit border-b-2 border-white border-dashed mb-9 flex justify-center items-center"> 
          <h1 className=' text-white m-2 mb-6 max-sm:mb-2'>Password Generator</h1>
        </div>
    

        {/*password container */}
        <div className='input-container flex flex-row justify-center items-center m-5 text-white border-2 border-white' >
          
          {/*password input-field*/}
          <input
            type="text"
            value={password}
            className="pass-input-field outline-none py-1 px-3 text-center font-sans text-lg"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />

          {/*refresh button*/}
          <button className='outline-none px-2 py-1 shrink-0' onClick={passwordGenerator}><img src="./refresh-icon.svg" alt="ref" className='h-6 text-[10px]'/></button>


          {/*copy button*/}
          <button className='outline-none px-2 py-1 shrink-0' onClick={copyPasswordToClipboard}><img src={copyIcon} alt="Copy" className='h-6 text-[10px]'/></button>
          
        </div>

        
        {/*Range slide bar container */}
        <div className='range-selection-container flex items-center gap-x-4 '>
          
          <input 
          type="range" min={8} max={20} value={length} className='cursor-pointer custom-range' onChange={(e) => {setLength(e.target.value)}} />
          
          <label className='text-white'>Length: {length}</label>

        </div>

        {/*selection box*/}
        <div className="selection-container m-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 max-sm:gap-y-4 justify-evenly text-white text-base">

          {/**for uppercase */}
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked={upperCaseAllowed} onChange={() => {setUppercaseAllowed((prev) => !prev)}} className="accent-[#666]" />
            Uppercase
          </label>

          {/**for lowercase */}
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked={loweCaseAllowed} onChange={() => {setLowercaseAllowed((prev) => !prev)}} className="accent-[#666]" />
            Lowercase
          </label>

          {/**for symbols */}
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked={symbolsAllowed} onChange={() => {setSymbolsAllowed((prev) => !prev)}} className="accent-[#666]" />
            Symbols
          </label>

          {/**for numbers */}
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked={numberAllowed} onChange={() => {setNumberAllowed((prev) => !prev)}} className="accent-[#666]" />
            Numbers
          </label>

        </div>

    
      </div>
    </>
  )
}

export default App
