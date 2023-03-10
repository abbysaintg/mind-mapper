import WelcomeImage from '../WelcomeImage.png'

function Welcome() {
	return (
		<div className="welcome-container">
			<h1 className="welcome-title">WELCOME TO MIND MAPPER</h1>
			<p className="welcome-text">This app is designed to help you organize your thoughts and ideas in a visual and intuitive way.</p>
			<p className="welcome-text">
				With our easy-to-use mind mapping tool, you can create and customize your own mind maps to clarify your thinking and improve your productivity.
			</p>
			<img className="welcome-image" src={WelcomeImage} />
		</div>
	)
}

export default Welcome
