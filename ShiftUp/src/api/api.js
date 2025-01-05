//comando para ligar api --> json-server --watch db.json --port 3000

export async function get(apiBaseUrl, endpoint) {
  try {
      const response = await fetch(`${apiBaseUrl}/${endpoint}`);
      return handleResponse(response);
  } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
  }
}

export async function post(apiBaseUrl, endpoint, data) {
  try {
      const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      });
      return handleResponse(response);
  } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error;
  }
}

export async function put(apiBaseUrl, endpoint, data) {
  try {
      const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      });
      return handleResponse(response);
  } catch (error) {
      console.error(`Error updating ${endpoint}:`, error);
      throw error;
  }
}

export async function del(apiBaseUrl, endpoint) {
  try {
      const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
          method: "DELETE",
      });
      if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`API request failed with status ${response.status}: ${errorMessage}`);
      }
      return true; // DELETE geralmente não retorna um corpo
  } catch (error) {
      console.error(`Error deleting ${endpoint}:`, error);
      throw error;
  }
}

async function handleResponse(response) {
  if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
          `API request failed with status ${response.status}: ${errorMessage}`
      );
  }
  const data = await response.json();
  return data;
}

