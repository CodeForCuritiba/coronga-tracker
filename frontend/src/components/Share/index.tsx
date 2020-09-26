import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FacebookShareButton,
  InstapaperShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	RedditShareButton,
} from 'react-share';

import './Share.scss';

interface IShare {
  socialConfig: { 
    config:{ 
      url: string;
      title: string;
    };
    twitterHandle: string;
  };
  tags: string[];
}

const Share: React.FC<IShare> = ({ socialConfig, tags }:IShare) => (
	<div className="post-social">
		<FacebookShareButton url={socialConfig.config.url} className="button is-outlined is-rounded facebook" >
			<span className="icon">
				<FontAwesomeIcon icon={['fab', 'facebook-f']} />
			</span>
			<span className="text">Facebook</span>
		</FacebookShareButton>
		<TwitterShareButton url={socialConfig.config.url} className="button is-outlined is-rounded twitter" title={socialConfig.config.title} via={socialConfig.twitterHandle.split('@').join('')} hashtags={tags} >
			<span className="icon">
				<FontAwesomeIcon icon={['fab', 'twitter']} />
			</span>
			<span className="text">Twitter</span>
		</TwitterShareButton>
		<LinkedinShareButton url={socialConfig.config.url} className="button is-outlined is-rounded linkedin" title={socialConfig.config.title} >
			<span className="icon">
				<FontAwesomeIcon icon={['fab', 'linkedin-in']} />
			</span>
			<span className="text">LinkedIn</span>
		</LinkedinShareButton>
		<RedditShareButton url={socialConfig.config.url} className="button is-outlined is-rounded reddit" title={socialConfig.config.title} >
			<span className="icon">
				<FontAwesomeIcon icon={['fab', 'reddit-alien']} />
			</span>
			<span className="text">Reddit</span>
		</RedditShareButton>
		<WhatsappShareButton url={socialConfig.config.url} className="button is-outlined is-rounded whatsapp" title={socialConfig.config.title} >
			<span className="icon">
				<FontAwesomeIcon icon={['fab', 'whatsapp']} />
			</span>
			<span className="text">WhatsApp</span>
		</WhatsappShareButton>
	</div>
);

export default Share;