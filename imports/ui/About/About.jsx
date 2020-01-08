import React from 'react';
//import '../../css/About.css';
import { SocialIcon } from 'react-social-icons';
import "../../../node_modules/bulma/css/bulma.css";

class About extends React.Component {
	render() {
		return (
			<div>
			<section className="hero is-link">
			  <div className="hero-body">
			    <div className="container">
			      <h1 className="title">
			        About GGPanda
			      </h1>
			    </div>
			  </div>
			</section>

			<div className="tile is-ancestor">
			  <div className="tile is-horizontal is-12">
			    <div className="tile">
						<div className="tile is-parent is-horizontal">

							<article className="tile is-child notification is-light">
								<div className="profile">
								<img className="profile" src="https://www.myinstants.com/media/instants_images/1340305905201.png"/>
									<br/>
									<h6>TONY CHEN</h6>
									<p>这货不会写Front End</p>
									<div className="tile is-horizontal is-child">
									<SocialIcon url="https://github.com/Tonychen0227" target="_blank"/>
									<SocialIcon url="https://www.linkedin.com/in/tonychenubc/" target="_blank"/>
									<SocialIcon url="mailto:tony.chen@outlook.com" target="_blank"/>
									</div>
								</div>
							</article>

							<article className="tile is-child notification is-light">
								<div className="profile">
								<img className="profile" src="https://ak0.scstatic.net/1/bigimg-cdn1-cont11.sweetcouch.com/152819740841505262-saitama-sticker.png"/>
									<br/>
									<h6>PETER HAN</h6>
									<p>这货不会找女朋友</p>
									<div className="tile is-horizontal is-child">
									<SocialIcon url="https://github.com/CorneliusHan" target="_blank"/>
									<SocialIcon url="https://ca.linkedin.com/in/peter-han-7634b773?trk=pub-pbmap" target="_blank"/>
									<SocialIcon url="mailto: nottellingya@void.com" target="_blank"/>
									</div>
								</div>
							</article>

							<article className="tile is-child notification is-light">
								<div className="profile">
								<img className="profile" src="http://cms-bucket.nosdn.127.net/catchpic/C/C6/C67A71CB17A4299127F598CA5E4E40F1.jpg"/>
								<br/>
									<h6>YUTING WEN</h6>
									<p>这货不会打篮球</p>
									<div className="tile is-horizontal is-child">
									<SocialIcon url="https://github.com/blackalkane" target="_blank"/>
									<SocialIcon url="https://www.linkedin.com/in/yuting-wen-2593b8149/" target="_blank"/>
									<SocialIcon url="mailto: blackalkane@gmail.com" target="_blank"/>
									</div>
								</div>
							</article>

						</div>
					</div>
				</div>
			</div>
			<footer className="footer">
			  <div className="content has-text-centered">
						<h4> Basketball terminology for the non-basketball-savvy </h4>
						<h6> <strong>KD</strong>: Will never win a championship again </h6>
						<h6> <strong>KD</strong>: Get Well Soon 🙏 </h6>
						<p>Copyright© by Tony Chen, Peter Han and Yuting Wen</p>
			  </div>
			</footer>
			</div>
);
	}
}

export default About;
