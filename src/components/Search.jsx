import React, { useState } from 'react';

import '../assets/css/search.css'

export default function Search({ fullTimeOnly, onToggleFullTime, locationFilter, onLocationFilterChange, onSearchClick, titleorcompanyFilter, onTitleOrCompanyFilterChange}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLocationFilterChange = (e) => {
        const value = e.target.value;
        onLocationFilterChange(value);
        console.log(value)
    };

    const handleTitleOrCompanyFilterChange = (e) => {
        const value = e.target.value;
        onTitleOrCompanyFilterChange(value);
        console.log(value)
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini önle
        onSearchClick();
        console.log(isModalOpen)

        setIsModalOpen(false);
    };

    const handleFilterButtonClick = () => {
        setIsModalOpen(true);
        console.log(isModalOpen)
    };

    return (
        <section>
            <div className="container section-container">
                <form onSubmit={handleSubmit}
                    id='myForm' className='header-search'>
                    <div className="filter-by-title">
                        <img
                            className='search-icon' src="../../src/assets/img/icons/Search.svg" alt="" />

                        <input type="text" placeholder="Filter by title, companies, expertise..."
                            value={titleorcompanyFilter}
                            onChange={handleTitleOrCompanyFilterChange} />
                        <button type='button' className='filter-btn' onClick={handleFilterButtonClick}>
                            <img
                                className='filter-icon' src="../../src/assets/img/icons/Filter.svg" alt="" />
                            <img
                                className='filter-icon-white' src="../../src/assets/img/icons/FilterWhite.svg" alt="" />
                        </button>
                        <button className='button1 search-icon-btn' onClick={onSearchClick}><img src="../../src/assets/img/icons/SearchWhite.svg" alt="" /></button>
                    </div>
                    
                    <div className="filter-by-location">
                        <img src="../../src/assets/img/icons/Location.svg" alt="" />
                        <input type="text" placeholder="Filter by location..." value={locationFilter}
                            onChange={handleLocationFilterChange} />
                    </div>

                    <div className="search">
                        <div className="checkbox-search-filter">
                            {/* <div className='checkbox-custom'></div> */}
                            <input id="check" type="checkbox" checked={fullTimeOnly} onChange={(e) => onToggleFullTime(e.target.checked)} />
                            <label htmlFor="check">
                                Full Time Only
                            </label>
                        </div>
                        <button className="button1" onClick={onSearchClick}>Search</button>
                    </div>


                    {/* Modal ve Overlay */}
                    {isModalOpen && (
                        <div className="overlay">
                            <div className="modal">
                                <div className="filter-by-location-modal">
                                    <img src="../../src/assets/img/icons/Location.svg" alt="" />
                                    <input
                                        type="text"
                                        placeholder="Filter by location..."
                                        value={locationFilter}
                                        onChange={handleLocationFilterChange}
                                    />
                                </div>
                                <div className="search-modal">
                                    <div className="checkbox-search-filter">
                                        <input
                                            id="check"
                                            type="checkbox"
                                            checked={fullTimeOnly}
                                            onChange={(e) => onToggleFullTime(e.target.checked)}
                                        />
                                        <label htmlFor="check">Full Time Only</label>
                                    </div>
                                    <button className="button1" onClick={onSearchClick}>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </section>
    )
}