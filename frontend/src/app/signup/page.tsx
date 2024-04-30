"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import formatErrorsToString from "@/utils/error";

const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Signup = () => {
  const router = useRouter();

  const handleRegister = async (values: typeof SignupSchema) => {
    try {
      const response = await axiosInstance.post("/auth/register/", values, {
        noAuth: true,
      });
      toast.success("User Registered");

      router.push("/login");
    } catch (error: any) {
      if (error?.response.status == 400) {
        toast.error(formatErrorsToString(error?.response?.data?.errors));
      } else {
        toast.error(error?.response?.data?.detail);
      }
    }
  };

  return (
    <div className='w-screen h-screen flex'>
      <div className='w-1/2 h-full text-white bg-blue-900 flex flex-col justify-center items-center'>
        <h1 className='text-6xl mb-4'>TaxGPT</h1>
        <h1 className='text-xl mb-4'>Let AI do your taxes</h1>
      </div>
      <div className='w-1/2 h-full flex flex-col justify-center items-center'>
        <h1 className='text-3xl text-blue-900 mb-5'>Signup</h1>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await handleRegister(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col w-2/3'>
              <Field
                className='p-2 w-full text-sm border-2 border-gray-300 focus:outline-blue-900 rounded-md'
                type='text'
                name='first_name'
                placeholder='First Name'
              />
              <div className='h-4'>
                <ErrorMessage
                  name='first_name'
                  component='div'
                  className='text-red-700 text-xs'
                />
              </div>
              <Field
                className='p-2 mt-3 w-full text-sm border-2 border-gray-300 focus:outline-blue-900 rounded-md'
                type='text'
                name='last_name'
                placeholder='Last Name'
              />
              <div className='h-4'>
                <ErrorMessage
                  name='last_name'
                  component='div'
                  className='text-red-700 text-xs'
                />
              </div>

              <Field
                className='p-2 mt-3 w-full text-sm border-2 border-gray-300 focus:outline-blue-900 rounded-md'
                type='email'
                name='email'
                placeholder='Email'
              />
              <div className='h-4'>
                <ErrorMessage
                  className='text-red-700 text-xs'
                  name='email'
                  component='div'
                />
              </div>

              <Field
                className='p-2 mt-3  w-full text-sm border-2 border-gray-300 focus:outline-blue-900 rounded-md'
                type='text'
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
                className='p-2 mt-3  w-full text-sm border-2 border-gray-300 focus:outline-blue-900 rounded-md'
                type='password'
                name='password'
                placeholder='Password'
              />
              <div className='h-4'>
                <ErrorMessage
                  name='password'
                  className='text-red-700 text-xs'
                  component='div'
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
          Already have an account?{" "}
          <Link className='text-blue-900 underline' href={"/login"}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
