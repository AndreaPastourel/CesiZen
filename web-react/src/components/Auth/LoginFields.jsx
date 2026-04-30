import PropTypes from 'prop-types';

export default function LoginFields({
    email,
    password,
    setEmail,
    setPassword,
}){
    return (
        <>
            <div className="form-group">
                <label htmlFor="email">Adresse email</label>

                <input 
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    placeholder="exemple@email.com"
                    autoComplete="email"
                    required/>

            </div>


            <div className="form-group">
                <label htmlFor="password">Mot de passe</label>

                <input 
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                    placeholder="******"
                    autoComplete="current-password"
                    required/>
            </div>
        </>
    )
}

LoginFields.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
};