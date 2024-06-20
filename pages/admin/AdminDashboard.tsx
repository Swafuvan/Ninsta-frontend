"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import Logout from '@mui/icons-material/Logout';

import Image from 'next/image';
import LogoImg from '../../public/Ninsta Logo.png'




function AdminDashboard() {

    const handleLogout = () => {
        location.href = '/admin/login'
    };

    function handleclicked() {
        alert('clicked')
        location.href = '/admin/usermanagement'
    }

    const iconMapping: { [key: string]: React.ReactElement } = {
        Dashboard: <DashboardIcon />,
        Users: <PeopleIcon />,
        Reports: <ReportIcon />,
        Logout: <Logout/>
    };

    return (
        <div>
      <div className='p-2 z-50'>
            <Box sx={{ width: 250 }} role="presentation" >
                <Image src={LogoImg} width={120} alt='logoImage' />
                <List>
                    {['Dashboard', 'Reports', ].map((text, ) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon >
                                    {iconMapping[text]}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem key="Users" disablePadding>
                        <ListItemButton onClick={()=>handleclicked()}>
                            <ListItemIcon>
                                {iconMapping['Users']}
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="Logout" disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                {iconMapping['Logout']}
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
                
            </Box>
        </div>
      <div className='mt-6'>admin Home</div>
    </div>
    )
}

export default AdminDashboard
