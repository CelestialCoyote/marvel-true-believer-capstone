import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import './TwitterFeed.css';


const TwitterFeed = () => {
    return (
        <div className="twitterFeed">

            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="Marvel"
                options={{
                    height: "100vh"
                  }}
                theme="dark"
                noScrollbar="true"
            />

        </div>
    );
}


export default TwitterFeed;
