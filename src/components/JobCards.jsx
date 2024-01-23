import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import '../assets/css/jobcards.css'

export default function JobCards({ fullTimeOnly, locationFilter, titleorcompanyFilter, search, setSearch }) {
    const [jobs, setJobs] = useState([]);
    const [currentCards, setCurrentCards] = useState(12);
    const cardsPerPage = 12;
    const [filteredJobs, setFilteredJobs] = useState([])

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

    useEffect(() => {
        filterJobs();
        setSearch(false)
    }, [search]);

    const visibleJobs = filteredJobs.length > 0 ? filteredJobs.slice(0, currentCards) : jobs.slice(0, currentCards);

    const showLoadMoreButton = currentCards < visibleJobs.length;

    return (
        <section className='main'>
            <div className="container">
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

            </div>
        </section>
    )
}