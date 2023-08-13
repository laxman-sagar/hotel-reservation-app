import Featured from "../../components/featured/Featured"
import FeaturedProperties from "../../components/featuredproperties/FeaturedProperties"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import MailList from "../../components/maillist/MailList"
import Navbar from "../../components/navbar/Navbar"
import PropertyList from "../../components/propertylist/PropertyList"
import "./home.css"

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <div className="home-container">
                <Featured />
                <h1 className="home-title">Browse by property type</h1>
                <PropertyList />
                <h1 className="home-title">Home Guests Love</h1>
                <FeaturedProperties />
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default Home