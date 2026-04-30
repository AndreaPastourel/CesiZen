import PropTypes from 'prop-types';

export default function LoginMessage ({message}){
    if (!message){
        return null;
    }

    return (
        <p className = {`login-message login-message-${message.type}`} role = "alert">
            {message.text}
        </p>
    )
}

LoginMessage.propTypes = {
    message: PropTypes.shape({
        type: PropTypes.string,
        text: PropTypes.string,
    })
};