import { useAuth } from "../components/Auth";
import { useNavigate } from "react-router-dom"; 

const Profile = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate("/login");
    };

    return (
        <div>
            <h1>Welcome {auth.user?.id}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

