import React from "react";
import { useUserProfile } from "../contexts/UserProfileContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function UserProfileEdit() {
    const { user, updateUser } = useUserProfile();
    const navigate = useNavigate();

    if (!user) {
        return <p>Loading...</p>
    }

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateUser({
            ...user,
            [name]: value,
        });
    };

    // Handle submission for User Profile form
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        alert("User Profile Updated!");
    };

    // Handle submission for User Details form
    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        alert("User Details Updated!");
    };

    return (
        <div className="profile-page">

            {/* User Profile Form, change code to support img upload */}
            <form onSubmit={handleProfileSubmit}>
                <h2>User Profile</h2>

                <div className="profile-pic-container">
                    <img src={user.profilePic} alt="Profile" className="profile-pic" />
                </div>

                <label>Profile Picture URL:</label>
                <input
                    type="text"
                    name="profilePic"
                    value={user.profilePic}
                    onChange={handleInputChange}
                />

                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    required
                />

                <label>Business Unit:</label>
                <input
                    type="text"
                    name="businessUnit"
                    value={user.businessUnit}
                    disabled
                />
                <button type="submit">Save Profile</button>
            </form>

            {/* Directs user to admin only area */}
            <button onClick={() => Navigate('/admin')}>Admin Tasks</button>

            {/* User Details Form */}
            <form onSubmit={handleDetailsSubmit}>
                <div className="email-container">
                    <h2>My Details</h2>

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                    />

                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        required
                    />

                    <label>User Access:</label>
                    <input type="text" 
                    name="userAccess" 
                    value={user.userAccess} disabled />

                    <label>Password:</label>
                    <input type="password" 
                    name="password" 
                    value={user.password} disabled />

                    <label>Change Password:</label>
                    <input
                        type="password"
                        name="changePassword"
                        value={user.changePassword}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Save Details</button>
            </form>

            {/* My Tasks Section */}
            <div className="class-container">
                <h2>My Tasks</h2>

                <div className="task-item">
                    <h3>Current Posts:</h3>
                    {user.myTasks.currentPosts.length > 0 ? (
                        <ul>
                            {user.myTasks.currentPosts.map((post, index) => (
                                <li key={index}>{post}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No current posts</p>
                    )}
                </div>

                <div className="task-item">
                    <h3>Past Posts:</h3>
                    {user.myTasks.pastPosts.length > 0 ? (
                        <ul>
                            {user.myTasks.pastPosts.map((post, index) => (
                                <li key={index}>{post}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No past posts</p>
                    )}
                </div>
            </div>
        </div>
    );
}
