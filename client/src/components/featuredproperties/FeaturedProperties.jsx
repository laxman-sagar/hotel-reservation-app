import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css"

const FeaturedProperties = () => {
    const { data, loading, error } = useFetch("https://backend-bookiiing.onrender.com/api/hotels?featured=true&limit=4");

    return (
        <div className="featured-properties">
            {loading ? "loading please wait" : <>
                {data.map((item) => (

                    <div className="featured-prop-item" key={item._id}>
                        <img src={item.photos[0]} alt="" className="featured-prop-img" />
                        <span className="featured-prop-name">{item.name}</span>
                        <span className="featured-prop-city">{item.city}</span>
                        <span className="featured-prop-price">starting from Rs.{item.cheapestPrice}</span>
                        {item.rating && <div className="featured-prop-rating">
                            <button>{item.rating}</button>
                            <span>Excellent</span>
                        </div>}
                    </div>
                ))}
            </>}
        </div>
    )
}
export default FeaturedProperties