import React, { useState, useEffect, useContext, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../../styles/signup.css";

import { Context } from "../store/appContext";
import Swal from 'sweetalert2'


export const SignUp = () => {
    const { store, actions } = useContext(Context);
	const navigate = useNavigate();

    const [dataSignUp,setDataSignUp] = useState({
		email: "angel@gmail.com",
		name: "angel",
		phone_number: "999123456",
		password: "123456",
		role: store.roles.CLIENT
	})


    const handleChangeData = (e) => {
        setDataSignUp({ ...dataSignUp, [e.target.name]: e.target.value });
    }

    const sendSignUp = async (e) => {		
		e.preventDefault() 
		try{
			await actions.signup(dataSignUp)
            if(localStorage.getItem("user_created"))
                Swal.fire({
                    icon: "success",
                    title: "Bienvenido",
                    text: "!Cuenta creada!",
                }).then(async (result) => {
                    
                    let dataLogin = {
                        "email": dataSignUp.email,
                        "password": dataSignUp.password,
                    }

                    await actions.login(dataLogin,false)
                    localStorage.removeItem("user_created");
                    if(localStorage.getItem("token"))
                    navigate("/")

            });

		}catch(e){
			console.error(e);
		}
	}


    return (
        <div className="container">
            <form onSubmit={sendSignUp} className="form-signup">
                    <div className="text-center justify-content-center align-items-center">
                        <div className="div-logo"><svg onClick={()=>navigate("/login")} width="150" height="117" viewBox="0 0 217 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.485 112.92C1.09833 112.067 0.351667 111.213 0.245 110.36C0.138333 109.613 0.405 108.12 1.045 105.88C0.938334 104.493 0.991667 103.213 1.205 102.04C1.525 100.867 1.73833 100.067 1.845 99.64C2.37833 99.64 2.69833 99.32 2.805 98.68C2.91167 98.04 2.965 97.5067 2.965 97.08C2.965 96.2267 3.285 94.7867 3.925 92.76C4.67167 90.7333 5.31167 88.6533 5.845 86.52C6.69833 84.3867 7.49833 82.4133 8.245 80.6C9.09833 78.68 9.525 77.5067 9.525 77.08C9.525 76.2267 9.73833 75.3733 10.165 74.52C10.5917 73.56 11.0717 72.6533 11.605 71.8C12.1383 70.52 12.5117 69.1333 12.725 67.64C13.045 66.04 13.205 64.8133 13.205 63.96C13.845 62.5733 14.5383 61.08 15.285 59.48C16.0317 57.88 16.6183 56.2267 17.045 54.52C17.685 52.7067 18.5917 50.0933 19.765 46.68C21.045 43.16 22.3783 39.5867 23.765 35.96C24.725 33.9333 25.685 31.8 26.645 29.56C27.605 27.32 28.4583 25.4 29.205 23.8C29.9517 22.2 30.485 21.4 30.805 21.4C30.805 21.4 30.805 21.24 30.805 20.92C30.805 20.4933 30.805 20.0667 30.805 19.64C30.805 19.1067 31.2317 18.0933 32.085 16.6C32.9383 15 33.7383 13.3467 34.485 11.64C35.5517 10.04 36.2983 8.54667 36.725 7.16C37.1517 5.66666 37.365 4.92 37.365 4.92C37.365 4.92 37.525 4.6 37.845 3.95999C38.2717 3.31999 38.6983 2.78666 39.125 2.35999C40.5117 1.39999 41.7917 1.02666 42.965 1.24C44.245 1.45333 45.3117 2.46666 46.165 4.28C47.0183 5.98666 47.3917 7.42666 47.285 8.6C47.1783 9.66666 46.6983 10.84 45.845 12.12C44.9917 14.04 43.8717 16.4933 42.485 19.48C41.0983 22.36 39.605 25.5067 38.005 28.92C36.5117 32.2267 35.0717 35.4267 33.685 38.52C32.405 41.5067 31.3383 44.12 30.485 46.36C29.7383 48.4933 29.365 49.8267 29.365 50.36L22.805 66.52C22.805 66.7333 22.5917 67.2667 22.165 68.12C21.845 68.9733 21.365 70.2533 20.725 71.96C20.1917 73.6667 19.4983 75.9067 18.645 78.68C17.7917 81.4533 16.7783 84.8133 15.605 88.76C13.4717 95.5867 11.8183 100.92 10.645 104.76C9.47167 108.493 8.51167 111.053 7.765 112.44C7.125 113.933 6.43167 114.68 5.685 114.68C5.25833 114.68 4.77833 114.467 4.245 114.04C3.81833 113.72 3.23167 113.347 2.485 112.92ZM58.965 114.2C58.005 114.307 56.6717 113.827 54.965 112.76C53.365 111.8 51.605 110.573 49.685 109.08C47.8717 107.587 46.1117 106.04 44.405 104.44C42.805 102.84 41.525 101.453 40.565 100.28C38.8583 97.8267 36.725 94.6267 34.165 90.68C31.605 86.6267 29.685 82.3067 28.405 77.72C27.6583 74.3067 26.9117 71.64 26.165 69.72C25.4183 67.6933 24.9383 66.04 24.725 64.76L24.885 53.56L33.045 56.12C33.5783 61.88 34.3783 66.68 35.445 70.52C36.6183 74.2533 38.005 77.56 39.605 80.44C40.885 83.2133 42.325 85.9867 43.925 88.76C45.525 91.4267 47.2317 93.6667 49.045 95.48C51.4983 98.1467 53.685 100.12 55.605 101.4C57.525 102.68 58.965 103.32 59.925 103.32C60.4583 103.427 61.205 103.8 62.165 104.44C63.2317 105.08 64.1917 105.773 65.045 106.52C66.005 107.16 66.5383 107.8 66.645 108.44C66.7517 108.76 66.805 109.24 66.805 109.88C66.805 110.627 66.6983 111.267 66.485 111.8C66.3783 112.44 66.2183 112.92 66.005 113.24C65.685 113.987 65.0983 114.627 64.245 115.16C63.4983 115.8 61.7383 115.48 58.965 114.2ZM23.125 54.84L34.805 46.36C35.125 46.04 36.245 44.9733 38.165 43.16C40.1917 41.3467 43.4983 38.7333 48.085 35.32L67.765 19.32C70.4317 17.9333 73.1517 16.1733 75.925 14.04C78.805 11.9067 80.9917 10.36 82.485 9.4C84.2983 8.12 85.8983 6.99999 87.285 6.03999C88.6717 5.07999 89.5783 4.65333 90.005 4.75999C90.8583 4.33333 91.7117 4.49333 92.565 5.23999C93.525 5.87999 94.2717 6.78666 94.805 7.96C95.445 9.02666 95.7117 9.98666 95.605 10.84C95.8183 11.9067 95.605 12.8133 94.965 13.56C94.325 14.3067 92.7783 15.3733 90.325 16.76C88.2983 17.72 86.485 18.68 84.885 19.64C83.3917 20.6 82.485 21.4 82.165 22.04C82.165 22.04 81.1517 22.84 79.125 24.44C77.205 25.9333 74.6983 27.7467 71.605 29.88C67.3383 32.6533 63.6583 35.2667 60.565 37.72C57.5783 40.1733 55.6583 42.04 54.805 43.32C54.3783 43.32 53.9517 43.48 53.525 43.8C53.205 44.12 52.8317 44.2267 52.405 44.12C52.405 44.12 51.9783 44.3867 51.125 44.92C50.3783 45.4533 49.7917 45.9867 49.365 46.52C49.1517 47.0533 48.6717 47.8 47.925 48.76C47.285 49.72 46.4317 50.1467 45.365 50.04C44.6183 50.4667 43.285 51.3733 41.365 52.76C39.445 54.04 37.4183 55.48 35.285 57.08C33.2583 58.68 31.4983 60.12 30.005 61.4C28.5117 62.68 27.7117 63.4267 27.605 63.64L23.125 54.84ZM111.521 106.68C110.455 105.613 109.388 104.173 108.321 102.36C107.255 100.44 106.401 98.2533 105.761 95.8C105.548 94.9467 105.441 93.7733 105.441 92.28C105.548 90.7867 105.548 89.72 105.441 89.08C105.121 89.8267 104.588 90.6267 103.841 91.48C103.201 92.2267 102.561 92.8667 101.921 93.4C101.495 93.8267 100.535 94.68 99.0413 95.96C97.5479 97.1333 96.0546 98.0933 94.5613 98.84C91.0413 101.08 88.1079 102.307 85.7613 102.52C83.5213 102.733 81.3879 101.56 79.3613 99C77.6546 97.6133 76.4279 96.0667 75.6813 94.36C75.0413 92.6533 75.0413 90.3067 75.6813 87.32C75.8946 83.5867 76.4279 79.96 77.2812 76.44C78.1346 72.8133 79.8946 68.0133 82.5613 62.04C84.8013 57.6667 86.5079 54.4667 87.6813 52.44C88.8546 50.3067 89.6013 49.0267 89.9213 48.6C91.5213 48.0667 92.8546 48.12 93.9213 48.76C94.9879 49.2933 95.6279 50.3067 95.8413 51.8C96.4813 52.8667 96.3746 54.68 95.5213 57.24C94.7746 59.8 93.4413 62.9467 91.5213 66.68C90.0279 70.3067 88.6413 73.9333 87.3613 77.56C86.1879 81.1867 85.4946 84.28 85.2813 86.84C85.0679 89.4 85.7079 90.9467 87.2013 91.48C88.1613 92.0133 89.8146 91.8533 92.1613 91C94.6146 90.1467 97.3346 88.0133 100.321 84.6C103.415 81.1867 106.401 76.0133 109.281 69.08C110.135 66.9467 110.775 65.08 111.201 63.48C111.628 61.7733 111.895 59.9067 112.001 57.88C111.788 56.6 111.841 55.48 112.161 54.52C112.588 53.4533 113.441 52.5467 114.721 51.8C115.148 51.2667 115.735 50.7867 116.481 50.36C117.228 49.8267 117.708 49.8267 117.921 50.36L120.481 50.2C120.908 50.0933 121.175 50.36 121.281 51C121.495 51.5333 121.868 52.0133 122.401 52.44C123.575 53.4 123.895 55.48 123.361 58.68C122.828 61.88 121.335 66.36 118.881 72.12C116.855 76.4933 115.468 79.8 114.721 82.04C114.081 84.28 113.708 86.4667 113.601 88.6C113.601 90.52 113.975 92.3333 114.721 94.04C115.468 95.7467 116.641 97.2933 118.241 98.68C119.415 99.4267 120.055 100.28 120.161 101.24C120.375 102.2 120.428 103.32 120.321 104.6C120.108 105.56 119.468 106.36 118.401 107C117.441 107.533 116.321 107.8 115.041 107.8C113.761 107.8 112.588 107.427 111.521 106.68ZM142.26 107.64C140.233 106.787 138.313 105.667 136.5 104.28C134.687 102.787 133.513 101.56 132.98 100.6C132.98 99.64 133.14 99 133.46 98.68C133.78 98.2533 134.687 98.0933 136.18 98.2C137.78 98.2 140.34 98.4133 143.86 98.84C145.14 98.84 146.74 98.7333 148.66 98.52C150.58 98.3067 152.34 97.9867 153.94 97.56C155.647 97.1333 156.607 96.6 156.82 95.96C157.353 95.96 157.46 95.8 157.14 95.48C156.82 95.0533 156.447 94.6267 156.02 94.2C155.593 94.2 155.113 94.04 154.58 93.72C154.047 93.2933 153.567 93.08 153.14 93.08C153.14 92.5467 152.607 91.96 151.54 91.32C150.58 90.5733 149.567 89.9867 148.5 89.56C146.153 87.64 144.127 85.9333 142.42 84.44C140.713 82.84 140.073 81.7733 140.5 81.24C140.5 80.8133 140.5 80.6 140.5 80.6C140.5 80.4933 140.5 80.44 140.5 80.44C139.753 80.44 138.9 79.3733 137.94 77.24C137.087 75.1067 136.66 73.1867 136.66 71.48C136.66 70.2 137.033 68.6 137.78 66.68C138.527 64.6533 139.54 62.5733 140.82 60.44C142.1 58.3067 143.433 56.5467 144.82 55.16C146.74 53.3467 149.14 51.4267 152.02 49.4C154.9 47.2667 157.727 45.4 160.5 43.8C163.38 42.0933 165.78 40.9733 167.7 40.44C169.62 39.6933 171.38 39.32 172.98 39.32C174.687 39.32 176.18 39.6933 177.46 40.44C178.527 40.9733 179.487 41.7733 180.34 42.84C181.3 43.8 182.1 44.8133 182.74 45.88C183.487 46.84 183.967 47.6933 184.18 48.44C184.18 49.72 184.073 51.16 183.86 52.76C183.647 54.2533 183.327 55.5867 182.9 56.76C182.58 57.9333 182.047 58.52 181.3 58.52C181.3 58.52 181.14 58.5733 180.82 58.68C180.607 58.68 180.5 58.9467 180.5 59.48C180.5 60.5467 179.7 61.7733 178.1 63.16C176.073 64.5467 174.313 65.4 172.82 65.72C171.327 65.9333 170.42 65.3467 170.1 63.96C169.78 63.5333 169.567 63.16 169.46 62.84C169.353 62.52 169.087 62.36 168.66 62.36C168.66 62.36 168.5 62.2 168.18 61.88C167.86 61.56 167.7 61.0267 167.7 60.28C167.7 59.8533 167.86 59.48 168.18 59.16C168.5 58.7333 168.66 58.52 168.66 58.52C169.193 58.52 169.887 57.9333 170.74 56.76C171.593 55.48 172.34 54.1467 172.98 52.76C173.727 51.2667 174.1 50.2533 174.1 49.72C174.1 49.08 173.993 48.7067 173.78 48.6C173.673 48.4933 173.193 48.44 172.34 48.44C170.847 49.08 169.033 49.9333 166.9 51C164.767 52.0667 162.74 53.1333 160.82 54.2C159.007 55.16 157.673 56.0667 156.82 56.92C156.393 57.6667 156.127 58.1467 156.02 58.36C155.913 58.4667 155.647 58.52 155.22 58.52C155.22 58.0933 154.847 58.3067 154.1 59.16C153.46 59.9067 152.607 60.9733 151.54 62.36C150.58 63.7467 149.62 65.1333 148.66 66.52C147.807 67.8 147.167 68.76 146.74 69.4C146.527 69.6133 146.26 70.2533 145.94 71.32C145.727 72.28 145.62 73.1867 145.62 74.04C145.193 75.32 145.247 76.2267 145.78 76.76C146.313 77.1867 147.487 78.1467 149.3 79.64C153.033 82.4133 155.967 84.7067 158.1 86.52C160.233 88.3333 161.833 89.8267 162.9 91C163.967 92.1733 164.607 93.24 164.82 94.2C166.74 97.4 167.327 99.8533 166.58 101.56C165.833 103.267 164.02 104.76 161.14 106.04C160.073 106.573 158.313 107 155.86 107.32C153.407 107.64 150.9 107.8 148.34 107.8C145.78 107.907 143.753 107.853 142.26 107.64ZM195.031 102.04C193.431 101.827 192.045 100.707 190.871 98.68C189.805 96.5467 189.165 94.6267 188.951 92.92C189.058 92.0667 189.165 90.84 189.271 89.24C189.485 87.64 189.698 85.9867 189.911 84.28C190.338 82.2533 190.925 79.8 191.671 76.92C192.418 73.9333 193.165 70.9467 193.911 67.96C194.765 64.9733 195.511 62.4133 196.151 60.28C196.791 58.1467 197.218 56.8667 197.431 56.44C197.965 55.5867 198.818 55.3733 199.991 55.8C201.165 56.2267 202.125 56.8667 202.871 57.72C203.511 58.5733 203.885 59.5867 203.991 60.76C204.205 61.9333 204.045 63.64 203.511 65.88C203.085 68.12 202.231 71.4267 200.951 75.8C199.778 80.0667 198.871 83.5333 198.231 86.2C197.698 88.76 197.485 91.48 197.591 94.36C197.165 97.9867 196.845 100.227 196.631 101.08C196.418 101.827 195.885 102.147 195.031 102.04ZM213.431 38.2C213.005 38.52 212.578 38.68 212.151 38.68C211.831 38.5733 211.245 38.2533 210.391 37.72C209.645 37.6133 208.685 37.1333 207.511 36.28C206.445 35.32 205.485 34.36 204.631 33.4C203.885 32.3333 203.511 31.6933 203.511 31.48C203.405 30.4133 203.458 29.08 203.671 27.48C203.991 25.7733 204.578 24.28 205.431 23C206.285 21.6133 207.511 20.8667 209.111 20.76C209.538 20.76 209.911 20.8133 210.231 20.92C210.551 21.0267 211.511 21.4 213.111 22.04C213.965 23.64 214.818 25.4533 215.671 27.48C216.525 29.4 216.898 31.32 216.791 33.24C216.685 35.0533 215.565 36.7067 213.431 38.2Z" fill="#F44322"/>
                        </svg>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 37 38" fill="none">
                                <path d="M18.5 19C23.6106 19 27.75 14.7487 27.75 9.5C27.75 4.25125 23.6106 0 18.5 0C13.3894 0 9.25 4.25125 9.25 9.5C9.25 14.7487 13.3894 19 18.5 19ZM18.5 23.75C12.3256 23.75 0 26.9325 0 33.25V35.625C0 36.9313 1.04062 38 2.3125 38H34.6875C35.9594 38 37 36.9313 37 35.625V33.25C37 26.9325 24.6744 23.75 18.5 23.75Z" fill="#6E6969"/>
                                </svg>
                            </div>
                            <div><input autoFocus className="inputLogin" placeholder="Ingresa tu nombre" type="text"  name="name" id="inputName" value={dataSignUp.name} onChange={handleChangeData} required /></div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 34 44" fill="none">
                                <path d="M27.4615 0H6.53846C2.92923 0 0 2.24 0 5V39C0 41.76 2.92923 44 6.53846 44H27.4615C31.0708 44 34 41.76 34 39V5C34 2.24 31.0708 0 27.4615 0ZM17 42C14.8292 42 13.0769 40.66 13.0769 39C13.0769 37.34 14.8292 36 17 36C19.1708 36 20.9231 37.34 20.9231 39C20.9231 40.66 19.1708 42 17 42ZM28.7692 34H5.23077V6H28.7692V34Z" fill="#6E6969"/>
                                </svg>
                            </div>
                            <div><input className="inputLogin" placeholder="Ingresa tu celular" type="text"  name="phone_number" id="inputPhone" value={dataSignUp.phone_number} onChange={handleChangeData} required/></div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div><svg width="30" height="30" viewBox="0 0 49 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M41.8871 0H7.1129C5.22709 0.00205137 3.41911 0.737595 2.08563 2.04525C0.752157 3.35291 0.00209187 5.12589 0 6.9752V28.0248C0 31.8705 3.19132 35 7.1129 35H41.8871C45.8087 35 49 31.8705 49 28.0248V6.9752C49 3.12954 45.8087 0 41.8871 0ZM39.7848 4.65013L37.6035 6.33968L25.97 15.3454C25.1006 16.012 23.8994 16.012 23.03 15.3454L11.8074 6.64969L9.2199 4.65013H39.7848ZM41.8871 30.3499H7.1129C5.80571 30.3499 4.74194 29.3067 4.74194 28.0248V7.12245L20.09 19.0035C21.3861 20.0111 22.951 20.5071 24.5 20.5071C26.049 20.5071 27.6139 20.0111 28.91 19.0035L44.2581 7.1271V28.0248C44.2581 29.3067 43.1943 30.3499 41.8871 30.3499Z" fill="#6E6969"/>
                                </svg>
                            </div>
                            <div><input className="inputLogin" placeholder="Ingresa tu correo" type="email"  name="email" id="inputEmail" value={dataSignUp.email} onChange={handleChangeData}  required /></div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div>
                            <svg width="30" height="30" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.2 40H40.8C42.7096 40 44.5409 39.398 45.8912 38.3263C47.2414 37.2547 48 35.8012 48 34.2857V17.1429C48 15.6273 47.2414 14.1739 45.8912 13.1022C44.5409 12.0306 42.7096 11.4286 40.8 11.4286H36V9.52381C36 6.99794 34.7357 4.57552 32.4853 2.78946C30.2348 1.0034 27.1826 0 24 0C20.8174 0 17.7652 1.0034 15.5147 2.78946C13.2643 4.57552 12 6.99794 12 9.52381V11.4286H7.2C5.29044 11.4286 3.45909 12.0306 2.10883 13.1022C0.75857 14.1739 0 15.6273 0 17.1429V34.2857C0 35.8012 0.75857 37.2547 2.10883 38.3263C3.45909 39.398 5.29044 40 7.2 40ZM16.8 9.52381C16.8 8.00829 17.5586 6.55484 18.9088 5.4832C20.2591 4.41156 22.0904 3.80952 24 3.80952C25.9096 3.80952 27.7409 4.41156 29.0912 5.4832C30.4414 6.55484 31.2 8.00829 31.2 9.52381V11.4286H16.8V9.52381ZM4.8 17.1429C4.8 16.6377 5.05286 16.1532 5.50294 15.796C5.95303 15.4388 6.56348 15.2381 7.2 15.2381H40.8C41.4365 15.2381 42.047 15.4388 42.4971 15.796C42.9471 16.1532 43.2 16.6377 43.2 17.1429V34.2857C43.2 34.7909 42.9471 35.2754 42.4971 35.6326C42.047 35.9898 41.4365 36.1905 40.8 36.1905H7.2C6.56348 36.1905 5.95303 35.9898 5.50294 35.6326C5.05286 35.2754 4.8 34.7909 4.8 34.2857V17.1429Z" fill="#6E6969"/>
                                <path d="M23.9997 29.5238C26.6507 29.5238 28.7997 27.8183 28.7997 25.7143C28.7997 23.6104 26.6507 21.9048 23.9997 21.9048C21.3487 21.9048 19.1997 23.6104 19.1997 25.7143C19.1997 27.8183 21.3487 29.5238 23.9997 29.5238Z" fill="#6E6969"/>
                                </svg>
                            </div>
                            <div><input className="inputLogin" placeholder="Crea tu contraseña" type="password" 
                             name="password" id="inputPassword" value={dataSignUp.password} onChange={handleChangeData}  required /></div>
                        </div>
                        <div className="d-flex text-center justify-content-center align-items-center">
                            <button type="submit">Registrar</button>
                        </div>
                        <div className="d-flex text-center justify-content-center align-items-center">
                            <div className="div-text">¿Ya tienes una cuenta?</div>
                            <div className="div-link"><Link to="/login" className="div-link"><span className="span">Inicia Sesión</span></Link></div>
                        </div>
                    </div>
            </form>
        </div>
    )
}