import Footer from '../components/Footer'
import CommentBar from '../components/WriteComment/CommentBar'
import CommentFilter from '../components/Comment/CommentFilter'
import Comment from '../components/Comment/Comment'
import Podcast from '../components/Podcast/Podcast'
import Header from '../components/Header'


const podcast = {
    title: 'The Worlds She Sees with Godmother of AI, Fei-Fei Li',
    description: 'Fei-Fei Li, PhD, Professor in the Computer Science Department at Stanford University, and Co-Director of Stanford’s Human-Centered AI Institute, joins Bio + Health founding par...',
    image: 'https://cdn.player.fm/images/25004263/series/Eo3iU8rNU8jESRv4/512.jpg'
}

export default function UserHome({ navigateToPage }: { navigateToPage: (page: React.SetStateAction<string>) => void }) {
    return (
        <>
            <Header />
            <main className=' w-full overflow-scroll p-2'>
                <Podcast
                    title={podcast.title}
                    description={podcast.description}
                    image={podcast.image}
                />
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

            </main>
            <CommentBar />
            <Footer />
        </>
    )
}
