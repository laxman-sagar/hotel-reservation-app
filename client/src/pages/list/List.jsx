import "./list.css"
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { format } from "date-fns";
import { DateRange } from "react-date-range"
import SearchItem from "../../components/searchitem/SearchItem"
import useFetch from "../../hooks/useFetch"



const List = () => {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [opendate, setOpendate] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const { data, loading, err, refetchData } = useFetch(`https://backend-bookiiing.onrender.com/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

    const handleFilter = () => {
        refetchData();
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="list-container">
                <div className="list-wrapper">
                    <div className="list-filter">
                        <h1 className="list-title">Filter</h1>
                        <div className="list-item">
                            <label htmlFor="">destination</label>
                            <input type="text" placeholder={destination} />
                        </div>
                        <div className="list-item">
                            <label htmlFor="">check-in-date</label>
                            <span onClick={() => setOpendate(!opendate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                            {opendate && <DateRange
                                onChange={item => setDates([item.selection])}
                                ranges={dates}
                                minDate={new Date()}
                            />}
                        </div>
                        <div className="list-item">
                            <label >Options</label>
                            <div className="list-options">
                                <div className="list-option-item">
                                    <span className="list-option-text">Min Price <small>per night</small></span>
                                    <input type="number" onChange={e => { setMin(e.target.value) }} className="list-option-input" placeholder={min | 0} />
                                </div>
                                <div className="list-option-item">
                                    <span className="list-option-text">Max Price <small>per night</small></span>
                                    <input type="number" onChange={e => { setMax(e.target.value) }} className="list-option-input" placeholder={max || 999} />
                                </div>
                                <div className="list-option-item">
                                    <span className="list-option-text">Adults </span>
                                    <input type="number" min={1} className="list-option-input" placeholder={options.adult} />
                                </div>
                                <div className="list-option-item">
                                    <span className="list-option-text">Children </span>
                                    <input type="number" min={0} className="list-option-input" placeholder={options.children} />
                                </div>
                                <div className="list-option-item">
                                    <span className="list-option-text">Rooms </span>
                                    <input type="number" min={1} className="list-option-input" placeholder={options.rooms} />
                                </div>
                            </div>
                        </div>
                        <button onClick={() => { handleFilter() }}>Filter</button>
                    </div>
                    <div className="list-results">
                        {loading ? "Loading" : (<>
                            {data.map(item => (
                                <SearchItem item={item} key={item._id} />
                            ))}
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List