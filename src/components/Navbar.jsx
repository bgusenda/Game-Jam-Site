import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation();
    console.log(location.pathname);

    const actualPage = location.pathname;

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
                        <button className={actualPage === page.path ? "nav-button opened" : "nav-button"}>
                            {page.name}
                        </button>
                    </Link>
                )
            })}
        </div>
    )
}