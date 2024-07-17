import { IoSearch } from "react-icons/io5";
import css from "./SearchBar.module.css"
const SearchBar = ({ updateQuery, renderImages }) => {
    const handleSumbit = () => {
        const input = document.querySelector('input[type="text"]');
        updateQuery(input.value.trim());
    }

    return ( 
        <header className={css.headerSearchBar}>
            <form className={css.formSearchBar} onSubmit={(e) => {
                e.preventDefault();
                handleSumbit()
            }}>
                <IoSearch className={css.iconSearchBar} onClick={()=>handleSumbit()}/>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button type="submit">Search</button>
            </form>
        </header>
     );
}
 
export default SearchBar;