import Modal from "react-modal"
import css from "./ImageModal.module.css"
Modal.setAppElement('#root')

const ImageModal = ({modalIsOpen, closeModal, customStyles, selectedImage}) => {
    return ( 
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <img src={selectedImage?.urls?.regular} alt={selectedImage?.alt_description} />
            <h3 className={css.descriptionModal}>{selectedImage?.description}</h3>
        </Modal>
     );
}
 
export default ImageModal;