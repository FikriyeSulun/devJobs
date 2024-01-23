import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import '../assets/css/jobcards.css'
import '../assets/css/detail.css'

export default function Detail() {

    const { id } = useParams()
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJobDetail = async () => {

            const response = await fetch('../../src/data/data.json');
            const data = await response.json();

            const jobData = data.find(job => job.id === Number(id));
            setJob(jobData);

        };

        fetchJobDetail();
    }, [id]);

    if (!job) {
        return <div>Loading...</div>;
    }
    const backgroundColor = 'red';

    return (
        <section className='detail-component'>
            <div className="detail-container">

                <div className="job-detail-header">
                    <div className="job-detail-header-left" style={{ backgroundColor: `${job.logoBackground}` }}>
                        <img src={job.logo} alt={`${job.company}`} />
                    </div>
                    <div className='job-detail-header-right'>
                        <div className="company-name-address">
                            <h2>{job.company}</h2>
                            <p className='typography-gray1'>{`${(job.company).toLowerCase()}.com`}</p>

                        </div>
                        <Link to={`${job.website}`} target="_blank"><button className='button2 company-site'>Company Site</button></Link>

                    </div>
                </div>

                <div className="job-detail-content ">
                    <div className='apply-now'>
                        <div className="job-position-company">
                            <div className="card-postedAt-contract">
                                <p className="postedAt typography-gray1">{job.postedAt}</p>
                                <div className="point-gray"></div>
                                <p className="contract typography-gray1">{job.contract}</p>
                            </div>
                            <h2>{job.position}</h2>
                            <h4 className='location'>{job.location}</h4>
                        </div>

                        <button className='button1'>Apply Now</button>
                    </div>

                    <p className='description'>{job.description}</p>

                    <h3>Requirements</h3>

                    <p className='requirements-content'>{job.requirements.content}</p>

                    <ul className='requirements-items'>
                        {job.requirements.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h3>What You Will Do</h3>

                    <p className='role-content'>{job.role.content}</p>

                    <ol className='role-items'>
                        {job.role.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                </div>
            </div>

            <footer className='detail-footer'>
                <div className="detail-container apply-now footer-apply" >


                    <div className="job-position-company ">

                        <h3>{job.position}</h3>
                        <p className='typography-gray1'>So Digital Inc.</p>
                    </div>

                    <button className='button1'>Apply Now</button>


                </div>
            </footer>
        </section>
    )
}