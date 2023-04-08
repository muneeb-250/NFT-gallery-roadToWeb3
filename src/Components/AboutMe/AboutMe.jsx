import React from 'react'

const AboutMe = () => {
    return (
        <div className="mx-auto w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img className="object-cover w-full h-56" src="https://avatars.githubusercontent.com/u/66199828?v=4" alt="avatar" />

            <div className="py-5 text-center">
                <a href="#" className="block text-xl font-bold text-gray-800 dark:text-white" tabindex="0" role="link">Muneeb Ur Rehman</a>
                <span className="text-sm text-gray-700 dark:text-gray-200">Web3 Dev</span>
            </div>
        </div>
    )
}

export default AboutMe