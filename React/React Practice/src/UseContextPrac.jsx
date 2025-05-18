import React, { useState, useContext } from 'react'
import Context from '../context/Context';

const UseContextPrac = () => {

    const { darkModeOn, setDarkModeOn, englishLanguage, setEnglishLanguage } = useContext(Context)

    return (
        <div>UseContextPrac</div>
    )
}

export default UseContextPrac