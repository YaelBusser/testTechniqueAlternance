import {useState, useEffect} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextareaAutosize,
} from '@mui/material';
import axios from "axios";

export function MesCitations() {
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(null);
    const [citationsUser, setCitationsUser] = useState([]);
    const [citationInput, setCitationInput] = useState("");

    const openModalAdd = () => {
        setIsModalAddOpen(true);
    };
    const closeModalAdd = () => {
        setIsModalAddOpen(false);
    };

    const openModalDelete = (index) => {
        setIsModalDeleteOpen(index);
    };

    const closeModalDelete = () => {
        setIsModalDeleteOpen(null);
    };

    const fetchCitationsUser = async () => {
        try {
            const response = await axios.get("http://localhost:5555/citations");
            if (response.data.length > 0) {
                setCitationsUser(response.data);
            }
        } catch (error) {
            console.log("Erreur lors de la récupération de la citation personnalisée : ", error);
        }
    }

    const addCitation = async () => {
        try{
            const response = await.axios.post("http://localhost:5555/");
        }catch (error){
            console.log("Erreur lors de l'ajout d'une citation personnalisée : ", error);
        }
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#6203AD',
            },
            secondary: {
                main: '#6203AD',
            },
        },
    });

    useEffect(() => {
        fetchCitationsUser();
    }, []);
    return (
        <div className="container-mes-citations">
            <h2>Mes citations</h2>
            <div className="container-add-search">
                <button onClick={openModalAdd}><i className="fa-light fa-plus"></i> Ajouter une citation</button>
                <div className="container-search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Rechercher dans mes citations"/>
                </div>
                <ThemeProvider theme={theme}>
                    <Dialog open={isModalAddOpen} onClose={closeModalAdd}>
                        <DialogTitle>Ajouter une citation</DialogTitle>
                        <DialogContent style={{minWidth: '500px'}}>
                            <DialogContentText>
                                <TextareaAutosize
                                    aria-label="Citation"
                                    placeholder="Saisissez votre citation..."
                                    value={citationInput}
                                    onChange={(e) => setCitationInput(e.target.value)}
                                    rowsMin={3}
                                    maxLength={255}
                                    style={{
                                        width: '100%',
                                        maxHeight: '500px',
                                        minHeight: '100px',
                                        resize: 'none',
                                        fontFamily: 'Bahnschrift',
                                        border: '1px solid rgba(0,0,0,0.2)',
                                        borderRadius: '10px',
                                        paddingLeft: '10px',
                                        paddingTop: '10px',
                                        fontSize: '15px'
                                    }}
                                />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeModalAdd} variant="contained" color="secondary">
                                Annuler
                            </Button>
                            <Button variant="contained" color={"success"}>
                                Enregistrer
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ThemeProvider>
            </div>
            <div className="container-citations-user">
                {citationsUser.map((citationUser, index) => (
                    <div key={index}
                         className={`container-citation-user ${index === citationsUser.length - 1 ? "last-citation" : ""}`}>
                        <p>{citationUser.citation}</p>
                        <div className="citation-user-icons">
                            <i className="fa-solid fa-trash" onClick={() => openModalDelete(index)}></i>
                            <i className="fa-solid fa-pen"></i>
                            <ThemeProvider theme={theme}>
                                <Dialog open={isModalDeleteOpen === index} onClose={closeModalDelete}>
                                    <DialogTitle>Supprimer cette citation ?</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText style={{ fontStyle: 'italic', }}>
                                            "{citationUser.citation}"
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={closeModalDelete} variant="contained" color="secondary">
                                            Annuler
                                        </Button>
                                        <Button variant="contained" color={"error"}>
                                            Supprimer
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </ThemeProvider>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
