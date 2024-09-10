"use client"
import React, { forwardRef, Fragment, ReactElement, Ref } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { UserBlocked } from '@/lib/functions/admin/route';
import toast from 'react-hot-toast';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ handleConfirmClose, singleUser, onBlockToggle }: any) {

    const handleAction = async () => {
        try {
            // Call API to update block status
            if (singleUser) {

                const isBlocked = singleUser?.isBlocked
                await UserBlocked(singleUser?.email, !isBlocked);
                handleConfirmClose();
                if (isBlocked === false) {
                    toast.success('User Blocked Successfully');
                } else {
                    toast.success('User Unblocked Successfully');
                }
                onBlockToggle(singleUser?.email + '', singleUser?.isBlocked + '')
            }
        } catch (error) {
            console.error("Failed to update user status:", error);
        }
    };


    return (
        <Fragment>
            <Dialog
                open={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleConfirmClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Block this User?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are Sure Do you want to Block this User.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>Cancel</Button>
                    <Button onClick={handleAction}>{singleUser?.isBlocked === true ? "UnBlock" : "Block"}</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
