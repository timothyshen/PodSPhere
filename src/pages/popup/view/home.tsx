import Footer from '../components/Footer'
import CommentBar from '../components/WriteComment/CommentBar'
import CommentFilter from '../components/Comment/CommentFilter'
import Comment from '../components/Comment/Comment'
import Podcast from '../components/Podcast/Podcast'
import Header from '../components/Header'
import { useEffect } from 'react'
import browser from 'webextension-polyfill';
import { useState } from 'react'
import { getToken, fetchEpisode } from '../lib/Spotify'
import CommentList from '../components/Comment/CommentList'
import CommentListLens from '../components/Comment/CommentList-lens'


// const podcast = {
//     title: 'The Worlds She Sees with Godmother of AI, Fei-Fei Li',
//     description: 'Fei-Fei Li, PhD, Professor in the Computer Science Department at Stanford University, and Co-Director of Stanford’s Human-Centered AI Institute, joins Bio + Health founding par...',
//     image: 'https://cdn.player.fm/images/25004263/series/Eo3iU8rNU8jESRv4/512.jpg'
// }

export default function UserHome({ navigateToPage }: { navigateToPage: (page: React.SetStateAction<string>) => void }) {

    const [PodcastId, setPodcastId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [PodcastData, setPodcastData] = useState<any>(null);

    const clientId = "214519cca0e2470ca5547f90968ed5ac";
    const params = new URLSearchParams(window.location.search);
    console.log("code", params);
    const code = params.get("code");

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
            <main>
                {PodcastData && (
                    <Podcast
                        title={PodcastData.name || title} // Replace with actual properties from fetched data
                        description={PodcastData.description}
                        // image={PodcastData.images[0].url}
                        image="https://cdn.player.fm/images/25004263/series/Eo3iU8rNU8jESRv4/512.jpg"
                    />
                )}
                <CommentFilter />
                <CommentListLens />
                {/* <CommentList /> */}

            </main >
            <CommentBar />
            <Footer />
        </>
    )
}
