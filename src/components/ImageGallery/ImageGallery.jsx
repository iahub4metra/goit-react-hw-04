import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css"
const ImageGallery = ({images, openModal}) => {
    return ( 
        <ul className={css.listGallery}>
            {images.map(image => (
                <li className={css.listItem} key={image.id}>
                    <ImageCard image={image} openModal={openModal} />
                </li>
            ))}
        </ul>
     );
}

export default ImageGallery;