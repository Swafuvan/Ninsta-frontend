"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import Logout from '@mui/icons-material/Logout';

import Image from 'next/image';
import LogoImg from '../../public/Ninsta Logo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/functions/user/route';

export default function TemporaryDrawer() {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        logout();
        router.push('/Login')
    };

    const handleClick = () =>{
        window.location.href='/create'
    }

    const iconMapping: { [key: string]: React.ReactElement } = {
        Home: <HomeIcon />,
        Search: <SearchIcon />,
        Explore: <ExploreIcon />,
        Reel: <VideoLibraryIcon />,
        Messages: <MailIcon />,
        Notifications: <NotificationsIcon />,
        Create: <AddCircleIcon />,
        Profile: <PersonIcon />,
        More: <MoreIcon />,
        Logout: <Logout />,
    };

    return (
        <div className=' md:block h-screen p-2 mr-56'>
            <div className='fixed top-8 left-8'>
                <Box sx={{ width: 208 }} role="presentation" >
                    <Image src={LogoImg} width={120} alt='logoImage' />
                    <List>
                        {['Home', 'Search', 'Explore', 'Reel', 'Messages', 'Notifications', 'Profile', 'More'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {iconMapping[text]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Link href='#'>
                            <ListItem key="Create" disablePadding>
                                <ListItemButton onClick={handleClick}>
                                    <ListItemIcon>
                                        {iconMapping['Create']}
                                    </ListItemIcon>
                                    <ListItemText primary="Create" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
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

        </div>
    );
}
