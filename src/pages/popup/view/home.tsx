import Footer from '../components/Footer'
import CommentBar from '../components/WriteComment/CommentBar'
import CommentFilter from '../components/Comment/CommentFilter'
import Podcast from '../components/Podcast/Podcast'
import Header from '../components/Header'
import { useEffect } from 'react'
import { useState } from 'react'
import { getToken, fetchEpisode } from '../lib/Spotify'
import CommentList from '../components/Comment/CommentList'


const podcast = {
    title: 'The Worlds She Sees with Godmother of AI, Fei-Fei Li',
    description: 'Fei-Fei Li, PhD, Professor in the Computer Science Department at Stanford University, and Co-Director of Stanford’s Human-Centered AI Institute, joins Bio + Health founding par...',
    image: 'https://cdn.player.fm/images/25004263/series/Eo3iU8rNU8jESRv4/512.jpg'
}

export default function UserHome({ navigateToPage }: { navigateToPage: (page: React.SetStateAction<string>) => void }) {

    const [PodcastId, setPodcastId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [PodcastData, setPodcastData] = useState<any>(null);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            // console.log(tabs[0].url)
            if (tabs[0].url.includes("spotify")) {
                const id = tabs[0].url.split("/")[4];
                // console.log("browser id", id);
                setPodcastId(id);
                setTitle(tabs[0].title);
            }
        })

        getToken().then((token) => {
            console.log("token", token.access_token);
            if (token) {
                fetchEpisode(token.access_token, PodcastId).then((data) => {
                    console.log("data", data);
                    setPodcastData(data);
                })
            }
        })
    }, [PodcastId]);


    return (
        <>
            <Header />
            <main className='p-2 max-h-[380px] overflow-y-scroll'>
                {/* {PodcastData && ( */}
                <Podcast
                    title={podcast.title || title} // Replace with actual properties from fetched data
                    description={podcast.description}
                    // image={PodcastData.images[0].url}
                    image="https://cdn.player.fm/images/25004263/series/Eo3iU8rNU8jESRv4/512.jpg"
                />
                {/* )} */}
                <CommentFilter />
                <CommentList />

            </main >
            <CommentBar />
            <Footer navigateToPage={navigateToPage} />
        </>
    )
}
