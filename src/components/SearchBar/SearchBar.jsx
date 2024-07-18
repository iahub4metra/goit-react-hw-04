import { IoSearch } from "react-icons/io5";
import css from "./SearchBar.module.css"
import toast, {Toaster} from "react-hot-toast"

const notify = () => {
        toast.error('Please fill the field!', {
            position: 'top-right',
            style: {
                backgroundColor:'pink',
            }
    })}


const SearchBar = ({ updateQuery, renderImages }) => {
    
    const handleSumbit = () => {
        const input = document.querySelector('input[type="text"]');
        if (!input.value.trim()) {
            notify()
        }
        updateQuery(input.value.trim());
    }

    return ( 
        <header className={css.headerSearchBar}>
            <form className={css.formSearchBar} onSubmit={(e) => {
                e.preventDefault();
                handleSumbit()
            }}>
                <button className={css.btnIconSubmit} type="submit"><IoSearch className={css.iconSearchBar} /></button>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button className={css.btnSumbitForm} type="submit">Search</button>
                <Toaster/>
            </form>
        </header>
     );
}
 
export default SearchBar;