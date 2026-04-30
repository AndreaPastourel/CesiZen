import PropTypes from 'prop-types';

export default function LoginAction({isLoading}){
    return(
        <div className="login-actions">
            <button type = "submit" className="auth-button" disabled={isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
            </button>

            <button type="button" className="auth-link-button">
                Créer un compte
            </button>
        </div>
    )
}

LoginAction.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};