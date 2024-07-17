import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { fetchImages } from "../../api-requests/api-request";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx"
import Loader from "../Loader/Loader.jsx"
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import Modal from "react-modal"
import cssM from "./Modal.module.css"

const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: '999',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding: 0,
            border: 'none',
            transform: 'translate(-50%, -50%)',
        },
        
    };


//Modal.setAppElement('#root')

const App = () => {
   

    const [images, setImages] = useState([])

    const [query, setQuery] = useState('');
    
    const [page, setPage] = useState(1)

    const [showBtn, setShowBtn] = useState(false)

    const [showLoader, setShowLoader] = useState(false)

    const [showErorrMsg, setShowErrorMsg] = useState(false)

    const [selectedImage, setSelectedImage] = useState(null)

    const handleClickOnImage = (image) => {
        setSelectedImage(image)
    }

    const updateQuery = (text) => {
        setQuery(text)
        setPage(1)
        setImages([])
    }

    const updatePage = () => {
        setPage(prevPage => prevPage + 1);
    }

    const renderImages = async () => {
        try {
            setShowLoader(true)
            const data = await fetchImages(query, page, 16)
            const fetchedImages = data.results
            if (page === 1) {
                setImages(fetchedImages)
            } else {
                setImages(prevImages => {
                    const seen = new Set(prevImages.map(img => img.id));
                    const uniqueImages = fetchedImages.filter(img => !seen.has(img.id));
                    return [...prevImages, ...uniqueImages];
                });
            }
            setShowBtn(data.total_pages && data.total_pages !== page)
            setShowErrorMsg(fetchedImages.length === 0);
        } catch (error) {
            setShowErrorMsg(true)
        } finally {
            setShowLoader(false)
        }
    }

    useEffect(() => {
        if (query) {
            renderImages();
        }

    }, [query, page])

    const closeModal = () => {
        setSelectedImage(null)
    }

    useEffect(() => {
        Modal.setAppElement(document.getElementById('root'));
    }, []);


    return (
        <>
            <SearchBar updateQuery={updateQuery} />
            {showErorrMsg && <ErrorMessage images={images} />}
            {images.length > 0 && <ImageGallery images={images} openModal={handleClickOnImage} />}
            {showLoader && <Loader />}
            {showBtn && <LoadMoreBtn onUpdate={updatePage} />}
            {selectedImage && <Modal
                isOpen={Boolean(selectedImage)}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} />
                <h3 className={cssM.descriptionModal}>{selectedImage.description}</h3>
            </Modal>}
        </>
     );
}
 
export default App;
