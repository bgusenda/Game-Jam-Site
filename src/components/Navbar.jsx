import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const pageData = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Demo",
            path: "/game-demo"
        }
    ]
    
    return (
        <div className="navbar-div container row jc-center ai-center">
            {pageData.map((page) => {
                return (
                    <Link className="nav-link" to={page.path} key={page.path}>
                        <button className="nav-button">
                            {page.name}
                        </button>
                    </Link>
                )
            })}
        </div>
    )
}