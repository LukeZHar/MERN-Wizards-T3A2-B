// Testing file
import { useUserAuthContext } from "../contexts/UserAuthContext";

export function useUserDetails() {
    const [token] = useUserAuthContext(); // Get token from context

    console.log("Token from context:", token); // Debug purpose

    const decodeToken = (token) => {
        if (!token) { 
            console.warn("No token found.");
            return { userId: null, userClass: "Regular User" };
        }

        try {
            // Split the JWT into 3 parts: Header, Payload, Signature
            const parts = token.split(".");
            if (parts.length !== 3) {
                console.error("Invalid token format.");
                return { userId: null, userClass: "Regular User" };
            }

            // Decode the Payload (Base64 to JSON)
            const payload = JSON.parse(atob(parts[1]));

            console.log("Decoded token:", payload); // Debugging log

            return {
                userId: payload.userId || null,
                userClass: payload.userClass || "Regular User"
            };
        } catch (error) {
            console.error("Error decoding token:", error);
            return { userId: null, userClass: "Regular User" };
        }
    };

    return decodeToken(token);
};

export default useUserDetails;
