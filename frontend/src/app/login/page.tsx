"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/token/", {
        username,
        password,
      });
      Cookies.set("token", response.data.access, { expires: 1 });
      Cookies.set("refreshToken", response.data.refresh, { expires: 7 });
      toast.success("User Logged in");
      router.push("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.detail);
    }
  };

  return (
    <div className='w-screen h-screen flex'>
      <div className='w-1/2 h-full flex flex-col justify-center items-center'>
        <h1 className='text-3xl text-blue-900 mb-5'>Login</h1>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await handleLogin(values.username, values.password);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col w-2/3'>
              <Field
                className='p-2 w-full text-sm border-2 border-gray-300 focus:outline-blue-900 rounded-md'
                type='username'
                name='username'
                placeholder='Username'
              />
              <div className='h-4'>
                <ErrorMessage
                  name='username'
                  component='div'
                  className='text-red-700 text-xs'
                />
              </div>

              <Field
                className='p-2 mt-3 w-full text-sm border-2 border-gray-300 focus:outline-blue-900 rounded-md'
                type='password'
                name='password'
                placeholder='Password'
              />
              <div className='h-4'>
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-red-700 text-xs'
                />
              </div>

              <button
                className='w-full bg-blue-900 text-white mt-4 p-2 rounded-md'
                type='submit'
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <p className='text-black mt-2 text-sm'>
          New to TaxGPT?
          <Link className='text-blue-900 underline' href={"/signup"}>
            Signup here
          </Link>
        </p>
      </div>
      <div className='w-1/2 h-full text-white bg-blue-900 flex flex-col justify-center items-center'>
        <h1 className='text-6xl mb-4'>TaxGPT</h1>
        <h1 className='text-xl mb-4'>Let AI do your taxes</h1>
      </div>
    </div>
  );
};

export default Login;
