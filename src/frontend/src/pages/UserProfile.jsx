import React, { useState } from "react";
import { useUserProfile } from "../contexts/UserProfileContext";

export default function UserProfile() {
    const { user, updateUser } = useUserProfile();


    return (
        <div>
            

            <div>
                <h2>My Tasks</h2>
                <label>Current Posts:</label>
                <input type="text" value={user.myTasks.currentPosts.length > 0 ? user.myTasks.currentPosts.join(", ") : "No current posts"}  />

                <label>Past Posts:</label>
                <input type="text" value={user.myTasks.pastPosts.length > 0 ? user.myTasks.pastPosts.join(", ") : "No past posts"} />
            </div>
        </div>
    );
}
