import useFetch from "../../hooks/useFetch"
import "./featured.css"

const Featured = () => {

    const { data, loading, err } = useFetch('https://backend-bookiiing.onrender.com/api/hotels/countByCity?cities=Warangal,Hyderabad,Yadagirigutta');
    return (
        <div className="featured">
            {loading ? "Loading please wait" : <><div className="featured-item">
                <img src="https://economictimes.indiatimes.com/thumb/msid-84752138,width-1200,height-900,resizemode-4,imgsize-470204/a-view-of-the-ramappa-temple-at-palampet-village-in-mulugu-district-.jpg?from=mdr" alt="" className="featured-img" />
                <div className="featured-titles">
                    <h1>Warangal</h1>
                    <h2>{data[0]} Properties</h2>
                </div>
            </div>
                <div className="featured-item">
                    <img src="https://pbs.twimg.com/media/FPVKp3KakAE7iqN.jpg"
                        alt="" className="featured-img" />
                    <div className="featured-titles">
                        <h1>Hyderabad</h1>
                        <h2>{data[1]} Properties</h2>
                    </div>
                </div>
                <div className="featured-item">
                    <img src="https://cdn.telanganatoday.com/wp-content/uploads/2021/10/Yadadri-temple.jpg" alt="" className="featured-img" />
                    <div className="featured-titles">
                        <h1>Yadagirigutta</h1>
                        <h2>{data[2]} Properties</h2>
                    </div>
                </div></>}
        </div>
    )
}

export default Featured