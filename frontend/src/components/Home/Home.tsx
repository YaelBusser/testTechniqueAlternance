import axios from 'axios';
import {useState, useEffect} from 'react';

export function Home() {
    const [citation, setCitation] = useState('');
    const fetchCitationRandom = async () => {
        try {
            const response = await axios.get("/api/kaamelott/random");
            setCitation(response.data.citation);
        } catch (error) {
            console.error("Erreur lors de la récupération de la citation : ", error);
        }
    };


    // Appelle la fonction pour récupérer une citation aléatoire au chargement du composant
    useEffect(() => {
        fetchCitationRandom();
    }, []);

    if (!citation) {
        return <div>Loading...</div>;
    }
    return (
        <div className="main">
            <h1>Citations</h1>
            <div className="container-citation-random">
                <p className="citation-random">"{citation.citation}"</p>
                <div className="citation-random-infos">
                    <p>{citation.infos.personnage} - "{citation.infos.episode}"</p>
                </div>
                <div className="citation-random-favoris btn-favoris">
                    <i className="fa-regular fa-star"></i>
                    <p>Mettre en favoris</p>
                </div>
            </div>
            <div className="container-autre-citation">
                <h2>Afficher une autre citation</h2>
                <div className="autre-citation-btn">
                    <button><i className="fa-solid fa-eye"></i>Parmi mes citations</button>
                    <button onClick={fetchCitationRandom}><i className="fa-solid fa-eye"></i>Parmi les citations de
                        Kaamelott
                    </button>
                </div>
            </div>
        </div>
    );
}
