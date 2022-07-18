/* eslint-disable */
import { Link, useLocation } from "react-router-dom";

export default props => {
    const location = useLocation();
    const { pathname } = location;
    const exact = pathname === props.to;
    let className = "";
    if (exact) className = "subitem-active"
    return (
        <li className="nav-item">
            <Link className={"nav-link " + className} to={props.to}>
                <i className="ti-control-record" />
                { props.label }
            </Link>
        </li>
    )
}