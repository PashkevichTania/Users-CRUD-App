
export const getAllUsers = async () => {
    try {
        const response = await fetch(`/users`);
        const users = await response.json();
        console.log("get all: ", users)
        return users;
    }catch (error){
        console.log(error)
    }
}

export const getAllUsersPaginated= async (page = 1 ,limit = 5) => {
    try {
        const response = await fetch(`/users/paginated?limit=${limit}&page=${page}`, {})
        const users = await response.json();
        console.log("get all pag: ", users)
        return users;
    }catch (error){
        console.log(error)
    }
}

export const getOneById = async (id) => {
    try {
        const response = await fetch(`/users/${id}`, {})
        const user = await response.json();
        console.log("get by id: ", user)
        return user;
    }catch (error){
        console.log(error)
    }
}

export const createUser = async (body) => {
    try {
        console.log(JSON.stringify(body))
        const response = await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const user = await response.json();
        console.log("create: ", user)
        return user;
    }catch (error){
        console.log(error)
    }
}

export const updateUser = async (id, body) => {
    try {
        const response = await fetch(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const user = await response.json();
        console.log("update: ", user)
        return user;
    }catch (error){
        console.log(error)
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`/users/${id}`, {
            method: 'DELETE',
        })
        const user = await response.json();
        console.log("delete: ", user)
        return user;
    }catch (error){
        console.log(error)
    }
}

