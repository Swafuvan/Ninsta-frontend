'use client'
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Input } from "@/components/ui/input";
import { UserProfileValidation } from '@/lib/validation';
import { UserfindById, UserProfileEdit } from '@/lib/functions/user/route';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { User } from '@/type/users';

function EditProfilePage() {
  const user = useSelector((state: RootState) => state.auth);
  const [profileImage, setProfileImage] = useState<string>();
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    if (user.user) {
      UserfindById(user.user._id).then((datas) => {
        setUserData(datas.userDetail);
        setProfileImage(datas.userDetail.image);
      });
    }
  }, [user.user]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setProfileImage(event.target.result);
        setUserData((prevUserData: any) => ({
          ...prevUserData,
          image: event.target.result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function triggerFileInput() {
    document.getElementById('profileImageInput')?.click();
  }

  async function profileSubmit(values: any) {
    console.log(values,profileImage,user.user?._id);
    const userDetails = await UserProfileEdit(values,profileImage,user.user?._id+'');
    setUserData(userDetails.userDatas) 
    window.location.href = '/profile'
  }

  return (
    <>
      <Formik
        initialValues={{
          fullName: userData?.fullName || '',
          username: userData?.username || '',
          bio: userData?.bio || '',
          Gender: userData?.Gender || '',
          DOB: userData?.DOB || '',
        }}
        enableReinitialize
        validationSchema={UserProfileValidation}
        onSubmit={profileSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md mt-10 mb-10">
              {/* <!-- Header --> */}
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="font-bold">Edit profile</h2>
                <button type="submit" className="text-blue-500" disabled={isSubmitting}>Done</button>
              </div>

              {/* <!-- Profile Picture --> */}
              <div className="flex flex-col items-center my-4">
                <img
                  src={profileImage || 'https://via.placeholder.com/100'}
                  alt="Profile Photo"
                  className="w-24 h-24 rounded-full"
                  
                />
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <button type="button" className="text-blue-500 mt-2" onClick={triggerFileInput}>
                  Change profile photo
                </button>
              </div>

              {/* <!-- Form Fields --> */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700" htmlFor="fullName">Full Name</label>
                  <Field type="text" id="fullName" name="fullName" placeholder="Enter your Name" as={Input} />
                  <ErrorMessage name="fullName" component="div" className="text-red-500" />
                </div>
                <div>
                  <label className="block text-gray-700" htmlFor="username">Username</label>
                  <Field type="text" id="username" name="username" placeholder="Enter your Username" as={Input} />
                  <ErrorMessage name="username" component="div" className="text-red-500" />
                </div>
                <div>
                  <label className="block text-gray-700" htmlFor="bio">Bio</label>
                  <Field as="textarea" id="bio" name="bio" className="w-full border p-2 rounded-md" rows={3} placeholder="Enter your bio" />
                  <ErrorMessage name="bio" component="div" className="text-red-500" />
                </div>

                <div>
                  <label className="block text-gray-700" htmlFor="Gender">Gender</label>
                  <Field as="select" id="Gender" name="Gender" className="w-full border p-2 rounded-md">
                    <option value="" label="Select your gender" />
                    <option value="male" label="Male" />
                    <option value="female" label="Female" />
                    <option value="other" label="Other" />
                  </Field>
                  <ErrorMessage name="Gender" component="div" className="text-red-500" />
                </div>
                <div>
                  <label className="block text-gray-700" htmlFor="DOB">Date of Birth</label>
                  <Field type="date" id="DOB" name="DOB" className="w-full border p-2 rounded-md" />
                  <ErrorMessage name="DOB" component="div" className="text-red-500" />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default EditProfilePage;
