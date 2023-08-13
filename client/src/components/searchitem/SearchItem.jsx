import { Link } from 'react-router-dom';
import './searchitem.css'

const SearchItem = ({ item }) => {
    return (
        <div className="search-item">
            <img
                src={item.photos[0]}
                alt=""
                className="search-item-img"
            />
            <div className="search-item-desc">
                <h1 className="search-item-title">{item.name}</h1>
                <span className="search-item-distance">{item.distance}m from center</span>
                <span className="search-item-taxiop">Free airport taxi</span>
                <span className="search-item-subtitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="search-item-features">
                    Entire studio • 1 bathroom • 21m² 1 full bed
                </span>
                <span className="search-item-cancelop">Free cancellation </span>
                <span className="search-item-cancelopsubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="search-item-details">
                {item.rating && <div className="search-item-rating">
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>}
                <div className="search-item-detailtexts">
                    <span className="search-item-price">Rs.{item.cheapestPrice}</span>
                    <span className="search-item-d-taxiop">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="search-item-checkbutton">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItem;