import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { fetchImages } from "../../api-requests/api-request";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx"
import Loader from "../Loader/Loader.jsx"
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";

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

const App = () => {
   

    const [images, setImages] = useState([])

    const [query, setQuery] = useState('');
    
    const [page, setPage] = useState(1)

    const [showBtn, setShowBtn] = useState(false)

    const [showLoader, setShowLoader] = useState(false)

    const [showErorrMsg, setShowErrorMsg] = useState(false)

    const [selectedImage, setSelectedImage] = useState(null)

    const [modalIsOpen, setOpenModal] = useState(false)

    const handleClickOnImage = (image) => {
        if (!selectedImage) {
            setSelectedImage(image)
            setOpenModal(true)
        }
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
            setShowBtn(Boolean(data.total_pages) && Boolean(data.total_pages !== page))
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
        setOpenModal(false)
    }

    return (
        <>
            <SearchBar updateQuery={updateQuery} />
            {showErorrMsg && <ErrorMessage images={images} />}
            {images.length > 0 && <ImageGallery images={images} openModal={handleClickOnImage} />}
            {showLoader && <Loader />}
            {showBtn && <LoadMoreBtn onUpdate={updatePage} />}
            <ImageModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                customStyles={customStyles}
                selectedImage={selectedImage}
            />
        </>
     );
}
 
export default App;
