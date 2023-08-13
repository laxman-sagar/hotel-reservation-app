import "./mailList.css"

const MailList = () => {
    return (
        <div className="mail">
            <h1 className="mail-title">Save time, Save money</h1>
            <span>Best deals land in your mail-list</span>
            <div className="mail-input-container">
                <input type="email" className="mail-mail" placeholder="Your Email" />
                <button>Subscribe</button>
            </div>
        </div>
    )
}

export default MailList