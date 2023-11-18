import { profileId, useLogin, useProfilesManaged } from '@lens-protocol/react-web';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';

export function LensLogin({ owner, onSuccess }: { owner: string; onSuccess?: () => void }) {
    const { execute: login, loading: isLoginPending } = useLogin();
    const { data: profiles, error, loading } = useProfilesManaged({ for: owner, includeOwned: true });
    const { loginSuccess } = useAuth();

    // console.log(profiles, error, loading)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const id = profileId(formData.get('id') as string) ?? null;

        const result = await login({
            address: owner,
            profileId: id,
        });

        if (result.isSuccess()) {
            console.log(result);
            loginSuccess(id);
            return onSuccess?.();
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    //@ts-ignore
    if (profiles.length === 0 || profiles === undefined) {
        return <p>No profiles on this wallet.</p>;
    }

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>Which Profile you want to log-in with?</legend>

                {profiles.map((profile, idx) => (
                    <label key={profile.id}>
                        <input
                            disabled={isLoginPending}
                            type="radio"
                            defaultChecked={idx === 0}
                            name="id"
                            value={profile.id}
                        />
                        {profile.handle?.fullHandle ?? profile.id}
                    </label>
                ))}

                <div>
                    <Button disabled={isLoginPending} type="submit" variant='secondary'>
                        Continue
                    </Button>
                </div>
            </fieldset>
        </form>
    );
}
