import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import './Register.css';


const RegisterPage = () => {
    const { registerUser } = useContext(AuthContext);
    const defaultValues = { userName: "", email: "", password: "" };
    const [formData, handleInputChange, handleSubmit] = useCustomForm(
        defaultValues,
        registerUser
    );

    return (
        <div className="register">
            <form className="register__form" onSubmit={handleSubmit}>
                <label>
                    UserName:{" "}
                    <input
                        type="text"
                        name="userName"
                        placeholder=""
                        value={formData.userName}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email:{" "}
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Password:{" "}
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "20%",
                    }}
                >
                </label>
                <button className="register__button" type="submit">Register!</button>
            </form>
        </div>
    );
};


export default RegisterPage;
