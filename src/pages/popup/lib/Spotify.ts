import axios from 'axios';

const client_id = '214519cca0e2470ca5547f90968ed5ac'; // Your client ID
const client_secret = 'b95437296af647d895e98183e3ece5d0'; // Your client secret

export async function getToken() {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const response = await axios.post('https://accounts.spotify.com/api/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
    },
  });

  return response.data;
}

export async function fetchEpisode(token: string, podcastId: string) {
  try {
    console.log(token, podcastId);
    const result = await fetch(`https://api.spotify.com/v1/episode/${podcastId}?market=GB`, {
      headers: new Headers({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded' }),
    });

    console.log('result', result);
    return result;
  } catch (error) {
    console.error('Error fetching episode:', error);
    // Handle or rethrow the error as needed
  }
}
