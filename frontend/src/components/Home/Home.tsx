import axios from 'axios';
import {useState, useEffect} from 'react';
import {Card, CardContent, Typography, IconButton, Snackbar} from '@mui/material';


interface FavorisData {
    id: number;
    citation: string;
    personnage: string;
    episode: string;
}

export function Home() {
    const [citation, setCitation] = useState<string>("");
    const [personnage, setPersonnage] = useState<string>("");
    const [episode, setEpisode] = useState<string>("");
    const [favoris, setFavoris] = useState<FavorisData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isFavorisToggle, setIsFavorisToggle] = useState<boolean>(false);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarContent, setSnackbarContent] = useState<string>("");
    const [styleSnackbar, setStyleSnackbar] = useState<string>("");



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

    const fetchCitationUser = async () => {
        try {
            const response = await axios.get("http://localhost:5555/citations/random");
            setCitation(response.data.citation);
            setPersonnage(response.data.infos.personnage);
            setEpisode(response.data.infos.episode);
            setIsLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération de la citation : ", error);
        }
    };

    const addFavoris = async () => {
        try {
            const favorisAlreadyExists = favoris.some((favori) => favori.citation === citation);
            if (favorisAlreadyExists) {
                setOpenSnackbar(true);
                setSnackbarContent("Cette citation est déjà en favoris !");
                setStyleSnackbar("snackbarError");
            } else {
                await axios.post("http://localhost:5555/favoris", {
                    personnage: personnage,
                    episode: episode,
                    citation: citation,
                });
                fetchFavoris();
                setOpenSnackbar(true);
                setSnackbarContent("Citation ajoutée à vos favoris !");
                setStyleSnackbar("snackbar");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la citation aux favoris' : ", error);
        }
    };

    const fetchFavoris = async () => {
        try {
            const response = await axios.get("http://localhost:5555/favoris");
            setFavoris(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération de la citation : ", error);
        }
    };
    const toggleFavoris = () => {
        setIsFavorisToggle((prevState) => !prevState);
    };

    const deleteFavoris = async (idFavoris) => {
        const response = await axios.delete(`http://localhost:5555/favoris/${idFavoris}`)
        if (response.status === 201) {
            fetchFavoris();
            setOpenSnackbar(true);
            setSnackbarContent("La citation a bien été supprimée de vos favoris !");
            setStyleSnackbar("snackbar");
        }
    }


    useEffect(() => {
        fetchCitationRandom();
        fetchFavoris();
    }, []);
    if (isLoading) {
        if (!citation) {
            return <div>Loading...</div>;
        }
    }
    else {
        return (
            <div className="main">
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={5000}
                    onClose={() => setOpenSnackbar(false)}
                    message={snackbarContent}
                    ContentProps={{className: `${styleSnackbar}`}}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => setOpenSnackbar(false)}
                        >
                            <i className="fa-solid fa-circle-xmark"></i>
                        </IconButton>
                    }
                />
                <h1>Citations</h1>
                <div className={`container-citation-random`}>
                    <p className="citation-random">"{citation}"</p>
                    {personnage ? (
                        <div className="citation-random-infos">
                            <p>{personnage} - "{episode}"</p>
                        </div>
                    ) : (
                        <span></span>
                    )}
                    {personnage ? (
                        <div className="citation-random-favoris btn-favoris" onClick={() => addFavoris()}
                             onMouseOver={(e) => setIsHover(true)} onMouseOut={(e) => setIsHover(false)}>
                            <i className={`${isHover ? "fa-solid" : "fa-regular"} fa-star btn-favoris`}></i>
                            <p>Mettre en favoris</p>

                        </div>
                    ) : (
                        <span></span>
                    )}
                </div>
                <div className="container-autre-citation">
                    <h2>Afficher une autre citation</h2>
                    <div className="autre-citation-btn">
                        <button onClick={fetchCitationUser}><i className="fa-solid fa-eye"></i>Parmi mes citations
                        </button>
                        <button onClick={fetchCitationRandom}><i className="fa-solid fa-eye"></i>Parmi les citations de
                            Kaamelott
                        </button>
                    </div>
                </div>
                <div className="container-mesFavoris">
                    <button onClick={toggleFavoris} className="btn-toggle-favoris">
                        {isFavorisToggle ? 'Masquer Favoris' : 'Afficher Favoris'}
                    </button>
                    {isFavorisToggle ? (
                        favoris.length === 0 ? (
                            <p className="no-favoris">Aucuns favoris</p>
                        ) : (
                            favoris.map((favori, index) => (
                                <Card key={index} className="mesFavoris">
                                    <CardContent className="mesFavoris-card">
                                        <Typography variant="body2" className="mesFavoris-erase"><i
                                            className="fa-solid fa-eraser" onClick={() => deleteFavoris(favori.id)}></i></Typography>
                                        <Typography variant="body3" className="mesFavoris-block-citation"><p
                                            className="mesFavoris-citation">{favori.citation}</p></Typography>
                                        <Typography variant="body2"
                                                    className="mesFavoris-infos">{`${favori.personnage} - "${favori.episode}"`}</Typography>
                                    </CardContent>
                                </Card>
                            ))
                        )
                    ) : null}
                </div>
            </div>
        );
    }
}
