// import React, { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';
// import axios from 'axios'; // To make API calls
// import { SearchDetails } from '@/lib/functions/user/route';

// const SearchBar = ({handleSearchClick}:any) => {
//     const [query, setQuery] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (query.length > 0) {
//             setLoading(true);
//             const fetchSuggestions = async () => {
//                 try {
//                     const response = await SearchDetails()
//                     setSuggestions(response.data);
//                 } catch (error) {
//                     console.error('Error fetching suggestions:', error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce search by 300ms

//             return () => clearTimeout(timeoutId);
//         } else {
//             setSuggestions([]);
//         }
//     }, [query]);

//     return (
//         <Box sx={{ position: 'fixed', width: '300px',ml:5  }}>
//             <TextField
//                 label="Search"
//                 variant="outlined"
//                 fullWidth
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//             />
//             {loading && <CircularProgress size={24} sx={{ position: 'absolute', right: 16, top: 16 }} />}
//             {suggestions.length > 0 && (
//                 <List sx={{ position: 'absolute', top: '56px', width: '100%', bgcolor: 'background.paper', zIndex: 1, border: '1px solid #ccc', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto' }}>
//                     {suggestions.map((suggestion, index) => (
//                         <ListItem key={index} disablePadding>
//                             <ListItemButton onClick={() => setQuery(suggestion)}>
//                                 <ListItemText primary={suggestion} />
//                             </ListItemButton>
//                         </ListItem>
//                     ))}
//                 </List>
//             )}
//         </Box>
//     );
// };

// export default SearchBar;

// // import * as React from 'react';
// // import Box from '@mui/material/Box';
// // import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// // import Button from '@mui/material/Button';
// // import List from '@mui/material/List';
// // import Divider from '@mui/material/Divider';
// // import ListItem from '@mui/material/ListItem';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import ListItemText from '@mui/material/ListItemText';
// // import InboxIcon from '@mui/icons-material/MoveToInbox';
// // import MailIcon from '@mui/icons-material/Mail';

// // type Anchor = 'left' 

// // export default function SwipeableTemporaryDrawer() {
// //     const [state, setState] = React.useState({
// //         left: false,
// //     });

// //     const toggleDrawer =
// //         (anchor: Anchor, open: boolean) =>
// //             (event: React.KeyboardEvent | React.MouseEvent) => {
// //                 if (
// //                     event &&
// //                     event.type === 'keydown' &&
// //                     ((event as React.KeyboardEvent).key === 'Tab' ||
// //                         (event as React.KeyboardEvent).key === 'Shift')
// //                 ) {
// //                     return;
// //                 }

// //                 setState({ ...state, [anchor]: open });
// //             };

// //     const list = (anchor: any) => (
// //         <Box
// //             sx={{ width: 280 , ml:5 }}
// //             role="presentation"
// //             onClick={toggleDrawer(anchor, false)}
// //             onKeyDown={toggleDrawer(anchor, false)}
// //         >
// //             <List>
// //                 {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
// //                     <ListItem key={text} disablePadding>
// //                         <ListItemButton>
// //                             <ListItemIcon>
// //                                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// //                             </ListItemIcon>
// //                             <ListItemText primary={text} />
// //                         </ListItemButton>
// //                     </ListItem>
// //                 ))}
// //             </List>
// //             <Divider />
// //             <List>
// //                 {['All mail', 'Trash', 'Spam'].map((text, index) => (
// //                     <ListItem key={text} disablePadding>
// //                         <ListItemButton>
// //                             <ListItemIcon>
// //                                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// //                             </ListItemIcon>
// //                             <ListItemText primary={text} />
// //                         </ListItemButton>
// //                     </ListItem>
// //                 ))}
// //             </List>
// //         </Box>
// //     );

// //     return (
// //         <div>
// //             {(['left'] as const).map((anchor) => (
// //                 <React.Fragment key={anchor}>
// //                     <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
// //                     <SwipeableDrawer
// //                         anchor={anchor}
// //                         open={state[anchor]}
// //                         onClose={toggleDrawer(anchor, false)}
// //                         onOpen={toggleDrawer(anchor, true)}
// //                     >
// //                         {list(anchor)}
// //                     </SwipeableDrawer>
// //                 </React.Fragment>
// //             ))}
// //         </div>
// //     );
// // }


import { UserSearch } from '@/lib/functions/user/route';
import { User } from '@/type/users';
import { TextField } from '@mui/material'
import React, { useState } from 'react'

function searchBarPage({ handleSearchClick }: any) {
    const [query, setQuery] = useState('');
    const [Error, setError] = useState('');
    const [searchData, setSearchData] = useState<User[]>([])

    async function userSearch(e: any) {
        e.preventDefault();
        const search = e.target.search.value
        console.log(search)
        const SearchDetails = await UserSearch(search);
        if (SearchDetails.searchResult) {
            setSearchData(SearchDetails.searchResult)
        } else {
            setError(SearchDetails.message);
        }
    }

    return (
        <div style={{ zIndex: 9999 }} className='absolute'>
            <div className="fixed w-full z-50 left-0 top-0">

                <div className="fixed h-full w-full left-0 top-0 bg-black bg-opacity-50 z-[-1]"></div>

                <div className="absolute z-50 h-svh w-96 left-16 top-0 bg-white shadow-lg p-4">
                    <div className='mt-3'>
                        <h2 className="text-2xl font-bold text-gray-800">Search</h2>
                        <p className="text-gray-600"></p>
                        <hr className='border-b-black' />
                        <div className='mt-10 '>
                            <form onSubmit={(e: any) => userSearch(e)} >
                                <TextField
                                    label="Search"
                                    name='search'
                                    id='search'
                                    variant="outlined"
                                    fullWidth
                                    value={query}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </form>
                        </div>
                        {<span className='text-red-500 text-2xl'>{Error}</span>}
                        <hr className='border-b-0 border-black mt-3' />
                    </div>
                    <div>
                        {searchData.map((data: any, index: number) => (
                            <div key={index} className='mt-2 flex'>
                                <img src={data.image} className='w-12 rounded-full' alt="images" />
                                <div>
                                    <p className='text-gray-800 text-md'>{data.username}</p>
                                    <span>{data.fullName}</span>
                                </div>
                            </div> 
                        ))}
                    </div>
                </div> 

            </div>
        </div>
    )
}

export default searchBarPage
