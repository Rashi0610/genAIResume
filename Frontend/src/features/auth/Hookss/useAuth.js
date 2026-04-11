const handleLogin = async ({email, password}) => {
    setLoading(true);
    try {
        const data = await login({email, password});
        setUser(data.user);
    } catch(err) {
        throw err; // rethrow so login component can show the error
    } finally {
        setLoading(false);
    }
}

const handleLogout = async () => {
    setLoading(true);
    try {
        const data = await logout();
        setUser(null); // fix: should be null not data.user
    } catch(err) {
        throw err;
    } finally {
        setLoading(false);
    }
}

const handleRegister = async ({username, email, password}) => {
    setLoading(true);
    try {
        const data = await register({username, email, password}); // fix: pass as object
        setUser(data.user);
    } catch(err) {
        throw err;
    } finally {
        setLoading(false);
    }
}