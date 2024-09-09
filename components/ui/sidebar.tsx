'use client'
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
import { useRouter, usePathname } from 'next/navigation';
import ModalPage from '@/pages/user/userCreatepage';
import Cookies from 'js-cookie';
import SearchBar from '@/pages/user/searchBar';

import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useSocket } from '../Provider/clientProvider';

export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);
    const [openMore, setOpenMore] = React.useState(true);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const {socket} = useSocket();
    const user = useSelector((state:RootState) => state.auth );

    const isMobile = useMediaQuery('(max-width: 600px)');
    const isTablet = useMediaQuery('(max-width: 960px)');

    const handleDrawerOpen = () => {
        setOpen(false);
    };

    const handleSearchClick = () => {
        setSearchOpen(!searchOpen);
    }

    const handleMoreClick = () => {
        setOpenMore(!openMore);
    };

    const router = useRouter();
    const handleLogout = () => {
        socket.emit("disconnectUsers", user.user?._id)
        Cookies.remove('userToken');
        router.push('/Login');
    };
    const location = usePathname();
    console.log(location);

    const iconMapping: { [key: string]: React.ReactElement } = {
        Home: <HomeIcon />,
        Search: <SearchIcon />,
        Explore: <ExploreIcon />,
        Reels: <VideoLibraryIcon />,
        Messages: <MailIcon />,
        Notifications: <NotificationsIcon />,
        Create: <AddCircleIcon />,
        Profile: <PersonIcon />,
        More: <MoreIcon id="moreIcon" />,
        Logout: <Logout />,
    };

    return (
        <aside
            id="logo-sidebar"
            className="sm:ml-16 fixed justify-start items-start top-0 left-0 z-40 h-screen pt-20 transition-transform bg-white sm:w-auto md:w-auto "
            aria-label="Sidebar"
        >
            <div className="h-full pb-4 overflow-y-auto bg-white dark:bg-gray-800">

                <div className='fixed top-8 left-2'>
                    <Box sx={{ maxWidth: 200, minWidth: 20 }} role="presentation">
                        {location?.includes('/messages') ?
                            <img onClick={() => window.location.href = '/'} src='/ninsta-favicon.png' className='w-10 cursor-pointer md:max-w-none' alt='logo' />
                            :
                            <Image onClick={() => window.location.href = '/'} src={LogoImg} width={120} alt='logoImage' className="cursor-pointer hidden md:inline ms-3" />}
                        <List className={location?.includes('/messages') ? 'w-12' : 'w-14'} >
                            {['Home', 'Search', 'Explore', 'Reels', 'Messages', 'Notifications', 'Create', 'Profile', 'More'].map((text) => (
                                <a href={text === 'Home' ? '/' : text === 'Create' ? '#' : text === 'More' ? '#' : text === 'Search' ? '#' : `/${text.toLowerCase()}`} key={text}>
                                    <ListItem disablePadding >
                                        <ListItemButton onClick={text === 'Create' ? () => setOpen(true) : text === 'More' ? () => handleMoreClick() : text === 'Search' ? () => handleSearchClick() : undefined}>
                                            <ListItemIcon>
                                                {iconMapping[text]}
                                                {open && text === 'Create' && <ModalPage handleDrawerOpen={handleDrawerOpen} />}
                                                {!openMore && text === 'More' && <MoreDiv handleMoreClick={handleMoreClick} />}
                                                {searchOpen && text === 'Search' && <SearchBar handleSearchClick={handleSearchClick} />}
                                            </ListItemIcon>
                                            {!isMobile && !isTablet && (
                                                <ListItemText
                                                    primary={location === '/messages' || location === '/search' ? "" : text}
                                                    className={location === '/messages' || location === '/search' ? 'p-3 hidden md:inline ms-3' : 'hidden md:inline ms-3'}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                </a>
                            ))}
                            <ListItem key="Logout" disablePadding>
                                <ListItemButton onClick={handleLogout}>
                                    <ListItemIcon>
                                        {iconMapping['Logout']}
                                    </ListItemIcon>
                                    {!isMobile && !isTablet && location !== '/messages' && (
                                        <ListItemText primary="Logout" className="hidden md:block" />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    {/* <UserSideBar /> */}
                </div>

            </div >
        </aside>
    );
}



function MoreDiv({ handleMoreClick }: any) {
    return (
        <div id='moreIcon' className='fixed bottom-36 left-2 z-50 w-52 bg-white shadow-md rounded p-4'>
            <ul>
                {/* <li className='mb-2 cursor-pointer' >Report a Problem</li> */}
                <a href='/saved'>
                    <li className='mb-2 cursor-pointer' >Saved</li>
                </a>
                <hr />
                <li className='mb-2 cursor-pointer' >Your Activity</li>
                <hr />
                <li className='mb-2 cursor-pointer' >Settings</li>
                <hr />
                <li className='cursor-pointer' onClick={handleMoreClick}>Close</li>
            </ul>
        </div>
    );
}
