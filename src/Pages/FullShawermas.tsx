import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



export const FullShawermas: React.FC = () => {
    

    const [shawerma, setShwerma] = useState<{
        imageUrl: string,
        name: string
    }>()
    const { id } = useParams();

    useEffect(() => {
        async function fetchShawerma() {
            try {
                const { data } = await axios.get('https://65151360dc3282a6a3cdd042.mockapi.io/shawermas/' + id)
                setShwerma(data)
            } catch (error) {
                alert("Произошла ошибка при получении пиццы")
            }
        }
        fetchShawerma()
    }, [])

    return (
        <>
        {
            shawerma && 
            <div>
                <img src={shawerma.imageUrl} alt='img'/>
                <h2>{shawerma.name}</h2>
            </div>
        }
            
        </>
    )
}