"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Mail, Eye, EyeOff, User, Phone } from "lucide-react";
import Items from "@/app/utils/items";

export default function AuthFlow() {
    const router = useRouter();
    const [active, setActive] = useState("signin");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1);
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const getPasswordStrength = (pass: string) => {
        if (!pass) return 0;
        let strength = 0;
        if (pass.length > 6) strength += 20;
        if (/[A-Z]/.test(pass)) strength += 20;
        if (/[a-z]/.test(pass)) strength += 20;
        if (/[0-9]/.test(pass)) strength += 20;
        if (/[^A-Za-z0-9]/.test(pass)) strength += 20;
        return strength;
    };

    const strength = getPasswordStrength(newPassword);
    const strengthColor = strength <= 40 ? "bg-red-500" : strength <= 70 ? "bg-yellow-500" : "bg-green-500";
    const strengthText = strength <= 40 ? "Weak" : strength <= 70 ? "Medium" : "Strong";

    return (
        <div className=" w-full min-h-screen flex items-center justify-center p-4 md:p-6">

            <div className="w-full overflow-hidden min-h-[90vh] md:h-[94vh] grid grid-cols-1 lg:grid-cols-2">

                <div className="relative bg-[#DDDCE9] rounded-xl shadow-lg p-6 md:p-10 hidden lg:flex flex-col justify-between">

                    <div className="flex items-end justify-center flex-1">
                        <div className="w-full h-full lg:h-[50vh] rounded-2xl flex items-center justify-center text-gray-400">
                            <Items active={active}></Items>
                        </div>
                    </div>

                    <div className="mt-8 mb-4 text-center">
                        <h2 className="text-[22px] font-semibold text-[#2D2A4A]">
                            Hello! Welcome to XpertMed. 👋
                        </h2>
                        <p className="text-[20px] text-gray-600 mt-1">
                            Doctor Appointment Scheduling Made Easy
                        </p>
                    </div>


                    <div className="flex justify-center items-center gap-2 mt-6 mb-4">
                        <span className="h-2 w-2 rounded-full bg-gray-300" />
                        <span className="h-2 w-2 rounded-full bg-[#432C81]" />
                        <span className="h-2 w-2 rounded-full bg-gray-300" />
                    </div>


                    <div className="flex justify-center gap-3 mt-12 mb-6">
                        <button className="h-12 w-12 rounded bg-white shadow flex items-center justify-center">
                            <ArrowLeft size={28} />
                        </button>
                        <button className="h-12 w-12 rounded bg-white shadow flex items-center justify-center">
                            <ArrowRight size={28} />
                        </button>
                    </div>
                </div>


                {active === "signin" && <div className="p-6 md:p-10 lg:p-20 flex flex-col justify-center bg-white rounded-xl lg:rounded-none shadow-lg lg:shadow-none">

                    <div className="mb-10">
                        <div className="inline-flex items-center justify-center px-10 py-2 bg-black text-white rounded text-lg font-semibold">
                            Logo
                        </div>
                    </div>


                    <div className="mb-10">
                        <h1 className="text-2xl font-medium  text-[#2D2A4A]">
                            Let’s Sign In.
                        </h1>
                        <p className="text-md text-gray-600  mt-1">
                            Experience AI Health Assistant for everyone.
                        </p>
                    </div>


                    <div className="space-y-5">

                        <div className="space-y-1 ">
                            <label className="text-md font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative ">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="dco@gmail.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-400 text-black  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#432C81]"
                                />
                            </div>
                        </div>


                        <div className="space-y-2">
                            <label className="text-md font-medium  text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-black" width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 12.25C13.2646 12.2502 12.5538 12.5151 11.9975 12.9963C11.4413 13.4774 11.0768 14.1426 10.9706 14.8703C10.8644 15.5981 11.0237 16.3397 11.4193 16.9597C11.8148 17.5797 12.4203 18.0367 13.125 18.247V20.125C13.125 20.3571 13.2172 20.5796 13.3813 20.7437C13.5454 20.9078 13.7679 21 14 21C14.2321 21 14.4546 20.9078 14.6187 20.7437C14.7828 20.5796 14.875 20.3571 14.875 20.125V18.247C15.5797 18.0367 16.1852 17.5797 16.5807 16.9597C16.9763 16.3397 17.1356 15.5981 17.0294 14.8703C16.9232 14.1426 16.5587 13.4774 16.0025 12.9963C15.4462 12.5151 14.7354 12.2502 14 12.25ZM14 16.625C13.7404 16.625 13.4867 16.548 13.2708 16.4038C13.055 16.2596 12.8867 16.0546 12.7874 15.8148C12.6881 15.5749 12.6621 15.311 12.7127 15.0564C12.7634 14.8018 12.8884 14.568 13.0719 14.3844C13.2555 14.2009 13.4893 14.0759 13.7439 14.0252C13.9985 13.9746 14.2624 14.0006 14.5023 14.0999C14.7421 14.1992 14.9471 14.3675 15.0913 14.5833C15.2355 14.7992 15.3125 15.0529 15.3125 15.3125C15.3125 15.6606 15.1742 15.9944 14.9281 16.2406C14.6819 16.4867 14.3481 16.625 14 16.625ZM22.75 8.75H19.25V6.125C19.25 4.73261 18.6969 3.39726 17.7123 2.41269C16.7277 1.42812 15.3924 0.875 14 0.875C12.6076 0.875 11.2723 1.42812 10.2877 2.41269C9.30312 3.39726 8.75 4.73261 8.75 6.125V8.75H5.25C4.78587 8.75 4.34075 8.93437 4.01256 9.26256C3.68437 9.59075 3.5 10.0359 3.5 10.5V22.75C3.5 23.2141 3.68437 23.6592 4.01256 23.9874C4.34075 24.3156 4.78587 24.5 5.25 24.5H22.75C23.2141 24.5 23.6592 24.3156 23.9874 23.9874C24.3156 23.6592 24.5 23.2141 24.5 22.75V10.5C24.5 10.0359 24.3156 9.59075 23.9874 9.26256C23.6592 8.93437 23.2141 8.75 22.75 8.75ZM10.5 6.125C10.5 5.19674 10.8687 4.3065 11.5251 3.65013C12.1815 2.99375 13.0717 2.625 14 2.625C14.9283 2.625 15.8185 2.99375 16.4749 3.65013C17.1313 4.3065 17.5 5.19674 17.5 6.125V8.75H10.5V6.125ZM22.75 22.75H5.25V10.5H22.75V22.75Z" fill="#1D202F" />
                                </svg>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password..."
                                    className="w-full pl-10 pr-10 py-3 rounded-md border border-gray-400  text-black  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#432C81]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>
                            <div className="text-left">
                                <button onClick={() => setActive("forgot")} className="text-sm cursor-pointer text-[#432C81] hover:underline">
                                    Forgot Password?
                                </button>
                            </div>
                        </div>


                        <button onClick={() => {
                            console.log({ email, password });
                            router.push("/dashboard");
                        }} className="w-full py-3 mt-12 rounded-md cursor-pointer bg-[#432C81] text-white font-semibold hover:opacity-90 transition flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                Sign In
                                <svg
                                    width="18"
                                    height="12"
                                    viewBox="0 0 18 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.7806 8.03104L11.0306 14.781C10.8899 14.9218 10.699 15.0008 10.5 15.0008C10.301 15.0008 10.1101 14.9218 9.96937 14.781C9.82864 14.6403 9.74958 14.4494 9.74958 14.2504C9.74958 14.0514 9.82864 13.8605 9.96937 13.7198L15.4397 8.25042H0.75C0.551088 8.25042 0.360322 8.1714 0.21967 8.03075C0.0790178 7.8901 0 7.69933 0 7.50042C0 7.3015 0.0790178 7.11074 0.21967 6.97009C0.360322 6.82943 0.551088 6.75042 0.75 6.75042H15.4397L9.96937 1.28104C9.82864 1.14031 9.74958 0.94944 9.74958 0.750417C9.74958 0.551394 9.82864 0.360523 9.96937 0.219792C10.1101 0.0790615 10.301 0 10.5 0C10.699 0 10.8899 0.0790615 11.0306 0.219792L17.7806 6.96979C17.8504 7.03945 17.9057 7.12216 17.9434 7.21321C17.9812 7.30426 18.0006 7.40186 18.0006 7.50042C18.0006 7.59898 17.9812 7.69657 17.9434 7.78762C17.9057 7.87867 17.8504 7.96139 17.7806 8.03104Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </button>

                    </div>


                    <div className="my-12">
                        <div className="w-full h-px bg-[#dadadaee]" />
                    </div>


                    <div className="flex w-full justify-center items-center gap-2">
                        <button onClick={() => router.push("/dashboard")} className="flex-1 max-w-42 w-42 py-3 rounded-md  bg-[#F3F4F6] border-gray-300 flex items-center justify-center font-medium cursor-pointer">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#1D202F" />
                                <path d="M11.9997 22.9996C14.9697 22.9996 17.4597 22.0196 19.2797 20.3396L15.7097 17.5696C14.7297 18.2296 13.4797 18.6296 11.9997 18.6296C9.13969 18.6296 6.70969 16.6996 5.83969 14.0996H2.17969V16.9396C3.98969 20.5296 7.69969 22.9996 11.9997 22.9996Z" fill="#1D202F" />
                                <path d="M5.84 14.0903C5.62 13.4303 5.49 12.7303 5.49 12.0003C5.49 11.2703 5.62 10.5703 5.84 9.91031V7.07031H2.18C1.43 8.55031 1 10.2203 1 12.0003C1 13.7803 1.43 15.4503 2.18 16.9303L5.03 14.7103L5.84 14.0903Z" fill="#1D202F" />
                                <path d="M11.9997 5.38C13.6197 5.38 15.0597 5.94 16.2097 7.02L19.3597 3.87C17.4497 2.09 14.9697 1 11.9997 1C7.69969 1 3.98969 3.47 2.17969 7.07L5.83969 9.91C6.70969 7.31 9.13969 5.38 11.9997 5.38Z" fill="#1D202F" />
                            </svg>

                        </button>
                        <button onClick={() => router.push("/dashboard")} className="flex-1 max-w-42 w-42 py-3 rounded-md  border-gray-300 bg-[#F3F4F6]  flex items-center justify-center font-medium cursor-pointer">
                            <svg width="22" height="22" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_482_6441)">
                                    <path d="M24.1097 21.1748C23.6068 22.7445 22.8769 24.231 21.9437 25.5865L21.9797 25.5309C20.4909 27.8082 19.0085 28.9468 17.5325 28.9468C16.6817 28.8878 15.8457 28.6928 15.0557 28.3693L15.1085 28.3886C14.2812 28.0497 13.4008 27.8611 12.5081 27.8315H12.4949C11.6313 27.8622 10.782 28.0634 9.99535 28.4236L10.0373 28.4067C9.32664 28.7492 8.55695 28.9502 7.77055 28.9988L7.75254 29C5.99895 29 4.26215 27.4956 2.54215 24.4869C0.948474 21.8469 0.0712181 18.8319 -0.001855 15.7434V15.7192C-0.104224 13.3736 0.5927 11.0633 1.97335 9.17125L1.95295 9.20025C2.50894 8.42205 3.24087 7.78825 4.08824 7.35122C4.93561 6.9142 5.87409 6.68649 6.82615 6.68692H6.87054H6.86814C7.93663 6.72114 8.99519 6.90496 10.0133 7.23308L9.93175 7.21013C10.6903 7.46936 11.4751 7.64282 12.2717 7.72729L12.3209 7.73213C13.1913 7.65763 14.0454 7.45067 14.8541 7.11829L14.7965 7.13883C15.7511 6.7839 16.7557 6.58405 17.7725 6.54675H17.8745C19.1705 6.54467 20.4356 6.94511 21.4973 7.69346L21.4769 7.68017C22.1625 8.18283 22.7577 8.75639 23.2625 9.40083L23.2769 9.42017C22.5457 10.0125 21.89 10.6935 21.3245 11.4478L21.3041 11.4768C20.5693 12.5215 20.1759 13.7708 20.1785 15.051V15.086V15.1597C20.1785 16.5868 20.6261 17.9087 21.3869 18.9914L21.3725 18.9708C22.0012 19.9863 22.9516 20.7586 24.0701 21.1628L24.1073 21.1748H24.1097ZM17.6021 0.73225C17.5807 1.56255 17.4049 2.38144 17.0837 3.1465L17.1005 3.103C16.734 4.00782 16.1867 4.82712 15.4925 5.51L15.4913 5.51121C14.9813 6.06153 14.3534 6.48758 13.6553 6.757L13.6217 6.76788C13.0426 6.92332 12.4498 7.02166 11.8517 7.0615L11.8217 7.06271V7.02888C11.8217 5.37104 12.3257 3.83042 13.1885 2.55683L13.1705 2.58463C14.2296 1.21643 15.7586 0.296624 17.4569 0.00604167L17.4977 0C17.5133 0.0519583 17.5289 0.117208 17.5397 0.183667L17.5409 0.193333C17.5529 0.26825 17.5685 0.336722 17.5877 0.39875L17.5841 0.386667C17.5841 0.433389 17.5869 0.491389 17.5925 0.560667C17.5981 0.629944 17.6009 0.687139 17.6009 0.73225H17.6021Z" fill="black" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_482_6441">
                                        <rect width="24" height="29" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </button>
                    </div>


                    <p className="text-sm text-gray-600 text-center mt-6">
                        Don’t have an account?{" "}
                        <span onClick={() => setActive("signup")} className="text-[#432C81] font-medium cursor-pointer hover:underline">
                            Sign Up
                        </span>
                    </p>
                </div>}

                {active === "signup" && <div className="p-6 md:p-10 lg:p-20 flex flex-col justify-center bg-white rounded-xl lg:rounded-none shadow-lg lg:shadow-none">

                    <div className="mb-10">
                        <div className="inline-flex items-center justify-center px-10 py-2 bg-black text-white rounded text-lg font-semibold">
                            Logo
                        </div>
                    </div>


                    <div className="mb-10">
                        <h1 className="text-2xl font-medium  text-[#2D2A4A]">
                            Sign Up For Free.
                        </h1>
                        <p className="text-md text-gray-600  mt-1">
                            Join us for less than 1 minute, with no cost.
                        </p>
                    </div>


                    <div className="space-y-5">

                        <div className="space-y-1 ">
                            <label className="text-md font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative ">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="dco@gmail.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-400 text-black  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#432C81]"
                                />
                            </div>
                        </div>


                        <div className="space-y-2">
                            <label className="text-md font-medium  text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-black" width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 12.25C13.2646 12.2502 12.5538 12.5151 11.9975 12.9963C11.4413 13.4774 11.0768 14.1426 10.9706 14.8703C10.8644 15.5981 11.0237 16.3397 11.4193 16.9597C11.8148 17.5797 12.4203 18.0367 13.125 18.247V20.125C13.125 20.3571 13.2172 20.5796 13.3813 20.7437C13.5454 20.9078 13.7679 21 14 21C14.2321 21 14.4546 20.9078 14.6187 20.7437C14.7828 20.5796 14.875 20.3571 14.875 20.125V18.247C15.5797 18.0367 16.1852 17.5797 16.5807 16.9597C16.9763 16.3397 17.1356 15.5981 17.0294 14.8703C16.9232 14.1426 16.5587 13.4774 16.0025 12.9963C15.4462 12.5151 14.7354 12.2502 14 12.25ZM14 16.625C13.7404 16.625 13.4867 16.548 13.2708 16.4038C13.055 16.2596 12.8867 16.0546 12.7874 15.8148C12.6881 15.5749 12.6621 15.311 12.7127 15.0564C12.7634 14.8018 12.8884 14.568 13.0719 14.3844C13.2555 14.2009 13.4893 14.0759 13.7439 14.0252C13.9985 13.9746 14.2624 14.0006 14.5023 14.0999C14.7421 14.1992 14.9471 14.3675 15.0913 14.5833C15.2355 14.7992 15.3125 15.0529 15.3125 15.3125C15.3125 15.6606 15.1742 15.9944 14.9281 16.2406C14.6819 16.4867 14.3481 16.625 14 16.625ZM22.75 8.75H19.25V6.125C19.25 4.73261 18.6969 3.39726 17.7123 2.41269C16.7277 1.42812 15.3924 0.875 14 0.875C12.6076 0.875 11.2723 1.42812 10.2877 2.41269C9.30312 3.39726 8.75 4.73261 8.75 6.125V8.75H5.25C4.78587 8.75 4.34075 8.93437 4.01256 9.26256C3.68437 9.59075 3.5 10.0359 3.5 10.5V22.75C3.5 23.2141 3.68437 23.6592 4.01256 23.9874C4.34075 24.3156 4.78587 24.5 5.25 24.5H22.75C23.2141 24.5 23.6592 24.3156 23.9874 23.9874C24.3156 23.6592 24.5 23.2141 24.5 22.75V10.5C24.5 10.0359 24.3156 9.59075 23.9874 9.26256C23.6592 8.93437 23.2141 8.75 22.75 8.75ZM10.5 6.125C10.5 5.19674 10.8687 4.3065 11.5251 3.65013C12.1815 2.99375 13.0717 2.625 14 2.625C14.9283 2.625 15.8185 2.99375 16.4749 3.65013C17.1313 4.3065 17.5 5.19674 17.5 6.125V8.75H10.5V6.125ZM22.75 22.75H5.25V10.5H22.75V22.75Z" fill="#1D202F" />
                                </svg>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password..."
                                    className="w-full pl-10 pr-10 py-3 rounded-md border border-gray-400  text-black  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#432C81]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>

                        </div>

                        <div className="space-y-2">
                            <label className="text-md font-medium  text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-black" width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 12.25C13.2646 12.2502 12.5538 12.5151 11.9975 12.9963C11.4413 13.4774 11.0768 14.1426 10.9706 14.8703C10.8644 15.5981 11.0237 16.3397 11.4193 16.9597C11.8148 17.5797 12.4203 18.0367 13.125 18.247V20.125C13.125 20.3571 13.2172 20.5796 13.3813 20.7437C13.5454 20.9078 13.7679 21 14 21C14.2321 21 14.4546 20.9078 14.6187 20.7437C14.7828 20.5796 14.875 20.3571 14.875 20.125V18.247C15.5797 18.0367 16.1852 17.5797 16.5807 16.9597C16.9763 16.3397 17.1356 15.5981 17.0294 14.8703C16.9232 14.1426 16.5587 13.4774 16.0025 12.9963C15.4462 12.5151 14.7354 12.2502 14 12.25ZM14 16.625C13.7404 16.625 13.4867 16.548 13.2708 16.4038C13.055 16.2596 12.8867 16.0546 12.7874 15.8148C12.6881 15.5749 12.6621 15.311 12.7127 15.0564C12.7634 14.8018 12.8884 14.568 13.0719 14.3844C13.2555 14.2009 13.4893 14.0759 13.7439 14.0252C13.9985 13.9746 14.2624 14.0006 14.5023 14.0999C14.7421 14.1992 14.9471 14.3675 15.0913 14.5833C15.2355 14.7992 15.3125 15.0529 15.3125 15.3125C15.3125 15.6606 15.1742 15.9944 14.9281 16.2406C14.6819 16.4867 14.3481 16.625 14 16.625ZM22.75 8.75H19.25V6.125C19.25 4.73261 18.6969 3.39726 17.7123 2.41269C16.7277 1.42812 15.3924 0.875 14 0.875C12.6076 0.875 11.2723 1.42812 10.2877 2.41269C9.30312 3.39726 8.75 4.73261 8.75 6.125V8.75H5.25C4.78587 8.75 4.34075 8.93437 4.01256 9.26256C3.68437 9.59075 3.5 10.0359 3.5 10.5V22.75C3.5 23.2141 3.68437 23.6592 4.01256 23.9874C4.34075 24.3156 4.78587 24.5 5.25 24.5H22.75C23.2141 24.5 23.6592 24.3156 23.9874 23.9874C24.3156 23.6592 24.5 23.2141 24.5 22.75V10.5C24.5 10.0359 24.3156 9.59075 23.9874 9.26256C23.6592 8.93437 23.2141 8.75 22.75 8.75ZM10.5 6.125C10.5 5.19674 10.8687 4.3065 11.5251 3.65013C12.1815 2.99375 13.0717 2.625 14 2.625C14.9283 2.625 15.8185 2.99375 16.4749 3.65013C17.1313 4.3065 17.5 5.19674 17.5 6.125V8.75H10.5V6.125ZM22.75 22.75H5.25V10.5H22.75V22.75Z" fill="#1D202F" />
                                </svg>

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Enter your password..."
                                    className="w-full pl-10 pr-10 py-3 rounded-md border border-gray-400  text-black  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#432C81]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                >
                                    {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>

                        </div>

                        <button onClick={() => {
                            console.log({ email, password, confirmPassword });
                            router.push("/dashboard");
                        }} className="w-full py-3 mt-12 rounded-md cursor-pointer bg-[#432C81] text-white font-semibold hover:opacity-90 transition flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                Sign up
                                <svg
                                    width="18"
                                    height="12"
                                    viewBox="0 0 18 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.7806 8.03104L11.0306 14.781C10.8899 14.9218 10.699 15.0008 10.5 15.0008C10.301 15.0008 10.1101 14.9218 9.96937 14.781C9.82864 14.6403 9.74958 14.4494 9.74958 14.2504C9.74958 14.0514 9.82864 13.8605 9.96937 13.7198L15.4397 8.25042H0.75C0.551088 8.25042 0.360322 8.1714 0.21967 8.03075C0.0790178 7.8901 0 7.69933 0 7.50042C0 7.3015 0.0790178 7.11074 0.21967 6.97009C0.360322 6.82943 0.551088 6.75042 0.75 6.75042H15.4397L9.96937 1.28104C9.82864 1.14031 9.74958 0.94944 9.74958 0.750417C9.74958 0.551394 9.82864 0.360523 9.96937 0.219792C10.1101 0.0790615 10.301 0 10.5 0C10.699 0 10.8899 0.0790615 11.0306 0.219792L17.7806 6.96979C17.8504 7.03945 17.9057 7.12216 17.9434 7.21321C17.9812 7.30426 18.0006 7.40186 18.0006 7.50042C18.0006 7.59898 17.9812 7.69657 17.9434 7.78762C17.9057 7.87867 17.8504 7.96139 17.7806 8.03104Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </button>

                    </div>


                    <div className="mt-12">
                        <div className="w-full h-px bg-[#dadadaee]" />
                    </div>

                    <p className="text-sm text-gray-600 text-center mt-6">
                        Already have an account? {" "}
                        <span onClick={() => setActive("signin")} className="text-[#432C81] font-medium cursor-pointer hover:underline">
                            Sign In
                        </span>
                    </p>
                </div>}


                {active === "forgot" && <div className="p-6 md:p-10 lg:p-20 flex flex-col justify-center bg-white rounded-xl lg:rounded-none shadow-lg lg:shadow-none">

                    <div className="mb-10">
                        <div className="inline-flex items-center justify-center px-10 py-2 bg-black text-white rounded text-lg font-semibold">
                            Logo
                        </div>
                    </div>


                    <div className="mb-10">
                        <h1 className="text-2xl font-medium  text-[#2D2A4A]">
                            Forgot Password
                        </h1>
                        <p className="text-md text-gray-600  mt-1">
                            Enter your email for instruction.
                        </p>
                    </div>


                    <div className="space-y-5">

                        <div className="space-y-1 ">
                            <label className="text-md font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative ">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="dco@gmail.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-400 text-black  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#432C81]"
                                />
                            </div>
                        </div>

                        <button onClick={() => setActive("otp")} className="w-full py-3 mt-12 rounded-md cursor-pointer bg-[#432C81] text-white font-semibold hover:opacity-90 transition flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                Continue
                                <svg
                                    width="18"
                                    height="12"
                                    viewBox="0 0 18 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.7806 8.03104L11.0306 14.781C10.8899 14.9218 10.699 15.0008 10.5 15.0008C10.301 15.0008 10.1101 14.9218 9.96937 14.781C9.82864 14.6403 9.74958 14.4494 9.74958 14.2504C9.74958 14.0514 9.82864 13.8605 9.96937 13.7198L15.4397 8.25042H0.75C0.551088 8.25042 0.360322 8.1714 0.21967 8.03075C0.0790178 7.8901 0 7.69933 0 7.50042C0 7.3015 0.0790178 7.11074 0.21967 6.97009C0.360322 6.82943 0.551088 6.75042 0.75 6.75042H15.4397L9.96937 1.28104C9.82864 1.14031 9.74958 0.94944 9.74958 0.750417C9.74958 0.551394 9.82864 0.360523 9.96937 0.219792C10.1101 0.0790615 10.301 0 10.5 0C10.699 0 10.8899 0.0790615 11.0306 0.219792L17.7806 6.96979C17.8504 7.03945 17.9057 7.12216 17.9434 7.21321C17.9812 7.30426 18.0006 7.40186 18.0006 7.50042C18.0006 7.59898 17.9812 7.69657 17.9434 7.78762C17.9057 7.87867 17.8504 7.96139 17.7806 8.03104Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </button>

                        <button onClick={() => setActive("signin")} className="w-full py-3 rounded-md cursor-pointer bg-white text-[#6B7280] border border-[#6B7280]  font-semibold hover:opacity-90 transition flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                <svg width="18"
                                    height="12" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.207766 7.14071L6.79581 0.232542C6.93316 0.0885135 7.1221 0.00494817 7.32107 0.000228795C7.52004 -0.00449057 7.71273 0.0700226 7.85676 0.207377C8.00079 0.344731 8.08435 0.533674 8.08907 0.732641C8.09379 0.931608 8.01928 1.1243 7.88192 1.26833L2.54284 6.86588L17.2284 6.51755C17.4273 6.51283 17.6198 6.58731 17.7638 6.72458C17.9077 6.86186 17.9913 7.0507 17.996 7.24956C18.0007 7.44841 17.9262 7.641 17.7889 7.78495C17.6517 7.92889 17.4628 8.01241 17.264 8.01713L2.57841 8.36546L8.17688 13.7036C8.32091 13.8409 8.40447 14.0299 8.40919 14.2288C8.41391 14.4278 8.3394 14.6205 8.20204 14.7645C8.06469 14.9086 7.87575 14.9921 7.67678 14.9968C7.47781 15.0016 7.28512 14.9271 7.14109 14.7897L0.232931 8.20166C0.161566 8.13368 0.104299 8.05229 0.0644082 7.96217C0.0245172 7.87204 0.00278206 7.77493 0.000444913 7.6764C-0.00189225 7.57786 0.0152144 7.47984 0.0507874 7.38792C0.0863604 7.296 0.139704 7.21199 0.207766 7.14071Z" fill="#6B7280" />
                                </svg>
                                Back
                            </div>
                        </button>

                    </div>
                </div>}

                {active === "otp" && <div className="p-6 md:p-10 lg:p-28 flex flex-col justify-center bg-white rounded-xl lg:rounded-none shadow-lg lg:shadow-none">

                    <div className="mb-10">
                        <div className="inline-flex items-center justify-center px-10 py-2 bg-black text-white rounded text-lg font-semibold">
                            Logo
                        </div>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-2xl font-medium  text-[#2D2A4A]">
                            OTP Confirmation 🔑
                        </h1>
                        <p className="text-md text-gray-600  mt-1">
                            Kindly enter the 4-digit OTP that we sent to your email.
                        </p>
                    </div>

                    <div className="space-y-5">

                        <div className="flex gap-4 justify-start mb-8">
                            {[0, 1, 2, 3].map((i) => (
                                <input
                                    key={i}
                                    id={`otp-${i}`}
                                    maxLength={1}
                                    value={otp[i]}
                                    onChange={(e) => handleOtpChange(i, e.target.value)}
                                    className="w-18 h-26 text-center text-4xl text-[#626366] font-semibold rounded-xl bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#432C81]"
                                    placeholder="0"
                                />
                            ))}
                        </div>


                        <button onClick={() => setActive("password")} className="w-full py-3 mt-12 rounded-md cursor-pointer bg-[#432C81] text-white font-semibold hover:opacity-90 transition flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                Continue
                                <svg
                                    width="18"
                                    height="12"
                                    viewBox="0 0 18 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.7806 8.03104L11.0306 14.781C10.8899 14.9218 10.699 15.0008 10.5 15.0008C10.301 15.0008 10.1101 14.9218 9.96937 14.781C9.82864 14.6403 9.74958 14.4494 9.74958 14.2504C9.74958 14.0514 9.82864 13.8605 9.96937 13.7198L15.4397 8.25042H0.75C0.551088 8.25042 0.360322 8.1714 0.21967 8.03075C0.0790178 7.8901 0 7.69933 0 7.50042C0 7.3015 0.0790178 7.11074 0.21967 6.97009C0.360322 6.82943 0.551088 6.75042 0.75 6.75042H15.4397L9.96937 1.28104C9.82864 1.14031 9.74958 0.94944 9.74958 0.750417C9.74958 0.551394 9.82864 0.360523 9.96937 0.219792C10.1101 0.0790615 10.301 0 10.5 0C10.699 0 10.8899 0.0790615 11.0306 0.219792L17.7806 6.96979C17.8504 7.03945 17.9057 7.12216 17.9434 7.21321C17.9812 7.30426 18.0006 7.40186 18.0006 7.50042C18.0006 7.59898 17.9812 7.69657 17.9434 7.78762C17.9057 7.87867 17.8504 7.96139 17.7806 8.03104Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </button>

                        <button onClick={() => setActive("forgot")} className="w-full py-3 rounded-md cursor-pointer bg-white text-[#6B7280] border border-[#6B7280]  font-semibold hover:opacity-90 transition flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                <svg width="18"
                                    height="12" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.207766 7.14071L6.79581 0.232542C6.93316 0.0885135 7.1221 0.00494817 7.32107 0.000228795C7.52004 -0.00449057 7.71273 0.0700226 7.85676 0.207377C8.00079 0.344731 8.08435 0.533674 8.08907 0.732641C8.09379 0.931608 8.01928 1.1243 7.88192 1.26833L2.54284 6.86588L17.2284 6.51755C17.4273 6.51283 17.6198 6.58731 17.7638 6.72458C17.9077 6.86186 17.9913 7.0507 17.996 7.24956C18.0007 7.44841 17.9262 7.641 17.7889 7.78495C17.6517 7.92889 17.4628 8.01241 17.264 8.01713L2.57841 8.36546L8.17688 13.7036C8.32091 13.8409 8.40447 14.0299 8.40919 14.2288C8.41391 14.4278 8.3394 14.6205 8.20204 14.7645C8.06469 14.9086 7.87575 14.9921 7.67678 14.9968C7.47781 15.0016 7.28512 14.9271 7.14109 14.7897L0.232931 8.20166C0.161566 8.13368 0.104299 8.05229 0.0644082 7.96217C0.0245172 7.87204 0.00278206 7.77493 0.000444913 7.6764C-0.00189225 7.57786 0.0152144 7.47984 0.0507874 7.38792C0.0863604 7.296 0.139704 7.21199 0.207766 7.14071Z" fill="#6B7280" />
                                </svg>

                                Back
                            </div>
                        </button>

                    </div>
                </div>}

                {active === "password" && <div className="p-6 md:p-10 lg:p-20 flex flex-col justify-center bg-white rounded-xl lg:rounded-none shadow-lg lg:shadow-none">

                    <div className="mb-10">
                        <div className="inline-flex items-center justify-center px-10 py-2 bg-black text-white rounded text-lg font-semibold">
                            Logo
                        </div>
                    </div>


                    <div className="mb-10">
                        <h1 className="text-2xl font-medium  text-[#2D2A4A]">
                            Let’s Set Up Your Password. 🔑
                        </h1>

                    </div>


                    <div className="space-y-5">

                        <div className="space-y-1 ">
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-400 text-black  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#432C81]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-gray-300 flex items-center justify-center"
                                >
                                    {showNewPassword ? <Eye size={16} className="text-gray-500" /> : <EyeOff size={16} className="text-gray-500" />}
                                </button>
                            </div>


                            <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden mt-6">
                                <div className={`h-full transition-all duration-300 ${strengthColor}`} style={{ width: `${strength}%` }} />
                            </div>
                        </div>
                        <p className="text-md text-[#4B5563]  mt-1">
                            {strengthText} password! {strength < 100 && "Kindly increase strength!"} 💪
                        </p>

                        <button onClick={() => setActive("gohome")} className="w-full py-3 mt-12 rounded-md cursor-pointer bg-[#6B7280] text-white font-semibold hover:opacity-90 transition flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                Continue
                                <svg
                                    width="18"
                                    height="12"
                                    viewBox="0 0 18 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.7806 8.03104L11.0306 14.781C10.8899 14.9218 10.699 15.0008 10.5 15.0008C10.301 15.0008 10.1101 14.9218 9.96937 14.781C9.82864 14.6403 9.74958 14.4494 9.74958 14.2504C9.74958 14.0514 9.82864 13.8605 9.96937 13.7198L15.4397 8.25042H0.75C0.551088 8.25042 0.360322 8.1714 0.21967 8.03075C0.0790178 7.8901 0 7.69933 0 7.50042C0 7.3015 0.0790178 7.11074 0.21967 6.97009C0.360322 6.82943 0.551088 6.75042 0.75 6.75042H15.4397L9.96937 1.28104C9.82864 1.14031 9.74958 0.94944 9.74958 0.750417C9.74958 0.551394 9.82864 0.360523 9.96937 0.219792C10.1101 0.0790615 10.301 0 10.5 0C10.699 0 10.8899 0.0790615 11.0306 0.219792L17.7806 6.96979C17.8504 7.03945 17.9057 7.12216 17.9434 7.21321C17.9812 7.30426 18.0006 7.40186 18.0006 7.50042C18.0006 7.59898 17.9812 7.69657 17.9434 7.78762C17.9057 7.87867 17.8504 7.96139 17.7806 8.03104Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </button>

                        <button onClick={() => setActive("otp")} className="w-full py-3 rounded-md cursor-pointer bg-white text-[#6B7280] border border-[#6B7280]  font-semibold hover:opacity-90 transition flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                <svg width="18"
                                    height="12" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.207766 7.14071L6.79581 0.232542C6.93316 0.0885135 7.1221 0.00494817 7.32107 0.000228795C7.52004 -0.00449057 7.71273 0.0700226 7.85676 0.207377C8.00079 0.344731 8.08435 0.533674 8.08907 0.732641C8.09379 0.931608 8.01928 1.1243 7.88192 1.26833L2.54284 6.86588L17.2284 6.51755C17.4273 6.51283 17.6198 6.58731 17.7638 6.72458C17.9077 6.86186 17.9913 7.0507 17.996 7.24956C18.0007 7.44841 17.9262 7.641 17.7889 7.78495C17.6517 7.92889 17.4628 8.01241 17.264 8.01713L2.57841 8.36546L8.17688 13.7036C8.32091 13.8409 8.40447 14.0299 8.40919 14.2288C8.41391 14.4278 8.3394 14.6205 8.20204 14.7645C8.06469 14.9086 7.87575 14.9921 7.67678 14.9968C7.47781 15.0016 7.28512 14.9271 7.14109 14.7897L0.232931 8.20166C0.161566 8.13368 0.104299 8.05229 0.0644082 7.96217C0.0245172 7.87204 0.00278206 7.77493 0.000444913 7.6764C-0.00189225 7.57786 0.0152144 7.47984 0.0507874 7.38792C0.0863604 7.296 0.139704 7.21199 0.207766 7.14071Z" fill="#6B7280" />
                                </svg>
                                Back
                            </div>
                        </button>

                    </div>
                </div>}

                {active === "gohome" && <div className="p-6 md:p-10 lg:p-20 flex flex-col bg-white rounded-xl lg:rounded-none shadow-lg lg:shadow-none">

                    <div className="mb-10">
                        <div className="inline-flex items-center justify-center px-10 py-2 bg-black text-white rounded text-lg font-semibold">
                            Logo
                        </div>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-2xl font-medium  text-[#2D2A4A]">
                            Password Resetted! 🔐
                        </h1>
                    </div>


                    <div className="space-y-5">

                        <p className="text-2xl max-w-96 w-96 text-gray-600  mt-1">
                            We’ve sent the password to **221b@gmail.com. Resend if the password is not received! 🔥
                        </p>

                        <button onClick={() => router.push("/dashboard")} className="w-full py-3 mt-12 rounded-md cursor-pointer  text-white font-semibold hover:opacity-90 transition flex items-center justify-center bg-[#432C81]">
                            <div className="flex items-center gap-2">
                                Go to home
                                <svg
                                    width="18"
                                    height="12"
                                    viewBox="0 0 18 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.7806 8.03104L11.0306 14.781C10.8899 14.9218 10.699 15.0008 10.5 15.0008C10.301 15.0008 10.1101 14.9218 9.96937 14.781C9.82864 14.6403 9.74958 14.4494 9.74958 14.2504C9.74958 14.0514 9.82864 13.8605 9.96937 13.7198L15.4397 8.25042H0.75C0.551088 8.25042 0.360322 8.1714 0.21967 8.03075C0.0790178 7.8901 0 7.69933 0 7.50042C0 7.3015 0.0790178 7.11074 0.21967 6.97009C0.360322 6.82943 0.551088 6.75042 0.75 6.75042H15.4397L9.96937 1.28104C9.82864 1.14031 9.74958 0.94944 9.74958 0.750417C9.74958 0.551394 9.82864 0.360523 9.96937 0.219792C10.1101 0.0790615 10.301 0 10.5 0C10.699 0 10.8899 0.0790615 11.0306 0.219792L17.7806 6.96979C17.8504 7.03945 17.9057 7.12216 17.9434 7.21321C17.9812 7.30426 18.0006 7.40186 18.0006 7.50042C18.0006 7.59898 17.9812 7.69657 17.9434 7.78762C17.9057 7.87867 17.8504 7.96139 17.7806 8.03104Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>}

                {active === "profile" && <div className="p-6 pl-20 pr-20 flex flex-col justify-center ">
                    {/* Logo */}
                    <div className="mb-10">
                        <div className="inline-flex items-center justify-center px-10 py-2 bg-black text-white rounded text-lg font-semibold">
                            Logo
                        </div>
                    </div>



                    <div className="mb-10">
                        <h1 className="text-2xl font-medium  text-[#2D2A4A]">
                            Profile Setup
                        </h1>
                    </div>

                    <div className=" flex relative justify-center mb-6 md:mb-8">
                        <svg width="113" height="115" viewBox="0 0 113 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.171638 83.0861C0.114427 82.9907 0.057211 82.8954 0 82.8C6.59833 79.8437 13.4255 77.7075 19.8331 75.8574C21.4541 75.3996 23.1705 74.9228 24.9821 74.465C27.5566 73.8166 30.3409 73.1681 33.2586 72.5768C35.9285 72.0237 38.7128 71.5087 41.5924 71.0509C46.379 70.2689 51.4327 69.6395 56.6007 69.2008C57.3254 69.1436 58.0501 69.0864 58.7747 69.0292C59.7664 68.9529 60.739 68.8957 61.7306 68.8575C75.0417 68.1709 88.8296 69.0483 100.825 72.8438C105.459 74.3125 109.159 76.7729 112.229 80.0535C112.21 80.1107 112.172 80.1679 112.134 80.2251C111.638 81.1788 111.123 82.1134 110.57 83.048C110.322 83.4676 110.074 83.9063 109.807 84.3259C109.673 84.5547 109.54 84.7645 109.387 84.9934C109.311 85.1269 109.216 85.2604 109.12 85.394C108.911 85.7373 108.682 86.0615 108.453 86.4048C107.824 87.3394 107.156 88.274 106.47 89.1705C106.451 89.2086 106.431 89.2277 106.393 89.2658C106.241 89.4566 106.107 89.6473 105.955 89.838C105.325 90.6582 104.677 91.4592 104.01 92.2412C103.666 92.6227 103.342 93.0232 102.98 93.4047C102.865 93.5382 102.732 93.6717 102.617 93.8243C102.255 94.2058 101.893 94.6063 101.53 94.9878C101.321 95.1976 101.13 95.4074 100.92 95.6172C100.462 96.0749 100.005 96.5327 99.5471 96.9714C98.7461 97.7343 97.9261 98.4782 97.087 99.2029C97.0298 99.2602 96.9726 99.2983 96.9154 99.3555C96.0191 100.138 95.0846 100.881 94.1311 101.606C93.8451 101.816 93.5781 102.026 93.292 102.236C92.5292 102.808 91.7473 103.342 90.9464 103.876C89.5924 104.791 88.2003 105.65 86.7891 106.451C86.5411 106.584 86.3123 106.718 86.0644 106.851C85.702 107.061 85.3397 107.252 84.9583 107.443C84.8439 107.5 84.7295 107.557 84.615 107.614C84.1764 107.843 83.7569 108.053 83.3182 108.263C83.0513 108.396 82.7843 108.511 82.5173 108.644C81.7736 108.987 81.0298 109.331 80.267 109.655C79.7521 109.865 79.2372 110.075 78.7223 110.284C78.7032 110.284 78.6842 110.304 78.6651 110.304C78.4744 110.38 78.2837 110.456 78.093 110.532C78.0358 110.551 77.9786 110.571 77.9213 110.59C77.4827 110.761 77.0441 110.914 76.6246 111.066C75.5185 111.448 74.4124 111.81 73.2873 112.135C73.0393 112.211 72.8105 112.268 72.5626 112.344C72.5435 112.344 72.5435 112.344 72.5244 112.344C71.5328 112.611 70.5411 112.878 69.5304 113.107C68.882 113.26 68.2146 113.393 67.5471 113.527C67.261 113.584 66.994 113.641 66.708 113.679C66.4982 113.718 66.3075 113.756 66.0977 113.775C65.354 113.908 64.6293 114.023 63.8856 114.118C63.4279 114.175 62.9702 114.233 62.5316 114.29C62.5125 114.29 62.5125 114.29 62.4935 114.29C62.2265 114.328 61.9595 114.347 61.6925 114.366C61.4255 114.385 61.1585 114.423 60.9106 114.442C60.7199 114.461 60.5483 114.481 60.3576 114.481C59.919 114.519 59.4613 114.538 59.0227 114.576C57.8022 114.652 56.5817 114.671 55.3421 114.671C54.9416 114.671 54.5221 114.671 54.1216 114.652C53.7592 114.652 53.3969 114.633 53.0536 114.614C52.9202 114.614 52.7676 114.595 52.6341 114.595C51.8522 114.557 51.0703 114.519 50.2884 114.461C49.6401 114.404 49.0107 114.347 48.3814 114.29C47.4088 114.194 46.4553 114.061 45.5018 113.908C43.8045 113.641 42.1073 113.317 40.4672 112.917C38.77 112.516 37.0918 112.039 35.4517 111.505C35.3564 111.486 35.2801 111.448 35.1848 111.41C34.0787 111.047 33.0107 110.647 31.9428 110.227C31.8284 110.189 31.733 110.132 31.6186 110.094C31.5995 110.075 31.5614 110.075 31.5423 110.056C30.7223 109.731 29.9213 109.388 29.1204 109.026C28.6627 108.816 28.1859 108.606 27.7282 108.377C27.4803 108.263 27.2133 108.129 26.9654 108.015C26.9464 108.015 26.9464 108.015 26.9273 107.996C26.6603 107.862 26.3933 107.729 26.1454 107.595C26.0691 107.557 26.0119 107.519 25.9547 107.5C25.0775 107.042 24.2002 106.565 23.3421 106.069C22.7509 105.726 22.1597 105.383 21.5876 105.02C21.5304 104.982 21.4732 104.944 21.416 104.906C21.2634 104.81 21.1109 104.715 20.9583 104.62C19.8904 103.933 18.8415 103.227 17.8308 102.484C17.4303 102.197 17.0489 101.911 16.6675 101.625C15.9809 101.11 15.3135 100.576 14.6651 100.023C14.0739 99.5272 13.4827 99.0313 12.9106 98.5163C12.3576 98.0204 11.8045 97.5245 11.2706 97.0095C11.1943 96.9332 11.0989 96.8569 11.0226 96.7806C11.0036 96.7616 10.9654 96.7234 10.9464 96.7044C10.0119 95.8079 9.11562 94.8924 8.23838 93.9387C8.18117 93.8815 8.10489 93.8052 8.04768 93.7289C7.91419 93.5763 7.7807 93.4428 7.64721 93.2903C7.49464 93.1186 7.36114 92.966 7.20858 92.7944C6.90346 92.451 6.59833 92.0886 6.29321 91.7262C6.1025 91.4974 5.9118 91.2685 5.7211 91.0396C5.12992 90.3148 4.57688 89.5901 4.02385 88.8653C3.50895 88.1786 3.01311 87.4729 2.51729 86.7672C1.69726 85.5656 0.91538 84.3259 0.171638 83.0861Z" fill="#9CA3AF" />
                            <path d="M70.5955 20.0303C70.5955 20.0303 75.1724 17.3791 76.5264 12.649C77.8804 7.91881 78.6241 1.47209 73.0747 0.289549C67.5061 -0.873914 56.7505 1.87262 53.5467 1.45301C50.3428 1.0334 48.6074 -0.30172 46.2809 0.918963C43.9543 2.13965 43.4584 5.26764 43.4584 5.26764C43.4584 5.26764 39.3965 5.42023 38.176 7.76623C36.9555 10.1122 38.1188 29.7194 39.263 35.5368C40.4072 41.3541 47.9209 41.9453 51.7159 41.8881C55.5109 41.8118 70.5955 20.0303 70.5955 20.0303Z" fill="#9CA3AF" />
                            <path d="M42.5453 30.1772L32.7813 71.051C32.7622 74.4842 41.916 80.5304 51.2414 81.3315C53.5679 81.5222 57.5155 81.2361 59.1174 79.9391C61.1579 78.2798 53.6061 35.8229 53.6061 35.8229L42.5453 30.1772Z" fill="#D1D5DB" />
                            <path d="M54.7858 42.6327C55.377 46.1422 56.1208 50.6434 56.8454 55.3164C54.7668 54.7442 52.0206 53.8859 50.6476 52.7606C43.6488 47.0958 44.5451 41.4692 44.5451 41.4692L54.7858 42.6327Z" fill="#9CA3AF" />
                            <path d="M51.6637 16.5784L44.1691 32.1802C42.1476 36.3763 43.0058 41.3926 46.324 44.6541C49.852 48.1063 55.268 50.09 59.9021 50.1853C64.7841 50.2807 69.1703 49.2507 70.5243 42.804C72.2787 34.45 72.6602 26.4011 72.889 21.9952C72.9843 19.9925 72.622 16.5212 71.6304 14.9763C70.0475 12.4777 67.1298 9.57855 64.1929 10.6085C57.9188 12.8019 54.8294 11.9055 51.6637 16.5784Z" fill="#D1D5DB" />
                            <path d="M70.4463 35.5554C70.4463 35.5554 63.8289 34.3921 59.0804 33.3813C59.0804 33.3813 58.7753 37.7866 65.2592 38.7592C69.1495 39.3313 70.4463 35.5554 70.4463 35.5554Z" fill="white" />
                            <path d="M64.5887 30.8826C65.8664 30.8826 67.0488 30.6156 68.174 30.0244C69.0321 29.5858 69.547 30.997 68.7079 31.4356C67.4683 32.0649 66.1144 32.3891 64.7413 32.3701C63.7878 32.3701 63.6352 30.8826 64.5887 30.8826Z" fill="#9CA3AF" />
                            <path d="M61.3076 24.8941C61.4792 24.8941 61.9941 24.875 62.1466 25.5043C62.2611 25.9811 62.2611 26.5532 62.0704 27.0109C61.8606 27.5639 61.1931 27.7737 60.7164 27.4495C60.068 27.0109 60.1824 24.8559 61.3076 24.8941Z" fill="#9CA3AF" />
                            <path d="M71.0185 24.9321C71.1901 24.9321 71.705 24.9131 71.8576 25.5424C71.972 26.0191 71.972 26.5913 71.7813 27.0489C71.5715 27.602 70.9041 27.8118 70.4273 27.4876C69.7789 27.0489 69.8933 24.894 71.0185 24.9321Z" fill="#9CA3AF" />
                            <path d="M63.501 19.9727C62.967 19.3815 61.8037 19.0764 61.0409 19.1527C60.259 19.248 59.2674 19.5722 58.6953 20.1824C58.619 20.2397 58.5618 20.3159 58.5236 20.3922C58.4283 20.5448 58.4474 20.6973 58.5427 20.7927C58.6381 21.0025 58.8478 21.155 59.1529 21.0788C60.3734 20.7736 61.8037 20.7355 63.0242 20.8881C63.6154 20.9834 63.9015 20.2206 63.501 19.9727Z" fill="#9CA3AF" />
                            <path d="M72.8279 21.5177C72.8089 21.4796 72.7707 21.4414 72.7326 21.4224C72.4275 21.2317 72.0842 20.9265 71.7028 20.6786C71.6837 20.6596 71.6456 20.6405 71.6265 20.6214C71.6075 20.6214 71.6074 20.6214 71.5884 20.6023C71.0353 20.24 70.4442 20.0302 69.8911 20.507C69.8149 20.5642 69.7767 20.6405 69.7767 20.7168C69.6241 20.9838 69.6432 21.3842 70.0246 21.5177C70.8446 21.8038 71.6456 22.1089 72.4275 22.4903C72.9805 22.7573 73.3238 21.8419 72.8279 21.5177Z" fill="#9CA3AF" />
                            <path d="M46.0156 21.3654C46.7403 21.2128 51.0693 23.4441 55.2075 23.9018L55.608 22.5287C54.5782 22.4715 47.0836 20.1449 46.0347 20.3547L46.0156 21.3654Z" fill="#9CA3AF" />
                            <path d="M75.1374 21.4621C74.5272 20.5466 73.7262 19.9744 72.849 19.8218C72.6964 19.8028 72.5438 19.7837 72.3913 19.7837C71.8382 19.7837 71.3043 19.9553 70.8084 20.2605C70.427 20.5085 70.0647 20.8518 69.7405 21.2905C69.7024 21.3477 69.6642 21.3858 69.6261 21.4431C69.1112 22.206 68.7679 23.1596 68.6153 24.1896C68.5772 24.4948 68.5581 24.7999 68.5391 25.1242C68.5391 25.1623 68.5391 25.2195 68.5391 25.2577C68.5391 26.7072 68.9014 28.0614 69.5879 29.0914C70.2935 30.1404 71.228 30.7317 72.2578 30.7698C72.2768 30.7698 72.315 30.7698 72.3341 30.7698C72.582 30.7698 72.8108 30.7317 73.0587 30.6745C73.8216 30.4647 74.5272 29.9306 75.0802 29.1105C75.7667 28.0805 76.1481 26.7263 76.1481 25.2768C76.1481 23.8272 75.8239 22.4921 75.1374 21.4621ZM74.4509 28.6718C73.8788 29.511 73.1541 29.9878 72.3722 29.9878C71.6094 29.9878 70.8657 29.511 70.3126 28.6718C69.7214 27.7753 69.3972 26.5737 69.3972 25.2958C69.3972 25.2195 69.3972 25.1432 69.3972 25.0479C69.3972 25.0288 69.3972 25.0097 69.3972 24.9907C69.4544 23.8081 69.7786 22.74 70.3317 21.9008C70.3889 21.8245 70.427 21.7482 70.4842 21.691C70.8466 21.2142 71.2852 20.8709 71.7429 20.7183C71.8001 20.6992 71.8382 20.6801 71.8955 20.6611C72.0671 20.6229 72.2387 20.5848 72.4103 20.5848C72.582 20.5848 72.7536 20.6038 72.9062 20.6611C73.4974 20.8136 74.0313 21.2523 74.47 21.9199C75.0611 22.8163 75.3853 24.0179 75.3853 25.2958V25.3149C75.3853 26.5737 75.042 27.7753 74.4509 28.6718Z" fill="#9CA3AF" />
                            <path d="M65.5615 23.8834C65.5043 22.5101 64.9703 21.2131 64.0359 20.2213C63.0442 19.1723 61.7093 18.6001 60.2981 18.6001C58.8869 18.6001 57.552 19.1723 56.5603 20.2022C55.931 20.8507 55.4924 21.6137 55.2445 22.472C55.111 22.9297 55.0347 23.3875 55.0156 23.8834C55.0156 23.9597 55.0156 24.0169 55.0156 24.0932C55.0156 25.5618 55.5496 26.9351 56.5413 27.9841C57.5329 29.0331 58.8678 29.6053 60.279 29.6053C60.7367 29.6053 61.1753 29.5481 61.614 29.4337C62.7582 29.1285 63.7498 28.4419 64.4554 27.5073C65.0466 26.7253 65.4471 25.7716 65.5615 24.7226C65.5806 24.5319 65.5997 24.322 65.5997 24.1313C65.5806 24.055 65.5615 23.9787 65.5615 23.8834ZM60.279 28.8042C59.0776 28.8042 57.9715 28.3083 57.1134 27.431C56.2743 26.5345 55.7975 25.352 55.7975 24.1122C55.7975 22.8534 56.2743 21.6709 57.1324 20.7935C57.7045 20.2022 58.4101 19.7826 59.1729 19.5728C59.4209 19.5156 59.6688 19.4584 59.9358 19.4393C60.0502 19.4393 60.1837 19.4202 60.2981 19.4202C61.4995 19.4202 62.6056 19.9161 63.4638 20.7935C64.3219 21.69 64.7796 22.8725 64.7796 24.1122C64.7796 24.1885 64.7796 24.2648 64.7796 24.3411C64.7796 24.3602 64.7796 24.3983 64.7796 24.4174C64.608 26.8779 62.6437 28.8042 60.279 28.8042Z" fill="#9CA3AF" />
                            <path d="M69.0858 25.3707C68.9333 25.4089 68.7616 25.3516 68.6663 25.2182C68.6281 25.1609 67.7128 24.0549 65.2718 24.7795C65.2718 24.7795 65.2718 24.7795 65.2527 24.7795C65.0429 24.8367 64.8331 24.7223 64.7569 24.5125C64.6997 24.3028 64.8141 24.0739 65.0239 24.0167C68.037 23.1395 69.2384 24.6651 69.2765 24.7414C69.41 24.913 69.3719 25.18 69.2002 25.3135C69.1812 25.3326 69.124 25.3707 69.0858 25.3707Z" fill="#9CA3AF" />
                            <path d="M46.1899 27.2406C46.2853 24.1317 46.2853 23.3878 46.3234 22.2244C46.3997 20.05 45.8086 16.7122 42.5285 18.1999C37.7609 20.3743 38.0279 31.9898 43.3866 33.0389C47.3723 33.8399 46.0946 30.1207 46.1899 27.2406Z" fill="#D1D5DB" />
                            <path d="M53.8931 75.4189C53.8931 75.4189 47.1995 74.5225 43.7096 72.4053C38.6369 69.3536 34.4796 64.9477 33.6595 65.7297C31.4092 67.8659 24.9062 74.3699 24.9062 74.3699C24.9062 74.3699 41.5356 96.0751 43.5761 96.571C45.6166 97.0669 54.8466 82.0373 57.2686 82.5904C59.6905 83.1435 67.4521 90.2387 68.5391 87.9118C69.6261 85.604 61.4068 67.4845 60.5678 66.8169C59.7096 66.1493 58.2984 65.272 58.2984 65.272L53.8931 75.4189Z" fill="white" />
                        </svg>

                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute bottom-0 right-[calc(50%-56px)] translate-x-1/2 z-10"
                        >
                            <rect width="30" height="30" rx="15" fill="#1D202F" />
                            <path
                                d="M17.6693 8.05713L21.9454 12.3333L19.9454 14.3333L15.6693 10.0571L17.6693 8.05713Z"
                                fill="white"
                            />
                            <path
                                d="M14.7265 10.9999L8.33594 17.3905V21.6666H12.6121L19.0026 15.2761L14.7265 10.9999Z"
                                fill="white"
                            />
                        </svg>


                    </div>


                    <div className="space-y-4 md:space-y-5">

                        <div className="space-y-1">
                            <label className="text-md font-medium text-gray-700">Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Jhon dol"
                                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-400 text-black  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#432C81]"
                                />
                            </div>
                        </div>


                        <div className="space-y-1">
                            <label className="text-md font-medium text-gray-700">Phone number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="tel"
                                    placeholder="Enter your number"
                                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-400 text-black  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#432C81]"
                                />
                            </div>
                        </div>


                        <div className="space-y-1">
                            <label className="text-md font-medium text-gray-700">Gender</label>
                            <div className="relative">
                                <select className="w-full pl-2 pr-4 py-3 rounded-md border border-gray-400 text-black  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#432C81]">
                                    <option>Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                                {/* <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /> */}
                            </div>
                        </div>


                        <div className="flex flex-col gap-3 pt-2">

                            <button onClick={() => router.push("/dashboard")} className="w-full py-3 mt-12 rounded-md cursor-pointer  text-white font-semibold hover:opacity-90 transition flex items-center justify-center bg-[#432C81]">
                                <div className="flex items-center gap-2">
                                    Complete Profile
                                    <svg
                                        width="18"
                                        height="12"
                                        viewBox="0 0 18 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M17.7806 8.03104L11.0306 14.781C10.8899 14.9218 10.699 15.0008 10.5 15.0008C10.301 15.0008 10.1101 14.9218 9.96937 14.781C9.82864 14.6403 9.74958 14.4494 9.74958 14.2504C9.74958 14.0514 9.82864 13.8605 9.96937 13.7198L15.4397 8.25042H0.75C0.551088 8.25042 0.360322 8.1714 0.21967 8.03075C0.0790178 7.8901 0 7.69933 0 7.50042C0 7.3015 0.0790178 7.11074 0.21967 6.97009C0.360322 6.82943 0.551088 6.75042 0.75 6.75042H15.4397L9.96937 1.28104C9.82864 1.14031 9.74958 0.94944 9.74958 0.750417C9.74958 0.551394 9.82864 0.360523 9.96937 0.219792C10.1101 0.0790615 10.301 0 10.5 0C10.699 0 10.8899 0.0790615 11.0306 0.219792L17.7806 6.96979C17.8504 7.03945 17.9057 7.12216 17.9434 7.21321C17.9812 7.30426 18.0006 7.40186 18.0006 7.50042C18.0006 7.59898 17.9812 7.69657 17.9434 7.78762C17.9057 7.87867 17.8504 7.96139 17.7806 8.03104Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                            </button>
                            <button onClick={() => setActive("forgot")} className="w-full py-3 rounded-md cursor-pointer bg-white text-[#6B7280] border border-[#6B7280]  font-semibold hover:opacity-90 transition flex items-center justify-center">
                                <div className="flex items-center gap-2">
                                    Skip
                                </div>
                            </button>

                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}
