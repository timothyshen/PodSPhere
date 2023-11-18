import {
    PrimaryPublication,
    PublicationReactionType,
    hasReacted,
    isPrimaryPublication,
    publicationId,
    usePublication,
    useReactionToggle,
} from '@lens-protocol/react-web';
import { Button } from '../ui/button';

type ReactionButtonProps = {
    publication: PrimaryPublication;
    reaction: PublicationReactionType;
};

function ReactionButton({ publication, reaction }: ReactionButtonProps) {
    const { execute: toggle, loading, error } = useReactionToggle();

    const hasReactionType = hasReacted({ publication, reaction });

    const toggleReaction = async () => {
        await toggle({
            reaction,
            publication,
        });
    };

    if (error) return <p>Error</p>;

    return (
        // <button onClick={toggleReaction} disabled={loading}>
        //     <strong>{hasReactionType ? `Remove ${reaction}` : `Add ${reaction}`}</strong>
        // </button>
        <Button variant="ghost" onClick={toggleReaction} disabled={loading}>
            <svg
                className=" w-4 h-4"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
        </Button>
    );
}

function UseReactionToggleInner() {
    const {
        data: publication,
        error,
        loading,
    } = usePublication({ forId: publicationId('0x04-0x0b') });

    if (loading) return <div>Loading...</div>;

    if (error) return <p>Error</p>;


    return (
        isPrimaryPublication(publication) &&
        <div>

            <div>Total Upvotes: {publication.stats.upvotes}</div>
            <div>Total Downvotes: {publication.stats.downvotes}</div>

            <div>
                <ReactionButton publication={publication} reaction={PublicationReactionType.Upvote} />
                <ReactionButton publication={publication} reaction={PublicationReactionType.Downvote} />
            </div>
        </div>
    );
}

export function UseReactionToggle() {
    return (
        <UseReactionToggleInner />
    );
}
