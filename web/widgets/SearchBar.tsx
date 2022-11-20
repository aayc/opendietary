import { useState } from "react";
import { Search, ArrowRightCircle, Camera } from "lucide-react";

type SearchBarProps = {
    placeholder?: string;
    enableBarcodeScanner?: boolean;
    disabled?: boolean;
    onSearch: (query: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
    const [search, setSearch] = useState("");
    const enableBarcodeScanner = props.enableBarcodeScanner || false;

    const updateSearch = (e: any) => {
        setSearch(e.target.value);
    }

    const updateSearchIfEnter = (e: any) => {
        if (e.key === "Enter") {
            props.onSearch(search);
        }
    }

    return (<div className="flex text-sm text-input-gray">
        <Search className="mt-2" size={22}></Search>
        <input type="text" placeholder="Search" className="w-full text-input-gray border-transparent focus:border-transparent focus:outline-none focus:ring-0" value={search} onChange={updateSearch} onKeyDown={updateSearchIfEnter}/>
        {enableBarcodeScanner && <button className="btn-primary mx-2" onClick={() => alert("This feature is coming soon, please check back in January 2023.")} ><Camera></Camera></button>}
        <button className={props.disabled ? 'btn-disabled' : 'btn-primary'} onClick={() => props.onSearch(search)}><ArrowRightCircle></ArrowRightCircle></button>
    </div>);
}