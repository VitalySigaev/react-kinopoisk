import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';



const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [validateSearch, setValidateSearch] = useState<boolean>(false);
    const router = useNavigate();

    const MAX_HISTORY_LENGTH: number = 20;

    const saveToHistory = (term: string) => {
        setSearchHistory(prev => {
            const updatedHistory = [term, ...prev.filter(item => item !== term)].slice(0, MAX_HISTORY_LENGTH);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            return updatedHistory;
        });
    };


    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]') as string[];
        setSearchHistory(storedHistory);
    }, []);


    const filterSuggestions = (inputValue: string) => {
        return searchHistory.filter(term => term.toLowerCase().includes(inputValue.toLowerCase()));
    };

    const handleSuggestionSelect = (value: string | null) => {
        if (value !== null) {
            setSearchTerm(value);
        }

    };


    const handleInputChange = (event: React.ChangeEvent<{}>, value: string | null) => {
        if (value !== null) {
            setSearchTerm(value);
            setSuggestions(filterSuggestions(value));
        }
        setValidateSearch(false);
    };

    const handleSubmit = async () => {
        if (searchTerm.trim()) {
            setValidateSearch(false);
            router(`/search?query=${encodeURIComponent(searchTerm)}`);
            saveToHistory(searchTerm);
        }
        else {
            setValidateSearch(true);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: 'center', margin: '10px 0' }}>
            {searchHistory.length > 0 && (
                <Autocomplete
                    style={{ minWidth: '200px' }}
                    freeSolo
                    value={searchTerm}
                    options={suggestions}
                    onChange={(event, value) => handleSuggestionSelect(value)}
                    inputValue={searchTerm}
                    onInputChange={handleInputChange}
                    onFocus={() => setValidateSearch(false)}
                    renderInput={(params) => (
                        <div>
                            <TextField {...params} label="Поиск" style={{ position: 'relative', marginBottom: 2 }} variant="outlined" />
                            {validateSearch &&
                                <Typography style={{ position: 'absolute', color: 'red' }}>
                                    Введите текст
                                </Typography>}
                        </div>
                    )}
                />
            )}

            {searchHistory.length === 0 && (
                <TextField
                    label="Поиск"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            )}
            <Button style={{ justifySelf: "center", alignSelf: "center", marginLeft: 10 }} onClick={handleSubmit} variant="contained" color="primary"  >Искать</Button>
        </div>
    );

};

export default Search;
