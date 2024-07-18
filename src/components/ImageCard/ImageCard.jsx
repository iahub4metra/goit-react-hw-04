import css from "./ImageCard.module.css"
const ImageCard = ({ image, openModal }) => {
    return ( 
        <div>
            <img onClick={()=> openModal(image)} className={css.image} src={image.urls.small} alt={image.alt_description} />
        </div>
     );
}
 
export default ImageCard;