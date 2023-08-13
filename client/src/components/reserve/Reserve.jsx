import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./reserve.css"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../../hooks/useFetch"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Reserve = ({ setOpen, hotelId }) => {
    const { data, loading, err } = useFetch(`/hotels/room/${hotelId}`);
    const [selectedrooms, setSelectedrooms] = useState([]);
    const { dates } = useContext(SearchContext);
    const navigate = useNavigate();


    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        let dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
    console.log(allDates);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date =>
            allDates.includes(new Date(date).getTime())
        );
        return !isFound;
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedrooms(checked ? [...selectedrooms, value] : selectedrooms.filter(item => item !== value));
        console.log(selectedrooms)
    }

    const handleClick = async () => {
        try {
            await Promise.all(selectedrooms.map(roomid => {
                const res = axios.put(`/rooms/availability/${roomid}`, {
                    dates: allDates,
                });
                return res.data;
            }));
            setOpen(false);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="reserve">
            <div className="reserve-container">
                <FontAwesomeIcon icon={faCircleXmark} className="reserve-close" onClick={() => setOpen(false)} />
                <span>Select your rooms:</span>

                {data.map((item) => (
                    <div className="reserve-item" key={item._id}>
                        <div className="reserve-item-info">
                            <div className="reserve-title">{item.title}</div>
                            <div className="reserve-desc">{item.desc}</div>
                            <div className="reserve-max">Max People: <b>{item.maxPeople}</b></div>
                            <div className="reserve-rice">{item.price}</div>
                        </div>
                        <div className="reserve-selectedrooms">
                            {item.roomNumbers.map(roomNumber => (
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNumber)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="reserve-button">
                    Reserve Now!
                </button>
            </div>
        </div>
    )
}

export default Reserve