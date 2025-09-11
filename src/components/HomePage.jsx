import React from 'react'

const HomePage = ({searchText}) => {
    return (
        <div className='flex py-6 flex-col gap-4 items-center'>
            <h1 className='font-bold text-2xl'>Dashboard</h1>
            <p className='w-3xl text-gray-600 text-center'>Dashboards, admin panels & analytics design inspiration. Dashboards help organize, store, and display important information from multiple data sources into one, easy-to-access place.</p>
            {searchText!="" && <h3 className='font-bold mt-6'>Searching for {searchText}...</h3>}
        </div>
    )
}

export default HomePage