

import { useToast } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const LoginUser = ({setUser}) => {
    const toast = useToast()
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { errors },

    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const res = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email, password: data.password }),
            })
            console.log(res);
            const data1 = await res.json()
            console.log(data1);

            if (data1.error) {
                console.log("Error", "error");
                return;
            }
            toast({
                title: 'Registration successfull',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            localStorage.setItem("userInfo", JSON.stringify(data1));
            setUser(data1)
            navigate('/')



        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        }


    };

    return (
        <div className="flex m-5 justify-center items-center bg-gray-500 min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 bg-white w-1/3 p-6 rounded-lg shadow-md max-w-lg">
                <div className="grid grid-cols-1 gap-4 w-full p-4">
                    <div>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Email is required"
                                }
                            }}
                            render={({ field }) => (
                                <div className="flex flex-col">
                                    <label
                                        className="text-sm md:text-base lg:text-labelLarge ml-1 mb-2"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        {...field}
                                        type="text"
                                        id="email"
                                        placeholder="Enter your email here"
                                        className={`py-2.5 rounded-lg px-4 text-sm md:text-base lg:text-labelLarge  cursor-pointer border ${errors.email
                                            ? "border-red-500"
                                            : "border-[#CFCFCF] focus:border-[#006AFF]"
                                            } focus:outline-none w-full`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 ml-1 text-labelMedium mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Password is required"
                                }
                            }}
                            render={({ field }) => (
                                <div className="flex flex-col">
                                    <label
                                        className="text-labelLarge ml-1 mb-2"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        {...field}
                                        type="password"
                                        id="password"
                                        placeholder="Enter your Password here"
                                        className={`py-2.5 rounded-lg px-4 text-labelLarge cursor-pointer border ${errors.password
                                            ? "border-red-500"
                                            : "border-[#CFCFCF] focus:border-[#006AFF]"
                                            } focus:outline-none`}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 ml-1 text-labelMedium mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                    <button
                        className="border-black border-2 py-2 px-4 rounded-lg md:w-auto"
                        type="submit">
                        Save and Continue
                    </button>

                    <div className="flex justify-center items-center">

                        <p className="font-semibold text-gray-700">If you do not have an account, <Link to='/register'><span className="text-blue-500 font-semibold underline">Register</span></Link></p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginUser;
