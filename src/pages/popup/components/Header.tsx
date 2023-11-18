import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { ProfilePicture } from "./Profile/ProfilePicture";
import { useProfile } from '@lens-protocol/react-web';
import { useAuth } from '../context/AuthContext';


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

    const { open } = useWeb3Modal()
    const { profileId } = useAuth();
    const { data: profile, error, loading } = useProfile({ forProfileId: profileId });
    console.log(profile, error, loading)


    return (
        <div className="min-h-[50px] w-full flex justify-between items-center bg-zinc-100 px-2 fixed">
            <IconContainer icon={faSearch} label="Home" />

            <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                <ProfilePicture picture={profile.metadata.picture} />
            </div>
        </div>
    );
}


export default Header;


