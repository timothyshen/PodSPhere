import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faSearch } from "@fortawesome/free-solid-svg-icons";

type IconContainerProps = {
    icon: IconDefinition;
    label: string;
};

const IconContainer = ({ icon, label }: IconContainerProps) => (
    <div className="w-10 h-10  rounded-full flex items-center justify-center hover:bg-zinc-300 cursor-pointer" aria-label={label}>
        <FontAwesomeIcon icon={icon} className="text-gray-500 text-2xl" />
    </div>
);

const Header = () => {
    return (
        <div className="min-h-[50px] w-full flex justify-between items-center bg-zinc-100 px-2">
            <IconContainer icon={faSearch} label="Home" />

            <div className="w-10 h-10 bg-zinc-300 rounded-full flex items-center justify-center hover:bg-zinc-300 cursor-pointer">

            </div>
        </div>
    );
}


export default Header;