import Cancel from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../redux/product/productSlice';

export default function Search() {
    const searchParam = useSelector(state => state.product.searchParam)
    const [dirtySearch, setDirtySearch] = useState(false)

    const dispatch = useDispatch();

    const search = () => {
        dispatch(productActions.getProductsWithQuantitiesRequest())
        setDirtySearch(true)
    }

    const keyPressHandler = (e) => {
        if (searchParam !== '' && e.key === 'Enter') {
            e.preventDefault();
            dispatch(productActions.setIsSearched(true))
            search();
        }
    }

    useEffect(() => {
        if (dirtySearch && searchParam === '') {
            search()
            dispatch(productActions.setIsSearched(false))
        }
    }, [searchParam])


    return (
        <Paper
            component="form"
            sx={{ p: '0px 0px 0px 10px', display: 'flex', alignItems: 'center', width: 700, borderRadius: '20px' }}
        >
            <IconButton sx={{ p: '0 5px 0 5px' }} aria-label="menu">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Searching for..."
                value={searchParam}
                onChange={(e) => dispatch(productActions.setSearchParam(e.target.value))}
                onKeyDown={keyPressHandler}
            />
            {searchParam && <IconButton onClick={() => {
                dispatch(productActions.setSearchParam(''));
            }} sx={{ p: '0 5px 0 5px' }} aria-label="close">
                <Cancel />
            </IconButton>}
            <IconButton id='search-button'
                type="button"
                onClick={() => {
                    dispatch(productActions.setIsSearched(true))
                    search()
                }}
                sx={[
                    {
                        p: '12.5px 50px',
                        backgroundColor: '#C24B5A',
                        borderRadius: '0px 20px 20px 0px',

                    },
                    {
                        '&:hover': { backgroundColor: '#de3b50' }
                    }
                ]} aria-label="search">
                <div style={{ fontSize: '16px', color: 'white' }}>Search</div>
            </IconButton>
        </Paper>
    );
}