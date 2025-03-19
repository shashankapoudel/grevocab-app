

import { useToast } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const LoginUser = ({ setUser }) => {
    const toast = useToast()
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { errors },

    } = useForm({
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const res = await fetch('https://grevocab-app.onrender.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email }),
            })
            console.log(res);
            const data1 = await res.json()
            console.log(data1);

            if (data1.error) {
                console.log("Error", "error");
                return;
            }
            toast({
                title: 'Login successfull',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            localStorage.setItem("userInfo", JSON.stringify(data1));
            // setUser(data1)
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
        <div className="flex  justify-center items-center bg-gray-500 min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/Images/loginimage4.jpg')",
                // backgroundSize: '60%',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '100vh',
                width: '100vw',
            }}>
            < form onSubmit={handleSubmit(onSubmit)} className=" flex justify-center items-center space-y-6 bg-opacity-10 backdrop-blur-6 bg-white w-full p-12 rounded-lg shadow-2xl max-w-lg">
                <div className="grid grid-cols-1 gap-4 w-full p-4">
                    <h2 className="text-white text-4xl mb-4 text-center font-bold">Welcome</h2>
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
                                        className="text-sm md:text-base lg:text-labelLarge ml-1 mb-2 text-white"
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

                    <button
                        className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"
                        type="submit">
                        Log In
                    </button>

                    <div className="flex justify-center items-center">
                        <p className="font-semibold text-white">If you do not have an account, <Link to='/register'><span className="text-yellow-500 font-semibold underline">Register</span></Link></p>
                    </div>
                </div>
            </form>
        </div >
    );
};

export default LoginUser;

