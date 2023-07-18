import axios from 'axios';
import {useState, useEffect} from 'react';

export function Home() {
    const [citation, setCitation] = useState("");
    const [personnage, setPersonnage] = useState("");
    const [episode, setEpisode] = useState("");
    const [favoris, setFavoris] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCitationRandom = async () => {
        try {
            const response = await axios.get("/api/kaamelott/random");
            setCitation(response.data.citation.citation);
            setPersonnage(response.data.citation.infos.personnage);
            setEpisode(response.data.citation.infos.episode);
            setIsLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération de la citation : ", error);
        }
    };

    const addFavoris = async () => {
        try {
            await axios.post("http://localhost:5555/favoris", {
                personnage: personnage,
                episode: episode,
                citation: citation,
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout de la citation aux favoris' : ", error);
        }
    };

    useEffect(() => {
        fetchCitationRandom();
    }, []);
    if (isLoading) {
        if (!citation) {
            return <div>Loading...</div>;
        }
    } else {
        return (
            <div className="main">
                <h1>Citations</h1>
                <div className="container-citation-random">
                    <p className="citation-random">"{citation}"</p>
                    <div className="citation-random-infos">
                        <p>{personnage} - "{episode}"</p>
                    </div>
                    <div className="citation-random-favoris btn-favoris" onClick={() => addFavoris()}>
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
}
