



import PropTypes from 'prop-types';

export default function LoginHeader({ title, subtitle }) {
    return(
        <div className="login-header">
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    )
}

LoginHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};
