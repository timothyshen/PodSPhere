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
    if (profiles === undefined) {
        return <p>No profiles on this wallet.</p>;
    }

    return (
        <div className='min-h-[300px] my-10'>
            <h3 className="mb-4 text-lg font-medium text-gray-700">Which Profile you want to log-in with?</h3>
            <div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <fieldset className='w-full'>
                        {profiles.map((profile, idx) => (
                            <div className="w-full h-[60px] p-3 flex items-center justify-between bg-white text-gray-800 font-semibold border border-gray-300 rounded-lg shadow transition-all hover:bg-gray-800 hover:text-white hover:shadow-lg my-2">
                                <label key={profile.id} className="cursor-pointer flex items-center gap-2">
                                    <input
                                        disabled={isLoginPending}
                                        type="radio"
                                        className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        defaultChecked={idx === 0}
                                        name="id"
                                        value={profile.id}
                                    />
                                    {profile.handle?.fullHandle ?? profile.id}
                                </label>
                            </div>
                        ))}
                    </fieldset>

                    <Button disabled={isLoginPending} type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {isLoginPending ? 'Logging in...' : 'Continue'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
