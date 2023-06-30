import React from 'react';

export default function TermsPopUp({ handleClose, terms }) {
    return (
        <div
            className='fixed inset-0 flex items-start justify-center z-50 bg-opacity-50 bg-black align-top'
        >
            <div className="w-full max-w-lg bg-white rounded-lg p-6 mt-10 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={handleClose}
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div
                    className='mt-5 mb-5 mr-3 ml-3'
                >
                    <div
                        style={{ textAlign: 'center' }}
                        className='mb-3'
                    >
                        <b>Confusing Terms</b>
                    </div>
                    <div
                        className='max-h-96 scroll-pl-6 overflow-y-auto'
                    >
                        {terms.map((term) => <div className='mb-2 mt-2'><b>{`- ${term[0]}`}</b>{`: ${term[1]}\n\n`}</div>)}
                    </div>
                    
                </div>
            </div>

        </div>
    )
}