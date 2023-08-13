import './hotel.css'
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import MailList from "../../components/maillist/MailList"
import Footer from "../../components/footer/Footer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [slidenum, setSlidenum] = useState(0);
    const [openslider, setOpenslider] = useState(false);
    const [openmodal, setOpenmodal] = useState(false);


    const { data, loading, error } = useFetch(`https://backend-bookiiing.onrender.com/api/hotels/find/${id}`);
    const navigate = useNavigate();

    const { dates, options } = useContext(SearchContext);
    const { user } = useContext(AuthContext);


    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }
    const days = dayDifference(dates[0].endDate, dates[0].startDate);

    const handleOpen = (i) => {
        setSlidenum(i);
        setOpenslider(true);
    }

    const handleMove = (dir) => {
        let newslidenum;
        if (dir === "l") {
            newslidenum = slidenum === 0 ? 5 : slidenum - 1;
        }
        else {
            newslidenum = slidenum === 5 ? 0 : slidenum + 1;
        }

        setSlidenum(newslidenum);
    }

    const handleClick = () => {
        if (user) {
            setOpenmodal(true);
            // console.log(dates);
        } else {
            navigate('/login');
        }
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? "Loading" : (<div className="hotel-container">
                {openslider && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpenslider(false)} />
                    <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleMove("l")} />
                    <div className="slider-wrapper">
                        <img src={data.photos[slidenum]} alt="" className="slider-img" />
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleMove("r")} />
                </div>}
                <div className="hotel-wrapper">
                    <button className="hotel-booknow">Book now / Reserve</button>
                    <h1 className="hotel-title">{data.name}</h1>
                    <div className="hotel-address">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address}</span>
                    </div>
                    <span className="hotel-dist">Excellent Location, Spiritual, {data.distance}km from Hyderabad</span>
                    <span className="hotel-price">Book a stay for ₹{data.cheapestPrice} and get free VIP darshanam</span>
                    <div className="hotel-images-container">
                        {data.photos?.map((photo, i) => (
                            <div className="hotel-image-wrapper" key={i}>
                                <img onClick={() => handleOpen(i)} src={photo} alt="" className='hotel-image' />
                            </div>
                        ))}
                    </div>
                    <div className="hotel-details">
                        <div className='hotel-detail-text'>
                            <h1 className="hotelTitle">{data.title}</h1>
                            <p className="hotelDesc">
                                {data.desc}
                            </p>
                        </div>
                        <div className="hotel-detail-price">
                            <h1>Perfect for a 9-night stay!</h1>
                            <span>
                                Located in the real heart of Yadadri-Bhuvanagiri, this property has an
                                excellent location score of 9.8!
                            </span>
                            <h2>
                                <b>₹{data.cheapestPrice * days * options.rooms}</b> ({days}{" "} nights)
                            </h2>
                            <button onClick={handleClick}>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>)}
            {openmodal && <Reserve setOpen={setOpenmodal} hotelId={id} />}
        </div>
    )
}

export default Hotel