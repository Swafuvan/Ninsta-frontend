'use client';
import React, { useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, } from "@nextui-org/react";
import { ReportPosts, UserFindbyId, userReportAction, UserReports } from '@/lib/functions/admin/route';
import { AllPostReports } from '@/lib/functions/Posts/route';
import toast from 'react-hot-toast';
import { User } from '@/type/users';
import { useRouter } from 'next/navigation';


function ReportUserModalPage({closeModal,data}:any) {

    const [reportedUser, setReportedUser] = React.useState<User>();
    console.log(data)
    const router = useRouter();
    useEffect(() => {
        if(data.postId){
            UserFindbyId(data.postId.userId).then((res)=>{
                setReportedUser(res.userData);  
            })
        }
    },[data.postId]);

    console.log(data)
    async function handleReport(data:any){
        const response = await userReportAction(data) 
        console.log(response)
        if(response?.userReports){
            if(response?.userReports?.solve === false){
                toast.success('Post Blocked From Userside')
            }else{
                toast.success('Post Unblocked From Userside')
            }
        }
        closeModal()
        location.reload()
    }

    // async function CancelTheReport(data:any){
    //     const CancellingReport = await
    // }
    return (
        <div>
            <>
                <Modal
                    backdrop="opaque"
                    isOpen={true}
                    onOpenChange={closeModal}
                    classNames={{
                        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 "
                    }}
                >
                    <ModalContent className="border w-96 border-gray-400 bg-slate-200 rounded-md h-fit mt-10">
                        {(closeModal) => (
                            <>
                                <ModalHeader className="flex items-center flex-col gap-1"> </ModalHeader>
                                <ModalBody className="">
                                    <div className='flex flex-col gap-1 items-center'>
                                        <img src={data?.userId?.image } alt="image" className='w-60 h-72' />
                                        <span>Name: {data?.userId?.username}</span>
                                        <span>Email: {data?.userId?.email}</span>
                                        <span className='text-red-600'>Reason: {data?.reason}</span>
                                    </div>
                                </ModalBody >
                                <ModalFooter className='flex flex-row justify-around px-0 py-0 mb-2'>
                                    <Button onClick={()=>handleReport(data)} className='border bg-gray-500 border-black rounded-md'>
                                        {data.solve === true ? "UnBlock" : "Block"}
                                    </Button>
                                    {/* <Button onClick={()=>CancelTheReport(data)} className='border bg-slate-300 border-black rounded-md'>
                                        Cancel
                                    </Button> */}
                                    <Button className='Button border bg-black text-white border-black rounded-md' onPress={closeModal}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        </div>
    )
}

export default ReportUserModalPage
