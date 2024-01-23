import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import '../assets/css/search.css'
import '../assets/css/jobcards.css'

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [currentCards, setCurrentCards] = useState(12);
  const cardsPerPage = 12;
  const [filteredJobs, setFilteredJobs] = useState([])

  //------------------------- kart datalarını çektik -------------------------
  useEffect(() => {
    // data.json dosyasından verileri çek
    fetch('../../src/data/data.json')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching or parsing data:', error));
  }, []);

  const loadMoreCards = () => {
    setCurrentCards(prevCards => prevCards + cardsPerPage);
  };
  //--------------------------------------------------------------------------


  //---------------------------- filtreleme eventleri ------------------------
  const [fullTimeOnly, setFullTimeOnly] = useState(localStorage.getItem('fullTimeOnly') === 'true');
  const [locationFilter, setLocationFilter] = useState('');
  const [titleorcompanyFilter, setTitleOrCompanyFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLocationFilterChange = (e) => {
    const value = e.target.value;
    setLocationFilter(value);
    console.log(value)
  };

  const handleTitleOrCompanyFilterChange = (e) => {
    const value = e.target.value;
    setTitleOrCompanyFilter(value);
    console.log(value)
  };

  const handleFullTimeToggle = (e) => {
    const value = e.target.checked
    setFullTimeOnly(value);
    localStorage.setItem('fullTimeOnly', value.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini önle
    onSearchClick();
    console.log(isModalOpen)
    setIsModalOpen(false);
    
    // inputları temizle 
    // setLocationFilter('');
    // setTitleOrCompanyFilter('');
  };

  const handleFilterButtonClick = () => {
    setIsModalOpen(true);
    console.log(isModalOpen)
  };
  //--------------------------------------------------------------------------


  //-------------- filtreleme ve gösterilecek kartları ayarladık -------------
  const filterJobs = () => {
    const filtered = jobs
      .filter(
        (job) =>
          (!fullTimeOnly || job.contract === 'Full Time') &&
          (locationFilter
            ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
            : true) &&
          (titleorcompanyFilter
            ? (job.company.toLowerCase().includes(titleorcompanyFilter.toLowerCase())
              || job.position.toLowerCase().includes(titleorcompanyFilter.toLowerCase()))
            : true)
      );
    console.log(filtered)

    setFilteredJobs(filtered);
  };

  const visibleJobs = filteredJobs.length > 0 ? filteredJobs.slice(0, currentCards) : jobs.slice(0, currentCards);

  const showLoadMoreButton = currentCards < (filteredJobs.length > 0 ? filteredJobs.length : jobs.length);

  const onSearchClick = () => {
    filterJobs()
  };
  //---------------------------------------------------------------------------

  return (
    <>
      <section className="container search-container">
          <form onSubmit={handleSubmit} id='myForm' className='header-search'>

            <div className="filter-by-title">
              <img className='search-icon' src="../../src/assets/img/icons/Search.svg" alt="" />
              <input type="text" placeholder="Filter by title, companies, expertise..."
                value={titleorcompanyFilter}
                onChange={handleTitleOrCompanyFilterChange} />
              <button type='button' className='filter-btn' onClick={handleFilterButtonClick}>
                <img className='filter-icon' src="../../src/assets/img/icons/Filter.svg" alt="" />
                <img className='filter-icon-white' src="../../src/assets/img/icons/FilterWhite.svg" alt="" />
              </button>
              <button className='button1 search-icon-btn' onClick={onSearchClick}><img src="../../src/assets/img/icons/SearchWhite.svg" alt="" /></button>
            </div>

            <div className="filter-by-location">
              <img src="../../src/assets/img/icons/Location.svg" alt="" />
              <input type="text" placeholder="Filter by location..."
                value={locationFilter}
                onChange={handleLocationFilterChange} />
            </div>

            <div className="search">
              <div className="checkbox-search-filter">
                <input id="check" type="checkbox"
                  checked={fullTimeOnly}
                  onChange={handleFullTimeToggle} />
                <label htmlFor="check"> Full Time Only </label>
              </div>
              <button className="button1" onClick={onSearchClick}>Search</button>
            </div>

            {/* Modal ve Overlay */}
            {isModalOpen && (
              <div className="overlay">
                <div className="modal">
                  <div className="filter-by-location-modal">
                    <img src="../../src/assets/img/icons/Location.svg" alt="" />
                    <input type="text" placeholder="Filter by location..."
                      value={locationFilter}
                      onChange={handleLocationFilterChange}
                    />
                  </div>
                  <div className="search-modal">
                    <div className="checkbox-search-filter">
                      <input id="check" type="checkbox"
                        checked={fullTimeOnly}
                        onChange={handleFullTimeToggle}
                      />
                      <label htmlFor="check">Full Time Only</label>
                    </div>
                    <button className="button1" onClick={onSearchClick}> Search </button>
                  </div>
                </div>
              </div>
            )}

          </form>
      </section>

      <section className='container jobCards-container'>
          <div className="jobs">
            <ul className="job-cards">

              {visibleJobs.map(job => (
                <li className="job-card" key={job.id}>
                  <div className="companyLogo">
                    <img src={job.logo} alt="" />
                  </div>
                  <div className="jobCardContent">
                    <div className="job-position-company">
                      <div className="card-postedAt-contract">
                        <p className="postedAt typography-gray1">{job.postedAt}</p>
                        <div className="point-gray"></div>
                        <p className="contract typography-gray1">{job.contract}</p>
                      </div>
                      <Link to={`/Jobs/${job.id}`}><h3 className="position">{job.position}</h3></Link>
                      <p className="company typography-gray1">{job.company}</p>
                    </div>
                    <h4 className="location">{job.location}</h4>
                  </div>
                </li>
              ))}

            </ul>

            {showLoadMoreButton && (
              <button className="button1 load-more-jobs" onClick={loadMoreCards}>Load More</button>
            )}
          </div>

      </section>
    </>
  )
}