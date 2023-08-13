import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import "./header.css"
import { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";


const Header = ({ type }) => {
    const [opendate, setOpendate] = useState(false);
    const [destination, setDestination] = useState("");
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);

    const [openoptions, setOpenoptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        rooms: 1
    });

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    const handleOption = (name, operation) => {
        setOptions((prevvalue) => {
            return { ...prevvalue, [name]: operation === 'i' ? options[name] + 1 : options[name] - 1 }
        });
    }

    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        console.log(dates);
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
        navigate("/hotels", { state: { destination, dates, options } });
    }

    return (
        <div className="header">
            <div className={type === "list" ? "header-container listmode" : "header-container"}>
                <div className="header-list">
                    <div className="header-list-item active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stay</span>
                    </div>
                    <div className="header-list-item">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flight</span>
                    </div>
                    <div className="header-list-item">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Taxi</span>
                    </div>
                    <div className="header-list-item">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rentals</span>
                    </div>
                </div>
                {type !== "list" &&
                    (<><h1 className="header-title">A LifeTime discounts</h1>
                        <p className="header-desc">Unlock 10% Savings using xx/yy debit/credit Card</p>
                        {!user && <button className="header-btn">Sign In/Register</button>}
                        <div className="header-search">
                            <div className="header-search-item">
                                <input
                                    onChange={e => { setDestination(e.target.value) }}
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="header-search-input" />
                            </div>
                            <div className="header-search-item">
                                <FontAwesomeIcon className="header-search-icon" icon={faCalendarDays} />
                                <span onClick={() => { setOpendate(!opendate) }} className="header-search-text">{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                                {opendate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    minDate={new Date()}
                                    className="date"
                                />}

                            </div>
                            <div className="header-search-item">
                                <FontAwesomeIcon className="header-search-icon" icon={faPerson} />
                                <span onClick={() => { setOpenoptions(!openoptions) }} className="header-search-text">{`adult-${options.adult}, Child-${options.children}, Rooms-${options.rooms}`}</span>
                                {openoptions && <div className="options">
                                    <div className="option-item">
                                        <span className="option-text">Adults</span>
                                        <div className="option-counter">
                                            <button disabled={options.adult <= 1} className="option-counter-button" onClick={() => { handleOption("adult", "d") }}>-</button>
                                            <span className="option-counter-number">{options.adult}</span>
                                            <button className="option-counter-button" onClick={() => { handleOption("adult", "i") }}>+</button>
                                        </div>
                                    </div>
                                    <div className="option-item">
                                        <span className="option-text">Children</span>
                                        <div className="option-counter">
                                            <button disabled={options.children <= 0} className="option-counter-button" onClick={() => { handleOption("children", "d") }}>-</button>
                                            <span className="option-counter-number">{options.children}</span>
                                            <button className="option-counter-button" onClick={() => { handleOption("children", "i") }}>+</button>
                                        </div>
                                    </div>
                                    <div className="option-item">
                                        <span className="option-text">Rooms</span>
                                        <div className="option-counter">
                                            <button disabled={options.rooms <= 1} className="option-counter-button" onClick={() => { handleOption("rooms", "d") }}>-</button>
                                            <span className="option-counter-number">{options.rooms}</span>
                                            <button className="option-counter-button" onClick={() => { handleOption("rooms", "i") }}>+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="header-search-item">
                                <button onClick={() => { handleSearch() }} className="header-btn">Search</button>
                            </div>
                        </div></>)}
            </div>
        </div>
    )
}

export default Header;