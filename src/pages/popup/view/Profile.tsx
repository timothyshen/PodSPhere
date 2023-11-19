import Footer from '../components/Footer'
import CommentBar from '../components/WriteComment/CommentBar'
import CommentFilter from '../components/Comment/CommentFilter'
import Header from '../components/Header'
import { useState } from 'react'
import CommentListLens from '../components/Comment/CommentList-lens'
import { ProfileCard } from '../components/Profile/ProfileCard'
import { useAuth } from '../context/AuthContext';
import { useProfile } from '@lens-protocol/react-web';



export default function Profile({ navigateToPage }: { navigateToPage: (page: React.SetStateAction<string>) => void }) {

    const [PodcastId, setPodcastId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [PodcastData, setPodcastData] = useState<any>(null);
    const { profileId } = useAuth();
    const { data: profile, error, loading } = useProfile({ forProfileId: profileId(profileId) });

    return (
        <>
            <Header />
            <main className='p-2 max-h-[380px] overflow-y-scroll'>
                <ProfileCard profile={profile} />
                <CommentFilter />
                <CommentListLens />
            </main >
            <CommentBar />
            <Footer />
        </>
    )
}
