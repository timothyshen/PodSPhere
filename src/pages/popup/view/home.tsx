import Footer from '../components/Footer'
import CommentBar from '../components/WriteComment/CommentBar'
import CommentFilter from '../components/Comment/CommentFilter'
import Comment from '../components/Comment/Comment'
import Podcast from '../components/Podcast/Podcast'
import Header from '../components/Header'
import { useEffect } from 'react'
import browser from 'webextension-polyfill';
import { useState } from 'react'
import { getAccessToken, fetchEpisode } from '../lib/Spotify'



// const podcast = {
//     title: 'The Worlds She Sees with Godmother of AI, Fei-Fei Li',
//     description: 'Fei-Fei Li, PhD, Professor in the Computer Science Department at Stanford University, and Co-Director of Stanford’s Human-Centered AI Institute, joins Bio + Health founding par...',
//     image: 'https://cdn.player.fm/images/25004263/series/Eo3iU8rNU8jESRv4/512.jpg'
// }

export default function UserHome({ navigateToPage }: { navigateToPage: (page: React.SetStateAction<string>) => void }) {

    const [PodcastId, setPodcastId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [PodcastData, setPodcastData] = useState<any>(null);

    const clientId = "your_client_id";
    const code = undefined;

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.log(tabs)
            console.log(tabs[0].url)
            const id = tabs[0].url.split("/")[-1];
            setPodcastId(id);
            setTitle(tabs[0].title);
        })
        const fetchToken = async () => {
            // Assume getAccessToken function is available
            return await getAccessToken(clientId, code);
        };

        const fetchPodcastData = async () => {
            const token = await fetchToken();
            const data = await fetchEpisode(token, PodcastId);
            setPodcastData(data); // Store the fetched podcast data
        };

        fetchPodcastData();
    }, [PodcastId]);


    return (
        <>
            <Header />
            <main>
                {PodcastData && (
                    <Podcast
                        title={PodcastData.name || title} // Replace with actual properties from fetched data
                        description={PodcastData.description}
                        image={PodcastData.images[0].url}
                    />
                )}
                <CommentFilter />
                <Comment
                    username="user1"
                    commentText="This is a comment from user1."
                    avatarSrc="/placeholder-user.jpg"
                />

                <Comment
                    username="user2"
                    commentText="This is a comment from user2."
                    avatarSrc="/placeholder-user2.jpg"
                />
                <Comment
                    username="user2"
                    commentText="This is a comment from user2."
                    avatarSrc="/placeholder-user2.jpg"
                />
                <Comment
                    username="user2"
                    commentText="This is a comment from user2."
                    avatarSrc="/placeholder-user2.jpg"
                />

            </main >
            <CommentBar />
            <Footer />
        </>
    )
}
