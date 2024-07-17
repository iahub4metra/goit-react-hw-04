import css from "./LoadMoreBtn.module.css"
const LoadMoreBtn = ({ onUpdate }) => {
    return ( 
        <button className={css.btnLoadMore} onClick={()=> onUpdate()}>Load more</button>
     );
}
 
export default LoadMoreBtn;