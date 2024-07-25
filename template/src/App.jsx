import React from 'react';

const App = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='max-w-screen-lg px-8 py-12 w-full'>
                <div className='flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 lg:-space-x-20'>
                    <div className='md:w-1/2 flex justify-center md:justify-start'>
                        <img
                            className='w-64 h-auto mx-auto md:mx-0 transform transition-transform duration-500 hover:scale-105'
                            src="../Public/assets/zet.png"
                            alt="zet"
                        />
                    </div>
                    <div className='md:w-1/2 text-center md:text-left'>
                        <h1 className='text-purple-600 text-4xl md:text-6xl font-bold font-mono mb-4'>
                            zet.js
                        </h1>
                        <p className='text-purple-600 text-lg font-medium md:text-xl mb-6'>
                            A minimalistic JavaScript framework with React
                        </p>
                        <a
                            href="https://github.com/Gazi2050/zet.js"
                            target="_blank"
                            className="bg-purple-900 bg-opacity-60 border-2 border-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-500 hover:bg-black hover:border-purple-900 transform hover:scale-105"
                            style={{ textDecoration: 'none' }}
                        >
                            View on GitHub
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
