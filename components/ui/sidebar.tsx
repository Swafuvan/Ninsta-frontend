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
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { logout } from '@/lib/functions/user/route';
import ModalPage from '@/pages/user/userCreatepage';
import SearchBar from '@/pages/user/searchBar';

import { useMediaQuery } from '@mui/material';

export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);
    const [openMore, setOpenMore] = React.useState(true);
    const [searchOpen, setSearchOpen] = React.useState(false);

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
        logout();
        router.push('/Login');
    };
    const location = usePathname();
    console.log(location);

    const iconMapping: { [key: string]: React.ReactElement } = {
        Home: <HomeIcon />,
        Search: <SearchIcon />,
        Explore: <ExploreIcon />,
        Reel: <VideoLibraryIcon />,
        Messages: <MailIcon />,
        Notifications: <NotificationsIcon />,
        Create: <AddCircleIcon />,
        Profile: <PersonIcon />,
        More: <MoreIcon id="moreIcon" />,
        Logout: <Logout />,
    };

    return (
        <div>
            <div className='fixed top-8 left-2'>
                <Box sx={{ maxWidth: 200, minWidth: 20 }} role="presentation">
                    {location?.includes('/messages') ?
                        <img onClick={() => window.location.href = '/'} src='/ninsta-favicon.png' className='w-10 cursor-pointer ' alt='logo' />
                        :
                        <Image onClick={() => window.location.href = '/'} src={LogoImg} width={120} alt='logoImage' className="cursor-pointer " />}
                    <List className={location?.includes('/messages') ? 'w-12' : ''} >
                        {['Home', 'Search', 'Explore', 'Reel', 'Messages', 'Notifications', 'Create', 'Profile', 'More'].map((text) => (
                            <Link href={text === 'Home' ? '/' : text === 'Create' ? '#' : text === 'More' ? '#' : text === 'Search' ? '#' : `/${text.toLowerCase()}`} key={text}>
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
                                                className={location === '/messages' || location === '/search' ? 'p-3' : ''}
                                            />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            </Link>
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
            </div>
        </div>
    );
}

function MoreDiv({ handleMoreClick }: any) {
    return (
        <div id='moreIcon' className='fixed bottom-36 left-2 z-50 w-52 bg-white shadow-md rounded p-4'>
            <ul>
                {/* <li className='mb-2 cursor-pointer' >Report a Problem</li> */}
                <Link href='/saved'>
                    <li className='mb-2 cursor-pointer' >Saved</li>
                </Link>
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
