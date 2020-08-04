import { useAuth } from "../customHooks/index";
import { withRouter } from "react-router-dom";

const withAuth = (props) => useAuth(props) && props.children;

export default withRouter(withAuth);
